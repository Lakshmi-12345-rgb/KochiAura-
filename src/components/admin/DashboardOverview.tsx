import React from 'react';
import { motion } from 'motion/react';
import { 
  Users, 
  Home, 
  TrendingUp, 
  Clock, 
  ArrowUpRight, 
  ArrowDownRight,
  Eye,
  MousePointer2
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { Property, Inquiry } from '../../types';

interface DashboardOverviewProps {
  properties: Property[];
  inquiries: Inquiry[];
}

const visitData = [
  { name: 'Mon', visits: 420 },
  { name: 'Tue', visits: 580 },
  { name: 'Wed', visits: 490 },
  { name: 'Thu', visits: 720 },
  { name: 'Fri', visits: 850 },
  { name: 'Sat', visits: 960 },
  { name: 'Sun', visits: 1100 },
];

const leadData = [
  { name: 'Mon', leads: 4 },
  { name: 'Tue', leads: 7 },
  { name: 'Wed', leads: 5 },
  { name: 'Thu', leads: 9 },
  { name: 'Fri', leads: 12 },
  { name: 'Sat', leads: 8 },
  { name: 'Sun', leads: 15 },
];

export default function DashboardOverview({ properties, inquiries }: DashboardOverviewProps) {
  const totalValue = properties.reduce((acc, p) => acc + p.priceNumeric, 0);
  const activeListings = properties.filter(p => p.status === 'Available').length;
  const newLeads = inquiries.filter(i => i.status === 'New').length;

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Total Holdings" 
          value={properties.length.toString()} 
          icon={<Home className="w-5 h-5" />}
          change="+2 from last month"
          isPositive={true}
        />
        <StatCard 
          title="Active Listings" 
          value={activeListings.toString()} 
          icon={<Home className="w-5 h-5 text-[#d4af37]" />}
          change="84% of total"
          isPositive={true}
        />
        <StatCard 
          title="Total Leads" 
          value={inquiries.length.toString()} 
          icon={<Users className="w-5 h-5" />}
          change="+12.5% vs avg"
          isPositive={true}
        />
        <StatCard 
          title="Portfolio Value" 
          value={`₹${(totalValue / 10000000).toFixed(1)} Cr`} 
          icon={<TrendingUp className="w-5 h-5" />}
          change="+₹2.4 Cr total"
          isPositive={true}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Visitors Card */}
        <div className="bg-neutral-900/40 backdrop-blur-xl border border-neutral-800 p-6 rounded-2xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-sm font-mono text-[#d4af37] uppercase tracking-widest">Visitor Traffic</h3>
              <p className="text-2xl font-serif text-white mt-1">5,120 <span className="text-[10px] text-neutral-500 font-mono">visits this week</span></p>
            </div>
            <div className="bg-emerald-500/10 text-emerald-500 px-2 py-1 rounded text-[10px] font-mono flex items-center">
              <ArrowUpRight className="w-3 h-3 mr-1" />
              18.4%
            </div>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={visitData}>
                <defs>
                  <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#d4af37" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#d4af37" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke="#666" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false}
                />
                <YAxis 
                  stroke="#666" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false}
                  tickFormatter={(val) => `${val}`}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#000', border: '1px solid #333', fontSize: '10px' }}
                  itemStyle={{ color: '#d4af37' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="visits" 
                  stroke="#d4af37" 
                  fillOpacity={1} 
                  fill="url(#colorVisits)" 
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Leads Conversion Card */}
        <div className="bg-neutral-900/40 backdrop-blur-xl border border-neutral-800 p-6 rounded-2xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-sm font-mono text-[#d4af37] uppercase tracking-widest">Leads Generated</h3>
              <p className="text-2xl font-serif text-white mt-1">{inquiries.length} <span className="text-[10px] text-neutral-500 font-mono">active inquiries</span></p>
            </div>
            <div className="bg-emerald-500/10 text-emerald-500 px-2 py-1 rounded text-[10px] font-mono flex items-center">
              <ArrowUpRight className="w-3 h-3 mr-1" />
              12.2%
            </div>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={leadData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke="#666" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false}
                />
                <YAxis 
                  stroke="#666" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#000', border: '1px solid #333', fontSize: '10px' }}
                />
                <Line 
                  type="step" 
                  dataKey="leads" 
                  stroke="#ffffff" 
                  strokeWidth={2}
                  dot={{ fill: '#d4af37', strokeWidth: 0, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="bg-neutral-900/40 backdrop-blur-xl border border-neutral-800 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-neutral-800 flex items-center justify-between">
          <h3 className="text-sm font-mono text-[#d4af37] uppercase tracking-widest">Recent Activity</h3>
          <button className="text-[10px] uppercase tracking-tighter text-neutral-500 hover:text-white">View Full Audit Log</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-black/50 text-[10px] uppercase font-mono tracking-widest text-neutral-500">
              <tr>
                <th className="px-6 py-4 font-normal">Property</th>
                <th className="px-6 py-4 font-normal">Type</th>
                <th className="px-6 py-4 font-normal">Status</th>
                <th className="px-6 py-4 font-normal">Price</th>
                <th className="px-6 py-4 font-normal text-right">Updated</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800">
              {properties.slice(0, 4).map((prop) => (
                <tr key={prop.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded shrink-0 overflow-hidden border border-neutral-800">
                        <img src={prop.mainImage} alt="" className="w-full h-full object-cover" />
                      </div>
                      <span className="text-xs font-medium text-white truncate max-w-[150px]">{prop.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[10px] text-neutral-400 font-mono">{prop.type}</td>
                  <td className="px-6 py-4">
                    <span className={`text-[9px] px-2 py-0.5 rounded-full uppercase font-mono tracking-wider ${
                      prop.status === 'Available' ? 'bg-emerald-500/10 text-emerald-500' :
                      prop.status === 'Sold' ? 'bg-orange-500/10 text-orange-500' :
                      'bg-sky-500/10 text-sky-500'
                    }`}>
                      {prop.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs font-mono text-[#d4af37]">{prop.price}</td>
                  <td className="px-6 py-4 text-[10px] text-neutral-600 font-mono text-right flex items-center justify-end">
                    <Clock className="w-3 h-3 mr-1" />
                    2h ago
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, change, isPositive }: { title: string, value: string, icon: React.ReactNode, change: string, isPositive: boolean }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-neutral-900/40 backdrop-blur-xl border border-neutral-800 p-5 rounded-2xl group hover:border-[#d4af37]/30 transition-all hover:translate-y-[-2px]"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="p-2 bg-black/50 border border-neutral-800 rounded-lg text-neutral-400 group-hover:text-[#d4af37] group-hover:border-[#d4af37]/20 transition-colors">
          {icon}
        </div>
        <div className={`text-[10px] font-mono ${isPositive ? 'text-emerald-500' : 'text-rose-500'}`}>
          {change}
        </div>
      </div>
      <div>
        <h4 className="text-[10px] font-mono text-neutral-500 uppercase tracking-[0.2em]">{title}</h4>
        <p className="text-2xl font-serif text-white mt-1 group-hover:text-amber-50 group-hover:scale-[1.02] origin-left transition-all">{value}</p>
      </div>
    </motion.div>
  );
}
