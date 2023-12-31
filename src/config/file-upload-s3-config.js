import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";
import dotenv from "dotenv";

dotenv.config();

aws.config.update({
  region: process.env.AWS_REGION,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  accessKeyId: process.env.ACCESS_KEY_ID,
});

const s2 = aws.S3();

const uplaod = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.BUCKET_NAME,
    // permission
    acl: "public-read",
    // metadata taking the req object, the file and the callback
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },

    // creating a file on date time object
    key: function (req, file, cb) {
      cb(null, Date.now().toString());
    },
  }),
});

export default multer;
