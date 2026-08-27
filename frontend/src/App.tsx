import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSettingsStore } from './stores/settingsStore';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import ChatTutor from './pages/ChatTutor';
import LessonsPage from './pages/LessonsPage';
import LessonDetail from './pages/LessonDetail';
import Flashcards from './pages/Flashcards';
import QuizPage from './pages/QuizPage';
import ConversationPage from './pages/ConversationPage';
import PronunciationPage from './pages/PronunciationPage';
import VocabularyPage from './pages/VocabularyPage';
import GrammarPage from './pages/GrammarPage';
import SettingsPage from './pages/SettingsPage';
import YkiPage from './pages/YkiPage';
import YkiSpeaking from './pages/yki/YkiSpeaking';
import YkiWriting from './pages/yki/YkiWriting';
import YkiReading from './pages/yki/YkiReading';
import YkiListening from './pages/yki/YkiListening';

export default function App() {
  const { darkMode } = useSettingsStore();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="chat" element={<ChatTutor />} />
          <Route path="lessons" element={<LessonsPage />} />
          <Route path="lessons/:id" element={<LessonDetail />} />
          <Route path="flashcards" element={<Flashcards />} />
          <Route path="quiz" element={<QuizPage />} />
          <Route path="conversation" element={<ConversationPage />} />
          <Route path="pronunciation" element={<PronunciationPage />} />
          <Route path="vocabulary" element={<VocabularyPage />} />
          <Route path="grammar" element={<GrammarPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="/yki" element={<YkiPage />} />
          <Route path="/yki/speaking" element={<YkiSpeaking />} />
          <Route path="/yki/writing" element={<YkiWriting />} />
          <Route path="/yki/reading" element={<YkiReading />} />
          <Route path="/yki/listening" element={<YkiListening />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
