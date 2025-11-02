import React, { useState } from 'react';
import { ChevronDown, LayoutDashboard, Bot, Settings, LogOut, User, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface TopNavProps {
  activeView: string;
  onNavigate: (view: string) => void;
  onLogout: () => void;
}

export function TopNav({ activeView, onNavigate, onLogout }: TopNavProps) {
  const [coreOpsOpen, setCoreOpsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const coreOperations = [
    { id: 'inbox-triage', label: 'Inbox Triage' },
    { id: 'calendar-scheduling', label: 'Calendar & Scheduling' },
    { id: 'meetings-summaries', label: 'Meetings & Summaries' },
    { id: 'tasks-followups', label: 'Tasks & Follow-ups' },
    { id: 'travel-expenses', label: 'Travel & Expenses' },
  ];

  return (
    <nav className="bg-background border-b border-border sticky top-0 z-50" style={{ boxShadow: 'var(--shadow-level2)' }}>
      <div className="max-w-[1600px] mx-auto px-6 h-16 flex items-center gap-1">
        {/* Logo/Brand */}
        <div className="flex items-center gap-3 mr-8">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary">
            <Bot className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-semibold text-foreground" style={{ fontSize: 'var(--text-lg)' }}>
            WorkDash
          </span>
        </div>

        {/* Navigation Items */}
        <div className="flex items-center gap-1 flex-1">
          {/* Core Operations Dropdown */}
          <div className="relative">
            <button
              onClick={() => setCoreOpsOpen(!coreOpsOpen)}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
                coreOperations.some(op => op.id === activeView)
                  ? 'bg-secondary text-primary'
                  : 'text-text-secondary hover:bg-surface hover:text-foreground'
              }`}
              style={{ 
                transition: 'var(--transition-fast)',
                fontSize: 'var(--text-base)',
                fontWeight: 'var(--font-weight-medium)'
              }}
            >
              Core Operations
              <ChevronDown className={`w-4 h-4 transition-transform ${coreOpsOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {coreOpsOpen && (
                <>
                  <motion.div 
                    className="fixed inset-0 z-10" 
                    onClick={() => setCoreOpsOpen(false)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  />
                  <motion.div 
                    className="absolute top-full left-0 mt-1 bg-popover border border-border rounded-lg overflow-hidden z-20"
                    style={{ 
                      boxShadow: 'var(--shadow-level3)',
                      minWidth: '240px'
                    }}
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ 
                      duration: 0.2,
                      ease: [0.4, 0, 0.2, 1]
                    }}
                  >
                    {coreOperations.map((operation, index) => (
                      <motion.button
                        key={operation.id}
                        onClick={() => {
                          onNavigate(operation.id);
                          setCoreOpsOpen(false);
                        }}
                        className={`w-full px-4 py-3 text-left transition-colors ${
                          activeView === operation.id
                            ? 'bg-secondary text-primary'
                            : 'text-text-secondary hover:bg-surface hover:text-foreground'
                        }`}
                        style={{ 
                          fontSize: 'var(--text-base)',
                          transition: 'var(--transition-fast)'
                        }}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ 
                          delay: index * 0.03,
                          duration: 0.15
                        }}
                        whileHover={{ x: 4 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {operation.label}
                      </motion.button>
                    ))}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Dashboard */}
          <button
            onClick={() => onNavigate('action-board')}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
              activeView === 'action-board'
                ? 'bg-secondary text-primary'
                : 'text-text-secondary hover:bg-surface hover:text-foreground'
            }`}
            style={{ 
              transition: 'var(--transition-fast)',
              fontSize: 'var(--text-base)',
              fontWeight: 'var(--font-weight-medium)'
            }}
          >
            <Sparkles className="w-4 h-4" />
            Action Board
          </button>

          {/* Dashboard */}
          <button
            onClick={() => onNavigate('dashboard')}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
              activeView === 'dashboard'
                ? 'bg-secondary text-primary'
                : 'text-text-secondary hover:bg-surface hover:text-foreground'
            }`}
            style={{ 
              transition: 'var(--transition-fast)',
              fontSize: 'var(--text-base)',
              fontWeight: 'var(--font-weight-medium)'
            }}
          >
            <LayoutDashboard className="w-4 h-4" />
            Dashboard
          </button>

          {/* AI Agents */}
          <button
            onClick={() => onNavigate('ai-agents')}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
              activeView === 'ai-agents'
                ? 'bg-secondary text-primary'
                : 'text-text-secondary hover:bg-surface hover:text-foreground'
            }`}
            style={{ 
              transition: 'var(--transition-fast)',
              fontSize: 'var(--text-base)',
              fontWeight: 'var(--font-weight-medium)'
            }}
          >
            <Bot className="w-4 h-4" />
            AI Agents
          </button>

          {/* Preferences */}
          <button
            onClick={() => onNavigate('preferences')}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
              activeView === 'preferences'
                ? 'bg-secondary text-primary'
                : 'text-text-secondary hover:bg-surface hover:text-foreground'
            }`}
            style={{ 
              transition: 'var(--transition-fast)',
              fontSize: 'var(--text-base)',
              fontWeight: 'var(--font-weight-medium)'
            }}
          >
            <Settings className="w-4 h-4" />
            Preferences
          </button>
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-2">
          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-surface transition-all"
              style={{ transition: 'var(--transition-fast)' }}
            >
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground" style={{ fontSize: 'var(--text-sm)' }}>DM</span>
              </div>
              <ChevronDown className={`w-4 h-4 text-text-secondary transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* User Dropdown Menu */}
            <AnimatePresence>
              {userMenuOpen && (
                <>
                  <motion.div 
                    className="fixed inset-0 z-10" 
                    onClick={() => setUserMenuOpen(false)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  />
                  <motion.div 
                    className="absolute top-full right-0 mt-1 bg-popover border border-border rounded-lg overflow-hidden z-20"
                    style={{ 
                      boxShadow: 'var(--shadow-level3)',
                      minWidth: '200px'
                    }}
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ 
                      duration: 0.2,
                      ease: [0.4, 0, 0.2, 1]
                    }}
                  >
                    {/* User Info */}
                    <div className="px-4 py-3 border-b border-border">
                      <p className="text-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                        Dana Martinez
                      </p>
                      <p className="text-text-muted" style={{ fontSize: 'var(--text-xs)' }}>
                        dana.martinez@generalmills.com
                      </p>
                    </div>

                    {/* Menu Items */}
                    <div className="py-1">
                      <button
                        onClick={() => {
                          onNavigate('preferences');
                          setUserMenuOpen(false);
                        }}
                        className="w-full px-4 py-2 text-left flex items-center gap-3 text-text-secondary hover:bg-surface hover:text-foreground transition-colors"
                        style={{ 
                          fontSize: 'var(--text-sm)',
                          transition: 'var(--transition-fast)'
                        }}
                      >
                        <User className="w-4 h-4" />
                        Profile Settings
                      </button>
                      <button
                        onClick={() => {
                          setUserMenuOpen(false);
                          onLogout();
                        }}
                        className="w-full px-4 py-2 text-left flex items-center gap-3 text-error hover:bg-surface transition-colors"
                        style={{ 
                          fontSize: 'var(--text-sm)',
                          transition: 'var(--transition-fast)'
                        }}
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </nav>
  );
}
