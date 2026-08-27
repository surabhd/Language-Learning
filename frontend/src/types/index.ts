// ===== LESSON TYPES =====
export type Level = 'beginner' | 'intermediate' | 'advanced';

export interface LessonExample {
  finnish: string;
  english: string;
  pronunciation?: string;
}

export interface LessonExercise {
  id: string;
  type: 'translate' | 'fill-blank' | 'multiple-choice';
  question: string;
  answer: string;
  options?: string[];
  hint?: string;
}

export interface Lesson {
  id: string;
  title: string;
  level: Level;
  category: string;
  icon: string;
  duration: number; // minutes
  xpReward: number;
  theory: string;
  examples: LessonExample[];
  exercises: LessonExercise[];
  vocabulary: VocabWord[];
}

// ===== VOCABULARY TYPES =====
export interface VocabWord {
  id: string;
  word: string;
  translation: string;
  level: Level;
  category: string;
  pronunciation?: string;
  exampleFinnish?: string;
  exampleEnglish?: string;
  timesSeen: number;
  lastSeen?: string;
  nextReview?: string;
  mastered: boolean;
  difficulty: 'easy' | 'medium' | 'hard';
  easeFactor?: number; // SM-2
  interval?: number;   // SM-2 in days
  repetitions?: number; // SM-2
}

// ===== CHAT TYPES =====
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

// ===== QUIZ TYPES =====
export type QuizType = 'multiple-choice' | 'fill-blank' | 'translate-to-finnish' | 'translate-to-english' | 'listening';

export interface QuizQuestion {
  id: string;
  type: QuizType;
  question: string;
  finnish: string;
  english: string;
  options?: string[];
  correctAnswer: string;
  explanation?: string;
}

export interface QuizSession {
  id: string;
  topic: string;
  level: Level;
  questions: QuizQuestion[];
  answers: Record<string, string>;
  score: number;
  completedAt?: string;
  timeSpent: number;
}

// ===== PROGRESS TYPES =====
export interface DailyActivity {
  date: string;
  xp: number;
  minutesPracticed: number;
  lessonsCompleted: number;
  quizzesTaken: number;
}

export interface Progress {
  streak: number;
  longestStreak: number;
  totalXP: number;
  level: number;
  lessonsCompleted: string[];
  quizHistory: Array<{
    date: string;
    score: number;
    topic: string;
    level: Level;
  }>;
  vocabSize: number;
  practiceMinutes: number;
  weeklyActivity: DailyActivity[];
  lastActiveDate: string;
}

// ===== AI SETTINGS =====
export interface AISettings {
  baseUrl: string;
  model: string;
  temperature: number;
  maxTokens: number;
}

// ===== CONVERSATION TYPES =====
export type Scenario = 'coffee-shop' | 'supermarket' | 'pharmacy' | 'airport' | 'job-interview' | 'friend';

export interface ScenarioInfo {
  id: Scenario;
  title: string;
  description: string;
  icon: string;
  difficulty: Level;
  starter: string;
}

// ===== PRONUNCIATION =====
export interface PronunciationPhrase {
  id: string;
  finnish: string;
  english: string;
  phonetic: string;
  difficulty: Level;
  category: string;
}
// ===== YKI TYPES =====
export type YkiSkill = 'speaking' | 'writing' | 'reading' | 'listening';

export interface YkiSpeakingPrompt {
  id: string;
  title: string;
  instructions: string;
  durationSeconds: number;
}

export interface YkiWritingPrompt {
  id: string;
  title: string;
  instructions: string; 
  type: 'informal-message' | 'formal-email' | 'opinion';
}

export interface YkiReadingPassage {
  id: string;
  title: string;
  text: string;
  questions: Array<{
    id: string;
    question: string;
    options: string[];
    correctAnswer: string;
  }>;
}

export interface YkiListeningPrompt {
  id: string;
  title: string;
  script: string;
  questions: Array<{
    id: string;
    question: string;
    options: string[];
    correctAnswer: string;
  }>;
}
// ===== PROFILE TYPES =====
export interface Profile {
  id: string;
  name: string;
  avatar: string;
  createdAt: string;
}
