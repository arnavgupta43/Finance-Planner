const express = require("express");
const Users = require("../models/users");
const transaction = require("../models/transaction");
const { StatusCodes } = require("http-status-codes");

const getTransaction = async (req, res) => {
  try {
    //   startDate, endDate, category, description
    const { startDate, endDate, category, description } = req.body;
    const { _id } = req.user;
    const getOneTransaction = await transaction.findOne({
      userId: _id,
      date: { $gte: startDate, $lt: endDate },
      category,
      description,
    });
    if (!getOneTransaction) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ status: "Failed", msg: "Transaction not found" });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ status: "Failed", msg: error.message });
  }
};

const addTransaction = async (req, res) => {
  try {
    const { date, description, amount, category, type } = req.body;
    const { _id } = req.user;
    const newTransaction = await transaction.create({
      userId: _id,
      date: new Date(date),
      description,
      amount,
      category,
      type,
    });
    if (!newTransaction) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ status: "Failed", msg: "Transaction not created" });
    }
    return res.status(StatusCodes.CREATED).json({
      status: "sucess",
      msg: "Transaction",
      transaction: newTransaction,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ status: "Failed", msg: error.message });
  }
};
const updateTransaction = async (req, res) => {
  try {
    const { _id } = req.user;
    const id = parseInt(req.params.id);
  } catch (error) {
    console.log(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ status: "Failed", msg: error.message });
  }
};

const deleteTransaction = async (req, res) => {
  try {
    const { _id } = req.user;
    const id = parseInt(req.params.id);
    const deleteTransaction = await transaction.findByIdAndDelete({
      _id: id,
    });
    if (!deleteTransaction) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ status: "Failed", msg: "Transaction not found" });
    }
    if (deleteTransaction.userId != _id) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        status: "Failed",
        msg: "User not authorized to delete the transaction",
      });
      return res
        .status(StatusCodes.OK)
        .json({ status: "sucess", msg: "Transaction deleted" });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ status: "Failed", msg: error.message });
  }
};

module.exports = {
  getTransaction,
  addTransaction,
  updateTransaction,
  deleteTransaction,
};
