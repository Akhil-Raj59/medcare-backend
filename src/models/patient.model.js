import { Schema, model } from "mongoose";
const patientSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },
    idProof: {
      public_id: {
        type: String
      },
      secure_url: {
        type: String
      },
    },
    age: {
      type: Number,
      required: true,
      min: 1,
    },
    medicalHistory: [{ 
      type: Schema.Types.ObjectId, 
      ref: "MedicalHistory" 
    }],
    bookedBed: { 
      type: Schema.Types.ObjectId, 
      ref: "Bed" 
    },
    otp: {
      type: String,
      default: null,
    },
    otpExpiration: {
      type: Date,
      default: null,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    token: {
      type: String
    },
    moodLogs: [{ 
      type: Schema.Types.ObjectId, 
      ref: "Mood" 
    }],
  },
  {
    timestamps: true,
  }
);

const Patient = model("Patient", patientSchema);

export default Patient;
