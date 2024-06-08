 const Category = require('../models/categoryActuality');
 const Actuality = require('../models/actuality');

const createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json({ category });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(  categories  );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

 
const deleteCategory = async (req, res) => {
  try {
    const id = req.params.id;
    await Actuality.deleteMany({ category: id });
    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json({ message: 'Category deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
module.exports = {
  createCategory,
  getAllCategories,
  deleteCategory
 };
