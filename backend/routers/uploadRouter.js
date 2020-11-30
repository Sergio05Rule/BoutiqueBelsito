import multer from 'multer';
import express from 'express';
import { isAuth } from '../utils.js';

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

export default uploadRouter;