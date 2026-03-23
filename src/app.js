import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoute.js';
import categoryRoutes from './routes/categoryRoute.js';
import taskRoutes from './routes/taskRoute.js';
import errorHandler from './middleware/errorMiddleware.js';

dotenv.config();

const app = express();
app.use(express.json());
    
// Middleware
app.use(cors());
app.use(express.json());
app.use(errorHandler);

// Connect to MongoDB
connectDB();

app.get('/', (req, res) => {
    res.send('Welcome to the To-Do API');
});

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/categories', categoryRoutes);


export default app;