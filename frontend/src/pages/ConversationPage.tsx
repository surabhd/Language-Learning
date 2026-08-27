import { useProfileStore } from '../stores/profileStore';
import { useState, useRef, useEffect } from 'react';
import { aiService, ttsService } from '../services/aiService';
import { useSettingsStore } from '../stores/settingsStore';
import { useProgressStore } from '../stores/progressStore';
import { SCENARIOS } from '../data/lessons';
import { Send, Volume2, RotateCcw, User, Loader2, ChevronRight } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function ConversationPage() {
  const [scenario, setScenario] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { settings } = useSettingsStore();
  const { addXP } = useProgressStore();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function startScenario(id: string) {
    const s = SCENARIOS.find(sc => sc.id === id)!;
    setScenario(id);
    const starterMsg: Message = { role: 'assistant', content: s.starter };
    setMessages([starterMsg]);
  }

  async function sendMessage() {
    if (!input.trim() || loading || !scenario) return;
    const content = input.trim();
    setInput('');
    const userMsg: Message = { role: 'user', content };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setLoading(true);

    try {
      const reply = await aiService.converse(scenario, updated, settings);
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
      addXP(5);
    } catch (err: any) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `⚠️ Connection error: ${err.message}. Make sure LM Studio is running.`
      }]);
    } finally {
      setLoading(false);
    }
  }

  async function speak(text: string) {
    setSpeaking(true);
    try {
      await ttsService.speak(text);
    } catch {} finally {
      setSpeaking(false);
    }
  }

  function reset() {
    setScenario(null);
    setMessages([]);
    setInput('');
    ttsService.stop();
  }

  if (!scenario) {
    return (
      <div className="p-6 max-w-3xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-extrabold" style={{ color: 'var(--text-primary)' }}>Conversation Practice</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
            Choose a scenario and practice real Finnish conversations with AI
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {SCENARIOS.map(s => (
            <button
              key={s.id}
              onClick={() => startScenario(s.id)}
              className="card card-hover p-5 text-left flex items-start gap-4 transition-all"
            >
              <div className="text-4xl">{s.icon}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold" style={{ color: 'var(--text-primary)' }}>{s.title}</span>
                  <span className={`badge level-${s.difficulty} text-xs`}>{s.difficulty}</span>
                </div>
                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{s.description}</p>
                <div className="mt-2 text-xs font-mono p-2 rounded-lg" style={{ background: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>
                  "{s.starter.length > 60 ? s.starter.slice(0, 60) + '...' : s.starter}"
                </div>
              </div>
              <ChevronRight size={18} className="shrink-0 mt-1" style={{ color: 'var(--text-muted)' }} />
            </button>
          ))}
        </div>

        <div className="card p-4" style={{ background: 'var(--bg-secondary)', border: 'none' }}>
          <p className="text-xs font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>💡 Tips for conversation practice:</p>
          <ul className="text-xs space-y-1" style={{ color: 'var(--text-muted)' }}>
            <li>• The AI stays in character — immerse yourself in the scenario</li>
            <li>• The AI will gently correct your Finnish mistakes</li>
            <li>• Try to use Finnish as much as possible, even simple phrases</li>
            <li>• Click 🔊 to hear any Finnish text spoken aloud</li>
          </ul>
        </div>
      </div>
    );
  }

  const currentScenario = SCENARIOS.find(s => s.id === scenario)!;

  return (
    <div className="h-screen flex flex-col" style={{ maxHeight: 'calc(100vh - 57px)' }}>
      {/* Header */}
      <div className="px-6 py-4 border-b flex items-center gap-3"
        style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}>
        <div className="text-2xl">{currentScenario.icon}</div>
        <div className="flex-1">
          <h2 className="font-bold" style={{ color: 'var(--text-primary)' }}>{currentScenario.title}</h2>
          <div className="flex items-center gap-2">
            <span className={`badge level-${currentScenario.difficulty} text-xs`}>{currentScenario.difficulty}</span>
            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{currentScenario.description}</span>
          </div>
        </div>
        <button className="btn btn-ghost btn-sm" onClick={reset}>
          <RotateCcw size={14} /> New Scenario
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-3 animate-fade-in ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'assistant' ? '' : ''}`}
              style={msg.role === 'assistant'
                ? { background: '#003580' }
                : { background: 'var(--bg-secondary)', border: '2px solid var(--border)' }}>
              {msg.role === 'assistant'
                ? <span className="text-sm">{currentScenario.icon}</span>
                : <User size={16} style={{ color: 'var(--text-muted)' }} />}
            </div>

            <div className={msg.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai'}>
              <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
              {msg.role === 'assistant' && (
                <button
                  className="mt-1.5 btn btn-ghost btn-sm btn-icon"
                  onClick={() => speak(msg.content)}
                  disabled={speaking}
                >
                  <Volume2 size={12} style={{ color: speaking ? '#0057B7' : 'var(--text-muted)' }} />
                </button>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
              style={{ background: '#003580' }}>
              <span className="text-sm">{currentScenario.icon}</span>
            </div>
            <div className="chat-bubble-ai">
              <div className="flex gap-1 py-1">
                <div className="typing-dot" />
                <div className="typing-dot" />
                <div className="typing-dot" />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t" style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}>
        <div className="flex gap-3 items-end max-w-4xl mx-auto">
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
            placeholder={`Reply in Finnish... (try: "Haluaisin kahvin, kiitos")`}
            className="input flex-1"
            rows={1}
            style={{ maxHeight: '120px', overflowY: 'auto' }}
          />
          <button
            className="btn btn-primary btn-icon shrink-0"
            onClick={sendMessage}
            disabled={!input.trim() || loading}
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
          </button>
        </div>
        <p className="text-center text-xs mt-2" style={{ color: 'var(--text-muted)' }}>
          Try to respond in Finnish! The AI will correct mistakes and help you improve.
        </p>
      </div>
    </div>
  );
}
