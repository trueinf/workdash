import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TopNav } from './components/TopNav';
import { Dashboard } from './components/pages/Dashboard';
import { ActionBoard } from './components/pages/ActionBoard';
import { AIAgents } from './components/pages/AIAgents';
import { Preferences } from './components/pages/Preferences';
import { InboxTriage } from './components/pages/InboxTriage';
import { CalendarScheduling } from './components/pages/CalendarScheduling';
import { MeetingsSummaries } from './components/pages/MeetingsSummaries';
import { TasksFollowups } from './components/pages/TasksFollowups';
import { TravelExpenses } from './components/pages/TravelExpenses';
import { Login } from './components/pages/Login';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeView, setActiveView] = useState('action-board');

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setActiveView('action-board');
  };

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard />;
      case 'action-board':
        return <ActionBoard />;
      case 'ai-agents':
        return <AIAgents />;
      case 'preferences':
        return <Preferences />;
      case 'inbox-triage':
        return <InboxTriage />;
      case 'calendar-scheduling':
        return <CalendarScheduling />;
      case 'meetings-summaries':
        return <MeetingsSummaries />;
      case 'tasks-followups':
        return <TasksFollowups />;
      case 'travel-expenses':
        return <TravelExpenses />;
      default:
        return <Dashboard />;
    }
  };

  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20,
    },
    animate: {
      opacity: 1,
      y: 0,
    },
    exit: {
      opacity: 0,
      y: -20,
    },
  };

  const pageTransition = {
    type: 'tween',
    ease: [0.4, 0, 0.2, 1],
    duration: 0.3,
  };

  return (
    <div className="min-h-screen bg-background">
      <TopNav activeView={activeView} onNavigate={setActiveView} onLogout={handleLogout} />
      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeView}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
