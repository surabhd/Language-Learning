import { useProfileStore } from '../stores/profileStore';
import { useState } from 'react';
import { aiService, ttsService, speechRecognitionService } from '../services/aiService';
import { useSettingsStore } from '../stores/settingsStore';
import { useProgressStore } from '../stores/progressStore';
import { PRONUNCIATION_PHRASES } from '../data/lessons';
import { Mic, MicOff, Volume2, ChevronRight, ChevronLeft, Loader2 } from 'lucide-react';
import type { Level } from '../types';

const LEVEL_FILTERS: Level[] = ['beginner', 'intermediate', 'advanced'];

export default function PronunciationPage() {
  const [levelFilter, setLevelFilter] = useState<Level | 'all'>('all');
  const [index, setIndex] = useState(0);
  const [recording, setRecording] = useState(false);
  const [userAttempt, setUserAttempt] = useState('');
  const [feedback, setFeedback] = useState('');
  const [loadingFeedback, setLoadingFeedback] = useState(false);
  const [error, setError] = useState('');
  const { settings } = useSettingsStore();
  const { addXP } = useProgressStore();

  const phrases = PRONUNCIATION_PHRASES.filter(p =>
    levelFilter === 'all' || p.difficulty === levelFilter
  );
  const phrase = phrases[index % phrases.length];

  async function speak() {
    try {
      await ttsService.speak(phrase.finnish);
    } catch (err: any) {
      setError('Text-to-speech not supported in this browser.');
    }
  }

  async function recordAttempt() {
    if (!speechRecognitionService.isSupported()) {
      setError('Speech recognition is not supported in your browser. Try Chrome or Edge.');
      return;
    }

    setRecording(true);
    setError('');
    setFeedback('');
    setUserAttempt('');

    try {
      const transcript = await speechRecognitionService.recognize('fi-FI');
      setUserAttempt(transcript);
      await getFeedback(transcript);
    } catch (err: any) {
      // Fall back to text input
      setError(`Speech recognition error: ${err.message}. You can type your pronunciation attempt below.`);
    } finally {
      setRecording(false);
    }
  }

  async function getFeedback(attempt: string) {
    if (!attempt.trim()) return;
    setLoadingFeedback(true);
    setFeedback('');
    try {
      const fb = await aiService.getPronunciationFeedback(phrase.finnish, attempt, settings);
      setFeedback(fb);
      addXP(8);
    } catch (err: any) {
      setFeedback(`⚠️ Could not get feedback: ${err.message}`);
    } finally {
      setLoadingFeedback(false);
    }
  }

  function next() {
    setIndex(i => (i + 1) % phrases.length);
    setUserAttempt('');
    setFeedback('');
    setError('');
  }

  function prev() {
    setIndex(i => (i - 1 + phrases.length) % phrases.length);
    setUserAttempt('');
    setFeedback('');
    setError('');
  }

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold" style={{ color: 'var(--text-primary)' }}>Pronunciation Coach</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
          Listen, speak, and get AI feedback on your Finnish pronunciation
        </p>
      </div>

      {/* Level filter */}
      <div className="flex gap-2">
        <button
          onClick={() => { setLevelFilter('all'); setIndex(0); }}
          className={`btn btn-sm ${levelFilter === 'all' ? 'btn-primary' : 'btn-secondary'}`}
        >All</button>
        {LEVEL_FILTERS.map(l => (
          <button
            key={l}
            onClick={() => { setLevelFilter(l); setIndex(0); }}
            className={`btn btn-sm ${levelFilter === l ? 'btn-primary' : 'btn-secondary'}`}
          >
            {l.charAt(0).toUpperCase() + l.slice(1)}
          </button>
        ))}
      </div>

      {/* Main phrase card */}
      <div className="card p-8 text-center space-y-4">
        <div className="flex items-center justify-between">
          <button className="btn btn-ghost btn-icon" onClick={prev}><ChevronLeft size={20} /></button>
          <div>
            <div className="flex items-center justify-center gap-2 mb-1">
              <span className={`badge level-${phrase.difficulty}`}>{phrase.difficulty}</span>
              <span className="badge badge-blue">{phrase.category}</span>
            </div>
            <h2 className="text-3xl font-extrabold mt-3" style={{ color: '#0057B7' }}>{phrase.finnish}</h2>
            <p className="text-base mt-2" style={{ color: 'var(--text-secondary)' }}>{phrase.english}</p>
            <p className="text-sm font-mono mt-1" style={{ color: 'var(--text-muted)' }}>🔊 {phrase.phonetic}</p>
          </div>
          <button className="btn btn-ghost btn-icon" onClick={next}><ChevronRight size={20} /></button>
        </div>

        <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{index + 1} / {phrases.length}</div>

        {/* Listen button */}
        <button className="btn btn-primary btn-lg mx-auto" onClick={speak}>
          <Volume2 size={18} /> Listen to Pronunciation
        </button>
      </div>

      {/* Record section */}
      <div className="card p-6 space-y-4">
        <h3 className="font-bold" style={{ color: 'var(--text-primary)' }}>Your Turn — Speak it!</h3>

        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <button
              onClick={recordAttempt}
              disabled={recording || loadingFeedback}
              className={`w-20 h-20 rounded-full flex items-center justify-center transition-all ${recording ? 'recording-pulse' : ''}`}
              style={{
                background: recording ? '#EF4444' : '#0057B7',
                color: 'white',
                boxShadow: recording ? '0 0 0 0 rgba(239,68,68,0.4)' : '0 4px 12px rgba(0,87,183,0.4)',
              }}
            >
              {recording ? <MicOff size={28} /> : <Mic size={28} />}
            </button>
            {recording && (
              <div className="absolute -inset-2 rounded-full border-2 border-red-400 animate-ping opacity-40" />
            )}
          </div>

          <p className="text-sm text-center" style={{ color: 'var(--text-muted)' }}>
            {recording ? '🔴 Recording... Speak now!' : 'Click to record your attempt'}
          </p>
        </div>

        {/* Text fallback input */}
        {(error || userAttempt) && (
          <div className="space-y-2">
            <label className="text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>
              Or type what you said:
            </label>
            <div className="flex gap-2">
              <input
                className="input text-sm"
                value={userAttempt}
                onChange={e => setUserAttempt(e.target.value)}
                placeholder="Type your pronunciation attempt..."
              />
              <button
                className="btn btn-primary btn-sm"
                onClick={() => getFeedback(userAttempt)}
                disabled={!userAttempt.trim() || loadingFeedback}
              >
                {loadingFeedback ? <Loader2 size={14} className="animate-spin" /> : 'Get Feedback'}
              </button>
            </div>
          </div>
        )}

        {error && (
          <div className="p-3 rounded-xl text-xs" style={{ background: 'var(--danger-light)', color: '#DC2626' }}>
            {error}
          </div>
        )}

        {userAttempt && !recording && (
          <div className="p-3 rounded-xl" style={{ background: 'var(--bg-secondary)' }}>
            <span className="text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>You said: </span>
            <span className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{userAttempt}</span>
          </div>
        )}

        {/* AI Feedback */}
        {loadingFeedback && (
          <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-muted)' }}>
            <Loader2 size={16} className="animate-spin" />
            Analyzing your pronunciation...
          </div>
        )}

        {feedback && !loadingFeedback && (
          <div className="p-4 rounded-xl border" style={{ background: 'var(--finnish-blue-pale)', borderColor: '#0057B7' + '33' }}>
            <p className="text-xs font-bold mb-2" style={{ color: '#0057B7' }}>🤖 AI Pronunciation Coach</p>
            <div className="text-sm whitespace-pre-wrap" style={{ color: 'var(--text-primary)' }}>
              {feedback}
            </div>
          </div>
        )}
      </div>

      {/* Finnish pronunciation tips */}
      <div className="card p-5">
        <h3 className="font-bold mb-3 text-sm" style={{ color: 'var(--text-primary)' }}>Finnish Pronunciation Rules</h3>
        <div className="grid grid-cols-1 gap-2 text-xs" style={{ color: 'var(--text-secondary)' }}>
          {[
            { rule: 'Every letter is pronounced', example: '"kahvi" = kah-vi (no silent letters)' },
            { rule: 'Stress is always on the first syllable', example: '"Hel-SIN-ki" → "HEL-sin-ki"' },
            { rule: 'Double letters are held longer', example: '"takka" (fireplace) vs "taka" (back)' },
            { rule: 'Vowel harmony', example: 'Back vowels (a,o,u) or front vowels (ä,ö,y)' },
            { rule: 'ä sounds like "a" in "cat"', example: '"tänään" = tä-nään' },
            { rule: 'y sounds like German ü', example: '"hyvin" = hü-vin' },
          ].map(({ rule, example }) => (
            <div key={rule} className="flex gap-2">
              <span className="mt-0.5 shrink-0" style={{ color: '#0057B7' }}>•</span>
              <div>
                <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>{rule}</span>
                <span style={{ color: 'var(--text-muted)' }}> — {example}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
