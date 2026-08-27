import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: parseInt(process.env.PORT || '3001'),
  lmStudio: {
    baseUrl: process.env.LM_STUDIO_BASE_URL || 'http://localhost:1234',
    model: process.env.LM_STUDIO_MODEL || 'local-model',
    temperature: parseFloat(process.env.LM_STUDIO_TEMPERATURE || '0.7'),
    maxTokens: parseInt(process.env.LM_STUDIO_MAX_TOKENS || '1024'),
  },
};
