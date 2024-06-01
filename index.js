const express = require('express');
const app = express();
const conn = require('./config/conn');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const userRouter = require('./routers/user');
const dotenv = require('dotenv');
const PORT = 5000;

// env config
dotenv.config();

// MIDDLEWARES
app.use(cors({
    exposedHeaders:['token'],
    origin:['http://localhost:3000','https://upwealth.vercel.app/'],
    credentials:true,
}));
app.use(cookieParser());
app.use(express.urlencoded({extended:false}));
app.use(express.json());
// MIDDLEWARES

conn();

app.use('/',userRouter);

app.listen(process.env.PORT || PORT,()=>{
console.log(`server running in PORT ${PORT}`);
});