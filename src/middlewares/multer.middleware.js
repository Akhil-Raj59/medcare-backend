import multer from 'multer'
import cloudinary from "cloudinary";
// import { CloudinaryStorage } from 'multer-storage-cloudinary';
import path from 'path';
import { config } from 'dotenv';
config();


// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const upload = multer({
    dest: "patient_id_proof/",
    limits: {fileSize: 50*1024*1024}, //50MB in max size
    storage: multer.diskStorage({
        destination: "patient_id_proof/",
        filename: (_req,file,cb)=>{
            cb(null,file.originalname);
        }
    }),
    fileFilter: (_req,file,cb)=>{
        let ext = path.extname(file.originalname);
        if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".webp" && ext !== ".png" && ext !== ".mp4" && ext !== ".pdf") {
            cb(new Error(`Unsupported file type! ${ext}`),false);
            return;
        }
        cb(null , true);
    },
});

export default upload;




// ye code jbb deploy krenge to kaam aayega

// Use Cloudinary Storage instead of Disk Storage
// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: 'patient_id_proof', // Folder name in Cloudinary
//     format: async () => 'png'|| '.jpg' || '.jpeg' || '.pdf', // or jpg
//     public_id: (req, file) => file.filename,
//   },
// });

// const upload = multer({ storage });

// export default upload;