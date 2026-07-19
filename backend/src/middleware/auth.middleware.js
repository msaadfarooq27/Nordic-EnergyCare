import { verifyToken } from "../utils/jwt.js";


export function requireAuth(req, res, next){
    const token =  req.cookies.token;

    if(!token){
        return res.status(401).json({
            success: false,
            message: 'Authentication required',
        });
    }

    try {
        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    } catch (error){
        return res.status(401).json({
            success: false,
            message: 'Invalid or expired token',
        });
    }
}