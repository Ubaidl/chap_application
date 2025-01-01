import express from "express"
const app = express();
import dotenv from 'dotenv'
import dbConnection from './database/dbconntection.js'
import userRouter from './routes/userRouter.js'
import msgrouter from './routes/msgrouter.js';
import getalluserRoute from './routes/getalluserRouter.js'
import cors from 'cors';




const corsOptions = {
    origin: 'http://localhost:5174', // Frontend URL
    credentials: true, // Allow cookies to be sent and received
    //methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    //allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
};

app.use(cors(corsOptions)); // Apply the CORS middleware





import cookieParser from "cookie-parser"

dotenv.config()
//const app = express();


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
app.use('/api/getallusers', getalluserRoute);



app.listen(Port, () => {
    console.log(`Server is running at http://localhost:${Port}`)
})