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

module.exports = {
  createActuality,
  getAllActualities,
};
