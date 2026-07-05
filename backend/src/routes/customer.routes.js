import { Router } from "express";

const router = Router();

router.get("/demo-profile", (req, res) => {
    res.json({
        success: true,
        message: "Demo profile data",
        data: {
            customerId: 'NEC-1001',
            name: "Demo Customer",
            city: 'Espoo',
            contractType: 'Fixed electricity contract',
            latestBillStatus: 'Paid',
            chatBotEligible: true,
},
    })
});

export default router;