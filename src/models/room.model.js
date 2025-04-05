import { Schema, model } from "mongoose";

const roomSchema = new Schema(
  {
    hospital: { 
        type: Schema.Types.ObjectId, 
        ref: "Hospital", required: true
     },
    wardType: { 
        type: String, 
        enum: ["General", "ICU", "Emergency", "Pediatrics", "Cardiology"], 
        required: true
     },
    totalBeds: { 
        type: Number, 
        required: true
     },
    availableBeds: { 
        type: Number, 
        required: true, 
        default: 0
     },
    pricePerDay: { 
        type: Number, 
        required: true
     },
  },
  { timestamps: true }
);

const Room = model("Room", roomSchema);
export default Room;
