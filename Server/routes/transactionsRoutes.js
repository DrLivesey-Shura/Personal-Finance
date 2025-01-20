const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  getTransactions,
  getUserTransactions,
  addTransaction,
  deleteTransaction,
  getMonthlyReport,
} = require("../controllers/transactionsControllers");

// Importing the transaction controller

// Fetch all transactions
router.get("/", auth, getTransactions);

// Fetch user transactions
router.get("/user", auth, getUserTransactions);

// Add transaction
router.post("/", auth, addTransaction);

// Delete transaction
router.delete("/:id", auth, deleteTransaction);

//get monthly report
router.get("/reports/monthly", auth, getMonthlyReport);

module.exports = router;
