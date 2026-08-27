import { useProfileStore } from '../stores/profileStore';
import { useState, useMemo } from 'react';
import { useVocabStore } from '../stores/vocabStore';
import { useProgressStore } from '../stores/progressStore';
import { ttsService } from '../services/aiService';
import type { Level } from '../types';
import {
  Volume2, Plus, Trash2, Search,
  Star, CheckCircle2, BookOpen, AlertCircle
} from 'lucide-react';

type SortBy = 'word' | 'timesSeen' | 'difficulty' | 'nextReview';
type FilterMode = 'all' | 'due' | 'mastered' | 'weak';

export default function VocabularyPage() {
  const vocabActiveId = useProfileStore(s => s.activeProfileId);
  const words = useVocabStore(s => s.data[vocabActiveId]?.words || []);
  const {, addWord, removeWord, getDueWords, getMasteredWords, getWeakWords } = useVocabStore();
  const { updateVocabSize } = useProgressStore();
  const [search, setSearch] = useState('');
  const [filterMode, setFilterMode] = useState<FilterMode>('all');
  const [levelFilter, setLevelFilter] = useState<Level | 'all'>('all');
  const [sortBy, setSortBy] = useState<SortBy>('word');
  const [showAdd, setShowAdd] = useState(false);
  const [newWord, setNewWord] = useState({ word: '', translation: '', pronunciation: '', exampleFinnish: '', exampleEnglish: '', category: 'general', level: 'beginner' as Level });

  const filtered = useMemo(() => {
    let list = words;

    if (filterMode === 'due') list = getDueWords();
    else if (filterMode === 'mastered') list = getMasteredWords();
    else if (filterMode === 'weak') list = getWeakWords();

    if (levelFilter !== 'all') list = list.filter(w => w.level === levelFilter);
    if (search) list = list.filter(w =>
      w.word.toLowerCase().includes(search.toLowerCase()) ||
      w.translation.toLowerCase().includes(search.toLowerCase()) ||
      w.category.toLowerCase().includes(search.toLowerCase())
    );

    return [...list].sort((a, b) => {
      if (sortBy === 'word') return a.word.localeCompare(b.word);
      if (sortBy === 'timesSeen') return b.timesSeen - a.timesSeen;
      if (sortBy === 'difficulty') {
        const d = { easy: 0, medium: 1, hard: 2 };
        return d[b.difficulty] - d[a.difficulty];
      }
      if (sortBy === 'nextReview') return (a.nextReview || '').localeCompare(b.nextReview || '');
      return 0;
    });
  }, [words, filterMode, levelFilter, search, sortBy]);

  function handleAddWord() {
    if (!newWord.word || !newWord.translation) return;
    addWord({ ...newWord, difficulty: 'easy', nextReview: undefined, lastSeen: undefined, easeFactor: 2.5, interval: 1, repetitions: 0 });
    updateVocabSize(words.length + 1);
    setNewWord({ word: '', translation: '', pronunciation: '', exampleFinnish: '', exampleEnglish: '', category: 'general', level: 'beginner' });
    setShowAdd(false);
  }

  const dueCount = getDueWords().length;
  const masteredCount = getMasteredWords().length;
  const weakCount = getWeakWords().length;

  const DIFF_COLORS: Record<string, string> = { easy: '#10B981', medium: '#F59E0B', hard: '#EF4444' };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold" style={{ color: 'var(--text-primary)' }}>Vocabulary</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>{words.length} words in your bank</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowAdd(!showAdd)}>
          <Plus size={16} /> Add Word
        </button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: 'Total', value: words.length, icon: BookOpen, color: '#0057B7', mode: 'all' },
          { label: 'Due', value: dueCount, icon: AlertCircle, color: '#F59E0B', mode: 'due' },
          { label: 'Mastered', value: masteredCount, icon: CheckCircle2, color: '#10B981', mode: 'mastered' },
          { label: 'Struggling', value: weakCount, icon: Star, color: '#EF4444', mode: 'weak' },
        ].map(({ label, value, icon: Icon, color, mode }) => (
          <button
            key={mode}
            onClick={() => setFilterMode(mode as FilterMode)}
            className={`card card-hover p-3 text-center transition-all ${filterMode === mode ? 'ring-2 ring-offset-1 ring-blue-500' : ''}`}
          >
            <Icon size={18} style={{ color, margin: '0 auto 4px' }} />
            <div className="text-xl font-extrabold" style={{ color: 'var(--text-primary)' }}>{value}</div>
            <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{label}</div>
          </button>
        ))}
      </div>

      {/* Add Word Form */}
      {showAdd && (
        <div className="card p-5 space-y-3 animate-fade-in">
          <h3 className="font-bold" style={{ color: 'var(--text-primary)' }}>Add New Word</h3>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold mb-1 block" style={{ color: 'var(--text-muted)' }}>Finnish Word *</label>
              <input className="input" placeholder="e.g. koira" value={newWord.word} onChange={e => setNewWord(p => ({ ...p, word: e.target.value }))} />
            </div>
            <div>
              <label className="text-xs font-semibold mb-1 block" style={{ color: 'var(--text-muted)' }}>English Translation *</label>
              <input className="input" placeholder="e.g. dog" value={newWord.translation} onChange={e => setNewWord(p => ({ ...p, translation: e.target.value }))} />
            </div>
            <div>
              <label className="text-xs font-semibold mb-1 block" style={{ color: 'var(--text-muted)' }}>Pronunciation</label>
              <input className="input" placeholder="e.g. koi-ra" value={newWord.pronunciation} onChange={e => setNewWord(p => ({ ...p, pronunciation: e.target.value }))} />
            </div>
            <div>
              <label className="text-xs font-semibold mb-1 block" style={{ color: 'var(--text-muted)' }}>Category</label>
              <input className="input" placeholder="e.g. animals" value={newWord.category} onChange={e => setNewWord(p => ({ ...p, category: e.target.value }))} />
            </div>
            <div>
              <label className="text-xs font-semibold mb-1 block" style={{ color: 'var(--text-muted)' }}>Example (Finnish)</label>
              <input className="input" placeholder="Koira on iso." value={newWord.exampleFinnish} onChange={e => setNewWord(p => ({ ...p, exampleFinnish: e.target.value }))} />
            </div>
            <div>
              <label className="text-xs font-semibold mb-1 block" style={{ color: 'var(--text-muted)' }}>Example (English)</label>
              <input className="input" placeholder="The dog is big." value={newWord.exampleEnglish} onChange={e => setNewWord(p => ({ ...p, exampleEnglish: e.target.value }))} />
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold mb-1 block" style={{ color: 'var(--text-muted)' }}>Level</label>
            <select className="input select w-auto" value={newWord.level} onChange={e => setNewWord(p => ({ ...p, level: e.target.value as Level }))}>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
          <div className="flex gap-2">
            <button className="btn btn-primary" onClick={handleAddWord}>Add Word</button>
            <button className="btn btn-secondary" onClick={() => setShowAdd(false)}>Cancel</button>
          </div>
        </div>
      )}

      {/* Search & Sort */}
      <div className="flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-48">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
          <input
            className="input pl-8"
            placeholder="Search words..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <select className="input select w-auto" value={levelFilter} onChange={e => setLevelFilter(e.target.value as any)}>
          <option value="all">All Levels</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
        <select className="input select w-auto" value={sortBy} onChange={e => setSortBy(e.target.value as SortBy)}>
          <option value="word">Sort: A-Z</option>
          <option value="timesSeen">Sort: Most Seen</option>
          <option value="difficulty">Sort: Hardest</option>
          <option value="nextReview">Sort: Due Soon</option>
        </select>
      </div>

      <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{filtered.length} words shown</p>

      {/* Word list */}
      <div className="space-y-2">
        {filtered.map(word => (
          <div key={word.id} className="card card-hover p-4">
            <div className="flex items-start gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-base" style={{ color: '#0057B7' }}>{word.word}</span>
                  <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>— {word.translation}</span>
                  {word.mastered && <CheckCircle2 size={14} style={{ color: '#10B981' }} />}
                </div>
                {word.pronunciation && (
                  <p className="text-xs font-mono mt-0.5" style={{ color: 'var(--text-muted)' }}>🔊 {word.pronunciation}</p>
                )}
                {word.exampleFinnish && (
                  <p className="text-xs mt-1 italic" style={{ color: 'var(--text-muted)' }}>
                    "{word.exampleFinnish}" — {word.exampleEnglish}
                  </p>
                )}
                <div className="flex items-center gap-2 mt-1.5">
                  <span className={`badge level-${word.level} text-xs`}>{word.level}</span>
                  <span className="badge text-xs" style={{
                    background: DIFF_COLORS[word.difficulty] + '20',
                    color: DIFF_COLORS[word.difficulty]
                  }}>
                    {word.difficulty}
                  </span>
                  <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                    {word.category} · seen {word.timesSeen}×
                  </span>
                  {word.nextReview && (
                    <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                      · next: {word.nextReview}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex gap-1 shrink-0">
                <button className="btn btn-ghost btn-icon btn-sm" onClick={() => ttsService.speak(word.word)}>
                  <Volume2 size={14} style={{ color: '#0057B7' }} />
                </button>
                <button className="btn btn-ghost btn-icon btn-sm" onClick={() => removeWord(word.id)}>
                  <Trash2 size={14} style={{ color: '#EF4444' }} />
                </button>
              </div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-12" style={{ color: 'var(--text-muted)' }}>
            <BookOpen size={36} className="mx-auto mb-2 opacity-40" />
            <p className="text-sm">No words match your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
