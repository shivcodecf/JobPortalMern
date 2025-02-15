import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
    try {
        // Get token from cookies
        const token = req.cookies?.token;

        if (!token) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false,
            });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        if (!decoded) {
            return res.status(401).json({
                message: "Invalid token",
                success: false,
            });
        }

        // Attach user ID to the request object for further use
        req.userId = decoded.userId;

        // Proceed to the next middleware or route handler
        next();

    } catch (error) {
        console.error("Authentication error:", error.message);

        if (error.name === "TokenExpiredError") {
            return res.status(401).json({
                message: "Token expired",
                success: false,
            });
        } else if (error.name === "JsonWebTokenError") {
            return res.status(401).json({
                message: "Invalid token",
                success: false,
            });
        } else {
            return res.status(500).json({
                message: "Internal server error",
                success: false,
            });
        }
    }
};

export default isAuthenticated;