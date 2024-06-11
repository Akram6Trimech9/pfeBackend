 const Actuality = require('../models/actuality');

const createActuality = async (req, res) => {
  try {
    const {idCat} = req.params
     const { filename, path, mimetype, size } = req.file;

     const actuality = await Actuality.create({
      title: req.body.title,
      subtitle: req.body.subtitle,
      description: req.body.description,
      file: path,  
      category: req.body.category
    });
    res.status(201).json({ actuality });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getAllActualities = async (req, res) => {
  try {
    const actualities = await Actuality.find().populate('category');
    res.json(  actualities );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const  getOne = async(req,res)=>{
  try{
  const id = req.params.id
  const actuality = await Actuality.findById(id)
  if(!actuality){ 
    res.status(404).json({message :'actuality not found '})
  }
  res.json(  actuality );
  }catch(err){
    res.status(500).json({ error: err.message });
  }
}

const deleteActuality = async (req, res) => {
  try {
    const id = req.params.id;
    const actuality = await Actuality.findByIdAndDelete(id);
    
    if (!actuality) {
      return res.status(404).json({ message: 'Actuality not found' });
    }

    res.json({ message: 'Actuality deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
 const updateActuality = async (req, res) => {
  try {
    const { id } = req.params;
    const actuality = await Actuality.findById(id);

    if (!actuality) {
      return res.status(404).json({ message: 'actuality not found' });
    }

    if (req.body.title != null) {
      actuality.title = req.body.title;
    }
    if (req.body.subtitle != null) {
      actuality.subtitle = req.body.subtitle;
    }
    if (req.body.category != null) {
      actuality.category = req.body.category;
    }
    if (req.body.description != null) {
      actuality.description = req.body.description;
    }
    if (req.body.file != null) {
      actuality.file = req.body.file.path
    }

    const updated =  await Actuality.findByIdAndUpdate(id,actuality);
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
   createActuality,
  getAllActualities,
  getOne,
  deleteActuality,
  updateActuality
 };
