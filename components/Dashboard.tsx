import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { Shield, AlertTriangle, Check, Users, Lock, ChevronRight } from 'lucide-react';
import { AlertSeverity } from '../types';

const Dashboard = () => {
  // Mock Data
  const scoreData = [
    { name: 'Risk', value: 25 },
    { name: 'Safe', value: 75 },
  ];
  const COLORS = ['#F2A66A', '#0B5560'];

  const stats = [
    { label: 'Accounts Monitored', value: '4', icon: Users, color: 'bg-teal-100 text-teal-800' },
    { label: 'Alerts (24h)', value: '2', icon: AlertTriangle, color: 'bg-orange-100 text-terracotta' },
    { label: 'Evidence Saved', value: '12', icon: Lock, color: 'bg-indigo-100 text-indigo-800' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Hero Section */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-orange-100 flex flex-col md:flex-row items-center justify-between">
        <div className="space-y-4 max-w-lg">
          <h1 className="text-3xl font-serif font-bold text-teal-900">Good Evening, Jane.</h1>
          <p className="text-gray-600 leading-relaxed">
            Your digital safety shield is active. We are monitoring 4 connected accounts. 
            Your safety score has improved by 5% this week.
          </p>
          <div className="flex space-x-3">
            <button className="bg-terracotta hover:bg-terracotta-600 text-white px-6 py-2 rounded-full font-medium transition-colors shadow-lg shadow-orange-200">
              Run Quick Scan
            </button>
            <button className="text-teal-900 px-6 py-2 rounded-full font-medium border border-teal-200 hover:bg-teal-50 transition-colors">
              View Coaching
            </button>
          </div>
        </div>
        
        {/* Safety Score Chart */}
        <div className="relative w-48 h-48 mt-8 md:mt-0 flex-shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={scoreData}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                startAngle={90}
                endAngle={-270}
              >
                {scoreData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-teal-900">75%</span>
            <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">Safety Score</span>
          </div>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center space-x-4">
            <div className={`p-3 rounded-xl ${stat.color}`}>
              <stat.icon size={24} />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
              <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Alerts & Checklist */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Activity Feed */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-teal-900">Recent Activity</h3>
            <button className="text-sm text-terracotta font-medium hover:underline">View All</button>
          </div>
          <div className="space-y-4">
            {[
              { type: 'Alert', msg: 'Suspicious login attempt blocked (Instagram)', time: '2h ago', severity: AlertSeverity.HIGH },
              { type: 'Scan', msg: 'Harassment check: No threats found in DMs.', time: '5h ago', severity: AlertSeverity.LOW },
              { type: 'System', msg: 'Weekly backup to Safe Folder completed.', time: '1d ago', severity: AlertSeverity.LOW },
            ].map((item, i) => (
              <div key={i} className="flex items-start space-x-3 p-3 hover:bg-orange-50 rounded-xl transition-colors cursor-pointer group">
                <div className={`w-2 h-2 mt-2 rounded-full flex-shrink-0 ${item.severity === AlertSeverity.HIGH ? 'bg-red-500' : 'bg-teal-500'}`} />
                <div className="flex-1">
                  <p className="text-gray-800 font-medium group-hover:text-teal-900">{item.msg}</p>
                  <p className="text-xs text-gray-400 mt-1">{item.time}</p>
                </div>
                <ChevronRight size={16} className="text-gray-300 group-hover:text-terracotta" />
              </div>
            ))}
          </div>
        </div>

        {/* Micro-Coaching / Checklist */}
        <div className="bg-teal-900 rounded-3xl p-6 shadow-lg text-cream relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-10 -mt-10" />
          <h3 className="text-xl font-bold mb-4 relative z-10">Weekly Safety Coach</h3>
          <p className="text-teal-200 mb-6 text-sm">Small steps every week make you unbreakable. Complete these to raise your score.</p>
          
          <ul className="space-y-3 relative z-10">
            <li className="flex items-center space-x-3 bg-teal-800/50 p-3 rounded-xl border border-teal-700">
              <input type="checkbox" className="w-5 h-5 rounded border-teal-500 text-terracotta focus:ring-terracotta bg-teal-900" defaultChecked />
              <span className="text-sm line-through text-teal-400">Enable 2FA on WhatsApp</span>
            </li>
            <li className="flex items-center space-x-3 bg-teal-800 p-3 rounded-xl border border-teal-700 hover:bg-teal-700 transition-colors cursor-pointer">
              <input type="checkbox" className="w-5 h-5 rounded border-teal-500 text-terracotta focus:ring-terracotta bg-teal-900" />
              <span className="text-sm">Review Facebook friend list</span>
            </li>
            <li className="flex items-center space-x-3 bg-teal-800 p-3 rounded-xl border border-teal-700 hover:bg-teal-700 transition-colors cursor-pointer">
              <input type="checkbox" className="w-5 h-5 rounded border-teal-500 text-terracotta focus:ring-terracotta bg-teal-900" />
              <span className="text-sm">Set Instagram to 'Private'</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;