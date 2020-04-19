const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors")
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error')

// env
dotenv.config({path:'./config/config.env'})

// connect
connectDB()

//routes
const bootcamp = require("./routes/bootcamp")

const app = express()

//bodyParser
app.use(express.json())

//morgan
app.use(morgan('dev'))

if(process.env.NODE_ENV = 'development' ){
    app.use('/api/v1/bootcamps', bootcamp)
}

app.use(errorHandler)


const PORT= process.env.PORT || 5000;

const server = app.listen(PORT, console.log(`server runing ${process.env.NODE_ENV} and ${process.env.PORT}`.yellow.bold))

// Handle rejection
process.on('unhandledRejection',(err, promise)=>{
    console.log(`Error: ${err.message}`.red.bold)
    server.close(()=>process.exit(1))
})