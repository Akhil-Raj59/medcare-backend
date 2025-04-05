import { Schema, model } from 'mongoose';

const doctorSchema = new Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
    match: [/^\d{10}$/, 'Please enter a valid phone number'], // Optional phone validation
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/\S+@\S+\.\S+/, 'Please enter a valid email address'],
  },
  otp:{
    type:String,
    default:null
  },
  otpExpiration:{
    type:Date,
    default:null
  },
  isVerified:{
    type:String,
    default:false
  },
  specialization: {
    type: String,
    required: true,
    trim: true,
    enum: ['Cardiologist', 'Neurologist', 'Pediatrician', 'Orthopedist', 'General Surgeon', 'Dentist', 'Other'],
  },
  department: {
    type: String,
    enum: ['Emergency', 'Pediatrics', 'Cardiology', 'Neurology', 'Orthopedics', 'General Surgery', 'Other'],
    required: true,
  },
  qualification: {
    type: String,
    required: true,
    trim: true,
  },
  experience: {
    type: Number,
    required: true,
    min: [0, 'Experience cannot be less than 0'],
    max: [50, 'Experience cannot exceed 50 years'], // Optional limit for experience
  },
  workingHours: {
    type: String,
    required: true, // Example: "9 AM - 5 PM"
  },
  dateOfJoining: {
    type: Date,
    default: Date.now, // Automatically sets the current date when the doctor joins
  },
  isActive: {
    type: Boolean,
    default: true, // By default, the doctor is active unless marked otherwise
  },
}, {
  timestamps: true, // Automatically handle createdAt and updatedAt
});

// Create the Doctor model
const Doctor = model('Doctor', doctorSchema);

export default Doctor;
