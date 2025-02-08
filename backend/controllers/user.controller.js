import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;

        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({ message: "All fields are required", success: false });
        }

        const file = req.file;
        if (!file) {
            return res.status(400).json({ message: "Profile photo is required", success: false });
        }

        const allowedFormats = ["image/jpeg", "image/png"];
        if (!allowedFormats.includes(file.mimetype)) {
            return res.status(400).json({ message: "Invalid file type", success: false });
        }

        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists", success: false });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            profile: {
                profilePhoto: cloudResponse.secure_url,
            },
        });

        return res.status(201).json({ message: "Account created successfully", user: newUser, success: true });
    } catch (error) {
        console.error("Register Error:", error.message);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        if (!email || !password || !role) {
            return res.status(400).json({ message: "All fields are required", success: false });
        }

        const user = await User.findOne({ email });
        if (!user || role !== user.role) {
            return res.status(400).json({ message: "Invalid credentials", success: false });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ message: "Invalid credentials", success: false });
        }

        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: "1d" });

        return res.status(200)
            .cookie("token", token, {
                maxAge: 24 * 60 * 60 * 1000,  // 1 day expiry
                httpOnly: true,  
                sameSite: "none",   // Important for cross-site cookies (frontend & backend different domains)
                secure: true,       // Must be true for HTTPS (deployment ke liye)
            })
            .json({
                message: `Welcome back ${user.fullname}`,
                user: {
                    id: user._id,
                    fullname: user.fullname,
                    email: user.email,
                    role: user.role,
                },
                success: true,
            });
    } catch (error) {
        console.error("Login Error:", error.message);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};

export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully",
            success: true,
        });
    } catch (error) {
        console.error("Logout Error:", error.message);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};

export const updatedProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;
        const file = req.file;

        const userId = req.id; // Ensure this is set from middleware (e.g., JWT)
        let user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }

        if (fullname) user.fullname = fullname;
        if (email) user.email = email;
        if (phoneNumber) user.phoneNumber = phoneNumber;
        if (bio) user.profile.bio = bio;
        if (skills && typeof skills === "string") {
            user.profile.skills = skills.split(",").map(skill => skill.trim());
        }

        if (file) {
            const allowedFormats = ["application/pdf"];
            if (!allowedFormats.includes(file.mimetype)) {
                return res.status(400).json({ message: "Invalid resume file type", success: false });
            }

            const fileUri = getDataUri(file);
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
            user.profile.resume = cloudResponse.secure_url;
            user.profile.resumeOriginalName = file.originalname;
        }

        await user.save();

        return res.status(200).json({ message: "Profile updated successfully", user, success: true });
    } catch (error) {
        console.error("Profile Update Error:", error.message);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};
