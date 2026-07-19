import './config/env.js';
import app from './app.js';
import { prisma } from './config/prisma.js';

const PORT = process.env.PORT || 5000;

async function startServer(){
    try {
        await prisma.$connect();
        console.log('Database connected successfully');
    } catch (error){
        console.error('Database connection failed: ', error.message);
        process.exit(1);
    }

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    })
}

startServer();