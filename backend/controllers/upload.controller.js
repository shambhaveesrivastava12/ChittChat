// backend/controllers/upload.controller.js
const uploadFile = (req, res) => {
  try {
    if (!req.file) {
      console.log("❌ No file received");
      return res.status(400).json({ error: "No file uploaded." });
    }

    // ✅ Construct file URL (served from /uploads)
    const fileUrl = `/uploads/${req.file.filename}`;
    const fileType = req.file.mimetype;

    console.log("✅ File uploaded successfully:", fileUrl);

    res.status(200).json({ fileUrl, fileType });
  } catch (err) {
    console.error("❌ Upload error:", err);
    res.status(500).json({
      error: "File upload failed",
      details: err.message,
    });
  }
};

export { uploadFile };
