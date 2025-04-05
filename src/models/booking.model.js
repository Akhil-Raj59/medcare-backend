import { Schema, model } from "mongoose";
import HospitalManager from "./hospitalManager.model";

const bookingSchema = new Schema(
  {
    patientId: {
      type: Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    roomType: {
      type: String,
      enum: [
        "General Ward",
        "Emergency Rooms",
        "ICU",
        "Pediatric Ward",
        "Maternity Ward",
        "Neonatal ICU",
        "Surgical Ward",
        "Orthopedic Ward",
        "Oncology Ward",
        "Cardiology Ward",
        "Geriatric Ward",
        "Isolation Ward",
        "Psychiatric Ward",
        "Dialysis Ward",
        "Respiratory Ward",
        "Burn Ward",
        "Rehabilitation Ward",
        "Day Care Unit",
        "Outpatient Ward",
      ],
      required: true,
    },
    doctorId: {
      type: Schema.Types.ObjectId,
      ref: "Doctor",
      required: true, // Not mandatory for room bookings, but optional for doctor appointments
    },
    hospitalManagerId: {
      type: Schema.Types.ObjectId,
      ref: 'HospitalManager',
      required: true,
    },
    appointmentDate: {
      type: Date,
      required: false, // Not mandatory for room bookings
    },
    roomBookingDate: {
      type: Date,
      required: true, // For room booking date
    },
    bookingStatus: {
      type: String,
      enum: ["Pending", "Confirmed", "Cancelled"],
      default: "Pending",
    },
    amount: {
      type: Number,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["Paid", "Unpaid"],
      default: "Unpaid",
    },
    notes: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true, // Automatically handles createdAt and updatedAt
  }
);

const Booking = model("Booking", bookingSchema);

export default Booking;
