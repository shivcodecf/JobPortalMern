
import { Job } from "../models/job.model.js";
import { Application } from "../models/application.model.js";

export const applyJob = async(req,res) =>{

    try{
     const userId = req.id;
     
     const jobId = req.params.id;

     if(!jobId)
     {
        return res.status(400).json({
            message:"Job Id is required",
            success:false
        })
     };

     //check if the user has already applied for the jobs

     const existingApplication = await Application.findOne({job:jobId,applicant:userId});

     if(existingApplication)
     {
        return res.status(400).json({
            message:"You have already applied for this jobs",
            success:false
        });
     }

     // check if the jobs exists

     const job = await Job.findById(jobId);

     if(!job)
     {
        return res.status(400).json({
            message:"Job not availabe",
            success:false
        })
     }

     //create a new application (in mongodb)

     const newApplication = await Application.create({

        job:jobId,
        applicant:userId,

     })

     job.applications.push(newApplication._id);

     await job.save();

     return res.status(201).json({
        message:"Job applied successfully",
        success:true
     })




    }catch(error)
    {
        console.error(error);
    }
    
}

// particular user jo jo bhi job applies kiya tha mil jayega

export const getAppliedJobs = async(req,res)=>{
    try{
      
        const userId = req.id;

        const application  = await Application.find({applicant:userId}).sort({createdAt:-1}).populate({
            path:'job',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'company',
                options:{sort:{createdAt:-1}},
            }
        })

        if(!application)
        {
            return res.status(404).json({
                message:"No application",
                success:false
            })
        }

        return res.status(200).json({
            application,
            success:true
        })


    }catch(error)
    {
        console.log(error);
    }
}

// admin dekhega kitna user ne apply kiya hai

export const getApplicants = async(req,res)=>{
    try{
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path:'applications',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'applicant',
            }
        });

        if(!job)
        {
            return res.status(404).json({
                message:'Job not found',
                success:false
            })
        };
        return res.status(200).json({
            job,
            success:true
        })

    }catch(error)
    {
        console.log(error);
    }
}



export const updateStatus = async (req, res) => {
    try {
        const { status } = req.body; // Destructure 'status' from the request body
        const applicationId = req.params.id; // Extract 'id' from request parameters

        if (!status) {
            return res.status(400).json({
                message: 'Status is required',
                success: false,
            });
        }

        // Find the application by its ID
        const application = await Application.findById(applicationId);

        if (!application) {
            return res.status(404).json({
                message: 'Application not found',
                success: false,
            });
        }

        // Update the status
        application.status = status.toLowerCase();

        // Save the updated application
        await application.save();

        return res.status(200).json({
            message: 'Status updated successfully',
            success: true,
        });

    } catch (error) {
        console.error('Error updating status:', error);
        return res.status(500).json({
            message: 'Internal server error',
            success: false,
        });
    }
};
