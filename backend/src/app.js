import express from 'express';
import cors from 'cors';

import healthRoutes from './routes/health.routes.js';
import customerRoutes from './routes/customer.routes.js';
import authRoutes from './routes/auth.routes.js';
import contractRoutes from './routes/contract.routes.js';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
}))

app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Nordic EnergyCare API is running!'
    });
});

app.use('/api/health', healthRoutes);
app.use('/api/customer', customerRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/contracts', contractRoutes)
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'API Route not found'
    });
});

app.use((err, req, res, next) => {
    console.error(err)
    res.status(500).json({
        success: false,
        message: 'Internal Server Error'
    });
});

export default app;