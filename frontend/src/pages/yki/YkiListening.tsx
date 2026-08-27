import { useProfileStore } from '../stores/profileStore';
import { useState } from 'react';
import { ArrowLeft, CheckCircle2, XCircle, Trophy, Volume2, PlayCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { YKI_LISTENING_PROMPTS } from '../../data/yki';
import { ttsService } from '../../services/aiService';
import type { YkiListeningPrompt } from '../../types';
import { useProgressStore } from '../../stores/progressStore';

export default function YkiListening() {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState<YkiListeningPrompt | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const { addXP } = useProgressStore();

  function startPrompt(p: YkiListeningPrompt) {
    setPrompt(p);
    setAnswers({});
    setSubmitted(false);
    setIsPlaying(false);
    ttsService.stop();
  }

  async function playAudio() {
    if (!prompt) return;
    setIsPlaying(true);
    try {
      await ttsService.speak(prompt.script);
    } catch (e) {
      console.error(e);
    } finally {
      setIsPlaying(false);
    }
  }

  function handleSubmit() {
    setSubmitted(true);
    let correct = 0;
    prompt!.questions.forEach(q => {
      if (answers[q.id] === q.correctAnswer) correct++;
    });
    if (correct > 0) addXP(correct * 10);
  }

  if (!prompt) {
    return (
      <div className="max-w-3xl mx-auto p-6 space-y-4">
        <button className="btn btn-ghost mb-4" onClick={() => navigate('/yki')}>
          <ArrowLeft size={16} /> Back to YKI Dashboard
        </button>
        <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Listening (Puheen ymmärtäminen)</h1>
        <p style={{ color: 'var(--text-muted)' }}>Select a listening task. The audio will play and you must answer the questions based on what you hear.</p>
        <div className="space-y-3 mt-4">
          {YKI_LISTENING_PROMPTS.map(p => (
            <button key={p.id} onClick={() => startPrompt(p)} className="card card-hover p-4 text-left w-full flex items-center justify-between">
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

  const allAnswered = prompt.questions.every(q => answers[q.id]);
  const score = submitted ? prompt.questions.filter(q => answers[q.id] === q.correctAnswer).length : 0;

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <button className="btn btn-ghost" onClick={() => { setPrompt(null); ttsService.stop(); }}>
        <ArrowLeft size={16} /> Choose another task
      </button>

      <div className="card p-8 border-l-4 text-center flex flex-col items-center justify-center gap-4" style={{ borderColor: '#F59E0B', background: 'var(--bg-secondary)' }}>
        <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>{prompt.title}</h2>
        <button 
          className={`w-20 h-20 rounded-full flex items-center justify-center text-white transition-all ${isPlaying ? 'bg-orange-500 scale-105 shadow-lg' : 'bg-orange-400 hover:bg-orange-500'}`}
          onClick={playAudio}
        >
          {isPlaying ? <Volume2 size={36} className="animate-pulse" /> : <PlayCircle size={36} />}
        </button>
        <p className="text-sm font-semibold mt-2" style={{ color: 'var(--text-muted)' }}>
          {isPlaying ? 'Playing...' : 'Click to listen'}
        </p>
      </div>

      <div className="space-y-6 mt-8">
        <h3 className="font-bold text-lg" style={{ color: 'var(--text-primary)' }}>Questions</h3>
        {prompt.questions.map((q, idx) => (
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
                  btnClass += ' ring-2 ring-[#F59E0B] bg-orange-50/10';
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
          className="btn w-full mt-4" 
          style={{ background: '#F59E0B', color: 'white' }}
          onClick={handleSubmit} 
          disabled={!allAnswered}
        >
          Check Answers
        </button>
      ) : (
        <div className="card p-6 text-center animate-fade-in border-2 space-y-4" style={{ borderColor: score === prompt.questions.length ? '#10B981' : 'var(--border)' }}>
          <div className="flex items-center justify-center gap-3 mb-2">
            <Trophy size={28} className="text-green-500" />
            <h2 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
              Score: {score} / {prompt.questions.length}
            </h2>
          </div>
          <div className="p-4 rounded-xl text-left text-sm font-medium" style={{ background: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>
            <strong>Transcript:</strong><br/>
            {prompt.script}
          </div>
          <button className="btn btn-secondary mt-2 w-full" onClick={() => startPrompt(prompt)}>
            Return to Listening Tasks
          </button>
        </div>
      )}
    </div>
  );
}
