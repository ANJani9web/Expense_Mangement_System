const transactionModel = require("../models/transactionModel");
const moment = require("moment");

const getAllTransaction = async (req, res) => {
  // return new Promise((resolve, reject)=>{
  //     db.query("SELECT * FROM transaction", (err, result)=>{
  //         if(err) reject(err)
  //         resolve(result)
  //     })
  // })
  try {
    const { frequency,selectedDate, type} = req.body;
    const transactions = await transactionModel.find({
      //   date: {
      //     $gte: moment().subtract(Number(frequency), "d").toDate(),
      //   },

      ...(frequency !== 'custom'
        ? {
            date: {
              $gte: moment().subtract(Number(frequency), "d").toDate(),
            },
          }
        : {
            date: {
              // $gte: moment(req.body.selectedDate[0]).toDate(),
              // $lte: moment(req.body.selectedDate[1]).toDate(),
              $gte: selectedDate[0],
              $lte: selectedDate[1],
            },
          }),

      userid: req.body.userid,
      ...(type!=='all' && {type})
    });
    res.status(200).json(transactions);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const addTransaction = async (req, res) => {
  try {
    const newTransaction = new transactionModel(req.body);
    await newTransaction.save();
    res.status(201).send("Transaction Created");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// exporting controllers
module.exports = {
  getAllTransaction,
  addTransaction,
};
