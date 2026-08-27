import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import http from 'http';
import https from 'https';
import selfsigned from 'selfsigned';
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

const HTTP_PORT = config.port; // 3001
const HTTPS_PORT = 3002;

async function startServer() {
  http.createServer(app).listen(HTTP_PORT, '0.0.0.0', () => {
    console.log(`\n🇫🇮 SuomiApp HTTP Server running on http://0.0.0.0:${HTTP_PORT}`);
  });

  try {
    const pkeys: any = await (selfsigned as any).generate([{ name: 'commonName', value: 'SuomiApp' }]);
    const httpsOptions = { key: pkeys.private, cert: pkeys.cert };

    https.createServer(httpsOptions, app).listen(HTTPS_PORT, '0.0.0.0', () => {
      console.log(`🔒 SuomiApp HTTPS Server (Voice/Microphone Enabled) running on https://0.0.0.0:${HTTPS_PORT}`);
      console.log(`📡 LM Studio proxy active at ${config.lmStudio.baseUrl}\n`);
    });
  } catch (err) {
    console.error('HTTPS setup error:', err);
  }
}

startServer();

export default app;
