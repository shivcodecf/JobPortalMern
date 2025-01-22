import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Pen, Mail, Contact } from "lucide-react";
import { Badge } from "./ui/badge";
import AppliedJobTable from "./AppliedJobTable";
import { Label } from "@radix-ui/react-label";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";

const Profile = () => {
  useGetAppliedJobs();
  const isResume = true;
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const handleClick = () => {
    if (user?.profile?.resume) {
      window.open(user.profile.resume, "_blank");
    } else {
      alert("No resume available!");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div className="flex items-center gap-4">
            <Avatar className="w-16 h-16 rounded-full overflow-hidden cursor-pointer">
              <AvatarImage
                src="https://github.com/shadcn.png"
                alt="@shadcn"
                className="w-full h-full object-cover"
              />
            </Avatar>

            <div>
              <h1 className="font-medium text-xl">{user?.fullname}</h1>
              <p>{user?.profile?.bio}</p>
            </div>
          </div>
          <Button
            onClick={() => setOpen(true)}
            className="self-start md:self-center"
            variant="outline"
          >
            <Pen />
          </Button>
        </div>
        <div className="my-5">
          <div className="flex items-center gap-2">
            <Mail />
            <span>{user?.email}</span>
          </div>

          <div className="flex items-center gap-2 my-2">
            <Contact />
            <span>{user?.phoneNumber}</span>
          </div>
          <div className="my-5">
            <h1 className="font-bold">Skills</h1>
            <div className="flex flex-wrap gap-2">
              {user?.profile?.skills.length > 0
                ? user?.profile?.skills.map((item, index) => (
                    <Badge key={index}>{item}</Badge>
                  ))
                : "NA"}
            </div>
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label className="text-md font-bold">Resume</Label>
            {isResume ? (
              <a
                target="_blank"
                href={user?.profile?.resume}
                className="text-blue-500 w-full hover:underline cursor-pointer"
              >
                {user?.profile?.resumeOriginalName}
              </a>
            ) : (
              <span>NA</span>
            )}
          </div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto bg-white rounded-2xl px-4 sm:px-6 lg:px-8 py-5">
        <h1 className="font-bold text-lg mb-4">Applied Jobs</h1>
        <AppliedJobTable />
      </div>
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
