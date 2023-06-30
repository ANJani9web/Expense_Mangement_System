const transactionModel = require("../models/transactionModel")

const getAllTransaction = async (req,res)=>{
    // return new Promise((resolve, reject)=>{
    //     db.query("SELECT * FROM transaction", (err, result)=>{
    //         if(err) reject(err)
    //         resolve(result)
    //     })
    // })
    try {
        const transactions = await transactionModel.find({})
        res.status(200).json(transactions)
    } catch (error) {
      console.log(error)
        res.status(500).json(error)
    }

}

const addTransaction = async (req,res)=>{

    try {
        const newTransaction = new transactionModel(req.body)
        await newTransaction.save()
        res.status(201).send("Transaction Created")
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }

}

// exporting controllers
module.exports = {
    getAllTransaction,
    addTransaction
}