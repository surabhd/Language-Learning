import { useNavigate } from 'react-router-dom';
import { Mic, PenTool, BookOpen, Headphones } from 'lucide-react';

export default function YkiPage() {
  const navigate = useNavigate();

  const SKILLS = [
    {
      id: 'speaking',
      title: 'Speaking (Puhuminen)',
      description: 'Practice simulated YKI speaking scenarios with a timer and get AI evaluation.',
      icon: <Mic size={24} style={{ color: '#0057B7' }} />,
      route: '/yki/speaking',
      color: '#EFF6FF'
    },
    {
      id: 'writing',
      title: 'Writing (Kirjoittaminen)',
      description: 'Write formal emails, opinion pieces, and messages. Receive instant grammar and level feedback.',
      icon: <PenTool size={24} style={{ color: '#8B5CF6' }} />,
      route: '/yki/writing',
      color: '#F5F3FF'
    },
    {
      id: 'reading',
      title: 'Reading (Tekstin ymmärtäminen)',
      description: 'Read short texts, notices, and news articles, and answer comprehension questions.',
      icon: <BookOpen size={24} style={{ color: '#10B981' }} />,
      route: '/yki/reading',
      color: '#ECFDF5'
    },
    {
      id: 'listening',
      title: 'Listening (Puheen ymmärtäminen)',
      description: 'Listen to announcements and messages, then answer questions based on what you heard.',
      icon: <Headphones size={24} style={{ color: '#F59E0B' }} />,
      route: '/yki/listening',
      color: '#FFFBEB'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold mb-2" style={{ color: 'var(--text-primary)' }}>
          YKI Test Preparation
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>
          Practice for the Finnish National Certificate of Language Proficiency (YKI) Intermediate level (B1/B2).
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {SKILLS.map(skill => (
          <button
            key={skill.id}
            onClick={() => navigate(skill.route)}
            className="card card-hover p-6 text-left flex items-start gap-4 transition-all"
          >
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
              style={{ background: skill.color }}>
              {skill.icon}
            </div>
            <div>
              <h2 className="text-lg font-bold mb-1" style={{ color: 'var(--text-primary)' }}>{skill.title}</h2>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{skill.description}</p>
            </div>
          </button>
        ))}
      </div>
      
      <div className="card p-6 mt-8" style={{ background: 'var(--bg-secondary)' }}>
        <h3 className="font-bold mb-2" style={{ color: 'var(--text-primary)' }}>About the YKI Test</h3>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          The YKI test (keskitaso) measures your Finnish language skills at levels B1 and B2. Passing this test is one of the requirements for Finnish citizenship. The test consists of four parts, all completed on the same day. Our preparation module uses AI to simulate the actual test conditions and provide immediate feedback on your performance.
        </p>
      </div>
    </div>
  );
}
