
import React, { useState } from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, LineChart, Line
} from 'recharts';
import MetricCard from './MetricCard';

const costComposition = [
  { name: '音视频', value: 12350, color: '#3b82f6' },
  { name: '录制', value: 8240, color: '#ef4444' },
  { name: '白板', value: 2150, color: '#10b981' },
  { name: '快直播流量', value: 4320, color: '#f59e0b' },
  { name: '混流转推', value: 1480, color: '#8b5cf6' },
];

const costTrend = [
  { time: '1月', av: 10200, rec: 6800 },
  { time: '2月', av: 11500, rec: 7500 },
  { time: '3月', av: 12350, rec: 8240 },
  { time: '4月', av: 13200, rec: 8900 },
  { time: '5月', av: 12800, rec: 8500 },
  { time: '6月', av: 12350, rec: 8240 },
];

const revenueCostComparison = [
  { time: '1月', revenue: 120000, cost: 22000 },
  { time: '2月', revenue: 135000, cost: 25000 },
  { time: '3月', revenue: 156800, cost: 28540 },
  { time: '4月', revenue: 168000, cost: 31000 },
  { time: '5月', revenue: 162000, cost: 29800 },
  { time: '6月', revenue: 156800, cost: 28540 },
];

const tableData = [
  { id: 1, institution: '新东方教育', av: '¥3,250', rec: '¥2,120', wb: '¥580', total: '¥7,450' },
  { id: 2, institution: '学而思培优', av: '¥4,250', rec: '¥2,850', wb: '¥720', total: '¥9,750' },
  { id: 3, institution: '高途精品课', av: '¥2,000', rec: '¥1,290', wb: '¥400', total: '¥4,760' },
  { id: 4, institution: '作业帮直播', av: '¥1,850', rec: '¥1,120', wb: '¥380', total: '¥4,280' },
];

const TRTCBoard: React.FC = () => {
  const [selectedOrg, setSelectedOrg] = useState('all');
  const [dateRange] = useState({ start: '2026年01月01日', end: '2026年01月31日' });

  return (
    <div className="space-y-6">
      {/* 筛选条 */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-wrap items-center justify-between gap-5">
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative min-w-[200px]">
             <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
             <select 
               value={selectedOrg}
               onChange={(e) => setSelectedOrg(e.target.value)}
               className="w-full pl-9 pr-8 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 appearance-none focus:ring-2 focus:ring-blue-500/20 outline-none"
             >
               <option value="all">全平台机构</option>
               <option value="A">新东方教育集团</option>
               <option value="B">学而思培优</option>
             </select>
          </div>
          <div className="flex items-center gap-3 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer hover:border-blue-400 transition-all">
            <i className="fa-regular fa-calendar-days text-slate-400"></i>
            <span className="text-sm font-bold text-slate-700">{dateRange.start} ～ {dateRange.end}</span>
          </div>
        </div>
        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          REAL-TIME ANALYTICS
        </div>
      </div>

      {/* 核心指标 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 bg-white p-6 rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
           <div className="flex items-center gap-2 mb-6 text-slate-800">
              <div className="w-1.5 h-4 bg-rose-500 rounded-full shadow-lg shadow-rose-500/30"></div>
              <h2 className="text-sm font-black uppercase tracking-widest">核心消耗指标</h2>
           </div>
           <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-rose-50/50 p-4 rounded-2xl border border-rose-100">
                <p className="text-[10px] font-black text-rose-400 uppercase mb-1">总计费点数</p>
                <h3 className="text-2xl font-black text-slate-900">¥28,540</h3>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <p className="text-[10px] font-black text-slate-400 uppercase mb-1">音视频分钟</p>
                <h3 className="text-xl font-black text-slate-800">¥12,350</h3>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <p className="text-[10px] font-black text-slate-400 uppercase mb-1">云端录制费</p>
                <h3 className="text-xl font-black text-slate-800">¥8,240</h3>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <p className="text-[10px] font-black text-slate-400 uppercase mb-1">互动白板</p>
                <h3 className="text-xl font-black text-slate-800">¥2,150</h3>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <p className="text-[10px] font-black text-slate-400 uppercase mb-1">快直播</p>
                <h3 className="text-xl font-black text-slate-800">¥4,320</h3>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <p className="text-[10px] font-black text-slate-400 uppercase mb-1">转推服务</p>
                <h3 className="text-xl font-black text-slate-800">¥1,480</h3>
              </div>
           </div>
        </div>

        <div className="lg:col-span-5 bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col justify-between">
           <div className="flex items-center gap-2 mb-6">
              <div className="w-1.5 h-4 bg-blue-500 rounded-full shadow-lg shadow-blue-500/30"></div>
              <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest">直播运营热度</h2>
           </div>
           <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-blue-50/50 border border-blue-50">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white shadow-md">
                   <i className="fa-solid fa-play"></i>
                </div>
                <div>
                   <p className="text-[10px] font-black text-slate-400 uppercase">当前场次</p>
                   <h3 className="text-lg font-black text-slate-900">1,256</h3>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-emerald-50/50 border border-emerald-50">
                <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-md">
                   <i className="fa-solid fa-user"></i>
                </div>
                <div>
                   <p className="text-[10px] font-black text-slate-400 uppercase">学生在线</p>
                   <h3 className="text-lg font-black text-slate-900">12,580</h3>
                </div>
              </div>
           </div>
           <div className="mt-6 pt-6 border-t border-slate-50">
              <div className="flex justify-between items-center mb-2">
                 <span className="text-[10px] font-black text-slate-400 uppercase">大班课带宽占用率</span>
                 <span className="text-xs font-bold text-slate-900">72.4%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                 <div className="h-full bg-blue-500" style={{ width: '72.4%' }}></div>
              </div>
           </div>
        </div>
      </div>

      {/* 图表分析 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4 bg-white p-6 rounded-3xl shadow-sm border border-slate-100 min-h-[400px]">
          <h3 className="text-sm font-black text-slate-800 uppercase mb-8">消耗构成比例</h3>
          <div className="h-64">
             <ResponsiveContainer width="100%" height="100%">
               <PieChart>
                 <Pie data={costComposition} cx="50%" cy="50%" innerRadius={60} outerRadius={80} dataKey="value" stroke="none">
                    {costComposition.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                 </Pie>
                 <Tooltip contentStyle={{ borderRadius: '12px', border: 'none' }} />
               </PieChart>
             </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {costComposition.map(item => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-[10px] font-bold text-slate-500">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-8 bg-white p-6 rounded-3xl shadow-sm border border-slate-100 min-h-[400px]">
          <h3 className="text-sm font-black text-slate-800 uppercase mb-8">费用趋势分析 (半年度)</h3>
          <div className="h-72">
             <ResponsiveContainer width="100%" height="100%">
               <LineChart data={costTrend}>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                 <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10 }} />
                 <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10 }} />
                 <Tooltip contentStyle={{ borderRadius: '16px', border: 'none' }} />
                 <Line type="monotone" dataKey="av" name="音视频" stroke="#3b82f6" strokeWidth={4} dot={{ r: 4, strokeWidth: 2, fill: '#fff' }} />
                 <Line type="monotone" dataKey="rec" name="录制" stroke="#ef4444" strokeWidth={2} strokeDasharray="5 5" dot={false} />
               </LineChart>
             </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 底部明细 */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex justify-between items-center">
           <h3 className="text-sm font-black text-slate-800 uppercase">机构费用详情表</h3>
           <button className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline">查看完整报告</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">机构名称</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">音视频</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">录制</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">白板</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">总金额</th>
                <th className="px-6 py-4 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {tableData.map(row => (
                <tr key={row.id} className="hover:bg-blue-50/20 transition-colors">
                  <td className="px-6 py-4 font-bold text-sm text-slate-700">{row.institution}</td>
                  <td className="px-6 py-4 text-xs text-slate-500 font-medium">{row.av}</td>
                  <td className="px-6 py-4 text-xs text-slate-500 font-medium">{row.rec}</td>
                  <td className="px-6 py-4 text-xs text-slate-500 font-medium">{row.wb}</td>
                  <td className="px-6 py-4 font-black text-sm text-slate-900">{row.total}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-all">
                      <i className="fa-solid fa-receipt text-xs"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TRTCBoard;
