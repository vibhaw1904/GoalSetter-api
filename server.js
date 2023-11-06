const express=require('express');
const colors=require('colors')
const dotenv=require('dotenv');
const { errHandler } = require('./middleware/errorMiddleware');
const connectDb = require('./config/db');
const app=express();
const cors = require("cors");
app.use(express.json())
app.use(express.urlencoded({extended:false}))
dotenv.config({path: __dirname + '/.env'}); 

// console.log(require('dotenv').config({path: __dirname + '/.env'}))
connectDb()
app.use(cors({ origin: true, credentials: true }));
app.use('/api/goals',require('./routes/goalsRoutes'))
app.use('/api/users',require('./routes/userRoutes'))
app.use(errHandler) 
const port= process.env.PORT;


app.listen(port,()=>console.log(`app is running on port ${port}`))