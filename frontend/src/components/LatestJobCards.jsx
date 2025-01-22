import React from "react";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const LatestJobCards = ({ id, job }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/description/${job._id}`)}
      className="p-5 rounded-md shadow-lg bg-white border border-gray-200 cursor-pointer hover:shadow-2xl transition-shadow duration-300 ease-in-out"
    >
      {/* Company Name and Location */}
      <div className="mb-3">
        <h1 className="font-medium text-lg text-gray-900">{job?.company?.name}</h1>
        <p className="text-sm text-gray-500">{job?.location || "Remote"}</p>
      </div>

      {/* Job Title and Description */}
      <div>
        <h1 className="font-bold text-lg text-[#6A38C2] my-2">{job?.title}</h1>
        <p className="text-sm text-gray-600 line-clamp-3">
          {job?.description || "No description available."}
        </p>
      </div>

      {/* Job Details (Badges) */}
      <div className="flex flex-wrap items-center gap-2 mt-4">
        <Badge className="text-blue-700 font-bold" variant="ghost">
          {job?.position || "N/A"}
        </Badge>
        <Badge className="text-[#F83002] font-bold" variant="ghost">
          {job?.jobType || "Full-time"}
        </Badge>
        <Badge className="text-[#7209B7] font-bold" variant="ghost">
          {job?.salary || "Negotiable"}
        </Badge>
      </div>
    </div>
  );
};

export default LatestJobCards;
