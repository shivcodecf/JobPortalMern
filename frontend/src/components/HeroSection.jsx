import { Search } from "lucide-react";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input"; // Currently not used but can replace the input below
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const HeroSection = () => {
  const [query, setQuery] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    console.log("query", query);
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="text-center px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-5 my-10">
        <span className="mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#33d46e] font-medium text-sm sm:text-base">
          No. 1 Job Hunt Website
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold leading-snug">
          Search, Apply & <br />
          Get Your <span className="text-[#6A38C2]">Dream Jobs</span>
        </h1>
        <p className="text-sm sm:text-base text-gray-600 max-w-md mx-auto">
          Start your journey to success. Create a profile, showcase your talents, and let top companies find you!
        </p>
        <div className="flex flex-col sm:flex-row w-full sm:w-[60%] lg:w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto">
          <input
            type="text"
            placeholder="Find your dream jobs"
            onChange={(e) => setQuery(e.target.value)}
            className="outline-none border-none focus:outline-none focus:ring-0 focus:border-transparent w-full py-2 sm:py-0"
          />
          <Button
            onClick={searchJobHandler}
            className="w-full sm:w-auto rounded-full bg-[#6A38C2] px-4 py-2 text-white flex justify-center items-center"
          >
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
