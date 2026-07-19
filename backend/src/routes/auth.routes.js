import { Router } from "express";
import { hashPassword, comparePassword } from "../utils/password.js";
import { prisma } from "../config/prisma.js";
import { generateToken } from "../utils/jwt.js";
import { requireAuth } from "../middleware/auth.middleware.js";

const router = Router();

const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'node' : 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000, 
}

router.post("/register", async (req, res)=> {
    try {
        const { name, email, password } =  req.body;

        if(!name || !email || !password){
            return res.statuss(400).json({
                success: false,
                message: "Name, email and password are required",
            });
        }

        const existingUser =  await prisma.user.findUnique({ where: {email}});

        if(existingUser){
            return res.status(409).json({
                success: false,
                message: "User with this email already exists",
            });
        }

        const hashedPassword = await hashPassword(password);
        const user = await prisma.user.create({
            data: { name, email, password: hashedPassword },
            select: {id: true, name: true, email: true, createdAt: true},
        });

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: user,
        });
    } catch (error){
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong while registering the user",
        });
    }
});


router.post("/login", async (req, res) => {
    try {
        const {email, password} = req.body;
        
        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: "Email and password are required",
            });
        }

        const user = await prisma.user.findUnique({ where: {email}});

        if(!user){
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        const isPasswordValid = await comparePassword(password, user.password);

        if(!isPasswordValid){
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
    }

        const token = generateToken({userId: user.id});
        res.cookie('token', token, COOKIE_OPTIONS);
        res.status(200).json({
            success: true,
            message: "Login successful",
            data: {
                user: { id: user.id, name: user.name, email: user.email},
            },
        });

    } catch (error){
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Something went wrong while logging in'
        });
    }
});

router.post('/logout', (req, res) => {
    res.clearCookie('token', COOKIE_OPTIONS);
    res.status(200).json({
        success: true,
        message: 'Logged Out Successfully',
    })
})

router.get('/me', requireAuth, async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.user.userId },
            select: {id: true, name: true, email: true, createdAt: true},
        });

        if(!user){
            res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Authenticated',
            data: { user },
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Something went wrong while fetching your account'
        })
    }
})
export default router;