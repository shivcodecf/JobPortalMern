import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { USER_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";
import { Input } from "../ui/input";

const Signup = () => {
    const [input, setinput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: null,
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading } = useSelector((store) => store.auth);

    const changeEventHandler = (e) => {
        setinput({ ...input, [e.target.name]: e.target.value });
    };

    const changeFileHandler = (e) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setinput({ ...input, file: selectedFile });
        } else {
            toast.error("No file selected");
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        if (!input.fullname || !input.email || !input.phoneNumber || !input.password || !input.role) {
            toast.error("Please fill in all required fields");
            return;
        }

        if (!/^\d{10}$/.test(input.phoneNumber)) {
            toast.error("Phone number must be 10 digits");
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email)) {
            toast.error("Please enter a valid email address");
            return;
        }

        if (!input.file) {
            toast.error("Please upload a profile picture");
            return;
        }

        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        formData.append("file", input.file);

        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true,
            });

            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/login");
            } else {
                toast.error(res.data.message || "Something went wrong");
            }
        } catch (error) {
            console.error("Error details:", error.response?.data || error);
            toast.error(error.response?.data?.message || "An error occurred. Please try again.");
        } finally {
            dispatch(setLoading(false));
        }
    };

    return (
        <div>
            <Navbar />
            <div className="flex items-center justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <form
                    onSubmit={submitHandler}
                    className="w-full max-w-lg border border-gray-200 rounded-md p-6 my-10 bg-white shadow-lg"
                >
                    <h1 className="font-bold text-2xl mb-5 text-center">Sign Up</h1>
                    <div className="my-4 flex flex-col">
                        <Label className="mb-1 font-medium text-gray-700">Full Name</Label>
                        <Input
                            type="text"
                            name="fullname"
                            value={input.fullname}
                            onChange={changeEventHandler}
                            placeholder="Enter your full name"
                            className="px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 shadow-sm"
                        />
                    </div>
                    <div className="my-4">
                        <Label>Email</Label>
                        <Input
                            type="email"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                            placeholder="example@gmail.com"
                            className="px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 shadow-sm"
                        />
                    </div>
                    <div className="my-4">
                        <Label>Phone Number</Label>
                        <Input
                            type="text"
                            value={input.phoneNumber}
                            name="phoneNumber"
                            onChange={changeEventHandler}
                            placeholder="8080808080"
                            className="px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 shadow-sm"
                        />
                    </div>
                    <div className="my-4">
                        <Label>Password</Label>
                        <Input
                            type="password"
                            value={input.password}
                            name="password"
                            onChange={changeEventHandler}
                            placeholder="Enter your password"
                            className="px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 shadow-sm"
                        />
                    </div>
                    <div className="my-6">
                        <RadioGroup className="flex flex-col sm:flex-row items-center gap-4">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem
                                    id="r1"
                                    value="student"
                                    checked={input.role === 'student'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer"
                                />
                                <Label htmlFor="r1">Student</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem
                                    id="r2"
                                    value="recruiter"
                                    checked={input.role === 'recruiter'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer"
                                />
                                <Label htmlFor="r2">Recruiter</Label>
                            </div>
                        </RadioGroup>
                    </div>
                    <div className="my-6">
                        <Label>Profile</Label>
                        <div className="relative">
                            <input
                                accept="image/*"
                                type="file"
                                onChange={changeFileHandler}
                                className="opacity-0 absolute w-full h-full cursor-pointer"
                                id="fileInput"
                            />
                            <label
                                htmlFor="fileInput"
                                className="block px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 cursor-pointer hover:bg-gray-50"
                            >
                                {input.file ? input.file.name : "Choose a file"}
                            </label>
                        </div>
                    </div>
                    {loading ? (
                        <Button className="w-full my-4" disabled>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Please Wait
                        </Button>
                    ) : (
                        <Button type="submit" className="w-full my-4">
                            Sign Up
                        </Button>
                    )}
                    <span className="text-sm block text-center">Already have an account? <Link to="/login" className="text-blue-600">Login</Link></span>
                </form>
            </div>
        </div>
    );
};

export default Signup;