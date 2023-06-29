const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv')
const morgan = require('morgan')
const cors = require('cors')
const connectDB = require('./config/connectDb')

// config dotenv
dotenv.config()

// importing database connection
connectDB()

// rest objects
const app = express()

// middlewares
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

// routes
app.get('/', (req, res) => {
    res.send('Hello World! from server')
}
)
// server
const PORT = process.env.PORT || 8080

// listening to server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`.yellow.bold)
})



// package.json