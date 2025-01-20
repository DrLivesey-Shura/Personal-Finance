const Budget = require("../models/Budget");
const { check, validationResult } = require("express-validator");

//Get all budgets for a user
const getBudgets = async (req, res) => {
  try {
    const budgets = await Budget.find({ user: req.user.id });
    res.json(budgets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// create budget
const createBudget = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const newBudget = new Budget({
      user: req.user.id,
      category: req.body.category,
      amount: req.body.amount,
      period: req.body.period || "monthly",
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      notifications: req.body.notifications,
    });

    const budget = await newBudget.save();
    res.json(budget);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  getBudgets,
  createBudget,
};
