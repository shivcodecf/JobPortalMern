import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/redux/companySlice";
import axios from "axios";

const CompanyCreate = () => {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState("");
  const dispatch = useDispatch();

  const registerNewCompany = async () => {
    const token = localStorage.getItem("authToken");  // ✅ Token Fetch Karo
    try {
      const res = await axios.post(
        `${COMPANY_API_END_POINT}/register`,
        { companyName },
        {
          headers: {
            
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,  // ✅ Token Add Karo
           
          },
          withCredentials: true,
        }
      );

      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res.data.message);
        const companyId = res?.data?.company?._id;
        navigate(`/admin/companies/${companyId}`);
      }
    } catch (error) {
      toast.error("Failed to create company. Please try again.");
      console.error(error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <h1 className="font-bold text-2xl mb-2">Your Company Name</h1>
          <p className="text-gray-500">
            What would you like to give your company name? You can change this later.
          </p>
        </div>

        <div className="mb-6">
          <Label htmlFor="companyName">Company Name</Label>
          <Input
            id="companyName"
            type="text"
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            placeholder="Microsoft, etc."
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={() => navigate("/admin/companies")}
            className="px-6 py-2"
          >
            Cancel
          </Button>
          <Button
            onClick={registerNewCompany}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CompanyCreate;
