import jwt from "jsonwebtoken";
import Patient from "../models/patient.model.js";

const isLoggedIn = async(req, res, next) => {
  let token;
  
  // Check for token in cookies first (preferred method)
  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }
  // Fall back to Authorization header if no cookie
  else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    token = req.headers.authorization.replace("Bearer ", "");
  }

  if (!token) {
    return res.status(401).json({ error: "Unauthorized. Please login" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Check if user still exists in database
    const patient = await Patient.findById(decoded.userId);
    if (!patient) {
      return res.status(401).json({ error: "User no longer exists" });
    }
    
    // Attach user info to request
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

export {
  isLoggedIn
};