import axios from "axios";

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

if (!GROQ_API_KEY) {
  console.error("❌ Missing Groq API Key! Check your .env file.");
  process.exit(1);
}

// ✅ Handle text-based medical chat messages
export const chatWithGroq = async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "Message is required" });

    console.log("🧠 Sending medical request to Groq API:", message);

    // Using the model that works with your account
    const response = await axios.post(
      GROQ_API_URL,
      { 
        model: "llama3-8b-8192", // Using the model that was working before
        messages: [
          { 
            role: "system", 
            content: "You are a helpful medical assistant providing general health information. Always clarify you are not a substitute for professional medical advice." 
          },
          { 
            role: "user", 
            content: message 
          }
        ] 
      },
      { headers: { Authorization: `Bearer ${GROQ_API_KEY}` } }
    );

    // Add medical disclaimer
    const disclaimer = "\n\nDisclaimer: This is an AI assessment and not a substitute for professional medical advice. Please consult a healthcare provider for proper diagnosis and treatment.";

    console.log("✅ Groq Medical API Response Received");
    res.json({ reply: response.data.choices[0].message.content + disclaimer });
  } catch (error) {
    console.error("🔥 Medical Chat Error:", error.response?.data || error.message);
    res.status(500).json({ error: "Medical chat processing failed" });
  }
};

// ✅ Analyze medical images using Base64
export const analyzeImageBase64 = async (req, res) => {
  try {
    const { 
      image_base64, 
      query = "Please provide a medical assessment of what's shown in this image. You are a medical assistant analyzing medical images. Provide observations about what you see while being cautious not to make definitive diagnoses." 
    } = req.body;
    
    if (!image_base64) return res.status(400).json({ error: "No medical image provided" });

    // Ensure proper formatting (remove any data URI prefix)
    const cleanedBase64 = image_base64.replace(/^data:image\/\w+;base64,/, "");

    console.log("🖼️ Analyzing Medical Image");

    const response = await axios.post(
      GROQ_API_URL,
      {
        model: "llama-3.2-11b-vision-preview", // Using the vision model that was working before
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: query },
              { type: "image_url", image_url: { url: `data:image/jpeg;base64,${cleanedBase64}` } }
            ]
          }
        ]
      },
      { headers: { Authorization: `Bearer ${GROQ_API_KEY}` } }
    );

    // Add medical disclaimer
    const disclaimer = "\n\nDisclaimer: This is an AI assessment and not a substitute for professional medical advice. Please consult a healthcare provider for proper diagnosis and treatment.";
    
    console.log("✅ Medical Image Analysis Response Received");
    res.json({ 
      reply: response.data.choices[0].message.content + disclaimer 
    });
  } catch (error) {
    console.error("🔥 Medical Image Analysis Error:", error.response?.data || error.message);
    res.status(500).json({ error: "Medical image processing failed" });
  }
};

// ✅ Validate input is a proper image before processing
export const validateImage = (req, res, next) => {
  try {
    const { image_base64 } = req.body;
    
    if (!image_base64) {
      return res.status(400).json({ error: "No image provided" });
    }
    
    // Check if it's a valid base64 string
    const cleanedBase64 = image_base64.replace(/^data:image\/\w+;base64,/, "");
    
    try {
      const buffer = Buffer.from(cleanedBase64, 'base64');
      if (buffer.length === 0) {
        return res.status(400).json({ error: "Invalid image data" });
      }
      
      // Check file size (limit to 5MB)
      if (buffer.length > 5 * 1024 * 1024) {
        return res.status(400).json({ error: "Image too large (max 5MB)" });
      }
      
      // Image is valid, proceed
      next();
    } catch (e) {
      return res.status(400).json({ error: "Invalid base64 encoding" });
    }
  } catch (error) {
    console.error("🔥 Image Validation Error:", error);
    res.status(500).json({ error: "Image validation failed" });
  }
};