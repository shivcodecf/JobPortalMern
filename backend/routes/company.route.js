import express from "express";

import isauthenticated from "../middlewares/isAuthenticated.js";

import { singleUpload } from "../middlewares/multer.js";


import { getCompany, getCompanyById, registerCompany,updateCompany } from "../controllers/company.controller.js";


const router = express.Router();

router.route("/register").post(isauthenticated,registerCompany);
router.route("/get").get(isauthenticated,getCompany);
router.route("/get/:id").get(isauthenticated,getCompanyById);
router.route("/update/:id").put(isauthenticated,singleUpload,updateCompany);

export default router;



