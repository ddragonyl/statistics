
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

  return (
    <div className="space-y-6">
      {/* 筛选控制条 */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-1 min-w-[300px]">
          {/* 机构筛选 */}
          <div className="relative flex-1 max-w-xs">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i className="fa-solid fa-building text-slate-400 text-xs"></i>
            </div>
            <select 
              value={selectedOrg}
              onChange={(e) => setSelectedOrg(e.target.value)}
              className="block w-full pl-9 pr-10 py-2 text-sm border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-xl bg-slate-50 font-medium text-slate-700 appearance-none cursor-pointer hover:bg-slate-100 transition-colors"
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

          {/* 时间范围选择 */}
          <div className="flex bg-slate-100 p-1 rounded-xl">
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
                    ? 'bg-white text-blue-600 shadow-sm' 
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 text-slate-400">
          <i className="fa-solid fa-clock-rotate-left text-xs"></i>
          <span className="text-[11px] font-bold uppercase tracking-wider">数据每 5 分钟自动刷新</span>
        </div>
      </div>

      {/* Macro Layer: Platform Lifeline */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1 h-4 bg-blue-600 rounded-full"></div>
          <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">宏观营收看板 (平台视角)</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard title="平台总收入 (Total)" value="¥256,860" change={15.2} icon="fa-building-columns" color="bg-slate-900" />
          <MetricCard title="机构服务费收入" value="¥115,430" change={8.4} icon="fa-hand-holding-dollar" color="bg-blue-600" />
          <MetricCard title="功能点收入 (Points)" value="¥77,050" change={12.1} icon="fa-bolt" color="bg-purple-600" />
          <MetricCard title="购买兑换码收入" value="¥64,380" change={4.5} icon="fa-ticket" color="bg-orange-500" />
        </div>
      </section>

      {/* Merchant & User Layer */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1 h-4 bg-indigo-600 rounded-full"></div>
          <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">机构经营与增长 (商户/学员视角)</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard title="新注册用户数" value="+1,420" change={22.5} icon="fa-user-plus" color="bg-indigo-500" />
          <MetricCard title="全平台机构 GMV" value="¥1,842k" change={5.2} icon="fa-chart-line" color="bg-emerald-600" />
          <MetricCard title="机构总成单量" value="4,821" change={11.0} icon="fa-cart-shopping" color="bg-cyan-600" />
          <MetricCard title="平台总 DAU" value="15,280" change={4.2} icon="fa-users" color="bg-slate-700" />
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Trend Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-800">平台收入 vs 机构交易趋势 (24h)</h3>
            <div className="flex gap-4">
              <span className="flex items-center gap-1 text-xs text-slate-500">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span> 平台收入
              </span>
              <span className="flex items-center gap-1 text-xs text-slate-500">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span> 机构GMV
              </span>
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                />
                <Area type="monotone" dataKey="totalRev" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                <Area type="monotone" dataKey="merchantGmv" stroke="#34d399" strokeWidth={2} fill="transparent" strokeDasharray="5 5" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue Mix */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 mb-6">平台收入构成分析</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={revenueMix}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {revenueMix.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-3">
            {revenueMix.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{backgroundColor: item.color}}></div>
                  <span className="text-sm text-slate-600">{item.name}</span>
                </div>
                <span className="text-sm font-bold text-slate-800">{item.value}%</span>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-6 border-t border-slate-100">
            <div className="flex items-center justify-between text-xs font-bold text-slate-400 mb-2">
              <span>兑换码激活率</span>
              <span className="text-slate-800">82.4%</span>
            </div>
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-orange-500" style={{width: '82.4%'}}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessBoard;
