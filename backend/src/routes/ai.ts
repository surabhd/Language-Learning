import { Router, Request, Response } from 'express';
import fetch from 'node-fetch';
import { config } from '../config';

const router = Router();

interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface LMStudioSettings {
  model?: string;
  temperature?: number;
  maxTokens?: number;
}

const FINNISH_TUTOR_SYSTEM = `You are Aino, an expert Finnish language teacher with 20 years of experience teaching Finnish to foreigners. You are patient, encouraging, and knowledgeable about Finnish grammar, culture, and everyday usage.

Your teaching style:
- Always explain grammar concepts clearly with examples
- Use Finnish words in responses with translations in parentheses
- Correct mistakes gently and explain why something is wrong
- Adapt to the student's level (beginner/intermediate/advanced)
- Use real Finnish expressions and idioms when appropriate
- Include cultural notes when relevant
- Format responses clearly with headers when explaining concepts

When teaching vocabulary: provide the word, its translation, pronunciation guide, and example sentences.
When correcting: show the correct form first, then explain the rule.
Always be warm, encouraging, and make learning fun!`;

const GRAMMAR_SYSTEM = `You are a Finnish grammar expert. You explain Finnish grammar in a clear, systematic way with:
- Clear rules and explanations
- Multiple examples for each concept
- Common exceptions and notes
- Practice exercises
- Tables for conjugations/declensions when appropriate
- Connections to English for easier understanding

Focus on accuracy and clarity. Use markdown formatting for tables and lists.`;

const PRONUNCIATION_SYSTEM = `You are a Finnish pronunciation coach. When given a Finnish word or phrase and a user's attempted pronunciation (as text), you:
1. Assess how close the attempt is to correct Finnish pronunciation
2. Explain the correct pronunciation with phonetic guidance
3. Point out specific sounds that need work
4. Give tips for Finnish-specific sounds (like vowel harmony, double consonants, etc.)
5. Provide encouragement and practical exercises

Finnish pronunciation is very regular - once you learn the rules, everything is consistent.`;

async function callLMStudio(
  messages: ChatMessage[],
  settings: LMStudioSettings = {},
  stream = false
): Promise<Response | { choices: Array<{ message: { content: string } }> }> {
  const body = {
    model: settings.model || config.lmStudio.model,
    messages,
    temperature: settings.temperature ?? config.lmStudio.temperature,
    max_tokens: settings.maxTokens ?? config.lmStudio.maxTokens,
    stream,
  };

  const response = await fetch(`${config.lmStudio.baseUrl}/v1/chat/completions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  return response as any;
}

// POST /api/ai/chat - Finnish tutor chat
router.post('/chat', async (req: Request, res: Response) => {
  try {
    const { messages, settings, stream } = req.body;

    const fullMessages: ChatMessage[] = [
      { role: 'system', content: FINNISH_TUTOR_SYSTEM },
      ...(messages || []),
    ];

    if (stream) {
      const lmResponse = await callLMStudio(fullMessages, settings, true) as any;
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');
      lmResponse.body.pipe(res);
    } else {
      const lmResponse = await callLMStudio(fullMessages, settings, false) as any;
      if (!lmResponse.ok) {
        const errorText = await lmResponse.text();
        return res.status(lmResponse.status).json({ error: errorText });
      }
      const data = await lmResponse.json();
      res.json(data);
    }
  } catch (error: any) {
    console.error('Chat error:', error);
    res.status(500).json({ error: error.message || 'LM Studio connection failed' });
  }
});

// POST /api/ai/quiz - Generate quiz questions
router.post('/quiz', async (req: Request, res: Response) => {
  try {
    const { topic, level, type, count = 5, settings } = req.body;

    const prompt = `Generate ${count} Finnish language quiz questions about "${topic}" for ${level} level learners.
Quiz type: ${type} (multiple-choice / fill-in-the-blank / translate-to-finnish / translate-to-english / listening)

Return ONLY a valid JSON array with this exact structure:
[
  {
    "id": "q1",
    "type": "${type}",
    "question": "Question text",
    "finnish": "Finnish word/phrase being tested",
    "english": "English translation",
    "options": ["option1", "option2", "option3", "option4"],
    "correctAnswer": "correct option",
    "explanation": "Brief explanation of the answer"
  }
]

Make questions varied, practical, and educational. Ensure correct answers are accurate Finnish.`;

    const messages: ChatMessage[] = [
      { role: 'system', content: 'You are a Finnish language quiz generator. Return only valid JSON.' },
      { role: 'user', content: prompt },
    ];

    const lmResponse = await callLMStudio(messages, settings) as any;
    if (!lmResponse.ok) {
      const errorText = await lmResponse.text();
      return res.status(lmResponse.status).json({ error: errorText });
    }
    const data = await lmResponse.json();
    const content = data.choices[0]?.message?.content || '[]';

    // Extract JSON from response
    const jsonMatch = content.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      res.json({ questions: JSON.parse(jsonMatch[0]) });
    } else {
      res.json({ questions: [], raw: content });
    }
  } catch (error: any) {
    console.error('Quiz error:', error);
    res.status(500).json({ error: error.message });
  }
});

// POST /api/ai/grammar - Grammar explanation
router.post('/grammar', async (req: Request, res: Response) => {
  try {
    const { topic, settings } = req.body;

    const messages: ChatMessage[] = [
      { role: 'system', content: GRAMMAR_SYSTEM },
      { role: 'user', content: `Explain this Finnish grammar concept in detail with examples and exercises: ${topic}` },
    ];

    const lmResponse = await callLMStudio(messages, settings) as any;
    if (!lmResponse.ok) {
      const errorText = await lmResponse.text();
      return res.status(lmResponse.status).json({ error: errorText });
    }
    const data = await lmResponse.json();
    res.json({ content: data.choices[0]?.message?.content || '' });
  } catch (error: any) {
    console.error('Grammar error:', error);
    res.status(500).json({ error: error.message });
  }
});

// POST /api/ai/pronunciation - Pronunciation feedback
router.post('/pronunciation', async (req: Request, res: Response) => {
  try {
    const { targetPhrase, userAttempt, settings } = req.body;

    const messages: ChatMessage[] = [
      { role: 'system', content: PRONUNCIATION_SYSTEM },
      { 
        role: 'user', 
        content: `Target Finnish phrase: "${targetPhrase}"
User's pronunciation attempt (speech-to-text): "${userAttempt}"

Please assess the pronunciation and provide feedback.` 
      },
    ];

    const lmResponse = await callLMStudio(messages, settings) as any;
    if (!lmResponse.ok) {
      const errorText = await lmResponse.text();
      return res.status(lmResponse.status).json({ error: errorText });
    }
    const data = await lmResponse.json();
    res.json({ feedback: data.choices[0]?.message?.content || '' });
  } catch (error: any) {
    console.error('Pronunciation error:', error);
    res.status(500).json({ error: error.message });
  }
});

// POST /api/ai/conversation - Role-play conversation
router.post('/conversation', async (req: Request, res: Response) => {
  try {
    const { scenario, messages, settings } = req.body;

    const scenarioPrompts: Record<string, string> = {
      'coffee-shop': `You are a friendly Finnish barista at a Helsinki café called "Kulma Kahvila". Speak mostly in Finnish with English translations in parentheses when needed. Stay in character. If the user makes Finnish mistakes, gently correct them and continue the scene. Greet customers warmly and ask what they'd like.`,
      'supermarket': `You are a helpful Finnish supermarket employee at "K-Market". Speak mostly in Finnish. Help customers find items, answer questions about products, and assist at checkout. Correct Finnish mistakes gently.`,
      'pharmacy': `You are a Finnish pharmacist (apteekkari) at a Helsinki pharmacy. Speak in Finnish with English help when needed. Ask about symptoms, recommend products. Be professional and helpful.`,
      'airport': `You are a Finnish airport information desk worker at Helsinki-Vantaa airport. Help passengers with flight info, directions, and airport services. Speak in Finnish, correct mistakes gently.`,
      'job-interview': `You are a Finnish HR manager conducting a job interview in Finnish. Ask professional questions, respond to answers, and help the candidate improve their Finnish business language. Be encouraging but professional.`,
      'friend': `You are Matti, a young Finnish friend from Tampere. Have casual conversations in Finnish about daily life, hobbies, Finnish culture. Use casual Finnish (puhekieli). Be fun and friendly, correct mistakes in a friendly way.`,
    };

    const systemPrompt = scenarioPrompts[scenario] || scenarioPrompts['friend'];

    const fullMessages: ChatMessage[] = [
      { role: 'system', content: systemPrompt },
      ...(messages || []),
    ];

    const lmResponse = await callLMStudio(fullMessages, settings) as any;
    if (!lmResponse.ok) {
      const errorText = await lmResponse.text();
      return res.status(lmResponse.status).json({ error: errorText });
    }
    const data = await lmResponse.json();
    res.json(data);
  } catch (error: any) {
    console.error('Conversation error:', error);
    res.status(500).json({ error: error.message });
  }
});

// GET /api/ai/test - Test LM Studio connection
router.get('/test', async (req: Request, res: Response) => {
  try {
    const response = await fetch(`${config.lmStudio.baseUrl}/v1/models`);
    if (response.ok) {
      const data = await response.json() as any;
      res.json({ connected: true, models: data.data || [] });
    } else {
      res.status(503).json({ connected: false, error: 'LM Studio not responding' });
    }
  } catch (error: any) {
    res.status(503).json({ connected: false, error: error.message });
  }
});

export default router;
