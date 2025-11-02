import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Brain, Mail, Calendar, Users, CheckCircle, Plane, DollarSign,
  Lightbulb, FileText, Shield, TrendingUp, Activity, Sparkles,
  X, Play, Clock, ArrowUpRight, ArrowDownRight, Minus, ChevronRight,
  Eye, Settings, Download, Share2, Target, Zap, Heart, BarChart3,
  MessageSquare, Volume2, Info, Lock, Globe, Cpu, Network,
  GitBranch, Layers, AlertCircle, ThumbsUp, BookOpen, Award,
  Maximize2, Minimize2
} from 'lucide-react';

interface Agent {
  id: string;
  name: string;
  icon: any;
  x: number;
  y: number;
  size: number;
  color: string;
  activity: number;
  confidence: number;
  status: 'active' | 'learning' | 'idle';
  description: string;
  mode: string;
  recentActions: Array<{
    time: string;
    action: string;
    outcome: string;
  }>;
  collaborators: string[];
  learning: string;
  actions24h: string;
  trend: number;
  selfAssessment: string;
}

export function AIAgents() {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [storyMode, setStoryMode] = useState(false);
  const [storyStep, setStoryStep] = useState(0);
  const [showTimeline, setShowTimeline] = useState(false);
  const [viewMode, setViewMode] = useState<'graph' | 'metrics' | 'learning'>('graph');
  const [pulseAnimation, setPulseAnimation] = useState(true);

  const agents: Agent[] = [
    {
      id: 'supervisor',
      name: 'Supervisor Agent',
      icon: Brain,
      x: 400,
      y: 250,
      size: 80,
      color: '#4F6BED',
      activity: 100,
      confidence: 99,
      status: 'active',
      description: 'Oversees orchestration, conflict resolution, and safety guardrails.',
      mode: 'Autonomous',
      recentActions: [
        { time: '10:15 AM', action: 'Coordinated multi-agent workflow', outcome: 'Success' },
        { time: '09:45 AM', action: 'Resolved scheduling conflict', outcome: 'Approved' },
        { time: '09:00 AM', action: 'Updated system priorities', outcome: 'Complete' },
      ],
      collaborators: ['inbox', 'calendar', 'meeting', 'task', 'guardrail'],
      learning: 'Continuously optimizing decision pathways based on user feedback patterns.',
      actions24h: '247 orchestrations',
      trend: 0,
      selfAssessment: 'System operating at peak efficiency.'
    },
    {
      id: 'inbox',
      name: 'Inbox Agent',
      icon: Mail,
      x: 200,
      y: 150,
      size: 60,
      color: '#0078D4',
      activity: 95,
      confidence: 96,
      status: 'active',
      description: 'Classifies, triages, and surfaces high-priority emails automatically.',
      mode: 'Semi-Autonomous',
      recentActions: [
        { time: '10:05 AM', action: 'Classified 112 emails', outcome: '96% accuracy' },
        { time: '09:30 AM', action: 'Flagged CFO email as urgent', outcome: 'Surfaced to dashboard' },
        { time: '08:45 AM', action: 'Auto-archived newsletters', outcome: '23 items processed' },
      ],
      collaborators: ['supervisor', 'calendar', 'task'],
      learning: 'Learning to better distinguish between FYI updates and action-required messages.',
      actions24h: '112 classified',
      trend: 2,
      selfAssessment: 'Performing optimally.'
    },
    {
      id: 'calendar',
      name: 'Calendar Agent',
      icon: Calendar,
      x: 600,
      y: 150,
      size: 60,
      color: '#886CE4',
      activity: 78,
      confidence: 92,
      status: 'learning',
      description: 'Optimizes scheduling, detects conflicts, and suggests time blocks.',
      mode: 'Semi-Autonomous',
      recentActions: [
        { time: '10:10 AM', action: 'Rescheduled conflicting meetings', outcome: '3 optimized' },
        { time: '09:20 AM', action: 'Created prep block for CFO meeting', outcome: 'Accepted' },
        { time: '08:30 AM', action: 'Suggested focus time consolidation', outcome: 'Pending' },
      ],
      collaborators: ['supervisor', 'inbox', 'travel', 'meeting'],
      learning: 'Improved preference learning — now prioritizes morning strategic time by default.',
      actions24h: '28 updates',
      trend: 0,
      selfAssessment: 'Learning preference shifts.'
    },
    {
      id: 'meeting',
      name: 'Meeting Agent',
      icon: Users,
      x: 300,
      y: 350,
      size: 60,
      color: '#107C10',
      activity: 82,
      confidence: 94,
      status: 'active',
      description: 'Listens, summarizes, and captures insights from every meeting.',
      mode: 'Semi-Autonomous',
      recentActions: [
        { time: '10:05 AM', action: 'Summarized Pet Innovation Review', outcome: '7 actions logged' },
        { time: '09:30 AM', action: 'Flagged duplication in Retail Sync', outcome: 'Merged with CFO prep' },
        { time: '09:00 AM', action: 'Generated MoM deck', outcome: 'Shared to Teams' },
      ],
      collaborators: ['supervisor', 'task', 'insight', 'narrative'],
      learning: 'Learned to distinguish brainstorming vs confirmed decisions — +11% precision.',
      actions24h: '8 summaries',
      trend: 0,
      selfAssessment: 'Reduced repetition errors.'
    },
    {
      id: 'task',
      name: 'Task Agent',
      icon: CheckCircle,
      x: 500,
      y: 350,
      size: 60,
      color: '#FF8C00',
      activity: 88,
      confidence: 97,
      status: 'active',
      description: 'Tracks execution, identifies blockers, and suggests automation candidates.',
      mode: 'Semi-Autonomous',
      recentActions: [
        { time: '10:00 AM', action: 'Tracked 34 active tasks', outcome: 'All dependencies resolved' },
        { time: '09:15 AM', action: 'Flagged Retail bottleneck', outcome: 'Alert sent' },
        { time: '08:50 AM', action: 'Reclassified 5 recurring items', outcome: 'Auto-mode proposed' },
      ],
      collaborators: ['supervisor', 'meeting', 'inbox', 'insight'],
      learning: 'Autonomously reclassified 5 recurring items as automation candidates.',
      actions24h: '34 tasks tracked',
      trend: 0,
      selfAssessment: '+11% closure rate.'
    },
    {
      id: 'travel',
      name: 'Travel Agent',
      icon: Plane,
      x: 150,
      y: 250,
      size: 55,
      color: '#FCE100',
      activity: 65,
      confidence: 93,
      status: 'active',
      description: 'Optimizes itineraries, detects conflicts, and manages expense reconciliation.',
      mode: 'Semi-Autonomous',
      recentActions: [
        { time: '09:45 AM', action: 'Optimized Boston flight', outcome: 'Saved $120' },
        { time: '09:00 AM', action: 'Detected hotel policy violation', outcome: 'Alternative suggested' },
        { time: '08:30 AM', action: 'Synced with meeting schedule', outcome: 'No conflicts' },
      ],
      collaborators: ['supervisor', 'calendar', 'expense'],
      learning: 'Learned user prefers early morning flights on Mondays (78% historical).',
      actions24h: '18 itinerary checks',
      trend: 0,
      selfAssessment: 'Route optimization improving.'
    },
    {
      id: 'expense',
      name: 'Expense Agent',
      icon: DollarSign,
      x: 650,
      y: 250,
      size: 55,
      color: '#D13438',
      activity: 72,
      confidence: 93,
      status: 'active',
      description: 'Auto-classifies receipts, flags policy violations, and reconciles expenses.',
      mode: 'Semi-Autonomous',
      recentActions: [
        { time: '10:00 AM', action: 'Processed 9 expense reports', outcome: '93% auto-classified' },
        { time: '09:30 AM', action: 'Flagged hotel rate exception', outcome: 'Resolved' },
        { time: '08:45 AM', action: 'Synced with Concur', outcome: 'Complete' },
      ],
      collaborators: ['supervisor', 'travel', 'guardrail'],
      learning: 'OCR accuracy improved to 93% through continuous model refinement.',
      actions24h: '9 reports',
      trend: 0,
      selfAssessment: 'Auto-reconciliation success.'
    },
    {
      id: 'insight',
      name: 'Insight Agent',
      icon: Lightbulb,
      x: 250,
      y: 450,
      size: 55,
      color: '#886CE4',
      activity: 90,
      confidence: 91,
      status: 'active',
      description: 'Generates narrative intelligence from analytics and surfaces patterns.',
      mode: 'Autonomous',
      recentActions: [
        { time: '10:05 AM', action: 'Detected Pet Ops delay risk', outcome: '91% confidence' },
        { time: '09:30 AM', action: 'Identified focus drift pattern', outcome: 'Suggestion created' },
        { time: '09:00 AM', action: 'Surfaced margin trend', outcome: 'Added to dashboard' },
      ],
      collaborators: ['supervisor', 'meeting', 'task', 'narrative'],
      learning: 'Pattern recognition improved — now detecting multi-week trends with 91% accuracy.',
      actions24h: '23 insights generated',
      trend: 0,
      selfAssessment: 'Analytical depth increasing.'
    },
    {
      id: 'narrative',
      name: 'Narrative Agent',
      icon: FileText,
      x: 550,
      y: 450,
      size: 55,
      color: '#0078D4',
      activity: 75,
      confidence: 89,
      status: 'active',
      description: 'Crafts executive summaries and translates data into natural language.',
      mode: 'Semi-Autonomous',
      recentActions: [
        { time: '10:00 AM', action: 'Generated weekly briefing', outcome: 'Ready for review' },
        { time: '09:15 AM', action: 'Summarized brand performance', outcome: 'Shared to dashboard' },
        { time: '08:45 AM', action: 'Created segment brief', outcome: 'CEO-ready' },
      ],
      collaborators: ['supervisor', 'insight', 'meeting'],
      learning: 'Writing style adapting to user preferences — more concise summaries.',
      actions24h: '12 summaries',
      trend: 0,
      selfAssessment: 'Clarity improving.'
    },
    {
      id: 'guardrail',
      name: 'Guardrail Agent',
      icon: Shield,
      x: 400,
      y: 100,
      size: 55,
      color: '#107C10',
      activity: 45,
      confidence: 100,
      status: 'active',
      description: 'Ensures all actions align with rules, confidentiality, and compliance.',
      mode: 'Always Active',
      recentActions: [
        { time: '09:45 AM', action: 'Reviewed 4 external sends', outcome: 'All compliant' },
        { time: '09:20 AM', action: 'Blocked PII exposure', outcome: 'Data masked' },
        { time: '08:30 AM', action: 'Validated policy adherence', outcome: '100% pass rate' },
      ],
      collaborators: ['supervisor', 'inbox', 'expense', 'meeting'],
      learning: 'Policy model updated with latest compliance requirements.',
      actions24h: '4 interventions',
      trend: 0,
      selfAssessment: 'All policy-compliant.'
    },
    {
      id: 'forecast',
      name: 'Forecast Agent',
      icon: TrendingUp,
      x: 700,
      y: 350,
      size: 50,
      color: '#4F6BED',
      activity: 68,
      confidence: 87,
      status: 'learning',
      description: 'Predicts trends in time allocation, costs, and performance.',
      mode: 'Autonomous',
      recentActions: [
        { time: '09:30 AM', action: 'Projected 8-day slip risk', outcome: 'Alert created' },
        { time: '09:00 AM', action: 'Forecasted Q4 travel costs', outcome: '±$340' },
        { time: '08:30 AM', action: 'Predicted meeting load spike', outcome: 'Suggestion sent' },
      ],
      collaborators: ['supervisor', 'insight', 'calendar'],
      learning: 'Time-series models improving — 87% accuracy on 2-week forecasts.',
      actions24h: '15 forecasts',
      trend: 0,
      selfAssessment: 'Prediction accuracy rising.'
    },
    {
      id: 'learning',
      name: 'Learning Agent',
      icon: BookOpen,
      x: 100,
      y: 350,
      size: 50,
      color: '#886CE4',
      activity: 100,
      confidence: 95,
      status: 'learning',
      description: 'Continuously refines models based on user feedback and outcomes.',
      mode: 'Always Learning',
      recentActions: [
        { time: '10:00 AM', action: 'Updated 14 micro-models', outcome: 'User patterns refined' },
        { time: '09:30 AM', action: 'Analyzed 41 manual interventions', outcome: '39 accepted patterns' },
        { time: '09:00 AM', action: 'Improved scheduler sensitivity', outcome: '+7% accuracy' },
      ],
      collaborators: ['supervisor', 'all-agents'],
      learning: 'Meta-learning layer active — system autonomy maturity at 82%.',
      actions24h: 'Continuous',
      trend: 0,
      selfAssessment: 'Evolution accelerating.'
    },
  ];

  const storySteps = [
    {
      text: 'This morning at 7:45 AM, the Inbox Agent identified a high-priority email from the CFO.',
      agents: ['inbox'],
    },
    {
      text: 'The Calendar Agent checked Dana\'s availability and proposed a prep slot before her Retail Partner meeting.',
      agents: ['calendar'],
    },
    {
      text: 'The Meeting Agent prepared a summary of the last finance review.',
      agents: ['meeting'],
    },
    {
      text: 'Finally, the Insight Agent surfaced a margin trend directly into Dana\'s dashboard.',
      agents: ['insight'],
    },
  ];

  const orchestrationEvents = [
    {
      time: '10:15 AM',
      event: 'CFO Meeting Rescheduled',
      agents: ['calendar', 'guardrail', 'insight'],
      narrative: 'Scheduler Agent reprioritized CFO meeting → Guardrail Agent approved → Insight Agent updated dashboard.'
    },
    {
      time: '09:45 AM',
      event: 'Travel Optimization',
      agents: ['travel', 'calendar', 'expense'],
      narrative: 'Travel Agent detected conflict → Calendar Agent found alternative → Expense Agent updated budget.'
    },
    {
      time: '09:15 AM',
      event: 'Task Automation',
      agents: ['task', 'learning', 'supervisor'],
      narrative: 'Task Agent identified pattern → Learning Agent proposed automation → Supervisor approved.'
    },
    {
      time: '08:30 AM',
      event: 'Email Triage',
      agents: ['inbox', 'insight', 'task'],
      narrative: 'Inbox Agent classified urgent → Insight Agent added context → Task Agent created follow-up.'
    },
  ];

  useEffect(() => {
    if (storyMode) {
      const interval = setInterval(() => {
        setStoryStep((prev) => (prev + 1) % storySteps.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [storyMode]);

  const getAgentById = (id: string) => agents.find(a => a.id === id);

  const renderConnection = (from: Agent, to: Agent, active: boolean = false) => {
    return (
      <motion.line
        key={`${from.id}-${to.id}`}
        x1={from.x}
        y1={from.y}
        x2={to.x}
        y2={to.y}
        stroke={active ? from.color : '#8A8886'}
        strokeWidth={active ? 2 : 1}
        strokeOpacity={active ? 0.6 : 0.2}
        strokeDasharray={active ? '0' : '4 4'}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, ease: 'easeInOut' }}
      />
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-16 z-40 bg-card border-b border-border">
        <div className="max-w-[1800px] mx-auto px-6 py-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="mb-2 flex items-center gap-3">
                <Network className="w-7 h-7 text-primary" />
                Your AI Team — Working 24/7 to Help You Lead Smarter
              </h1>
              <p className="text-text-secondary" style={{ fontSize: 'var(--text-sm)' }}>
                Every action, every summary, every decision suggestion — all coordinated by this network of intelligent agents.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setStoryMode(!storyMode)}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
                  storyMode
                    ? 'bg-accent text-white'
                    : 'bg-surface text-foreground hover:bg-secondary'
                }`}
                style={{ borderRadius: 'var(--radius-md)' }}
              >
                {storyMode ? <Volume2 className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span style={{ fontSize: 'var(--text-sm)' }}>
                  {storyMode ? 'Story Mode Active' : 'Story Mode'}
                </span>
              </button>
              <button className="px-4 py-2 bg-surface text-foreground rounded-lg hover:bg-secondary" style={{ borderRadius: 'var(--radius-md)' }}>
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-1 bg-surface rounded-lg p-1 w-fit" style={{ borderRadius: 'var(--radius-md)' }}>
            {[
              { id: 'graph', label: 'Neural Map', icon: Network },
              { id: 'metrics', label: 'Performance', icon: BarChart3 },
              { id: 'learning', label: 'Learning', icon: Brain },
            ].map((mode) => (
              <button
                key={mode.id}
                onClick={() => setViewMode(mode.id as any)}
                className={`px-4 py-2 rounded transition-all flex items-center gap-2 ${
                  viewMode === mode.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-text-secondary hover:text-foreground'
                }`}
                style={{ 
                  borderRadius: 'var(--radius-sm)',
                  fontSize: 'var(--text-sm)'
                }}
              >
                <mode.icon className="w-4 h-4" />
                {mode.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1800px] mx-auto px-6 py-8">
        {viewMode === 'graph' && (
          <div className="grid grid-cols-3 gap-6">
            {/* Neural Graph Visualization */}
            <div className="col-span-2">
              <motion.div
                className="bg-card border border-border rounded-lg overflow-hidden relative"
                style={{ 
                  borderRadius: 'var(--radius-lg)',
                  height: '600px'
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {/* Story Mode Overlay */}
                <AnimatePresence>
                  {storyMode && (
                    <motion.div
                      className="absolute top-6 left-6 right-6 z-20 bg-accent/95 rounded-lg p-4"
                      style={{ borderRadius: 'var(--radius-lg)' }}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                    >
                      <p className="text-white" style={{ fontSize: 'var(--text-sm)', lineHeight: '1.6' }}>
                        {storySteps[storyStep].text}
                      </p>
                      <div className="flex items-center gap-2 mt-3">
                        {storySteps.map((_, idx) => (
                          <div
                            key={idx}
                            className="h-1 flex-1 rounded-full"
                            style={{
                              backgroundColor: idx === storyStep ? '#fff' : 'rgba(255,255,255,0.3)',
                              borderRadius: 'var(--radius-pill)'
                            }}
                          />
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* SVG Graph */}
                <svg width="100%" height="100%" viewBox="0 0 800 600">
                  {/* Connection Lines */}
                  <g>
                    {/* Supervisor connections */}
                    {agents.filter(a => a.id !== 'supervisor').map(agent => {
                      const supervisor = agents.find(a => a.id === 'supervisor')!;
                      const isActive = storyMode && storySteps[storyStep].agents.includes(agent.id);
                      return renderConnection(supervisor, agent, isActive);
                    })}

                    {/* Specific collaborations */}
                    {renderConnection(getAgentById('inbox')!, getAgentById('calendar')!, false)}
                    {renderConnection(getAgentById('calendar')!, getAgentById('travel')!, false)}
                    {renderConnection(getAgentById('meeting')!, getAgentById('task')!, false)}
                    {renderConnection(getAgentById('meeting')!, getAgentById('insight')!, false)}
                    {renderConnection(getAgentById('insight')!, getAgentById('narrative')!, false)}
                    {renderConnection(getAgentById('travel')!, getAgentById('expense')!, false)}
                    {renderConnection(getAgentById('task')!, getAgentById('insight')!, false)}
                  </g>

                  {/* Agent Nodes */}
                  {agents.map((agent, idx) => {
                    const isSelected = selectedAgent?.id === agent.id;
                    const isHighlighted = storyMode && storySteps[storyStep].agents.includes(agent.id);
                    
                    return (
                      <motion.g
                        key={agent.id}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.05, duration: 0.3 }}
                        onClick={() => setSelectedAgent(agent)}
                        style={{ cursor: 'pointer' }}
                      >
                        {/* Pulse Ring */}
                        {pulseAnimation && agent.status === 'active' && (
                          <motion.circle
                            cx={agent.x}
                            cy={agent.y}
                            r={agent.size / 2 + 5}
                            fill="none"
                            stroke={agent.color}
                            strokeWidth="2"
                            strokeOpacity="0.4"
                            animate={{
                              r: [agent.size / 2 + 5, agent.size / 2 + 15],
                              strokeOpacity: [0.4, 0],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: 'easeOut',
                            }}
                          />
                        )}

                        {/* Main Node Circle */}
                        <motion.circle
                          cx={agent.x}
                          cy={agent.y}
                          r={agent.size / 2}
                          fill={isSelected || isHighlighted ? agent.color : `${agent.color}40`}
                          stroke={agent.color}
                          strokeWidth={isSelected ? 3 : 2}
                          animate={{
                            fill: isHighlighted
                              ? [agent.color, `${agent.color}60`, agent.color]
                              : isSelected
                              ? agent.color
                              : `${agent.color}40`,
                          }}
                          transition={{
                            duration: isHighlighted ? 1.5 : 0.3,
                            repeat: isHighlighted ? Infinity : 0,
                          }}
                        />

                        {/* Activity Indicator */}
                        <circle
                          cx={agent.x + agent.size / 2 - 8}
                          cy={agent.y - agent.size / 2 + 8}
                          r="4"
                          fill={
                            agent.status === 'active'
                              ? '#107C10'
                              : agent.status === 'learning'
                              ? '#FF8C00'
                              : '#8A8886'
                          }
                        />

                        {/* Agent Label */}
                        <text
                          x={agent.x}
                          y={agent.y + agent.size / 2 + 20}
                          textAnchor="middle"
                          fill="var(--foreground)"
                          fontSize="12"
                          fontWeight={isSelected ? 600 : 400}
                        >
                          {agent.name}
                        </text>
                      </motion.g>
                    );
                  })}
                </svg>

                {/* Legend */}
                <div className="absolute bottom-4 left-4 bg-surface/95 rounded-lg p-3" style={{ borderRadius: 'var(--radius-md)' }}>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-success" />
                      <span className="text-text-secondary" style={{ fontSize: 'var(--text-xs)' }}>
                        Active
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-warning" />
                      <span className="text-text-secondary" style={{ fontSize: 'var(--text-xs)' }}>
                        Learning
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-text-muted" />
                      <span className="text-text-secondary" style={{ fontSize: 'var(--text-xs)' }}>
                        Idle
                      </span>
                    </div>
                  </div>
                </div>

                {/* Story Mode Caption */}
                {storyMode && (
                  <div className="absolute bottom-4 right-4 bg-surface/95 rounded-lg p-3" style={{ borderRadius: 'var(--radius-md)' }}>
                    <p className="text-text-secondary italic" style={{ fontSize: 'var(--text-xs)' }}>
                      "While you led the business, your AI team led the information."
                    </p>
                  </div>
                )}
              </motion.div>

              {/* Orchestration Timeline */}
              <motion.div
                className="mt-6 bg-card border border-border rounded-lg p-6"
                style={{ borderRadius: 'var(--radius-lg)' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-primary" />
                    Agent Orchestration Timeline
                  </h3>
                  <button
                    onClick={() => setShowTimeline(!showTimeline)}
                    className="text-primary hover:underline"
                    style={{ fontSize: 'var(--text-sm)' }}
                  >
                    {showTimeline ? 'Hide' : 'Show'} Details
                  </button>
                </div>

                {showTimeline && (
                  <div className="space-y-3">
                    {orchestrationEvents.map((event, idx) => (
                      <motion.div
                        key={idx}
                        className="p-4 bg-surface rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer"
                        style={{ borderRadius: 'var(--radius-md)' }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="mb-1">{event.event}</p>
                            <p className="text-text-secondary" style={{ fontSize: 'var(--text-sm)' }}>
                              {event.narrative}
                            </p>
                          </div>
                          <span className="text-text-muted" style={{ fontSize: 'var(--text-xs)' }}>
                            {event.time}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-3">
                          {event.agents.map((agentId) => {
                            const agent = getAgentById(agentId);
                            if (!agent) return null;
                            return (
                              <div
                                key={agentId}
                                className="px-2 py-1 rounded flex items-center gap-1"
                                style={{
                                  backgroundColor: agent.color + '20',
                                  fontSize: 'var(--text-xs)',
                                  borderRadius: 'var(--radius-sm)'
                                }}
                              >
                                <div
                                  className="w-2 h-2 rounded-full"
                                  style={{ backgroundColor: agent.color }}
                                />
                                <span style={{ color: agent.color }}>{agent.name}</span>
                              </div>
                            );
                          })}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            </div>

            {/* Agent Detail Panel */}
            <div className="col-span-1">
              <AnimatePresence mode="wait">
                {selectedAgent ? (
                  <motion.div
                    key={selectedAgent.id}
                    className="bg-card border border-border rounded-lg overflow-hidden sticky top-40"
                    style={{ borderRadius: 'var(--radius-lg)' }}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Header */}
                    <div className="p-6 border-b border-border bg-surface">
                      <div className="flex items-start justify-between mb-4">
                        <div
                          className="w-14 h-14 rounded-lg flex items-center justify-center"
                          style={{
                            backgroundColor: selectedAgent.color + '20',
                            borderRadius: 'var(--radius-md)'
                          }}
                        >
                          <selectedAgent.icon className="w-7 h-7" style={{ color: selectedAgent.color }} />
                        </div>
                        <button
                          onClick={() => setSelectedAgent(null)}
                          className="p-2 hover:bg-background rounded-lg transition-colors"
                          style={{ borderRadius: 'var(--radius-md)' }}
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <h3 className="mb-2">{selectedAgent.name}</h3>
                      <div className="flex items-center gap-3 mb-4">
                        <span
                          className="px-2 py-1 rounded-full flex items-center gap-1"
                          style={{
                            backgroundColor: '#107C1020',
                            color: '#107C10',
                            fontSize: 'var(--text-xs)',
                            borderRadius: 'var(--radius-pill)'
                          }}
                        >
                          <div className="w-2 h-2 rounded-full bg-success" />
                          Active
                        </span>
                        <span className="text-text-secondary" style={{ fontSize: 'var(--text-xs)' }}>
                          Confidence: {selectedAgent.confidence}%
                        </span>
                      </div>
                      <p className="text-text-secondary" style={{ fontSize: 'var(--text-sm)' }}>
                        Mode: <span className="text-foreground">{selectedAgent.mode}</span>
                      </p>
                    </div>

                    {/* Description */}
                    <div className="p-6 border-b border-border">
                      <p className="text-text-secondary" style={{ fontSize: 'var(--text-sm)', lineHeight: '1.6' }}>
                        "{selectedAgent.description}"
                      </p>
                    </div>

                    {/* Recent Activity */}
                    <div className="p-6 border-b border-border">
                      <h4 className="mb-4">Recent Activity</h4>
                      <div className="space-y-3">
                        {selectedAgent.recentActions.map((action, idx) => (
                          <div key={idx} className="text-sm">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-text-muted" style={{ fontSize: 'var(--text-xs)' }}>
                                {action.time}
                              </span>
                            </div>
                            <p className="mb-1" style={{ fontSize: 'var(--text-sm)' }}>
                              {action.action}
                            </p>
                            <p className="text-text-secondary" style={{ fontSize: 'var(--text-xs)' }}>
                              → {action.outcome}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Learning Feed */}
                    <div className="p-6 border-b border-border">
                      <h4 className="mb-3 flex items-center gap-2">
                        <Brain className="w-4 h-4 text-accent" />
                        Learning Feed
                      </h4>
                      <p
                        className="text-text-secondary"
                        style={{ fontSize: 'var(--text-sm)', lineHeight: '1.6' }}
                      >
                        {selectedAgent.learning}
                      </p>
                    </div>

                    {/* Collaboration Network */}
                    <div className="p-6">
                      <h4 className="mb-3">Collaboration Network</h4>
                      <p className="text-text-muted mb-3" style={{ fontSize: 'var(--text-xs)' }}>
                        Works with:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {selectedAgent.collaborators.map((collabId) => {
                          const collab = getAgentById(collabId);
                          if (!collab || collabId === 'all-agents') return (
                            <span
                              key={collabId}
                              className="px-2 py-1 bg-surface text-text-secondary rounded"
                              style={{
                                fontSize: 'var(--text-xs)',
                                borderRadius: 'var(--radius-sm)'
                              }}
                            >
                              All Agents
                            </span>
                          );
                          return (
                            <button
                              key={collabId}
                              onClick={() => setSelectedAgent(collab)}
                              className="px-2 py-1 rounded flex items-center gap-1 hover:opacity-80 transition-opacity"
                              style={{
                                backgroundColor: collab.color + '20',
                                color: collab.color,
                                fontSize: 'var(--text-xs)',
                                borderRadius: 'var(--radius-sm)'
                              }}
                            >
                              <div
                                className="w-2 h-2 rounded-full"
                                style={{ backgroundColor: collab.color }}
                              />
                              {collab.name}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="placeholder"
                    className="bg-card border border-border rounded-lg p-8 flex flex-col items-center justify-center text-center h-full"
                    style={{ borderRadius: 'var(--radius-lg)', minHeight: '400px' }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <Network className="w-12 h-12 text-text-muted mb-4" />
                    <h3 className="mb-2">Select an Agent</h3>
                    <p className="text-text-secondary" style={{ fontSize: 'var(--text-sm)' }}>
                      Click any agent node to view detailed information about its role, activity, and learning progress.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}

        {viewMode === 'metrics' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-card border border-border rounded-lg overflow-hidden" style={{ borderRadius: 'var(--radius-lg)' }}>
              <table className="w-full">
                <thead className="bg-surface border-b border-border">
                  <tr>
                    <th className="text-left p-4 text-text-muted" style={{ fontSize: 'var(--text-xs)' }}>Agent</th>
                    <th className="text-left p-4 text-text-muted" style={{ fontSize: 'var(--text-xs)' }}>Activity (24h)</th>
                    <th className="text-left p-4 text-text-muted" style={{ fontSize: 'var(--text-xs)' }}>Confidence</th>
                    <th className="text-left p-4 text-text-muted" style={{ fontSize: 'var(--text-xs)' }}>Trend</th>
                    <th className="text-left p-4 text-text-muted" style={{ fontSize: 'var(--text-xs)' }}>AI Self-Assessment</th>
                  </tr>
                </thead>
                <tbody>
                  {agents.map((agent, idx) => (
                    <motion.tr
                      key={agent.id}
                      className="border-b border-border last:border-0 hover:bg-surface transition-colors cursor-pointer"
                      onClick={() => {
                        setSelectedAgent(agent);
                        setViewMode('graph');
                      }}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-10 h-10 rounded flex items-center justify-center"
                            style={{
                              backgroundColor: agent.color + '20',
                              borderRadius: 'var(--radius-sm)'
                            }}
                          >
                            <agent.icon className="w-5 h-5" style={{ color: agent.color }} />
                          </div>
                          <span style={{ fontSize: 'var(--text-sm)' }}>{agent.name}</span>
                        </div>
                      </td>
                      <td className="p-4 text-text-secondary" style={{ fontSize: 'var(--text-sm)' }}>
                        {agent.actions24h}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-background rounded-full h-1.5" style={{ borderRadius: 'var(--radius-pill)' }}>
                            <div
                              className="h-1.5 rounded-full"
                              style={{
                                width: `${agent.confidence}%`,
                                backgroundColor: agent.confidence >= 95 ? '#107C10' : agent.confidence >= 90 ? '#4F6BED' : '#FF8C00',
                                borderRadius: 'var(--radius-pill)'
                              }}
                            />
                          </div>
                          <span style={{ fontSize: 'var(--text-sm)' }}>{agent.confidence}%</span>
                        </div>
                      </td>
                      <td className="p-4">
                        {agent.trend > 0 && (
                          <div className="flex items-center gap-1 text-success">
                            <ArrowUpRight className="w-4 h-4" />
                            <span style={{ fontSize: 'var(--text-sm)' }}>+{agent.trend}%</span>
                          </div>
                        )}
                        {agent.trend < 0 && (
                          <div className="flex items-center gap-1 text-error">
                            <ArrowDownRight className="w-4 h-4" />
                            <span style={{ fontSize: 'var(--text-sm)' }}>{agent.trend}%</span>
                          </div>
                        )}
                        {agent.trend === 0 && (
                          <div className="flex items-center gap-1 text-text-muted">
                            <Minus className="w-4 h-4" />
                          </div>
                        )}
                      </td>
                      <td className="p-4 text-text-secondary" style={{ fontSize: 'var(--text-sm)' }}>
                        {agent.selfAssessment}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Narrative Insight */}
            <motion.div
              className="mt-6 bg-card border border-border rounded-lg p-6"
              style={{ borderRadius: 'var(--radius-lg)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-accent" />
                AI Ecosystem Health
              </h3>
              <p className="text-text-secondary mb-4" style={{ fontSize: 'var(--text-sm)', lineHeight: '1.6' }}>
                Your AI ecosystem is stable and continuously learning. This week, the Scheduler Agent improved 
                context sensitivity by 7%, and the Meeting Agent reduced redundant follow-ups by 12%. 
                The system has autonomously executed 74% of non-critical administrative tasks — saving an estimated 6.3 hours.
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-4 gap-4">
                {[
                  { label: 'Decisions Processed', value: '1,200', icon: Brain },
                  { label: 'Hours Saved/Week', value: '8.2', icon: Clock },
                  { label: 'Summary Accuracy', value: '94%', icon: Target },
                  { label: 'Policy Compliance', value: '100%', icon: Shield },
                ].map((stat, idx) => (
                  <motion.div
                    key={idx}
                    className="p-4 bg-surface rounded-lg"
                    style={{ borderRadius: 'var(--radius-md)' }}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + idx * 0.05 }}
                  >
                    <stat.icon className="w-5 h-5 text-primary mb-2" />
                    <p style={{ fontSize: 'var(--text-2xl)' }}>{stat.value}</p>
                    <p className="text-text-muted" style={{ fontSize: 'var(--text-xs)' }}>
                      {stat.label}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}

        {viewMode === 'learning' && (
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {/* Collective Pulse */}
            <div className="bg-card border border-border rounded-lg p-8 text-center" style={{ borderRadius: 'var(--radius-lg)' }}>
              <motion.div
                className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center relative"
                style={{ backgroundColor: '#886CE420' }}
                animate={{
                  boxShadow: [
                    '0 0 0 0 rgba(136, 108, 228, 0.4)',
                    '0 0 0 20px rgba(136, 108, 228, 0)',
                    '0 0 0 0 rgba(136, 108, 228, 0)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <BookOpen className="w-12 h-12 text-accent" />
              </motion.div>

              <h2 className="mb-4">Collective Learning Layer</h2>
              <p className="text-text-secondary mb-6 max-w-2xl mx-auto" style={{ fontSize: 'var(--text-sm)', lineHeight: '1.6' }}>
                Each time you approve, override, or reject a suggestion — the system learns. 
                Over the last month, your choices have shaped <strong>14 new micro-models</strong> tuned to your leadership style.
              </p>

              <div className="inline-flex items-center gap-3 px-6 py-3 bg-accent/10 rounded-lg" style={{ borderRadius: 'var(--radius-lg)' }}>
                <Award className="w-6 h-6 text-accent" />
                <div className="text-left">
                  <p className="text-text-muted mb-1" style={{ fontSize: 'var(--text-xs)' }}>
                    AI Maturity Score
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-accent" style={{ fontSize: 'var(--text-3xl)' }}>82%</span>
                    <span className="text-success" style={{ fontSize: 'var(--text-sm)' }}>
                      Steadily evolving
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Learning Insights Grid */}
            <div className="grid grid-cols-2 gap-6">
              {[
                {
                  title: 'Preference Learning',
                  description: 'System has identified 23 consistent patterns in your decision-making.',
                  examples: ['Prefers morning strategic time', 'Minimizes cross-functional syncs', 'Prioritizes Pet segment updates'],
                  icon: Target,
                  color: '#4F6BED'
                },
                {
                  title: 'Intervention Analysis',
                  description: '41 manual interventions this month — 39 accepted, 2 overridden.',
                  examples: ['95% acceptance rate', 'Learning from overrides', 'Confidence improving'],
                  icon: ThumbsUp,
                  color: '#107C10'
                },
                {
                  title: 'Model Refinement',
                  description: '14 micro-models updated based on feedback loops.',
                  examples: ['Email priority scoring', 'Meeting duration estimation', 'Task categorization'],
                  icon: Settings,
                  color: '#886CE4'
                },
                {
                  title: 'Autonomy Progress',
                  description: 'System autonomy increased from 68% to 74% this month.',
                  examples: ['More auto-approvals', 'Fewer confirmations needed', 'Trust level rising'],
                  icon: Zap,
                  color: '#FF8C00'
                },
              ].map((insight, idx) => (
                <motion.div
                  key={idx}
                  className="bg-card border border-border rounded-lg p-6"
                  style={{ borderRadius: 'var(--radius-lg)' }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                    style={{
                      backgroundColor: insight.color + '20',
                      borderRadius: 'var(--radius-md)'
                    }}
                  >
                    <insight.icon className="w-6 h-6" style={{ color: insight.color }} />
                  </div>
                  <h3 className="mb-3">{insight.title}</h3>
                  <p className="text-text-secondary mb-4" style={{ fontSize: 'var(--text-sm)', lineHeight: '1.6' }}>
                    {insight.description}
                  </p>
                  <ul className="space-y-2">
                    {insight.examples.map((example, exIdx) => (
                      <li key={exIdx} className="flex items-center gap-2 text-text-secondary" style={{ fontSize: 'var(--text-sm)' }}>
                        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: insight.color }} />
                        {example}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            {/* Trust Message */}
            <motion.div
              className="bg-card border border-primary/30 rounded-lg p-8 text-center"
              style={{ borderRadius: 'var(--radius-lg)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Heart className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="mb-4">From Transparency to Trust</h2>
              <div className="grid grid-cols-5 gap-6 mb-6 max-w-4xl mx-auto">
                {[
                  { label: 'Decisions processed', value: '1,200', suffix: 'this month' },
                  { label: 'Hours saved', value: '8.2', suffix: 'per week' },
                  { label: 'AI accuracy', value: '94%', suffix: 'summaries' },
                  { label: 'Interventions', value: '41', suffix: '39 accepted' },
                  { label: 'Compliance', value: '100%', suffix: 'maintained' },
                ].map((stat, idx) => (
                  <div key={idx}>
                    <p className="text-primary mb-1" style={{ fontSize: 'var(--text-2xl)' }}>
                      {stat.value}
                    </p>
                    <p className="text-text-muted" style={{ fontSize: 'var(--text-xs)' }}>
                      {stat.label}
                    </p>
                    <p className="text-text-secondary" style={{ fontSize: 'var(--text-xs)' }}>
                      {stat.suffix}
                    </p>
                  </div>
                ))}
              </div>
              <p className="text-text-secondary italic max-w-2xl mx-auto" style={{ fontSize: 'var(--text-sm)', lineHeight: '1.6' }}>
                "Every insight, every action, every optimization — is the product of a digital team 
                you don't have to manage, but that always manages for you."
              </p>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
