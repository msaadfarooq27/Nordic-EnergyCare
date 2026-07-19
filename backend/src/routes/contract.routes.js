import { Router } from "express";
import { requireAuth } from "../middleware/auth.middleware.js";
import { prisma } from "../config/prisma.js";

const router = Router();

router.post('/', requireAuth, async (req, res) => {
    try {
         const { retailerName, contractType, pricePerKwh, monthlyFee, startDate } =  req.body;
          
         if(!retailerName || !contractType || pricePerKwh == null || !startDate){
            return res.status(400).json({
                success: false,
                message: 'Retailer name, contract type, price per kWh, and start date are required'
            });
         }

         const customer =  await prisma.customer.findUnique({
            where: { userId: req.user.userId },
         });

         if(!customer){
            return res.status(404).json({
                success: false,
                message: 'Complete your customer profile before adding a contract',
            });
         }

        await prisma.contract.updateMany({
            where: {customerId: customer.id, endDate: null},
            data: {endDate: new Date(startDate)},
        });

        const contract = await prisma.contract.create({
            data: {
                retailerName,
                contractType,
                pricePerKwh,
                monthlyFee: monthlyFee ?? 0,
                startDate: new Date(startDate),
                customerId: customer.id,
            }
        });

        res.status(201).json({
            success: true,
            message: 'Contract added successfully',
            data: contract,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false, 
            message: 'Something went wrong while adding the contract',
        });
    }
});

router.get('/', requireAuth, async(req, res) => {
    try {
        const customer =  await prisma.customer.findUnique({
            where: {userId: req.user.userId},
        });

        if(!customer){
            return res.status(404).json({
                success: false,
                message: 'No customer profile found for this account',
            });
        }

        const contracts = await prisma.contract.findMany({
            where : { customerId:  customer.id},
            orderBy: { startDate: 'desc'},
        })

        res.status(200).json({
            success: true,
            message: 'Contract history retrieved',
            data: contracts,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Something went wrong while fetching contract hsitory',
        });
    }
});
export default router;