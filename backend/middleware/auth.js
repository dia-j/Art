import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log('Authorization header:', authHeader);
    const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;
    if (!token) {
        console.log('No token found in Authorization header');
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        // Only set req.body.userId if req.body exists and method is not GET
        if (req.method !== 'GET' && req.body) {
            req.body.userId = decoded.id; // For compatibility with controllers expecting req.body.userId
        }
        next();
    } catch (error) {
        console.log('JWT verification error:', error);
        res.status(401).json({ success: false, message: "Authentication Error" });
    }
};

export default authMiddleware;