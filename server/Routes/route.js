import express from "express";
import dotenv from "dotenv";
import {
  ChangePassword,
  CreateComplaint,
  Sign,
  UpdateComplaint,
  VerifyOTP,
  ResendOTP,
  ResetPassword,
  DeleteProperty,
  SeeProperty,
  InterestedMail,
  Signup,
  GetUser,
} from "../handler/handler.js";
import { checkAuth } from "../handler/checkAuth.js";

const router = express.Router();
dotenv.config();
router.use(express.json());
router.get("/", (req, res) => {
  res.send("Server is running");
});

// router.post("/signup", checkAuth, AdminSignup);
router.post("/signup", Signup);
router.post("/verifyOTP", VerifyOTP);
router.post("/resendOTP", ResendOTP);
router.post("/login", Sign);
router.put("/resetpassword", ResetPassword);
router.post("/createcomplaint", checkAuth, CreateComplaint);
router.get("/complaint", checkAuth, SeeProperty);
router.post("/getUser", checkAuth, GetUser);
router.post("/interested", checkAuth, InterestedMail);
router.put("/update", checkAuth, UpdateComplaint);
router.delete("/deleteproperty", checkAuth, DeleteProperty);
router.put("/dashboard/changePass", checkAuth, ChangePassword);

export default router;
