import React, { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableHead,
  TableCaption,
  TableRow,
  TableBody,
  TableCell,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, MoreHorizontal, Eye } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminJobstable = () => {
  const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredJobs =
      allAdminJobs.length >= 0 &&
      allAdminJobs.filter((job) => {
        if (!searchJobByText) {
          return true;
        }

        return (
          job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
          job?.company?.name?.toLowerCase().includes(searchJobByText.toLowerCase())
        );
      });

    setFilterJobs(filteredJobs);
  }, [allAdminJobs, searchJobByText]);

  return (
    <div className="overflow-x-auto px-4 sm:px-6 lg:px-8">
      <Table className="w-full">
        <TableCaption>A list of your recent posted Jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterJobs.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                No Job found.
              </TableCell>
            </TableRow>
          ) : (
            filterJobs.map((job) => (
              <TableRow key={job._id}>
                <TableCell>{job?.company?.name}</TableCell>
                <TableCell>{job?.title}</TableCell>
                <TableCell>
                  {job.createdAt ? job?.createdAt.split("T")[0] : "N/A"}
                </TableCell>
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger aria-label="More actions">
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-40">
                      <div
                        className="flex items-center gap-2 cursor-pointer"
                        onClick={() => navigate(`/admin/companies/${job._id}`)}
                      >
                        <Edit2 className="w-4" />
                        <span>Edit</span>
                      </div>
                      <div
                        className="flex items-center gap-2 cursor-pointer mt-2"
                        onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                      >
                        <Eye className="w-4" />
                        <span>Applicants</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminJobstable;
