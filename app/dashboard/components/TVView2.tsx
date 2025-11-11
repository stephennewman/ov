'use client';

import { motion } from 'framer-motion';
import { 
  AlertCircle, Clock, CheckCircle, TrendingUp, AlertTriangle, Activity, 
  User, Calendar, QrCode, BarChart3, CalendarDays, PlayCircle, 
  Target, Award, FileSignature, Zap, Maximize, Minimize
} from 'lucide-react';
import { formatDistanceToNow, format, addDays, startOfWeek, addHours, addMinutes } from 'date-fns';
import { mockTasks, mockUsers, mockDepartments } from '@/lib/mockData';
import type { ActivityLogItem } from '@/lib/types';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { QRCodeSVG } from 'qrcode.react';
import { useState, useRef } from 'react';

interface TVView2Props {
  activities?: ActivityLogItem[];
}

export default function TVView2({ activities = [] }: TVView2Props) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const needsApproval = mockTasks.filter((t) => t.status === 'needs_approval');
  const overdue = mockTasks.filter((t) => t.status === 'overdue');
  const inProgress = mockTasks.filter((t) => t.status === 'in_progress');
  const completed = mockTasks.filter((t) => t.status === 'done');
  const notStarted = mockTasks.filter((t) => t.status === 'not_started');

  const complianceScore = 92;

  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) {
      // Enter fullscreen
      try {
        if (containerRef.current) {
          await containerRef.current.requestFullscreen();
          setIsFullscreen(true);
        }
      } catch (err) {
        console.error('Error attempting to enable fullscreen:', err);
      }
    } else {
      // Exit fullscreen
      try {
        await document.exitFullscreen();
        setIsFullscreen(false);
      } catch (err) {
        console.error('Error attempting to exit fullscreen:', err);
      }
    }
  };

  // UPCOMING DATA (Left Section)
  const upcomingTasks = [
    { id: '1', title: 'Safety Training Session', time: 'Today, 2:00 PM', dept: 'Clinical', priority: 'high' },
    { id: '2', title: 'Equipment Maintenance Review', time: 'Today, 4:30 PM', dept: 'Facilities', priority: 'medium' },
    { id: '3', title: 'Weekly Team Standup', time: 'Tomorrow, 9:00 AM', dept: 'Administration', priority: 'low' },
    { id: '4', title: 'Quarterly Compliance Audit', time: 'Wed, 10:00 AM', dept: 'Clinical', priority: 'high' },
    { id: '5', title: 'Fire Drill Exercise', time: 'Thu, 11:00 AM', dept: 'Facilities', priority: 'high' },
    { id: '6', title: 'MRI System Upgrade', time: 'Fri, 1:00 PM', dept: 'Radiology', priority: 'medium' },
  ];

  const thisWeekStats = {
    scheduled: 24,
    pending: 8,
    upcoming: 16,
  };

  const weekCalendar = [
    { day: 'Mon', date: format(addDays(startOfWeek(new Date()), 1), 'MMM d'), tasks: 8, status: 'active' },
    { day: 'Tue', date: format(addDays(startOfWeek(new Date()), 2), 'MMM d'), tasks: 12, status: 'upcoming' },
    { day: 'Wed', date: format(addDays(startOfWeek(new Date()), 3), 'MMM d'), tasks: 10, status: 'upcoming' },
    { day: 'Thu', date: format(addDays(startOfWeek(new Date()), 4), 'MMM d'), tasks: 15, status: 'upcoming' },
    { day: 'Fri', date: format(addDays(startOfWeek(new Date()), 5), 'MMM d'), tasks: 11, status: 'upcoming' },
  ];

  // ACTIVE NOW DATA (Middle Section)
  const activeProblems = [
    { id: '1', title: 'Spill in Lab Room 3', severity: 'urgent', dept: 'Clinical', time: '5m ago', assignedTo: 'RN' },
    { id: '2', title: 'HVAC fluctuation detected', severity: 'high', dept: 'Facilities', time: '12m ago', assignedTo: 'FD' },
    { id: '3', title: 'Equipment calibration needed', severity: 'medium', dept: 'Radiology', time: '23m ago', assignedTo: 'Tech' },
  ];

  const activeCollections = [
    { name: 'Morning Clinical Rounds', progress: 65, current: 13, total: 20, status: 'in-progress' },
    { name: 'Facilities Safety Check', progress: 45, current: 9, total: 20, status: 'in-progress' },
    { name: 'Radiology Equipment QA', progress: 80, current: 8, total: 10, status: 'in-progress' },
  ];

  const pendingSignatures = [
    { id: '1', document: 'Patient Safety Protocol', signer: 'Dr. Chen', dept: 'Clinical', waitTime: '2h' },
    { id: '2', document: 'Equipment Purchase Order', signer: 'M. Johnson', dept: 'Facilities', waitTime: '45m' },
    { id: '3', document: 'Incident Report #4892', signer: 'E. Rodriguez', dept: 'Administration', waitTime: '1h 15m' },
  ];

  // COMPLETED/OUTCOMES DATA (Right Section)
  const completionTrend = [
    { time: '8AM', completed: 12, target: 15 },
    { time: '10AM', completed: 28, target: 30 },
    { time: '12PM', completed: 45, target: 45 },
    { time: '2PM', completed: 58, target: 60 },
    { time: '4PM', completed: 72, target: 75 },
    { time: 'Now', completed: 84, target: 85 },
  ];

  const deptPerformance = [
    { dept: 'Clinical', score: 96 },
    { dept: 'Facilities', score: 88 },
    { dept: 'Radiology', score: 92 },
    { dept: 'Admin', score: 98 },
  ];

  const outcomesRadar = [
    { metric: 'Safety', value: 95, fullMark: 100 },
    { metric: 'Quality', value: 88, fullMark: 100 },
    { metric: 'Speed', value: 92, fullMark: 100 },
    { metric: 'Compliance', value: 96, fullMark: 100 },
    { metric: 'Documentation', value: 90, fullMark: 100 },
  ];

  return (
    <div ref={containerRef} className="h-screen bg-zinc-50 dark:bg-zinc-950 overflow-hidden">
      {/* Top Header Bar */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="text-xl font-bold">OutcomeView</div>
          <div className="text-xs opacity-90">Real-Time Operations Dashboard</div>
        </div>
        <div className="flex items-center gap-6">
          {/* Active Users with Avatars */}
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {mockUsers.slice(0, 5).map((user) => (
                <div
                  key={user.id}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white border-2 border-white shadow-lg"
                  style={{ backgroundColor: user.role_color }}
                  title={user.full_name}
                >
                  {user.full_name?.split(' ').map(n => n[0]).join('') || user.role}
                </div>
              ))}
            </div>
            <span className="text-xs font-medium">{mockUsers.length} Active</span>
          </div>
          
          {/* QR Code Access */}
          <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg cursor-pointer hover:bg-white/20 transition-colors" title="Scan to access dashboard">
            <QrCode className="w-4 h-4" />
            <span className="text-xs font-medium">Dashboard Access</span>
          </div>

          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg cursor-pointer hover:bg-white/20 transition-colors"
            title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
          >
            {isFullscreen ? (
              <Minimize className="w-4 h-4" />
            ) : (
              <Maximize className="w-4 h-4" />
            )}
            <span className="text-xs font-medium">{isFullscreen ? "Exit" : "Fullscreen"}</span>
          </button>
          
          <div className="text-xs font-mono">{format(new Date(), 'MMM d, yyyy • h:mm a')}</div>
        </div>
      </div>

      {/* Three Column Layout */}
      <div className="grid grid-cols-12 gap-3 p-3 h-[calc(100vh-56px)]">
        
        {/* LEFT SECTION: UPCOMING / SCHEDULED */}
        <div className="col-span-3 space-y-2 overflow-y-auto">
          <SectionHeader 
            icon={CalendarDays} 
            title="Upcoming & Scheduled" 
            subtitle="What's Coming"
            color="blue"
          />

          {/* This Week Stats */}
          <CompactCard title="This Week Overview" color="blue" icon={Calendar}>
            <div className="grid grid-cols-3 gap-1.5">
              <StatPill label="Scheduled" value={thisWeekStats.scheduled} color="blue" />
              <StatPill label="Pending" value={thisWeekStats.pending} color="yellow" />
              <StatPill label="Upcoming" value={thisWeekStats.upcoming} color="cyan" />
            </div>
          </CompactCard>

          {/* 2x2 Grid: Week Calendar + Not Started */}
          <div className="grid grid-cols-2 gap-2">
            {/* Week Calendar */}
            <CompactCard title="This Week" color="blue">
              <div className="space-y-1">
                {weekCalendar.map((day) => (
                  <div
                    key={day.date}
                    className={`p-1.5 rounded border ${
                      day.status === 'active' 
                        ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-300 dark:border-blue-700' 
                        : 'bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-[10px] font-bold text-zinc-900 dark:text-zinc-100">{day.day}</div>
                        <div className="text-[8px] text-zinc-500 dark:text-zinc-400">{day.date.split(' ')[1]}</div>
                      </div>
                      <div className="text-xs font-bold text-blue-600 dark:text-blue-400">{day.tasks}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CompactCard>

            {/* Not Started */}
            <CompactCard title="Not Started" color="gray" count={notStarted.length}>
              <div className="space-y-1">
                {notStarted.map((task) => (
                  <div key={task.id} className="p-1 bg-zinc-100 dark:bg-zinc-800 rounded text-[9px]">
                    <div className="font-medium text-zinc-900 dark:text-zinc-100 truncate">{task.title}</div>
                    <div className="text-zinc-500 dark:text-zinc-400 text-[8px]">{task.department?.name}</div>
                  </div>
                ))}
              </div>
            </CompactCard>
          </div>

          {/* Upcoming Tasks */}
          <CompactCard title="Upcoming Tasks" color="blue" icon={Clock} count={upcomingTasks.length}>
            <div className="space-y-1">
              {upcomingTasks.map((task) => (
                <div 
                  key={task.id}
                  className={`p-1.5 rounded border ${
                    task.priority === 'high' 
                      ? 'border-orange-300 dark:border-orange-700 bg-orange-50 dark:bg-orange-900/10'
                      : task.priority === 'medium'
                      ? 'border-yellow-300 dark:border-yellow-700 bg-yellow-50 dark:bg-yellow-900/10'
                      : 'border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="text-[9px] font-semibold text-zinc-900 dark:text-zinc-100 truncate">
                        {task.title}
                      </div>
                      <div className="text-[8px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                        {task.dept}
                      </div>
                    </div>
                    <div className="text-[8px] font-medium text-blue-600 dark:text-blue-400 whitespace-nowrap">
                      {task.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CompactCard>
        </div>

        {/* MIDDLE SECTION: ACTIVE / IN MOTION */}
        <div className="col-span-6 space-y-2 overflow-y-auto">
          <SectionHeader 
            icon={Zap} 
            title="Active & In Motion" 
            subtitle="Happening Now"
            color="yellow"
          />

          {/* Active Stats Row */}
          <div className="grid grid-cols-4 gap-2">
            <MiniStatCard icon={Activity} label="In Progress" value={inProgress.length} color="yellow" />
            <MiniStatCard icon={AlertTriangle} label="Problems" value={activeProblems.length} color="red" />
            <MiniStatCard icon={FileSignature} label="Signatures" value={pendingSignatures.length} color="orange" />
            <MiniStatCard icon={PlayCircle} label="Collections" value={activeCollections.length} color="cyan" />
          </div>

          {/* Live Activity Feed - MOVED UP */}
          <CompactCard title="Live Activity Feed" color="green" icon={Activity}>
            <div className="space-y-1 max-h-[140px] overflow-y-auto">
              {activities.slice(0, 10).map((activity) => (
                <div
                  key={activity.id}
                  className="p-1.5 bg-zinc-50 dark:bg-zinc-800/50 rounded flex items-center gap-2 text-[9px]"
                >
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center text-[7px] font-bold text-white flex-shrink-0"
                    style={{ backgroundColor: activity.user?.role_color || '#666' }}
                  >
                    {activity.user?.role || '?'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                      {activity.user?.full_name?.split(' ')[0] || 'User'}
                    </span>
                    <span className="text-zinc-600 dark:text-zinc-400"> • {activity.task?.title}</span>
                  </div>
                  <div className="text-xs">
                    {activity.action === 'completed' && '✅'}
                    {activity.action === 'started' && '▶️'}
                    {activity.action === 'updated' && '📝'}
                    {activity.action === 'flagged' && '🚩'}
                  </div>
                </div>
              ))}
            </div>
          </CompactCard>

          {/* Active Problems */}
          <CompactCard title="Active Problems" color="red" icon={AlertTriangle} count={activeProblems.length}>
            <div className="space-y-1.5">
              {activeProblems.map((problem) => (
                <div
                  key={problem.id}
                  className={`p-2 rounded border-l-2 ${
                    problem.severity === 'urgent'
                      ? 'border-l-red-500 bg-red-50 dark:bg-red-900/10'
                      : problem.severity === 'high'
                      ? 'border-l-orange-500 bg-orange-50 dark:bg-orange-900/10'
                      : 'border-l-yellow-500 bg-yellow-50 dark:bg-yellow-900/10'
                  } border border-zinc-200 dark:border-zinc-700`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-1.5">
                        <div className={`w-1.5 h-1.5 rounded-full ${
                          problem.severity === 'urgent' ? 'bg-red-500 animate-pulse' : 
                          problem.severity === 'high' ? 'bg-orange-500' : 'bg-yellow-500'
                        }`} />
                        <span className="text-[10px] font-bold text-zinc-900 dark:text-zinc-100">{problem.title}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-0.5 ml-3">
                        <span className="text-[8px] text-zinc-600 dark:text-zinc-400">{problem.dept}</span>
                        <span className="text-[8px] text-zinc-500">• {problem.time}</span>
                        <span className="text-[8px] font-semibold text-blue-600 dark:text-blue-400">
                          {problem.assignedTo}
                        </span>
                      </div>
                    </div>
                    <div className={`text-[8px] font-bold px-1.5 py-0.5 rounded ${
                      problem.severity === 'urgent' ? 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300' :
                      problem.severity === 'high' ? 'bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300' :
                      'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300'
                    }`}>
                      {problem.severity.toUpperCase()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CompactCard>

          {/* 2x2 Grid: Active Collections + In Progress Tasks */}
          <div className="grid grid-cols-2 gap-2">
            {/* Active Collections */}
            <CompactCard title="Active Collections" color="cyan" icon={PlayCircle} count={activeCollections.length}>
              <div className="space-y-1.5">
                {activeCollections.map((collection) => (
                  <div key={collection.name} className="p-1.5 bg-cyan-50 dark:bg-cyan-900/10 rounded border border-cyan-200 dark:border-cyan-800">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[9px] font-semibold text-zinc-900 dark:text-zinc-100 truncate">{collection.name}</span>
                      <span className="text-[9px] font-bold text-cyan-600 dark:text-cyan-400">
                        {collection.current}/{collection.total}
                      </span>
                    </div>
                    <div className="w-full bg-zinc-200 dark:bg-zinc-700 rounded-full h-1.5">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${collection.progress}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="bg-gradient-to-r from-cyan-500 to-blue-500 h-1.5 rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CompactCard>

            {/* In Progress Tasks */}
            <CompactCard title="Tasks In Progress" color="yellow" icon={Activity} count={inProgress.length}>
              <div className="space-y-1">
                {inProgress.map((task) => (
                  <div key={task.id} className="p-1.5 bg-yellow-50 dark:bg-yellow-900/10 rounded border border-yellow-200 dark:border-yellow-800">
                    <div className="text-[9px] font-semibold text-zinc-900 dark:text-zinc-100 truncate">{task.title}</div>
                    <div className="flex items-center justify-between mt-0.5">
                      <span className="text-[8px] text-zinc-500 dark:text-zinc-400">{task.department?.name}</span>
                      {task.assigned_user && (
                        <span 
                          className="text-[7px] px-1 py-0.5 rounded-full text-white font-bold"
                          style={{ backgroundColor: task.assigned_user.role_color }}
                        >
                          {task.assigned_user.role}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CompactCard>
          </div>

          {/* Pending Signatures */}
          <CompactCard title="Pending Signatures" color="orange" icon={FileSignature} count={pendingSignatures.length}>
            <div className="space-y-1">
              {pendingSignatures.map((sig) => (
                <div key={sig.id} className="p-1.5 bg-orange-50 dark:bg-orange-900/10 rounded border border-orange-200 dark:border-orange-800 flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="text-[9px] font-semibold text-zinc-900 dark:text-zinc-100 truncate">{sig.document}</div>
                    <div className="text-[8px] text-zinc-600 dark:text-zinc-400 mt-0.5">
                      {sig.signer} • {sig.dept}
                    </div>
                  </div>
                  <div className="text-[8px] font-semibold text-orange-600 dark:text-orange-400 ml-2">
                    {sig.waitTime}
                  </div>
                </div>
              ))}
            </div>
          </CompactCard>
        </div>

        {/* RIGHT SECTION: COMPLETED / OUTCOMES */}
        <div className="col-span-3 space-y-2 overflow-y-auto">
          <SectionHeader 
            icon={Award} 
            title="Outcomes & Results" 
            subtitle="What's Done"
            color="green"
          />

          {/* Compliance Score - Smaller */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-br from-green-500 to-emerald-600 dark:from-green-600 dark:to-emerald-700 rounded-lg p-3 text-white text-center shadow-lg"
          >
            <div className="text-[10px] font-medium opacity-90 mb-1">Overall Compliance</div>
            <div className="text-4xl font-bold tracking-tight">{complianceScore}%</div>
            <div className="flex items-center justify-center gap-1.5 mt-2 text-[10px] opacity-90">
              <TrendingUp className="w-3 h-3" />
              <span>+3% from yesterday</span>
            </div>
            <div className="mt-2 pt-2 border-t border-white/20">
              <div className="grid grid-cols-3 gap-1.5 text-center">
                <div>
                  <div className="text-lg font-bold">{completed.length}</div>
                  <div className="text-[8px] opacity-75">Completed</div>
                </div>
                <div>
                  <div className="text-lg font-bold">{inProgress.length}</div>
                  <div className="text-[8px] opacity-75">Active</div>
                </div>
                <div>
                  <div className="text-lg font-bold">{overdue.length}</div>
                  <div className="text-[8px] opacity-75">Overdue</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 2x2 Grid: Completion Trend + Department Performance */}
          <div className="grid grid-cols-2 gap-2">
            {/* Completion Trend */}
            <CompactCard title="Today's Trend" color="green" icon={TrendingUp}>
              <div className="h-28">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={completionTrend}>
                    <defs>
                      <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                    <XAxis dataKey="time" tick={{ fontSize: 8 }} stroke="#888" />
                    <YAxis tick={{ fontSize: 8 }} stroke="#888" />
                    <Area 
                      type="monotone" 
                      dataKey="completed" 
                      stroke="#10b981" 
                      strokeWidth={1.5}
                      fillOpacity={1} 
                      fill="url(#colorCompleted)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CompactCard>

            {/* Department Performance */}
            <CompactCard title="Dept Performance" color="purple" icon={BarChart3}>
              <div className="space-y-1.5">
                {deptPerformance.map((dept) => {
                  const color = dept.score >= 95 ? 'green' : dept.score >= 90 ? 'blue' : 'yellow';
                  const colorClasses = {
                    green: 'bg-green-500',
                    blue: 'bg-blue-500',
                    yellow: 'bg-yellow-500',
                  };
                  const textClasses = {
                    green: 'text-green-600 dark:text-green-400',
                    blue: 'text-blue-600 dark:text-blue-400',
                    yellow: 'text-yellow-600 dark:text-yellow-400',
                  };

                  return (
                    <div key={dept.dept} className="space-y-0.5">
                      <div className="flex items-center justify-between text-[9px]">
                        <span className="font-medium text-zinc-700 dark:text-zinc-300">{dept.dept}</span>
                        <span className={`font-bold ${textClasses[color]}`}>{dept.score}%</span>
                      </div>
                      <div className="w-full bg-zinc-200 dark:bg-zinc-700 rounded-full h-1">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${dept.score}%` }}
                          transition={{ duration: 1, delay: 0.2 }}
                          className={`${colorClasses[color]} h-1 rounded-full`}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </CompactCard>
          </div>

          {/* Performance Metrics Radar */}
          <CompactCard title="Performance Metrics" color="blue" icon={Target}>
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={outcomesRadar}>
                  <PolarGrid stroke="#888" opacity={0.2} />
                  <PolarAngleAxis dataKey="metric" tick={{ fontSize: 8, fill: '#888' }} />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 7 }} />
                  <Radar 
                    name="Score" 
                    dataKey="value" 
                    stroke="#3b82f6" 
                    fill="#3b82f6" 
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </CompactCard>

          {/* Recently Completed */}
          <CompactCard title="Recently Completed" color="green" icon={CheckCircle} count={completed.length}>
            <div className="space-y-1">
              {completed.slice(0, 6).map((task) => (
                <div key={task.id} className="p-1.5 bg-green-50 dark:bg-green-900/10 rounded flex items-start gap-1.5">
                  <CheckCircle className="w-3 h-3 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <div className="text-[9px] font-semibold text-zinc-900 dark:text-zinc-100 truncate">{task.title}</div>
                    <div className="text-[8px] text-zinc-500 dark:text-zinc-400">{task.department?.name}</div>
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

// Helper Components
function SectionHeader({ icon: Icon, title, subtitle, color }: any) {
  const colors = {
    blue: 'from-blue-500 to-cyan-500',
    yellow: 'from-yellow-500 to-orange-500',
    green: 'from-green-500 to-emerald-500',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-gradient-to-r ${colors[color]} rounded-lg p-2 text-white`}
    >
      <div className="flex items-center gap-2">
        <Icon className="w-4 h-4" />
        <div>
          <div className="text-xs font-bold">{title}</div>
          <div className="text-[9px] opacity-90">{subtitle}</div>
        </div>
      </div>
    </motion.div>
  );
}

function MiniStatCard({ icon: Icon, label, value, color }: any) {
  const colors = {
    yellow: 'from-yellow-500 to-amber-600 dark:from-yellow-600 dark:to-amber-700',
    red: 'from-red-500 to-rose-600 dark:from-red-600 dark:to-rose-700',
    orange: 'from-orange-500 to-red-600 dark:from-orange-600 dark:to-red-700',
    cyan: 'from-cyan-500 to-blue-600 dark:from-cyan-600 dark:to-blue-700',
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`bg-gradient-to-br ${colors[color]} rounded-lg p-2 text-white text-center`}
    >
      <Icon className="w-3.5 h-3.5 mx-auto mb-0.5 opacity-90" />
      <div className="text-xl font-bold">{value}</div>
      <div className="text-[8px] opacity-90">{label}</div>
    </motion.div>
  );
}

function StatPill({ label, value, color }: any) {
  const colors = {
    blue: 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300',
    yellow: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300',
    cyan: 'bg-cyan-100 dark:bg-cyan-900 text-cyan-700 dark:text-cyan-300',
  };

  return (
    <div className={`${colors[color]} rounded-lg p-1.5 text-center`}>
      <div className="text-base font-bold">{value}</div>
      <div className="text-[8px] font-medium">{label}</div>
    </div>
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
      className={`bg-white dark:bg-zinc-900 border ${colors[color]} rounded-lg p-2 shadow-sm`}
    >
      <div className="flex items-center gap-1.5 mb-1.5">
        {Icon && <Icon className="w-3.5 h-3.5 text-zinc-600 dark:text-zinc-400" />}
        <h3 className="text-[10px] font-bold text-zinc-900 dark:text-zinc-100 flex-1">{title}</h3>
        {count !== undefined && (
          <span className="text-[10px] font-bold text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded-full">
            {count}
          </span>
        )}
      </div>
      <div>
        {children}
      </div>
    </motion.div>
  );
}

