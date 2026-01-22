
import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import MetricCard from './MetricCard';

const data = [
  { name: '00:00', totalRev: 4000, merchantGmv: 12000 },
  { name: '04:00', totalRev: 3000, merchantGmv: 8000 },
  { name: '08:00', totalRev: 8000, merchantGmv: 45000 },
  { name: '12:00', totalRev: 12000, merchantGmv: 89000 },
  { name: '16:00', totalRev: 9000, merchantGmv: 72000 },
  { name: '20:00', totalRev: 15000, merchantGmv: 110000 },
  { name: '23:59', totalRev: 14000, merchantGmv: 95000 },
];

const revenueMix = [
  { name: '机构服务费', value: 45, color: '#3b82f6' },
  { name: '功能点收入', value: 30, color: '#8b5cf6' },
  { name: '兑换码销售', value: 25, color: '#f59e0b' },
];

const BusinessBoard: React.FC = () => {
  const [selectedOrg, setSelectedOrg] = useState('all');
  const [timeRange, setTimeRange] = useState('today');
  // 模拟日期范围状态
  const [dateRange, setDateRange] = useState({
    start: '2024年05月01日',
    end: '2024年05月22日'
  });

  return (
    <div className="space-y-6">
      {/* 筛选控制条 - 调整为右对齐 */}
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

          {/* 2. 自定义日期范围选择 (新增) */}
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

      {/* Macro Layer: Platform Lifeline */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1.5 h-4 bg-blue-600 rounded-full shadow-[0_0_8px_rgba(37,99,235,0.4)]"></div>
          <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest">宏观营收看板 (平台视角)</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard title="平台总收入 (Total)" value="¥256,860" change={15.2} icon="fa-building-columns" color="bg-slate-900 shadow-indigo-900/20 shadow-lg" />
          <MetricCard title="机构服务费收入" value="¥115,430" change={8.4} icon="fa-hand-holding-dollar" color="bg-blue-600 shadow-blue-900/20 shadow-lg" />
          <MetricCard title="功能点收入 (Points)" value="¥77,050" change={12.1} icon="fa-bolt" color="bg-purple-600 shadow-purple-900/20 shadow-lg" />
          <MetricCard title="购买兑换码收入" value="¥64,380" change={4.5} icon="fa-ticket" color="bg-orange-500 shadow-orange-900/20 shadow-lg" />
        </div>
      </section>

      {/* Merchant & User Layer */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1.5 h-4 bg-indigo-600 rounded-full shadow-[0_0_8px_rgba(79,70,229,0.4)]"></div>
          <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest">机构经营与增长 (商户/学员视角)</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard title="新注册用户数" value="+1,420" change={22.5} icon="fa-user-plus" color="bg-indigo-500 shadow-indigo-900/20 shadow-lg" />
          <MetricCard title="全平台机构 GMV" value="¥1,842k" change={5.2} icon="fa-chart-line" color="bg-emerald-600 shadow-emerald-900/20 shadow-lg" />
          <MetricCard title="机构总成单量" value="4,821" change={11.0} icon="fa-cart-shopping" color="bg-cyan-600 shadow-cyan-900/20 shadow-lg" />
          <MetricCard title="平台总 DAU" value="15,280" change={4.2} icon="fa-users" color="bg-slate-700 shadow-slate-900/20 shadow-lg" />
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Trend Chart */}
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h3 className="text-lg font-black text-slate-900">平台收入 vs 机构交易趋势</h3>
              <p className="text-xs text-slate-400 mt-1 font-medium">对比自营收入与第三方机构的交易规模走势</p>
            </div>
            <div className="flex gap-6">
              <span className="flex items-center gap-2 text-xs font-bold text-slate-600">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.4)]"></span> 平台收入
              </span>
              <span className="flex items-center gap-2 text-xs font-bold text-slate-600">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.4)]"></span> 机构GMV
              </span>
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 500}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 500}} />
                <Tooltip 
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)'}}
                />
                <Area type="monotone" dataKey="totalRev" stroke="#3b82f6" strokeWidth={4} fillOpacity={1} fill="url(#colorRev)" />
                <Area type="monotone" dataKey="merchantGmv" stroke="#34d399" strokeWidth={2} fill="transparent" strokeDasharray="6 6" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue Mix */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-black text-slate-900 mb-2">平台收入构成分析</h3>
          <p className="text-xs text-slate-400 mb-10 font-medium">按收入来源细分的当月利润结构</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={revenueMix}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={85}
                  paddingAngle={8}
                  dataKey="value"
                  stroke="none"
                >
                  {revenueMix.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-8 space-y-4">
            {revenueMix.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full shadow-sm" style={{backgroundColor: item.color}}></div>
                  <span className="text-xs font-bold text-slate-600">{item.name}</span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-sm font-black text-slate-900">{item.value}</span>
                  <span className="text-[10px] font-bold text-slate-400">%</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 pt-8 border-t border-slate-100">
            <div className="flex items-center justify-between text-[11px] font-black text-slate-400 mb-3 tracking-widest uppercase">
              <span>兑换码激活率 (Code Activation)</span>
              <span className="text-slate-900">82.4%</span>
            </div>
            <div className="w-full h-2 bg-slate-50 rounded-full overflow-hidden border border-slate-100">
              <div className="h-full bg-gradient-to-r from-orange-400 to-amber-500 rounded-full shadow-[0_0_8px_rgba(245,158,11,0.3)]" style={{width: '82.4%'}}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessBoard;
