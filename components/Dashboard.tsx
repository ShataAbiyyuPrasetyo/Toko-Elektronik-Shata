import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';

const SALES_DATA = [
  { name: 'Mon', sales: 4000000, cost: 2400000 },
  { name: 'Tue', sales: 3000000, cost: 1398000 },
  { name: 'Wed', sales: 2000000, cost: 9800000 }, // High stock intake day
  { name: 'Thu', sales: 2780000, cost: 3908000 },
  { name: 'Fri', sales: 1890000, cost: 4800000 },
  { name: 'Sat', sales: 2390000, cost: 3800000 },
  { name: 'Sun', sales: 3490000, cost: 4300000 },
];

const KPI_CARDS = [
  { label: 'Total Revenue', value: 'Rp 284.5M', change: '+12.5%', isPositive: true },
  { label: 'COGS', value: 'Rp 192.1M', change: '+4.2%', isPositive: false }, // Cost increasing is generally negative for margin
  { label: 'Net Margin', value: '32.4%', change: '+8.1%', isPositive: true },
  { label: 'Inventory Value', value: 'Rp 850M', change: '-2.4%', isPositive: true }, // Optimization
];

export const Dashboard: React.FC = () => {
  return (
    <div className="p-8 space-y-8 overflow-y-auto h-full custom-scrollbar">
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-slate-100">Financial Overview</h1>
        <p className="text-slate-400 mt-2">Real-time performance metrics and inventory valuation.</p>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {KPI_CARDS.map((kpi, idx) => (
          <div key={idx} className="bg-slate-900/50 border border-slate-800 p-6 rounded-xl backdrop-blur hover:border-amber-500/30 transition-colors">
            <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">{kpi.label}</p>
            <div className="mt-2 flex items-baseline gap-3">
              <span className="text-2xl font-bold text-slate-100">{kpi.value}</span>
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${kpi.isPositive ? 'bg-emerald-900/30 text-emerald-400' : 'bg-red-900/30 text-red-400'}`}>
                {kpi.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-96">
        
        {/* Revenue vs Cost Chart */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl flex flex-col">
          <h3 className="text-lg font-serif font-semibold text-slate-200 mb-6">Revenue vs Cost (Last 7 Days)</h3>
          <div className="flex-1 w-full min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={SALES_DATA}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#D4AF37" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="name" stroke="#94a3b8" tick={{fontSize: 12}} />
                <YAxis stroke="#94a3b8" tick={{fontSize: 12}} tickFormatter={(val) => `${val/1000000}M`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f1f5f9' }}
                  itemStyle={{ color: '#e2e8f0' }}
                />
                <Area type="monotone" dataKey="sales" stroke="#D4AF37" fillOpacity={1} fill="url(#colorSales)" />
                <Area type="monotone" dataKey="cost" stroke="#ef4444" fillOpacity={1} fill="url(#colorCost)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Profit Margin Chart */}
         <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl flex flex-col">
          <h3 className="text-lg font-serif font-semibold text-slate-200 mb-6">Gross Margin Analysis</h3>
          <div className="flex-1 w-full min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={SALES_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" tickFormatter={(val) => `${val/1000000}M`} />
                <Tooltip 
                   cursor={{fill: '#1e293b'}}
                   contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f1f5f9' }}
                />
                <Legend />
                <Bar dataKey="sales" name="Revenue" fill="#D4AF37" radius={[4, 4, 0, 0]} />
                <Bar dataKey="cost" name="COGS" fill="#475569" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};