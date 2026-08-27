import { useProfileStore } from '../stores/profileStore';
import { useState } from 'react';
import { useVocabStore } from '../stores/vocabStore';
import { useProgressStore } from '../stores/progressStore';
import { ttsService } from '../services/aiService';
import type { VocabWord } from '../types';
import { Volume2, RotateCcw, Check, X, Minus, ChevronRight, Star } from 'lucide-react';

type Mode = 'menu' | 'studying' | 'done';

export default function Flashcards() {
  const { getDueWords, reviewWord, words } = useVocabStore();
  const { addXP } = useProgressStore();
  const [mode, setMode] = useState<Mode>('menu');
  const [deck, setDeck] = useState<VocabWord[]>([]);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [results, setResults] = useState<{ word: string; quality: number }[]>([]);

  const dueWords = getDueWords();
  const allWords = words.filter(w => !w.mastered);
  const masteredWords = words.filter(w => w.mastered);

  function startSession(wordList: VocabWord[]) {
    setDeck([...wordList].sort(() => Math.random() - 0.5));
    setIndex(0);
    setFlipped(false);
    setResults([]);
    setMode('studying');
  }

  function handleReview(quality: 0 | 1 | 2 | 3 | 4 | 5) {
    reviewWord(deck[index].id, quality);
    setResults(prev => [...prev, { word: deck[index].word, quality }]);
    addXP(3);
    if (index + 1 >= deck.length) {
      setMode('done');
    } else {
      setIndex(i => i + 1);
      setFlipped(false);
    }
  }

  const card = deck[index];
  const progress = deck.length > 0 ? ((index) / deck.length) * 100 : 0;

  if (mode === 'menu') {
    return (
      <div className="p-6 max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-extrabold" style={{ color: 'var(--text-primary)' }}>Flashcards</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>Spaced repetition with SM-2 algorithm</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="card p-4 text-center">
            <div className="text-2xl font-extrabold" style={{ color: '#F59E0B' }}>{dueWords.length}</div>
            <div className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>Due for review</div>
          </div>
          <div className="card p-4 text-center">
            <div className="text-2xl font-extrabold" style={{ color: '#0057B7' }}>{allWords.length}</div>
            <div className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>Active words</div>
          </div>
          <div className="card p-4 text-center">
            <div className="text-2xl font-extrabold" style={{ color: '#10B981' }}>{masteredWords.length}</div>
            <div className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>Mastered</div>
          </div>
        </div>

        {/* Start options */}
        <div className="space-y-3">
          <button
            className="card card-hover w-full p-5 flex items-center gap-4 text-left"
            onClick={() => dueWords.length > 0 && startSession(dueWords)}
            disabled={dueWords.length === 0}
            style={{ opacity: dueWords.length === 0 ? 0.5 : 1 }}
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
              style={{ background: '#FFFBEB' }}>⏰</div>
            <div>
              <div className="font-bold" style={{ color: 'var(--text-primary)' }}>Review Due Cards</div>
              <div className="text-sm" style={{ color: 'var(--text-muted)' }}>
                {dueWords.length > 0 ? `${dueWords.length} cards waiting for review` : 'No cards due — come back later!'}
              </div>
            </div>
            <ChevronRight size={20} className="ml-auto" style={{ color: 'var(--text-muted)' }} />
          </button>

          <button
            className="card card-hover w-full p-5 flex items-center gap-4 text-left"
            onClick={() => allWords.length > 0 && startSession(allWords.slice(0, 20))}
            disabled={allWords.length === 0}
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
              style={{ background: '#EFF6FF' }}>🎯</div>
            <div>
              <div className="font-bold" style={{ color: 'var(--text-primary)' }}>Practice All</div>
              <div className="text-sm" style={{ color: 'var(--text-muted)' }}>Study all active words (up to 20)</div>
            </div>
            <ChevronRight size={20} className="ml-auto" style={{ color: 'var(--text-muted)' }} />
          </button>

          {masteredWords.length > 0 && (
            <button
              className="card card-hover w-full p-5 flex items-center gap-4 text-left"
              onClick={() => startSession(masteredWords)}
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                style={{ background: '#ECFDF5' }}>⭐</div>
              <div>
                <div className="font-bold" style={{ color: 'var(--text-primary)' }}>Review Mastered</div>
                <div className="text-sm" style={{ color: 'var(--text-muted)' }}>Keep your mastered words fresh</div>
              </div>
              <ChevronRight size={20} className="ml-auto" style={{ color: 'var(--text-muted)' }} />
            </button>
          )}
        </div>

        {/* How it works */}
        <div className="card p-4" style={{ background: 'var(--bg-secondary)', border: 'none' }}>
          <p className="text-xs font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>How spaced repetition works:</p>
          <div className="grid grid-cols-3 gap-2">
            {[
              { icon: <X size={12} />, label: 'Hard', desc: 'Review soon', color: '#EF4444' },
              { icon: <Minus size={12} />, label: 'Okay', desc: 'Review in days', color: '#F59E0B' },
              { icon: <Check size={12} />, label: 'Easy', desc: 'Review in weeks', color: '#10B981' },
            ].map(({ icon, label, desc, color }) => (
              <div key={label} className="text-center p-2 rounded-lg" style={{ background: 'var(--bg-card)' }}>
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-white mx-auto mb-1"
                  style={{ background: color }}>
                  {icon}
                </div>
                <div className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>{label}</div>
                <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (mode === 'done') {
    const goodCount = results.filter(r => r.quality >= 4).length;
    const okCount = results.filter(r => r.quality >= 2 && r.quality < 4).length;
    const hardCount = results.filter(r => r.quality < 2).length;
    return (
      <div className="p-8 flex flex-col items-center justify-center text-center max-w-md mx-auto">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-2xl font-extrabold mb-1" style={{ color: 'var(--text-primary)' }}>Session Complete!</h2>
        <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>{results.length} cards reviewed</p>

        <div className="grid grid-cols-3 gap-3 w-full mb-6">
          <div className="card p-3 text-center">
            <div className="text-xl font-bold text-green-500">{goodCount}</div>
            <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Easy</div>
          </div>
          <div className="card p-3 text-center">
            <div className="text-xl font-bold text-yellow-500">{okCount}</div>
            <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Okay</div>
          </div>
          <div className="card p-3 text-center">
            <div className="text-xl font-bold text-red-500">{hardCount}</div>
            <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Hard</div>
          </div>
        </div>

        <div className="flex gap-3">
          <button className="btn btn-secondary" onClick={() => setMode('menu')}>
            <RotateCcw size={16} /> Back
          </button>
          <button className="btn btn-primary" onClick={() => startSession(deck)}>
            Study Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-lg mx-auto space-y-5">
      {/* Progress */}
      <div className="flex items-center gap-3">
        <div className="flex-1 progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <span className="text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>
          {index}/{deck.length}
        </span>
      </div>

      {/* Card */}
      {card && (
        <div
          className="flashcard-container cursor-pointer select-none"
          style={{ height: '280px' }}
          onClick={() => setFlipped(f => !f)}
        >
          <div className={`flashcard-inner ${flipped ? 'flipped' : ''}`} style={{ height: '280px' }}>
            {/* Front */}
            <div className="flashcard-face card w-full h-full flex flex-col items-center justify-center gap-4 p-6">
              <div className="badge badge-blue">{card.category}</div>
              <div className="text-4xl font-extrabold" style={{ color: '#0057B7' }}>{card.word}</div>
              {card.pronunciation && (
                <div className="text-sm font-mono" style={{ color: 'var(--text-muted)' }}>🔊 {card.pronunciation}</div>
              )}
              <button
                className="btn btn-ghost btn-sm"
                onClick={e => { e.stopPropagation(); ttsService.speak(card.word); }}
              >
                <Volume2 size={14} /> Hear it
              </button>
              <p className="text-xs mt-2" style={{ color: 'var(--text-muted)' }}>Tap to reveal</p>
            </div>

            {/* Back */}
            <div className="flashcard-back card w-full h-full flex flex-col items-center justify-center gap-3 p-6"
              style={{ background: '#0057B7' }}>
              <div className="badge" style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}>{card.level}</div>
              <div className="text-3xl font-extrabold text-white">{card.translation}</div>
              {card.exampleFinnish && (
                <div className="text-center">
                  <p className="text-sm text-blue-100 italic">"{card.exampleFinnish}"</p>
                  <p className="text-xs text-blue-200 mt-1">{card.exampleEnglish}</p>
                </div>
              )}
              {card.difficulty && (
                <div className="flex items-center gap-1.5">
                  <Star size={12} className="text-yellow-300" fill="#FDE68A" />
                  <span className="text-xs text-blue-100 capitalize">{card.difficulty}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Rating buttons (only when flipped) */}
      {flipped && (
        <div className="grid grid-cols-3 gap-3 animate-fade-in">
          <button
            className="btn btn-danger flex-col gap-1 py-3"
            onClick={() => handleReview(1)}
          >
            <X size={18} />
            <span className="text-xs">Hard</span>
          </button>
          <button
            className="btn flex-col gap-1 py-3"
            style={{ background: '#F59E0B', color: 'white' }}
            onClick={() => handleReview(3)}
          >
            <Minus size={18} />
            <span className="text-xs">Okay</span>
          </button>
          <button
            className="btn btn-success flex-col gap-1 py-3"
            onClick={() => handleReview(5)}
          >
            <Check size={18} />
            <span className="text-xs">Easy</span>
          </button>
        </div>
      )}

      <button className="btn btn-ghost btn-sm w-full" onClick={() => setMode('menu')}>
        End session
      </button>
    </div>
  );
}
