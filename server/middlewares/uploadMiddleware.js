import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

// Create an S3 client
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export const uploadCoverImage = async (file, id) => {
  try {
    // Set the parameters
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `${id}.jpg`, // File name you want to save as in S3
      Body: file.buffer,
      ACL: "public-read",
    });

    // Upload the file
    const response = await s3Client.send(command);
    console.log("File uploaded to S3:", response);
  } catch (error) {
    console.error("Failed to upload file to S3:", error);
    throw new Error("Failed to upload file to S3");
  }
};
