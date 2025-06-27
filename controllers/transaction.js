const express = require("express");
const Users = require("../models/users");
const transaction = require("../models/transaction");
const { StatusCodes } = require("http-status-codes");

const getTransaction = async (req, res) => {
  try {
    //   startDate, endDate, category, description
    const { startDate, endDate, category, description } = req.query;
    const { _id } = req.user;
    const filter = { userId: _id };
    if (startDate && endDate) {
      filter.date = {
        $gte: new Date(startDate),
        $lt: new Date(endDate),
      };
    }
    if (category) {
      filter.category = { $regex: category, $options: "i" };
    }
    if (description) {
      filter.description = { $regex: description, $options: "i" };
    }
    const getTxns = await transaction.find(filter).sort({ date: -1 });
    return res.status(StatusCodes.OK).json({
      status: "success",
      data: getTxns,
    });
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
    const lower_category = category.toLowerCase();
    const { _id } = req.user;
    const newTransaction = await transaction.create({
      userId: _id,
      date: new Date(date),
      description,
      amount,
      category: lower_category,
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
    const { _id: userId } = req.user;
    const { date, description, amount, category, type } = req.body;
    if (!date || !description || !amount || category || type) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: "Failed",
        msg: "Atleast one of the fields should be updated",
      });
    }
    const tcnId = req.params.id;
    const getTransaction = await transaction.findOne({ _id: tcnId });
    if (!getTransaction) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ status: "Failed", msg: "Transaction does not exits" });
    }
    if (getTransaction.userId.toString() !== userId.toString()) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ status: "Failed", msg: "Unauthorized to update" });
    }
    if (date) {
      getTransaction.date = new Date(date);
    }
    getTransaction.description = description ?? getTransaction.description;
    getTransaction.amount = amount ?? getTransaction.amount;
    getTransaction.category = category ?? getTransaction.category;
    getTransaction.type = type ?? getTransaction.type;
    const updatedTransaction = await getTransaction.save();
    return res.status(StatusCodes.OK).json({
      status: "Failed",
      msg: "Transaction updated successfully",
      updatedTransaction,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ status: "Failed", msg: error.message });
  }
};

const deleteTransaction = async (req, res) => {
  try {
    const { _id: userId } = req.user;
    const txnId = req.params.id;
    const findTxn = {
      _id: txnId,
      userId: userId,
    };
    const deleteTransaction = await transaction.find(findTxn);
    if (!deleteTransaction) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ status: "Failed", msg: "Transaction not found" });
    }
    const deleteTx = await transaction.findByIdAndDelete(txnId);
    return res.status(StatusCodes.OK).json({
      status: "sucess",
      msg: "Transaction deleted",
      deletedTransaction: deleteTx,
    });
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
