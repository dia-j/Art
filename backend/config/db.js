// filename: test-db.js
import mongoose from 'mongoose';

export const connectDB = async (uri = process.env.MONGO_URI) => {
  if (!uri) {
    throw new Error('MONGO_URI not set. Add backend/.env with MONGO_URI');
  }

  try {
    console.log('Attempting mongoose.connect...');
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000, // short timeout for dev
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    throw err;
  }
};