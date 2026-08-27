import { useProfileStore } from '../stores/profileStore';
import { useNavigate } from 'react-router-dom';
import { useProgressStore } from '../stores/progressStore';
import { useVocabStore } from '../stores/vocabStore';
import { LESSONS } from '../data/lessons';
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell
} from 'recharts';
import {
  Flame, Zap, BookOpen, Target, Clock, Trophy,
  ArrowRight, Star, TrendingUp
} from 'lucide-react';

export default function Dashboard() {
  const activeId = useProfileStore(s => s.activeProfileId);
  const progress = useProgressStore(s => s.data[activeId] || s.data['default']);
  const { } = useProgressStore();
  const vocabActiveId = useProfileStore(s => s.activeProfileId);
  const words = useVocabStore(s => s.data[vocabActiveId]?.words || []);
  const { } = useVocabStore();
  const navigate = useNavigate();

  const masteredCount = words.filter(w => w.mastered).length;
  const weeklyData = [...(progress.weeklyActivity || [])]
    .slice(0, 7)
    .reverse()
    .map((d) => ({
      day: new Date(d.date).toLocaleDateString('en', { weekday: 'short' }),
      xp: d.xp,
      minutes: d.minutesPracticed,
    }));

  // Fill empty days
  while (weeklyData.length < 7) {
    weeklyData.unshift({ day: '-', xp: 0, minutes: 0 });
  }

  const quizAvg = progress.quizHistory.length > 0
    ? Math.round(progress.quizHistory.slice(0, 10).reduce((s, q) => s + q.score, 0) / Math.min(progress.quizHistory.length, 10))
    : 0;

  const completedLessons = progress.lessonsCompleted;
  const nextLessons = LESSONS.filter(l => !completedLessons.includes(l.id)).slice(0, 3);

  const statCards = [
    { label: 'Day Streak', value: progress.streak, icon: Flame, color: '#F97316', bg: '#FFF7ED' },
    { label: 'Total XP', value: progress.totalXP.toLocaleString(), icon: Zap, color: '#F59E0B', bg: '#FFFBEB' },
    { label: 'Lessons Done', value: completedLessons.length, icon: BookOpen, color: '#0057B7', bg: '#EFF6FF' },
    { label: 'Words Learned', value: words.length, icon: Star, color: '#8B5CF6', bg: '#F5F3FF' },
    { label: 'Words Mastered', value: masteredCount, icon: Trophy, color: '#10B981', bg: '#ECFDF5' },
    { label: 'Quiz Accuracy', value: `${quizAvg}%`, icon: Target, color: '#EF4444', bg: '#FEF2F2' },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {/* Hero greeting */}
      <div className="card p-6" style={{
        background: 'linear-gradient(135deg, #003580 0%, #0057B7 60%, #1a6fd4 100%)',
        border: 'none',
      }}>
        <div className="flex items-start justify-between">
          <div>
            <div className="text-white/70 text-sm font-medium mb-1">Good day, learner!</div>
            <h1 className="text-3xl font-extrabold text-white mb-2">
              Hyvää päivää! 🇫🇮
            </h1>
            <p className="text-blue-100 text-sm max-w-md">
              {progress.streak > 0
                ? `You're on a ${progress.streak}-day streak! Keep going — consistency is key to mastering Finnish.`
                : 'Start your Finnish journey today! Complete your first lesson to begin your streak.'}
            </p>
            <div className="mt-4 flex gap-3">
              <button className="btn" style={{ background: 'white', color: '#0057B7' }}
                onClick={() => navigate('/lessons')}>
                <BookOpen size={16} /> Continue Learning
              </button>
              <button className="btn" style={{ background: 'rgba(255,255,255,0.15)', color: 'white', border: '1px solid rgba(255,255,255,0.3)' }}
                onClick={() => navigate('/chat')}>
                <TrendingUp size={16} /> Practice with AI
              </button>
            </div>
          </div>
          <div className="hidden md:flex flex-col items-center gap-1">
            <div className="text-7xl">🎯</div>
            <div className="text-white/60 text-xs">Level {progress.level}</div>
          </div>
        </div>

        {/* XP Progress bar */}
        <div className="mt-5">
          <div className="flex justify-between text-xs text-blue-100 mb-1.5">
            <span>Level {progress.level}</span>
            <span>{progress.totalXP % 500} / 500 XP to next level</span>
          </div>
          <div className="h-2 rounded-full" style={{ background: 'rgba(255,255,255,0.2)' }}>
            <div
              className="h-2 rounded-full transition-all duration-700"
              style={{
                width: `${(progress.totalXP % 500) / 5}%`,
                background: 'linear-gradient(90deg, #FDE68A, #F59E0B)'
              }}
            />
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {statCards.map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className="card card-hover p-4">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-2.5"
              style={{ background: bg }}>
              <Icon size={18} style={{ color }} />
            </div>
            <div className="text-2xl font-extrabold" style={{ color: 'var(--text-primary)' }}>{value}</div>
            <div className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid md:grid-cols-2 gap-5">
        {/* Weekly XP Chart */}
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-base" style={{ color: 'var(--text-primary)' }}>Weekly XP</h2>
            <span className="badge badge-blue">Last 7 days</span>
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <AreaChart data={weeklyData}>
              <defs>
                <linearGradient id="xpGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0057B7" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#0057B7" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip
                contentStyle={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  fontSize: '12px',
                  color: 'var(--text-primary)'
                }}
              />
              <Area type="monotone" dataKey="xp" stroke="#0057B7" strokeWidth={2} fill="url(#xpGrad)" dot={{ fill: '#0057B7', r: 3 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Quiz history */}
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-base" style={{ color: 'var(--text-primary)' }}>Quiz Scores</h2>
            <span className="badge badge-green">Recent</span>
          </div>
          {progress.quizHistory.length > 0 ? (
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={progress.quizHistory.slice(0, 7).reverse()}>
                <XAxis dataKey="topic" tick={{ fontSize: 10, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
                <YAxis domain={[0, 100]} hide />
                <Tooltip
                  formatter={(v: any) => [`${v}%`, 'Score']}
                  contentStyle={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                    borderRadius: '8px',
                    fontSize: '12px',
                    color: 'var(--text-primary)'
                  }}
                />
                <Bar dataKey="score" radius={[4, 4, 0, 0]}>
                  {progress.quizHistory.slice(0, 7).map((entry, i) => (
                    <Cell key={i} fill={entry.score >= 80 ? '#10B981' : entry.score >= 60 ? '#F59E0B' : '#EF4444'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-40 flex flex-col items-center justify-center" style={{ color: 'var(--text-muted)' }}>
              <Target size={32} className="mb-2 opacity-40" />
              <p className="text-sm">Take your first quiz to see scores!</p>
              <button className="btn btn-primary btn-sm mt-3" onClick={() => navigate('/quiz')}>
                Start Quiz
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Continue learning */}
      <div className="card p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-base" style={{ color: 'var(--text-primary)' }}>Continue Learning</h2>
          <button className="btn btn-ghost btn-sm" onClick={() => navigate('/lessons')}>
            All lessons <ArrowRight size={14} />
          </button>
        </div>
        <div className="grid md:grid-cols-3 gap-3">
          {nextLessons.map(lesson => (
            <button
              key={lesson.id}
              onClick={() => navigate(`/lessons/${lesson.id}`)}
              className="card card-hover p-4 text-left transition-all"
            >
              <div className="flex items-start gap-3">
                <div className="text-3xl">{lesson.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm truncate" style={{ color: 'var(--text-primary)' }}>{lesson.title}</div>
                  <div className={`badge text-xs mt-1 level-${lesson.level}`}>{lesson.level}</div>
                  <div className="flex items-center gap-2 mt-2 text-xs" style={{ color: 'var(--text-muted)' }}>
                    <Clock size={12} />
                    <span>{lesson.duration} min</span>
                    <Zap size={12} />
                    <span>{lesson.xpReward} XP</span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'AI Tutor Chat', icon: '🤖', to: '/chat', color: '#0057B7', bg: '#EFF6FF' },
          { label: 'Flashcards', icon: '🃏', to: '/flashcards', color: '#8B5CF6', bg: '#F5F3FF' },
          { label: 'Conversation', icon: '💬', to: '/conversation', color: '#10B981', bg: '#ECFDF5' },
          { label: 'Pronunciation', icon: '🎙️', to: '/pronunciation', color: '#F59E0B', bg: '#FFFBEB' },
        ].map(({ label, icon, to, bg }) => (
          <button
            key={to}
            onClick={() => navigate(to)}
            className="card card-hover p-4 text-center flex flex-col items-center gap-2 transition-all"
          >
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
              style={{ background: bg }}>
              {icon}
            </div>
            <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
