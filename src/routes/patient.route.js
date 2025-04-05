import { Router } from 'express';
import { 
    login, 
    logout, 
    patientProfile, 
    register, 
    verifyOTP,
    getMyProfile  // Import the new function
} from '../controllers/patient.controller.js';
import upload from '../middlewares/multer.middleware.js';
import { isLoggedIn } from '../middlewares/auth.middleware.js';

const patientRouter = Router();

// Public routes
patientRouter.post('/register', upload.single("idProof"), register);
patientRouter.post('/verify-otp', verifyOTP);
patientRouter.post('/login', login);
patientRouter.post('/logout', logout);  

// Protected routes
patientRouter.get('/patient-profile/me', isLoggedIn, getMyProfile);  // Use getMyProfile instead of patientProfile
patientRouter.get('/patient-profile/:patientId', isLoggedIn, patientProfile);

export default patientRouter;