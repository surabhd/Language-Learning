import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getLessonById } from '../data/lessons';
import { useProgressStore } from '../stores/progressStore';
import { useVocabStore } from '../stores/vocabStore';
import { ttsService } from '../services/aiService';
import { ArrowLeft, Volume2, CheckCircle2, XCircle, Zap, BookOpen, Trophy } from 'lucide-react';

type Tab = 'theory' | 'examples' | 'exercises' | 'vocab';

export default function LessonDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const lesson = getLessonById(id!);
  const [tab, setTab] = useState<Tab>('theory');
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [completed, setCompleted] = useState(false);
  const { progress, completeLesson, addXP } = useProgressStore();
  const { addWord } = useVocabStore();
  const alreadyDone = lesson ? progress.lessonsCompleted.includes(lesson.id) : false;

  if (!lesson) {
    return (
      <div className="p-8 text-center">
        <p style={{ color: 'var(--text-muted)' }}>Lesson not found.</p>
        <button className="btn btn-primary mt-4" onClick={() => navigate('/lessons')}>Back to Lessons</button>
      </div>
    );
  }

  // After this point, lesson is guaranteed to be defined
  const safeLesson = lesson;

  function checkAnswer(exId: string, answer: string) {
    const ex = safeLesson.exercises.find(e => e.id === exId);
    if (!ex) return;
    const correct = answer.toLowerCase().trim() === ex.answer.toLowerCase().trim();
    setChecked(prev => ({ ...prev, [exId]: correct }));
  }

  function handleComplete() {
    if (!alreadyDone) {
      completeLesson(safeLesson.id);
      addXP(safeLesson.xpReward);
      safeLesson.vocabulary.forEach(v => addWord(v));
    }
    setCompleted(true);
  }

  const allExercisesChecked = safeLesson.exercises.every(e => checked[e.id] !== undefined);

  const TABS: { key: Tab; label: string; icon: string }[] = [
    { key: 'theory', label: 'Theory', icon: '📖' },
    { key: 'examples', label: 'Examples', icon: '💡' },
    { key: 'exercises', label: 'Exercises', icon: '✏️' },
    { key: 'vocab', label: 'Vocabulary', icon: '📚' },
  ];

  function renderTheory(text: string) {
    const lines = text.split('\n');
    return lines.map((line, i) => {
      if (!line.trim()) return <div key={i} className="h-2" />;
      if (line.startsWith('# ')) return <h1 key={i} className="text-xl font-extrabold mt-2 mb-3" style={{ color: 'var(--text-primary)' }}>{line.slice(2)}</h1>;
      if (line.startsWith('## ')) return <h2 key={i} className="text-base font-bold mt-4 mb-2" style={{ color: 'var(--text-primary)' }}>{line.slice(3)}</h2>;
      if (line.startsWith('### ')) return <h3 key={i} className="text-sm font-bold mt-3 mb-1.5" style={{ color: 'var(--text-primary)' }}>{line.slice(4)}</h3>;
      if (line.startsWith('- ') || line.startsWith('* ')) {
        return <div key={i} className="flex gap-2 my-1 text-sm" style={{ color: 'var(--text-secondary)' }}>
          <span style={{ color: '#0057B7' }}>•</span>
          <span dangerouslySetInnerHTML={{ __html: line.slice(2).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>') }} />
        </div>;
      }
      if (line.includes('|')) {
        return <div key={i} className="flex gap-0" />;
      }

      const html = line
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em style="color:var(--text-secondary)">$1</em>')
        .replace(/`(.*?)`/g, '<code style="background:var(--bg-secondary);padding:1px 5px;border-radius:4px;font-family:monospace;font-size:0.875em;color:#0057B7">$1</code>');

      return <p key={i} className="text-sm leading-relaxed my-1" style={{ color: 'var(--text-secondary)' }} dangerouslySetInnerHTML={{ __html: html }} />;
    });
  }

  if (completed) {
    const score = Object.values(checked).filter(Boolean).length;
    const total = lesson.exercises.length;
    return (
      <div className="p-8 flex flex-col items-center justify-center min-h-96 text-center">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-2xl font-extrabold mb-2" style={{ color: 'var(--text-primary)' }}>Lesson Complete!</h2>
        <p className="mb-1" style={{ color: 'var(--text-muted)' }}>{lesson.title}</p>
        <div className="flex items-center gap-2 mt-3 mb-6">
          {!alreadyDone && <span className="xp-badge">+{lesson.xpReward} XP earned</span>}
          <span className="badge badge-green">
            <Trophy size={12} className="mr-1" />
            {score}/{total} exercises correct
          </span>
        </div>
        <div className="flex gap-3">
          <button className="btn btn-secondary" onClick={() => navigate('/lessons')}>
            <ArrowLeft size={16} /> Back to Lessons
          </button>
          <button className="btn btn-primary" onClick={() => navigate('/quiz')}>
            Take a Quiz <Zap size={16} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button className="btn btn-ghost btn-icon" onClick={() => navigate('/lessons')}>
          <ArrowLeft size={18} />
        </button>
        <div className="text-3xl">{lesson.icon}</div>
        <div className="flex-1">
          <h1 className="font-extrabold text-lg" style={{ color: 'var(--text-primary)' }}>{lesson.title}</h1>
          <div className="flex items-center gap-2 mt-0.5">
            <span className={`badge level-${lesson.level}`}>{lesson.level}</span>
            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{lesson.duration} min · {lesson.xpReward} XP</span>
            {alreadyDone && <span className="badge badge-green"><CheckCircle2 size={10} className="mr-1" />Completed</span>}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-xl" style={{ background: 'var(--bg-secondary)' }}>
        {TABS.map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold transition-all ${
              tab === t.key ? 'text-white shadow-sm' : ''
            }`}
            style={tab === t.key ? { background: '#0057B7' } : { color: 'var(--text-muted)' }}
          >
            <span>{t.icon}</span>
            <span className="hidden sm:inline">{t.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="card p-6">
        {tab === 'theory' && (
          <div className="space-y-1">
            {renderTheory(lesson.theory)}
          </div>
        )}

        {tab === 'examples' && (
          <div className="space-y-4">
            <h3 className="font-bold" style={{ color: 'var(--text-primary)' }}>Examples</h3>
            {lesson.examples.map((ex, i) => (
              <div key={i} className="p-4 rounded-xl border" style={{ borderColor: 'var(--border)', background: 'var(--bg-secondary)' }}>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-bold text-lg" style={{ color: '#0057B7' }}>{ex.finnish}</p>
                    <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>{ex.english}</p>
                    {ex.pronunciation && (
                      <p className="text-xs mt-1 font-mono" style={{ color: 'var(--text-muted)' }}>🔊 {ex.pronunciation}</p>
                    )}
                  </div>
                  <button
                    className="btn btn-ghost btn-icon shrink-0"
                    onClick={() => ttsService.speak(ex.finnish)}
                    title="Hear pronunciation"
                  >
                    <Volume2 size={16} style={{ color: '#0057B7' }} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'exercises' && (
          <div className="space-y-5">
            <h3 className="font-bold" style={{ color: 'var(--text-primary)' }}>Exercises</h3>
            {lesson.exercises.map((ex, i) => {
              const isCorrect = checked[ex.id] === true;
              const isWrong = checked[ex.id] === false;
              return (
                <div key={ex.id} className="space-y-2">
                  <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                    {i + 1}. {ex.question}
                  </p>

                  {ex.type === 'multiple-choice' && ex.options ? (
                    <div className="grid grid-cols-2 gap-2">
                      {ex.options.map(opt => (
                        <button
                          key={opt}
                          disabled={checked[ex.id] !== undefined}
                          onClick={() => {
                            setAnswers(p => ({ ...p, [ex.id]: opt }));
                            checkAnswer(ex.id, opt);
                          }}
                          className={`quiz-option text-sm ${
                            checked[ex.id] !== undefined && opt === ex.answer ? 'correct' :
                            answers[ex.id] === opt && isWrong ? 'incorrect' : ''
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        className="input text-sm"
                        placeholder={ex.hint || 'Type your answer...'}
                        value={answers[ex.id] || ''}
                        onChange={e => setAnswers(p => ({ ...p, [ex.id]: e.target.value }))}
                        onKeyDown={e => e.key === 'Enter' && checkAnswer(ex.id, answers[ex.id] || '')}
                        disabled={checked[ex.id] !== undefined}
                        style={isCorrect ? { borderColor: '#10B981' } : isWrong ? { borderColor: '#EF4444' } : {}}
                      />
                      {checked[ex.id] === undefined && (
                        <button className="btn btn-primary btn-sm"
                          onClick={() => checkAnswer(ex.id, answers[ex.id] || '')}>
                          Check
                        </button>
                      )}
                    </div>
                  )}

                  {checked[ex.id] !== undefined && (
                    <div className={`flex items-center gap-2 text-sm ${isCorrect ? 'text-green-600' : 'text-red-500'}`}>
                      {isCorrect ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
                      {isCorrect ? 'Correct! 🎉' : `Correct answer: "${ex.answer}"`}
                    </div>
                  )}
                </div>
              );
            })}

            <button
              className="btn btn-success w-full mt-4"
              onClick={handleComplete}
              disabled={!allExercisesChecked}
            >
              <Trophy size={16} /> Complete Lesson
            </button>
          </div>
        )}

        {tab === 'vocab' && (
          <div className="space-y-3">
            <h3 className="font-bold" style={{ color: 'var(--text-primary)' }}>Lesson Vocabulary</h3>
            {lesson.vocabulary.length === 0 ? (
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>No specific vocabulary for this lesson — check the Vocabulary page!</p>
            ) : (
              lesson.vocabulary.map(v => (
                <div key={v.id} className="flex items-center justify-between p-3 rounded-xl" style={{ background: 'var(--bg-secondary)' }}>
                  <div>
                    <span className="font-bold" style={{ color: '#0057B7' }}>{v.word}</span>
                    <span className="mx-2" style={{ color: 'var(--text-muted)' }}>—</span>
                    <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{v.translation}</span>
                  </div>
                  <button className="btn btn-ghost btn-icon" onClick={() => ttsService.speak(v.word)}>
                    <Volume2 size={14} style={{ color: '#0057B7' }} />
                  </button>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Complete button shortcut */}
      {tab !== 'exercises' && (
        <button className="btn btn-primary w-full" onClick={() => setTab('exercises')}>
          <BookOpen size={16} /> Go to Exercises
        </button>
      )}
    </div>
  );
}
