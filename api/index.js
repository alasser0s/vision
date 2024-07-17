import express from 'express'
import mongoose from 'mongoose'
import dotenv from "dotenv"
import UserRouter from './routes/user.routes.js'
import AuthRouter from './routes/auth.router.js'
import cors from 'cors'

dotenv.config();
mongoose.connect(process.env.MONGO).then(
    () => { console.log("database is connected") ;}
).catch((err) => {
    console.log(err)
})
const app = express()
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173', // Allow your frontend URL
    methods: 'GET,POST,PUT,DELETE',
    credentials: true
  }));
 
app.listen(5000, () => {
    console.log("server is listening");
}) 
app.use('/api/user', UserRouter);
app.use('/api/auth' , AuthRouter);
app.use((err,req,res,next)=>{
    const statucode = err.statucode || 500
    const message = err.message || "no"
    res.status(statucode).json({
        success:false,
        statucode,
        message,
    })
})