import multer from "multer";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";

// Create an S3 client
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

// Create a multer storage
const storage = multer.memoryStorage();

// Create a multer upload instance
const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // 5MB file size limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"));
    }
  },
});

// Middleware function for handling file upload to AWS S3
export const uploadFileToS3 = async (req, res, next) => {
  upload.single("coverImage")(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred during file upload
      return res
        .status(400)
        .json({ message: "Failed to upload cover image", error: err.message });
    } else if (err) {
      // An unknown error occurred during file upload
      return res
        .status(400)
        .json({ message: "Failed to upload cover image", error: err.message });
    }

    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const extension = file.originalname.split(".").pop();
    const filename = `${uuidv4()}.${extension}`;

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: filename,
      Body: file.buffer,
      ACL: "public-read",
    };

    try {
      // Upload the file to S3
      const command = new PutObjectCommand(params);
      await s3Client.send(command);

      // Store the uploaded file URL in the request object
      req.fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${filename}`;

      // Move to the next middleware or route handler
      next();
    } catch (error) {
      return res.status(500).json({
        message: "Failed to upload cover image",
        error: error.message,
      });
    }
  });
};
