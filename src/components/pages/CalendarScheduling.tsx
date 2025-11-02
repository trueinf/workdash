import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar, Clock, AlertCircle, CheckCircle, TrendingUp, Zap, 
  Users, Repeat, MessageSquare, Brain, ChevronRight, X, Edit3,
  Plus, Minus, Flame, Target, Handshake, Lightbulb, Coffee,
  BarChart3, ArrowRight, Settings, Mic, Check, ChevronDown,
  Building2, DollarSign, Briefcase, User, Play
} from 'lucide-react';

export function CalendarScheduling() {
  const [selectedMeeting, setSelectedMeeting] = useState<number | null>(1);
  const [showDecisionPanel, setShowDecisionPanel] = useState(true);
  const [autoSettings, setAutoSettings] = useState({
    autoRescheduleInternal: true,
    preserveStrategic: true,
    declineRedundant: false,
    requireExternalApproval: true,
  });

  const meetings = [
    { 
      id: 1, 
      time: '08:00–08:30', 
      title: 'Breakfast with CFO', 
      type: 'Strategic', 
      color: '#4F6BED',
      aiContext: 'Quarter-end margin forecast',
      necessity: 92,
      flags: []
    },
    { 
      id: 2, 
      time: '09:00–10:00', 
      title: 'NAR Brand Review', 
      type: 'Leadership', 
      color: '#4F6BED',
      aiContext: 'Cheerios marketing plan – high strategic weight',
      necessity: 88,
      flags: []
    },
    { 
      id: 3, 
      time: '10:00–10:30', 
      title: 'Retail Partner Sync (Walmart)', 
      type: 'Retail', 
      color: '#D13438',
      aiContext: 'Overlaps with Finance prep',
      necessity: 75,
      flags: ['overlap']
    },
    { 
      id: 4, 
      time: '11:00–11:45', 
      title: 'Pet Segment Innovation', 
      type: 'Innovation', 
      color: '#107C10',
      aiContext: 'Blue Buffalo packaging refresh',
      necessity: 82,
      flags: []
    },
    { 
      id: 5, 
      time: '12:00–13:00', 
      title: 'Working Lunch', 
      type: 'Focus', 
      color: '#605E5C',
      aiContext: 'AI suggests blocking 15 extra mins buffer',
      necessity: 65,
      flags: ['buffer']
    },
    { 
      id: 6, 
      time: '14:00–15:00', 
      title: 'Investor Call Prep', 
      type: 'Strategic', 
      color: '#4F6BED',
      aiContext: 'Linked to CEO email, auto-prioritized',
      necessity: 95,
      flags: []
    },
    { 
      id: 7, 
      time: '15:00–16:00', 
      title: 'Townhall Dry Run', 
      type: 'Operational', 
      color: '#8A8886',
      aiContext: 'Can shorten to 30 mins per AI analysis',
      necessity: 45,
      flags: ['low-roi']
    },
    { 
      id: 8, 
      time: '16:30–17:00', 
      title: 'Pet Ops Check-in', 
      type: 'Tactical', 
      color: '#8A8886',
      aiContext: 'Duplicate with earlier innovation review',
      necessity: 42,
      flags: ['duplicate']
    },
  ];

  const conflicts = [
    {
      id: 1,
      type: 'overlap',
      severity: 'high',
      title: 'Overlapping High-Value Meetings',
      subject: 'Retail Partner Sync – Walmart',
      conflict: 'Finance Forecast Prep (CFO)',
      time: 'Tue 10:00–10:30',
      priority: 'CFO session higher weight (finance close cycle)',
      suggestion: 'Move Retail Sync to Wednesday 09:00–09:30 (All attendees available)',
      confidence: 93,
      impact: 'High — affects external relationship',
      actions: ['Approve Reschedule', 'Decline', 'Propose New Slot']
    },
    {
      id: 2,
      type: 'duplicate',
      severity: 'medium',
      title: 'Duplication Detected',
      subject: 'Pet Ops Check-in',
      conflict: 'Pet Innovation Review (Earlier in day)',
      suggestion: 'Merge agenda items or cancel duplicate slot',
      confidence: 85,
      impact: 'Medium — internal efficiency',
      actions: ['Merge & Notify', 'Cancel Lower Priority']
    },
    {
      id: 3,
      type: 'low-roi',
      severity: 'low',
      title: 'Low ROI Meeting',
      subject: 'Townhall Dry Run',
      insight: 'Repetitive rehearsal; previous session covered 90% of content. Can reduce to 30 mins.',
      confidence: 88,
      timeSaved: '30 mins',
      actions: ['Shorten Duration', 'Keep as is']
    },
    {
      id: 4,
      type: 'opportunity',
      severity: 'info',
      title: 'Create Strategic Focus Block',
      observation: '3 back-to-back meetings before investor call. Add buffer to prep mentally.',
      suggestion: 'Auto-create "Strategic Focus" block 14:30–15:00',
      confidence: 92,
      actions: ['Add Focus Slot', 'Ignore']
    },
  ];

  const recommendations = [
    { meeting: 'Retail Partner Sync', issue: 'Conflict', action: 'Move to Wed 9 AM', confidence: 93 },
    { meeting: 'Pet Ops Check-in', issue: 'Duplicate', action: 'Merge / cancel', confidence: 85 },
    { meeting: 'Townhall Dry Run', issue: 'Long duration', action: 'Reduce to 30 mins', confidence: 88 },
    { meeting: 'Focus Block', issue: 'Add', action: '14:30–15:00', confidence: 92 },
  ];

  const weeklyFocus = [
    { category: 'Strategic', percent: 38, trend: 5, color: '#4F6BED', icon: Target },
    { category: 'Growth / Innovation', percent: 22, trend: 3, color: '#107C10', icon: Lightbulb },
    { category: 'Retail / Partners', percent: 16, trend: -2, color: '#FF8C00', icon: Handshake },
    { category: 'Admin / Internal', percent: 14, trend: -4, color: '#8A8886', icon: Briefcase },
    { category: 'Focus / Personal', percent: 10, trend: 2, color: '#605E5C', icon: Coffee },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return '#D13438';
      case 'medium': return '#FF8C00';
      case 'low': return '#FCE100';
      case 'info': return '#4F6BED';
      default: return '#8A8886';
    }
  };

  const getFlagIcon = (flag: string) => {
    switch (flag) {
      case 'overlap': return <Clock className="w-3.5 h-3.5" />;
      case 'low-roi': return <Zap className="w-3.5 h-3.5" />;
      case 'duplicate': return <Repeat className="w-3.5 h-3.5" />;
      case 'buffer': return <Brain className="w-3.5 h-3.5" />;
      default: return null;
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-background overflow-hidden">
      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left - Smart Calendar View */}
        <motion.div 
          className="w-[340px] bg-card border-r border-border flex-shrink-0 overflow-y-auto"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                <h2 className="text-foreground">Tuesday, Nov 5</h2>
              </div>
              <button 
                className="p-2 hover:bg-surface rounded-lg transition-colors"
                style={{ borderRadius: 'var(--radius-md)' }}
              >
                <ChevronDown className="w-4 h-4 text-text-secondary" />
              </button>
            </div>

            {/* Calendar Timeline */}
            <div className="space-y-2">
              {meetings.map((meeting, index) => (
                <motion.div
                  key={meeting.id}
                  onClick={() => {
                    setSelectedMeeting(meeting.id);
                    setShowDecisionPanel(true);
                  }}
                  className={`p-4 rounded-lg border-l-4 cursor-pointer transition-all ${
                    selectedMeeting === meeting.id ? 'bg-secondary' : 'bg-surface hover:bg-surface/80'
                  }`}
                  style={{ 
                    borderLeftColor: meeting.color,
                    borderRadius: 'var(--radius-md)',
                    transition: 'var(--transition-fast)'
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.2 }}
                  whileHover={{ x: 4 }}
                >
                  {/* Time */}
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-3.5 h-3.5 text-text-secondary" />
                    <span className="text-text-secondary" style={{ fontSize: 'var(--text-xs)' }}>
                      {meeting.time}
                    </span>
                    {meeting.flags.length > 0 && (
                      <div className="flex items-center gap-1 ml-auto">
                        {meeting.flags.map(flag => (
                          <div 
                            key={flag}
                            className="p-1 rounded"
                            style={{ 
                              backgroundColor: getSeverityColor(flag === 'overlap' ? 'high' : flag === 'duplicate' ? 'medium' : 'low') + '20',
                              color: getSeverityColor(flag === 'overlap' ? 'high' : flag === 'duplicate' ? 'medium' : 'low')
                            }}
                          >
                            {getFlagIcon(flag)}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Title */}
                  <h4 className="mb-2">{meeting.title}</h4>

                  {/* Type Badge */}
                  <div className="flex items-center gap-2 mb-2">
                    <span 
                      className="px-2 py-0.5 rounded-full"
                      style={{ 
                        backgroundColor: meeting.color + '20',
                        color: meeting.color,
                        fontSize: 'var(--text-xs)',
                        borderRadius: 'var(--radius-pill)'
                      }}
                    >
                      {meeting.type}
                    </span>
                  </div>

                  {/* AI Context */}
                  <p className="text-text-secondary mb-2" style={{ fontSize: 'var(--text-xs)' }}>
                    {meeting.aiContext}
                  </p>

                  {/* AI Necessity Score */}
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-background rounded-full h-1.5" style={{ borderRadius: 'var(--radius-pill)' }}>
                      <div 
                        className="h-1.5 rounded-full" 
                        style={{ 
                          width: `${meeting.necessity}%`,
                          backgroundColor: meeting.necessity > 70 ? '#107C10' : meeting.necessity > 50 ? '#FF8C00' : '#D13438',
                          borderRadius: 'var(--radius-pill)'
                        }} 
                      />
                    </div>
                    <span className="text-text-muted" style={{ fontSize: 'var(--text-xs)' }}>
                      {meeting.necessity}%
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Center - Conflict Resolution Board */}
        <div className="flex-1 flex flex-col overflow-hidden bg-background">
          {/* Header */}
          <div className="px-6 py-5 border-b border-border bg-card">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h2 className="mb-2">Conflict Resolution Board</h2>
                <p className="text-text-secondary" style={{ fontSize: 'var(--text-sm)' }}>
                  AI identified <span className="text-error">4 conflicts</span> and <span className="text-warning">2 low-impact meetings</span> this week.
                </p>
              </div>
              <button 
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2"
                style={{ borderRadius: 'var(--radius-md)' }}
              >
                <Zap className="w-4 h-4" />
                Auto-Optimize
              </button>
            </div>

            {/* Summary Banner */}
            <div 
              className="p-3 rounded-lg flex items-center gap-3"
              style={{ 
                backgroundColor: 'var(--primary)',
                opacity: 0.1,
                borderRadius: 'var(--radius-md)'
              }}
            >
              <Brain className="w-5 h-5 text-primary" />
              <div>
                <span className="text-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                  🧠 AI optimized <strong>3 hours</strong> this week.
                </span>
                <span className="text-text-secondary ml-2" style={{ fontSize: 'var(--text-sm)' }}>
                  Efficiency up <span className="text-success">+18%</span> vs last week.
                </span>
              </div>
            </div>
          </div>

          {/* Conflict Cards */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-4 max-w-4xl">
              {conflicts.map((conflict, index) => (
                <motion.div
                  key={conflict.id}
                  className="bg-card border border-border rounded-lg overflow-hidden"
                  style={{ 
                    borderRadius: 'var(--radius-lg)',
                    borderLeftWidth: '4px',
                    borderLeftColor: getSeverityColor(conflict.severity)
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.2 }}
                >
                  <div className="p-5">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {conflict.type === 'overlap' && <AlertCircle className="w-5 h-5 text-error" />}
                          {conflict.type === 'duplicate' && <Repeat className="w-5 h-5 text-warning" />}
                          {conflict.type === 'low-roi' && <Zap className="w-5 h-5 text-warning" />}
                          {conflict.type === 'opportunity' && <Lightbulb className="w-5 h-5 text-primary" />}
                          <h3>{conflict.title}</h3>
                        </div>
                        <p className="text-text-secondary" style={{ fontSize: 'var(--text-sm)' }}>
                          <strong>Subject:</strong> {conflict.subject}
                        </p>
                        {conflict.conflict && (
                          <p className="text-text-secondary mt-1" style={{ fontSize: 'var(--text-sm)' }}>
                            <strong>Conflict:</strong> {conflict.conflict}
                          </p>
                        )}
                        {conflict.time && (
                          <p className="text-text-secondary mt-1" style={{ fontSize: 'var(--text-sm)' }}>
                            <strong>Time:</strong> {conflict.time}
                          </p>
                        )}
                      </div>
                      <div 
                        className="px-3 py-1 rounded-full flex items-center gap-1"
                        style={{ 
                          backgroundColor: getSeverityColor(conflict.severity) + '20',
                          color: getSeverityColor(conflict.severity),
                          fontSize: 'var(--text-xs)',
                          borderRadius: 'var(--radius-pill)'
                        }}
                      >
                        <Brain className="w-3.5 h-3.5" />
                        {conflict.confidence}%
                      </div>
                    </div>

                    {/* AI Analysis */}
                    {conflict.priority && (
                      <div 
                        className="p-3 rounded-lg mb-4"
                        style={{ 
                          backgroundColor: 'var(--surface)',
                          borderRadius: 'var(--radius-md)'
                        }}
                      >
                        <p className="text-text-muted mb-1" style={{ fontSize: 'var(--text-xs)' }}>
                          AI Priority:
                        </p>
                        <p style={{ fontSize: 'var(--text-sm)' }}>{conflict.priority}</p>
                      </div>
                    )}

                    {conflict.insight && (
                      <div 
                        className="p-3 rounded-lg mb-4"
                        style={{ 
                          backgroundColor: 'var(--surface)',
                          borderRadius: 'var(--radius-md)'
                        }}
                      >
                        <p className="text-text-muted mb-1" style={{ fontSize: 'var(--text-xs)' }}>
                          AI Insight:
                        </p>
                        <p style={{ fontSize: 'var(--text-sm)' }}>{conflict.insight}</p>
                      </div>
                    )}

                    {conflict.observation && (
                      <div 
                        className="p-3 rounded-lg mb-4"
                        style={{ 
                          backgroundColor: 'var(--surface)',
                          borderRadius: 'var(--radius-md)'
                        }}
                      >
                        <p className="text-text-muted mb-1" style={{ fontSize: 'var(--text-xs)' }}>
                          AI Observation:
                        </p>
                        <p style={{ fontSize: 'var(--text-sm)' }}>{conflict.observation}</p>
                      </div>
                    )}

                    {/* Suggestion */}
                    {conflict.suggestion && (
                      <div 
                        className="p-3 rounded-lg mb-4 border border-primary/30"
                        style={{ 
                          backgroundColor: 'var(--primary)',
                          opacity: 0.05,
                          borderRadius: 'var(--radius-md)'
                        }}
                      >
                        <p className="text-text-muted mb-1" style={{ fontSize: 'var(--text-xs)' }}>
                          AI Suggestion:
                        </p>
                        <p className="text-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                          "{conflict.suggestion}"
                        </p>
                      </div>
                    )}

                    {/* Meta Info */}
                    <div className="flex items-center gap-4 mb-4 text-text-secondary" style={{ fontSize: 'var(--text-xs)' }}>
                      {conflict.impact && (
                        <div className="flex items-center gap-1">
                          <TrendingUp className="w-3.5 h-3.5" />
                          <span>Impact: {conflict.impact}</span>
                        </div>
                      )}
                      {conflict.timeSaved && (
                        <div className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          <span>Est. Time Saved: {conflict.timeSaved}</span>
                        </div>
                      )}
                    </div>

                    {/* Quick Actions */}
                    <div className="flex items-center gap-2 flex-wrap">
                      {conflict.actions.map((action, idx) => (
                        <button
                          key={action}
                          className={`px-4 py-2 rounded-lg transition-all ${
                            idx === 0 
                              ? 'bg-primary text-primary-foreground hover:opacity-90' 
                              : 'bg-surface text-foreground hover:bg-secondary'
                          }`}
                          style={{ 
                            fontSize: 'var(--text-sm)',
                            borderRadius: 'var(--radius-md)',
                            transition: 'var(--transition-fast)'
                          }}
                        >
                          {action}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Right - AI Decision Panel */}
        <AnimatePresence>
          {showDecisionPanel && (
            <motion.div
              className="w-[420px] bg-card border-l border-border flex-shrink-0 flex flex-col overflow-hidden"
              initial={{ x: 420, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 420, opacity: 0 }}
              transition={{ 
                type: 'tween',
                ease: [0.4, 0, 0.2, 1],
                duration: 0.3
              }}
            >
              {/* Panel Header */}
              <div className="px-6 py-4 border-b border-border bg-surface">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 min-w-0">
                    <h2 className="mb-1 pr-8">AI Decision Panel</h2>
                    <p className="text-text-secondary" style={{ fontSize: 'var(--text-sm)' }}>
                      AI recommends rescheduling 3 items and creating 1 focus block.
                    </p>
                  </div>
                  <button
                    onClick={() => setShowDecisionPanel(false)}
                    className="p-2 hover:bg-background rounded-lg transition-colors"
                    style={{ borderRadius: 'var(--radius-md)' }}
                  >
                    <X className="w-4 h-4 text-text-secondary" />
                  </button>
                </div>
              </div>

              {/* Panel Content */}
              <div className="flex-1 overflow-y-auto">
                <div className="p-6 space-y-6">
                  {/* Section 1 - Reasoning Dashboard */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <h3 className="mb-3 flex items-center gap-2">
                      <BarChart3 className="w-4 h-4 text-primary" />
                      Reasoning Dashboard
                    </h3>
                    <div 
                      className="p-4 rounded-lg"
                      style={{ 
                        backgroundColor: 'var(--surface)',
                        borderRadius: 'var(--radius-md)'
                      }}
                    >
                      <p className="text-text-muted mb-3" style={{ fontSize: 'var(--text-xs)' }}>
                        Top Conflict Drivers:
                      </p>
                      <div className="space-y-3">
                        {[
                          { label: 'Overlapping meetings', percent: 42, color: '#D13438' },
                          { label: 'Low-value repetitions', percent: 31, color: '#FF8C00' },
                          { label: 'Missing key decision-makers', percent: 17, color: '#4F6BED' },
                          { label: 'Misaligned time zones', percent: 10, color: '#8A8886' },
                        ].map((item) => (
                          <div key={item.label}>
                            <div className="flex items-center justify-between mb-1">
                              <span style={{ fontSize: 'var(--text-sm)' }}>{item.label}</span>
                              <span style={{ fontSize: 'var(--text-sm)' }}>{item.percent}%</span>
                            </div>
                            <div className="w-full bg-background rounded-full h-2" style={{ borderRadius: 'var(--radius-pill)' }}>
                              <div 
                                className="h-2 rounded-full" 
                                style={{ 
                                  width: `${item.percent}%`,
                                  backgroundColor: item.color,
                                  borderRadius: 'var(--radius-pill)'
                                }} 
                              />
                            </div>
                          </div>
                        ))}
                      </div>

                      <div 
                        className="mt-4 p-3 rounded-lg border-l-4"
                        style={{ 
                          backgroundColor: 'var(--background)',
                          borderLeftColor: '#4F6BED',
                          borderRadius: 'var(--radius-md)'
                        }}
                      >
                        <p className="text-text-muted mb-1" style={{ fontSize: 'var(--text-xs)' }}>
                          AI Justification:
                        </p>
                        <p style={{ fontSize: 'var(--text-sm)' }}>
                          "CFO meeting carries 2x higher impact score due to quarter-end proximity.
                          Based on previous 6 weeks' calendar learning, your top productivity window is between 9:30–11:30 AM."
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Section 2 - Recommendations Table */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h3 className="mb-3 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-success" />
                      Recommendations
                    </h3>
                    <div className="space-y-2">
                      {recommendations.map((rec, index) => (
                        <motion.div
                          key={index}
                          className="p-3 bg-surface rounded-lg flex items-center justify-between"
                          style={{ borderRadius: 'var(--radius-md)' }}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 + index * 0.05 }}
                        >
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span style={{ fontSize: 'var(--text-sm)' }}>{rec.meeting}</span>
                              <span 
                                className="px-2 py-0.5 rounded-full"
                                style={{ 
                                  backgroundColor: rec.issue === 'Conflict' ? '#D1343820' : rec.issue === 'Add' ? '#4F6BED20' : '#FF8C0020',
                                  color: rec.issue === 'Conflict' ? '#D13438' : rec.issue === 'Add' ? '#4F6BED' : '#FF8C00',
                                  fontSize: 'var(--text-xs)',
                                  borderRadius: 'var(--radius-pill)'
                                }}
                              >
                                {rec.issue}
                              </span>
                            </div>
                            <p className="text-text-secondary" style={{ fontSize: 'var(--text-xs)' }}>
                              {rec.action}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 ml-3">
                            <span className="text-text-muted" style={{ fontSize: 'var(--text-xs)' }}>
                              {rec.confidence}%
                            </span>
                            <button 
                              className="p-1.5 bg-primary text-primary-foreground rounded hover:opacity-90"
                              style={{ borderRadius: 'var(--radius-sm)' }}
                            >
                              <Check className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Section 3 - Timeline Preview */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <h3 className="mb-3 flex items-center gap-2">
                      <ArrowRight className="w-4 h-4 text-accent" />
                      Timeline Preview
                    </h3>
                    <div 
                      className="p-4 rounded-lg"
                      style={{ 
                        backgroundColor: 'var(--surface)',
                        borderRadius: 'var(--radius-md)'
                      }}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="text-center flex-1">
                          <p className="text-text-muted mb-1" style={{ fontSize: 'var(--text-xs)' }}>Before</p>
                          <p className="text-error">7.5 hrs</p>
                        </div>
                        <ArrowRight className="w-5 h-5 text-primary" />
                        <div className="text-center flex-1">
                          <p className="text-text-muted mb-1" style={{ fontSize: 'var(--text-xs)' }}>After</p>
                          <p className="text-success">5.5 hrs</p>
                        </div>
                      </div>

                      <div 
                        className="p-3 rounded-lg text-center"
                        style={{ 
                          backgroundColor: 'var(--primary)',
                          opacity: 0.1,
                          borderRadius: 'var(--radius-md)'
                        }}
                      >
                        <p className="text-primary">
                          <span style={{ fontSize: 'var(--text-lg)' }}>26%</span>
                          <span className="text-text-secondary ml-2" style={{ fontSize: 'var(--text-sm)' }}>
                            efficiency improvement
                          </span>
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Section 4 - AI Autonomy Controls */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <h3 className="mb-3 flex items-center gap-2">
                      <Settings className="w-4 h-4 text-text-muted" />
                      AI Autonomy Controls
                    </h3>
                    <div 
                      className="p-4 rounded-lg space-y-3"
                      style={{ 
                        backgroundColor: 'var(--surface)',
                        borderRadius: 'var(--radius-md)'
                      }}
                    >
                      {[
                        { key: 'autoRescheduleInternal', label: 'Auto-reschedule internal low-priority meetings' },
                        { key: 'preserveStrategic', label: 'Always preserve strategic blocks' },
                        { key: 'declineRedundant', label: 'Auto-decline redundant cross-function syncs' },
                        { key: 'requireExternalApproval', label: 'Require manual approval for external partner reschedules' },
                      ].map((setting) => (
                        <div key={setting.key} className="flex items-center justify-between">
                          <span style={{ fontSize: 'var(--text-sm)' }}>{setting.label}</span>
                          <button
                            onClick={() => setAutoSettings(prev => ({
                              ...prev,
                              [setting.key]: !prev[setting.key as keyof typeof autoSettings]
                            }))}
                            className={`w-11 h-6 rounded-full transition-colors relative ${
                              autoSettings[setting.key as keyof typeof autoSettings] 
                                ? 'bg-primary' 
                                : 'bg-background'
                            }`}
                            style={{ borderRadius: 'var(--radius-pill)' }}
                          >
                            <div 
                              className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                                autoSettings[setting.key as keyof typeof autoSettings]
                                  ? 'translate-x-6'
                                  : 'translate-x-1'
                              }`}
                              style={{ borderRadius: 'var(--radius-pill)' }}
                            />
                          </button>
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Section 5 - Voice Interaction */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <h3 className="mb-3 flex items-center gap-2">
                      <Mic className="w-4 h-4 text-primary" />
                      Voice Interaction
                    </h3>
                    <div 
                      className="p-4 rounded-lg border border-primary/30"
                      style={{ 
                        backgroundColor: 'var(--primary)',
                        opacity: 0.05,
                        borderRadius: 'var(--radius-md)'
                      }}
                    >
                      <div className="flex items-start gap-3 mb-4">
                        <Mic className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                        <p style={{ fontSize: 'var(--text-sm)' }}>
                          "Dana, I noticed two overlapping meetings with CFO and Walmart. Would you like me to move the retailer one?"
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button 
                          className="flex-1 bg-primary text-primary-foreground px-3 py-2 rounded-lg hover:opacity-90"
                          style={{ 
                            borderRadius: 'var(--radius-md)',
                            fontSize: 'var(--text-sm)'
                          }}
                        >
                          Yes, do it
                        </button>
                        <button 
                          className="px-3 py-2 bg-surface text-text-secondary rounded-lg hover:bg-background"
                          style={{ 
                            borderRadius: 'var(--radius-md)',
                            fontSize: 'var(--text-sm)'
                          }}
                        >
                          Ask later
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer - Weekly Focus Summary */}
      <motion.div 
        className="border-t border-border bg-card px-6 py-4"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.3 }}
      >
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h3 className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-primary" />
              Weekly Focus Summary
            </h3>
            <p className="text-text-secondary" style={{ fontSize: 'var(--text-xs)' }}>
              AI suggests moving one internal meeting to next week to achieve 40% strategic time goal.
            </p>
          </div>

          <div className="grid grid-cols-5 gap-4">
            {weeklyFocus.map((item, index) => (
              <motion.div
                key={item.category}
                className="bg-surface p-4 rounded-lg"
                style={{ borderRadius: 'var(--radius-md)' }}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.05, duration: 0.2 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <item.icon className="w-5 h-5" style={{ color: item.color }} />
                  <div className="flex items-center gap-1">
                    <span style={{ fontSize: 'var(--text-lg)', color: item.color }}>
                      {item.percent}%
                    </span>
                    <span 
                      className={`flex items-center ${item.trend > 0 ? 'text-success' : 'text-error'}`}
                      style={{ fontSize: 'var(--text-xs)' }}
                    >
                      {item.trend > 0 ? '▲' : '▼'} {Math.abs(item.trend)}%
                    </span>
                  </div>
                </div>
                <p className="text-text-secondary" style={{ fontSize: 'var(--text-xs)' }}>
                  {item.category}
                </p>
                <div className="mt-3 w-full bg-background rounded-full h-1.5" style={{ borderRadius: 'var(--radius-pill)' }}>
                  <div 
                    className="h-1.5 rounded-full" 
                    style={{ 
                      width: `${item.percent}%`,
                      backgroundColor: item.color,
                      borderRadius: 'var(--radius-pill)'
                    }} 
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
