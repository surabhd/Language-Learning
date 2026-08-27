import { useNavigate } from 'react-router-dom';
import { LESSONS } from '../data/lessons';
import { useProgressStore } from '../stores/progressStore';
import { BookOpen, Clock, Zap, CheckCircle2, Lock } from 'lucide-react';
import type { Level } from '../types';

const LEVELS: Level[] = ['beginner', 'intermediate', 'advanced'];
const LEVEL_INFO = {
  beginner: { label: 'Beginner', emoji: '🌱', desc: 'Start your Finnish journey', color: '#10B981', bg: '#ECFDF5' },
  intermediate: { label: 'Intermediate', emoji: '🌿', desc: 'Build on your foundation', color: '#F59E0B', bg: '#FFFBEB' },
  advanced: { label: 'Advanced', emoji: '🌳', desc: 'Master complex Finnish', color: '#EF4444', bg: '#FEF2F2' },
};

export default function LessonsPage() {
  const navigate = useNavigate();
  const { progress } = useProgressStore();

  const beginnerDone = LESSONS.filter(l => l.level === 'beginner' && progress.lessonsCompleted.includes(l.id)).length;
  const beginnerTotal = LESSONS.filter(l => l.level === 'beginner').length;

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold" style={{ color: 'var(--text-primary)' }}>Lessons</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
          {progress.lessonsCompleted.length} of {LESSONS.length} lessons completed
        </p>
      </div>

      {LEVELS.map(level => {
        const info = LEVEL_INFO[level];
        const levelLessons = LESSONS.filter(l => l.level === level);
        const levelDone = levelLessons.filter(l => progress.lessonsCompleted.includes(l.id)).length;
        const isLocked = level === 'intermediate' && beginnerDone < 3;
        const isAdvLocked = level === 'advanced' && beginnerDone < beginnerTotal;

        const locked = isLocked || isAdvLocked;

        return (
          <div key={level}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                style={{ background: info.bg }}>
                {info.emoji}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h2 className="font-bold" style={{ color: 'var(--text-primary)' }}>{info.label}</h2>
                  {locked && <Lock size={14} style={{ color: 'var(--text-muted)' }} />}
                </div>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{info.desc}</p>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold" style={{ color: info.color }}>
                  {levelDone}/{levelLessons.length}
                </div>
                <div className="text-xs" style={{ color: 'var(--text-muted)' }}>done</div>
              </div>
            </div>

            {/* Progress bar */}
            <div className="progress-bar mb-4">
              <div className="progress-fill" style={{ width: `${levelLessons.length > 0 ? (levelDone / levelLessons.length) * 100 : 0}%`, background: `linear-gradient(90deg, ${info.color}88, ${info.color})` }} />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              {levelLessons.map(lesson => {
                const done = progress.lessonsCompleted.includes(lesson.id);
                return (
                  <button
                    key={lesson.id}
                    onClick={() => !locked && navigate(`/lessons/${lesson.id}`)}
                    disabled={locked}
                    className={`card text-left p-4 transition-all ${!locked ? 'card-hover cursor-pointer' : 'opacity-50 cursor-not-allowed'}`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="text-3xl">{lesson.icon}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm truncate" style={{ color: 'var(--text-primary)' }}>
                            {lesson.title}
                          </span>
                          {done && <CheckCircle2 size={14} style={{ color: '#10B981' }} />}
                        </div>
                        <div className="flex items-center gap-3 mt-2 text-xs" style={{ color: 'var(--text-muted)' }}>
                          <span className="flex items-center gap-1"><Clock size={11} />{lesson.duration}m</span>
                          <span className="flex items-center gap-1"><Zap size={11} />{lesson.xpReward} XP</span>
                          <span className="flex items-center gap-1"><BookOpen size={11} />{lesson.exercises.length} exercises</span>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {locked && (
              <div className="mt-3 p-3 rounded-xl text-sm flex items-center gap-2"
                style={{ background: 'var(--bg-secondary)', color: 'var(--text-muted)' }}>
                <Lock size={14} />
                {isLocked
                  ? `Complete at least 3 beginner lessons to unlock intermediate (${beginnerDone}/3)`
                  : `Complete all beginner lessons to unlock advanced (${beginnerDone}/${beginnerTotal})`}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
