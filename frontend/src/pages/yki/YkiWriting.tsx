import { useState } from 'react';
import { ArrowLeft, Loader2, CheckCircle2, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { YKI_WRITING_PROMPTS } from '../../data/yki';
import { aiService } from '../../services/aiService';
import { useSettingsStore } from '../../stores/settingsStore';
import type { YkiWritingPrompt } from '../../types';

export default function YkiWriting() {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState<YkiWritingPrompt | null>(null);
  const [response, setResponse] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { settings } = useSettingsStore();

  function startPrompt(p: YkiWritingPrompt) {
    setPrompt(p);
    setResponse('');
    setFeedback(null);
  }

  async function evaluate() {
    if (!response.trim()) return;
    setLoading(true);
    try {
      const evalPrompt = `Evaluate the following Finnish written text for the YKI test (keskitaso/B1 level).
Task Type: ${prompt?.type}
Instructions: ${prompt?.instructions}
User's text: "${response}"

Provide constructive feedback in English. Evaluate vocabulary, grammar, spelling, and whether it properly addresses the task. Conclude with an estimated YKI score (e.g. Below B1, B1, or B2). Keep it concise but helpful. Use markdown.`;
      
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
        <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Writing (Kirjoittaminen)</h1>
        <p style={{ color: 'var(--text-muted)' }}>Select a writing task to practice.</p>
        <div className="space-y-3 mt-4">
          {YKI_WRITING_PROMPTS.map(p => (
            <button key={p.id} onClick={() => startPrompt(p)} className="card card-hover p-4 text-left w-full flex items-center justify-between">
              <div>
                <h3 className="font-bold mb-1" style={{ color: 'var(--text-primary)' }}>{p.title}</h3>
                <p className="text-sm uppercase tracking-wider font-semibold" style={{ color: 'var(--text-muted)' }}>{p.type.replace('-', ' ')}</p>
              </div>
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

      <div className="card p-6 border-l-4" style={{ borderColor: '#8B5CF6', background: 'var(--bg-secondary)' }}>
        <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{prompt.title}</h2>
        <p className="text-lg font-medium" style={{ color: 'var(--text-secondary)' }}>{prompt.instructions}</p>
      </div>

      {!feedback ? (
        <div className="space-y-4">
          <textarea
            className="input w-full h-64 font-mono text-sm leading-relaxed p-4"
            value={response}
            onChange={e => setResponse(e.target.value)}
            placeholder="Kirjoita tähän... (Write your answer here)"
          />
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold" style={{ color: 'var(--text-muted)' }}>
              Words: {response.trim() ? response.trim().split(/\s+/).length : 0}
            </span>
            <button className="btn btn-primary px-8" onClick={evaluate} disabled={!response.trim() || loading}>
              {loading ? <Loader2 size={18} className="animate-spin" /> : <><Send size={16} className="mr-2" /> Submit for Evaluation</>}
            </button>
          </div>
        </div>
      ) : (
        <div className="card p-6 space-y-4 animate-fade-in">
          <div className="flex items-center gap-2 text-purple-600 mb-2">
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
