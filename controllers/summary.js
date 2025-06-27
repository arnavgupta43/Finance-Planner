const express = require("express");
const Users = require("../models/users");
const transaction = require("../models/transaction");
const { StatusCodes } = require("http-status-codes");
const getSummary = async (req, res) => {
  try {
    const userId = req.user._id;
    const month = parseInt(req.query.month);
    const year = parseInt(req.query.year);

    if (!month || !year || month < 1 || month > 12) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Invalid month or year" });
    }
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 1);

    const transactions = await transaction
      .find({
        userId,
        date: { $gte: startDate, $lt: endDate },
      })
      .sort({ date: -1 });

    let totalIncome = 0;
    let totalExpense = 0;

    for (const txn of transactions) {
      if (txn.type === "Income") totalIncome += txn.amount;
      else if (txn.type === "Expense") totalExpense += txn.amount;
    }

    const balance = totalIncome - totalExpense;

    const recentTransactions = transactions.slice(0, 5);

    res.status(200).json({
      balance,
      totalIncome,
      totalExpense,
      recentTransactions,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ status: "Failed", msg: error.message });
  }
};

module.exports = getSummary;
