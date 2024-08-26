import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import UserRouter from './routes/user.routes.js';
import AuthRouter from './routes/auth.router.js';
import PostRouter from './routes/post.router.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO)
  .then(() => { console.log("Database is connected"); })
  .catch((err) => { console.log(err); });

const app = express();
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173', // Allow your frontend URL
  methods: 'GET,POST,PUT,DELETE',
  credentials: true,
}));
// Middleware to handle large payloads
app.use(express.json({ limit: '200mb' })); // Increase JSON payload limit to 50MB
app.use(express.urlencoded({ limit: '200mb', extended: true })); // Increase URL-encoded payload limit to 50MB

// CORS configuration


// Cookie parser

// Route handling
app.use('/api/user', UserRouter);
app.use('/api/auth', AuthRouter);
app.use('/api/post', PostRouter);

// Global error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 400;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
  
});

// Start the server
app.listen(5000, () => {
  console.log("Server is listening on port 5000");
});
