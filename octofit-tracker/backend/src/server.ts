import express from 'express';
import mongoose from 'mongoose';
import './config/database';
import healthRouter from './routes/health';

const app = express();
const port = 8000;

app.use(express.json());
app.use('/api', healthRouter);

async function startServer() {
  try {
    await mongoose.connection.asPromise();
    app.listen(port, '0.0.0.0', () => {
      console.log(`OctoFit API listening on port ${port}`);
    });
  } catch (error) {
    console.error('Unable to start OctoFit API:', error);
    process.exit(1);
  }
}

void startServer();