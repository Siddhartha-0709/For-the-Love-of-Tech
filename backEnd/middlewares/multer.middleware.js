import multer from "multer";

// Define the storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Set the destination for the uploaded files
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    // Set the filename for the uploaded file
    cb(null, Date.now() + '-' + file.originalname); // Adding a timestamp to ensure unique filenames
  }
});

// Define the file filter (optional, you can filter file types)
const fileFilter = (req, file, cb) => {
  // Accept only certain types of files (optional)
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true); // Accept file
  } else {
    cb(new Error('Only JPEG and PNG images are allowed'), false); // Reject file
  }
};

// Set the file size limit (e.g., 5MB)
export const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
  fileFilter: fileFilter // Apply the file filter (optional)
});

// Error handling middleware for Multer
export const multerErrorHandler = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    // Handle Multer-specific errors (e.g., file size exceeded)
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(413).json({ message: 'File too large. Maximum size is 5MB.' });
    }
  } else if (err) {
    // Handle other errors
    return res.status(500).json({ message: err.message });
  }
  next();
};
