import express from 'express'
import mongoose from 'mongoose'
import dotenv from "dotenv"
import UserRouter from './routes/user.routes.js'
dotenv.config()
mongoose.connect(process.env.MONGO).then(
    () => { console.log("database is connected") }
).catch((err) => {
    console.log(err)
})
const app = express()
app.listen(5000, () => {
    console.log("server is listening");
}) 
app.use('/api/user', UserRouter);