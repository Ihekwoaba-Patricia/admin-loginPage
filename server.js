// Install necessary packages
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import multer from 'multer';
import bookingRouter from './routers/bookingRouter.js'
import authRouter from './routers/authRouter.js'
import testimonialRouter from './routers/testimonialRouter.js'
import contactUsRouter from './routers/contactUsRouter.js'
import connectDb from './config/db.js';
import { verifyAdmin } from './middleware/verifyAdmin.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

dotenv.config(); // To access .env
connectDb(); //Connect server to MongoDB

const app = express(); // Instantiate express app

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({origin: "*"}));
app.use((req, res, next) => {
  console.log(`Received request with ${req.method} for ${req.url} 
    Origin: ${req.headers.origin}
    Header: ${req.headers}
    Body: ${req.body}`);
  next();
});

//* Code Logic to serve static public folder

//Serve static public files
app.use(express.static('public'));

const PORT = process.env.PORT || 3500; // Set up port to listen to server

// API Routes
app.use('/api/v1/booking', bookingRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/testimonial', testimonialRouter);
app.use('/api/v1/contact-us', contactUsRouter);

// Global Error Handler
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    // Multer-specific errors
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File too large. Max size is 5MB.' });
    }
    return res.status(400).json({ error: err.message });
  } else if (err) {
    // General errors
    return res.status(500).json({ error: err.message || 'Internal Server Error' });
  }
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});