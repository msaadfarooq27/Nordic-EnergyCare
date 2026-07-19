import { Router } from "express";
import { requireAuth } from "../middleware/auth.middleware.js";
import { prisma } from "../config/prisma.js";

const router = Router();

router.post("/profile", requireAuth, async (req, res) => {
    try {
        const { city } = req.body;

        if(!city){
            return res.status(400).json({
                success: false,
                message: 'City is required'
            });
        }

        const existingProfile = await prisma.customer.findUnique({ where: {userId: req.user.userId}})

        if(existingProfile){
            return res.status(409).json({
                success: false,
                message: 'A customer profile already exists for this account',
            });
        }

        const customerId = `NEC-${1000 + (await prisma.customer.count())}`;
        console.log('req.user is',  req.user);
        const customer = await prisma.customer.create({
            data: {
                customerId,
                city,
                userId: req.user.userId
            },
        });

        res.status(201).json({
            success: true,
            message: 'Customer profile created successfully',
            data: customer,
        });
    } catch (error){
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Something went wrong while creating the profile'
        });
    }
});

router.get('/profile', requireAuth, async (req, res) => {
    try {
        const customer = await prisma.customer.findUnique({ where: { userId: req.user.userId}, });

        if(!customer){
            return res.status(404).json({
                success: false,
                message: 'No such profile found for this account'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Customer profile retrieved',
            data: customer
        });
    } catch (error){
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Something went wrong while fetching the profile'
        });
    }
});

export default router;