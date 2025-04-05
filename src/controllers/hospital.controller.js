import Hospital from "../models/hospitalManager.model.js";
import generateOTP from "../utils/generateOTP.util.js";
import { sendOTPEmail } from "../utils/sendOTP.utils.js";

// Get all hospitals
const getHospitals = async (req, res) => {
  try {
    const hospitals = await Hospital.find()
      // .populate("doctors rooms");
    res.status(200).json({message: "All Hospitals found successfully", hospitals});
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Get a single hospital by ID
const getHospitalById = async (req, res) => {
  try {
    const {hospitalId} = req.params;
    const hospital = await Hospital.findById(hospitalId)
      // .populate("doctors rooms");
    if (!hospital) return res.status(404).json({ message: "Hospital not found" });
    res.status(200).json({message: "Hospital found successfully",hospital});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new hospital
const addHospital = async (req, res) => {
  try {
    const { hospitalName, address, phone, email,ambulanceCount, departments, totalBeds } = req.body;
    if (!hospitalName || !address || !phone || !email || !departments || !ambulanceCount || !totalBeds) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if hospital already exists
    const hospitalExists = await Hospital.findOne({
      $or: [{ hospitalName }, { email }],
    });
    if (hospitalExists) {
      return res.status(400).json({ message: "Hospital already exists" });
    }

    const otp = generateOTP();
    const otpExpiration = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes expiry

    const hospital = new Hospital({ 
      hospitalName, 
      address, 
      phone, 
      email,
      otp,
      otpExpiration,
      ambulanceCount, 
      departments, 
      totalBeds, 
      availableBeds: totalBeds 
    });

    await sendOTPEmail(email, otp);
    await hospital.save();

    res.status(201).json({message: `OTP sent to your mail id : ${email}` });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const verifyOTP = async(req,res,next)=>{
    const { email, otp } = req.body;
    if (!email || !otp){
        return res.status(400).json({ error: "Email and OTP are required" });
    }

    try {
        const hospital = await Hospital.findOne({ email });
        if (!hospital) return res.status(404).json({ error: "Patient not found" });

        if (hospital.otp !== otp || hospital.otpExpiration < Date.now()) {
            return res.status(400).json({ error: "Invalid or expired OTP" });
        }

        hospital.isVerified = true;
        hospital.otp = null;
        hospital.otpExpiration = null;
        await hospital.save();

        // const token = jwt.sign({ userId: hospital._id }, 
        //     process.env.JWT_SECRET, {
        //     expiresIn: "7d",
        // });
        // res.cookie('token' , token, cookieOptions);

        res.json({ message: "Hospital added successful", hospital });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export { 
    getHospitals, 
    getHospitalById, 
    addHospital,
    verifyOTP 
};