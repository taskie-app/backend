const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
// Multer setup for handling file uploads
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    const uniqueSuffix = uuidv4();
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

exports.upload = multer({ storage });
