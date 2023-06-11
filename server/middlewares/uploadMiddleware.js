import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

// Create an S3 client
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export async function uploadCoverImage(req, id) {
  const file = req.file;

  // Set the parameters
  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `${id}.jpg`, // File name you want to save as in S3
    Body: file.buffer,
    ACL: "public-read",
  });

  // Upload the file
  await s3Client.send(command);
}

await uploadCoverImage(req.file, createdBook._id);
