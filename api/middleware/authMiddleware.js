import jwt from "jsonwebtoken";

export const authMiddleware = (req,res,next) => {
    console.log("Hi");
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: 'Unauthorized' });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.error("Token error:", error);
        res.status(403).json({ message: 'Invalid token' });
    }

}