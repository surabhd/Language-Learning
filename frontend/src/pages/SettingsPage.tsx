import { useProfileStore } from '../stores/profileStore';
import { useState } from 'react';
import { useSettingsStore } from '../stores/settingsStore';
import { useProgressStore } from '../stores/progressStore';
import { aiService } from '../services/aiService';
import { Save, Wifi, WifiOff, Loader2, RefreshCw, AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react';

export default function SettingsPage() {
  const { settings, updateSettings } = useSettingsStore();
  const activeId = useProfileStore(s => s.activeProfileId);
  const progress = useProgressStore(s => s.data[activeId] || s.data['default']);
  const { resetProgress } = useProgressStore();
  const [local, setLocal] = useState({ ...settings });
  const [testing, setTesting] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'ok' | 'fail'>('idle');
  const [models, setModels] = useState<string[]>([]);
  const [showReset, setShowReset] = useState(false);

  function handleSave() {
    updateSettings(local);
    alert('Settings saved!');
  }

  async function testConnection() {
    setTesting(true);
    setConnectionStatus('idle');
    setModels([]);
    try {
      const result = await aiService.testConnection();
      if (result.connected) {
        setConnectionStatus('ok');
        setModels(result.models?.map((m: any) => m.id || m) || []);
      } else {
        setConnectionStatus('fail');
      }
    } catch {
      setConnectionStatus('fail');
    } finally {
      setTesting(false);
    }
  }

  function handleReset() {
    resetProgress();
    setShowReset(false);
    alert('Progress has been reset.');
  }

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold" style={{ color: 'var(--text-primary)' }}>Settings</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>Configure LM Studio and app preferences</p>
      </div>

      {/* LM Studio Connection */}
      <div className="card p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Wifi size={18} style={{ color: '#0057B7' }} />
          <h2 className="font-bold" style={{ color: 'var(--text-primary)' }}>LM Studio Connection</h2>
        </div>

        <div>
          <label className="text-sm font-semibold mb-1.5 block" style={{ color: 'var(--text-primary)' }}>Base URL</label>
          <input
            className="input"
            value={local.baseUrl}
            onChange={e => setLocal(p => ({ ...p, baseUrl: e.target.value }))}
            placeholder="http://localhost:1234"
          />
          <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
            Default LM Studio port is 1234. Change if you've configured a different port.
          </p>
        </div>

        <div>
          <label className="text-sm font-semibold mb-1.5 block" style={{ color: 'var(--text-primary)' }}>Model Name</label>
          <input
            className="input"
            value={local.model}
            onChange={e => setLocal(p => ({ ...p, model: e.target.value }))}
            placeholder="local-model"
          />
          {models.length > 0 && (
            <div className="mt-2 space-y-1">
              <p className="text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>Available models:</p>
              {models.map(m => (
                <button key={m} className="btn btn-secondary btn-sm mr-2 mb-1 text-xs"
                  onClick={() => setLocal(p => ({ ...p, model: m }))}>
                  {m}
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          className="btn btn-secondary"
          onClick={testConnection}
          disabled={testing}
        >
          {testing ? <Loader2 size={16} className="animate-spin" /> : <RefreshCw size={16} />}
          Test Connection
        </button>

        {connectionStatus === 'ok' && (
          <div className="flex items-center gap-2 text-sm text-green-600 p-3 rounded-xl"
            style={{ background: 'var(--success-light)' }}>
            <Wifi size={16} />
            <span>✅ Connected to LM Studio successfully!</span>
          </div>
        )}
        {connectionStatus === 'fail' && (
          <div className="flex items-start gap-2 text-sm p-3 rounded-xl"
            style={{ background: 'var(--danger-light)', color: '#DC2626' }}>
            <WifiOff size={16} className="shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Cannot connect to LM Studio</p>
              <p className="text-xs mt-1">Make sure LM Studio is running at {local.baseUrl} and a model is loaded.</p>
            </div>
          </div>
        )}
      </div>

      {/* Model Parameters */}
      <div className="card p-6 space-y-4">
        <h2 className="font-bold" style={{ color: 'var(--text-primary)' }}>Model Parameters</h2>

        <div>
          <div className="flex justify-between mb-1.5">
            <label className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
              Temperature: {local.temperature}
            </label>
            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
              {local.temperature < 0.4 ? 'More focused' : local.temperature > 0.8 ? 'More creative' : 'Balanced'}
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={local.temperature}
            onChange={e => setLocal(p => ({ ...p, temperature: parseFloat(e.target.value) }))}
            className="w-full accent-blue-600"
          />
          <div className="flex justify-between text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
            <span>0 (deterministic)</span>
            <span>1 (creative)</span>
          </div>
          <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
            Recommended: 0.7 for teaching, 0.4 for grammar explanations
          </p>
        </div>

        <div>
          <label className="text-sm font-semibold mb-1.5 block" style={{ color: 'var(--text-primary)' }}>
            Max Tokens: {local.maxTokens}
          </label>
          <input
            type="range"
            min="256"
            max="4096"
            step="128"
            value={local.maxTokens}
            onChange={e => setLocal(p => ({ ...p, maxTokens: parseInt(e.target.value) }))}
            className="w-full accent-blue-600"
          />
          <div className="flex justify-between text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
            <span>256 (short)</span>
            <span>4096 (long)</span>
          </div>
        </div>

        <button className="btn btn-primary" onClick={handleSave}>
          <Save size={16} /> Save Settings
        </button>
      </div>

      {/* Progress Stats */}
      <div className="card p-6 space-y-3">
        <h2 className="font-bold" style={{ color: 'var(--text-primary)' }}>Your Progress</h2>
        <div className="grid grid-cols-2 gap-3 text-sm">
          {[
            ['Level', progress.level],
            ['Total XP', progress.totalXP.toLocaleString()],
            ['Current Streak', `${progress.streak} days`],
            ['Longest Streak', `${progress.longestStreak} days`],
            ['Lessons Completed', progress.lessonsCompleted.length],
            ['Quizzes Taken', progress.quizHistory.length],
            ['Practice Time', `${progress.practiceMinutes} min`],
            ['Vocab Size', progress.vocabSize],
          ].map(([label, value]) => (
            <div key={label as string} className="flex justify-between p-2 rounded-lg" style={{ background: 'var(--bg-secondary)' }}>
              <span style={{ color: 'var(--text-muted)' }}>{label}</span>
              <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Danger zone */}
      <div className="card p-5 border-2" style={{ borderColor: '#FCA5A5' }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle size={18} style={{ color: '#EF4444' }} />
            <h2 className="font-bold text-sm" style={{ color: '#EF4444' }}>Danger Zone</h2>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={() => setShowReset(!showReset)}>
            {showReset ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
        </div>
        {showReset && (
          <div className="mt-4 space-y-3 animate-fade-in">
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              This will reset all your progress: XP, streaks, completed lessons, and quiz history. Your vocabulary bank will be kept.
            </p>
            <button className="btn btn-danger" onClick={handleReset}>
              Reset All Progress
            </button>
          </div>
        )}
      </div>

      {/* About */}
      <div className="card p-5 text-center">
        <div className="text-4xl mb-2">🇫🇮</div>
        <p className="font-bold" style={{ color: 'var(--text-primary)' }}>SuomiApp</p>
        <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>Finnish Language Learning App • Powered by LM Studio</p>
        <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>Features: Chat Tutor, Lessons, Flashcards, Quizzes, Conversation, Pronunciation, Vocabulary, Grammar</p>
      </div>
    </div>
  );
}
