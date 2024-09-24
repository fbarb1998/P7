const multer = require('multer');
const path = require('path');

// Set up storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Define the destination folder for uploaded files
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    // Define the filename for the uploaded file with timestamp to avoid name conflicts
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

// Function to check file type
function checkFileType(file, cb) {
  // Allowed file extensions
  const filetypes = /jpeg|jpg|png|gif|mp4/;
  // Check file extension
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check MIME type
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Only images (jpeg, jpg, png, gif) and videos (mp4) are allowed!');
  }
}

// Initialize multer upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 10000000 }, // Set file size limit to 10MB
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
}).single('media'); // 'media' is the name of the form field for file uploads

module.exports = upload;
