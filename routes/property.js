import express from "express";
import { createProperty, deleteProperty, getProperties, updateProperty } from "../controllers/propertyController.js";
import multer from "multer";

const router = express.Router();

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("Uploading to directory: uploads/");
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const filename = Date.now() + "-" + file.originalname;
    console.log("Generated filename:", filename);
    cb(null, filename);
  },
});

const upload = multer({ storage });

// Route to create a property
router.post("/create-property", upload.single("image"), createProperty);
router.get("/", getProperties);
router.put('/:id', updateProperty); 
router.delete('/:id', deleteProperty); 
export default router;
