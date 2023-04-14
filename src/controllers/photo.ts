import express, { Request, Response, Router } from "express";
import multer from "multer";
import path from "path";

const router: Router = express.Router();

// Define storage for the uploaded files
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join(__dirname, "../Images"));; // Save uploaded files to "Images" folder
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname); // Set the file name to the current timestamp + file extension
  },
});

// Create an instance of the multer middleware with the defined storage settings
const upload = multer({
  storage: storage,
});


// Get photos
router.get("/", (request: Request, response: Response) => {
  response.send("Photos served from the 'Images' folder");
});


// Add in a new photo
router.post("/", upload.single("photo"), (request: Request, response: Response) => {
  console.log(request.body);
  console.log(request.file); // Log the uploaded file information
  
  response.send("Photo uploaded successfully!"); // Send a success response
});


// Serve photos from the "Images" folder
router.get("/:imageName", (request: Request, response: Response) => {
  const imageName = request.params.imageName;
  response.sendFile(path.join(__dirname, `../Images/${imageName}`));
});

export default router;
