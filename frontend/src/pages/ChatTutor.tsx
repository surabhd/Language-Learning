import { useState, useRef, useEffect } from 'react';
import { aiService, ttsService } from '../services/aiService';
import { useSettingsStore } from '../stores/settingsStore';
import { useProgressStore } from '../stores/progressStore';
import type { ChatMessage } from '../types';
import { Send, Volume2, Trash2, Bot, User, Loader2, Sparkles } from 'lucide-react';

const SUGGESTIONS = [
  'Teach me Finnish greetings',
  'Explain Finnish cases',
  'Practice ordering food at a restaurant',
  'How do I use the partitive case?',
  'Give me a beginner vocabulary list',
  'Correct my Finnish: "Minä menen kaupassa"',
];

export default function ChatTutor() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [speaking, setSpeaking] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { settings } = useSettingsStore();
  const { addXP, addPracticeTime } = useProgressStore();
  const startTime = useRef(Date.now());

  useEffect(() => {
    return () => {
      const elapsed = Math.round((Date.now() - startTime.current) / 60000);
      if (elapsed > 0) addPracticeTime(elapsed);
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function sendMessage(text?: string) {
    const content = (text || input).trim();
    if (!content || loading) return;
    setInput('');

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);

    try {
      const all = [...messages, userMsg];
      const reply = await aiService.chat(all, settings);
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: reply,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMsg]);
      addXP(5);
    } catch (err: any) {
      const errMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `⚠️ **Connection Error**: ${err.message}\n\nMake sure LM Studio is running on \`${settings.baseUrl}\` and a model is loaded.`,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errMsg]);
    } finally {
      setLoading(false);
    }
  }

  async function speak(text: string, id: string) {
    if (speaking === id) {
      ttsService.stop();
      setSpeaking(null);
      return;
    }
    setSpeaking(id);
    try {
      await ttsService.speak(text);
    } catch { } finally {
      setSpeaking(null);
    }
  }

  function clearChat() {
    setMessages([]);
    ttsService.stop();
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  // Simple markdown renderer
  function renderContent(content: string) {
    const lines = content.split('\n');
    const elements: React.ReactNode[] = [];
    let inCode = false;
    let codeBlock: string[] = [];
    let tableRows: string[][] = [];
    let inTable = false;

    const flushTable = () => {
      if (tableRows.length > 0) {
        elements.push(
          <div key={`tbl-${elements.length}`} className="overflow-x-auto my-3">
            <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  {tableRows[0].map((cell, i) => (
                    <th key={i} className="px-3 py-2 text-left font-semibold"
                      style={{ borderBottom: '2px solid var(--border)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>
                      {cell}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableRows.slice(2).map((row, ri) => (
                  <tr key={ri}>
                    {row.map((cell, ci) => (
                      <td key={ci} className="px-3 py-1.5"
                        style={{ borderBottom: '1px solid var(--border)', color: 'var(--text-secondary)' }}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        tableRows = [];
        inTable = false;
      }
    };

    lines.forEach((line, i) => {
      if (line.startsWith('```')) {
        if (!inCode) { inCode = true; codeBlock = []; return; }
        else {
          inCode = false;
          elements.push(<pre key={i} className="rounded-xl p-3 my-2 overflow-x-auto text-xs font-mono"
            style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}>
            {codeBlock.join('\n')}
          </pre>);
          return;
        }
      }
      if (inCode) { codeBlock.push(line); return; }

      if (line.includes('|')) {
        inTable = true;
        const cells = line.split('|').filter(c => c.trim()).map(c => c.trim());
        tableRows.push(cells);
        return;
      } else if (inTable) {
        flushTable();
      }

      const formatted = line
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/`(.*?)`/g, `<code style="background:var(--bg-secondary);padding:1px 5px;border-radius:4px;font-family:monospace;font-size:0.85em;color:#0057B7">$1</code>`)
        .replace(/^### (.+)/, '<h3 style="font-size:1rem;font-weight:700;margin-top:1em;margin-bottom:0.3em">$1</h3>')
        .replace(/^## (.+)/, '<h2 style="font-size:1.1rem;font-weight:700;margin-top:1.2em;margin-bottom:0.4em">$1</h2>')
        .replace(/^# (.+)/, '<h1 style="font-size:1.25rem;font-weight:800;margin-top:0.5em;margin-bottom:0.5em">$1</h1>');

      if (!formatted.trim()) {
        elements.push(<div key={i} className="h-2" />);
      } else if (line.startsWith('- ') || line.startsWith('* ')) {
        elements.push(
          <div key={i} className="flex gap-2 my-0.5 text-sm" style={{ color: 'var(--text-secondary)' }}>
            <span className="mt-1 shrink-0" style={{ color: '#0057B7' }}>•</span>
            <span dangerouslySetInnerHTML={{ __html: formatted.replace(/^[-*] /, '') }} />
          </div>
        );
      } else {
        elements.push(
          <div key={i} className="text-sm leading-relaxed"
            dangerouslySetInnerHTML={{ __html: formatted }} />
        );
      }
    });

    if (inTable) flushTable();
    return elements;
  }

  return (
    <div className="h-screen flex flex-col" style={{ maxHeight: 'calc(100vh - 57px)' }}>
      {/* Header */}
      <div className="px-6 py-4 border-b flex items-center gap-3"
        style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}>
        <div className="w-10 h-10 rounded-xl gradient-finnish flex items-center justify-center">
          <Bot size={20} className="text-white" />
        </div>
        <div>
          <h1 className="font-bold text-base" style={{ color: 'var(--text-primary)' }}>Aino — Finnish Tutor</h1>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Your personal AI Finnish teacher</p>
        </div>
        {messages.length > 0 && (
          <button className="ml-auto btn btn-ghost btn-sm text-red-400" onClick={clearChat}>
            <Trash2 size={14} /> Clear
          </button>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-6 py-12">
            <div className="text-6xl">🇫🇮</div>
            <div className="text-center max-w-md">
              <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                Tervetuloa! Welcome!
              </h2>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                I'm Aino, your Finnish tutor. Ask me anything about Finnish language, grammar, vocabulary, or practice conversation!
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2 w-full max-w-lg">
              {SUGGESTIONS.map(s => (
                <button
                  key={s}
                  onClick={() => sendMessage(s)}
                  className="card card-hover p-3 text-left text-xs flex items-start gap-2"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  <Sparkles size={13} className="shrink-0 mt-0.5" style={{ color: '#0057B7' }} />
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map(msg => (
            <div key={msg.id} className={`flex gap-3 animate-fade-in ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'assistant' ? 'gradient-finnish' : ''}`}
                style={msg.role === 'user' ? { background: 'var(--bg-secondary)', border: '2px solid var(--border)' } : {}}>
                {msg.role === 'assistant' ? <Bot size={16} className="text-white" /> : <User size={16} style={{ color: 'var(--text-muted)' }} />}
              </div>

              <div className={msg.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai'}>
                {msg.role === 'assistant' ? (
                  <div style={{ color: 'var(--text-primary)' }}>
                    {renderContent(msg.content)}
                  </div>
                ) : (
                  <p className="text-sm">{msg.content}</p>
                )}
                {msg.role === 'assistant' && (
                  <div className="mt-2 pt-2 border-t flex items-center gap-2" style={{ borderColor: 'var(--border)' }}>
                    <button
                      onClick={() => speak(msg.content, msg.id)}
                      className="btn btn-ghost btn-sm btn-icon"
                      title="Read aloud"
                    >
                      <Volume2 size={13} style={{ color: speaking === msg.id ? '#0057B7' : 'var(--text-muted)' }} />
                    </button>
                    <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))
        )}

        {loading && (
          <div className="flex gap-3 animate-fade-in">
            <div className="w-8 h-8 rounded-full gradient-finnish flex items-center justify-center shrink-0">
              <Bot size={16} className="text-white" />
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
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask Aino anything about Finnish... (Enter to send)"
            className="input flex-1"
            rows={1}
            style={{ maxHeight: '120px', overflowY: 'auto' }}
          />
          <button
            className="btn btn-primary btn-icon shrink-0"
            onClick={() => sendMessage()}
            disabled={!input.trim() || loading}
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
          </button>
        </div>
        <p className="text-xs text-center mt-2" style={{ color: 'var(--text-muted)' }}>
          Shift+Enter for new line • Each message earns +5 XP
        </p>
      </div>
    </div>
  );
}
