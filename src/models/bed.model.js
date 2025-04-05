import { Schema, model } from "mongoose";

const bedSchema = new Schema(
  {
    room: { 
        type: Schema.Types.ObjectId, 
        ref: "Room", 
        required: true 
    },
    hospital: { 
        type: Schema.Types.ObjectId, 
        ref: "Hospital", required: true 
    },
    isAvailable: { 
        type: Boolean, 
        default: true 
    },
    patient: { 
        type: Schema.Types.ObjectId, 
        ref: "Patient", 
        default: null 
    },
  },
  { timestamps: true }
);

const Bed = model("Bed", bedSchema);
export default Bed;
