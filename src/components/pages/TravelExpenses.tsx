import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plane, MapPin, Calendar, Clock, CheckCircle, AlertCircle, 
  DollarSign, FileText, Upload, TrendingDown, TrendingUp,
  Brain, Lightbulb, Shield, Leaf, Zap, Users, Building2,
  ChevronRight, X, Edit3, Download, Share2, MoreHorizontal,
  Hotel, Utensils, Car, Briefcase, Plus, Search, Filter,
  AlertTriangle, Target, BarChart3, PieChart, Activity,
  ArrowUpRight, ArrowDownRight, Check, ChevronDown, Package,
  Receipt, CreditCard, Sparkles, Globe
} from 'lucide-react';

export function TravelExpenses() {
  const [selectedTrip, setSelectedTrip] = useState<number | null>(1);
  const [showExpensePanel, setShowExpensePanel] = useState(true);
  const [activeExpenseTab, setActiveExpenseTab] = useState('receipts');

  const trips = [
    {
      id: 1,
      destination: 'New York',
      purpose: 'Retail Partner Visit',
      dates: 'Nov 6–8',
      linkedMeetings: ['Walmart QBR', 'Target QBR', 'Pet Innovation Showcase'],
      aiContext: 'Trip optimized to align with CFO Finance Review. Flight rebooked for earlier arrival (less conflict risk).',
      status: 'confirmed',
      badges: ['Retail', 'Partner', 'High Impact'],
      expenses: { total: 1436, pending: 0 },
      meetings: 3
    },
    {
      id: 2,
      destination: 'Minneapolis',
      purpose: 'Leadership Offsite',
      dates: 'Nov 12–14',
      linkedMeetings: ['NAR Leadership Planning', 'Strategy Session'],
      aiContext: 'AI recommends shifting return by 3 hrs — reduces overnight expense and preserves next-day focus block.',
      status: 'pending-adjustment',
      badges: ['Leadership', 'Travel Optimization', 'Policy Check'],
      expenses: { total: 0, pending: 0 },
      meetings: 2
    },
    {
      id: 3,
      destination: 'San Francisco',
      purpose: 'Investor Forum',
      dates: 'Nov 22–23',
      linkedMeetings: ['Investor Relations', 'Pet Growth Presentation'],
      aiContext: 'Detected missing post-event expense category for hotel.',
      status: 'expense-missing',
      badges: ['Investor', 'Finance', 'Pending Expense'],
      expenses: { total: 1124, pending: 1 },
      meetings: 2
    },
    {
      id: 4,
      destination: 'Boston',
      purpose: 'Consumer Insights Summit',
      dates: 'Dec 3–5',
      linkedMeetings: ['Market Trends Session', 'Competitor Intelligence'],
      aiContext: 'Detected potential meeting conflict with Pet segment quarterly review.',
      status: 'conflict-detected',
      badges: ['Insights', 'Strategy', 'Schedule Conflict'],
      expenses: { total: 0, pending: 0 },
      meetings: 2
    },
  ];

  const optimizationCards = [
    {
      id: 1,
      type: 'schedule',
      title: 'Schedule Optimization',
      description: 'Your current Boston summit conflicts with Pet Segment QBR (Dec 4, 10 AM). Recommend moving flight by 2 hrs earlier on Dec 3 to attend both.',
      options: [
        { flight: 'Delta 345', time: '8:00 AM → 11:00 AM', cost: '+$120', confidence: 95 },
        { flight: 'American 611', time: '9:30 AM → 12:15 PM', cost: '+$80', confidence: 87 },
        { flight: 'Keep Current', time: '10:00 AM → 1:30 PM', cost: '$0', confidence: 65 },
      ],
      severity: 'warning'
    },
    {
      id: 2,
      type: 'policy',
      title: 'Policy Compliance Alert',
      description: 'Hotel rate in New York ($425/night) exceeds policy threshold ($350). AI detected alternative within 0.5 miles.',
      recommendation: 'Rebook to Courtyard Midtown ($312/night)',
      confidence: 93,
      impact: 'Saves $338 total',
      severity: 'warning'
    },
    {
      id: 3,
      type: 'sustainability',
      title: 'Sustainability Insight',
      description: 'Total travel CO₂ emissions this quarter: 3.2 tons (−8% vs last quarter). Biggest contributor: Air travel for Retail visits.',
      suggestion: 'Switch next Retail Partner Sync to hybrid mode.',
      severity: 'success'
    },
    {
      id: 4,
      type: 'efficiency',
      title: 'Efficiency Suggestion',
      description: 'Detected duplicate route: MSP → JFK (twice within 3 days). AI suggests merging meetings and reducing one leg.',
      impact: { timeSaved: '1 day', costReduction: '$940' },
      severity: 'info'
    },
    {
      id: 5,
      type: 'personalization',
      title: 'Personalization',
      description: 'AI observed you prefer early-morning flights on Mondays (78% historical). Apply this preference for future bookings?',
      severity: 'info'
    },
  ];

  const expenses = [
    { id: 1, item: 'Hotel – NYC Midtown', source: 'Trip 1', category: 'Lodging', amount: 938, status: 'above-policy', confidence: 97 },
    { id: 2, item: 'Delta Flight 345', source: 'Trip 1', category: 'Airfare', amount: 412, status: 'approved', confidence: 98 },
    { id: 3, item: 'Restaurant – "Blue Plate"', source: 'Trip 1', category: 'Meals', amount: 86, status: 'approved', confidence: 92 },
    { id: 4, item: 'Lyft – Airport Transfer', source: 'Trip 3', category: 'Ground', amount: 54, status: 'pending', confidence: 88 },
  ];

  const expenseByCategory = [
    { category: 'Airfare', amount: 2840, icon: Plane, color: '#4F6BED' },
    { category: 'Lodging', amount: 2540, icon: Hotel, color: '#886CE4' },
    { category: 'Meals', amount: 1010, icon: Utensils, color: '#107C10' },
    { category: 'Ground', amount: 422, icon: Car, color: '#FF8C00' },
    { category: 'Miscellaneous', amount: 500, icon: Briefcase, color: '#8A8886' },
  ];

  const policyCompliance = [
    { rule: 'Lodging cap $350/night', violations: 1, riskLevel: 'medium', resolution: 'Adjusted' },
    { rule: 'Meals per diem $120/day', violations: 0, riskLevel: 'none', resolution: '—' },
    { rule: 'Business-class limit (domestic)', violations: 0, riskLevel: 'none', resolution: '—' },
    { rule: 'Multi-trip merge threshold', violations: 0, riskLevel: 'low', resolution: 'Reviewed' },
  ];

  const summaryMetrics = [
    { label: 'Total Trips This Month', value: '4', trend: 1, icon: Plane, color: '#4F6BED' },
    { label: 'Avg. Cost per Trip', value: '$1,828', trend: -9, icon: DollarSign, color: '#107C10' },
    { label: 'Policy Compliance', value: '96%', trend: 2, icon: Shield, color: '#107C10' },
    { label: 'CO₂ Impact Reduction', value: '−8%', trend: 0, icon: Leaf, color: '#107C10', note: 'Green' },
    { label: 'AI Optimization Savings', value: '$1,278', trend: 14, icon: Zap, color: '#886CE4' },
  ];

  const selectedTripData = trips.find(t => t.id === selectedTrip);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return '#107C10';
      case 'pending-adjustment': return '#FF8C00';
      case 'expense-missing': return '#FCE100';
      case 'conflict-detected': return '#D13438';
      default: return '#8A8886';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed': return <CheckCircle className="w-4 h-4" />;
      case 'pending-adjustment': return <Clock className="w-4 h-4" />;
      case 'expense-missing': return <AlertTriangle className="w-4 h-4" />;
      case 'conflict-detected': return <AlertCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'confirmed': return 'Confirmed';
      case 'pending-adjustment': return 'Pending Adjustment';
      case 'expense-missing': return 'Expense Missing';
      case 'conflict-detected': return 'Conflict Detected';
      default: return 'Unknown';
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

  const getExpenseStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return '#107C10';
      case 'above-policy': return '#FF8C00';
      case 'pending': return '#8A8886';
      default: return '#8A8886';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'medium': return '#FF8C00';
      case 'low': return '#FCE100';
      case 'none': return '#107C10';
      default: return '#8A8886';
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-background overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-border bg-card">
        <div className="flex items-center justify-between max-w-[1800px] mx-auto">
          <div className="flex items-center gap-3">
            <Plane className="w-5 h-5 text-primary" />
            <h2 className="text-foreground">Travel & Expenses</h2>
          </div>
          <div className="flex items-center gap-2">
            <button 
              className="px-4 py-2 bg-surface text-foreground rounded-lg hover:bg-secondary transition-colors flex items-center gap-2"
              style={{ borderRadius: 'var(--radius-md)' }}
            >
              <Search className="w-4 h-4" />
              <span style={{ fontSize: 'var(--text-sm)' }}>Search trips</span>
            </button>
            <button 
              className="px-4 py-2 bg-surface text-foreground rounded-lg hover:bg-secondary transition-colors flex items-center gap-2"
              style={{ borderRadius: 'var(--radius-md)' }}
            >
              <Upload className="w-4 h-4" />
              <span style={{ fontSize: 'var(--text-sm)' }}>Upload Receipt</span>
            </button>
            <button 
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2"
              style={{ borderRadius: 'var(--radius-md)' }}
            >
              <Plus className="w-4 h-4" />
              <span style={{ fontSize: 'var(--text-sm)' }}>New Trip</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left - Trips Overview */}
        <motion.div 
          className="w-[380px] bg-background border-r border-border flex-shrink-0 overflow-y-auto"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="p-6 space-y-4">
            {trips.map((trip, index) => (
              <motion.div
                key={trip.id}
                onClick={() => {
                  setSelectedTrip(trip.id);
                  setShowExpensePanel(true);
                }}
                className={`bg-card border rounded-lg p-5 cursor-pointer transition-all ${
                  selectedTrip === trip.id 
                    ? 'border-primary ring-2 ring-primary/20' 
                    : 'border-border hover:border-primary/50'
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
                {/* Destination Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2 flex-1">
                    <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
                    <div>
                      <h3>{trip.destination}</h3>
                      <p className="text-text-secondary" style={{ fontSize: 'var(--text-sm)' }}>
                        {trip.purpose}
                      </p>
                    </div>
                  </div>
                  <div 
                    className="px-2 py-1 rounded-full flex items-center gap-1 flex-shrink-0"
                    style={{ 
                      backgroundColor: getStatusColor(trip.status) + '20',
                      color: getStatusColor(trip.status),
                      fontSize: 'var(--text-xs)',
                      borderRadius: 'var(--radius-pill)'
                    }}
                  >
                    {getStatusIcon(trip.status)}
                  </div>
                </div>

                {/* Dates & Meetings */}
                <div className="flex items-center gap-4 mb-3 text-text-secondary" style={{ fontSize: 'var(--text-sm)' }}>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{trip.dates}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" />
                    <span>{trip.meetings} meetings</span>
                  </div>
                </div>

                {/* Linked Meetings */}
                <div className="mb-3">
                  <span className="text-text-muted mb-2 block" style={{ fontSize: 'var(--text-xs)' }}>
                    Linked Meetings:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {trip.linkedMeetings.slice(0, 2).map((meeting) => (
                      <span
                        key={meeting}
                        className="px-2 py-0.5 bg-surface text-text-secondary rounded text-xs"
                        style={{ 
                          fontSize: 'var(--text-xs)',
                          borderRadius: 'var(--radius-sm)'
                        }}
                      >
                        {meeting}
                      </span>
                    ))}
                    {trip.linkedMeetings.length > 2 && (
                      <span
                        className="px-2 py-0.5 bg-surface text-text-secondary rounded text-xs"
                        style={{ 
                          fontSize: 'var(--text-xs)',
                          borderRadius: 'var(--radius-sm)'
                        }}
                      >
                        +{trip.linkedMeetings.length - 2}
                      </span>
                    )}
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
                  <p style={{ fontSize: 'var(--text-xs)' }}>{trip.aiContext}</p>
                </div>

                {/* Status Badge */}
                <div className="flex items-center justify-between mb-3">
                  <span 
                    className="px-3 py-1 rounded-full"
                    style={{ 
                      backgroundColor: getStatusColor(trip.status) + '20',
                      color: getStatusColor(trip.status),
                      fontSize: 'var(--text-xs)',
                      borderRadius: 'var(--radius-pill)'
                    }}
                  >
                    {getStatusLabel(trip.status)}
                  </span>
                  {trip.expenses.total > 0 && (
                    <span className="text-text-secondary" style={{ fontSize: 'var(--text-sm)' }}>
                      ${trip.expenses.total.toLocaleString()}
                    </span>
                  )}
                </div>

                {/* Badges */}
                <div className="flex items-center gap-2 flex-wrap mb-4">
                  {trip.badges.slice(0, 3).map((badge) => (
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

                {/* Quick Actions */}
                <div className="flex items-center gap-2">
                  <button 
                    className="flex-1 px-3 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
                    style={{ 
                      fontSize: 'var(--text-xs)',
                      borderRadius: 'var(--radius-md)'
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    View Itinerary
                  </button>
                  <button 
                    className="px-3 py-2 bg-surface text-foreground rounded-lg hover:bg-secondary transition-colors"
                    style={{ 
                      fontSize: 'var(--text-xs)',
                      borderRadius: 'var(--radius-md)'
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    Edit
                  </button>
                  <button 
                    className="p-2 bg-surface text-foreground rounded-lg hover:bg-secondary transition-colors"
                    style={{ borderRadius: 'var(--radius-md)' }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Center - AI Optimization & Conflict Detection */}
        <div className="flex-1 bg-background overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto space-y-4">
            <h3 className="mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-accent" />
              AI Optimization & Intelligence
            </h3>

            {optimizationCards.map((card, index) => (
              <motion.div
                key={card.id}
                className="bg-card border border-border rounded-lg overflow-hidden"
                style={{ 
                  borderRadius: 'var(--radius-lg)',
                  borderLeftWidth: '4px',
                  borderLeftColor: getSeverityColor(card.severity)
                }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.2 }}
              >
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start gap-3 mb-4">
                    {card.type === 'schedule' && <Clock className="w-6 h-6 text-warning flex-shrink-0" />}
                    {card.type === 'policy' && <Shield className="w-6 h-6 text-warning flex-shrink-0" />}
                    {card.type === 'sustainability' && <Leaf className="w-6 h-6 text-success flex-shrink-0" />}
                    {card.type === 'efficiency' && <Zap className="w-6 h-6 text-primary flex-shrink-0" />}
                    {card.type === 'personalization' && <Target className="w-6 h-6 text-primary flex-shrink-0" />}
                    <div className="flex-1">
                      <h3 className="mb-2">{card.title}</h3>
                      <p className="text-text-secondary" style={{ fontSize: 'var(--text-sm)' }}>
                        {card.description}
                      </p>
                    </div>
                  </div>

                  {/* Schedule Options Table */}
                  {card.type === 'schedule' && card.options && (
                    <div className="mb-4">
                      <div className="bg-surface rounded-lg overflow-hidden" style={{ borderRadius: 'var(--radius-md)' }}>
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-border">
                              <th className="text-left p-3 text-text-muted" style={{ fontSize: 'var(--text-xs)' }}>Option</th>
                              <th className="text-left p-3 text-text-muted" style={{ fontSize: 'var(--text-xs)' }}>Time</th>
                              <th className="text-left p-3 text-text-muted" style={{ fontSize: 'var(--text-xs)' }}>Cost Impact</th>
                              <th className="text-left p-3 text-text-muted" style={{ fontSize: 'var(--text-xs)' }}>AI Confidence</th>
                            </tr>
                          </thead>
                          <tbody>
                            {card.options.map((option, idx) => (
                              <tr key={idx} className="border-b border-border last:border-0 hover:bg-background transition-colors">
                                <td className="p-3" style={{ fontSize: 'var(--text-sm)' }}>✈️ {option.flight}</td>
                                <td className="p-3 text-text-secondary" style={{ fontSize: 'var(--text-sm)' }}>{option.time}</td>
                                <td className="p-3" style={{ fontSize: 'var(--text-sm)' }}>
                                  <span className={option.cost.includes('+') ? 'text-warning' : 'text-success'}>
                                    {option.cost}
                                  </span>
                                </td>
                                <td className="p-3" style={{ fontSize: 'var(--text-sm)' }}>
                                  <div className="flex items-center gap-2">
                                    <div className="w-16 bg-background rounded-full h-1.5" style={{ borderRadius: 'var(--radius-pill)' }}>
                                      <div 
                                        className="h-1.5 rounded-full" 
                                        style={{ 
                                          width: `${option.confidence}%`,
                                          backgroundColor: option.confidence > 90 ? '#107C10' : option.confidence > 80 ? '#4F6BED' : '#FF8C00',
                                          borderRadius: 'var(--radius-pill)'
                                        }} 
                                      />
                                    </div>
                                    <span className="text-text-secondary" style={{ fontSize: 'var(--text-xs)' }}>
                                      {option.confidence}%
                                    </span>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* Policy Recommendation */}
                  {card.type === 'policy' && card.recommendation && (
                    <div 
                      className="p-4 rounded-lg mb-4 border border-primary/30"
                      style={{ 
                        backgroundColor: 'var(--primary)',
                        opacity: 0.05,
                        borderRadius: 'var(--radius-md)'
                      }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-text-muted" style={{ fontSize: 'var(--text-xs)' }}>
                          Recommendation:
                        </span>
                        <div className="flex items-center gap-2">
                          <Brain className="w-3.5 h-3.5 text-primary" />
                          <span className="text-primary" style={{ fontSize: 'var(--text-xs)' }}>
                            {card.confidence}% confidence
                          </span>
                        </div>
                      </div>
                      <p className="text-foreground mb-2" style={{ fontSize: 'var(--text-sm)' }}>
                        {card.recommendation}
                      </p>
                      {card.impact && (
                        <p className="text-success" style={{ fontSize: 'var(--text-sm)' }}>
                          💰 {card.impact}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Sustainability Suggestion */}
                  {card.type === 'sustainability' && card.suggestion && (
                    <div 
                      className="p-3 rounded-lg mb-4"
                      style={{ 
                        backgroundColor: 'var(--surface)',
                        borderRadius: 'var(--radius-md)'
                      }}
                    >
                      <p className="text-text-muted mb-1" style={{ fontSize: 'var(--text-xs)' }}>
                        AI Suggestion:
                      </p>
                      <p style={{ fontSize: 'var(--text-sm)' }}>{card.suggestion}</p>
                    </div>
                  )}

                  {/* Efficiency Impact */}
                  {card.type === 'efficiency' && card.impact && (
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div 
                        className="p-3 rounded-lg"
                        style={{ 
                          backgroundColor: 'var(--surface)',
                          borderRadius: 'var(--radius-md)'
                        }}
                      >
                        <span className="text-text-muted block mb-1" style={{ fontSize: 'var(--text-xs)' }}>
                          Time Saved:
                        </span>
                        <p className="text-success">{card.impact.timeSaved}</p>
                      </div>
                      <div 
                        className="p-3 rounded-lg"
                        style={{ 
                          backgroundColor: 'var(--surface)',
                          borderRadius: 'var(--radius-md)'
                        }}
                      >
                        <span className="text-text-muted block mb-1" style={{ fontSize: 'var(--text-xs)' }}>
                          Cost Reduction:
                        </span>
                        <p className="text-success">{card.impact.costReduction}</p>
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex flex-wrap gap-2">
                    {card.type === 'schedule' && (
                      <>
                        <button 
                          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90"
                          style={{ 
                            borderRadius: 'var(--radius-md)',
                            fontSize: 'var(--text-sm)'
                          }}
                        >
                          Select Option 1
                        </button>
                        <button 
                          className="px-4 py-2 bg-surface text-foreground rounded-lg hover:bg-secondary"
                          style={{ 
                            borderRadius: 'var(--radius-md)',
                            fontSize: 'var(--text-sm)'
                          }}
                        >
                          Ask for Alternatives
                        </button>
                        <button 
                          className="px-4 py-2 bg-surface text-text-secondary rounded-lg hover:bg-secondary"
                          style={{ 
                            borderRadius: 'var(--radius-md)',
                            fontSize: 'var(--text-sm)'
                          }}
                        >
                          Ignore Suggestion
                        </button>
                      </>
                    )}
                    {card.type === 'policy' && (
                      <>
                        <button 
                          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90"
                          style={{ 
                            borderRadius: 'var(--radius-md)',
                            fontSize: 'var(--text-sm)'
                          }}
                        >
                          Approve Switch
                        </button>
                        <button 
                          className="px-4 py-2 bg-surface text-foreground rounded-lg hover:bg-secondary"
                          style={{ 
                            borderRadius: 'var(--radius-md)',
                            fontSize: 'var(--text-sm)'
                          }}
                        >
                          Escalate to Travel Desk
                        </button>
                      </>
                    )}
                    {card.type === 'sustainability' && (
                      <>
                        <button 
                          className="px-4 py-2 bg-success text-white rounded-lg hover:opacity-90"
                          style={{ 
                            borderRadius: 'var(--radius-md)',
                            fontSize: 'var(--text-sm)'
                          }}
                        >
                          Schedule as Hybrid
                        </button>
                        <button 
                          className="px-4 py-2 bg-surface text-foreground rounded-lg hover:bg-secondary"
                          style={{ 
                            borderRadius: 'var(--radius-md)',
                            fontSize: 'var(--text-sm)'
                          }}
                        >
                          Ignore
                        </button>
                      </>
                    )}
                    {card.type === 'efficiency' && (
                      <>
                        <button 
                          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90"
                          style={{ 
                            borderRadius: 'var(--radius-md)',
                            fontSize: 'var(--text-sm)'
                          }}
                        >
                          Merge Trips
                        </button>
                        <button 
                          className="px-4 py-2 bg-surface text-foreground rounded-lg hover:bg-secondary"
                          style={{ 
                            borderRadius: 'var(--radius-md)',
                            fontSize: 'var(--text-sm)'
                          }}
                        >
                          View Affected Meetings
                        </button>
                      </>
                    )}
                    {card.type === 'personalization' && (
                      <>
                        <button 
                          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90"
                          style={{ 
                            borderRadius: 'var(--radius-md)',
                            fontSize: 'var(--text-sm)'
                          }}
                        >
                          Yes
                        </button>
                        <button 
                          className="px-4 py-2 bg-surface text-foreground rounded-lg hover:bg-secondary"
                          style={{ 
                            borderRadius: 'var(--radius-md)',
                            fontSize: 'var(--text-sm)'
                          }}
                        >
                          No
                        </button>
                        <button 
                          className="px-4 py-2 bg-surface text-foreground rounded-lg hover:bg-secondary"
                          style={{ 
                            borderRadius: 'var(--radius-md)',
                            fontSize: 'var(--text-sm)'
                          }}
                        >
                          Always Apply
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right - Expense Intelligence Panel */}
        <AnimatePresence>
          {showExpensePanel && (
            <motion.div
              className="w-[440px] bg-card border-l border-border flex-shrink-0 flex flex-col overflow-hidden"
              initial={{ x: 440, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 440, opacity: 0 }}
              transition={{ 
                type: 'tween',
                ease: [0.4, 0, 0.2, 1],
                duration: 0.3
              }}
            >
              {/* Header */}
              <div className="px-6 py-4 border-b border-border bg-surface">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h2 className="mb-2">Expense Intelligence</h2>
                    <p className="text-text-secondary" style={{ fontSize: 'var(--text-sm)' }}>
                      3 pending receipts, 1 policy exception
                    </p>
                    <p className="text-primary mt-1" style={{ fontSize: 'var(--text-lg)' }}>
                      Total pending: $2,480
                    </p>
                  </div>
                  <button
                    onClick={() => setShowExpensePanel(false)}
                    className="p-2 hover:bg-background rounded-lg transition-colors"
                    style={{ borderRadius: 'var(--radius-md)' }}
                  >
                    <X className="w-4 h-4 text-text-secondary" />
                  </button>
                </div>

                {/* Quick Actions */}
                <div className="flex gap-2">
                  <button 
                    className="flex-1 px-3 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 flex items-center justify-center gap-2"
                    style={{ 
                      borderRadius: 'var(--radius-md)',
                      fontSize: 'var(--text-sm)'
                    }}
                  >
                    <Upload className="w-4 h-4" />
                    Upload
                  </button>
                  <button 
                    className="flex-1 px-3 py-2 bg-surface text-foreground rounded-lg hover:bg-secondary flex items-center justify-center gap-2"
                    style={{ 
                      borderRadius: 'var(--radius-md)',
                      fontSize: 'var(--text-sm)'
                    }}
                  >
                    <Download className="w-4 h-4" />
                    Export
                  </button>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex items-center gap-2 px-6 py-3 border-b border-border bg-card">
                {[
                  { id: 'receipts', label: 'Receipts', icon: Receipt },
                  { id: 'summary', label: 'Summary', icon: BarChart3 },
                  { id: 'compliance', label: 'Compliance', icon: Shield },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveExpenseTab(tab.id)}
                    className={`px-3 py-2 rounded-lg flex items-center gap-2 transition-all ${
                      activeExpenseTab === tab.id
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-surface text-text-secondary hover:bg-secondary hover:text-foreground'
                    }`}
                    style={{ 
                      borderRadius: 'var(--radius-md)',
                      fontSize: 'var(--text-sm)',
                      transition: 'var(--transition-fast)'
                    }}
                  >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="flex-1 overflow-y-auto p-6">
                <AnimatePresence mode="wait">
                  {activeExpenseTab === 'receipts' && (
                    <motion.div
                      key="receipts"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-3"
                    >
                      {expenses.map((expense, idx) => (
                        <motion.div
                          key={expense.id}
                          className="bg-surface rounded-lg p-4"
                          style={{ borderRadius: 'var(--radius-md)' }}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05 }}
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <p className="mb-1">{expense.item}</p>
                              <div className="flex items-center gap-2 text-text-secondary" style={{ fontSize: 'var(--text-xs)' }}>
                                <span>{expense.source}</span>
                                <span>•</span>
                                <span>{expense.category}</span>
                              </div>
                            </div>
                            <p style={{ fontSize: 'var(--text-lg)' }}>
                              ${expense.amount}
                            </p>
                          </div>

                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <Brain className="w-3.5 h-3.5 text-primary" />
                              <span className="text-text-secondary" style={{ fontSize: 'var(--text-xs)' }}>
                                AI Confidence: {expense.confidence}%
                              </span>
                            </div>
                            <span 
                              className="px-2 py-0.5 rounded-full capitalize"
                              style={{ 
                                backgroundColor: getExpenseStatusColor(expense.status) + '20',
                                color: getExpenseStatusColor(expense.status),
                                fontSize: 'var(--text-xs)',
                                borderRadius: 'var(--radius-pill)'
                              }}
                            >
                              {expense.status === 'above-policy' ? 'Above Policy' : expense.status}
                            </span>
                          </div>

                          <div className="flex gap-2">
                            <button 
                              className="flex-1 px-3 py-1.5 bg-background text-foreground rounded hover:bg-card"
                              style={{ 
                                borderRadius: 'var(--radius-sm)',
                                fontSize: 'var(--text-xs)'
                              }}
                            >
                              View Receipt
                            </button>
                            <button 
                              className="px-3 py-1.5 bg-background text-foreground rounded hover:bg-card"
                              style={{ 
                                borderRadius: 'var(--radius-sm)',
                                fontSize: 'var(--text-xs)'
                              }}
                            >
                              Edit
                            </button>
                            {expense.status === 'approved' && (
                              <button 
                                className="px-3 py-1.5 bg-success text-white rounded hover:opacity-90"
                                style={{ 
                                  borderRadius: 'var(--radius-sm)',
                                  fontSize: 'var(--text-xs)'
                                }}
                              >
                                <Check className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}

                  {activeExpenseTab === 'summary' && (
                    <motion.div
                      key="summary"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-6"
                    >
                      <div>
                        <h3 className="mb-4">Total Expenses This Month</h3>
                        <p className="text-primary mb-6" style={{ fontSize: 'var(--text-3xl)' }}>
                          $7,312
                        </p>
                      </div>

                      <div>
                        <h4 className="mb-4">By Category</h4>
                        <div className="space-y-3">
                          {expenseByCategory.map((cat, idx) => (
                            <motion.div
                              key={cat.category}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.05 }}
                            >
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  <div
                                    className="w-8 h-8 rounded flex items-center justify-center"
                                    style={{ 
                                      backgroundColor: cat.color + '20',
                                      borderRadius: 'var(--radius-sm)'
                                    }}
                                  >
                                    <cat.icon className="w-4 h-4" style={{ color: cat.color }} />
                                  </div>
                                  <span style={{ fontSize: 'var(--text-sm)' }}>{cat.category}</span>
                                </div>
                                <span style={{ fontSize: 'var(--text-sm)' }}>
                                  ${cat.amount.toLocaleString()}
                                </span>
                              </div>
                              <div className="w-full bg-background rounded-full h-2" style={{ borderRadius: 'var(--radius-pill)' }}>
                                <div 
                                  className="h-2 rounded-full" 
                                  style={{ 
                                    width: `${(cat.amount / 7312) * 100}%`,
                                    backgroundColor: cat.color,
                                    borderRadius: 'var(--radius-pill)'
                                  }} 
                                />
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      <div 
                        className="p-4 rounded-lg"
                        style={{ 
                          backgroundColor: 'var(--surface)',
                          borderRadius: 'var(--radius-md)'
                        }}
                      >
                        <h4 className="mb-3">AI Insights</h4>
                        <div className="space-y-2">
                          <div className="flex items-start gap-2">
                            <TrendingDown className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                            <p style={{ fontSize: 'var(--text-sm)' }}>
                              Travel costs −6% MoM; biggest efficiency gains in lodging optimization.
                            </p>
                          </div>
                          <div className="flex items-start gap-2">
                            <TrendingDown className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                            <p style={{ fontSize: 'var(--text-sm)' }}>
                              Pet segment travel cost trend ↓ 11% — sustained savings post vendor renegotiation.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button 
                          className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90"
                          style={{ 
                            borderRadius: 'var(--radius-md)',
                            fontSize: 'var(--text-sm)'
                          }}
                        >
                          Generate Report
                        </button>
                        <button 
                          className="px-4 py-2 bg-surface text-foreground rounded-lg hover:bg-secondary"
                          style={{ 
                            borderRadius: 'var(--radius-md)',
                            fontSize: 'var(--text-sm)'
                          }}
                        >
                          View Trend
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {activeExpenseTab === 'compliance' && (
                    <motion.div
                      key="compliance"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-6"
                    >
                      <div>
                        <h3 className="mb-4">Policy Health</h3>
                        <div className="space-y-3">
                          {policyCompliance.map((policy, idx) => (
                            <motion.div
                              key={idx}
                              className="p-4 bg-surface rounded-lg"
                              style={{ borderRadius: 'var(--radius-md)' }}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.05 }}
                            >
                              <div className="flex items-start justify-between mb-3">
                                <div className="flex-1">
                                  <p className="mb-1" style={{ fontSize: 'var(--text-sm)' }}>
                                    {policy.rule}
                                  </p>
                                  <div className="flex items-center gap-2">
                                    <span className="text-text-secondary" style={{ fontSize: 'var(--text-xs)' }}>
                                      Violations: {policy.violations}
                                    </span>
                                    {policy.violations > 0 && (
                                      <>
                                        <span>•</span>
                                        <span className="text-text-secondary" style={{ fontSize: 'var(--text-xs)' }}>
                                          Resolution: {policy.resolution}
                                        </span>
                                      </>
                                    )}
                                  </div>
                                </div>
                                <span 
                                  className="px-2 py-1 rounded-full capitalize flex-shrink-0"
                                  style={{ 
                                    backgroundColor: getRiskColor(policy.riskLevel) + '20',
                                    color: getRiskColor(policy.riskLevel),
                                    fontSize: 'var(--text-xs)',
                                    borderRadius: 'var(--radius-pill)'
                                  }}
                                >
                                  {policy.riskLevel === 'none' ? 'Compliant' : policy.riskLevel}
                                </span>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      <div 
                        className="p-4 rounded-lg border border-primary/30"
                        style={{ 
                          backgroundColor: 'var(--primary)',
                          opacity: 0.05,
                          borderRadius: 'var(--radius-md)'
                        }}
                      >
                        <h4 className="mb-3 flex items-center gap-2">
                          <Brain className="w-5 h-5 text-primary" />
                          AI Explainability
                        </h4>
                        <p className="text-text-secondary mb-3" style={{ fontSize: 'var(--text-sm)', lineHeight: '1.6' }}>
                          "Expense classification derived via OCR + NLP model (v3.2).
                          Confidence thresholds tuned for 90% accuracy; low-confidence entries require review."
                        </p>
                        <p className="text-text-muted" style={{ fontSize: 'var(--text-xs)' }}>
                          Agents Used: Expense Classifier, Compliance Agent, Finance Integration Agent
                        </p>
                      </div>

                      <div className="flex gap-2">
                        <button 
                          className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90"
                          style={{ 
                            borderRadius: 'var(--radius-md)',
                            fontSize: 'var(--text-sm)'
                          }}
                        >
                          Auto Resolve Minor
                        </button>
                        <button 
                          className="px-4 py-2 bg-surface text-foreground rounded-lg hover:bg-secondary"
                          style={{ 
                            borderRadius: 'var(--radius-md)',
                            fontSize: 'var(--text-sm)'
                          }}
                        >
                          Notify Finance
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Summary Footer */}
      <motion.div 
        className="border-t border-border bg-card px-6 py-4"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.3 }}
      >
        <div className="max-w-[1800px] mx-auto">
          <div className="grid grid-cols-5 gap-6">
            {summaryMetrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                className="flex items-center gap-3"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + index * 0.05, duration: 0.2 }}
              >
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ 
                    backgroundColor: metric.color + '20',
                    borderRadius: 'var(--radius-md)'
                  }}
                >
                  <metric.icon className="w-6 h-6" style={{ color: metric.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p style={{ fontSize: 'var(--text-lg)', color: metric.color }}>
                    {metric.value}
                  </p>
                  <p className="text-text-muted truncate" style={{ fontSize: 'var(--text-xs)' }}>
                    {metric.label}
                  </p>
                  {(metric.trend !== 0 || metric.note) && (
                    <div className="flex items-center gap-1 mt-1">
                      {metric.trend !== 0 && (
                        <>
                          {metric.trend > 0 ? (
                            <ArrowUpRight className="w-3 h-3 text-success" />
                          ) : (
                            <ArrowDownRight className="w-3 h-3 text-success" />
                          )}
                          <span className="text-success" style={{ fontSize: 'var(--text-xs)' }}>
                            {metric.trend > 0 ? '+' : ''}{metric.trend}%
                          </span>
                        </>
                      )}
                      {metric.note && (
                        <span className="text-success" style={{ fontSize: 'var(--text-xs)' }}>
                          {metric.note}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          <div 
            className="mt-4 p-3 rounded-lg flex items-center gap-2"
            style={{ 
              backgroundColor: 'var(--primary)',
              opacity: 0.1,
              borderRadius: 'var(--radius-md)'
            }}
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <p className="text-foreground" style={{ fontSize: 'var(--text-sm)' }}>
              AI savings include optimized flight bookings and reduced overnight stays.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
