import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ListChecks, Clock, CheckCircle, AlertCircle, Flag, Users, 
  TrendingUp, Zap, MessageSquare, ChevronRight, X, Edit3,
  Calendar, User, Target, FileText, Link2, Activity,
  Bell, Send, ArrowRight, BarChart3, Package, DollarSign,
  Lightbulb, Brain, Shield, Play, Repeat, Share2, Plus,
  ChevronDown, Check, AlertTriangle, Sparkles, PieChart,
  ArrowUpRight, Filter, Search, MoreHorizontal
} from 'lucide-react';

export function TasksFollowups() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedTask, setSelectedTask] = useState<number | null>(1);
  const [showDetailPanel, setShowDetailPanel] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  const filterTabs = [
    { id: 'all', label: 'All', count: 12 },
    { id: 'high-priority', label: 'High Priority', count: 4 },
    { id: 'pending-approval', label: 'Pending Approval', count: 3 },
    { id: 'due-this-week', label: 'Due This Week', count: 7 },
    { id: 'completed', label: 'Completed', count: 8 },
  ];

  const tasks = [
    {
      id: 1,
      title: 'Approve Blue Buffalo Fall Creative',
      source: 'Meeting (Pet Segment Review)',
      sourceType: 'meeting',
      assignedTo: 'Dana',
      due: 'Today (EOD)',
      dueDate: new Date(),
      aiContext: 'This approval unblocks $2.1M campaign execution. Delay impacts media bookings.',
      badges: ['Creative', 'Pet Segment', 'High Priority'],
      priority: 'high',
      status: 'pending',
      confidence: 97,
      category: 'approval'
    },
    {
      id: 2,
      title: 'Review Chex Mix Margin Proposal',
      source: 'Email (Finance Team)',
      sourceType: 'email',
      assignedTo: 'Dana',
      due: 'Tomorrow',
      dueDate: new Date(Date.now() + 86400000),
      aiContext: 'Proposal aims to recover −1.8% margin through SKU optimization. CFO awaiting approval.',
      badges: ['Finance', 'Retail', 'Margin Recovery'],
      priority: 'high',
      status: 'in-review',
      confidence: 94,
      category: 'review'
    },
    {
      id: 3,
      title: 'Align Brand Messaging for Annie\'s & Nature Valley',
      source: 'AI Insight (Brand Consistency Pattern)',
      sourceType: 'insight',
      assignedTo: 'Marketing Lead',
      due: 'Fri',
      dueDate: new Date(Date.now() + 259200000),
      aiContext: 'Detected inconsistent tone across Q1 campaigns. Suggest 1:1 with Brand GMs.',
      badges: ['Brand', 'Marketing', 'Insight-Generated'],
      priority: 'medium',
      status: 'active',
      confidence: 88,
      category: 'coordination'
    },
    {
      id: 4,
      title: 'Update Pet Segment P&L',
      source: 'Meeting Summary (Investor Prep)',
      sourceType: 'meeting',
      assignedTo: 'Finance Ops',
      due: 'Today',
      dueDate: new Date(),
      aiContext: 'Required for Investor Call tomorrow; ensure updated margins reflect cost adjustments.',
      badges: ['Finance', 'Pet', 'Investor'],
      priority: 'high',
      status: 'completed',
      confidence: 99,
      category: 'reporting'
    },
    {
      id: 5,
      title: 'Schedule Retail Partner Sync - Target',
      source: 'Email (Category Lead)',
      sourceType: 'email',
      assignedTo: 'Dana',
      due: 'Wed',
      dueDate: new Date(Date.now() + 172800000),
      aiContext: 'Target requesting quarterly business review; align on shelf reset timeline.',
      badges: ['Retail', 'Partner', 'Scheduling'],
      priority: 'medium',
      status: 'pending',
      confidence: 91,
      category: 'meeting'
    },
  ];

  const insights = [
    {
      id: 1,
      type: 'bottleneck',
      title: 'Bottleneck Alert',
      description: 'Marketing approvals delayed 3 days average; impacting 4 brand initiatives.',
      suggestion: 'Enable auto-approval for <$1M campaigns.',
      actions: ['Simulate Impact', 'Notify Marketing Ops'],
      confidence: 89,
      severity: 'warning'
    },
    {
      id: 2,
      type: 'recurring',
      title: 'AI Detected Recurring Task Loop',
      description: '\'Pet Ops Report\' recreated weekly — convert to automated recurring task?',
      actions: ['Automate Recurrence', 'Dismiss'],
      confidence: 92,
      severity: 'info'
    },
    {
      id: 3,
      type: 'trend',
      title: 'Completion Rate Trend',
      description: 'Task completion up +11% week-over-week. Top contributors: Pet Ops, Brand GMs.',
      suggestion: 'Share recognition summary with team?',
      actions: ['Generate Recognition Note'],
      confidence: 95,
      severity: 'success'
    },
  ];

  const criticalDeadlines = [
    { task: 'Approve Blue Buffalo Creative', owner: 'Dana', due: 'Today', impact: 'High' },
    { task: 'Update P&L for Investor Prep', owner: 'Finance', due: 'Today', impact: 'High' },
    { task: 'Review Chex Margin Proposal', owner: 'Dana', due: 'Tomorrow', impact: 'Medium' },
  ];

  const dependencies = [
    { task: 'Finalize media slots', owner: 'Marketing Ops', status: 'in-progress' },
    { task: 'Confirm copy tone', owner: 'Creative Director', status: 'pending' },
    { task: 'Send approved deck to Retail Partners', owner: 'Comms', status: 'pending' },
  ];

  const progressKPIs = [
    { label: 'Avg. task closure time', value: '1.8 days', icon: Clock, color: '#4F6BED' },
    { label: 'AI-generated tasks completed', value: '63%', icon: Brain, color: '#886CE4' },
    { label: 'Tasks with comments', value: '42%', icon: MessageSquare, color: '#107C10' },
    { label: 'Recurring tasks automated', value: '9%', icon: Repeat, color: '#FF8C00' },
  ];

  const selectedTaskData = tasks.find(t => t.id === selectedTask);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#D13438';
      case 'medium': return '#FF8C00';
      case 'low': return '#107C10';
      default: return '#8A8886';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'in-review': return <Activity className="w-4 h-4" />;
      case 'active': return <Play className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return '#107C10';
      case 'in-review': return '#4F6BED';
      case 'active': return '#107C10';
      case 'pending': return '#FF8C00';
      default: return '#8A8886';
    }
  };

  const getSourceIcon = (sourceType: string) => {
    switch (sourceType) {
      case 'meeting': return <Users className="w-3.5 h-3.5" />;
      case 'email': return <MessageSquare className="w-3.5 h-3.5" />;
      case 'insight': return <Sparkles className="w-3.5 h-3.5" />;
      default: return <FileText className="w-3.5 h-3.5" />;
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
    <div className="flex flex-col h-[calc(100vh-64px)] bg-background overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-border bg-card">
        <div className="flex items-center justify-between max-w-[1800px] mx-auto">
          <div className="flex items-center gap-3">
            <ListChecks className="w-5 h-5 text-primary" />
            <h2 className="text-foreground">Tasks & Follow-Ups</h2>
          </div>
          <div className="flex items-center gap-2">
            <button 
              className="px-4 py-2 bg-surface text-foreground rounded-lg hover:bg-secondary transition-colors flex items-center gap-2"
              style={{ borderRadius: 'var(--radius-md)' }}
            >
              <Search className="w-4 h-4" />
              <span style={{ fontSize: 'var(--text-sm)' }}>Search tasks</span>
            </button>
            <button 
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2"
              style={{ borderRadius: 'var(--radius-md)' }}
            >
              <Plus className="w-4 h-4" />
              <span style={{ fontSize: 'var(--text-sm)' }}>New Task</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left - Task Board */}
        <motion.div 
          className="w-[420px] bg-background border-r border-border flex-shrink-0 flex flex-col overflow-hidden"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {/* Filter Tabs */}
          <div className="px-4 py-3 border-b border-border bg-card">
            <div className="flex items-center gap-2 overflow-x-auto">
              {filterTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedFilter(tab.id)}
                  className={`px-3 py-2 rounded-lg whitespace-nowrap transition-all flex items-center gap-2 ${
                    selectedFilter === tab.id
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-surface text-text-secondary hover:bg-secondary hover:text-foreground'
                  }`}
                  style={{ 
                    borderRadius: 'var(--radius-md)',
                    fontSize: 'var(--text-sm)',
                    transition: 'var(--transition-fast)'
                  }}
                >
                  {tab.label}
                  <span 
                    className="px-1.5 py-0.5 rounded-full"
                    style={{ 
                      backgroundColor: selectedFilter === tab.id ? 'rgba(255,255,255,0.2)' : 'var(--background)',
                      fontSize: 'var(--text-xs)',
                      borderRadius: 'var(--radius-pill)'
                    }}
                  >
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Task List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {tasks.map((task, index) => (
              <motion.div
                key={task.id}
                onClick={() => {
                  setSelectedTask(task.id);
                  setShowDetailPanel(true);
                }}
                className={`bg-card border rounded-lg p-4 cursor-pointer transition-all ${
                  selectedTask === task.id 
                    ? 'border-primary ring-2 ring-primary/20' 
                    : 'border-border hover:border-primary/50'
                }`}
                style={{ 
                  borderRadius: 'var(--radius-lg)',
                  transition: 'var(--transition-fast)'
                }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.2 }}
                whileHover={{ y: -2 }}
              >
                {/* Priority Flag */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Flag 
                      className="w-4 h-4 flex-shrink-0" 
                      style={{ color: getPriorityColor(task.priority) }}
                      fill={task.priority === 'high' ? getPriorityColor(task.priority) : 'none'}
                    />
                    <h4 className="flex-1">{task.title}</h4>
                  </div>
                  <div 
                    className="px-2 py-1 rounded-full flex items-center gap-1 flex-shrink-0"
                    style={{ 
                      backgroundColor: getStatusColor(task.status) + '20',
                      color: getStatusColor(task.status),
                      fontSize: 'var(--text-xs)',
                      borderRadius: 'var(--radius-pill)'
                    }}
                  >
                    {getStatusIcon(task.status)}
                  </div>
                </div>

                {/* Source & Due Date */}
                <div className="flex items-center gap-3 mb-3 text-text-secondary" style={{ fontSize: 'var(--text-xs)' }}>
                  <div className="flex items-center gap-1">
                    {getSourceIcon(task.sourceType)}
                    <span>{task.source}</span>
                  </div>
                </div>

                {/* Assignment & Due */}
                <div className="flex items-center gap-3 mb-3 text-text-secondary" style={{ fontSize: 'var(--text-xs)' }}>
                  <div className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5" />
                    <span>{task.assignedTo}</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{task.due}</span>
                  </div>
                </div>

                {/* AI Context */}
                <div 
                  className="p-3 rounded-lg mb-3 border border-primary/20"
                  style={{ 
                    backgroundColor: 'var(--surface)',
                    borderRadius: 'var(--radius-md)'
                  }}
                >
                  <div className="flex items-start gap-2 mb-1">
                    <Brain className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-text-muted" style={{ fontSize: 'var(--text-xs)' }}>
                      AI Context
                    </span>
                  </div>
                  <p style={{ fontSize: 'var(--text-xs)' }}>{task.aiContext}</p>
                </div>

                {/* Badges */}
                <div className="flex items-center gap-2 flex-wrap mb-3">
                  {task.badges.slice(0, 3).map((badge) => (
                    <span
                      key={badge}
                      className="px-2 py-0.5 bg-secondary text-primary rounded"
                      style={{ 
                        fontSize: 'var(--text-xs)',
                        borderRadius: 'var(--radius-sm)'
                      }}
                    >
                      {badge}
                    </span>
                  ))}
                </div>

                {/* Confidence & Quick Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-text-secondary" style={{ fontSize: 'var(--text-xs)' }}>
                    <Sparkles className="w-3.5 h-3.5 text-primary" />
                    <span>AI: {task.confidence}%</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {task.status === 'pending' && (
                      <button 
                        className="px-3 py-1 bg-primary text-primary-foreground rounded hover:opacity-90"
                        style={{ 
                          fontSize: 'var(--text-xs)',
                          borderRadius: 'var(--radius-sm)'
                        }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        Approve
                      </button>
                    )}
                    <button 
                      className="p-1.5 hover:bg-surface rounded"
                      style={{ borderRadius: 'var(--radius-sm)' }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <MoreHorizontal className="w-4 h-4 text-text-secondary" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Center - AI Insights Column */}
        <div className="w-[380px] bg-card border-r border-border flex-shrink-0 overflow-y-auto p-6">
          <h3 className="mb-4 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-accent" />
            AI Insights
          </h3>

          <div className="space-y-4">
            {/* Insights Cards */}
            {insights.map((insight, index) => (
              <motion.div
                key={insight.id}
                className="bg-surface border border-border rounded-lg p-4"
                style={{ 
                  borderRadius: 'var(--radius-lg)',
                  borderLeftWidth: '4px',
                  borderLeftColor: getSeverityColor(insight.severity)
                }}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.2 }}
              >
                <div className="flex items-start gap-2 mb-3">
                  {insight.type === 'bottleneck' && <AlertTriangle className="w-5 h-5 text-warning flex-shrink-0" />}
                  {insight.type === 'recurring' && <Repeat className="w-5 h-5 text-primary flex-shrink-0" />}
                  {insight.type === 'trend' && <TrendingUp className="w-5 h-5 text-success flex-shrink-0" />}
                  <div className="flex-1">
                    <h4 className="mb-1">{insight.title}</h4>
                    {insight.confidence && (
                      <div className="flex items-center gap-1 text-text-muted mb-2" style={{ fontSize: 'var(--text-xs)' }}>
                        <Brain className="w-3 h-3" />
                        <span>Confidence: {insight.confidence}%</span>
                      </div>
                    )}
                  </div>
                </div>

                <p className="text-text-secondary mb-3" style={{ fontSize: 'var(--text-sm)' }}>
                  {insight.description}
                </p>

                {insight.suggestion && (
                  <div 
                    className="p-2 rounded mb-3"
                    style={{ 
                      backgroundColor: 'var(--primary)',
                      opacity: 0.1,
                      borderRadius: 'var(--radius-sm)'
                    }}
                  >
                    <p className="text-foreground" style={{ fontSize: 'var(--text-xs)' }}>
                      💡 {insight.suggestion}
                    </p>
                  </div>
                )}

                <div className="flex flex-wrap gap-2">
                  {insight.actions.map((action) => (
                    <button
                      key={action}
                      className="px-3 py-1.5 bg-primary text-primary-foreground rounded hover:opacity-90 transition-opacity"
                      style={{ 
                        fontSize: 'var(--text-xs)',
                        borderRadius: 'var(--radius-md)'
                      }}
                    >
                      {action}
                    </button>
                  ))}
                </div>
              </motion.div>
            ))}

            {/* Critical Deadlines */}
            <motion.div
              className="bg-background border border-error/30 rounded-lg p-4"
              style={{ borderRadius: 'var(--radius-lg)' }}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.2 }}
            >
              <h4 className="mb-3 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-error" />
                Critical Deadlines (Next 48 hrs)
              </h4>

              <div className="space-y-3 mb-4">
                {criticalDeadlines.map((deadline, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-surface rounded"
                    style={{ borderRadius: 'var(--radius-md)' }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <p style={{ fontSize: 'var(--text-sm)' }}>{deadline.task}</p>
                      <span 
                        className="px-2 py-0.5 rounded-full"
                        style={{ 
                          backgroundColor: deadline.impact === 'High' ? '#D1343820' : '#FF8C0020',
                          color: deadline.impact === 'High' ? '#D13438' : '#FF8C00',
                          fontSize: 'var(--text-xs)',
                          borderRadius: 'var(--radius-pill)'
                        }}
                      >
                        {deadline.impact}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-text-secondary" style={{ fontSize: 'var(--text-xs)' }}>
                      <span>{deadline.owner}</span>
                      <span>•</span>
                      <span>{deadline.due}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <button 
                  className="flex-1 px-3 py-2 bg-primary text-primary-foreground rounded hover:opacity-90"
                  style={{ 
                    fontSize: 'var(--text-xs)',
                    borderRadius: 'var(--radius-md)'
                  }}
                >
                  Generate Summary to Teams
                </button>
                <button 
                  className="px-3 py-2 bg-surface text-foreground rounded hover:bg-secondary"
                  style={{ 
                    fontSize: 'var(--text-xs)',
                    borderRadius: 'var(--radius-md)'
                  }}
                >
                  Add Reminders
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right - Task Detail & Action Panel */}
        <AnimatePresence>
          {showDetailPanel && selectedTaskData && (
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
              <div className="max-w-4xl mx-auto p-8 space-y-6">
                {/* Header */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <Flag 
                          className="w-6 h-6" 
                          style={{ color: getPriorityColor(selectedTaskData.priority) }}
                          fill={selectedTaskData.priority === 'high' ? getPriorityColor(selectedTaskData.priority) : 'none'}
                        />
                        <h1>{selectedTaskData.title}</h1>
                      </div>

                      <div className="flex items-center gap-4 text-text-secondary mb-4" style={{ fontSize: 'var(--text-sm)' }}>
                        <div className="flex items-center gap-1">
                          {getSourceIcon(selectedTaskData.sourceType)}
                          <span>{selectedTaskData.source}</span>
                        </div>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>Due: {selectedTaskData.due}</span>
                        </div>
                        <span>•</span>
                        <div 
                          className="px-3 py-1 rounded-full flex items-center gap-1"
                          style={{ 
                            backgroundColor: getPriorityColor(selectedTaskData.priority) + '20',
                            color: getPriorityColor(selectedTaskData.priority),
                            fontSize: 'var(--text-xs)',
                            borderRadius: 'var(--radius-pill)'
                          }}
                        >
                          <Flag className="w-3 h-3" />
                          <span className="capitalize">{selectedTaskData.priority} Priority</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-text-muted" style={{ fontSize: 'var(--text-sm)' }}>
                          AI Confidence:
                        </span>
                        <div className="flex items-center gap-2">
                          <div className="w-32 bg-background rounded-full h-2" style={{ borderRadius: 'var(--radius-pill)' }}>
                            <div 
                              className="bg-success h-2 rounded-full" 
                              style={{ 
                                width: `${selectedTaskData.confidence}%`,
                                borderRadius: 'var(--radius-pill)'
                              }} 
                            />
                          </div>
                          <span className="text-success">{selectedTaskData.confidence}%</span>
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
                      <Check className="w-4 h-4" />
                      <span style={{ fontSize: 'var(--text-sm)' }}>Approve</span>
                    </button>
                    <button 
                      className="px-4 py-2 bg-surface text-foreground rounded-lg hover:bg-secondary transition-colors flex items-center gap-2"
                      style={{ borderRadius: 'var(--radius-md)' }}
                    >
                      <Users className="w-4 h-4" />
                      <span style={{ fontSize: 'var(--text-sm)' }}>Reassign</span>
                    </button>
                    <button 
                      className="px-4 py-2 bg-surface text-foreground rounded-lg hover:bg-secondary transition-colors flex items-center gap-2"
                      style={{ borderRadius: 'var(--radius-md)' }}
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span style={{ fontSize: 'var(--text-sm)' }}>Add Comment</span>
                    </button>
                    <button 
                      className="px-4 py-2 bg-surface text-foreground rounded-lg hover:bg-secondary transition-colors flex items-center gap-2"
                      style={{ borderRadius: 'var(--radius-md)' }}
                    >
                      <AlertCircle className="w-4 h-4" />
                      <span style={{ fontSize: 'var(--text-sm)' }}>Request Clarification</span>
                    </button>
                  </div>
                </motion.div>

                {/* Tabs */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex items-center gap-2 border-b border-border mb-6">
                    {[
                      { id: 'overview', label: 'Overview', icon: Target },
                      { id: 'context', label: 'Context & Reasoning', icon: Brain },
                      { id: 'dependencies', label: 'Dependencies', icon: Link2 },
                      { id: 'history', label: 'History & Explainability', icon: Activity },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-4 py-3 flex items-center gap-2 border-b-2 transition-all ${
                          activeTab === tab.id
                            ? 'border-primary text-primary'
                            : 'border-transparent text-text-secondary hover:text-foreground'
                        }`}
                        style={{ fontSize: 'var(--text-sm)' }}
                      >
                        <tab.icon className="w-4 h-4" />
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </motion.div>

                {/* Tab Content */}
                <AnimatePresence mode="wait">
                  {activeTab === 'overview' && (
                    <motion.div
                      key="overview"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-6"
                    >
                      <div className="bg-card border border-border rounded-lg p-6" style={{ borderRadius: 'var(--radius-lg)' }}>
                        <p className="mb-6" style={{ fontSize: 'var(--text-sm)', lineHeight: '1.6' }}>
                          "Creative brief for the Fall Pet campaign reviewed in Monday's meeting.
                          Dana to finalize approval before media buy deadline (Nov 3)."
                        </p>

                        <div className="grid grid-cols-2 gap-6">
                          <div>
                            <span className="text-text-muted mb-2 block" style={{ fontSize: 'var(--text-xs)' }}>
                              Owner:
                            </span>
                            <div className="flex items-center gap-2">
                              <div
                                className="w-8 h-8 rounded-full bg-primary flex items-center justify-center"
                                style={{ borderRadius: 'var(--radius-full)' }}
                              >
                                <span className="text-primary-foreground" style={{ fontSize: 'var(--text-xs)' }}>
                                  DM
                                </span>
                              </div>
                              <span>{selectedTaskData.assignedTo}</span>
                            </div>
                          </div>

                          <div>
                            <span className="text-text-muted mb-2 block" style={{ fontSize: 'var(--text-xs)' }}>
                              Status:
                            </span>
                            <div 
                              className="inline-flex items-center gap-2 px-3 py-1 rounded-full"
                              style={{ 
                                backgroundColor: getStatusColor(selectedTaskData.status) + '20',
                                color: getStatusColor(selectedTaskData.status),
                                borderRadius: 'var(--radius-pill)'
                              }}
                            >
                              {getStatusIcon(selectedTaskData.status)}
                              <span className="capitalize" style={{ fontSize: 'var(--text-sm)' }}>
                                {selectedTaskData.status.replace('-', ' ')}
                              </span>
                            </div>
                          </div>

                          <div>
                            <span className="text-text-muted mb-2 block" style={{ fontSize: 'var(--text-xs)' }}>
                              Estimated Impact:
                            </span>
                            <p className="text-success">$2.1M in projected reach</p>
                          </div>

                          <div>
                            <span className="text-text-muted mb-2 block" style={{ fontSize: 'var(--text-xs)' }}>
                              Related Brand:
                            </span>
                            <p>Blue Buffalo</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-card border border-border rounded-lg p-6" style={{ borderRadius: 'var(--radius-lg)' }}>
                        <h3 className="mb-4">Linked Resources</h3>
                        <div className="space-y-3">
                          {[
                            { label: 'Meeting Summary PDF', icon: FileText },
                            { label: 'Marketing Deck (OneDrive link)', icon: Package },
                            { label: 'Prior Creative Approvals Thread', icon: MessageSquare },
                          ].map((resource, idx) => (
                            <button
                              key={idx}
                              className="w-full flex items-center justify-between p-3 bg-surface rounded-lg hover:bg-secondary transition-colors"
                              style={{ borderRadius: 'var(--radius-md)' }}
                            >
                              <div className="flex items-center gap-2">
                                <resource.icon className="w-4 h-4 text-primary" />
                                <span style={{ fontSize: 'var(--text-sm)' }}>{resource.label}</span>
                              </div>
                              <ArrowRight className="w-4 h-4 text-text-secondary" />
                            </button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'context' && (
                    <motion.div
                      key="context"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-6"
                    >
                      <div className="bg-card border border-border rounded-lg p-6" style={{ borderRadius: 'var(--radius-lg)' }}>
                        <h3 className="mb-4 flex items-center gap-2">
                          <Brain className="w-5 h-5 text-accent" />
                          AI Reasoning Summary
                        </h3>
                        <p className="mb-6" style={{ fontSize: 'var(--text-sm)', lineHeight: '1.6' }}>
                          "Task classified as high priority due to dependency on media booking cutoff.
                          Detected sentiment of urgency in meeting transcript ('cannot delay another week')."
                        </p>

                        <div 
                          className="p-4 rounded-lg"
                          style={{ 
                            backgroundColor: 'var(--surface)',
                            borderRadius: 'var(--radius-md)'
                          }}
                        >
                          <span className="text-text-muted mb-3 block" style={{ fontSize: 'var(--text-xs)' }}>
                            Key Context Factors:
                          </span>
                          <div className="space-y-2">
                            {[
                              'Media booking deadline: Nov 3',
                              'Campaign budget: $2.1M',
                              'Approval required from GM level',
                              'Impact on Q4 revenue targets'
                            ].map((factor, idx) => (
                              <div key={idx} className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                                <span style={{ fontSize: 'var(--text-sm)' }}>{factor}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'dependencies' && (
                    <motion.div
                      key="dependencies"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-6"
                    >
                      <div className="bg-card border border-border rounded-lg p-6" style={{ borderRadius: 'var(--radius-lg)' }}>
                        <h3 className="mb-4">Dependent Tasks</h3>
                        <div className="space-y-3 mb-6">
                          {dependencies.map((dep, idx) => (
                            <div
                              key={idx}
                              className="p-4 bg-surface rounded-lg flex items-center justify-between"
                              style={{ borderRadius: 'var(--radius-md)' }}
                            >
                              <div className="flex-1">
                                <p className="mb-1">{dep.task}</p>
                                <span className="text-text-secondary" style={{ fontSize: 'var(--text-xs)' }}>
                                  Owner: {dep.owner}
                                </span>
                              </div>
                              <span 
                                className="px-3 py-1 rounded-full capitalize"
                                style={{ 
                                  backgroundColor: dep.status === 'in-progress' ? '#4F6BED20' : '#FF8C0020',
                                  color: dep.status === 'in-progress' ? '#4F6BED' : '#FF8C00',
                                  fontSize: 'var(--text-xs)',
                                  borderRadius: 'var(--radius-pill)'
                                }}
                              >
                                {dep.status.replace('-', ' ')}
                              </span>
                            </div>
                          ))}
                        </div>

                        <div 
                          className="p-4 rounded-lg border border-primary/30"
                          style={{ 
                            backgroundColor: 'var(--primary)',
                            opacity: 0.05,
                            borderRadius: 'var(--radius-md)'
                          }}
                        >
                          <div className="flex items-start gap-2 mb-3">
                            <Lightbulb className="w-5 h-5 text-accent flex-shrink-0" />
                            <p className="text-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                              AI Suggestion: Auto-notify dependents post approval.
                            </p>
                          </div>
                          <button 
                            className="px-4 py-2 bg-accent text-white rounded-lg hover:opacity-90"
                            style={{ 
                              borderRadius: 'var(--radius-md)',
                              fontSize: 'var(--text-sm)'
                            }}
                          >
                            Notify All
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'history' && (
                    <motion.div
                      key="history"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-6"
                    >
                      <div className="bg-card border border-border rounded-lg p-6" style={{ borderRadius: 'var(--radius-lg)' }}>
                        <h3 className="mb-4">AI Agent Log</h3>
                        <div className="space-y-3 mb-6">
                          {[
                            { time: '08:00', action: 'Extracted task from meeting transcript', status: 'success' },
                            { time: '08:02', action: 'Linked to Pet Segment brand group', status: 'success' },
                            { time: '08:05', action: 'Prioritized due to budget impact', status: 'success' },
                            { time: '08:10', action: 'Classified urgency (High)', status: 'success' },
                          ].map((log, idx) => (
                            <div key={idx} className="flex items-start gap-3">
                              <div className="flex flex-col items-center gap-1">
                                <div 
                                  className="w-2 h-2 rounded-full"
                                  style={{ 
                                    backgroundColor: '#107C10',
                                    borderRadius: 'var(--radius-full)'
                                  }}
                                ></div>
                                {idx < 3 && <div className="w-0.5 h-8 bg-border"></div>}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-text-muted" style={{ fontSize: 'var(--text-xs)' }}>
                                    {log.time}
                                  </span>
                                  <span>→</span>
                                  <span style={{ fontSize: 'var(--text-sm)' }}>{log.action}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        <h4 className="mb-4">Confidence Map</h4>
                        <div className="space-y-3">
                          {[
                            { label: 'Facts', value: 98, color: '#107C10' },
                            { label: 'Timing', value: 95, color: '#4F6BED' },
                            { label: 'Dependencies', value: 92, color: '#886CE4' },
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
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Progress Footer */}
      <motion.div 
        className="border-t border-border bg-card px-6 py-4"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.3 }}
      >
        <div className="max-w-[1800px] mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12">
                  <svg className="transform -rotate-90" width="48" height="48">
                    <circle
                      cx="24"
                      cy="24"
                      r="20"
                      stroke="var(--background)"
                      strokeWidth="4"
                      fill="none"
                    />
                    <circle
                      cx="24"
                      cy="24"
                      r="20"
                      stroke="#107C10"
                      strokeWidth="4"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 20 * 0.78} ${2 * Math.PI * 20}`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span style={{ fontSize: 'var(--text-xs)' }}>78%</span>
                  </div>
                </div>
                <div>
                  <p style={{ fontSize: 'var(--text-sm)' }}>Tasks Completed</p>
                  <p className="text-text-muted" style={{ fontSize: 'var(--text-xs)' }}>
                    9 of 12 tasks closed this week
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-6">
              {progressKPIs.map((kpi, index) => (
                <motion.div
                  key={kpi.label}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + index * 0.05, duration: 0.2 }}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ 
                      backgroundColor: kpi.color + '20',
                      borderRadius: 'var(--radius-md)'
                    }}
                  >
                    <kpi.icon className="w-5 h-5" style={{ color: kpi.color }} />
                  </div>
                  <div>
                    <p style={{ fontSize: 'var(--text-lg)', color: kpi.color }}>
                      {kpi.value}
                    </p>
                    <p className="text-text-muted" style={{ fontSize: 'var(--text-xs)' }}>
                      {kpi.label}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div 
            className="p-3 rounded-lg flex items-center gap-2"
            style={{ 
              backgroundColor: 'var(--primary)',
              opacity: 0.1,
              borderRadius: 'var(--radius-md)'
            }}
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <p className="text-foreground" style={{ fontSize: 'var(--text-sm)' }}>
              AI predicts +12% improvement in completion if 3 repetitive approvals are automated.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
