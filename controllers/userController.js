// importing models for using in controllers
const userModel = require("../models/userModel");

// login for user controller
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email, password });
    if (user) {
      res.status(200).json({
        success: true,
        user,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    });
  }
};

// register for user controller
const registerController = async(req,res) => {
    try {
        const newUser = new userModel(req.body)
        await newUser.save()
        res.status(201).json({
            success:true,
            newUser
        })

    } catch (error) {
        res.status(400).json({
            success:false,
            error
        })
    }
};

// exporting controllers
module.exports = {
  loginController,
  registerController,
};
