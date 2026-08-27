import { useState } from 'react';
import { ArrowLeft, CheckCircle2, XCircle, Trophy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { YKI_READING_PASSAGES } from '../../data/yki';
import type { YkiReadingPassage } from '../../types';
import { useProgressStore } from '../../stores/progressStore';

export default function YkiReading() {
  const navigate = useNavigate();
  const [passage, setPassage] = useState<YkiReadingPassage | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const { addXP } = useProgressStore();

  function startPassage(p: YkiReadingPassage) {
    setPassage(p);
    setAnswers({});
    setSubmitted(false);
  }

  function handleSubmit() {
    setSubmitted(true);
    let correct = 0;
    passage!.questions.forEach(q => {
      if (answers[q.id] === q.correctAnswer) correct++;
    });
    if (correct > 0) addXP(correct * 10);
  }

  if (!passage) {
    return (
      <div className="max-w-3xl mx-auto p-6 space-y-4">
        <button className="btn btn-ghost mb-4" onClick={() => navigate('/yki')}>
          <ArrowLeft size={16} /> Back to YKI Dashboard
        </button>
        <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Reading (Tekstin ymmärtäminen)</h1>
        <p style={{ color: 'var(--text-muted)' }}>Select a reading text to practice.</p>
        <div className="space-y-3 mt-4">
          {YKI_READING_PASSAGES.map(p => (
            <button key={p.id} onClick={() => startPassage(p)} className="card card-hover p-4 text-left w-full flex items-center justify-between">
              <div>
                <h3 className="font-bold mb-1" style={{ color: 'var(--text-primary)' }}>{p.title}</h3>
                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{p.questions.length} questions</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  const allAnswered = passage.questions.every(q => answers[q.id]);
  const score = submitted ? passage.questions.filter(q => answers[q.id] === q.correctAnswer).length : 0;

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <button className="btn btn-ghost" onClick={() => setPassage(null)}>
        <ArrowLeft size={16} /> Choose another text
      </button>

      <div className="card p-6 border-l-4" style={{ borderColor: '#10B981', background: 'var(--bg-secondary)' }}>
        <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>{passage.title}</h2>
        <p className="text-base leading-loose" style={{ color: 'var(--text-primary)' }}>{passage.text}</p>
      </div>

      <div className="space-y-6 mt-8">
        <h3 className="font-bold text-lg" style={{ color: 'var(--text-primary)' }}>Questions</h3>
        {passage.questions.map((q, idx) => (
          <div key={q.id} className="card p-5 space-y-3">
            <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>{idx + 1}. {q.question}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {q.options.map(opt => {
                const isSelected = answers[q.id] === opt;
                const isCorrect = submitted && opt === q.correctAnswer;
                const isWrong = submitted && isSelected && opt !== q.correctAnswer;
                
                let btnClass = 'quiz-option text-sm text-left';
                if (submitted) {
                  if (isCorrect) btnClass += ' correct';
                  else if (isWrong) btnClass += ' incorrect';
                  else btnClass += ' opacity-50';
                } else if (isSelected) {
                  btnClass += ' ring-2 ring-[#10B981] bg-green-50/10';
                }

                return (
                  <button
                    key={opt}
                    disabled={submitted}
                    onClick={() => setAnswers(prev => ({ ...prev, [q.id]: opt }))}
                    className={btnClass}
                  >
                    <div className="flex items-center justify-between">
                      <span>{opt}</span>
                      {submitted && isCorrect && <CheckCircle2 size={16} className="text-green-500" />}
                      {submitted && isWrong && <XCircle size={16} className="text-red-500" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {!submitted ? (
        <button 
          className="btn btn-success w-full mt-4" 
          onClick={handleSubmit} 
          disabled={!allAnswered}
        >
          Check Answers
        </button>
      ) : (
        <div className="card p-6 text-center animate-fade-in border-2" style={{ borderColor: score === passage.questions.length ? '#10B981' : 'var(--border)' }}>
          <div className="flex items-center justify-center gap-3 mb-2">
            <Trophy size={28} className="text-green-500" />
            <h2 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
              Score: {score} / {passage.questions.length}
            </h2>
          </div>
          <p style={{ color: 'var(--text-muted)' }}>You earned {score * 10} XP!</p>
          <button className="btn btn-secondary mt-6" onClick={() => setPassage(null)}>
            Return to Reading Tasks
          </button>
        </div>
      )}
    </div>
  );
}
