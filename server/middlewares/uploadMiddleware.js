import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { extname } from "path";
import * as dotenv from "dotenv";
dotenv.config();

// Create an S3 client
const s3Client = new S3Client({
  region: process.env.AWS_ACCOUNT_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCOUNT_ACCESS_KEY,
    secretAccessKey: process.env.AWS_ACCOUNT_SECRET_ACCESS_KEY,
  },
});

export const uploadCoverImage = async (file, id) => {
  console.log(file, id);
  try {
    // Determine the content type based on the file extension
    const contentType = `image/${extname(file.originalname).substring(1)}`;

    // Set the parameters
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: file.originalname, // File name you want to save as in S3
      Body: file.buffer,
      ContentType: contentType,
    });

    // Upload the file
    const response = await s3Client.send(command);
    console.log("File uploaded to S3:", response);
  } catch (error) {
    console.error("Failed to upload file to S3:", error);
    throw new Error("Failed to upload file to S3");
  }
};
