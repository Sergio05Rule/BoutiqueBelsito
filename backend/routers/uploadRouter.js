import multer from 'multer';
import express from 'express';
import { isAuth } from '../utils.js';
import multerS3 from 'multer-s3';
import aws from 'aws-sdk';
import dotenv from 'dotenv';

dotenv.config();

const uploadRouter = express.Router();

// define a multer storage
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/'); // error callback value = null, destination folder 
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}.jpg`); // ... , filename
  },
});

const upload = multer({ storage });

// define the API
uploadRouter.post('/', isAuth, upload.single('image'), (req, res) => {
  res.send(`/${req.file.path}`);
});

aws.config.update({
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey,
});

const s3 = new aws.S3();
const storageS3 = multerS3({
  s3,
  bucket: 'boutiquebelsito-bucket',
  acl:'public-read',
  contentType: multerS3.AUTO_CONTENT_TYPE,
  key(req,file,cb){
    cb(null, file.originalname);
  },
});
const uploadS3 = multer({storage: storageS3 });
uploadRouter.post('/s3',uploadS3.single('image'),(req,res) =>{
  res.send(req.file.location);
});

export default uploadRouter;