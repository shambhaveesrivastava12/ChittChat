// backend/middleware/multer.middleware.js
import multer from "multer";
import path from "path";
import fs from "fs";

const __dirname = path.resolve();

// ✅ Absolute path to upload directory
const uploadDir = path.join(__dirname, "backend", "public", "uploads");

// ✅ Ensure upload folder exists (important for Render)
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log("✅ Created uploads folder:", uploadDir);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

export default upload;
