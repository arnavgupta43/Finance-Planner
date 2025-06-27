const transaction = require("../models/transaction");
const { StatusCodes } = require("http-status-codes");
const mongoose = require("mongoose");
const getCategorySummary = async (req, res) => {
  try {
    const { month, year } = req.query;
    const { _id: userId } = req.user;
    if (!month || !year) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: "Failed",
        msg: "Month and year is required",
      });
    }
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 1);
    const categorySummary = await transaction.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
          date: {
            $gte: startDate,
            $lt: endDate,
          },
        },
      },
      {
        $group: {
          _id: "$category",
          total: {
            $sum: "$amount",
          },
        },
      },
      {
        $project: {
          _id: 0,
          category: "$_id",
          total: 1,
        },
      },
      {
        $sort: {
          total: -1,
        },
      },
    ]);
    return res.status(StatusCodes.OK).json(categorySummary);
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: "Failed",
      msg: error.message,
    });
  }
};
module.exports = getCategorySummary;
