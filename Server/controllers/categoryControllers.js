const Category = require("../models/Category");
const { check, validationResult } = require("express-validator");

// Get all categories for a user
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ user: req.user.id });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//create category
const createCategory = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const newCategory = new Category({
      user: req.user.id,
      name: req.body.name,
      type: req.body.type,
      color: req.body.color,
    });

    const category = await newCategory.save();
    res.json(category);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  getCategories,
  createCategory,
};
