import { useState } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { useSettingsStore } from '../stores/settingsStore';
import { useProgressStore } from '../stores/progressStore';
import {
  LayoutDashboard, MessageSquare, BookOpen, CreditCard,
  HelpCircle, Users, Mic, BookMarked, BarChart3, Settings,
  Sun, Moon, Menu, X, Zap, Flame, Globe2
} from 'lucide-react';

const NAV_ITEMS = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/chat', icon: MessageSquare, label: 'AI Tutor' },
  { to: '/lessons', icon: BookOpen, label: 'Lessons' },
  { to: '/flashcards', icon: CreditCard, label: 'Flashcards' },
  { to: '/quiz', icon: HelpCircle, label: 'Quiz' },
  { to: '/conversation', icon: Users, label: 'Conversation' },
  { to: '/pronunciation', icon: Mic, label: 'Pronunciation' },
  { to: '/vocabulary', icon: BookMarked, label: 'Vocabulary' },
  { to: '/grammar', icon: BarChart3, label: 'Grammar' },
  { to: '/settings', icon: Settings, label: 'Settings' },
];

export default function Layout() {
  const { darkMode, toggleDarkMode } = useSettingsStore();
  const { progress } = useProgressStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const currentPage = NAV_ITEMS.find(n =>
    n.to === '/' ? location.pathname === '/' : location.pathname.startsWith(n.to)
  );

  return (
    <div style={{ background: 'var(--bg-primary)', minHeight: '100vh', display: 'flex' }}>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-30 w-64 flex flex-col
        transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `} style={{ background: 'var(--bg-sidebar)', borderRight: '1px solid var(--border)' }}>

        {/* Logo */}
        <div className="flex items-center gap-3 p-5 border-b" style={{ borderColor: 'var(--border)' }}>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl gradient-finnish">
            🇫🇮
          </div>
          <div>
            <div className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>SuomiApp</div>
            <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Learn Finnish</div>
          </div>
          <button
            className="ml-auto btn btn-ghost btn-icon lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={18} />
          </button>
        </div>

        {/* XP / Streak Row */}
        <div className="flex items-center gap-3 px-4 py-3 mx-3 mt-3 rounded-xl" style={{ background: 'var(--bg-secondary)' }}>
          <div className="flex items-center gap-1.5">
            <Flame size={16} className="text-orange-500" />
            <span className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{progress.streak}</span>
            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>streak</span>
          </div>
          <div className="w-px h-4" style={{ background: 'var(--border)' }} />
          <div className="flex items-center gap-1.5">
            <Zap size={16} className="text-yellow-500" />
            <span className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{progress.totalXP}</span>
            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>XP</span>
          </div>
          <div className="w-px h-4" style={{ background: 'var(--border)' }} />
          <div className="flex items-center gap-1.5">
            <Globe2 size={14} style={{ color: 'var(--text-muted)' }} />
            <span className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>Lv{progress.level}</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-3 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              <Icon size={18} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Dark mode toggle */}
        <div className="p-3 border-t" style={{ borderColor: 'var(--border)' }}>
          <button
            onClick={toggleDarkMode}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 text-sm font-medium"
            style={{
              background: 'var(--bg-secondary)',
              color: 'var(--text-secondary)',
            }}
          >
            {darkMode ? <Sun size={16} /> : <Moon size={16} />}
            {darkMode ? 'Light Mode' : 'Dark Mode'}
            <div className="ml-auto w-10 h-5 rounded-full flex items-center transition-all duration-300"
              style={{ background: darkMode ? '#0057B7' : 'var(--border)', padding: '2px' }}>
              <div className={`w-4 h-4 rounded-full bg-white shadow transition-transform duration-300 ${darkMode ? 'translate-x-5' : 'translate-x-0'}`} />
            </div>
          </button>
        </div>
      </aside>

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile header */}
        <header className="lg:hidden flex items-center gap-3 px-4 py-3 border-b sticky top-0 z-10"
          style={{ background: 'var(--bg-sidebar)', borderColor: 'var(--border)' }}>
          <button className="btn btn-ghost btn-icon" onClick={() => setSidebarOpen(true)}>
            <Menu size={20} />
          </button>
          <span className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
            {currentPage?.label || 'SuomiApp'}
          </span>
          <div className="ml-auto flex items-center gap-2">
            <span className="xp-badge text-xs">⚡ {progress.totalXP}</span>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
