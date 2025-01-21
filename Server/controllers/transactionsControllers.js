const Transaction = require("../models/Transaction");

//fetch all transactions
exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

//fetch user transactions
exports.getUserTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user.id });
    res.json(transactions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

//add transaction
exports.addTransaction = async (req, res) => {
  try {
    console.log("Request user:", req.user);
    const { type, amount, category, description, date } = req.body;

    const newTransaction = new Transaction({
      user: req.user.id,
      type,
      amount,
      category,
      description,
      date: date || Date.now(),
    });
    const transaction = await newTransaction.save();
    res.json(transaction);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

//delete transaction
exports.deleteTransaction = async (req, res) => {
  try {
    let transaction = await Transaction.findById(req.params.id);
    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }
    await Transaction.findByIdAndDelete(req.params.id);
    res.json({ message: "Transaction deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

//Get monthly report
exports.getMonthlyReport = async (req, res) => {
  try {
    const { year, month } = req.query;
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    const transactions = await Transaction.find({
      user: req.user.id,
      date: {
        $gte: startDate,
        $lte: endDate,
      },
    }).populate("category", "name type");

    const report = {
      totalIncome: 0,
      totalExpenses: 0,
      categoryBreakdown: {},
      transactions: transactions,
    };

    transactions.forEach((transaction) => {
      if (transaction.type === "income") {
        report.totalIncome += transaction.amount;
      } else {
        report.totalExpenses += transaction.amount;
      }

      if (!report.categoryBreakdown[transaction.category.name]) {
        report.categoryBreakdown[transaction.category.name] = 0;
      }
      report.categoryBreakdown[transaction.category.name] += transaction.amount;
    });

    res.json(report);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
