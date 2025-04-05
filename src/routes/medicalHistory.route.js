import express from "express";
import { isLoggedIn } from "../middlewares/auth.middleware.js";
import { addMedicalHistory, getMedicalHistory, updateMedicalHistory } from "../controllers/medicalHistory.controller.js";

const medHisrouter = express.Router();

// Add medical history
medHisrouter.post("/add",isLoggedIn, addMedicalHistory);

// Get medical history for a patient
medHisrouter.get("/:patientId",isLoggedIn, getMedicalHistory);

// Update medical history
medHisrouter.put("/update/:historyId",isLoggedIn, updateMedicalHistory);

export default medHisrouter;
