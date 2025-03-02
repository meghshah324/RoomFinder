import jwt from "jsonwebtoken";

export const authMiddleware = (req,res,next) => {
    console.log("Hi");
    const token = req.cookies.token;
    console.log(token);
    if (!token) return res.status(401).json({ message: 'Unauthorized' });
    try {
        const decoded = jwt.verify(token, "secret");
        req.user = decoded;
        next();
    } catch (error) {
        console.error("Token error:", error);
        res.status(403).json({ message: 'Invalid token' });
    }
}