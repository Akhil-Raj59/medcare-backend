import { Schema, model } from "mongoose";

const hospitalSchema = new Schema(
  {
    hospitalName: { 
      type: String, 
      required: true, 
      unique: true 
    },
    address: { 
      type: String, 
      required: true 
    },
    phone: { 
      type: String, 
      required: true 
    },
    email: { 
      type: String, 
      required: true, 
      unique: true 
    },
    otp:{
      type:String,
      default:null
    },
    otpExpiration:{
      type:Date,
      default:null
    },
    departments: [{ 
      type: String, 
      enum: ["Emergency", "ICU", "General", "Pediatrics", "Cardiology", "Other"] 
    }],
    ambulanceCount: {
      type: Number,
      required: true,
      min: [0, 'Ambulance count cannot be negative'],
      default: 0, // Initial number of ambulances
    },
    totalBeds: { 
      type: Number, 
      required: true, 
      min: 1 
    },
    availableBeds: { 
      type: Number, 
      required: true, 
      min: 0, 
      default: 0 
    },
    doctors: [{ 
      type: Schema.Types.ObjectId, 
      ref: "Doctor" 
    }],
    rooms: [{ 
      type: Schema.Types.ObjectId, 
      ref: "Room" 
    }],
    isActive: { 
      type: Boolean, 
      default: true 
    },
  },
  { timestamps: true }
);

const Hospital = model("Hospital", hospitalSchema);
export default Hospital;
