import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { config } from './config';
import aiRoutes from './routes/ai';

dotenv.config();

const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json({ limit: '10mb' }));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api/ai', aiRoutes);

// Serve compiled React frontend
const frontendDist = path.resolve(__dirname, '../../frontend/dist');
app.use(express.static(frontendDist));

// Catch-all for SPA Client Routing
app.get('*', (req, res) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ error: 'API route not found' });
  }
  res.sendFile(path.join(frontendDist, 'index.html'));
});

app.listen(config.port, '0.0.0.0', () => {
  console.log(`\n🇫🇮 SuomiApp Web Server running on http://0.0.0.0:${config.port}`);
  console.log(`📡 LM Studio proxy active at ${config.lmStudio.baseUrl}`);
});

export default app;
