import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { config } from './config';
import aiRoutes from './routes/ai';

dotenv.config();

const app = express();

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json({ limit: '10mb' }));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api/ai', aiRoutes);

app.listen(config.port, () => {
  console.log(`\n🇫🇮 Finnish Learning Backend running on http://localhost:${config.port}`);
  console.log(`📡 LM Studio: ${config.lmStudio.baseUrl}`);
  console.log(`🤖 Model: ${config.lmStudio.model}\n`);
});

export default app;
