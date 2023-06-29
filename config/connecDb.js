// importing mongoose package
const mongoose = require('mongoose')
const colors = require('colors')

// function for connection with database
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`MongoDB Connected: ${mongoose.connection.host}`.cyan.underline.bold)
    } catch (error) {
        console.log(`Error: ${error.message}`.red)
        process.exit(1)
    }
}

// exporting the function
module.exports = connectDB