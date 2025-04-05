import { Schema, model } from "mongoose";

const medicalHistorySchema = new Schema(
  {
    patient: {
      type: Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    doctor: {
      type: Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    diagnosis: {
      type: String,
      required: true,
    },
    medications: [
      {
        name: String,
        dosage: String,
        frequency: String,
      }
    ],
    treatmentPlan: {
      type: String,
      required: true,
    },
    notes: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const MedicalHistory = model("MedicalHistory", medicalHistorySchema);

export default MedicalHistory;
