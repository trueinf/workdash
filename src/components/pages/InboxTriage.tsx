import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Mail, Star, Archive, Trash2, Tag, Clock, User, ChevronRight,
  Flame, Brain, Handshake, Lightbulb, FileCheck, Plane, Paperclip,
  Coffee, TrendingUp, AlertCircle, CheckCircle, ThumbsUp, Mic,
  Send, Edit3, X, Calendar, Zap, BarChart3, Building2, Activity
} from 'lucide-react';

export function InboxTriage() {
  const [selectedCategory, setSelectedCategory] = useState('priority-now');
  const [selectedEmail, setSelectedEmail] = useState<number | null>(1);
  const [showAIPanel, setShowAIPanel] = useState(true);

  const smartFolders = [
    { id: 'priority-now', label: 'Priority Now', count: 5, icon: Flame, color: '#D13438' },
    { id: 'strategic', label: 'Strategic Updates', count: 8, icon: Brain, color: '#4F6BED' },
    { id: 'retail-partner', label: 'Retail / Partner', count: 6, icon: Handshake, color: '#886CE4' },
    { id: 'brand-reports', label: 'Brand Reports', count: 4, icon: Lightbulb, color: '#FFAA44' },
    { id: 'approvals', label: 'Approvals & Reviews', count: 3, icon: FileCheck, color: '#107C10' },
    { id: 'travel', label: 'Travel / Logistics', count: 2, icon: Plane, color: '#605E5C' },
    { id: 'attachments', label: 'Attachments', count: 7, icon: Paperclip, color: '#8A8886' },
    { id: 'low-priority', label: 'Low Priority / FYI', count: 10, icon: Coffee, color: '#8A8886' },
  ];

  const emails = [
    {
      id: 1,
      from: "CEO's Office (Jeff Harmening)",
      subject: "Pet Growth Strategy – Prep for Investor Call",
      time: "8:42 AM",
      aiSummary: "Review consolidated growth projections before investor call at 3 PM. Blue Buffalo forecast up +5% YoY; Cheerios flat.",
      priority: "Critical — High Business Impact",
      confidence: 94,
      badges: ['VIP', 'Investor', 'High Priority'],
      tone: 'Neutral–Analytical',
      sentiment: 'neutral',
      category: 'priority-now',
      quickActions: ['View AI Summary', 'Approve Deck', 'Add to Calendar Prep', 'Send Acknowledgment']
    },
    {
      id: 2,
      from: "Blue Buffalo Brand GM",
      subject: "Creative Brief: Fall Campaign – Final Review",
      time: "8:10 AM",
      aiSummary: "Final creative review required. Includes new 'Puppy Care' positioning. Budget $2.1M — within approved limits.",
      priority: "High Priority",
      confidence: 89,
      badges: ['Brand', 'Budget Approved', 'Creative'],
      tone: 'Positive',
      sentiment: 'positive',
      category: 'priority-now',
      quickActions: ['Approve', 'Send Comment', 'Flag for Review Later']
    },
    {
      id: 3,
      from: "Walmart Category Buyer (Cereal)",
      subject: "Price elasticity conversation – Category pressure points",
      time: "7:30 AM",
      aiSummary: "Concerns raised on Chex Mix promo margin; open to renegotiation by next week.",
      priority: "Urgent (External partner sentiment shift)",
      confidence: 91,
      badges: ['Retail', 'Negotiation', 'Risk Detected'],
      tone: 'Cautious–Negative',
      sentiment: 'negative',
      category: 'retail-partner',
      quickActions: ['Draft Reply', 'Create Task', 'Propose Meeting']
    },
    {
      id: 4,
      from: "Marketing Analytics",
      subject: "NAR Campaign ROI snapshot – Q1",
      time: "6:50 AM",
      aiSummary: "Nature Valley top ROI (+14%), Annie's underperforming due to media spend inefficiency.",
      priority: "Medium Priority",
      confidence: 87,
      badges: ['Analytics', 'Insight', 'Brand Performance'],
      tone: 'Analytical',
      sentiment: 'neutral',
      category: 'brand-reports',
      quickActions: ['Generate Insight Brief', 'Share with CFO', 'Flag']
    },
    {
      id: 5,
      from: "Pet Ops Team",
      subject: "Blue Buffalo factory line maintenance – Schedule adjustment",
      time: "6:15 AM",
      aiSummary: "Minor shift in production; no delay expected. Inventory buffer sufficient.",
      priority: "Low Priority",
      confidence: 82,
      badges: ['Operations', 'Update', 'Pet'],
      tone: 'Informational',
      sentiment: 'neutral',
      category: 'low-priority',
      quickActions: ['Mark Monitored', 'Archive']
    },
  ];

  const selectedEmailData = emails.find(e => e.id === selectedEmail);

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return '#107C10';
      case 'negative': return '#D13438';
      default: return '#8A8886';
    }
  };

  return (
    <div className="flex h-[calc(100vh-64px)] bg-background overflow-hidden">
      {/* Left Sidebar - Smart Folders */}
      <motion.div 
        className="w-64 bg-card border-r border-border flex-shrink-0 overflow-y-auto"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="p-4">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Mail className="w-5 h-5 text-primary" />
              <h2 className="text-foreground">Inbox Triage</h2>
            </div>
          </div>

          <nav className="space-y-1">
            {smartFolders.map((folder) => (
              <motion.button
                key={folder.id}
                onClick={() => setSelectedCategory(folder.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all ${
                  selectedCategory === folder.id
                    ? 'bg-secondary text-primary'
                    : 'text-text-secondary hover:bg-surface hover:text-foreground'
                }`}
                style={{ 
                  borderRadius: 'var(--radius-md)',
                  transition: 'var(--transition-fast)'
                }}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center gap-2.5">
                  <folder.icon 
                    className="w-4 h-4" 
                    style={{ color: selectedCategory === folder.id ? folder.color : 'currentColor' }} 
                  />
                  <span style={{ fontSize: 'var(--text-sm)' }}>{folder.label}</span>
                </div>
                <span 
                  className="px-2 py-0.5 rounded-full"
                  style={{ 
                    fontSize: 'var(--text-xs)',
                    backgroundColor: selectedCategory === folder.id ? folder.color + '20' : 'var(--surface)',
                    color: selectedCategory === folder.id ? folder.color : 'var(--text-muted)',
                    borderRadius: 'var(--radius-pill)'
                  }}
                >
                  {folder.count}
                </span>
              </motion.button>
            ))}
          </nav>
        </div>
      </motion.div>

      {/* Center - Email Feed */}
      <div className="flex-1 flex flex-col overflow-hidden bg-background">
        {/* Toolbar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-card">
          <div className="flex items-center gap-2">
            <button 
              className="p-2 hover:bg-surface rounded-lg transition-colors"
              style={{ borderRadius: 'var(--radius-md)' }}
              title="Star"
            >
              <Star className="w-4 h-4 text-text-secondary" />
            </button>
            <button 
              className="p-2 hover:bg-surface rounded-lg transition-colors"
              style={{ borderRadius: 'var(--radius-md)' }}
              title="Archive"
            >
              <Archive className="w-4 h-4 text-text-secondary" />
            </button>
            <button 
              className="p-2 hover:bg-surface rounded-lg transition-colors"
              style={{ borderRadius: 'var(--radius-md)' }}
              title="Delete"
            >
              <Trash2 className="w-4 h-4 text-text-secondary" />
            </button>
            <button 
              className="p-2 hover:bg-surface rounded-lg transition-colors"
              style={{ borderRadius: 'var(--radius-md)' }}
              title="Tag"
            >
              <Tag className="w-4 h-4 text-text-secondary" />
            </button>
          </div>
          <span className="text-text-secondary" style={{ fontSize: 'var(--text-sm)' }}>
            {emails.filter(e => e.category === selectedCategory).length} messages
          </span>
        </div>

        {/* Email List */}
        <div className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {emails
                .filter(email => email.category === selectedCategory)
                .map((email, index) => (
                  <motion.div
                    key={email.id}
                    onClick={() => {
                      setSelectedEmail(email.id);
                      setShowAIPanel(true);
                    }}
                    className={`border-b border-border cursor-pointer transition-all ${
                      selectedEmail === email.id ? 'bg-secondary' : 'hover:bg-surface'
                    }`}
                    style={{ transition: 'var(--transition-fast)' }}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.2 }}
                    whileHover={{ x: 4 }}
                  >
                    <div className="px-6 py-4">
                      {/* Email Header */}
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <div 
                            className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                            style={{ 
                              backgroundColor: 'var(--primary)',
                              opacity: 0.1
                            }}
                          >
                            <User className="w-5 h-5 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-semibold truncate">{email.from}</span>
                              {email.badges.slice(0, 2).map((badge) => (
                                <span
                                  key={badge}
                                  className="px-2 py-0.5 bg-primary/10 text-primary rounded-full flex-shrink-0"
                                  style={{ 
                                    fontSize: 'var(--text-xs)',
                                    borderRadius: 'var(--radius-pill)'
                                  }}
                                >
                                  {badge}
                                </span>
                              ))}
                            </div>
                            <div className="text-text-secondary flex items-center gap-2" style={{ fontSize: 'var(--text-sm)' }}>
                              <Clock className="w-3.5 h-3.5" />
                              {email.time}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Subject */}
                      <h3 className="mb-2">{email.subject}</h3>

                      {/* AI Summary */}
                      <div 
                        className="p-3 rounded-lg mb-3 border border-primary/20"
                        style={{ 
                          backgroundColor: 'var(--primary)',
                          opacity: 0.05,
                          borderRadius: 'var(--radius-md)'
                        }}
                      >
                        <div className="flex items-start gap-2">
                          <Zap className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                          <div>
                            <div className="text-text-muted mb-1" style={{ fontSize: 'var(--text-xs)' }}>
                              AI Context Summary
                            </div>
                            <p className="text-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                              {email.aiSummary}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Priority & Confidence */}
                      <div className="flex items-center gap-4 mb-3">
                        <div className="flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 text-error" />
                          <span className="text-text-secondary" style={{ fontSize: 'var(--text-sm)' }}>
                            {email.priority}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            <Brain className="w-4 h-4 text-primary" />
                            <span className="text-text-secondary" style={{ fontSize: 'var(--text-sm)' }}>
                              AI Confidence: {email.confidence}%
                            </span>
                          </div>
                        </div>
                        <div 
                          className="px-2 py-1 rounded"
                          style={{ 
                            backgroundColor: getSentimentColor(email.sentiment) + '15',
                            color: getSentimentColor(email.sentiment),
                            fontSize: 'var(--text-xs)',
                            borderRadius: 'var(--radius-sm)'
                          }}
                        >
                          {email.tone}
                        </div>
                      </div>

                      {/* Quick Actions */}
                      <div className="flex items-center gap-2 flex-wrap">
                        {email.quickActions.slice(0, 3).map((action) => (
                          <button
                            key={action}
                            onClick={(e) => e.stopPropagation()}
                            className="px-3 py-1.5 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
                            style={{ 
                              fontSize: 'var(--text-xs)',
                              borderRadius: 'var(--radius-md)',
                              transition: 'var(--transition-fast)'
                            }}
                          >
                            {action}
                          </button>
                        ))}
                        {email.quickActions.length > 3 && (
                          <button
                            onClick={(e) => e.stopPropagation()}
                            className="px-3 py-1.5 text-text-secondary hover:text-foreground transition-colors"
                            style={{ fontSize: 'var(--text-xs)' }}
                          >
                            +{email.quickActions.length - 3} more
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Right Panel - AI Insights */}
      <AnimatePresence>
        {showAIPanel && selectedEmailData && (
          <motion.div
            className="w-[480px] bg-card border-l border-border flex-shrink-0 flex flex-col overflow-hidden"
            initial={{ x: 480, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 480, opacity: 0 }}
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
                  <h2 className="mb-1 pr-8">{selectedEmailData.subject}</h2>
                  <p className="text-text-secondary" style={{ fontSize: 'var(--text-sm)' }}>
                    {selectedEmailData.from}
                  </p>
                </div>
                <button
                  onClick={() => setShowAIPanel(false)}
                  className="p-2 hover:bg-background rounded-lg transition-colors"
                  style={{ borderRadius: 'var(--radius-md)' }}
                >
                  <X className="w-4 h-4 text-text-secondary" />
                </button>
              </div>
              <div className="flex items-center gap-3 text-text-secondary" style={{ fontSize: 'var(--text-sm)' }}>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {selectedEmailData.time}
                </div>
                <div className="flex items-center gap-1">
                  <Brain className="w-4 h-4 text-primary" />
                  AI Confidence: {selectedEmailData.confidence}%
                </div>
              </div>
            </div>

            {/* Panel Content */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-6 space-y-6">
                {/* Section 1 - AI Summary */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <h3 className="mb-3 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-primary" />
                    AI Summary
                  </h3>
                  <div 
                    className="p-4 rounded-lg border border-primary/20"
                    style={{ 
                      backgroundColor: 'var(--surface)',
                      borderRadius: 'var(--radius-md)'
                    }}
                  >
                    <p className="mb-4" style={{ fontSize: 'var(--text-sm)' }}>
                      "This thread contains Q1–Q3 growth data for Pet and Retail segments.
                      Blue Buffalo +5% YoY, Cheerios flat, Annie's -2%.
                      Investor call prep required for the 3 PM session."
                    </p>
                    
                    <div className="space-y-2">
                      <div>
                        <span className="text-text-muted" style={{ fontSize: 'var(--text-xs)' }}>
                          Tone Analysis:
                        </span>
                        <p style={{ fontSize: 'var(--text-sm)' }}>Formal and analytical</p>
                      </div>
                      <div>
                        <span className="text-text-muted" style={{ fontSize: 'var(--text-xs)' }}>
                          Sentiment:
                        </span>
                        <p style={{ fontSize: 'var(--text-sm)' }}>Neutral → Action required</p>
                      </div>
                      <div>
                        <span className="text-text-muted" style={{ fontSize: 'var(--text-xs)' }}>
                          Emotion Heatmap:
                        </span>
                        <div className="flex gap-2 mt-2">
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <span style={{ fontSize: 'var(--text-xs)' }}>Data-driven</span>
                              <span style={{ fontSize: 'var(--text-xs)' }}>80%</span>
                            </div>
                            <div className="w-full bg-background rounded-full h-1.5" style={{ borderRadius: 'var(--radius-pill)' }}>
                              <div className="bg-primary h-1.5 rounded-full" style={{ width: '80%', borderRadius: 'var(--radius-pill)' }} />
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2 mt-2">
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <span style={{ fontSize: 'var(--text-xs)' }}>Urgency</span>
                              <span style={{ fontSize: 'var(--text-xs)' }}>15%</span>
                            </div>
                            <div className="w-full bg-background rounded-full h-1.5" style={{ borderRadius: 'var(--radius-pill)' }}>
                              <div className="bg-warning h-1.5 rounded-full" style={{ width: '15%', borderRadius: 'var(--radius-pill)' }} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Section 2 - Reasoning */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h3 className="mb-3 flex items-center gap-2">
                    <Brain className="w-4 h-4 text-accent" />
                    Reasoning
                  </h3>
                  <div 
                    className="p-4 rounded-lg"
                    style={{ 
                      backgroundColor: 'var(--surface)',
                      borderRadius: 'var(--radius-md)'
                    }}
                  >
                    <p className="mb-4" style={{ fontSize: 'var(--text-sm)' }}>
                      "Prioritized due to external visibility (Investor Relations) and leadership source (CEO).
                      Meeting scheduled within 6 hours. High strategic relevance."
                    </p>
                    
                    <div className="space-y-3">
                      <div className="text-text-muted" style={{ fontSize: 'var(--text-xs)' }}>
                        Causal Graph:
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <ChevronRight className="w-4 h-4 text-primary" />
                          <span style={{ fontSize: 'var(--text-sm)' }}>Trigger: Upcoming investor event</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <ChevronRight className="w-4 h-4 text-primary" />
                          <span style={{ fontSize: 'var(--text-sm)' }}>Entity: Pet segment → Blue Buffalo → Growth forecast</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <ChevronRight className="w-4 h-4 text-primary" />
                          <span style={{ fontSize: 'var(--text-sm)' }}>Impact: Investor perception → Shareholder confidence</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Section 3 - AI Recommendations */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h3 className="mb-3 flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-warning" />
                    AI Recommendations
                  </h3>
                  <div className="space-y-3">
                    <div 
                      className="p-4 rounded-lg border-l-4"
                      style={{ 
                        backgroundColor: 'var(--surface)',
                        borderRadius: 'var(--radius-md)',
                        borderLeftColor: '#107C10'
                      }}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-success" />
                          <span style={{ fontSize: 'var(--text-sm)' }}>Immediate</span>
                        </div>
                        <button 
                          className="px-3 py-1 bg-success text-white rounded-lg hover:opacity-90"
                          style={{ 
                            fontSize: 'var(--text-xs)',
                            borderRadius: 'var(--radius-md)'
                          }}
                        >
                          Approve Now
                        </button>
                      </div>
                      <p className="text-text-secondary" style={{ fontSize: 'var(--text-sm)' }}>
                        Approve and share investor brief with Comms
                      </p>
                    </div>

                    <div 
                      className="p-4 rounded-lg border-l-4"
                      style={{ 
                        backgroundColor: 'var(--surface)',
                        borderRadius: 'var(--radius-md)',
                        borderLeftColor: '#4F6BED'
                      }}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-primary" />
                          <span style={{ fontSize: 'var(--text-sm)' }}>Schedule</span>
                        </div>
                        <button 
                          className="px-3 py-1 bg-primary text-primary-foreground rounded-lg hover:opacity-90"
                          style={{ 
                            fontSize: 'var(--text-xs)',
                            borderRadius: 'var(--radius-md)'
                          }}
                        >
                          Add to Calendar
                        </button>
                      </div>
                      <p className="text-text-secondary" style={{ fontSize: 'var(--text-sm)' }}>
                        Add 15-min prep slot at 2:30 PM
                      </p>
                    </div>

                    <div 
                      className="p-4 rounded-lg border-l-4"
                      style={{ 
                        backgroundColor: 'var(--surface)',
                        borderRadius: 'var(--radius-md)',
                        borderLeftColor: '#886CE4'
                      }}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <BarChart3 className="w-4 h-4 text-accent" />
                          <span style={{ fontSize: 'var(--text-sm)' }}>Insight</span>
                        </div>
                        <button 
                          className="px-3 py-1 bg-accent text-white rounded-lg hover:opacity-90"
                          style={{ 
                            fontSize: 'var(--text-xs)',
                            borderRadius: 'var(--radius-md)'
                          }}
                        >
                          Generate Summary
                        </button>
                      </div>
                      <p className="text-text-secondary" style={{ fontSize: 'var(--text-sm)' }}>
                        Summarize brand metrics for Pet division
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Section 4 - AI Autonomy Log */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <h3 className="mb-3 flex items-center gap-2">
                    <Activity className="w-4 h-4 text-text-muted" />
                    AI Autonomy Log
                  </h3>
                  <div 
                    className="p-4 rounded-lg"
                    style={{ 
                      backgroundColor: 'var(--surface)',
                      borderRadius: 'var(--radius-md)'
                    }}
                  >
                    <div className="mb-4">
                      <div className="text-text-muted mb-2" style={{ fontSize: 'var(--text-xs)' }}>
                        Action History:
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-text-secondary" style={{ fontSize: 'var(--text-sm)' }}>
                          <div className="w-1.5 h-1.5 rounded-full bg-success"></div>
                          <span>08:41 → Classified as Investor Priority</span>
                        </div>
                        <div className="flex items-center gap-2 text-text-secondary" style={{ fontSize: 'var(--text-sm)' }}>
                          <div className="w-1.5 h-1.5 rounded-full bg-success"></div>
                          <span>08:42 → Cross-referenced Blue Buffalo Q3 data</span>
                        </div>
                        <div className="flex items-center gap-2 text-text-secondary" style={{ fontSize: 'var(--text-sm)' }}>
                          <div className="w-1.5 h-1.5 rounded-full bg-success"></div>
                          <span>08:43 → Generated contextual summary</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="text-text-muted mb-3" style={{ fontSize: 'var(--text-xs)' }}>
                        Confidence Breakdown:
                      </div>
                      <div className="space-y-2">
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span style={{ fontSize: 'var(--text-sm)' }}>Source credibility</span>
                            <span style={{ fontSize: 'var(--text-sm)' }}>98%</span>
                          </div>
                          <div className="w-full bg-background rounded-full h-1.5" style={{ borderRadius: 'var(--radius-pill)' }}>
                            <div className="bg-success h-1.5 rounded-full" style={{ width: '98%', borderRadius: 'var(--radius-pill)' }} />
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span style={{ fontSize: 'var(--text-sm)' }}>Temporal relevance</span>
                            <span style={{ fontSize: 'var(--text-sm)' }}>92%</span>
                          </div>
                          <div className="w-full bg-background rounded-full h-1.5" style={{ borderRadius: 'var(--radius-pill)' }}>
                            <div className="bg-primary h-1.5 rounded-full" style={{ width: '92%', borderRadius: 'var(--radius-pill)' }} />
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span style={{ fontSize: 'var(--text-sm)' }}>Brand impact</span>
                            <span style={{ fontSize: 'var(--text-sm)' }}>87%</span>
                          </div>
                          <div className="w-full bg-background rounded-full h-1.5" style={{ borderRadius: 'var(--radius-pill)' }}>
                            <div className="bg-accent h-1.5 rounded-full" style={{ width: '87%', borderRadius: 'var(--radius-pill)' }} />
                          </div>
                        </div>
                      </div>
                    </div>
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
                        "Dana, would you like me to summarize the Pet segment growth trends for your 3 PM investor call?"
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        className="flex-1 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:opacity-90"
                        style={{ borderRadius: 'var(--radius-md)' }}
                      >
                        Yes, do it
                      </button>
                      <button 
                        className="px-4 py-2 bg-surface text-text-secondary rounded-lg hover:bg-background"
                        style={{ borderRadius: 'var(--radius-md)' }}
                      >
                        Later
                      </button>
                      <button 
                        className="px-4 py-2 bg-surface text-text-secondary rounded-lg hover:bg-background"
                        style={{ borderRadius: 'var(--radius-md)' }}
                      >
                        Add Reminder
                      </button>
                    </div>
                  </div>
                </motion.div>

                {/* Section 6 - Auto-Drafted Reply */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <h3 className="mb-3 flex items-center gap-2">
                    <Edit3 className="w-4 h-4 text-success" />
                    Auto-Drafted Reply
                  </h3>
                  <div 
                    className="p-4 rounded-lg border border-success/30"
                    style={{ 
                      backgroundColor: 'var(--surface)',
                      borderRadius: 'var(--radius-md)'
                    }}
                  >
                    <div className="mb-4 p-3 bg-background rounded" style={{ borderRadius: 'var(--radius-sm)' }}>
                      <p className="mb-3" style={{ fontSize: 'var(--text-sm)' }}>
                        "Jeff — thanks for the heads-up.<br/>
                        I'll review the Pet segment summary and align the messaging with our Q3 outlook.<br/>
                        Let's sync at 2:30 PM before the call."
                      </p>
                      <p className="text-text-muted" style={{ fontSize: 'var(--text-sm)' }}>
                        — Dana
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        className="flex-1 bg-success text-white px-4 py-2 rounded-lg hover:opacity-90 flex items-center justify-center gap-2"
                        style={{ borderRadius: 'var(--radius-md)' }}
                      >
                        <Send className="w-4 h-4" />
                        Send
                      </button>
                      <button 
                        className="px-4 py-2 bg-surface text-primary rounded-lg hover:bg-secondary flex items-center gap-2"
                        style={{ borderRadius: 'var(--radius-md)' }}
                      >
                        <Edit3 className="w-4 h-4" />
                        Edit Draft
                      </button>
                      <button 
                        className="px-4 py-2 bg-surface text-text-secondary rounded-lg hover:bg-background"
                        style={{ borderRadius: 'var(--radius-md)' }}
                      >
                        Reject
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
  );
}
