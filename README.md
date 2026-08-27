# 🇫🇮 SuomiApp — Finnish Language Learning App

A full-stack, Duolingo-style Finnish language learning application powered by a local LLM via LM Studio.

## Features

| Feature | Description |
|---------|-------------|
| 🤖 **AI Tutor Chat** | Chat with Aino, your personal Finnish teacher |
| 📚 **Structured Lessons** | 12+ lessons across Beginner, Intermediate, Advanced |
| 🃏 **Flashcards** | SM-2 spaced repetition flashcard system |
| 🎯 **Quiz Engine** | LLM-generated quizzes with multiple formats |
| 💬 **Conversation Practice** | 6 role-play scenarios (café, supermarket, airport...) |
| 🎙️ **Pronunciation Coach** | TTS + Web Speech API + AI feedback |
| 📖 **Vocabulary Bank** | Personal word database with spaced repetition |
| 📊 **Progress Dashboard** | XP, streaks, charts, and stats |
| 📐 **Grammar Assistant** | AI explanations of Finnish grammar |
| ⚙️ **Settings** | Configure LM Studio model, temperature, tokens |

## Prerequisites

1. **Node.js** (v18+)
2. **LM Studio** running at `http://localhost:1234` with a model loaded

## Quick Start

### 1. Start LM Studio
- Open LM Studio
- Load any instruction-following model (e.g., Llama 3.1, Mistral, Phi-3)
- Start the local server (default port: 1234)

### 2. Start the Backend
```bash
cd backend
npm run dev
```
Backend runs on http://localhost:3001

### 3. Start the Frontend
```bash
cd frontend
npm run dev
```
Frontend runs on http://localhost:5173

### 4. Open the App
Navigate to **http://localhost:5173** in your browser.

## Project Structure

```
Language Learning/
├── frontend/           # React + TypeScript + Tailwind + Vite
│   └── src/
│       ├── components/ # Layout
│       ├── pages/      # All 10 feature pages
│       ├── stores/     # Zustand state (progress, vocab, settings)
│       ├── services/   # AI API + TTS + Speech Recognition
│       ├── data/       # Lesson content, scenarios, grammar topics
│       └── types/      # TypeScript type definitions
└── backend/            # Express API server
    └── src/
        ├── routes/     # /api/ai/* routes
        └── config.ts   # LM Studio configuration
```

## Configuration

In the **Settings** page (⚙️) you can change:
- LM Studio base URL (default: `http://localhost:1234`)
- Model name
- Temperature (0–1)
- Max tokens (256–4096)

Or edit `backend/.env`:
```env
PORT=3001
LM_STUDIO_BASE_URL=http://localhost:1234
LM_STUDIO_MODEL=local-model
LM_STUDIO_TEMPERATURE=0.7
LM_STUDIO_MAX_TOKENS=1024
```

## Tech Stack

**Frontend:** React 18, TypeScript, Tailwind CSS v4, Vite, Zustand, React Router, Recharts, Lucide React

**Backend:** Node.js, Express, TypeScript, node-fetch

**AI:** LM Studio OpenAI-compatible API

**Audio:** Web Speech Synthesis API (TTS), Web Speech Recognition API

## Browser Support

For full pronunciation features (microphone recording), use **Chrome** or **Edge** — these have the best Web Speech API support. Firefox and Safari have limited speech recognition support.
