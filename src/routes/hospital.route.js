import express from "express";
import { addHospital, getHospitalById, getHospitals, verifyOTP } from "../controllers/hospital.controller.js";

const hospitalRouter = express.Router();

hospitalRouter.get("/all-hospitals", getHospitals);
hospitalRouter.get("/:hospitalId", getHospitalById);
hospitalRouter.post("/add-hospital", addHospital); // Admin only
hospitalRouter.post("/verify-otp", verifyOTP);

export default hospitalRouter;
