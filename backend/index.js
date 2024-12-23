import express from "express"
import dotenv from 'dotenv'
import dbConnection from './database/dbconntection.js'
import userRouter from './routes/userRouter.js'
import msgrouter from './routes/msgrouter.js';
import getalluserRouter from './routes/getalluserRouter.js'



import cookieParser from "cookie-parser"

dotenv.config()
const app = express();


app.use(express.json()); // Automatically parse JSON data from request body
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send("hello world");
})
dbConnection();
const Port = process.env.PORT || 5000;

app.use('/api/auth', userRouter);
app.use('/api/sendmsg', msgrouter)
app.use('/api/getallusers', getalluserRouter);


app.listen(Port, () => {
    console.log(`Server is running at http://localhost:${Port}`)
})