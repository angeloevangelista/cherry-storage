export default {
  name: process.env.AWS_BUCKET_NAME,
  region: process.env.AWS_S3_REGION,
  accessKeyId: process.env.AWS_ID,
  secretAccessKey: process.env.AWS_SECRET,
};
