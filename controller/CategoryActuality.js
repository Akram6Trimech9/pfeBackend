 const Category = require('../models/categoryActuality');

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

 
module.exports = {
  createCategory,
  getAllCategories,
 };
