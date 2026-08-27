import type { AISettings, ChatMessage } from '../types';

const BASE_URL = '/api/ai';

async function post(endpoint: string, body: object) {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(errorData.error || `API error: ${res.status}`);
  }

  return res.json();
}

export const aiService = {
  async chat(
    messages: ChatMessage[],
    settings?: Partial<AISettings>
  ): Promise<string> {
    const payload = messages.map(m => ({ role: m.role, content: m.content }));
    const data = await post('/chat', { messages: payload, settings });
    return data.choices?.[0]?.message?.content ?? '';
  },

  async generateQuiz(
    topic: string,
    level: string,
    type: string,
    count = 5,
    settings?: Partial<AISettings>
  ) {
    const data = await post('/quiz', { topic, level, type, count, settings });
    return data.questions ?? [];
  },

  async explainGrammar(topic: string, settings?: Partial<AISettings>): Promise<string> {
    const data = await post('/grammar', { topic, settings });
    return data.content ?? '';
  },

  async getPronunciationFeedback(
    targetPhrase: string,
    userAttempt: string,
    settings?: Partial<AISettings>
  ): Promise<string> {
    const data = await post('/pronunciation', { targetPhrase, userAttempt, settings });
    return data.feedback ?? '';
  },

  async converse(
    scenario: string,
    messages: Array<{ role: string; content: string }>,
    settings?: Partial<AISettings>
  ): Promise<string> {
    const data = await post('/conversation', { scenario, messages, settings });
    return data.choices?.[0]?.message?.content ?? '';
  },

  async testConnection(): Promise<{ connected: boolean; models: string[]; error?: string }> {
    const res = await fetch('/api/ai/test');
    return res.json();
  },
};

// Text-to-Speech utility
export const ttsService = {
  speak(text: string, lang = 'fi-FI', rate = 0.85, pitch = 1): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!window.speechSynthesis) {
        reject(new Error('Speech Synthesis not supported'));
        return;
      }
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = rate;
      utterance.pitch = pitch;

      const voices = window.speechSynthesis.getVoices();
      const finnishVoice = voices.find(v => v.lang.startsWith('fi'));
      if (finnishVoice) utterance.voice = finnishVoice;

      utterance.onend = () => resolve();
      utterance.onerror = (e) => reject(new Error(e.error));
      window.speechSynthesis.speak(utterance);
    });
  },

  stop() {
    window.speechSynthesis?.cancel();
  },

  getVoices() {
    return window.speechSynthesis?.getVoices() ?? [];
  },
};

// Speech Recognition utility
export const speechRecognitionService = {
  isSupported(): boolean {
    return !!(
      (window as unknown as Record<string, unknown>)['SpeechRecognition'] ||
      (window as unknown as Record<string, unknown>)['webkitSpeechRecognition']
    );
  },

  recognize(lang = 'fi-FI'): Promise<string> {
    return new Promise((resolve, reject) => {
      const win = window as unknown as Record<string, unknown>;
      const SpeechRecognition = (win['SpeechRecognition'] || win['webkitSpeechRecognition']) as (new () => {
        lang: string;
        interimResults: boolean;
        maxAlternatives: number;
        continuous: boolean;
        onresult: (event: { results: { [i: number]: { [j: number]: { transcript: string } } } }) => void;
        onerror: (event: { error: string }) => void;
        onnomatch: () => void;
        start: () => void;
      }) | undefined;

      if (!SpeechRecognition) {
        reject(new Error('Speech Recognition not supported in this browser'));
        return;
      }

      const recognition = new SpeechRecognition();
      recognition.lang = lang;
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;
      recognition.continuous = false;

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        resolve(transcript);
      };

      recognition.onerror = (event) => {
        reject(new Error(`Recognition error: ${event.error}`));
      };

      recognition.onnomatch = () => reject(new Error('No speech recognized'));

      recognition.start();
    });
  },
};
