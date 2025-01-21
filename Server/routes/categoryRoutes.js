const express = require("express");
const {
  getCategories,
  createCategory,
  deleteCategory,
} = require("../controllers/categoryControllers");
const auth = require("../middleware/auth");
const router = express.Router();

//Get all categories for a user
router.get("/", auth, getCategories);

//create a category
router.post("/", auth, createCategory);

//delete category
router.delete("/:id", auth, deleteCategory);
module.exports = router;
