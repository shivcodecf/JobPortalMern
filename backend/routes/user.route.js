import express from "express";
import isauthenticated from "../middlewares/isAuthenticated.js";

import { register,login,updatedProfile,logout} from "../controllers/user.controller.js";

import { singleUpload } from "../middlewares/multer.js";

const router = express.Router();

router.route("/register").post(singleUpload,register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile/update").post(isauthenticated,singleUpload,updatedProfile);

export default router


