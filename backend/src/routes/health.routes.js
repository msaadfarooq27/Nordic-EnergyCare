import Router from 'express';

const router = Router();

router.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'API is healthy',
        service: 'Nordic EnergyCare API',
        timestamp: new Date().toISOString(),
    })
})

export default router;