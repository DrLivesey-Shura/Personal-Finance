const express = require("express");
const auth = require("../middleware/auth");
const {
  getBudgets,
  createBudget,
  deleteBudget,
} = require("../controllers/budgetControllers");
const router = express.Router();

//get all user budgets
router.get("/", auth, getBudgets);

//create a budget
router.post("/", auth, createBudget);

//delete budget
router.delete("/:id", auth, deleteBudget);

module.exports = router;
