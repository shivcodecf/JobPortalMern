import { Link, useNavigate } from "react-router-dom";
import React from "react";

import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "@/components/ui/button";
import { User2, LogOut } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { useDispatch, useSelector } from "react-redux";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="bg-white shadow-md opacity-95">
      <div className="flex items-center justify-between mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16">
        <div>
          <h1 className="text-2xl font-bold">
            Job<span className="text-[#F83002]">Portal</span>
          </h1>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <ul className="flex font-medium items-center gap-6">
            {user && user.role === "recruiter" ? (
              <>
                <li>
                  <Link to="/admin/companies">Companies</Link>
                </li>
                <li>
                  <Link to="/admin/jobs">Jobs</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/jobs">Jobs</Link>
                </li>
                <li>
                  <Link to="/browse">Browse</Link>
                </li>
              </>
            )}
          </ul>
          {!user ? (
            <div className="flex items-center gap-4">
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">SignUp</Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="w-10 h-10 rounded-full overflow-hidden cursor-pointer">
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    alt={user?.fullname}
                    className="w-full h-full object-cover"
                  />
                </Avatar>
              </PopoverTrigger>

              <PopoverContent className="p-4 w-50 bg-white shadow-xl border-none">
                <div className="flex gap-4">
                  <Avatar className="w-10 h-10 rounded-full overflow-hidden">
                    <AvatarImage
                      src={user?.profile?.profilePhoto}
                      alt={user?.fullname}
                      className="w-full h-full object-cover"
                    />
                  </Avatar>
                  <div className="flex flex-col">
                    <h4 className="font-medium text-md text-sky-800">
                      {user?.fullname}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {user?.profile?.bio}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex flex-col gap-3">
                  {user && user.role === "student" && (
                    <div className="flex items-center gap-2 cursor-pointer">
                      <User2 />
                      <Button variant="link">
                        <Link to="/profile">View Profile</Link>
                      </Button>
                    </div>
                  )}
                  <div className="flex items-center gap-2 cursor-pointer">
                    <LogOut />
                    <Button onClick={logoutHandler} variant="link">
                      Logout
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden flex items-center">
          <Popover>
            <PopoverTrigger asChild>
              <button className="focus:outline-none">
                <span className="text-xl font-bold">☰</span>
              </button>
            </PopoverTrigger>

            <PopoverContent className="p-4 bg-white shadow-xl border-none w-72">
              <ul className="flex flex-col gap-4">
                {user && user.role === "recruiter" ? (
                  <>
                    <li>
                      <Link to="/admin/companies">Companies</Link>
                    </li>
                    <li>
                      <Link to="/admin/jobs">Jobs</Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link to="/">Home</Link>
                    </li>
                    <li>
                      <Link to="/jobs">Jobs</Link>
                    </li>
                    <li>
                      <Link to="/browse">Browse</Link>
                    </li>
                  </>
                )}
              </ul>
              {!user ? (
                <div className="mt-4 flex flex-col gap-4">
                  <Link to="/login">
                    <Button variant="outline" className="w-full">
                      Login
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button className="w-full bg-[#6A38C2] hover:bg-[#5b30a6]">
                      SignUp
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="mt-4 flex flex-col gap-3">
                  {user && user.role === "student" && (
                    <div className="flex items-center gap-2 cursor-pointer">
                      <User2 />
                      <Button variant="link">
                        <Link to="/profile">View Profile</Link>
                      </Button>
                    </div>
                  )}
                  <div className="flex items-center gap-2 cursor-pointer">
                    <LogOut />
                    <Button onClick={logoutHandler} variant="link">
                      Logout
                    </Button>
                  </div>
                </div>
              )}
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
