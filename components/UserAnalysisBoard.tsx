
import React, { useState } from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, BarChart, Bar, Legend 
} from 'recharts';

const userStats = [
  { label: '新入驻用户', val: '1,256', change: '+12.5%', color: 'border-blue-500', bg: 'bg-blue-50' },
  { label: '本月活跃', val: '15,680', change: '+3.8%', color: 'border-emerald-500', bg: 'bg-emerald-50' },
  { label: '沉默用户', val: '8,920', change: '-2.1%', color: 'border-slate-400', bg: 'bg-slate-50' },
  { label: '即将流失预警', val: '1,540', change: '+5.2%', color: 'border-rose-500', bg: 'bg-rose-50' },
];

const activityTrend = [
  { day: '周一', new: 156, active: 12560 },
  { day: '周二', new: 189, active: 13890 },
  { day: '周三', new: 145, active: 14520 },
  { day: '周四', new: 203, active: 15120 },
  { day: '周五', new: 256, active: 15680 },
  { day: '周六', new: 320, active: 14250 },
  { day: '周日', new: 287, active: 13890 },
];

const lifecycleDistribution = [
  { name: '高活用户', value: 15680, color: '#3b82f6' },
  { name: '普通用户', value: 8920, color: '#94a3b8' },
  { name: '流失风险', value: 1540, color: '#f43f5e' },
  { name: '新注册', value: 1256, color: '#f59e0b' },
];

const featureMatrix = [
  { 
    id: 'checkin', 
    name: '打卡功能', 
    icon: 'fa-calendar-check', 
    color: '#3b82f6',
    metrics: [
      { label: '任务总数', val: '2,568' },
      { label: '提交人次', val: '12,350' }
    ],
    rates: [
      { label: '任务完成率', val: 78.2 },
      { label: '用户覆盖率', val: 65.8 }
    ]
  },
  { 
    id: 'homework', 
    name: '作业功能', 
    icon: 'fa-book-open', 
    color: '#10b981',
    metrics: [
      { label: '创建作业', val: '1,892' },
      { label: '批改人次', val: '9,870' }
    ],
    rates: [
      { label: '作业提交率', val: 68.5 },
      { label: '用户覆盖率', val: 52.3 }
    ]
  },
  { 
    id: 'playback', 
    name: '回放功能', 
    icon: 'fa-play-circle', 
    color: '#f59e0b',
    metrics: [
      { label: '观看时长', val: '4,256h' },
      { label: '观看人数', val: '8,540' }
    ],
    rates: [
      { label: '人均时长', val: 30.2, unit: 'm' },
      { label: '活跃覆盖率', val: 48.6 }
    ]
  }
];

const featureTrend = [
  { name: '1月', checkin: 8540, homework: 6580, playback: 5250 },
  { name: '2月', checkin: 9250, homework: 7250, playback: 6120 },
  { name: '3月', checkin: 10890, homework: 8120, playback: 7050 },
  { name: '4月', checkin: 11560, homework: 9050, playback: 7890 },
  { name: '5月', checkin: 12120, homework: 9680, playback: 8320 },
  { name: '6月', checkin: 12350, homework: 9870, playback: 8540 },
];

const UserAnalysisBoard: React.FC = () => {
  const [selectedOrg, setSelectedOrg] = useState('all');
  const [timeRange, setTimeRange] = useState('7days');
  const [dateRange] = useState({
    start: '2024年05月01日',
    end: '2024年05月22日'
  });

  // 功能标签映射
  const featureLabelMap: Record<string, string> = {
    checkin: '打卡功能',
    homework: '作业功能',
    playback: '回放功能'
  };

  return (
    <div className="space-y-8 pb-10">
      {/* 筛选控制条 - 保持全平台一致的右对齐风格 */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-wrap items-center justify-end gap-5">
        <div className="flex flex-wrap items-center gap-4">
          {/* 1. 机构筛选 */}
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

          {/* 2. 自定义日期范围选择 */}
          <div className="flex items-center gap-3 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer hover:border-blue-400 transition-all group">
            <i className="fa-regular fa-calendar-days text-slate-400 group-hover:text-blue-500 transition-colors"></i>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-slate-700 tracking-tight">{dateRange.start}</span>
              <span className="text-slate-300 font-light">～</span>
              <span className="text-sm font-bold text-slate-700 tracking-tight">{dateRange.end}</span>
            </div>
            <i className="fa-solid fa-caret-down text-[10px] text-slate-300 ml-1"></i>
          </div>

          {/* 3. 快捷时间范围选择 */}
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

      {/* 2. 用户核心指标 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {userStats.map((item, idx) => (
          <div key={idx} className={`bg-white p-6 rounded-[2rem] shadow-sm border-l-4 ${item.color} border-y-slate-100 border-r-slate-100 hover:shadow-md transition-all`}>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{item.label}</p>
            <div className="flex items-baseline gap-3">
              <h3 className="text-3xl font-black text-slate-900">{item.val}</h3>
              <span className={`text-[10px] font-black ${item.change.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'}`}>{item.change}</span>
            </div>
            <div className="mt-4 h-8 w-full bg-slate-50/50 rounded-lg relative overflow-hidden">
               <div className={`absolute bottom-0 left-0 h-1 ${item.color.replace('border-', 'bg-')} opacity-30`} style={{ width: '70%' }}></div>
            </div>
          </div>
        ))}
      </div>

      {/* 3. 增长与分布可视化 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-lg font-black text-slate-900">活跃用户增长趋势 (7 Days)</h3>
            <div className="flex gap-4">
               <span className="flex items-center gap-1.5 text-[10px] font-black text-slate-400"><span className="w-2 h-2 rounded-full bg-blue-500"></span> 活跃用户</span>
               <span className="flex items-center gap-1.5 text-[10px] font-black text-slate-400"><span className="w-2 h-2 rounded-full bg-emerald-400"></span> 新增用户</span>
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activityTrend}>
                <defs>
                  <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 'bold'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 'bold'}} />
                <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                <Area type="monotone" dataKey="active" stroke="#3b82f6" strokeWidth={4} fillOpacity={1} fill="url(#colorActive)" />
                <Area type="monotone" dataKey="new" stroke="#34d399" strokeWidth={2} fill="transparent" strokeDasharray="5 5" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
           <h3 className="text-lg font-black text-slate-900 mb-2">用户活跃度分布</h3>
           <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mb-10">Lifecycle Segmentation</p>
           <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={lifecycleDistribution} cx="50%" cy="50%" innerRadius={70} outerRadius={90} paddingAngle={10} dataKey="value" stroke="none">
                    {lifecycleDistribution.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
           </div>
           <div className="mt-6 space-y-3">
              {lifecycleDistribution.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-[11px] font-bold">
                   <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <span className="text-slate-500">{item.name}</span>
                   </div>
                   <span className="text-slate-900">{item.value.toLocaleString()}</span>
                </div>
              ))}
           </div>
        </div>
      </div>

      {/* 4. 功能渗透率分析矩阵 */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-slate-900 text-white rounded-lg"><i className="fa-solid fa-puzzle-piece"></i></div>
          <h2 className="text-xl font-black text-slate-900">核心功能深度渗透矩阵</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {featureMatrix.map((feat) => (
            <div key={feat.id} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 group hover:border-blue-500/30 transition-all">
              <div className="flex justify-between items-start mb-10">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white text-xl shadow-lg" style={{ backgroundColor: feat.color }}>
                       <i className={`fa-solid ${feat.icon}`}></i>
                    </div>
                    <h4 className="text-lg font-black text-slate-900">{feat.name}</h4>
                 </div>
                 <i className="fa-solid fa-arrow-up-right-from-square text-slate-200 group-hover:text-blue-500 transition-colors"></i>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-10">
                 {feat.metrics.map((m, i) => (
                   <div key={i} className="bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{m.label}</p>
                      <p className="text-xl font-black text-slate-900">{m.val}</p>
                   </div>
                 ))}
              </div>

              <div className="space-y-6">
                 {feat.rates.map((r, i) => (
                   <div key={i}>
                      <div className="flex justify-between text-[11px] font-black text-slate-500 mb-2 uppercase tracking-tight">
                         <span>{r.label}</span>
                         <span className="text-slate-900">{r.val}{r.unit || '%'}</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                         <div className="h-full rounded-full transition-all duration-1000" style={{ backgroundColor: feat.color, width: `${Math.min(r.val * (r.unit ? 2 : 1), 100)}%` }}></div>
                      </div>
                   </div>
                 ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. 使用趋势深度分析 */}
      <div className="bg-slate-900 p-10 rounded-[3rem] shadow-2xl shadow-blue-900/10 text-white overflow-hidden relative">
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-12">
            <div>
              <h3 className="text-2xl font-black">功能使用趋势全景</h3>
              <p className="text-slate-400 text-sm mt-2 font-medium">对比分析三大核心业务模块的活跃调用走势</p>
            </div>
            {/* 图例改为中文提示 */}
            <div className="flex gap-4">
               {['checkin', 'homework', 'playback'].map((k) => (
                 <div key={k} className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors cursor-default">
                    <span className={`w-2 h-2 rounded-full ${k === 'checkin' ? 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]' : k === 'homework' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]'}`}></span>
                    <span className="text-[11px] font-bold tracking-wide">{featureLabelMap[k]}</span>
                 </div>
               ))}
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={featureTrend}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#475569', fontSize: 11}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#475569', fontSize: 11}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', color: '#fff' }}
                  formatter={(value: any, name: string) => [value, featureLabelMap[name] || name]}
                />
                <Area type="monotone" dataKey="checkin" name="checkin" stroke="#3b82f6" strokeWidth={4} fill="rgba(59,130,246,0.05)" />
                <Area type="monotone" dataKey="homework" name="homework" stroke="#10b981" strokeWidth={3} fill="transparent" />
                <Area type="monotone" dataKey="playback" name="playback" stroke="#f59e0b" strokeWidth={2} fill="transparent" strokeDasharray="5 5" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full"></div>
      </div>
    </div>
  );
};

export default UserAnalysisBoard;
