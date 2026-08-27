import { useProfileStore } from '../stores/profileStore';
import { useState } from 'react';
import { aiService } from '../services/aiService';
import { useSettingsStore } from '../stores/settingsStore';
import { useProgressStore } from '../stores/progressStore';
import { GRAMMAR_TOPICS } from '../data/lessons';
import { Loader2, ChevronRight, BookOpen, ArrowLeft } from 'lucide-react';

type GrammarState = 'list' | 'loading' | 'content';

export default function GrammarPage() {
  const [state, setState] = useState<GrammarState>('list');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [content, setContent] = useState('');
  const [customTopic, setCustomTopic] = useState('');
  const { settings } = useSettingsStore();
  const { addXP } = useProgressStore();

  async function loadTopic(topic: string) {
    setSelectedTopic(topic);
    setState('loading');
    try {
      const explanation = await aiService.explainGrammar(topic, settings);
      setContent(explanation);
      setState('content');
      addXP(10);
    } catch (err: any) {
      setContent(`⚠️ Error: ${err.message}\n\nMake sure LM Studio is running.`);
      setState('content');
    }
  }

  function renderMarkdown(text: string) {
    if (!text) return null;
    const lines = text.split('\n');
    const elements: React.ReactNode[] = [];
    let tableRows: string[][] = [];
    let inTable = false;

    const flushTable = (key: string) => {
      if (tableRows.length < 2) { tableRows = []; inTable = false; return; }
      elements.push(
        <div key={key} className="overflow-x-auto my-4">
          <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {tableRows[0].map((cell, i) => (
                  <th key={i} className="px-3 py-2 text-left font-semibold text-sm"
                    style={{ borderBottom: '2px solid var(--border)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>
                    {cell.trim()}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableRows.slice(2).map((row, ri) => (
                <tr key={ri} style={ri % 2 === 0 ? {} : { background: 'var(--bg-secondary)' }}>
                  {row.map((cell, ci) => (
                    <td key={ci} className="px-3 py-2 text-sm"
                      style={{ borderBottom: '1px solid var(--border)', color: 'var(--text-secondary)' }}>
                      {cell.trim()}
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
    };

    lines.forEach((line, i) => {
      if (line.includes('|') && line.trim().startsWith('|')) {
        inTable = true;
        const cells = line.split('|').filter((_, idx) => idx > 0 && idx < line.split('|').length - 1);
        if (!cells.every(c => /^[-: ]+$/.test(c))) {
          tableRows.push(cells);
        }
        return;
      } else if (inTable) {
        flushTable(`tbl-${i}`);
      }

      if (!line.trim()) {
        elements.push(<div key={i} className="h-3" />);
        return;
      }

      if (line.startsWith('# ')) {
        elements.push(<h1 key={i} className="text-2xl font-extrabold mt-2 mb-3" style={{ color: 'var(--text-primary)' }}>{line.slice(2)}</h1>);
      } else if (line.startsWith('## ')) {
        elements.push(<h2 key={i} className="text-lg font-bold mt-5 mb-2" style={{ color: 'var(--text-primary)' }}>{line.slice(3)}</h2>);
      } else if (line.startsWith('### ')) {
        elements.push(<h3 key={i} className="text-base font-semibold mt-4 mb-1.5" style={{ color: 'var(--text-primary)' }}>{line.slice(4)}</h3>);
      } else if (line.startsWith('- ') || line.startsWith('* ')) {
        const html = line.slice(2)
          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
          .replace(/`(.*?)`/g, '<code style="background:var(--bg-secondary);padding:1px 5px;border-radius:3px;font-family:monospace;font-size:0.875em;color:#0057B7">$1</code>');
        elements.push(
          <div key={i} className="flex gap-2 my-1 text-sm" style={{ color: 'var(--text-secondary)' }}>
            <span className="shrink-0 mt-0.5" style={{ color: '#0057B7' }}>•</span>
            <span dangerouslySetInnerHTML={{ __html: html }} />
          </div>
        );
      } else if (line.startsWith('> ')) {
        elements.push(
          <blockquote key={i} className="border-l-4 pl-4 italic my-3 text-sm"
            style={{ borderColor: '#0057B7', color: 'var(--text-secondary)' }}>
            {line.slice(2)}
          </blockquote>
        );
      } else {
        const html = line
          .replace(/\*\*(.*?)\*\*/g, '<strong style="color:var(--text-primary)">$1</strong>')
          .replace(/\*(.*?)\*/g, '<em>$1</em>')
          .replace(/`(.*?)`/g, '<code style="background:var(--bg-secondary);padding:1px 5px;border-radius:3px;font-family:monospace;font-size:0.875em;color:#0057B7">$1</code>');
        elements.push(
          <p key={i} className="text-sm leading-relaxed my-1"
            style={{ color: 'var(--text-secondary)' }}
            dangerouslySetInnerHTML={{ __html: html }} />
        );
      }
    });

    if (inTable) flushTable('tbl-end');
    return elements;
  }

  if (state === 'list') {
    return (
      <div className="p-6 max-w-3xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-extrabold" style={{ color: 'var(--text-primary)' }}>Grammar Assistant</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
            AI-powered explanations of Finnish grammar concepts
          </p>
        </div>

        <div className="card p-4 space-y-3">
          <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Custom topic</p>
          <div className="flex gap-2">
            <input
              className="input flex-1"
              placeholder="e.g. 'Finnish vowel harmony', 'how to use -kin/-kaan', ..."
              value={customTopic}
              onChange={e => setCustomTopic(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && customTopic.trim() && loadTopic(customTopic.trim())}
            />
            <button
              className="btn btn-primary"
              disabled={!customTopic.trim()}
              onClick={() => loadTopic(customTopic.trim())}
            >
              Explain
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-semibold" style={{ color: 'var(--text-muted)' }}>Common Topics</p>
          {GRAMMAR_TOPICS.map(topic => (
            <button
              key={topic.id}
              onClick={() => loadTopic(topic.title)}
              className="card card-hover w-full p-4 flex items-center gap-3 text-left"
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                style={{ background: 'var(--bg-secondary)' }}>
                {topic.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{topic.title}</span>
                  <span className={`badge level-${topic.difficulty} text-xs`}>{topic.difficulty}</span>
                </div>
                <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{topic.description}</p>
              </div>
              <ChevronRight size={16} style={{ color: 'var(--text-muted)' }} />
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (state === 'loading') {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <Loader2 size={36} className="animate-spin" style={{ color: '#0057B7' }} />
        <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>Explaining: {selectedTopic}</p>
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>AI is generating a detailed explanation...</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-5">
      <div className="flex items-center gap-3">
        <button className="btn btn-ghost btn-icon" onClick={() => setState('list')}>
          <ArrowLeft size={18} />
        </button>
        <div>
          <h1 className="font-extrabold text-lg" style={{ color: 'var(--text-primary)' }}>{selectedTopic}</h1>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>AI-generated grammar explanation</p>
        </div>
        <div className="ml-auto flex gap-2">
          <button className="btn btn-secondary btn-sm" onClick={() => loadTopic(selectedTopic)}>
            Regenerate
          </button>
          <button className="btn btn-primary btn-sm" onClick={() => setState('list')}>
            <BookOpen size={14} /> More Topics
          </button>
        </div>
      </div>

      <div className="card p-6">
        <div>{renderMarkdown(content)}</div>
      </div>
    </div>
  );
}
