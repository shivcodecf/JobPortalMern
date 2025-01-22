import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js"


dotenv.config();

const app = express();


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());




const corsOptions = {
    origin: "https://job-portal-mern-fro3.vercel.app", // Correct URL
    credentials: true,
};
app.use(cors(corsOptions));

// Test route
app.get("/", (req, res) => {
    return res.status(200).json({
        message: "I am coming",
        success: true,
    });
});

// API routes
app.use("/api/v1/user", userRoute);

app.use("/api/v1/company", companyRoute);

app.use("/api/v1/job", jobRoute);

app.use("/api/v1/application", applicationRoute);







// Start server after DB connection
const PORT = process.env.PORT || 3000;
connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running at port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Database connection failed:", err);
        process.exit(1);
    });
