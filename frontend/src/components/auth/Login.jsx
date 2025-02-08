import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Link } from "react-router-dom";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { USER_API_END_POINT } from "@/utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";
import { Input } from "../ui/input";

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { loading, user } = useSelector(store => store.auth);

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("email", input.email);
        formData.append("password", input.password);
        formData.append("role", input.role);

        try {
            dispatch(setLoading(true));

            const res = await axios.post(`${USER_API_END_POINT}/login`, formData, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            });

            if (res.data.success) {
                localStorage.setItem("authToken", res.data.token);  // ✅ Token Store Karo
                dispatch(setUser(res.data.user));
                navigate("/");
                toast.success(res.data.message);
            }

        } catch (error) {
            console.log(error);
            toast.error("An error occurred during login");
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
                    <h1 className="font-bold text-2xl mb-5 text-center">Login</h1>

                    <div className="my-4 flex flex-col">
                        <label className="mb-1 font-medium text-gray-700">Email</label>
                        <Input
                            type="email"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                            placeholder="patel@gmail.com"
                            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm text-gray-700"
                        />
                    </div>

                    <div className="my-4 flex flex-col">
                        <label className="mb-1 font-medium text-gray-700">Password</label>
                        <Input
                            type="password"
                            value={input.password}
                            name="password"
                            onChange={changeEventHandler}
                            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm text-gray-700"
                        />
                    </div>

                    <div className="my-6">
                        <RadioGroup className="flex flex-col sm:flex-row items-center gap-4">
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="student"
                                    checked={input.role === 'student'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer"
                                />
                                <Label htmlFor="r1">Student</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    checked={input.role === 'recruiter'}
                                    onChange={changeEventHandler}
                                    value="recruiter"
                                    className="cursor-pointer"
                                />
                                <Label htmlFor="r2">Recruiter</Label>
                            </div>
                        </RadioGroup>
                    </div>

                    {
                        loading ? 
                        <Button className="w-full my-4"><Loader2 className="mr-2 h-4 w-4 animate-spin" />Please Wait</Button> :
                        <Button type="submit" className="w-full my-4">Login</Button>
                    }

                    <span className="text-sm block text-center">Don't have an account? <Link to="/signup" className="text-blue-600">Signup</Link></span>
                </form>
            </div>
        </div>
    );
};

export default Login;
