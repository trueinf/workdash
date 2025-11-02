import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Video, Users, Clock, CheckCircle, AlertCircle, TrendingUp, 
  FileText, Share2, Download, Brain, Zap, MessageSquare, Play,
  Copy, ChevronRight, ChevronDown, X, Edit3, Send, Target,
  BarChart3, Calendar, User, Flag, ListChecks, Sparkles,
  Package, DollarSign, Shield, Lightbulb, ArrowUpRight,
  ArrowDownRight, Minus, FileSpreadsheet, Presentation,
  PieChart, Activity
} from 'lucide-react';

export function MeetingsSummaries() {
  const [selectedMeeting, setSelectedMeeting] = useState<number | null>(1);
  const [showDetailPanel, setShowDetailPanel] = useState(true);
  const [expandedSections, setExpandedSections] = useState<string[]>(['summary', 'decisions']);

  const meetings = [
    {
      id: 1,
      title: 'Pet Segment Innovation Review',
      date: 'Mon 10:00–11:00 AM',
      duration: '60 min',
      participants: [
        { name: 'Dana McNabb', role: 'GM' },
        { name: 'Sarah Chen', role: 'R&D Lead' },
        { name: 'Mike Johnson', role: 'Marketing' },
        { name: 'Lisa Park', role: 'Finance' },
        { name: 'Tom Wilson', role: 'Ops' },
        { name: 'Jennifer Lee', role: 'Strategy' },
      ],
      summary: 'Approved 3 new SKUs for Blue Buffalo — packaging redesign targets Q3 launch. Risks flagged: supplier lead time.',
      status: 'processed',
      confidence: 95,
      badges: ['Innovation', 'Pet Segment', 'Decision Logged'],
      sentiment: 'positive',
      category: 'innovation'
    },
    {
      id: 2,
      title: 'Retail Category Review – Walmart',
      date: 'Tue 9:00–10:00 AM',
      duration: '60 min',
      participants: [
        { name: 'Dana McNabb', role: 'GM' },
        { name: 'John Smith', role: 'Walmart Buyer' },
        { name: 'Emily Davis', role: 'Category Lead' },
      ],
      summary: 'Negotiation on shelf reset; Walmart requests pricing review by next week.',
      status: 'processing',
      confidence: 60,
      badges: ['Retail', 'Negotiation', 'Pending Summary'],
      sentiment: 'cautious',
      category: 'retail'
    },
    {
      id: 3,
      title: 'NAR Marketing Sync',
      date: 'Wed 2:00–3:00 PM',
      duration: '60 min',
      participants: [
        { name: 'Dana McNabb', role: 'GM' },
        { name: 'Rachel Green', role: 'Marketing Director' },
        { name: 'Chris Brown', role: 'Analytics' },
        { name: 'Alex Turner', role: 'Creative' },
      ],
      summary: 'Cheerios campaign performing +7% above projections; Annie\'s under by −3%. Next step: budget reallocation.',
      status: 'processed',
      confidence: 92,
      badges: ['Marketing', 'Brand', 'Performance'],
      sentiment: 'positive',
      category: 'marketing'
    },
    {
      id: 4,
      title: 'Investor Call Preparation',
      date: 'Thu 4:00–5:00 PM',
      duration: '60 min',
      participants: [
        { name: 'Dana McNabb', role: 'GM' },
        { name: 'Jeff Harmening', role: 'CEO' },
        { name: 'Kofi Bruce', role: 'CFO' },
      ],
      summary: 'CEO aligned on Pet growth messaging; needs macro inflation slide by Friday.',
      status: 'pending',
      confidence: 0,
      badges: ['Investor', 'Strategic', 'Upcoming'],
      sentiment: 'neutral',
      category: 'strategic'
    },
  ];

  const selectedMeetingData = meetings.find(m => m.id === selectedMeeting);

  const decisions = [
    { decision: 'Approve final 3 SKUs', owner: 'Dana', dueDate: 'Immediate', confidence: 97 },
    { decision: 'Confirm packaging vendor', owner: 'Ops Lead', dueDate: 'Fri', confidence: 92 },
    { decision: 'Align campaign tone with PetCare strategy', owner: 'Marketing', dueDate: 'Tue', confidence: 88 },
  ];

  const risks = [
    { risk: 'Supplier lead time variance (2 weeks)', severity: 'medium', icon: AlertCircle },
    { risk: 'Pending packaging compliance certification', severity: 'low', icon: Shield },
    { risk: 'Need cross-brand alignment (Pet ↔ Retail marketing)', severity: 'info', icon: MessageSquare },
  ];

  const actions = [
    { task: 'Review updated creative mock-ups', owner: 'Marketing', due: 'Mon', status: 'in-progress' },
    { task: 'Prepare margin analysis', owner: 'Finance', due: 'Tue', status: 'pending' },
    { task: 'Update R&D plan in SharePoint', owner: 'Ops', due: 'Wed', status: 'done' },
  ];

  const transcriptHighlights = [
    { speaker: 'R&D Lead', quote: 'Packaging suppliers are at capacity.', tag: 'risk', time: '10:15' },
    { speaker: 'Dana', quote: 'We\'ll need consumer testing feedback within the week.', tag: 'action', time: '10:32' },
    { speaker: 'Marketing', quote: 'The Puppy Care positioning resonates strongly with our core segment.', tag: 'insight', time: '10:48' },
  ];

  const insights = [
    { metric: 'Avg. Meeting Duration', value: '47 mins', trend: -8, color: '#107C10' },
    { metric: 'Avg. Decisions/Meeting', value: '5.2', trend: 12, color: '#4F6BED' },
    { metric: '% Tasks Completed', value: '78%', trend: 6, color: '#107C10' },
    { metric: 'Repetitive Topics', value: '"Margin vs Innovation"', trend: 0, color: '#FF8C00', note: 'recurring 3x' },
    { metric: 'Sentiment Trend', value: '68% positive', trend: 0, color: '#4F6BED', note: 'steady' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processed': return '#107C10';
      case 'processing': return '#FF8C00';
      case 'pending': return '#8A8886';
      default: return '#8A8886';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'processed': return <CheckCircle className="w-4 h-4" />;
      case 'processing': return <Activity className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return '#D13438';
      case 'medium': return '#FF8C00';
      case 'low': return '#FCE100';
      case 'info': return '#4F6BED';
      default: return '#8A8886';
    }
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-background overflow-hidden">
      {/* Action & Export Toolbar */}
      <div className="px-6 py-4 border-b border-border bg-card">
        <div className="flex items-center justify-between max-w-[1600px] mx-auto">
          <div className="flex items-center gap-2">
            <Video className="w-5 h-5 text-primary" />
            <h2 className="text-foreground">Meetings & Summaries</h2>
          </div>
          <div className="flex items-center gap-2">
            <button 
              className="px-4 py-2 bg-surface text-foreground rounded-lg hover:bg-secondary transition-colors flex items-center gap-2"
              style={{ borderRadius: 'var(--radius-md)' }}
            >
              <Brain className="w-4 h-4" />
              <span style={{ fontSize: 'var(--text-sm)' }}>Summarize Meeting</span>
            </button>
            <button 
              className="px-4 py-2 bg-surface text-foreground rounded-lg hover:bg-secondary transition-colors flex items-center gap-2"
              style={{ borderRadius: 'var(--radius-md)' }}
            >
              <Presentation className="w-4 h-4" />
              <span style={{ fontSize: 'var(--text-sm)' }}>Generate Deck</span>
            </button>
            <button 
              className="px-4 py-2 bg-surface text-foreground rounded-lg hover:bg-secondary transition-colors flex items-center gap-2"
              style={{ borderRadius: 'var(--radius-md)' }}
            >
              <MessageSquare className="w-4 h-4" />
              <span style={{ fontSize: 'var(--text-sm)' }}>Ask the Meeting</span>
            </button>
            <button 
              className="px-4 py-2 bg-surface text-foreground rounded-lg hover:bg-secondary transition-colors flex items-center gap-2"
              style={{ borderRadius: 'var(--radius-md)' }}
            >
              <Share2 className="w-4 h-4" />
              <span style={{ fontSize: 'var(--text-sm)' }}>Send to Teams</span>
            </button>
            <button 
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2"
              style={{ borderRadius: 'var(--radius-md)' }}
            >
              <Download className="w-4 h-4" />
              <span style={{ fontSize: 'var(--text-sm)' }}>Export MoM</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left - Meeting Summary Feed */}
        <motion.div 
          className="w-[420px] bg-background border-r border-border flex-shrink-0 overflow-y-auto"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="p-6 space-y-4">
            {meetings.map((meeting, index) => (
              <motion.div
                key={meeting.id}
                onClick={() => {
                  setSelectedMeeting(meeting.id);
                  setShowDetailPanel(true);
                }}
                className={`bg-card border border-border rounded-lg p-5 cursor-pointer transition-all ${
                  selectedMeeting === meeting.id ? 'ring-2 ring-primary' : 'hover:border-primary/50'
                }`}
                style={{ 
                  borderRadius: 'var(--radius-lg)',
                  transition: 'var(--transition-fast)'
                }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08, duration: 0.2 }}
                whileHover={{ y: -2 }}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <h3 className="flex-1 pr-4">{meeting.title}</h3>
                  <div 
                    className="px-2 py-1 rounded-full flex items-center gap-1 flex-shrink-0"
                    style={{ 
                      backgroundColor: getStatusColor(meeting.status) + '20',
                      color: getStatusColor(meeting.status),
                      fontSize: 'var(--text-xs)',
                      borderRadius: 'var(--radius-pill)'
                    }}
                  >
                    {getStatusIcon(meeting.status)}
                    <span className="capitalize">{meeting.status}</span>
                  </div>
                </div>

                {/* Date & Duration */}
                <div className="flex items-center gap-4 mb-3 text-text-secondary" style={{ fontSize: 'var(--text-sm)' }}>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{meeting.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{meeting.duration}</span>
                  </div>
                </div>

                {/* Participants */}
                <div className="flex items-center gap-2 mb-3">
                  <Users className="w-4 h-4 text-text-secondary" />
                  <div className="flex -space-x-2">
                    {meeting.participants.slice(0, 4).map((participant, idx) => (
                      <div
                        key={idx}
                        className="w-7 h-7 rounded-full bg-primary flex items-center justify-center border-2 border-card"
                        style={{ borderRadius: 'var(--radius-full)' }}
                        title={participant.name}
                      >
                        <span className="text-primary-foreground" style={{ fontSize: 'var(--text-xs)' }}>
                          {participant.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                    ))}
                    {meeting.participants.length > 4 && (
                      <div
                        className="w-7 h-7 rounded-full bg-surface flex items-center justify-center border-2 border-card"
                        style={{ borderRadius: 'var(--radius-full)' }}
                      >
                        <span className="text-text-secondary" style={{ fontSize: 'var(--text-xs)' }}>
                          +{meeting.participants.length - 4}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* AI Summary Snippet */}
                <div 
                  className="p-3 rounded-lg mb-3 border border-primary/20"
                  style={{ 
                    backgroundColor: 'var(--surface)',
                    borderRadius: 'var(--radius-md)'
                  }}
                >
                  <div className="flex items-start gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-text-muted" style={{ fontSize: 'var(--text-xs)' }}>
                      AI Summary Snippet
                    </span>
                  </div>
                  <p style={{ fontSize: 'var(--text-sm)' }}>{meeting.summary}</p>
                </div>

                {/* Status & Confidence */}
                {meeting.status === 'processed' && (
                  <div className="flex items-center gap-2 mb-3">
                    <Brain className="w-4 h-4 text-primary" />
                    <span className="text-text-secondary" style={{ fontSize: 'var(--text-sm)' }}>
                      AI Confidence: {meeting.confidence}%
                    </span>
                  </div>
                )}
                {meeting.status === 'processing' && (
                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-text-secondary" style={{ fontSize: 'var(--text-xs)' }}>
                        AI Summary Progress
                      </span>
                      <span className="text-text-secondary" style={{ fontSize: 'var(--text-xs)' }}>
                        {meeting.confidence}%
                      </span>
                    </div>
                    <div className="w-full bg-background rounded-full h-1.5" style={{ borderRadius: 'var(--radius-pill)' }}>
                      <div 
                        className="bg-primary h-1.5 rounded-full transition-all"
                        style={{ 
                          width: `${meeting.confidence}%`,
                          borderRadius: 'var(--radius-pill)'
                        }} 
                      />
                    </div>
                  </div>
                )}

                {/* Badges */}
                <div className="flex items-center gap-2 flex-wrap mb-4">
                  {meeting.badges.map((badge) => (
                    <span
                      key={badge}
                      className="px-2 py-1 bg-secondary text-primary rounded"
                      style={{ 
                        fontSize: 'var(--text-xs)',
                        borderRadius: 'var(--radius-sm)'
                      }}
                    >
                      {badge}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button 
                    className="flex-1 px-3 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
                    style={{ 
                      fontSize: 'var(--text-xs)',
                      borderRadius: 'var(--radius-md)'
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    View Details
                  </button>
                  <button 
                    className="px-3 py-2 bg-surface text-foreground rounded-lg hover:bg-secondary transition-colors"
                    style={{ 
                      fontSize: 'var(--text-xs)',
                      borderRadius: 'var(--radius-md)'
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    Generate Deck
                  </button>
                  <button 
                    className="p-2 bg-surface text-foreground rounded-lg hover:bg-secondary transition-colors"
                    style={{ borderRadius: 'var(--radius-md)' }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right - Meeting Detail Panel */}
        <AnimatePresence>
          {showDetailPanel && selectedMeetingData && (
            <motion.div
              className="flex-1 bg-background overflow-y-auto"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 20, opacity: 0 }}
              transition={{ 
                type: 'tween',
                ease: [0.4, 0, 0.2, 1],
                duration: 0.3
              }}
            >
              <div className="max-w-5xl mx-auto p-8 space-y-6">
                {/* Panel Header */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h1 className="mb-3">{selectedMeetingData.title}</h1>
                      <div className="flex items-center gap-4 text-text-secondary mb-4" style={{ fontSize: 'var(--text-sm)' }}>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {selectedMeetingData.date}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {selectedMeetingData.duration}
                        </div>
                        <div 
                          className="px-3 py-1 rounded-full flex items-center gap-1"
                          style={{ 
                            backgroundColor: getStatusColor(selectedMeetingData.status) + '20',
                            color: getStatusColor(selectedMeetingData.status),
                            fontSize: 'var(--text-xs)',
                            borderRadius: 'var(--radius-pill)'
                          }}
                        >
                          {getStatusIcon(selectedMeetingData.status)}
                          <span className="capitalize">{selectedMeetingData.status}</span>
                        </div>
                      </div>

                      {/* Participants */}
                      <div className="flex items-center gap-3">
                        <span className="text-text-secondary" style={{ fontSize: 'var(--text-sm)' }}>
                          Participants:
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {selectedMeetingData.participants.map((participant, idx) => (
                            <div
                              key={idx}
                              className="flex items-center gap-2 px-3 py-1 bg-surface rounded-full"
                              style={{ borderRadius: 'var(--radius-pill)' }}
                            >
                              <div
                                className="w-6 h-6 rounded-full bg-primary flex items-center justify-center"
                                style={{ borderRadius: 'var(--radius-full)' }}
                              >
                                <span className="text-primary-foreground" style={{ fontSize: 'var(--text-xs)' }}>
                                  {participant.name.split(' ').map(n => n[0]).join('')}
                                </span>
                              </div>
                              <div>
                                <p style={{ fontSize: 'var(--text-xs)' }}>{participant.name}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => setShowDetailPanel(false)}
                      className="p-2 hover:bg-surface rounded-lg transition-colors"
                      style={{ borderRadius: 'var(--radius-md)' }}
                    >
                      <X className="w-5 h-5 text-text-secondary" />
                    </button>
                  </div>

                  {/* Quick Actions */}
                  <div className="flex items-center gap-2">
                    <button 
                      className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2"
                      style={{ borderRadius: 'var(--radius-md)' }}
                    >
                      <Presentation className="w-4 h-4" />
                      <span style={{ fontSize: 'var(--text-sm)' }}>Generate Deck</span>
                    </button>
                    <button 
                      className="px-4 py-2 bg-surface text-foreground rounded-lg hover:bg-secondary transition-colors flex items-center gap-2"
                      style={{ borderRadius: 'var(--radius-md)' }}
                    >
                      <FileText className="w-4 h-4" />
                      <span style={{ fontSize: 'var(--text-sm)' }}>Export MoM</span>
                    </button>
                    <button 
                      className="px-4 py-2 bg-surface text-foreground rounded-lg hover:bg-secondary transition-colors flex items-center gap-2"
                      style={{ borderRadius: 'var(--radius-md)' }}
                    >
                      <Send className="w-4 h-4" />
                      <span style={{ fontSize: 'var(--text-sm)' }}>Send Summary</span>
                    </button>
                  </div>
                </motion.div>

                {/* Section 1 - AI Executive Summary */}
                <motion.div
                  className="bg-card border border-border rounded-lg overflow-hidden"
                  style={{ borderRadius: 'var(--radius-lg)' }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <button
                    onClick={() => toggleSection('summary')}
                    className="w-full px-6 py-4 flex items-center justify-between hover:bg-surface transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Sparkles className="w-5 h-5 text-primary" />
                      <h3>AI Executive Summary</h3>
                    </div>
                    {expandedSections.includes('summary') ? (
                      <ChevronDown className="w-5 h-5 text-text-secondary" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-text-secondary" />
                    )}
                  </button>

                  {expandedSections.includes('summary') && (
                    <motion.div
                      className="px-6 pb-6"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <div 
                        className="p-4 rounded-lg mb-4"
                        style={{ 
                          backgroundColor: 'var(--surface)',
                          borderRadius: 'var(--radius-md)'
                        }}
                      >
                        <p className="mb-4" style={{ fontSize: 'var(--text-sm)', lineHeight: '1.6' }}>
                          "This meeting focused on the upcoming Blue Buffalo innovation line.
                          Decisions were made on SKU selection (Healthy Puppy, Senior Blend, Training Treats).
                          Marketing to finalize messaging by next Tuesday.
                          Risks: Supplier delay, package compliance testing."
                        </p>

                        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                          <div>
                            <span className="text-text-muted" style={{ fontSize: 'var(--text-xs)' }}>
                              Confidence:
                            </span>
                            <p className="text-success">93%</p>
                          </div>
                          <div>
                            <span className="text-text-muted" style={{ fontSize: 'var(--text-xs)' }}>
                              Tone:
                            </span>
                            <p>Analytical / Collaborative</p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <span className="text-text-muted mb-2 block" style={{ fontSize: 'var(--text-xs)' }}>
                          Keywords Extracted:
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {['SKU Expansion', 'Packaging', 'Q3 Timeline', 'R&D Risk'].map((keyword) => (
                            <span
                              key={keyword}
                              className="px-3 py-1 bg-primary/10 text-primary rounded-full"
                              style={{ 
                                fontSize: 'var(--text-xs)',
                                borderRadius: 'var(--radius-pill)'
                              }}
                            >
                              {keyword}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>

                {/* Section 2 - Key Decisions */}
                <motion.div
                  className="bg-card border border-border rounded-lg overflow-hidden"
                  style={{ borderRadius: 'var(--radius-lg)' }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                >
                  <button
                    onClick={() => toggleSection('decisions')}
                    className="w-full px-6 py-4 flex items-center justify-between hover:bg-surface transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Target className="w-5 h-5 text-success" />
                      <h3>Key Decisions</h3>
                    </div>
                    {expandedSections.includes('decisions') ? (
                      <ChevronDown className="w-5 h-5 text-text-secondary" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-text-secondary" />
                    )}
                  </button>

                  {expandedSections.includes('decisions') && (
                    <motion.div
                      className="px-6 pb-6"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <div className="space-y-3">
                        {decisions.map((decision, idx) => (
                          <div
                            key={idx}
                            className="p-4 bg-surface rounded-lg flex items-center justify-between"
                            style={{ borderRadius: 'var(--radius-md)' }}
                          >
                            <div className="flex-1">
                              <p className="mb-1">{decision.decision}</p>
                              <div className="flex items-center gap-3 text-text-secondary" style={{ fontSize: 'var(--text-xs)' }}>
                                <span>Owner: {decision.owner}</span>
                                <span>•</span>
                                <span>Due: {decision.dueDate}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="text-right mr-3">
                                <span className="text-text-muted" style={{ fontSize: 'var(--text-xs)' }}>
                                  Confidence
                                </span>
                                <p className="text-success">{decision.confidence}%</p>
                              </div>
                              <button 
                                className="p-2 bg-primary text-primary-foreground rounded hover:opacity-90"
                                style={{ borderRadius: 'var(--radius-sm)' }}
                              >
                                <CheckCircle className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </motion.div>

                {/* Section 3 - Risks & Dependencies */}
                <motion.div
                  className="bg-card border border-border rounded-lg overflow-hidden"
                  style={{ borderRadius: 'var(--radius-lg)' }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <button
                    onClick={() => toggleSection('risks')}
                    className="w-full px-6 py-4 flex items-center justify-between hover:bg-surface transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <AlertCircle className="w-5 h-5 text-warning" />
                      <h3>Risks & Dependencies</h3>
                    </div>
                    {expandedSections.includes('risks') ? (
                      <ChevronDown className="w-5 h-5 text-text-secondary" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-text-secondary" />
                    )}
                  </button>

                  {expandedSections.includes('risks') && (
                    <motion.div
                      className="px-6 pb-6"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <div className="space-y-3 mb-4">
                        {risks.map((risk, idx) => (
                          <div
                            key={idx}
                            className="p-4 rounded-lg border-l-4 flex items-start gap-3"
                            style={{ 
                              backgroundColor: 'var(--surface)',
                              borderLeftColor: getSeverityColor(risk.severity),
                              borderRadius: 'var(--radius-md)'
                            }}
                          >
                            <risk.icon 
                              className="w-5 h-5 flex-shrink-0 mt-0.5" 
                              style={{ color: getSeverityColor(risk.severity) }}
                            />
                            <p style={{ fontSize: 'var(--text-sm)' }}>{risk.risk}</p>
                          </div>
                        ))}
                      </div>

                      <div className="flex gap-2">
                        <button 
                          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90"
                          style={{ 
                            borderRadius: 'var(--radius-md)',
                            fontSize: 'var(--text-sm)'
                          }}
                        >
                          Create Risk Tracker
                        </button>
                        <button 
                          className="px-4 py-2 bg-surface text-foreground rounded-lg hover:bg-secondary"
                          style={{ 
                            borderRadius: 'var(--radius-md)',
                            fontSize: 'var(--text-sm)'
                          }}
                        >
                          Assign Owner
                        </button>
                      </div>
                    </motion.div>
                  )}
                </motion.div>

                {/* Section 4 - Action Items */}
                <motion.div
                  className="bg-card border border-border rounded-lg overflow-hidden"
                  style={{ borderRadius: 'var(--radius-lg)' }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                >
                  <button
                    onClick={() => toggleSection('actions')}
                    className="w-full px-6 py-4 flex items-center justify-between hover:bg-surface transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <ListChecks className="w-5 h-5 text-primary" />
                      <h3>Action Items</h3>
                    </div>
                    {expandedSections.includes('actions') ? (
                      <ChevronDown className="w-5 h-5 text-text-secondary" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-text-secondary" />
                    )}
                  </button>

                  {expandedSections.includes('actions') && (
                    <motion.div
                      className="px-6 pb-6"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <div className="space-y-3">
                        {actions.map((action, idx) => (
                          <div
                            key={idx}
                            className="p-4 bg-surface rounded-lg flex items-center justify-between"
                            style={{ borderRadius: 'var(--radius-md)' }}
                          >
                            <div className="flex-1">
                              <p className="mb-1">{action.task}</p>
                              <div className="flex items-center gap-3 text-text-secondary" style={{ fontSize: 'var(--text-xs)' }}>
                                <span>Owner: {action.owner}</span>
                                <span>•</span>
                                <span>Due: {action.due}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span 
                                className="px-3 py-1 rounded-full"
                                style={{ 
                                  backgroundColor: action.status === 'done' ? '#107C1020' : action.status === 'in-progress' ? '#4F6BED20' : '#8A888620',
                                  color: action.status === 'done' ? '#107C10' : action.status === 'in-progress' ? '#4F6BED' : '#8A8886',
                                  fontSize: 'var(--text-xs)',
                                  borderRadius: 'var(--radius-pill)'
                                }}
                              >
                                {action.status === 'done' ? '✅ Done' : action.status === 'in-progress' ? '⏳ In Progress' : '⏳ Pending'}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="flex gap-2 mt-4">
                        <button 
                          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90"
                          style={{ 
                            borderRadius: 'var(--radius-md)',
                            fontSize: 'var(--text-sm)'
                          }}
                        >
                          Mark Complete
                        </button>
                        <button 
                          className="px-4 py-2 bg-surface text-foreground rounded-lg hover:bg-secondary"
                          style={{ 
                            borderRadius: 'var(--radius-md)',
                            fontSize: 'var(--text-sm)'
                          }}
                        >
                          Remind
                        </button>
                        <button 
                          className="px-4 py-2 bg-surface text-foreground rounded-lg hover:bg-secondary"
                          style={{ 
                            borderRadius: 'var(--radius-md)',
                            fontSize: 'var(--text-sm)'
                          }}
                        >
                          Escalate
                        </button>
                      </div>
                    </motion.div>
                  )}
                </motion.div>

                {/* Section 5 - AI Narrative Insight */}
                <motion.div
                  className="bg-card border border-primary/30 rounded-lg p-6"
                  style={{ 
                    borderRadius: 'var(--radius-lg)',
                    backgroundColor: 'var(--primary)',
                    opacity: 0.05
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="flex items-start gap-3 mb-4">
                    <Lightbulb className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="mb-2">AI Narrative Insight</h3>
                      <p className="text-text-secondary" style={{ fontSize: 'var(--text-sm)', lineHeight: '1.6' }}>
                        "Discussion emphasized balancing premium positioning with price sensitivity in the Pet segment.
                        Similar patterns detected across last 4 innovation meetings — 3 flagged 'margin vs brand' tension."
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      className="px-4 py-2 bg-accent text-white rounded-lg hover:opacity-90"
                      style={{ 
                        borderRadius: 'var(--radius-md)',
                        fontSize: 'var(--text-sm)'
                      }}
                    >
                      View Trend Dashboard
                    </button>
                    <button 
                      className="px-4 py-2 bg-surface text-foreground rounded-lg hover:bg-secondary"
                      style={{ 
                        borderRadius: 'var(--radius-md)',
                        fontSize: 'var(--text-sm)'
                      }}
                    >
                      Ask AI: "Show similar discussions"
                    </button>
                  </div>
                </motion.div>

                {/* Section 6 - Transcript Highlights */}
                <motion.div
                  className="bg-card border border-border rounded-lg overflow-hidden"
                  style={{ borderRadius: 'var(--radius-lg)' }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45 }}
                >
                  <button
                    onClick={() => toggleSection('transcript')}
                    className="w-full px-6 py-4 flex items-center justify-between hover:bg-surface transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <MessageSquare className="w-5 h-5 text-text-muted" />
                      <h3>Transcript & AI Highlights</h3>
                    </div>
                    {expandedSections.includes('transcript') ? (
                      <ChevronDown className="w-5 h-5 text-text-secondary" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-text-secondary" />
                    )}
                  </button>

                  {expandedSections.includes('transcript') && (
                    <motion.div
                      className="px-6 pb-6"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <div className="space-y-3">
                        {transcriptHighlights.map((highlight, idx) => (
                          <div
                            key={idx}
                            className="p-4 bg-surface rounded-lg"
                            style={{ borderRadius: 'var(--radius-md)' }}
                          >
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <span className="font-semibold" style={{ fontSize: 'var(--text-sm)' }}>
                                  {highlight.speaker}
                                </span>
                                <span className="text-text-muted" style={{ fontSize: 'var(--text-xs)' }}>
                                  {highlight.time}
                                </span>
                              </div>
                              <span 
                                className="px-2 py-0.5 rounded-full capitalize"
                                style={{ 
                                  backgroundColor: highlight.tag === 'risk' ? '#D1343820' : highlight.tag === 'action' ? '#4F6BED20' : '#886CE420',
                                  color: highlight.tag === 'risk' ? '#D13438' : highlight.tag === 'action' ? '#4F6BED' : '#886CE4',
                                  fontSize: 'var(--text-xs)',
                                  borderRadius: 'var(--radius-pill)'
                                }}
                              >
                                {highlight.tag}
                              </span>
                            </div>
                            <p className="mb-3" style={{ fontSize: 'var(--text-sm)' }}>
                              "{highlight.quote}"
                            </p>
                            <div className="flex gap-2">
                              <button 
                                className="px-3 py-1 bg-background text-foreground rounded hover:bg-card flex items-center gap-1"
                                style={{ 
                                  borderRadius: 'var(--radius-sm)',
                                  fontSize: 'var(--text-xs)'
                                }}
                              >
                                <Play className="w-3 h-3" />
                                Play Clip
                              </button>
                              <button 
                                className="px-3 py-1 bg-background text-foreground rounded hover:bg-card flex items-center gap-1"
                                style={{ 
                                  borderRadius: 'var(--radius-sm)',
                                  fontSize: 'var(--text-xs)'
                                }}
                              >
                                <Copy className="w-3 h-3" />
                                Copy Quote
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </motion.div>

                {/* Section 7 - AI Explainability */}
                <motion.div
                  className="bg-card border border-border rounded-lg p-6"
                  style={{ borderRadius: 'var(--radius-lg)' }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <h3 className="mb-4 flex items-center gap-2">
                    <Brain className="w-5 h-5 text-primary" />
                    AI Explainability
                  </h3>

                  <div className="mb-4">
                    <p className="text-text-muted mb-3" style={{ fontSize: 'var(--text-xs)' }}>
                      How AI derived insights:
                    </p>
                    <div className="space-y-2">
                      {[
                        'Used Speech-to-Text on meeting recording',
                        'Summarized using GPT-5 meeting chain',
                        'Cross-checked decisions with historical project logs'
                      ].map((step, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-success"></div>
                          <span style={{ fontSize: 'var(--text-sm)' }}>{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-text-muted mb-3" style={{ fontSize: 'var(--text-xs)' }}>
                      Confidence distribution:
                    </p>
                    <div className="space-y-3">
                      {[
                        { label: 'Facts', value: 98, color: '#107C10' },
                        { label: 'Actions', value: 92, color: '#4F6BED' },
                        { label: 'Risks', value: 87, color: '#FF8C00' },
                      ].map((item) => (
                        <div key={item.label}>
                          <div className="flex items-center justify-between mb-1">
                            <span style={{ fontSize: 'var(--text-sm)' }}>{item.label}</span>
                            <span style={{ fontSize: 'var(--text-sm)' }}>{item.value}%</span>
                          </div>
                          <div className="w-full bg-background rounded-full h-2" style={{ borderRadius: 'var(--radius-pill)' }}>
                            <div 
                              className="h-2 rounded-full" 
                              style={{ 
                                width: `${item.value}%`,
                                backgroundColor: item.color,
                                borderRadius: 'var(--radius-pill)'
                              }} 
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Insights Footer */}
      <motion.div 
        className="border-t border-border bg-card px-6 py-4"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.3 }}
      >
        <div className="max-w-[1600px] mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h3 className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-primary" />
              Cross-Meeting Intelligence
            </h3>
            <p className="text-text-secondary" style={{ fontSize: 'var(--text-xs)' }}>
              AI detects recurring "margin pressure" conversation across Pet + Retail GMs — suggest briefing CFO.
            </p>
          </div>

          <div className="grid grid-cols-5 gap-4">
            {insights.map((insight, index) => (
              <motion.div
                key={insight.metric}
                className="bg-surface p-4 rounded-lg"
                style={{ borderRadius: 'var(--radius-md)' }}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.05, duration: 0.2 }}
              >
                <div className="mb-2">
                  <span className="text-text-muted" style={{ fontSize: 'var(--text-xs)' }}>
                    {insight.metric}
                  </span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span style={{ fontSize: 'var(--text-lg)', color: insight.color }}>
                    {insight.value}
                  </span>
                  {insight.trend !== 0 && (
                    <span 
                      className={`flex items-center ${insight.trend > 0 ? 'text-success' : 'text-error'}`}
                      style={{ fontSize: 'var(--text-xs)' }}
                    >
                      {insight.trend > 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                      {Math.abs(insight.trend)}%
                    </span>
                  )}
                </div>
                {insight.note && (
                  <p className="text-text-secondary" style={{ fontSize: 'var(--text-xs)' }}>
                    {insight.note}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
