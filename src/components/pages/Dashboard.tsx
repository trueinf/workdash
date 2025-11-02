import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Search, ChevronDown, MessageSquare, User, BarChart3, Clock,
  CheckCircle, TrendingUp, TrendingDown, Zap, DollarSign,
  Calendar, Users, Target, Brain, Shield, Lightbulb, AlertCircle,
  ArrowUpRight, ArrowDownRight, Minus, Package, Briefcase,
  Mail, FileText, Activity, Sparkles, Settings, Download,
  Share2, Plus, Filter, Globe, PieChart, Flame, Heart,
  ThumbsUp, Smile, Meh, Frown
} from 'lucide-react';

export function Dashboard() {
  const [selectedView, setSelectedView] = useState('week');
  const [selectedBrandTab, setSelectedBrandTab] = useState('nar');

  const viewOptions = ['Week', 'Month', 'Quarter', 'Custom'];

  const topKPIs = [
    {
      id: 1,
      icon: Brain,
      label: 'Strategic Time Ratio',
      value: '42%',
      breakdown: '42% Strategic / 28% Operational / 30% Admin',
      trend: 4,
      insight: 'Up 4% from last week — optimized by AI reschedules.',
      color: '#4F6BED'
    },
    {
      id: 2,
      icon: CheckCircle,
      label: 'Task Completion Rate',
      value: '83%',
      trend: 6,
      insight: 'Upward trend — Marketing and Pet Ops improved.',
      color: '#107C10'
    },
    {
      id: 3,
      icon: Users,
      label: 'Meeting Efficiency Score',
      value: '7.9',
      subtitle: '/ 10',
      trend: 0.3,
      insight: 'Average meeting reduced by 11 mins.',
      color: '#886CE4'
    },
    {
      id: 4,
      icon: Clock,
      label: 'Avg. Decision Turnaround',
      value: '14hrs',
      trend: -5,
      trendLabel: '−5 hrs',
      insight: 'AI auto-routed 8 approvals.',
      color: '#4F6BED'
    },
    {
      id: 5,
      icon: Shield,
      label: 'Expense Policy Compliance',
      value: '96%',
      trend: 2,
      insight: 'Hotel rate exception resolved automatically.',
      color: '#107C10'
    },
  ];

  const timeAllocation = [
    { category: 'Strategic', hours: 16.8, percent: 42, color: '#4F6BED' },
    { category: 'Operational', hours: 11.2, percent: 28, color: '#0078D4' },
    { category: 'Admin', hours: 12, percent: 30, color: '#8A8886' },
  ];

  const taskProgress = [
    { category: 'Marketing', done: 23, pending: 4, trend: 'up' },
    { category: 'Finance', done: 18, pending: 3, trend: 'up' },
    { category: 'Pet Ops', done: 15, pending: 6, trend: 'neutral' },
    { category: 'Retail', done: 10, pending: 7, trend: 'down' },
    { category: 'Innovation', done: 8, pending: 5, trend: 'up' },
  ];

  const brandPerformance = [
    { brand: 'Cheerios', trend: 2.1, sentiment: 'positive', insight: 'Strong ROI from campaign relaunch.', icon: Smile },
    { brand: 'Nature Valley', trend: -1.2, sentiment: 'neutral', insight: 'Inventory issue flagged by Ops.', icon: Meh },
    { brand: "Annie's", trend: -3.4, sentiment: 'negative', insight: 'Media spend inefficiency detected.', icon: Frown },
    { brand: 'Blue Buffalo', trend: 5.7, sentiment: 'positive', insight: 'Pet innovation rollout exceeding forecast.', icon: Smile },
  ];

  const aiInsights = [
    {
      id: 1,
      type: 'risk',
      icon: AlertCircle,
      title: 'Emerging Risk',
      description: 'Two consecutive Pet Ops meetings flagged delays in packaging vendor onboarding. AI confidence 91% — projected slip risk: 8 days.',
      actions: ['Open Meeting Record', 'Notify Ops Lead'],
      confidence: 91,
      severity: 'warning'
    },
    {
      id: 2,
      type: 'focus',
      icon: Target,
      title: 'Team Focus Drift',
      description: 'Time spent in internal syncs increased +14% week-over-week. Suggest merging Ops and Marketing updates under a single cross-functional hub.',
      actions: ['Simulate Change', 'View Impact'],
      confidence: 87,
      severity: 'info'
    },
    {
      id: 3,
      type: 'learning',
      icon: Zap,
      title: 'AI Learning Update',
      description: 'Task agent autonomously reclassified 5 recurring items as automation candidates. Time saved: 4.2 hrs per week.',
      actions: ['Approve Auto Mode', 'See Details'],
      confidence: 95,
      severity: 'success'
    },
    {
      id: 4,
      type: 'positive',
      icon: TrendingUp,
      title: 'Positive Trend',
      description: 'Blue Buffalo ROI up +11% MoM; Cheerios Q4 ad recall at record high (92%). Brand equity composite at +7% YoY.',
      actions: ['Generate Executive Deck'],
      confidence: 98,
      severity: 'success'
    },
  ];

  const agentHealth = [
    { agent: 'Email Agent', icon: Mail, actions: '112 classified', confidence: 96, trend: 2, note: 'Stable' },
    { agent: 'Scheduler Agent', icon: Calendar, actions: '18 reschedules', confidence: 92, trend: 0, note: 'Improved preference learning' },
    { agent: 'Meeting Agent', icon: Users, actions: '7 summaries', confidence: 94, trend: 0, note: 'Reduced transcription errors' },
    { agent: 'Task Agent', icon: CheckCircle, actions: '34 tasks tracked', confidence: 97, trend: 0, note: '+11% closure' },
    { agent: 'Expense Agent', icon: DollarSign, actions: '9 reports', confidence: 93, trend: 0, note: 'Auto-reconciliation success' },
    { agent: 'Guardrail Agent', icon: Shield, actions: '4 interventions', confidence: 100, trend: 0, note: 'All policy-compliant' },
  ];

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return '#107C10';
      case 'neutral': return '#FF8C00';
      case 'negative': return '#D13438';
      default: return '#8A8886';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'warning': return '#FF8C00';
      case 'success': return '#107C10';
      case 'info': return '#4F6BED';
      default: return '#8A8886';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header Command Bar */}
      <div className="sticky top-16 z-40 bg-card border-b border-border">
        <div className="max-w-[1800px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left: Search & Filters */}
            <div className="flex items-center gap-3 flex-1">
              <div className="relative max-w-md flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
                <input
                  type="text"
                  placeholder="Search across brands, meetings, insights…"
                  className="w-full pl-10 pr-4 py-2 bg-surface border border-border rounded-lg text-foreground placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary"
                  style={{ 
                    borderRadius: 'var(--radius-md)',
                    fontSize: 'var(--text-sm)'
                  }}
                />
              </div>

              {/* View Selector */}
              <div className="flex items-center gap-1 bg-surface rounded-lg p-1" style={{ borderRadius: 'var(--radius-md)' }}>
                {viewOptions.map((view) => (
                  <button
                    key={view}
                    onClick={() => setSelectedView(view.toLowerCase())}
                    className={`px-3 py-1.5 rounded transition-all ${
                      selectedView === view.toLowerCase()
                        ? 'bg-primary text-primary-foreground'
                        : 'text-text-secondary hover:text-foreground'
                    }`}
                    style={{ 
                      borderRadius: 'var(--radius-sm)',
                      fontSize: 'var(--text-sm)'
                    }}
                  >
                    {view}
                  </button>
                ))}
              </div>
            </div>

            {/* Right: AI Actions */}
            <div className="flex items-center gap-2">
              <button 
                className="px-4 py-2 bg-surface text-foreground rounded-lg hover:bg-secondary transition-colors flex items-center gap-2"
                style={{ borderRadius: 'var(--radius-md)' }}
              >
                <MessageSquare className="w-4 h-4" />
                <span style={{ fontSize: 'var(--text-sm)' }}>Ask Shield</span>
              </button>
              <button 
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2"
                style={{ borderRadius: 'var(--radius-md)' }}
              >
                <FileText className="w-4 h-4" />
                <span style={{ fontSize: 'var(--text-sm)' }}>Weekly Briefing</span>
              </button>
              <button 
                className="px-4 py-2 bg-surface text-foreground rounded-lg hover:bg-secondary transition-colors flex items-center gap-2"
                style={{ borderRadius: 'var(--radius-md)' }}
              >
                <Download className="w-4 h-4" />
              </button>
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center ml-2">
                <span className="text-primary-foreground" style={{ fontSize: 'var(--text-sm)' }}>DM</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1800px] mx-auto px-6 py-8 space-y-8">
        {/* Top Summary KPIs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="grid grid-cols-5 gap-6">
            {topKPIs.map((kpi, index) => (
              <motion.div
                key={kpi.id}
                className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-all cursor-pointer group"
                style={{ borderRadius: 'var(--radius-lg)' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                whileHover={{ y: -4 }}
                title={kpi.insight}
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ 
                      backgroundColor: kpi.color + '20',
                      borderRadius: 'var(--radius-md)'
                    }}
                  >
                    <kpi.icon className="w-6 h-6" style={{ color: kpi.color }} />
                  </div>
                  {kpi.trend !== undefined && (
                    <div className="flex items-center gap-1">
                      {kpi.trend > 0 ? (
                        <ArrowUpRight className="w-4 h-4 text-success" />
                      ) : kpi.trend < 0 ? (
                        <ArrowDownRight className="w-4 h-4 text-success" />
                      ) : (
                        <Minus className="w-4 h-4 text-text-muted" />
                      )}
                      <span 
                        className={kpi.trend > 0 ? 'text-success' : kpi.trend < 0 ? 'text-success' : 'text-text-muted'}
                        style={{ fontSize: 'var(--text-sm)' }}
                      >
                        {kpi.trendLabel || (kpi.trend > 0 ? `+${kpi.trend}%` : kpi.trend < 0 ? `${kpi.trend}%` : '—')}
                      </span>
                    </div>
                  )}
                </div>

                <p className="text-text-muted mb-2" style={{ fontSize: 'var(--text-xs)' }}>
                  {kpi.label}
                </p>

                <div className="flex items-baseline gap-1 mb-2">
                  <span style={{ fontSize: 'var(--text-3xl)', color: kpi.color }}>
                    {kpi.value}
                  </span>
                  {kpi.subtitle && (
                    <span className="text-text-secondary" style={{ fontSize: 'var(--text-lg)' }}>
                      {kpi.subtitle}
                    </span>
                  )}
                </div>

                {kpi.breakdown && (
                  <p className="text-text-secondary" style={{ fontSize: 'var(--text-xs)' }}>
                    {kpi.breakdown}
                  </p>
                )}

                {/* Sparkline placeholder - shown on hover */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity mt-3">
                  <div className="h-8 flex items-end gap-0.5">
                    {[65, 70, 68, 75, 72, 78, 82].map((height, idx) => (
                      <div
                        key={idx}
                        className="flex-1 rounded-sm"
                        style={{ 
                          height: `${height}%`,
                          backgroundColor: kpi.color + '40',
                          borderRadius: 'var(--radius-xs)'
                        }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Performance Visualization Grid */}
        <div className="grid grid-cols-2 gap-6">
          {/* Panel A: Time Allocation */}
          <motion.div
            className="bg-card border border-border rounded-lg p-6"
            style={{ borderRadius: 'var(--radius-lg)' }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.3 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="flex items-center gap-2">
                <PieChart className="w-5 h-5 text-primary" />
                Time Allocation Heatmap
              </h3>
              <button className="p-2 hover:bg-surface rounded-lg transition-colors" style={{ borderRadius: 'var(--radius-md)' }}>
                <BarChart3 className="w-4 h-4 text-text-secondary" />
              </button>
            </div>

            {/* Donut Chart Representation */}
            <div className="flex items-center justify-center mb-6">
              <div className="relative w-48 h-48">
                <svg className="transform -rotate-90" width="192" height="192">
                  {/* Strategic - 42% */}
                  <circle
                    cx="96"
                    cy="96"
                    r="70"
                    stroke="#4F6BED"
                    strokeWidth="28"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 70 * 0.42} ${2 * Math.PI * 70}`}
                    strokeLinecap="round"
                  />
                  {/* Operational - 28% */}
                  <circle
                    cx="96"
                    cy="96"
                    r="70"
                    stroke="#0078D4"
                    strokeWidth="28"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 70 * 0.28} ${2 * Math.PI * 70}`}
                    strokeDashoffset={`${-2 * Math.PI * 70 * 0.42}`}
                    strokeLinecap="round"
                  />
                  {/* Admin - 30% */}
                  <circle
                    cx="96"
                    cy="96"
                    r="70"
                    stroke="#8A8886"
                    strokeWidth="28"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 70 * 0.30} ${2 * Math.PI * 70}`}
                    strokeDashoffset={`${-2 * Math.PI * 70 * 0.70}`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <span className="text-text-muted" style={{ fontSize: 'var(--text-xs)' }}>Total</span>
                  <span style={{ fontSize: 'var(--text-2xl)' }}>40h</span>
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="space-y-3">
              {timeAllocation.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-3 h-3 rounded"
                      style={{ 
                        backgroundColor: item.color,
                        borderRadius: 'var(--radius-sm)'
                      }}
                    />
                    <span style={{ fontSize: 'var(--text-sm)' }}>{item.category}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-text-secondary" style={{ fontSize: 'var(--text-sm)' }}>
                      {item.hours}h
                    </span>
                    <span style={{ fontSize: 'var(--text-sm)', color: item.color }}>
                      {item.percent}%
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* AI Suggestion */}
            <div 
              className="mt-6 p-3 rounded-lg border border-primary/30"
              style={{ 
                backgroundColor: 'var(--primary)',
                opacity: 0.05,
                borderRadius: 'var(--radius-md)'
              }}
            >
              <p className="text-foreground flex items-start gap-2" style={{ fontSize: 'var(--text-sm)' }}>
                <Lightbulb className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                Suggested redistribution: move 1.5 hrs from admin to strategic prep.
              </p>
            </div>
          </motion.div>

          {/* Panel B: Meeting Insights */}
          <motion.div
            className="bg-card border border-border rounded-lg p-6"
            style={{ borderRadius: 'var(--radius-lg)' }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.3 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="flex items-center gap-2">
                <Users className="w-5 h-5 text-accent" />
                Meeting Insights Dashboard
              </h3>
              <button className="p-2 hover:bg-surface rounded-lg transition-colors" style={{ borderRadius: 'var(--radius-md)' }}>
                <ChevronDown className="w-4 h-4 text-text-secondary" />
              </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div 
                className="p-4 rounded-lg"
                style={{ 
                  backgroundColor: 'var(--surface)',
                  borderRadius: 'var(--radius-md)'
                }}
              >
                <p className="text-text-muted mb-1" style={{ fontSize: 'var(--text-xs)' }}>
                  Total Meetings
                </p>
                <p style={{ fontSize: 'var(--text-2xl)' }}>17</p>
              </div>
              <div 
                className="p-4 rounded-lg"
                style={{ 
                  backgroundColor: 'var(--surface)',
                  borderRadius: 'var(--radius-md)'
                }}
              >
                <p className="text-text-muted mb-1" style={{ fontSize: 'var(--text-xs)' }}>
                  Avg Duration
                </p>
                <p style={{ fontSize: 'var(--text-2xl)' }}>52m</p>
              </div>
              <div 
                className="p-4 rounded-lg"
                style={{ 
                  backgroundColor: 'var(--surface)',
                  borderRadius: 'var(--radius-md)'
                }}
              >
                <p className="text-text-muted mb-1" style={{ fontSize: 'var(--text-xs)' }}>
                  Sentiment
                </p>
                <div className="flex items-center gap-1">
                  <span style={{ fontSize: 'var(--text-2xl)' }}>68%</span>
                  <ThumbsUp className="w-4 h-4 text-success" />
                </div>
              </div>
            </div>

            {/* AI-Detected Themes */}
            <div className="mb-6">
              <p className="text-text-muted mb-3" style={{ fontSize: 'var(--text-xs)' }}>
                AI-Detected Themes:
              </p>
              <div className="flex flex-wrap gap-2">
                {['Margin pressure', 'Innovation alignment', 'Retail relationships'].map((theme) => (
                  <span
                    key={theme}
                    className="px-3 py-1 bg-primary/10 text-primary rounded-full"
                    style={{ 
                      fontSize: 'var(--text-sm)',
                      borderRadius: 'var(--radius-pill)'
                    }}
                  >
                    {theme}
                  </span>
                ))}
              </div>
            </div>

            {/* Sentiment Trend */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-text-muted" style={{ fontSize: 'var(--text-xs)' }}>
                  Sentiment Trend
                </span>
                <span className="text-success flex items-center gap-1" style={{ fontSize: 'var(--text-sm)' }}>
                  <ArrowUpRight className="w-3 h-3" />
                  +5%
                </span>
              </div>
              <div className="h-16 flex items-end gap-1">
                {[55, 60, 58, 65, 62, 68, 68].map((height, idx) => (
                  <div
                    key={idx}
                    className="flex-1 rounded-t"
                    style={{ 
                      height: `${height}%`,
                      backgroundColor: '#886CE4',
                      borderRadius: 'var(--radius-xs) var(--radius-xs) 0 0'
                    }}
                  />
                ))}
              </div>
            </div>

            {/* AI Suggestion */}
            <div 
              className="p-3 rounded-lg"
              style={{ 
                backgroundColor: 'var(--surface)',
                borderRadius: 'var(--radius-md)'
              }}
            >
              <p className="text-text-secondary flex items-start gap-2" style={{ fontSize: 'var(--text-sm)' }}>
                <Brain className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                Reduce cross-functional syncs by 1 per week to increase focus time.
              </p>
            </div>
          </motion.div>

          {/* Panel C: Task Progress Tracker */}
          <motion.div
            className="bg-card border border-border rounded-lg p-6"
            style={{ borderRadius: 'var(--radius-lg)' }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.3 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-success" />
                Task Progress Tracker
              </h3>
              <button className="px-3 py-1.5 bg-surface text-foreground rounded-lg hover:bg-secondary" style={{ borderRadius: 'var(--radius-md)', fontSize: 'var(--text-sm)' }}>
                View All
              </button>
            </div>

            <div className="space-y-4">
              {taskProgress.map((item, idx) => (
                <motion.div
                  key={item.category}
                  className="p-4 bg-surface rounded-lg"
                  style={{ borderRadius: 'var(--radius-md)' }}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + idx * 0.05 }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span style={{ fontSize: 'var(--text-sm)' }}>{item.category}</span>
                      {item.trend === 'up' && <ArrowUpRight className="w-3.5 h-3.5 text-success" />}
                      {item.trend === 'down' && <ArrowDownRight className="w-3.5 h-3.5 text-error" />}
                      {item.trend === 'neutral' && <Minus className="w-3.5 h-3.5 text-text-muted" />}
                    </div>
                    <div className="flex items-center gap-3 text-text-secondary" style={{ fontSize: 'var(--text-sm)' }}>
                      <span>{item.done} done</span>
                      <span>•</span>
                      <span>{item.pending} pending</span>
                    </div>
                  </div>
                  <div className="w-full bg-background rounded-full h-2" style={{ borderRadius: 'var(--radius-pill)' }}>
                    <div 
                      className="h-2 rounded-full" 
                      style={{ 
                        width: `${(item.done / (item.done + item.pending)) * 100}%`,
                        backgroundColor: item.trend === 'up' ? '#107C10' : item.trend === 'down' ? '#D13438' : '#4F6BED',
                        borderRadius: 'var(--radius-pill)'
                      }} 
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* AI Summary */}
            <div 
              className="mt-6 p-4 rounded-lg border border-warning/30"
              style={{ 
                backgroundColor: 'var(--warning)',
                opacity: 0.05,
                borderRadius: 'var(--radius-md)'
              }}
            >
              <p className="text-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                <strong>AI Summary:</strong> Execution bottleneck in Retail due to overlapping follow-ups. 
                Recommend merging duplicate workflows.
              </p>
            </div>
          </motion.div>

          {/* Panel D: Brand Performance Snapshot */}
          <motion.div
            className="bg-card border border-border rounded-lg p-6"
            style={{ borderRadius: 'var(--radius-lg)' }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.3 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="flex items-center gap-2">
                <Package className="w-5 h-5 text-primary" />
                Brand Performance Snapshot
              </h3>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 bg-surface text-foreground rounded-lg hover:bg-secondary" style={{ borderRadius: 'var(--radius-md)', fontSize: 'var(--text-sm)' }}>
                  Compare
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {brandPerformance.map((brand, idx) => (
                <motion.div
                  key={brand.brand}
                  className="p-4 bg-surface rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer"
                  style={{ borderRadius: 'var(--radius-md)' }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + idx * 0.05 }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span style={{ fontSize: 'var(--text-sm)' }}>{brand.brand}</span>
                        <brand.icon 
                          className="w-4 h-4" 
                          style={{ color: getSentimentColor(brand.sentiment) }}
                        />
                      </div>
                      <p className="text-text-secondary" style={{ fontSize: 'var(--text-xs)' }}>
                        {brand.insight}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 ml-3">
                      {brand.trend > 0 ? (
                        <ArrowUpRight className="w-4 h-4 text-success" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4 text-error" />
                      )}
                      <span 
                        className={brand.trend > 0 ? 'text-success' : 'text-error'}
                        style={{ fontSize: 'var(--text-sm)' }}
                      >
                        {brand.trend > 0 ? '+' : ''}{brand.trend}%
                      </span>
                    </div>
                  </div>

                  {/* Mini bar */}
                  <div className="w-full bg-background rounded-full h-1.5" style={{ borderRadius: 'var(--radius-pill)' }}>
                    <div 
                      className="h-1.5 rounded-full" 
                      style={{ 
                        width: `${Math.abs(brand.trend) * 10}%`,
                        backgroundColor: brand.trend > 0 ? '#107C10' : '#D13438',
                        borderRadius: 'var(--radius-pill)'
                      }} 
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 flex gap-2">
              <button 
                className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90"
                style={{ borderRadius: 'var(--radius-md)', fontSize: 'var(--text-sm)' }}
              >
                Generate Brand Report
              </button>
            </div>
          </motion.div>
        </div>

        {/* AI Insights Feed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.3 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-accent" />
              AI Insights Feed
            </h2>
            <button className="text-primary hover:underline" style={{ fontSize: 'var(--text-sm)' }}>
              View All Insights
            </button>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {aiInsights.map((insight, idx) => (
              <motion.div
                key={insight.id}
                className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-all cursor-pointer"
                style={{ 
                  borderRadius: 'var(--radius-lg)',
                  borderLeftWidth: '4px',
                  borderLeftColor: getSeverityColor(insight.severity)
                }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + idx * 0.1 }}
                whileHover={{ y: -2 }}
              >
                <div className="flex items-start gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ 
                      backgroundColor: getSeverityColor(insight.severity) + '20',
                      borderRadius: 'var(--radius-md)'
                    }}
                  >
                    <insight.icon 
                      className="w-5 h-5" 
                      style={{ color: getSeverityColor(insight.severity) }}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4>{insight.title}</h4>
                      <div className="flex items-center gap-1 text-text-muted" style={{ fontSize: 'var(--text-xs)' }}>
                        <Brain className="w-3 h-3" />
                        <span>{insight.confidence}%</span>
                      </div>
                    </div>
                    <p className="text-text-secondary mb-4" style={{ fontSize: 'var(--text-sm)', lineHeight: '1.6' }}>
                      {insight.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {insight.actions.map((action, actionIdx) => (
                        <button
                          key={actionIdx}
                          className={`px-3 py-1.5 rounded-lg transition-all ${
                            actionIdx === 0
                              ? 'bg-primary text-primary-foreground hover:opacity-90'
                              : 'bg-surface text-foreground hover:bg-secondary'
                          }`}
                          style={{ 
                            fontSize: 'var(--text-xs)',
                            borderRadius: 'var(--radius-md)'
                          }}
                        >
                          {action}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Agent Health & Transparency */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.3 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="flex items-center gap-2">
              <Activity className="w-6 h-6 text-primary" />
              Agent Health & Transparency
            </h2>
            <button className="px-4 py-2 bg-surface text-foreground rounded-lg hover:bg-secondary flex items-center gap-2" style={{ borderRadius: 'var(--radius-md)' }}>
              <Settings className="w-4 h-4" />
              <span style={{ fontSize: 'var(--text-sm)' }}>Adjust Autonomy</span>
            </button>
          </div>

          <div className="bg-card border border-border rounded-lg overflow-hidden" style={{ borderRadius: 'var(--radius-lg)' }}>
            <table className="w-full">
              <thead className="bg-surface border-b border-border">
                <tr>
                  <th className="text-left p-4 text-text-muted" style={{ fontSize: 'var(--text-xs)' }}>Agent</th>
                  <th className="text-left p-4 text-text-muted" style={{ fontSize: 'var(--text-xs)' }}>Recent Actions</th>
                  <th className="text-left p-4 text-text-muted" style={{ fontSize: 'var(--text-xs)' }}>Confidence</th>
                  <th className="text-left p-4 text-text-muted" style={{ fontSize: 'var(--text-xs)' }}>Note</th>
                </tr>
              </thead>
              <tbody>
                {agentHealth.map((agent, idx) => (
                  <motion.tr
                    key={agent.agent}
                    className="border-b border-border last:border-0 hover:bg-surface transition-colors"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.1 + idx * 0.05 }}
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded flex items-center justify-center"
                          style={{ 
                            backgroundColor: '#4F6BED20',
                            borderRadius: 'var(--radius-sm)'
                          }}
                        >
                          <agent.icon className="w-4 h-4 text-primary" />
                        </div>
                        <span style={{ fontSize: 'var(--text-sm)' }}>{agent.agent}</span>
                      </div>
                    </td>
                    <td className="p-4 text-text-secondary" style={{ fontSize: 'var(--text-sm)' }}>
                      {agent.actions}
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
                        {agent.trend > 0 && <ArrowUpRight className="w-3 h-3 text-success" />}
                      </div>
                    </td>
                    <td className="p-4 text-text-secondary" style={{ fontSize: 'var(--text-sm)' }}>
                      {agent.note}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          <div 
            className="mt-4 p-4 rounded-lg flex items-start gap-3"
            style={{ 
              backgroundColor: 'var(--surface)',
              borderRadius: 'var(--radius-md)'
            }}
          >
            <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
            <div>
              <p style={{ fontSize: 'var(--text-sm)' }}>
                <strong>AI Health Insight:</strong> All agents operational. 
                Scheduler Agent learning curve improving — auto-approval accuracy +5%.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Footer: Brand Drill-Down */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.3 }}
        >
          <div className="bg-card border border-border rounded-lg p-6" style={{ borderRadius: 'var(--radius-lg)' }}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <h2>Portfolio Deep Dive</h2>
                <div className="flex items-center gap-1 bg-surface rounded-lg p-1" style={{ borderRadius: 'var(--radius-md)' }}>
                  {['NAR (Retail)', 'NAP (Pet)', 'Marketing', 'Innovation'].map((tab, idx) => (
                    <button
                      key={tab}
                      onClick={() => setSelectedBrandTab(tab.toLowerCase().split(' ')[0])}
                      className={`px-3 py-1.5 rounded transition-all ${
                        selectedBrandTab === tab.toLowerCase().split(' ')[0]
                          ? 'bg-primary text-primary-foreground'
                          : 'text-text-secondary hover:text-foreground'
                      }`}
                      style={{ 
                        borderRadius: 'var(--radius-sm)',
                        fontSize: 'var(--text-sm)'
                      }}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 flex items-center gap-2" style={{ borderRadius: 'var(--radius-md)' }}>
                <Share2 className="w-4 h-4" />
                <span style={{ fontSize: 'var(--text-sm)' }}>Share to CEO</span>
              </button>
            </div>

            {selectedBrandTab === 'nap' && (
              <div className="space-y-6">
                <div>
                  <p className="text-text-muted mb-2" style={{ fontSize: 'var(--text-sm)' }}>Total Revenue YTD</p>
                  <div className="flex items-baseline gap-2">
                    <span style={{ fontSize: 'var(--text-3xl)' }}>$3.4B</span>
                    <span className="text-success flex items-center gap-1" style={{ fontSize: 'var(--text-lg)' }}>
                      <ArrowUpRight className="w-4 h-4" />
                      +5.2%
                    </span>
                  </div>
                </div>

                <div 
                  className="p-4 rounded-lg"
                  style={{ 
                    backgroundColor: 'var(--surface)',
                    borderRadius: 'var(--radius-md)'
                  }}
                >
                  <h4 className="mb-3 flex items-center gap-2">
                    <Brain className="w-5 h-5 text-accent" />
                    AI Narrative
                  </h4>
                  <p className="text-text-secondary" style={{ fontSize: 'var(--text-sm)', lineHeight: '1.6' }}>
                    "Pet category leading growth via Blue Buffalo and Tiki Pets.
                    Margin stability achieved through proactive supplier AI alerts."
                  </p>
                </div>

                <div className="grid grid-cols-4 gap-4">
                  {[
                    { label: 'Brand Health', value: '8.2/10', color: '#107C10' },
                    { label: 'Sentiment', value: '72%', color: '#4F6BED' },
                    { label: 'Growth %', value: '+5.2%', color: '#107C10' },
                    { label: 'Expense-to-Revenue', value: '12.3%', color: '#FF8C00' },
                  ].map((kpi, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-lg"
                      style={{ 
                        backgroundColor: 'var(--surface)',
                        borderRadius: 'var(--radius-md)'
                      }}
                    >
                      <p className="text-text-muted mb-2" style={{ fontSize: 'var(--text-xs)' }}>
                        {kpi.label}
                      </p>
                      <p style={{ fontSize: 'var(--text-xl)', color: kpi.color }}>
                        {kpi.value}
                      </p>
                    </div>
                  ))}
                </div>

                <button 
                  className="w-full px-4 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90"
                  style={{ borderRadius: 'var(--radius-md)' }}
                >
                  Generate Segment Brief
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
