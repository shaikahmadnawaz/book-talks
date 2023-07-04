import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { extname } from "path";
import * as dotenv from "dotenv";
dotenv.config();

// This creates an S3 client
const s3Client = new S3Client({
  region: process.env.AWS_ACCOUNT_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCOUNT_ACCESS_KEY,
    secretAccessKey: process.env.AWS_ACCOUNT_SECRET_ACCESS_KEY,
  },
});

export const uploadImage = async (file, folderName, id) => {
  console.log(file, folderName, id);
  try {
    // Determining the content type based on the file extension
    const contentType = `image/${extname(file.originalname).substring(1)}`;

    // Setting the parameters
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `${folderName}/${id}/${file.originalname}`, // Path to the specified folder with user id and file name
      Body: file.buffer,
      ContentType: contentType,
    });

    // Uploading the file
    await s3Client.send(command);
  } catch (error) {
    console.error("Failed to upload file to S3:", error);
    throw new Error("Failed to upload file to S3");
  }
};
