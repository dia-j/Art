import express from 'express';
import { addArt, listArt, removeArt } from '../controllers/artController.js';
import multer from 'multer';

const artRouter = express.Router();

// simple disk storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// POST /api/art/add
artRouter.post('/add', upload.single('image'), addArt);
artRouter.post('/remove', removeArt)

artRouter.get('/list', listArt )

export default artRouter;