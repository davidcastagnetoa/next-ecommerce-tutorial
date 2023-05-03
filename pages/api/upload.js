import multiparty from "multiparty";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import fs from 'fs';
import mime from 'mime-types';

const bucketName = "david-next-ecommerce";


export default async function handle(request, response) {
  const form = new multiparty.Form();
  const { fields, files } = await new Promise((resolve, reject) => {
    form.parse(request, (error, fields, files) => {
      if (error) reject(error);
      resolve({ fields, files });
    });
  });
  console.log("length", files.file.length);
  const client = new S3Client({
    region: "eu-north-1",
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    },
  });
  const links = [];
  for (const file of files.file) {
    const extension = file.originalFilename.split(".").pop();
    // const newFilename = Date.now() + "." + extension;
    const newFilename = `${fields.name}-${Date.now()}.${extension}`;
    // console.log({ extension, file });
    await client.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: newFilename,
        Body: fs.readFileSync(file.path),
        ACL: "public-read",
        ContentType: mime.lookup(file.path),
      })
    );
    const link = `https://${bucketName}.s3.eu-north-1.amazonaws.com/${newFilename}`;
    links.push(link);
  }
  return response.json({links});
}

export const config = {
  api: { bodyParser: false },
};
