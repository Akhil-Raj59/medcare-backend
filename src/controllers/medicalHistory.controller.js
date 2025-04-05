import Patient from "../models/patient.model.js";
import MedicalHistory from "../models/medicalHistory.model.js";

const addMedicalHistory = async (req, res) => {
  try {
    const { patientId, doctorId, diagnosis, medications, treatmentPlan, notes } = req.body;

    // Ensure the patient exists
    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    // Create new medical history record
    const newMedicalHistory = new MedicalHistory({
      patient: patientId,
      doctor: doctorId,
      diagnosis,
      medications,
      treatmentPlan,
      notes,
    });

    // Save to DB
    const savedMedicalHistory = await newMedicalHistory.save();

    // Add history reference to the patient
    patient.medicalHistory.push(savedMedicalHistory._id);
    await patient.save();

    res.status(201).json({
      success: true,
      message: "Medical history added successfully",
      medicalHistory: savedMedicalHistory,
    });
  } catch (error) {
    console.error("Error adding medical history:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


const getMedicalHistory = async (req, res) => {
    try {
        const {patientId} = req.params; // Authenticated patient's ID
        
        const { page = 1, limit = 10 } = req.query; // Pagination params
    
        // Fetch medical history with pagination
        const history = await MedicalHistory.find({ patient: patientId })
          // .populate("doctor", "fullName specialization")
          .sort({ date: -1 }) // Sort by latest first
          .skip((page - 1) * limit) // Skip previous records
          .limit(parseInt(limit)); // Limit records per page
    
        if (!history.length) {
          return res.status(404).json({ error: "No medical history found" });
        }
    
        // Get total count for pagination
        const totalRecords = await MedicalHistory.countDocuments({ patient: patientId });
    
        res.json({
          success: true,
          medicalHistory: history,
          totalPages: Math.ceil(totalRecords / limit),
          currentPage: parseInt(page),
          totalRecords,
        });
      } catch (error) {
        console.error("Error fetching medical history:", error);
        res.status(500).json({ error: "Internal server error" });
      }
};

  
const updateMedicalHistory = async (req, res) => {
    try {
      const { historyId } = req.params;
      const updates = req.body;
  
      // Find and update medical history
      const updatedHistory = await MedicalHistory.findByIdAndUpdate(historyId, updates, { new: true });
  
      if (!updatedHistory) {
        return res.status(404).json({ error: "Medical history record not found" });
      }
  
      res.json({ success: true, message: "Medical history updated", updatedHistory });
    } catch (error) {
      console.error("Error updating medical history:", error);
      res.status(500).json({ error: "Internal server error" });
    }
};

export {
  addMedicalHistory,
  getMedicalHistory,
  updateMedicalHistory,
}