// importing mongoose package
const mongoose = require('mongoose')

// schema design
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,'Name is required'],
        // trim: true         trim means storing data in database without blank space in input
    },
    email: {
        type: String,
        required: [true,'Email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true,'Password is required'],
    }

},{timestamps : true}
)


// exporting the model
const userModel = mongoose.model('users', userSchema)
module.exports = userModel
