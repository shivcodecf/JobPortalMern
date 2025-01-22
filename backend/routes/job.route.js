import express from "express";
import isauthenticated from "../middlewares/isAuthenticated.js";
import { getAdminJobs, postJob,getAllJobs,getJobById } from "../controllers/job.controller.js";



const router = express.Router();

router.route("/post").post(isauthenticated,postJob);
router.route("/get").get(isauthenticated,getAllJobs);
router.route("/getadminjobs").get(isauthenticated,getAdminJobs);
router.route("/get/:id").get(isauthenticated,getJobById);

export default router


