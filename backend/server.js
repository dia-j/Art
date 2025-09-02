import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { fileURLToPath } from 'url';
import path from 'path';
import { connectDB } from './config/db.js';
import artRouter from './routes/artRoute.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

// serve uploaded files from absolute path at /images
app.use('/images', express.static(path.join(__dirname, 'uploads')));

connectDB(process.env.MONGO_URI)
  .then(() => {
    // mount router normally (remove temporary debug middleware)
    app.use('/api/art', artRouter);

    app.get('/', (req, res) => res.send('Jarin Tasnim Dia'));
    app.listen(port, () => console.log(`listening on http://localhost:${port}`));
  })
  .catch((err) => {
    console.error('DB connection failed, server not started');
    if (err) {
      console.error(err.stack || err);
    } else {
      console.error('No error object provided to .catch()');
    }
    process.exit(1);
  });
