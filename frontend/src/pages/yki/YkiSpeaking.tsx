import { useState, useEffect } from 'react';
import { ArrowLeft, Mic, Loader2, StopCircle, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { YKI_SPEAKING_PROMPTS } from '../../data/yki';
import { aiService, speechRecognitionService } from '../../services/aiService';
import { useSettingsStore } from '../../stores/settingsStore';
import type { YkiSpeakingPrompt } from '../../types';

export default function YkiSpeaking() {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState<YkiSpeakingPrompt | null>(null);
  const [recording, setRecording] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [response, setResponse] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { settings } = useSettingsStore();

  useEffect(() => {
    let timer: number;
    if (recording && timeLeft > 0) {
      timer = window.setInterval(() => setTimeLeft(t => t - 1), 1000);
    } else if (recording && timeLeft === 0) {
      stopRecording();
    }
    return () => clearInterval(timer);
  }, [recording, timeLeft]);

  function startPrompt(p: YkiSpeakingPrompt) {
    setPrompt(p);
    setResponse('');
    setFeedback(null);
    setTimeLeft(p.durationSeconds);
  }

  async function startRecording() {
    if (!speechRecognitionService.isSupported()) {
      alert('Speech recognition is not supported in your browser.');
      return;
    }
    setRecording(true);
    try {
      const transcript = await speechRecognitionService.recognize('fi-FI');
      if (transcript.trim()) {
        setResponse(prev => prev + ' ' + transcript);
      }
    } catch (e) {
      console.error(e);
    } finally {
      // In a real continuous recognition, we would restart if time isn't up,
      // but for this demo, we'll just stop when the API stops or time is up.
      setRecording(false);
    }
  }

  function stopRecording() {
    setRecording(false);
    // Note: the speechRecognitionService doesn't have an explicit stop() in our simple wrapper,
    // but setting state to false handles the UI.
  }

  async function evaluate() {
    if (!response.trim()) return;
    setLoading(true);
    try {
      const evalPrompt = `Evaluate the following Finnish speech transcription for the YKI test (keskitaso/B1 level). 
Task: ${prompt?.instructions}
User's speech: "${response}"

Provide constructive feedback in English. Evaluate vocabulary, grammar, and flow. Conclude with an estimated YKI score (e.g. Below B1, B1, or B2) and what they need to improve. Keep it concise but helpful. Use markdown.`;
      
      const result = await aiService.chat([{ id: '1', role: 'user', content: evalPrompt, timestamp: new Date() }], settings);
      setFeedback(result);
    } catch (err: any) {
      setFeedback(`⚠️ Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }

  if (!prompt) {
    return (
      <div className="max-w-3xl mx-auto p-6 space-y-4">
        <button className="btn btn-ghost mb-4" onClick={() => navigate('/yki')}>
          <ArrowLeft size={16} /> Back to YKI Dashboard
        </button>
        <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Speaking (Puhuminen)</h1>
        <p style={{ color: 'var(--text-muted)' }}>Select a speaking task to practice.</p>
        <div className="space-y-3 mt-4">
          {YKI_SPEAKING_PROMPTS.map(p => (
            <button key={p.id} onClick={() => startPrompt(p)} className="card card-hover p-4 text-left w-full">
              <h3 className="font-bold mb-1" style={{ color: 'var(--text-primary)' }}>{p.title}</h3>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Time: {p.durationSeconds}s</p>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <button className="btn btn-ghost" onClick={() => setPrompt(null)}>
        <ArrowLeft size={16} /> Choose another task
      </button>

      <div className="card p-6 border-l-4" style={{ borderColor: '#0057B7', background: 'var(--bg-secondary)' }}>
        <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{prompt.title}</h2>
        <p className="text-lg font-medium" style={{ color: 'var(--text-secondary)' }}>{prompt.instructions}</p>
      </div>

      {!feedback ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-xl" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
            <div className="flex items-center gap-4">
              {recording ? (
                <button className="btn btn-icon recording-pulse" style={{ background: '#EF4444', color: 'white' }} onClick={stopRecording}>
                  <StopCircle size={24} />
                </button>
              ) : (
                <button className="btn btn-icon" style={{ background: '#0057B7', color: 'white' }} onClick={startRecording}>
                  <Mic size={24} />
                </button>
              )}
              <div>
                <p className="font-bold" style={{ color: 'var(--text-primary)' }}>
                  {recording ? 'Recording...' : 'Click to start speaking'}
                </p>
                <p className="text-sm font-mono" style={{ color: recording ? '#EF4444' : 'var(--text-muted)' }}>
                  Time left: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>Transcript (You can also type if your mic doesn't work):</label>
            <textarea
              className="input w-full h-32"
              value={response}
              onChange={e => setResponse(e.target.value)}
              placeholder="Your speech will appear here..."
            />
          </div>

          <button className="btn btn-primary w-full" onClick={evaluate} disabled={!response.trim() || loading}>
            {loading ? <Loader2 size={18} className="animate-spin" /> : 'Get AI Evaluation'}
          </button>
        </div>
      ) : (
        <div className="card p-6 space-y-4 animate-fade-in">
          <div className="flex items-center gap-2 text-green-600 mb-2">
            <CheckCircle2 size={24} />
            <h2 className="text-xl font-bold">AI Evaluation</h2>
          </div>
          <div className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}
            dangerouslySetInnerHTML={{ __html: feedback.replace(/\n/g, '<br/>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} 
          />
          <button className="btn btn-secondary mt-4" onClick={() => setPrompt(null)}>
            Try Another Task
          </button>
        </div>
      )}
    </div>
  );
}
