'use client';

import { motion } from 'framer-motion';
import { AlertCircle, Clock, CheckCircle, TrendingUp, AlertTriangle, Activity, User, Calendar, QrCode, BarChart3 } from 'lucide-react';
import { formatDistanceToNow, format, addDays, startOfWeek } from 'date-fns';
import { mockTasks, mockUsers } from '@/lib/mockData';
import type { ActivityLogItem } from '@/lib/types';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { QRCodeSVG } from 'qrcode.react';

interface TVViewProps {
  activities?: ActivityLogItem[];
}

export default function TVView({ activities = [] }: TVViewProps) {
  const needsApproval = mockTasks.filter((t) => t.status === 'needs_approval');
  const overdue = mockTasks.filter((t) => t.status === 'overdue');
  const inProgress = mockTasks.filter((t) => t.status === 'in_progress');
  const completed = mockTasks.filter((t) => t.status === 'done');

  const complianceScore = 92;

  const problems = [
    { id: '1', title: 'Spill in Lab Room 3', severity: 'urgent', dept: 'Clinical' },
    { id: '2', title: 'Broken window Facility B', severity: 'high', dept: 'Facilities' },
    { id: '3', title: 'HVAC fluctuation', severity: 'medium', dept: 'Facilities' },
  ];

  const collections = [
    { name: 'Morning Clinical', progress: 80, current: 8, total: 10 },
    { name: 'Facilities Monthly', progress: 80, current: 12, total: 15 },
    { name: 'Radiology Safety', progress: 67, current: 4, total: 6 },
  ];

  // Trending data for the last 7 days
  const trendingData = [
    { day: 'Mon', completed: 45, compliance: 89 },
    { day: 'Tue', completed: 52, compliance: 91 },
    { day: 'Wed', completed: 48, compliance: 88 },
    { day: 'Thu', completed: 61, compliance: 94 },
    { day: 'Fri', completed: 55, compliance: 92 },
    { day: 'Sat', completed: 38, compliance: 85 },
    { day: 'Sun', completed: 42, compliance: 87 },
  ];

  // Department distribution for pie chart
  const deptDistribution = [
    { name: 'Clinical', value: 35, color: '#22d3ee' },
    { name: 'Facilities', value: 28, color: '#a855f7' },
    { name: 'Radiology', value: 22, color: '#06b6d4' },
    { name: 'Admin', value: 15, color: '#f59e0b' },
  ];

  // Calendar events for the week
  const weekStart = startOfWeek(new Date());
  const calendarEvents = [
    { date: format(addDays(weekStart, 1), 'MMM d'), events: 12, label: 'Mon' },
    { date: format(addDays(weekStart, 2), 'MMM d'), events: 18, label: 'Tue' },
    { date: format(addDays(weekStart, 3), 'MMM d'), events: 15, label: 'Wed' },
    { date: format(addDays(weekStart, 4), 'MMM d'), events: 21, label: 'Thu' },
    { date: format(addDays(weekStart, 5), 'MMM d'), events: 16, label: 'Fri' },
  ];

  return (
    <div className="h-full p-4 overflow-hidden">
      {/* Compact Header Stats Bar */}
      <div className="grid grid-cols-8 gap-2 mb-3">
        {/* Compliance - Takes 2 columns */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="col-span-2 bg-gradient-to-br from-green-500 to-emerald-600 dark:from-green-600 dark:to-emerald-700 rounded-lg p-3 text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[10px] font-medium opacity-90 mb-0.5">Compliance</div>
              <div className="text-3xl font-bold tracking-tight">{complianceScore}%</div>
              <div className="text-[9px] opacity-75 flex items-center gap-1 mt-0.5">
                <TrendingUp className="w-2.5 h-2.5" />
                +3% today
              </div>
            </div>
            <CheckCircle className="w-12 h-12 opacity-20" />
          </div>
        </motion.div>

        {/* Quick Stats - 4 columns */}
        <StatCard icon={CheckCircle} label="Completed" value={completed.length} color="green" delay={0.1} />
        <StatCard icon={Activity} label="In Progress" value={inProgress.length} color="yellow" delay={0.15} />
        <StatCard icon={AlertCircle} label="Needs Approval" value={needsApproval.length} color="blue" delay={0.2} />
        <StatCard icon={Clock} label="Overdue" value={overdue.length} color="red" delay={0.25} />

        {/* Active Now - Takes 2 columns on the right */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="col-span-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-2"
        >
          <div className="flex items-center gap-1.5 mb-1.5">
            <User className="w-3 h-3 text-zinc-600 dark:text-zinc-400" />
            <h3 className="text-[10px] font-semibold text-zinc-900 dark:text-zinc-100">Active Now</h3>
            <span className="text-xs font-bold text-zinc-600 dark:text-zinc-400 ml-auto">{mockUsers.length}</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {mockUsers.map((user) => (
              <div
                key={user.id}
                className="w-7 h-7 rounded-full flex items-center justify-center text-[8px] font-bold text-white border border-white dark:border-zinc-900"
                style={{ backgroundColor: user.role_color }}
                title={user.full_name}
              >
                {user.role}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Main Grid - 4 columns (was 3) to pack more */}
      <div className="grid grid-cols-4 gap-2 h-[calc(100%-100px)]">
        {/* Column 1: Needs Approval + Overdue */}
        <div className="space-y-2">
          {/* Needs Approval */}
          <CompactCard
            title="Needs Approval"
            count={needsApproval.length}
            color="blue"
            icon={AlertCircle}
            delay={0.3}
          >
            {needsApproval.slice(0, 3).map((task) => (
              <div key={task.id} className="p-1.5 bg-blue-50 dark:bg-blue-900/10 rounded text-[10px]">
                <div className="font-medium text-zinc-900 dark:text-zinc-100 truncate">{task.title}</div>
                <div className="text-zinc-500 dark:text-zinc-400 text-[9px] mt-0.5">{task.department?.name}</div>
              </div>
            ))}
          </CompactCard>

          {/* Overdue */}
          <CompactCard
            title="Overdue"
            count={overdue.length}
            color="red"
            icon={Clock}
            delay={0.35}
          >
            {overdue.slice(0, 2).map((task) => (
              <div key={task.id} className="p-1.5 bg-red-50 dark:bg-red-900/10 rounded text-[10px] border border-red-200 dark:border-red-800">
                <div className="font-medium text-zinc-900 dark:text-zinc-100 truncate">{task.title}</div>
                <div className="text-zinc-500 dark:text-zinc-400 text-[9px] mt-0.5">{task.department?.name}</div>
              </div>
            ))}
          </CompactCard>

          {/* Department Scores */}
          <CompactCard title="Department Scores" color="purple" delay={0.4}>
            <div className="space-y-1">
              <DeptScore name="Clinical Ops" score={96} />
              <DeptScore name="Facilities" score={88} />
              <DeptScore name="Radiology" score={92} />
              <DeptScore name="Administration" score={98} />
            </div>
          </CompactCard>
        </div>

        {/* Column 2: Problems + Collections */}
        <div className="space-y-2">
          {/* Problems */}
          <CompactCard
            title="Problems"
            count={problems.length}
            color="orange"
            icon={AlertTriangle}
            delay={0.45}
          >
            {problems.map((problem) => (
              <div key={problem.id} className="p-1.5 border border-zinc-200 dark:border-zinc-700 rounded text-[10px] flex items-start gap-1.5">
                <div className={`w-1 h-1 rounded-full mt-1 flex-shrink-0 ${
                  problem.severity === 'urgent' ? 'bg-red-500 animate-pulse' :
                  problem.severity === 'high' ? 'bg-orange-500' : 'bg-yellow-500'
                }`} />
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-zinc-900 dark:text-zinc-100 truncate">{problem.title}</div>
                  <div className="text-zinc-500 dark:text-zinc-400 text-[9px]">{problem.dept}</div>
                </div>
              </div>
            ))}
          </CompactCard>

          {/* Incomplete Collections */}
          <CompactCard title="Collections" color="cyan" delay={0.5}>
            {collections.map((col) => (
              <div key={col.name} className="p-1.5 border border-zinc-200 dark:border-zinc-700 rounded">
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-[10px] font-medium text-zinc-900 dark:text-zinc-100 truncate">{col.name}</span>
                  <span className="text-[9px] font-semibold text-zinc-600 dark:text-zinc-400 flex-shrink-0">
                    {col.current}/{col.total}
                  </span>
                </div>
                <div className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-full h-1">
                  <div className="bg-cyan-500 h-1 rounded-full" style={{ width: `${col.progress}%` }} />
                </div>
              </div>
            ))}
          </CompactCard>

          {/* Completion Summary */}
          <CompactCard title="Summary" delay={0.55}>
            <div className="grid grid-cols-3 gap-1.5">
              <div className="text-center p-1.5 bg-green-50 dark:bg-green-900/10 rounded">
                <div className="text-lg font-bold text-green-600 dark:text-green-400">94%</div>
                <div className="text-[8px] text-zinc-600 dark:text-zinc-400">Today</div>
              </div>
              <div className="text-center p-1.5 bg-blue-50 dark:bg-blue-900/10 rounded">
                <div className="text-lg font-bold text-blue-600 dark:text-blue-400">89%</div>
                <div className="text-[8px] text-zinc-600 dark:text-zinc-400">Week</div>
              </div>
              <div className="text-center p-1.5 bg-purple-50 dark:bg-purple-900/10 rounded">
                <div className="text-lg font-bold text-purple-600 dark:text-purple-400">91%</div>
                <div className="text-[8px] text-zinc-600 dark:text-zinc-400">Month</div>
              </div>
            </div>
          </CompactCard>
        </div>

        {/* Column 3: In Progress + Trending Chart + QR Code */}
        <div className="space-y-2">
          {/* In Progress */}
          <CompactCard
            title="In Progress"
            count={inProgress.length}
            color="yellow"
            icon={Activity}
            delay={0.6}
          >
            {inProgress.slice(0, 4).map((task) => (
              <div key={task.id} className="p-1.5 bg-yellow-50 dark:bg-yellow-900/10 rounded text-[10px]">
                <div className="font-medium text-zinc-900 dark:text-zinc-100 truncate">{task.title}</div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-zinc-500 dark:text-zinc-400 text-[9px]">{task.department?.name}</span>
                  {task.assigned_user && (
                    <span className="text-[8px] px-1 py-0.5 rounded-full bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300">
                      {task.assigned_user.role}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </CompactCard>

          {/* Trending Chart */}
          <CompactCard title="7-Day Trend" color="blue" icon={TrendingUp} delay={0.65}>
            <div className="h-32">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendingData}>
                  <defs>
                    <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                  <XAxis dataKey="day" tick={{ fontSize: 9 }} stroke="#888" />
                  <YAxis tick={{ fontSize: 9 }} stroke="#888" />
                  <Tooltip 
                    contentStyle={{ 
                      fontSize: '10px', 
                      backgroundColor: 'rgba(0,0,0,0.8)', 
                      border: 'none',
                      borderRadius: '6px',
                      color: 'white'
                    }} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="completed" 
                    stroke="#22d3ee" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorCompleted)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CompactCard>

          {/* QR Code Widget */}
          <CompactCard title="TV Dashboard" color="purple" icon={QrCode} delay={0.7}>
            <div className="flex flex-col items-center justify-center p-2">
              <QRCodeSVG 
                value={typeof window !== 'undefined' ? window.location.href : 'https://outcomeview.com/dashboard/tv'}
                size={80}
                level="M"
                includeMargin={false}
              />
              <div className="text-[8px] text-zinc-600 dark:text-zinc-400 mt-1.5 text-center">
                Scan to view dashboard
              </div>
            </div>
          </CompactCard>
        </div>

        {/* Column 4: Calendar, Department Distribution & Live Activity */}
        <div className="space-y-2">
          {/* Calendar View */}
          <CompactCard title="This Week" color="cyan" icon={Calendar} delay={0.75}>
            <div className="space-y-1.5">
              {calendarEvents.map((day) => (
                <div key={day.date} className="flex items-center justify-between p-1.5 bg-cyan-50 dark:bg-cyan-900/10 rounded">
                  <div className="flex items-center gap-2">
                    <div className="text-center min-w-[32px]">
                      <div className="text-[10px] font-bold text-cyan-600 dark:text-cyan-400">{day.label}</div>
                      <div className="text-[8px] text-zinc-500 dark:text-zinc-400">{day.date}</div>
                    </div>
                    <div className="w-full bg-zinc-200 dark:bg-zinc-700 rounded-full h-1.5" style={{ width: '60px' }}>
                      <div 
                        className="bg-cyan-500 h-1.5 rounded-full" 
                        style={{ width: `${(day.events / 25) * 100}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold text-zinc-700 dark:text-zinc-300 ml-2">{day.events}</span>
                </div>
              ))}
            </div>
          </CompactCard>

          {/* Department Distribution */}
          <CompactCard title="Tasks by Department" color="purple" icon={BarChart3} delay={0.8}>
            <div className="flex items-center justify-center h-32">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={deptDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={25}
                    outerRadius={45}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {deptDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      fontSize: '10px', 
                      backgroundColor: 'rgba(0,0,0,0.8)', 
                      border: 'none',
                      borderRadius: '6px',
                      color: 'white'
                    }} 
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-1 mt-1">
              {deptDistribution.map((dept) => (
                <div key={dept.name} className="flex items-center gap-1 text-[9px]">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: dept.color }} />
                  <span className="text-zinc-700 dark:text-zinc-300">{dept.name}</span>
                  <span className="font-semibold text-zinc-900 dark:text-zinc-100">{dept.value}</span>
                </div>
              ))}
            </div>
          </CompactCard>

          {/* Compact Live Activity */}
          <CompactCard title="Live Activity" color="green" delay={0.85}>
            <div className="space-y-1 max-h-[180px] overflow-y-auto">
              {activities.slice(0, 6).map((activity) => (
                <div
                  key={activity.id}
                  className="p-1.5 bg-zinc-50 dark:bg-zinc-800/50 rounded text-[9px]"
                >
                  <div className="flex items-center gap-1.5">
                    <div
                      className="w-4 h-4 rounded-full flex items-center justify-center text-[7px] font-bold text-white flex-shrink-0"
                      style={{ backgroundColor: activity.user?.role_color || '#666' }}
                    >
                      {activity.user?.role || '?'}
                    </div>
                    <span className="font-semibold text-zinc-900 dark:text-zinc-100 truncate flex-1 text-[9px]">
                      {activity.user?.full_name?.split(' ')[0] || 'User'}
                    </span>
                    <span className="text-[7px] text-zinc-500 dark:text-zinc-400">
                      {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true }).replace(' ago', '').replace('about ', '')}
                    </span>
                  </div>
                  <div className="text-zinc-700 dark:text-zinc-300 truncate text-[9px] ml-5">
                    {activity.action === 'completed' && '✅'}
                    {activity.action === 'started' && '▶️'}
                    {activity.action === 'updated' && '📝'}
                    {activity.action === 'flagged' && '🚩'}
                    {' '}
                    {activity.task?.title}
                  </div>
                </div>
              ))}
            </div>
          </CompactCard>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, color, delay }: any) {
  const colors: Record<string, string> = {
    green: 'from-green-500 to-emerald-600 dark:from-green-600 dark:to-emerald-700',
    yellow: 'from-yellow-500 to-amber-600 dark:from-yellow-600 dark:to-amber-700',
    blue: 'from-blue-500 to-cyan-600 dark:from-blue-600 dark:to-cyan-700',
    red: 'from-red-500 to-rose-600 dark:from-red-600 dark:to-rose-700',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className={`bg-gradient-to-br ${colors[color] || colors.blue} rounded-lg p-2 text-white`}
    >
      <Icon className="w-3 h-3 opacity-75 mb-0.5" />
      <div className="text-xl font-bold">{value}</div>
      <div className="text-[9px] opacity-90">{label}</div>
    </motion.div>
  );
}

function CompactCard({ title, count, color = 'gray', icon: Icon, children, delay = 0 }: any) {
  const colors: Record<string, string> = {
    blue: 'border-blue-200 dark:border-blue-800',
    red: 'border-red-200 dark:border-red-800',
    orange: 'border-orange-200 dark:border-orange-800',
    green: 'border-green-200 dark:border-green-800',
    yellow: 'border-yellow-200 dark:border-yellow-800',
    cyan: 'border-cyan-200 dark:border-cyan-800',
    purple: 'border-purple-200 dark:border-purple-800',
    gray: 'border-zinc-200 dark:border-zinc-800',
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
      className={`bg-white dark:bg-zinc-900 border ${colors[color]} rounded-lg p-2 overflow-hidden`}
    >
      <div className="flex items-center gap-1.5 mb-1.5">
        {Icon && <Icon className="w-3 h-3 text-zinc-600 dark:text-zinc-400" />}
        <h3 className="text-[10px] font-semibold text-zinc-900 dark:text-zinc-100 flex-1">{title}</h3>
        {count !== undefined && (
          <span className="text-xs font-bold text-zinc-600 dark:text-zinc-400">{count}</span>
        )}
      </div>
      <div className="space-y-1">
        {children}
      </div>
    </motion.div>
  );
}

function DeptScore({ name, score }: { name: string; score: number }) {
  const color = score >= 95 ? 'text-green-600 dark:text-green-400' :
                score >= 90 ? 'text-blue-600 dark:text-blue-400' :
                'text-yellow-600 dark:text-yellow-400';

  return (
    <div className="flex items-center justify-between text-[10px]">
      <span className="text-zinc-600 dark:text-zinc-400 truncate">{name}</span>
      <span className={`font-semibold ${color}`}>{score}%</span>
    </div>
  );
}

