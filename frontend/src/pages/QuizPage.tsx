import { useProfileStore } from '../stores/profileStore';
import { useState } from 'react';
import { aiService, ttsService } from '../services/aiService';
import { useSettingsStore } from '../stores/settingsStore';
import { useProgressStore } from '../stores/progressStore';
import type { QuizQuestion, Level } from '../types';
import { Loader2, CheckCircle2, XCircle, Volume2, Trophy, RotateCcw, Zap } from 'lucide-react';

const TOPICS = [
  'Greetings & Introductions', 'Numbers', 'Colors', 'Food & Drinks',
  'Family', 'Time & Days', 'Directions', 'Cases', 'Verb Conjugation',
  'Past Tense', 'Workplace', 'Finnish Culture',
];

const QUIZ_TYPES = [
  { value: 'multiple-choice', label: 'Multiple Choice', icon: '🔘' },
  { value: 'fill-blank', label: 'Fill in the Blank', icon: '✏️' },
  { value: 'translate-to-finnish', label: '→ Finnish', icon: '🇫🇮' },
  { value: 'translate-to-english', label: '→ English', icon: '🇬🇧' },
];

type QuizState = 'config' | 'loading' | 'active' | 'results';

export default function QuizPage() {
  const { settings } = useSettingsStore();
  const { addXP, addQuizResult } = useProgressStore();

  const [quizState, setQuizState] = useState<QuizState>('config');
  const [topic, setTopic] = useState(TOPICS[0]);
  const [level, setLevel] = useState<Level>('beginner');
  const [quizType, setQuizType] = useState('multiple-choice');
  const [count, setCount] = useState(5);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [fillAnswer, setFillAnswer] = useState('');
  const [answers, setAnswers] = useState<Record<string, { given: string; correct: boolean }>>({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [error, setError] = useState('');

  async function startQuiz() {
    setError('');
    setQuizState('loading');
    try {
      const qs = await aiService.generateQuiz(topic, level, quizType, count, settings);
      if (!qs || qs.length === 0) throw new Error('No questions generated');
      setQuestions(qs);
      setCurrentQ(0);
      setAnswers({});
      setSelected(null);
      setFillAnswer('');
      setShowFeedback(false);
      setQuizState('active');
    } catch (err: any) {
      setError(err.message || 'Failed to generate quiz. Make sure LM Studio is running.');
      setQuizState('config');
    }
  }

  function submitAnswer(answer: string) {
    const q = questions[currentQ];
    const correct = answer.toLowerCase().trim() === q.correctAnswer.toLowerCase().trim();
    setAnswers(prev => ({ ...prev, [q.id]: { given: answer, correct } }));
    setShowFeedback(true);
    if (correct) addXP(10);
  }

  function nextQuestion() {
    setShowFeedback(false);
    setSelected(null);
    setFillAnswer('');
    if (currentQ + 1 >= questions.length) {
      const score = Math.round(
        (Object.values({ ...answers }).filter(a => a.correct).length / questions.length) * 100
      );
      addQuizResult(topic, level, score);
      setQuizState('results');
    } else {
      setCurrentQ(q => q + 1);
    }
  }

  if (quizState === 'config') {
    return (
      <div className="p-6 max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-extrabold" style={{ color: 'var(--text-primary)' }}>Quiz Engine</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>AI-generated quizzes tailored to your level</p>
        </div>

        {error && (
          <div className="p-4 rounded-xl text-sm" style={{ background: 'var(--danger-light)', color: '#DC2626' }}>
            ⚠️ {error}
          </div>
        )}

        <div className="card p-6 space-y-5">
          <div>
            <label className="text-sm font-semibold mb-2 block" style={{ color: 'var(--text-primary)' }}>Topic</label>
            <div className="grid grid-cols-3 gap-2">
              {TOPICS.map(t => (
                <button
                  key={t}
                  onClick={() => setTopic(t)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    topic === t ? 'text-white' : ''
                  }`}
                  style={topic === t
                    ? { background: '#0057B7' }
                    : { background: 'var(--bg-secondary)', color: 'var(--text-secondary)' }
                  }
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold mb-2 block" style={{ color: 'var(--text-primary)' }}>Level</label>
              <select
                className="input select"
                value={level}
                onChange={e => setLevel(e.target.value as Level)}
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-semibold mb-2 block" style={{ color: 'var(--text-primary)' }}>Questions</label>
              <select
                className="input select"
                value={count}
                onChange={e => setCount(Number(e.target.value))}
              >
                {[3, 5, 8, 10].map(n => <option key={n} value={n}>{n} questions</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold mb-2 block" style={{ color: 'var(--text-primary)' }}>Quiz Type</label>
            <div className="grid grid-cols-2 gap-2">
              {QUIZ_TYPES.map(qt => (
                <button
                  key={qt.value}
                  onClick={() => setQuizType(qt.value)}
                  className={`flex items-center gap-2 p-3 rounded-xl border-2 text-sm font-medium transition-all ${
                    quizType === qt.value ? 'border-blue-500' : 'border-transparent'
                  }`}
                  style={quizType === qt.value
                    ? { background: 'var(--finnish-blue-pale)', color: '#0057B7', borderColor: '#0057B7' }
                    : { background: 'var(--bg-secondary)', color: 'var(--text-secondary)' }
                  }
                >
                  <span>{qt.icon}</span> {qt.label}
                </button>
              ))}
            </div>
          </div>

          <button className="btn btn-primary w-full btn-lg" onClick={startQuiz}>
            <Zap size={18} /> Generate Quiz
          </button>
        </div>
      </div>
    );
  }

  if (quizState === 'loading') {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <Loader2 size={36} className="animate-spin" style={{ color: '#0057B7' }} />
        <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>Generating your quiz...</p>
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>LM Studio is thinking 🤔</p>
      </div>
    );
  }

  if (quizState === 'results') {
    const correctCount = Object.values(answers).filter(a => a.correct).length;
    const score = Math.round((correctCount / questions.length) * 100);
    const emoji = score >= 80 ? '🏆' : score >= 60 ? '👍' : '📚';

    return (
      <div className="p-6 max-w-2xl mx-auto space-y-5">
        <div className="card p-8 text-center">
          <div className="text-6xl mb-4">{emoji}</div>
          <h2 className="text-3xl font-extrabold mb-1" style={{ color: 'var(--text-primary)' }}>{score}%</h2>
          <p style={{ color: 'var(--text-muted)' }}>{correctCount} of {questions.length} correct</p>
          <p className="text-sm mt-2 font-medium" style={{ color: score >= 80 ? '#10B981' : score >= 60 ? '#F59E0B' : '#EF4444' }}>
            {score >= 80 ? 'Excellent work! 🌟' : score >= 60 ? 'Good effort! Keep practicing.' : 'Keep studying — you\'ll get there!'}
          </p>
        </div>

        <div className="space-y-3">
          {questions.map((q) => {
            const ans = answers[q.id];
            return (
              <div key={q.id} className="card p-4">
                <div className="flex items-start gap-2">
                  {ans?.correct
                    ? <CheckCircle2 size={18} className="text-green-500 shrink-0 mt-0.5" />
                    : <XCircle size={18} className="text-red-500 shrink-0 mt-0.5" />}
                  <div className="flex-1">
                    <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{q.question}</p>
                    {!ans?.correct && (
                      <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                        Your answer: <span style={{ color: '#EF4444' }}>{ans?.given || '—'}</span>
                      </p>
                    )}
                    <p className="text-xs mt-0.5 font-semibold" style={{ color: '#10B981' }}>
                      ✓ {q.correctAnswer}
                    </p>
                    {q.explanation && (
                      <p className="text-xs mt-1 italic" style={{ color: 'var(--text-muted)' }}>{q.explanation}</p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex gap-3">
          <button className="btn btn-secondary flex-1" onClick={() => setQuizState('config')}>
            <RotateCcw size={16} /> New Quiz
          </button>
          <button className="btn btn-primary flex-1" onClick={startQuiz}>
            <Zap size={16} /> Retry
          </button>
        </div>
      </div>
    );
  }

  // Active quiz
  const q = questions[currentQ];
  const ans = answers[q?.id];

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-5">
      {/* Progress */}
      <div className="flex items-center gap-3">
        <div className="flex-1 progress-bar">
          <div className="progress-fill" style={{ width: `${(currentQ / questions.length) * 100}%` }} />
        </div>
        <span className="text-sm font-bold" style={{ color: 'var(--text-muted)' }}>
          {currentQ + 1}/{questions.length}
        </span>
      </div>

      {/* Question */}
      <div className="card p-6 space-y-5">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="badge badge-blue">{topic}</span>
            <span className={`badge level-${level}`}>{level}</span>
          </div>
          <p className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>{q?.question}</p>

          {q?.finnish && (
            <div className="flex items-center gap-2 mt-2">
              <span className="text-blue-600 font-semibold">{q.finnish}</span>
              <button className="btn btn-ghost btn-icon btn-sm" onClick={() => ttsService.speak(q.finnish)}>
                <Volume2 size={13} />
              </button>
            </div>
          )}
        </div>

        {/* Answer area */}
        {q?.type === 'multiple-choice' && q.options ? (
          <div className="space-y-2">
            {q.options.map(opt => (
              <button
                key={opt}
                disabled={showFeedback}
                onClick={() => { setSelected(opt); if (!showFeedback) submitAnswer(opt); }}
                className={`quiz-option w-full text-left ${
                  showFeedback && opt === q.correctAnswer ? 'correct' :
                  showFeedback && opt === selected && opt !== q.correctAnswer ? 'incorrect' :
                  selected === opt ? 'selected' : ''
                }`}
              >
                <div className="w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0"
                  style={{ borderColor: 'var(--border)' }}>
                  {showFeedback && opt === q.correctAnswer && <CheckCircle2 size={14} style={{ color: '#10B981' }} />}
                  {showFeedback && opt === selected && opt !== q.correctAnswer && <XCircle size={14} style={{ color: '#EF4444' }} />}
                </div>
                {opt}
              </button>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            <input
              className="input"
              placeholder="Type your answer..."
              value={fillAnswer}
              onChange={e => setFillAnswer(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && !showFeedback && submitAnswer(fillAnswer)}
              disabled={showFeedback}
              style={showFeedback ? { borderColor: ans?.correct ? '#10B981' : '#EF4444' } : {}}
            />
            {!showFeedback && (
              <button className="btn btn-primary" onClick={() => submitAnswer(fillAnswer)}>
                Submit
              </button>
            )}
          </div>
        )}

        {/* Feedback */}
        {showFeedback && (
          <div className={`p-3 rounded-xl text-sm animate-fade-in ${ans?.correct ? 'text-green-700' : 'text-red-700'}`}
            style={{ background: ans?.correct ? 'var(--success-light)' : 'var(--danger-light)' }}>
            <div className="flex items-center gap-2 font-semibold mb-1">
              {ans?.correct ? <><CheckCircle2 size={16} /> Correct! +10 XP</> : <><XCircle size={16} /> Not quite...</>}
            </div>
            {!ans?.correct && <p>Correct answer: <strong>{q?.correctAnswer}</strong></p>}
            {q?.explanation && <p className="mt-1 opacity-80">{q.explanation}</p>}
          </div>
        )}

        {showFeedback && (
          <button className="btn btn-primary w-full animate-fade-in" onClick={nextQuestion}>
            {currentQ + 1 >= questions.length ? <><Trophy size={16} /> See Results</> : 'Next Question →'}
          </button>
        )}
      </div>
    </div>
  );
}
