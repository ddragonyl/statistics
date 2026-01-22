
import React, { useState } from 'react';
import { 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, AreaChart, Area, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';

const liveSummary = [
  { label: '直播场次', value: '128', icon: 'fa-clapperboard', color: 'text-blue-500', sub: '实时活跃中' },
  { label: '累计直播时长', value: '4,280', unit: 'min', icon: 'fa-clock', color: 'text-indigo-500', sub: '环比昨日 +12%' },
  { label: '报名人数', value: '1,560', unit: '人', icon: 'fa-user-check', color: 'text-emerald-500', sub: '转化率 14.2%' },
  { label: '直播在线人数', value: '8,429', unit: '人', icon: 'fa-users-viewfinder', color: 'text-orange-500', sub: '瞬时峰值监测中' },
];

const transactionTrend = [
  { name: '08:00', 成交: 4000, 退费: 400 },
  { name: '10:00', 成交: 3000, 退费: 300 },
  { name: '12:00', 成交: 5200, 退费: 800 },
  { name: '14:00', 成交: 2780, 退费: 390 },
  { name: '16:00', 成交: 1890, 退费: 480 },
  { name: '18:00', 成交: 4390, 退费: 380 },
  { name: '20:00', 成交: 6490, 退费: 430 },
];

const rechargeHistory = [
  { id: '1', org: '新东方北京校区', amount: '¥5,000', points: '50,000', method: '企业支付', time: '10:24:12' },
  { id: '2', org: '学而思培优', amount: '¥2,000', points: '20,000', method: '兑换码', time: '09:15:45' },
  { id: '3', org: '高途精品课', amount: '¥10,000', points: '100,000', method: '在线转账', time: '08:45:20' },
  { id: '4', org: '作业帮', amount: '¥3,500', points: '35,000', method: '果能点充值', time: '08:12:05' },
];

const radarData = [
  { subject: '互动频率', A: 120, fullMark: 150 },
  { subject: '课件质量', A: 98, fullMark: 150 },
  { subject: '完课率', A: 86, fullMark: 150 },
  { subject: '作业率', A: 99, fullMark: 150 },
  { subject: '平均分', A: 85, fullMark: 150 },
  { subject: '续费倾向', A: 65, fullMark: 150 },
];

const orgStorageData = [
  { name: '新东方北京', 视频: 850, 素材: 240 },
  { name: '学而思培优', 视频: 620, 素材: 180 },
  { name: '高途教育', 视频: 940, 素材: 310 },
  { name: '作业帮', 视频: 450, 素材: 520 },
  { name: '有道精品', 视频: 320, 素材: 150 },
];

const InstructionalBoard: React.FC = () => {
  const [selectedOrg, setSelectedOrg] = useState('all');
  const [timeRange, setTimeRange] = useState('today');
  const [dateRange, setDateRange] = useState({
    start: '2024年05月01日',
    end: '2024年05月22日'
  });

  return (
    <div className="space-y-6">
      {/* 筛选控制条 - 保持右侧对齐 */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-wrap items-center justify-end gap-5">
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative min-w-[220px]">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i className="fa-solid fa-building text-slate-400 text-xs"></i>
            </div>
            <select 
              value={selectedOrg}
              onChange={(e) => setSelectedOrg(e.target.value)}
              className="block w-full pl-9 pr-10 py-2.5 text-sm border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 rounded-xl bg-slate-50 font-semibold text-slate-700 appearance-none cursor-pointer hover:bg-slate-100 transition-all border"
            >
              <option value="all">全平台机构 (所有商户)</option>
              <option value="new-oriental">新东方教育集团</option>
              <option value="tal">学而思培优</option>
              <option value="gaotu">高途精品课</option>
              <option value="zuoyebang">作业帮直播课</option>
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <i className="fa-solid fa-chevron-down text-slate-400 text-[10px]"></i>
            </div>
          </div>

          <div className="flex items-center gap-3 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer hover:border-blue-400 transition-all group">
            <i className="fa-regular fa-calendar-days text-slate-400 group-hover:text-blue-500 transition-colors"></i>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-slate-700 tracking-tight">{dateRange.start}</span>
              <span className="text-slate-300 font-light">～</span>
              <span className="text-sm font-bold text-slate-700 tracking-tight">{dateRange.end}</span>
            </div>
          </div>

          <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200/50">
            {[
              { id: 'today', label: '今日' },
              { id: 'yesterday', label: '昨日' },
              { id: '7days', label: '近7日' },
              { id: '30days', label: '近30日' },
            ].map((range) => (
              <button
                key={range.id}
                onClick={() => setTimeRange(range.id)}
                className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  timeRange === range.id 
                    ? 'bg-white text-blue-600 shadow-sm border border-slate-100' 
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Top: 今日直播快报 Header (已恢复“今日”文案) */}
      <div className="bg-white p-1 rounded-2xl shadow-sm border border-slate-100 flex flex-wrap md:flex-nowrap divide-y md:divide-y-0 md:divide-x divide-slate-100">
        {liveSummary.map((item) => (
          <div key={item.label} className="flex-1 p-6 min-w-[200px]">
            <div className="flex items-center gap-3 mb-2">
              <i className={`fa-solid ${item.icon} ${item.color}`}></i>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{item.label}</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black text-slate-900">{item.value}</span>
              {item.unit && <span className="text-xs font-bold text-slate-400">{item.unit}</span>}
            </div>
            <p className="text-[10px] text-slate-400 mt-1 font-medium">{item.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-800">成交 / 退费对比趋势 (当日实时)</h3>
            <div className="flex gap-4">
              <span className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span> 成交金额
              </span>
              <span className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
                <span className="w-2 h-2 rounded-full bg-rose-400"></span> 退费金额
              </span>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={transactionTrend}>
                <defs>
                  <linearGradient id="colorTrans" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} />
                <Tooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
                <Area type="monotone" dataKey="成交" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorTrans)" />
                <Area type="monotone" dataKey="退费" stroke="#fb7185" strokeWidth={2} fill="transparent" strokeDasharray="4 4" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-800">果能点充值流水</h3>
            <button className="text-[10px] font-bold text-blue-600 hover:underline uppercase tracking-widest">查看全部</button>
          </div>
          <div className="flex-1 overflow-y-auto pr-1">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-50">
                  <th className="pb-3 text-[10px] font-black text-slate-400 uppercase">机构/时间</th>
                  <th className="pb-3 text-[10px] font-black text-slate-400 uppercase text-right">变动(Points)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {rechargeHistory.map((row) => (
                  <tr key={row.id}>
                    <td className="py-3">
                      <p className="text-xs font-bold text-slate-800 truncate max-w-[140px]">{row.org}</p>
                      <p className="text-[9px] text-slate-400">{row.time} · {row.method}</p>
                    </td>
                    <td className="py-3 text-right">
                      <p className="text-xs font-black text-emerald-600">+{row.points}</p>
                      <p className="text-[9px] text-slate-400">{row.amount}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-lg font-bold text-slate-800">AI 学情洞察雷达</h3>
              <p className="text-xs text-slate-400 font-medium">全平台学员直播表现综合分析</p>
            </div>
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
              <i className="fa-solid fa-brain-circuit"></i>
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid stroke="#f1f5f9" />
                <PolarAngleAxis dataKey="subject" tick={{fill: '#64748b', fontSize: 11, fontWeight: 600}} />
                <PolarRadiusAxis angle={30} domain={[0, 150]} hide />
                <Radar 
                  name="学情指数" 
                  dataKey="A" 
                  stroke="#6366f1" 
                  fill="#6366f1" 
                  fillOpacity={0.3} 
                />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-3 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-bold text-slate-800">机构消耗排行 (Storage Top 5)</h3>
              <p className="text-xs text-slate-400 font-medium">展示全平台资源占用最高的主体数据</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500">
                <span className="w-2 h-2 rounded bg-indigo-500"></span> 视频仓 (GB)
              </span>
              <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500">
                <span className="w-2 h-2 rounded bg-cyan-400"></span> 素材仓 (GB)
              </span>
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={orgStorageData} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 11, fontWeight: 600}} />
                <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
                <Bar dataKey="视频" fill="#6366f1" radius={[0, 4, 4, 0]} barSize={16} />
                <Bar dataKey="素材" fill="#22d3ee" radius={[0, 4, 4, 0]} barSize={16} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructionalBoard;
