import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import {
  Brain,
  Calendar,
  CheckCircle,
  Flame,
  Headphones,
  Mail,
  MessageSquare,
  Mic,
  Network,
  Shield,
  Sparkles,
  TrendingDown,
  TrendingUp,
  ThumbsDown,
  ThumbsUp,
  CheckSquare,
  Square
} from 'lucide-react';

type FeedFilter = 'all' | 'email' | 'meetings' | 'tasks' | 'insights';

interface PriorityCard {
  id: number;
  type: FeedFilter;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  context: string;
  aiInsight: string;
  badges: string[];
  actions: string[];
  confidence?: number;
  impactScore: number;
  urgencyLabel: 'Urgent' | 'Today' | 'This Week';
  whyNow: string;
  dependencies: string[];
  preparedBy: string;
  lastUpdated: string;
}

interface QuickDraft {
  id: number;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  draft: string;
  actions: string[];
  preparedAt: string;
}

interface Metric {
  id: number;
  label: string;
  value: string;
  trend?: 'up' | 'down';
  trendLabel?: string;
}

interface AgentRow {
  id: number;
  name: string;
  role: string;
  icon: React.ComponentType<{ className?: string }>;
}

const TOKENS = {
  brand: {
    name: 'Virtual Admin',
    primary: '#4F6BED',
    accent: '#886CE4',
    fontFamily: "'Segoe UI Variable', 'Segoe UI', Roboto, sans-serif",
  },
  theme: {
    background: '#FFFFFF',
    surface: '#F3F2F1',
    surfaceRaised: '#FFFFFF',
    textPrimary: '#201F1E',
    textSecondary: '#605E5C',
    textMuted: '#8A8886',
    divider: '#E1E1E1',
    secondary: '#E1E7F5',
    success: '#107C10',
    warning: '#FFAA44',
    error: '#D13438',
    shadow: {
      level1: '0px 1px 2px rgba(0,0,0,0.08)',
      level2: '0px 2px 4px rgba(0,0,0,0.12)',
      level3: '0px 4px 8px rgba(0,0,0,0.16)',
    },
  },
  typography: {
    sizes: {
      xs: '11px',
      sm: '13px',
      base: '15px',
      lg: '17px',
      xl: '20px',
      '2xl': '24px',
      '3xl': '32px',
    },
    weight: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.7,
    },
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    '2xl': 32,
    '3xl': 48,
  },
  radius: {
    sm: 6,
    md: 12,
    lg: 16,
    xl: 24,
    pill: 9999,
  },
  transitions: {
    fast: '120ms ease-out',
    medium: '200ms ease',
  },
};

const urgencyGradients: Record<PriorityCard['urgencyLabel'], string> = {
  Urgent: 'linear-gradient(90deg, #D13438 0%, #FFAA44 100%)',
  Today: 'linear-gradient(90deg, #FFAA44 0%, #4F6BED 100%)',
  'This Week': 'linear-gradient(90deg, #4F6BED 0%, #92C353 100%)',
};

const filterTabs: { id: FeedFilter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'email', label: 'Email' },
  { id: 'meetings', label: 'Meetings' },
  { id: 'tasks', label: 'Tasks' },
  { id: 'insights', label: 'AI Insights' },
];

export function ActionBoard() {
  const [activeFilter, setActiveFilter] = useState<FeedFilter>('all');
  const [now, setNow] = useState(() => new Date());
  const [selectedCardIds, setSelectedCardIds] = useState<number[]>([]);
  const [activeMetricFilter, setActiveMetricFilter] = useState<number | null>(null);

  const priorityCards: PriorityCard[] = useMemo(
    () => [
      {
        id: 1,
        type: 'email',
        icon: Mail,
        title: 'CFO – Revised Margin Model',
        context: 'Requires approval before investor brief at 3 PM.',
        aiInsight: 'High impact on Pet segment forecast.',
        badges: ['Finance', 'Urgent', 'High Impact'],
        actions: ['Approve', 'Open in Outlook', 'Ask AI for Summary'],
        impactScore: 96,
        urgencyLabel: 'Urgent',
        whyNow: 'Blocks investor briefing narrative and Q2 margin guidance.',
        dependencies: ['Finance Ops prep', 'Investor deck finalization'],
        preparedBy: 'Priority Orchestrator',
        lastUpdated: '2 min ago',
      },
      {
        id: 2,
        type: 'meetings',
        icon: Calendar,
        title: 'Retail Partner Sync Conflict',
        context: 'Overlaps with Finance Review.',
        aiInsight: 'Shift Retail Sync to Thu 9 AM (all attendees free).',
        badges: ['Schedule', 'Conflict', 'High Priority'],
        actions: ['Approve Move', 'Decline', 'View Calendar'],
        confidence: 92,
        impactScore: 89,
        urgencyLabel: 'Urgent',
        whyNow: 'Finance review outputs feed the retail sync decisions; conflict risks duplicate work.',
        dependencies: ['Finance review alignment', 'Retail partner update'],
        preparedBy: 'Scheduler Agent',
        lastUpdated: '5 min ago',
      },
      {
        id: 3,
        type: 'tasks',
        icon: CheckCircle,
        title: 'Approve Blue Buffalo Creative Brief',
        context: 'Due today 5 PM · Impact: $2.1M campaign.',
        aiInsight: 'Creative team is ready to launch once you approve.',
        badges: ['Task', 'Today', 'Creative'],
        actions: ['Approve', 'Comment', 'Reassign'],
        impactScore: 84,
        urgencyLabel: 'Today',
        whyNow: 'Campaign window closes tomorrow; delay pauses $2.1M Pet spend rollout.',
        dependencies: ['Media buy release', 'Retail hero asset upload'],
        preparedBy: 'Task Agent',
        lastUpdated: '12 min ago',
      },
      {
        id: 4,
        type: 'insights',
        icon: Brain,
        title: 'Internal sync time ↑ 12% · Strategic time ↓ 4%',
        context: 'Weekly pattern detected across Ops & Marketing.',
        aiInsight: 'Merge Ops & Marketing weekly to reclaim 2 hours.',
        badges: ['Insight', 'Focus', 'Behavior'],
        actions: ['Simulate Change', 'Ignore'],
        impactScore: 72,
        urgencyLabel: 'This Week',
        whyNow: 'Strategic time has trended down 4%; merging syncs recovers focus hours before board prep.',
        dependencies: ['Ops weekly sync', 'Marketing cadence'],
        preparedBy: 'Insight Agent',
        lastUpdated: '18 min ago',
      },
    ],
    []
  );

  const quickDrafts: QuickDraft[] = useMemo(
    () => [
      {
        id: 1,
        icon: Mail,
        title: 'Email Reply · Jeff (Margin Update)',
        draft: '“Thanks Jeff — I’ve reviewed the margin update; aligned for investor call.”',
        actions: ['Send', 'Edit'],
        preparedAt: 'Email Agent · 7:42 AM',
      },
      {
        id: 2,
        icon: Calendar,
        title: 'Meeting Approval · Retail Sync',
        draft: '“Confirm Retail Sync move to Thu 9 AM.”',
        actions: ['Approve'],
        preparedAt: 'Scheduler Agent · 7:46 AM',
      },
      {
        id: 3,
        icon: MessageSquare,
        title: 'Task Update · Creative Brief',
        draft: '“Creative brief approved — notify Marketing Ops.”',
        actions: ['Send to Teams'],
        preparedAt: 'Task Agent · 7:51 AM',
      },
    ],
    []
  );

  const microMetrics: Metric[] = useMemo(
    () => [
      { id: 1, label: 'Time Free Today', value: '3.5 h', trend: 'up', trendLabel: '+0.6 h' },
      { id: 2, label: 'Critical Emails', value: '3' },
      { id: 3, label: 'Tasks Due', value: '5', trend: 'down', trendLabel: '−1' },
      { id: 4, label: 'Approvals Pending', value: '2' },
    ],
    []
  );

  const agentRoster: AgentRow[] = useMemo(
    () => [
      { id: 1, name: 'Priority Orchestrator', role: 'Fuses inbox, calendar, tasks — ranks impact × urgency', icon: Sparkles },
      { id: 2, name: 'Action Composer', role: 'Drafts replies and one-click approvals', icon: MessageSquare },
      { id: 3, name: 'Guardrail Agent', role: 'Validates policy, tone, and compliance', icon: Shield },
      { id: 4, name: 'Insight Agent', role: 'Produces Today’s Focus and AI Brief', icon: Brain },
      { id: 5, name: 'Narrative Agent', role: 'Translates signals into natural language', icon: Network },
      { id: 6, name: 'Learning Agent', role: 'Tunes ranking from Dana’s past decisions', icon: Flame },
    ],
    []
  );

  const metricFilterMapping: Record<number, FeedFilter | 'approvals' | 'insights'> = {
    1: 'meetings',
    2: 'email',
    3: 'tasks',
    4: 'insights',
  };

  const filteredCards = useMemo(() => {
    const base =
      activeFilter === 'all' ? priorityCards : priorityCards.filter(card => card.type === activeFilter);
    if (!activeMetricFilter) return base;
    const mapped = metricFilterMapping[activeMetricFilter];
    if (!mapped || mapped === 'approvals') return base;
    return base.filter(card => card.type === mapped);
  }, [activeFilter, priorityCards, activeMetricFilter]);

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(interval);
  }, []);

  const formattedDate = useMemo(
    () =>
      new Intl.DateTimeFormat('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }).format(now),
    [now]
  );

  const formattedTime = useMemo(
    () =>
      now.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
      }),
    [now]
  );

  const toggleSelectCard = (cardId: number) => {
    setSelectedCardIds(current =>
      current.includes(cardId) ? current.filter(id => id !== cardId) : [...current, cardId]
    );
  };

  const clearSelectedCards = () => setSelectedCardIds([]);

  const handleQuickBatchAction = (action: 'approve' | 'delegate') => {
    console.log(`Batch ${action}`, selectedCardIds);
    clearSelectedCards();
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: TOKENS.theme.background,
        color: TOKENS.theme.textPrimary,
        fontFamily: TOKENS.brand.fontFamily,
        padding: TOKENS.spacing['2xl'],
      }}
    >
      <div style={{ maxWidth: 1400, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: TOKENS.spacing['2xl'] }}>
        {/* Header Command Bar */}
        <section
          style={{
            backgroundColor: TOKENS.theme.surface,
            borderRadius: TOKENS.radius.xl,
            border: `1px solid ${TOKENS.theme.divider}`,
            boxShadow: TOKENS.theme.shadow.level3,
            padding: TOKENS.spacing['2xl'],
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              background:
                'linear-gradient(180deg, rgba(125,139,248,0.22) 0%, rgba(206,214,251,0.16) 45%, rgba(255,255,255,0.8) 100%)',
            }}
          />
          <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: TOKENS.spacing['lg'] }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: TOKENS.spacing['2xl'] }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: TOKENS.spacing['sm'], maxWidth: 720 }}>
                <span
                  style={{
                    fontSize: TOKENS.typography.sizes.xs,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: TOKENS.theme.textMuted,
                  }}
                >
                  Executive Action Board • Virtual Admin
                </span>
                <h1
                  style={{
                    fontSize: TOKENS.typography.sizes['3xl'],
                    fontWeight: TOKENS.typography.weight.semibold,
                    lineHeight: TOKENS.typography.lineHeight.tight,
                    margin: 0,
                  }}
                >
                  Good morning, Dana - Workdash prioritized 7 items for today
                </h1>
                <p
                  style={{
                    color: TOKENS.theme.textSecondary,
                    fontSize: TOKENS.typography.sizes.base,
                    lineHeight: TOKENS.typography.lineHeight.normal,
                    margin: 0,
                  }}
                >
                  Fluent UI workspace that blends analytics and execution so you can see exactly what needs you now.
                </p>
              </div>
              <div
                style={{
                  borderRadius: TOKENS.radius.lg,
                  backgroundColor: '#FFFFFF',
                  border: '1px solid rgba(111, 123, 199, 0.25)',
                  boxShadow: '0px 6px 14px rgba(79,107,237,0.12)',
                  padding: `${TOKENS.spacing['sm']}px ${TOKENS.spacing['lg']}px`,
                  minWidth: 180,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: TOKENS.spacing['xs'],
                  alignItems: 'flex-end',
                }}
              >
                <span
                  style={{
                    fontSize: TOKENS.typography.sizes.sm,
                    color: TOKENS.theme.textSecondary,
                    textTransform: 'uppercase',
                    letterSpacing: '0.16em',
                  }}
                >
                  Today
                </span>
                <span
                  style={{
                    fontSize: TOKENS.typography.sizes.lg,
                    fontWeight: TOKENS.typography.weight.semibold,
                    color: TOKENS.theme.textPrimary,
                  }}
                >
                  {formattedTime}
                </span>
                <span
                  style={{
                    fontSize: TOKENS.typography.sizes.sm,
                    color: TOKENS.theme.textSecondary,
                  }}
                >
                  {formattedDate}
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: TOKENS.spacing['sm'], justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: TOKENS.spacing['sm'] }}>
                {filterTabs.map(tab => (
                  <motion.button
                    key={tab.id}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setActiveFilter(tab.id)}
                    style={{
                      borderRadius: TOKENS.radius.md,
                      padding: '8px 16px',
                      fontSize: TOKENS.typography.sizes.sm,
                      fontWeight: TOKENS.typography.weight.medium,
                      border: activeFilter === tab.id ? 'none' : '1px solid rgba(111, 123, 199, 0.25)',
                      background: activeFilter === tab.id ? 'linear-gradient(135deg, #4F6BED, #7A6EF5)' : '#FFFFFF',
                      color: activeFilter === tab.id ? '#FFFFFF' : TOKENS.theme.textSecondary,
                      boxShadow: activeFilter === tab.id ? '0px 8px 18px rgba(79,107,237,0.25)' : 'none',
                      transition: TOKENS.transitions.fast,
                    }}
                  >
                    {tab.label}
                  </motion.button>
                ))}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: TOKENS.spacing['sm'] }}>
                <button
                  style={{
                    borderRadius: TOKENS.radius.md,
                    padding: '8px 16px',
                    fontSize: TOKENS.typography.sizes.sm,
                    fontWeight: TOKENS.typography.weight.medium,
                    border: '1px solid rgba(111, 123, 199, 0.25)',
                    backgroundColor: '#FFFFFF',
                    color: TOKENS.theme.textPrimary,
                  }}
                >
                  Mark All Reviewed
                </button>
                <button
                  style={{
                    borderRadius: TOKENS.radius.md,
                    padding: '8px 16px',
                    fontSize: TOKENS.typography.sizes.sm,
                    fontWeight: TOKENS.typography.weight.medium,
                    border: '1px solid rgba(111, 123, 199, 0.25)',
                    backgroundColor: '#FFFFFF',
                    color: TOKENS.theme.textPrimary,
                  }}
                >
                  Delegate Low Priority
                </button>
                <button
                  style={{
                    borderRadius: TOKENS.radius.md,
                    padding: '8px 16px',
                    fontSize: TOKENS.typography.sizes.sm,
                    fontWeight: TOKENS.typography.weight.medium,
                    border: 'none',
                    background: `linear-gradient(135deg, ${TOKENS.brand.primary}, ${TOKENS.brand.accent})`,
                    color: '#FFFFFF',
                    boxShadow: TOKENS.theme.shadow.level2,
                  }}
                >
                  Refresh
                </button>
                <button
                  style={{
                    borderRadius: TOKENS.radius.md,
                    padding: '8px 16px',
                    fontSize: TOKENS.typography.sizes.sm,
                    fontWeight: TOKENS.typography.weight.medium,
                    border: '1px solid rgba(111, 123, 199, 0.25)',
                    backgroundColor: '#FFFFFF',
                    color: TOKENS.theme.textSecondary,
                    display: 'flex',
                    alignItems: 'center',
                    gap: TOKENS.spacing['xs'],
                  }}
                >
                  <Mic size={16} />
                  “Brief me on critical items.”
                </button>
              </div>
            </div>
          </div>
        </section>

        {selectedCardIds.length > 0 && (
          <div
            style={{
              borderRadius: TOKENS.radius.md,
              border: '1px solid rgba(111, 123, 199, 0.25)',
              backgroundColor: '#FFFFFF',
              boxShadow: '0px 6px 14px rgba(79,107,237,0.12)',
              padding: TOKENS.spacing['md'],
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: TOKENS.spacing['lg'],
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: TOKENS.spacing['sm'] }}>
              <CheckSquare size={16} color={TOKENS.brand.primary} />
              <span style={{ fontSize: TOKENS.typography.sizes.sm, color: TOKENS.theme.textSecondary }}>
                {selectedCardIds.length} item{selectedCardIds.length > 1 ? 's' : ''} selected
              </span>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: TOKENS.spacing['sm'] }}>
              <button
                style={{
                  borderRadius: TOKENS.radius.pill,
                  padding: '6px 14px',
                  backgroundColor: 'rgba(79,107,237,0.16)',
                  color: TOKENS.brand.primary,
                  border: 'none',
                  fontSize: TOKENS.typography.sizes.xs,
                  fontWeight: TOKENS.typography.weight.medium,
                }}
                onClick={() => handleQuickBatchAction('approve')}
              >
                Approve Selected
              </button>
              <button
                style={{
                  borderRadius: TOKENS.radius.pill,
                  padding: '6px 14px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid rgba(111, 123, 199, 0.25)',
                  color: TOKENS.theme.textSecondary,
                  fontSize: TOKENS.typography.sizes.xs,
                  fontWeight: TOKENS.typography.weight.medium,
                }}
                onClick={() => handleQuickBatchAction('delegate')}
              >
                Delegate Selected
              </button>
              <button
                style={{
                  borderRadius: TOKENS.radius.pill,
                  padding: '6px 14px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid rgba(111, 123, 199, 0.15)',
                  color: TOKENS.theme.textSecondary,
                  fontSize: TOKENS.typography.sizes.xs,
                }}
                onClick={clearSelectedCards}
              >
                Clear
              </button>
            </div>
          </div>
        )}

        {/* Main Grid */}
        <section
          style={{
            display: 'grid',
            gap: TOKENS.spacing['2xl'],
            gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)',
          }}
        >
          {/* Left Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: TOKENS.spacing['2xl'] }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: TOKENS.spacing['lg'] }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <h2
                    style={{
                      fontSize: TOKENS.typography.sizes.xl,
                      fontWeight: TOKENS.typography.weight.semibold,
                      margin: 0,
                    }}
                  >
                    Priority Feed
                  </h2>
                  <p
                    style={{
                      color: TOKENS.theme.textSecondary,
                      fontSize: TOKENS.typography.sizes.sm,
                      margin: 0,
                    }}
                  >
                    Ranked by impact × urgency across inbox, meetings, tasks, and insights.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: TOKENS.spacing['lg'] }}>
                {filteredCards.map(card => (
                  <motion.div
                    key={card.id}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.2 }}
                    style={{
                      backgroundColor: TOKENS.theme.surfaceRaised,
                      borderRadius: TOKENS.radius.lg,
                      border: `1px solid rgba(0,0,0,0.06)`,
                      padding: TOKENS.spacing['xl'],
                      boxShadow: TOKENS.theme.shadow.level2,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: TOKENS.spacing['lg'],
                    }}
                  >
                    <div style={{ display: 'flex', gap: TOKENS.spacing['lg'], alignItems: 'flex-start' }}>
                      <button
                        onClick={() => toggleSelectCard(card.id)}
                        style={{
                          border: 'none',
                          background: 'transparent',
                          cursor: 'pointer',
                          padding: 0,
                          marginTop: 4,
                        }}
                        aria-label={selectedCardIds.includes(card.id) ? 'Deselect item' : 'Select item'}
                      >
                        {selectedCardIds.includes(card.id) ? (
                          <CheckSquare size={20} color={TOKENS.brand.primary} />
                        ) : (
                          <Square size={20} color="rgba(111, 123, 199, 0.5)" />
                        )}
                      </button>
                      <div
                        style={{
                          height: 56,
                          width: 56,
                          borderRadius: TOKENS.radius.lg,
                          backgroundColor: TOKENS.theme.secondary,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <card.icon size={22} color={TOKENS.brand.primary} />
                      </div>

                      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: TOKENS.spacing['md'] }}>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: TOKENS.spacing['sm'], alignItems: 'center' }}>
                          <span
                            style={{
                              fontSize: TOKENS.typography.sizes.lg,
                              fontWeight: TOKENS.typography.weight.semibold,
                            }}
                          >
                            {card.title}
                          </span>
                          {card.badges.map(badge => (
                            <span
                              key={badge}
                              style={{
                                borderRadius: TOKENS.radius.pill,
                                padding: '4px 12px',
                                backgroundColor: TOKENS.theme.secondary,
                                color: TOKENS.theme.textSecondary,
                                fontSize: TOKENS.typography.sizes.xs,
                                fontWeight: TOKENS.typography.weight.medium,
                              }}
                            >
                              {badge}
                            </span>
                          ))}
                          <span
                            style={{
                              borderRadius: TOKENS.radius.pill,
                              padding: '4px 12px',
                              backgroundColor: 'rgba(79,107,237,0.18)',
                              color: TOKENS.brand.primary,
                              fontSize: TOKENS.typography.sizes.xs,
                              fontWeight: TOKENS.typography.weight.medium,
                            }}
                          >
                            Impact {card.impactScore}
                          </span>
                        </div>
                        <p
                          style={{
                            color: TOKENS.theme.textSecondary,
                            fontSize: TOKENS.typography.sizes.base,
                            margin: 0,
                          }}
                        >
                          {card.context}
                        </p>
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: TOKENS.spacing['xs'],
                            color: TOKENS.theme.textSecondary,
                            fontSize: TOKENS.typography.sizes.sm,
                          }}
                        >
                          <span>
                            <strong style={{ color: TOKENS.theme.textPrimary }}>Why now:</strong> {card.whyNow}
                          </span>
                          <span>
                            <strong style={{ color: TOKENS.theme.textPrimary }}>Dependencies:</strong> {card.dependencies.join(' · ')}
                          </span>
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: TOKENS.spacing['sm'] }}>
                          <span
                            style={{
                              borderRadius: TOKENS.radius.pill,
                              padding: '4px 12px',
                              backgroundColor: 'rgba(111,123,199,0.12)',
                              color: TOKENS.brand.primary,
                              fontSize: TOKENS.typography.sizes.xs,
                              fontWeight: TOKENS.typography.weight.medium,
                            }}
                          >
                            Prepared by {card.preparedBy}
                          </span>
                          <span
                            style={{
                              borderRadius: TOKENS.radius.pill,
                              padding: '4px 12px',
                              backgroundColor: '#FFFFFF',
                              border: '1px solid rgba(111,123,199,0.2)',
                              color: TOKENS.theme.textSecondary,
                              fontSize: TOKENS.typography.sizes.xs,
                            }}
                          >
                            Updated {card.lastUpdated}
                          </span>
                        </div>
                        <div
                          style={{
                            borderRadius: TOKENS.radius.md,
                            border: `1px dashed rgba(79,107,237,0.25)`,
                            backgroundColor: 'rgba(79,107,237,0.08)',
                            padding: TOKENS.spacing['md'],
                            fontSize: TOKENS.typography.sizes.sm,
                            color: TOKENS.theme.textPrimary,
                          }}
                        >
                          <strong style={{ color: TOKENS.theme.textSecondary }}>AI Insight:</strong> {card.aiInsight}
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: TOKENS.spacing['sm'] }}>
                      {card.actions.map(action => (
                        <button
                          key={action}
                          style={{
                            borderRadius: TOKENS.radius.pill,
                            padding: '8px 16px',
                            backgroundColor: 'rgba(79,107,237,0.15)',
                            color: TOKENS.brand.primary,
                            border: `1px solid rgba(79,107,237,0.35)`,
                            fontSize: TOKENS.typography.sizes.sm,
                            fontWeight: TOKENS.typography.weight.medium,
                          }}
                        >
                          {action}
                        </button>
                      ))}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: TOKENS.spacing['md'] }}>
                      <div
                        style={{
                          position: 'relative',
                          flex: 1,
                          height: 6,
                          borderRadius: TOKENS.radius.pill,
                          backgroundColor: 'rgba(0,0,0,0.08)',
                          overflow: 'hidden',
                        }}
                      >
                        <div
                          style={{
                            position: 'absolute',
                            inset: 0,
                            width: `${Math.min(card.impactScore, 100)}%`,
                            background: urgencyGradients[card.urgencyLabel],
                          }}
                        />
                      </div>
                      <span
                        style={{
                          fontSize: TOKENS.typography.sizes.xs,
                          color: TOKENS.theme.textMuted,
                          letterSpacing: '0.16em',
                        }}
                      >
                        {card.urgencyLabel}
                      </span>
                      {card.confidence && (
                        <span
                          style={{
                            fontSize: TOKENS.typography.sizes.xs,
                            color: TOKENS.theme.textMuted,
                            letterSpacing: '0.16em',
                          }}
                        >
                          Confidence {card.confidence}%
                        </span>
                      )}
                    </div>

                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: TOKENS.spacing['sm'],
                        paddingTop: TOKENS.spacing['xs'],
                        borderTop: '1px solid rgba(0,0,0,0.06)',
                      }}
                    >
                      <span style={{ color: TOKENS.theme.textMuted, fontSize: TOKENS.typography.sizes.xs }}>
                        Let the AI know if this ranking felt right.
                      </span>
                      <div style={{ display: 'flex', gap: TOKENS.spacing['xs'] }}>
                        <button
                          style={{
                            border: 'none',
                            backgroundColor: 'rgba(111,123,199,0.12)',
                            borderRadius: TOKENS.radius.md,
                            padding: TOKENS.spacing['xs'],
                            cursor: 'pointer',
                          }}
                          aria-label="Mark helpful"
                          onClick={() => console.log('positive feedback', card.id)}
                        >
                          <ThumbsUp size={16} color={TOKENS.brand.primary} />
                        </button>
                        <button
                          style={{
                            border: 'none',
                            backgroundColor: 'rgba(111,123,199,0.08)',
                            borderRadius: TOKENS.radius.md,
                            padding: TOKENS.spacing['xs'],
                            cursor: 'pointer',
                          }}
                          aria-label="Mark not helpful"
                          onClick={() => console.log('negative feedback', card.id)}
                        >
                          <ThumbsDown size={16} color={TOKENS.theme.textSecondary} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Quick Responses */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: TOKENS.spacing['lg'] }}>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                <div>
                  <h2
                    style={{
                      fontSize: TOKENS.typography.sizes.xl,
                      fontWeight: TOKENS.typography.weight.semibold,
                      margin: 0,
                    }}
                  >
                    Quick Responses
                  </h2>
                  <p style={{ color: TOKENS.theme.textSecondary, fontSize: TOKENS.typography.sizes.sm, margin: 0 }}>
                    AI drafted replies and approvals are queued for your tap.
                  </p>
                </div>
                <span
                  style={{
                    borderRadius: TOKENS.radius.pill,
                    padding: '4px 12px',
                    backgroundColor: TOKENS.theme.secondary,
                    color: TOKENS.theme.textSecondary,
                    fontSize: TOKENS.typography.sizes.xs,
                    fontWeight: TOKENS.typography.weight.medium,
                  }}
                >
                  Horizontal scroll
                </span>
              </div>

              <div style={{ display: 'flex', gap: TOKENS.spacing['md'], overflowX: 'auto', paddingBottom: TOKENS.spacing['sm'] }}>
                {quickDrafts.map(draft => (
                  <motion.div
                    key={draft.id}
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.2 }}
                    style={{
                      minWidth: 260,
                      backgroundColor: TOKENS.theme.surfaceRaised,
                      borderRadius: TOKENS.radius.lg,
                      border: `1px solid rgba(0,0,0,0.06)`,
                      padding: TOKENS.spacing['lg'],
                      boxShadow: TOKENS.theme.shadow.level2,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: TOKENS.spacing['md'],
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: TOKENS.spacing['sm'] }}>
                      <div
                        style={{
                          height: 46,
                          width: 46,
                          borderRadius: TOKENS.radius.lg,
                          backgroundColor: TOKENS.theme.secondary,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <draft.icon size={18} color={TOKENS.brand.primary} />
                      </div>
                      <div>
                        <p style={{ margin: 0, fontSize: TOKENS.typography.sizes.sm, fontWeight: TOKENS.typography.weight.semibold }}>
                          {draft.title}
                        </p>
                        <span style={{ fontSize: TOKENS.typography.sizes.xs, color: TOKENS.theme.textMuted }}>{draft.preparedAt}</span>
                      </div>
                    </div>
                    <p
                      style={{
                        color: TOKENS.theme.textSecondary,
                        fontSize: TOKENS.typography.sizes.sm,
                        lineHeight: TOKENS.typography.lineHeight.relaxed,
                        margin: 0,
                      }}
                    >
                      {draft.draft}
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: TOKENS.spacing['sm'] }}>
                      {draft.actions.map(action => (
                        <button
                          key={action}
                          style={{
                            borderRadius: TOKENS.radius.pill,
                            padding: '8px 16px',
                            border: `1px solid rgba(79,107,237,0.35)`,
                            backgroundColor: 'rgba(79,107,237,0.15)',
                            color: TOKENS.brand.primary,
                            fontSize: TOKENS.typography.sizes.sm,
                            fontWeight: TOKENS.typography.weight.medium,
                          }}
                        >
                          {action}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: TOKENS.spacing['2xl'] }}>
            <div
              style={{
                backgroundColor: TOKENS.theme.surface,
                borderRadius: TOKENS.radius.lg,
                border: `1px solid ${TOKENS.theme.divider}`,
                boxShadow: TOKENS.theme.shadow.level2,
                padding: TOKENS.spacing['xl'],
                display: 'flex',
                flexDirection: 'column',
                gap: TOKENS.spacing['lg'],
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: TOKENS.spacing['sm'], alignItems: 'flex-start' }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: TOKENS.typography.sizes.lg, fontWeight: TOKENS.typography.weight.semibold }}>Today’s Focus</h3>
                  <p style={{ margin: 0, color: TOKENS.theme.textSecondary, fontSize: TOKENS.typography.sizes.sm }}>
                    Insight Agent refreshes priorities every hour.
                  </p>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: TOKENS.spacing['xs'] }}>
                  <button
                    style={{
                      borderRadius: TOKENS.radius.pill,
                      padding: '6px 14px',
                      backgroundColor: 'rgba(79,107,237,0.16)',
                      color: TOKENS.brand.primary,
                      border: 'none',
                      fontSize: TOKENS.typography.sizes.xs,
                      fontWeight: TOKENS.typography.weight.medium,
                    }}
                  >
                    Open All
                  </button>
                  <button
                    style={{
                      borderRadius: TOKENS.radius.pill,
                      padding: '6px 14px',
                      backgroundColor: TOKENS.theme.secondary,
                      color: TOKENS.theme.textSecondary,
                      border: `1px solid ${TOKENS.theme.divider}`,
                      fontSize: TOKENS.typography.sizes.xs,
                      fontWeight: TOKENS.typography.weight.medium,
                    }}
                  >
                    Delegate #2
                  </button>
                  <button
                    style={{
                      borderRadius: TOKENS.radius.pill,
                      padding: '6px 14px',
                      backgroundColor: TOKENS.theme.secondary,
                      color: TOKENS.theme.textSecondary,
                      border: `1px solid ${TOKENS.theme.divider}`,
                      fontSize: TOKENS.typography.sizes.xs,
                      fontWeight: TOKENS.typography.weight.medium,
                    }}
                  >
                    Start Focus Mode
                  </button>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: TOKENS.spacing['sm'], fontSize: TOKENS.typography.sizes.base }}>
                <span style={{ color: TOKENS.theme.textSecondary }}>“Your top priorities today are:</span>
                {[
                  'Approve Pet campaign creative (High impact)',
                  'Review CFO margin update (before 3 PM)',
                  'Investor brief rehearsal (2:30 PM prep slot auto-added)',
                ].map((item, index) => (
                  <div key={item} style={{ display: 'flex', gap: TOKENS.spacing['sm'], alignItems: 'flex-start' }}>
                    <span
                      style={{
                        borderRadius: TOKENS.radius.pill,
                        padding: '6px 12px',
                        backgroundColor: 'rgba(79,107,237,0.12)',
                        color: TOKENS.brand.primary,
                        fontSize: TOKENS.typography.sizes.sm,
                        fontWeight: TOKENS.typography.weight.semibold,
                      }}
                    >
                      {index + 1}️⃣
                    </span>
                    <p style={{ margin: 0 }}>{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div
              style={{
                backgroundColor: TOKENS.theme.surface,
                borderRadius: TOKENS.radius.lg,
                border: `1px solid ${TOKENS.theme.divider}`,
                boxShadow: TOKENS.theme.shadow.level2,
                padding: TOKENS.spacing['xl'],
                display: 'flex',
                flexDirection: 'column',
                gap: TOKENS.spacing['lg'],
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h3 style={{ margin: 0, fontSize: TOKENS.typography.sizes.lg, fontWeight: TOKENS.typography.weight.semibold }}>Micro-Metrics</h3>
                <span style={{ fontSize: TOKENS.typography.sizes.xs, color: TOKENS.theme.textMuted }}>Hover for forecast</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: TOKENS.spacing['sm'] }}>
                {microMetrics.map(metric => {
                  const isActive = activeMetricFilter === metric.id;
                  return (
                    <motion.div
                      key={metric.id}
                      whileHover={{ y: -2 }}
                      transition={{ duration: 0.2 }}
                      onClick={() => setActiveMetricFilter(prev => (prev === metric.id ? null : metric.id))}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: TOKENS.spacing['md'],
                        backgroundColor: isActive ? 'rgba(79,107,237,0.16)' : 'rgba(79,107,237,0.08)',
                        borderRadius: TOKENS.radius.md,
                        border: `1px solid ${isActive ? 'rgba(79,107,237,0.35)' : 'rgba(79,107,237,0.2)'}`,
                        cursor: 'pointer',
                      }}
                    >
                    <div>
                      <p
                        style={{
                          margin: 0,
                          fontSize: TOKENS.typography.sizes.xs,
                          letterSpacing: '0.16em',
                          color: TOKENS.theme.textMuted,
                        }}
                      >
                        {metric.label}
                      </p>
                      <p style={{ margin: 0, fontSize: TOKENS.typography.sizes.lg, fontWeight: TOKENS.typography.weight.semibold }}>{metric.value}</p>
                    </div>
                    {metric.trend && (
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: TOKENS.spacing['xs'],
                          fontSize: TOKENS.typography.sizes.xs,
                          color: metric.trend === 'up' ? TOKENS.theme.success : TOKENS.theme.warning,
                          fontWeight: TOKENS.typography.weight.semibold,
                        }}
                      >
                        {metric.trend === 'up' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                        {metric.trendLabel}
                      </span>
                    )}
                    </motion.div>
                  );
                })}
              </div>
              <p style={{ color: TOKENS.theme.textMuted, fontSize: TOKENS.typography.sizes.xs, margin: 0 }}>
                AI forecast: Merge the low-impact sync to unlock ~2 extra hours today.
              </p>
            </div>

            <div
              style={{
                backgroundColor: TOKENS.theme.surface,
                borderRadius: TOKENS.radius.lg,
                border: `1px solid ${TOKENS.theme.divider}`,
                boxShadow: TOKENS.theme.shadow.level2,
                padding: TOKENS.spacing['xl'],
                display: 'flex',
                flexDirection: 'column',
                gap: TOKENS.spacing['lg'],
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: TOKENS.spacing['sm'] }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: TOKENS.typography.sizes.lg, fontWeight: TOKENS.typography.weight.semibold }}>AI Brief of the Day</h3>
                  <p style={{ margin: 0, color: TOKENS.theme.textSecondary, fontSize: TOKENS.typography.sizes.sm }}>Narrative Agent • Speech enabled</p>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: TOKENS.spacing['xs'] }}>
                  <button
                    style={{
                      borderRadius: TOKENS.radius.pill,
                      padding: '6px 14px',
                      backgroundColor: 'rgba(79,107,237,0.16)',
                      color: TOKENS.brand.primary,
                      border: 'none',
                      fontSize: TOKENS.typography.sizes.xs,
                      fontWeight: TOKENS.typography.weight.medium,
                    }}
                  >
                    Open Deck
                  </button>
                  <button
                    style={{
                      borderRadius: TOKENS.radius.pill,
                      padding: '6px 14px',
                      backgroundColor: TOKENS.theme.secondary,
                      color: TOKENS.theme.textSecondary,
                      border: `1px solid ${TOKENS.theme.divider}`,
                      fontSize: TOKENS.typography.sizes.xs,
                      fontWeight: TOKENS.typography.weight.medium,
                    }}
                  >
                    Play Brief
                  </button>
                </div>
              </div>
              <div
                style={{
                  borderRadius: TOKENS.radius.md,
                  border: `1px solid rgba(79,107,237,0.2)`,
                  backgroundColor: 'rgba(79,107,237,0.1)',
                  padding: TOKENS.spacing['lg'],
                  fontSize: TOKENS.typography.sizes.base,
                  lineHeight: TOKENS.typography.lineHeight.relaxed,
                }}
              >
                “Today’s AI forecast: Revenue discussion will anchor the investor call. Pet segment outperformance keeps the story strong — slides are staged in your deck folder.”
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: TOKENS.spacing['sm'], color: TOKENS.theme.textMuted, fontSize: TOKENS.typography.sizes.xs }}>
                <Headphones size={16} color={TOKENS.brand.primary} />
                Listen hands-free with fluent narration.
              </div>
            </div>
          </div>
        </section>

        {/* Footer Summary */}
        <section
          style={{
            backgroundColor: TOKENS.theme.surface,
            borderRadius: TOKENS.radius.lg,
            border: `1px solid ${TOKENS.theme.divider}`,
            boxShadow: TOKENS.theme.shadow.level2,
            padding: TOKENS.spacing['xl'],
            display: 'flex',
            flexWrap: 'wrap',
            gap: TOKENS.spacing['xl'],
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: TOKENS.spacing['xl'], alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: TOKENS.spacing['md'] }}>
              <div style={{ height: 60, width: 60, position: 'relative' }}>
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: TOKENS.radius.pill,
                    border: '6px solid rgba(79,107,237,0.2)',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 6,
                    borderRadius: TOKENS.radius.pill,
                    border: `6px solid ${TOKENS.brand.primary}`,
                    borderTopColor: 'transparent',
                    transform: 'rotate(45deg)',
                  }}
                />
              </div>
              <div>
                <p style={{ color: TOKENS.theme.textMuted, fontSize: TOKENS.typography.sizes.xs, letterSpacing: '0.16em', margin: 0, textTransform: 'uppercase' }}>
                  Actions cleared today
                </p>
                <h4 style={{ margin: 0, fontSize: TOKENS.typography.sizes.lg, fontWeight: TOKENS.typography.weight.semibold }}>4 / 7</h4>
                <span style={{ color: TOKENS.theme.textSecondary, fontSize: TOKENS.typography.sizes.xs }}>2 remaining critical emails.</span>
              </div>
            </div>
            <div>
              <p style={{ color: TOKENS.theme.textMuted, fontSize: TOKENS.typography.sizes.xs, letterSpacing: '0.16em', margin: 0, textTransform: 'uppercase' }}>
                Time saved by AI
              </p>
              <h4 style={{ margin: 0, fontSize: TOKENS.typography.sizes.lg, fontWeight: TOKENS.typography.weight.semibold }}>2.3 h</h4>
              <span style={{ color: TOKENS.theme.textSecondary, fontSize: TOKENS.typography.sizes.xs }}>Auto-approved routine reschedules.</span>
            </div>
            <div>
              <p style={{ color: TOKENS.theme.textMuted, fontSize: TOKENS.typography.sizes.xs, letterSpacing: '0.16em', margin: 0, textTransform: 'uppercase' }}>
                AI accuracy
              </p>
              <h4 style={{ margin: 0, fontSize: TOKENS.typography.sizes.lg, fontWeight: TOKENS.typography.weight.semibold }}>94%</h4>
              <span style={{ color: TOKENS.theme.textSecondary, fontSize: TOKENS.typography.sizes.xs }}>Measured across recommendations.</span>
            </div>
          </div>
          <p style={{ color: TOKENS.theme.textSecondary, fontSize: TOKENS.typography.sizes.sm, margin: 0 }}>
            “Your AI team handled 17 routine tasks since morning — saving you roughly 2 hours.”
          </p>
        </section>

        {/* Agents + Components */}
        <section style={{ display: 'grid', gap: TOKENS.spacing['2xl'] }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: TOKENS.spacing['lg'] }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: TOKENS.spacing['sm'] }}>
              <Sparkles size={16} color={TOKENS.brand.primary} />
              <span style={{ fontSize: TOKENS.typography.sizes.xs, letterSpacing: '0.16em', color: TOKENS.theme.textMuted, textTransform: 'uppercase' }}>
                Agents behind this board
              </span>
            </div>
            <div
              style={{
                display: 'grid',
                gap: TOKENS.spacing['lg'],
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              }}
            >
              {agentRoster.map(agent => (
                <div
                  key={agent.id}
                  style={{
                    backgroundColor: TOKENS.theme.surface,
                    borderRadius: TOKENS.radius.lg,
                    border: `1px solid ${TOKENS.theme.divider}`,
                    boxShadow: TOKENS.theme.shadow.level1,
                    padding: TOKENS.spacing['lg'],
                    display: 'flex',
                    alignItems: 'center',
                    gap: TOKENS.spacing['md'],
                  }}
                >
                  <div
                    style={{
                      height: 44,
                      width: 44,
                      borderRadius: TOKENS.radius.md,
                      backgroundColor: 'rgba(79,107,237,0.18)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <agent.icon size={20} color={TOKENS.brand.primary} />
                  </div>
                  <div>
                    <p style={{ margin: 0, fontSize: TOKENS.typography.sizes.base, fontWeight: TOKENS.typography.weight.semibold }}>{agent.name}</p>
                    <p style={{ margin: 0, color: TOKENS.theme.textSecondary, fontSize: TOKENS.typography.sizes.sm }}>{agent.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              backgroundColor: TOKENS.theme.surface,
              borderRadius: TOKENS.radius.lg,
              border: `1px solid ${TOKENS.theme.divider}`,
              boxShadow: TOKENS.theme.shadow.level1,
              padding: TOKENS.spacing['xl'],
              display: 'grid',
              gap: TOKENS.spacing['lg'],
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              color: TOKENS.theme.textSecondary,
              fontSize: TOKENS.typography.sizes.sm,
            }}
          >
            <div>
              <p style={{ margin: 0, fontWeight: TOKENS.typography.weight.semibold, color: TOKENS.theme.textPrimary }}>Header</p>
              <p style={{ margin: 0 }}>CommandBar, SearchBox, Dropdown, PersonaButton</p>
            </div>
            <div>
              <p style={{ margin: 0, fontWeight: TOKENS.typography.weight.semibold, color: TOKENS.theme.textPrimary }}>Priority Feed</p>
              <p style={{ margin: 0 }}>Card, Stack, Badge, CommandButton, ProgressIndicator</p>
            </div>
            <div>
              <p style={{ margin: 0, fontWeight: TOKENS.typography.weight.semibold, color: TOKENS.theme.textPrimary }}>Quick Responses</p>
              <p style={{ margin: 0 }}>HorizontalScroll, Card, TeachingBubble</p>
            </div>
            <div>
              <p style={{ margin: 0, fontWeight: TOKENS.typography.weight.semibold, color: TOKENS.theme.textPrimary }}>Context Insights</p>
              <p style={{ margin: 0 }}>Panel, Card, Label, Tooltip</p>
            </div>
            <div>
              <p style={{ margin: 0, fontWeight: TOKENS.typography.weight.semibold, color: TOKENS.theme.textPrimary }}>Footer</p>
              <p style={{ margin: 0 }}>ProgressRing, Stack, Text</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
