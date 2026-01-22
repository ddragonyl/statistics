
import React, { useState } from 'react';
import { 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, Cell, AreaChart, Area, ComposedChart, Line
} from 'recharts';

const topMetrics = [
  { label: '总 GMV (实时)', value: '¥1,842,500', change: 22.5, icon: 'fa-sack-dollar', color: 'text-emerald-500' },
  { label: '总成单量', value: '4,821', change: 11.0, icon: 'fa-cart-flatbed-suitcase', color: 'text-blue-500' },
  { label: '新注册用户', value: '1,420', change: 4.2, icon: 'fa-user-plus', color: 'text-amber-500' },
];

const marketingTrendData = [
  { name: '05-16', 参与人数: 1200, 转化GMV: 45000 },
  { name: '05-17', 参与人数: 1500, 转化GMV: 52000 },
  { name: '05-18', 参与人数: 1100, 转化GMV: 38000 },
  { name: '05-19', 参与人数: 1800, 转化GMV: 68000 },
  { name: '05-20', 参与人数: 2200, 转化GMV: 82000 },
  { name: '05-21', 参与人数: 2100, 转化GMV: 79000 },
  { name: '05-22', 参与人数: 2500, 转化GMV: 95000 },
];

const toolStats = [
  { name: '限时促销', roi: '+15.2x', orders: 128, trend: 'up', icon: 'fa-bolt-lightning', color: 'bg-amber-500' },
  { name: '优惠券', roi: '+8.4x', orders: 342, trend: 'up', icon: 'fa-ticket', color: 'bg-blue-600' },
  { name: '课程联报', roi: '+12.1x', orders: 56, trend: 'up', icon: 'fa-layer-group', color: 'bg-indigo-500' },
  { name: '拼团', roi: '+9.5x', orders: 112, trend: 'up', icon: 'fa-users-rectangle', color: 'bg-emerald-500' },
];

const recentTransactions = [
  { id: 'ORD-001', org: '新东方北京', amount: '¥2,999', status: '已完成', type: '直播课', marketingType: '限时促销', time: '14:20' },
  { id: 'ORD-002', org: '学而思', amount: '¥1,500', status: '未支付', type: '素材包', marketingType: '优惠券', time: '14:15' },
  { id: 'ORD-003', org: '高途教育', amount: '¥4,200', status: '已支付', type: '一对一', marketingType: '课程联报', time: '14:05' },
  { id: 'ORD-004', org: '作业帮', amount: '¥899', status: '已取消', type: '点播课', marketingType: '拼团', time: '13:50' },
  { id: 'ORD-005', org: '有道精品', amount: '¥599', status: '已超时', type: '资料集', marketingType: '优惠券', time: '13:42' },
];

const MarketingBoard: React.FC = () => {
  const [selectedOrg, setSelectedOrg] = useState('all');
  const [timeRange, setTimeRange] = useState('today');
  const [dateRange, setDateRange] = useState({
    start: '2024年05月01日',
    end: '2024年05月22日'
  });

  // 状态样式映射函数
  const getStatusConfig = (status: string) => {
    switch (status) {
      case '未支付': return { text: 'text-amber-500', bg: 'bg-amber-500', pulse: true };
      case '已支付': return { text: 'text-blue-500', bg: 'bg-blue-500', pulse: false };
      case '已超时': return { text: 'text-slate-400', bg: 'bg-slate-400', pulse: false };
      case '已取消': return { text: 'text-rose-400', bg: 'bg-rose-400', pulse: false };
      case '已完成': return { text: 'text-emerald-500', bg: 'bg-emerald-500', pulse: false };
      default: return { text: 'text-slate-500', bg: 'bg-slate-500', pulse: false };
    }
  };

  // 营销类型图标与颜色映射
  const getMarketingTypeStyle = (type: string) => {
    switch (type) {
      case '限时促销': return 'bg-amber-50 text-amber-600 border-amber-100';
      case '优惠券': return 'bg-blue-50 text-blue-600 border-blue-100';
      case '课程联报': return 'bg-indigo-50 text-indigo-600 border-indigo-100';
      case '拼团': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      default: return 'bg-slate-50 text-slate-600 border-slate-100';
    }
  };

  return (
    <div className="space-y-6">
      {/* 筛选控制条 - 右侧对齐 */}
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
            <i className="fa-solid fa-caret-down text-[10px] text-slate-300 ml-1"></i>
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

      {/* Top: Global Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {topMetrics.map((item) => (
          <div key={item.label} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between group hover:border-emerald-200 transition-all">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{item.label}</p>
              <h3 className="text-3xl font-black text-slate-900">{item.value}</h3>
              <p className={`text-xs font-bold mt-2 ${item.change >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                <i className={`fa-solid ${item.change >= 0 ? 'fa-caret-up' : 'fa-caret-down'} mr-1`}></i>
                较昨日 +{item.change}%
              </p>
            </div>
            <div className={`w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-2xl ${item.color} group-hover:scale-110 transition-transform`}>
              <i className={`fa-solid ${item.icon}`}></i>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col relative overflow-hidden">
          <div className="flex justify-between items-center mb-6">
             <div>
               <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                 <i className="fa-solid fa-chart-line text-blue-500"></i>
                 营销活动成效与趋势监测
               </h3>
               <p className="text-xs text-slate-400 mt-1">实时追踪营销获客参与规模与转化 GMV 走势</p>
             </div>
             <div className="flex gap-4">
               <span className="flex items-center gap-1.5 text-[10px] font-black text-slate-400 uppercase">
                 <span className="w-2.5 h-2.5 rounded-full bg-blue-500/20 border border-blue-500"></span> 参与人数
               </span>
               <span className="flex items-center gap-1.5 text-[10px] font-black text-slate-400 uppercase">
                 <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> 转化 GMV
               </span>
             </div>
          </div>

          <div className="flex-1 min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={marketingTrendData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 'bold'}} />
                <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} />
                <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                />
                <Area yAxisId="left" type="monotone" dataKey="参与人数" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="rgba(59,130,246,0.05)" />
                <Bar yAxisId="right" dataKey="转化GMV" fill="#10b981" radius={[4, 4, 0, 0]} barSize={20} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
           <div className="flex justify-between items-center">
             <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">营销工具实战战果</h3>
             <i className="fa-solid fa-ellipsis-h text-slate-300"></i>
           </div>
           <div className="flex flex-col gap-4">
             {toolStats.map((tool) => (
               <div key={tool.name} className="bg-white p-5 rounded-2xl border border-slate-100 flex items-center justify-between hover:shadow-md transition-shadow group cursor-pointer">
                 <div className="flex items-center gap-4">
                   <div className={`w-12 h-12 rounded-xl ${tool.color} flex items-center justify-center text-white text-xl shadow-lg shadow-blue-900/10`}>
                     <i className={`fa-solid ${tool.icon}`}></i>
                   </div>
                   <div>
                     <p className="text-sm font-bold text-slate-800">{tool.name}</p>
                     <p className="text-[10px] text-slate-400">成交订单: {tool.orders}</p>
                   </div>
                 </div>
                 <div className="text-right">
                   <p className="text-lg font-black text-emerald-500">{tool.roi}</p>
                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">实时 ROI</p>
                 </div>
               </div>
             ))}
           </div>
        </div>
      </div>

      {/* Bottom: Transaction Details */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex justify-between items-center mb-6">
           <h3 className="text-lg font-bold text-slate-800">营销成交</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-50">
                <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">订单 ID</th>
                <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">所属机构</th>
                <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">课程类型</th>
                <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">营销类型</th>
                <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">交易金额</th>
                <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">状态</th>
                <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">时间</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {recentTransactions.map((tx) => {
                const config = getStatusConfig(tx.status);
                const marketingStyle = getMarketingTypeStyle(tx.marketingType);
                return (
                  <tr key={tx.id} className="group hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 text-xs font-mono font-bold text-slate-500">{tx.id}</td>
                    <td className="py-4 text-sm font-bold text-slate-800">{tx.org}</td>
                    <td className="py-4">
                      <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-bold">{tx.type}</span>
                    </td>
                    <td className="py-4">
                      <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black border ${marketingStyle}`}>
                        {tx.marketingType}
                      </span>
                    </td>
                    <td className="py-4 text-sm font-black text-slate-900">{tx.amount}</td>
                    <td className="py-4">
                      <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold ${config.text}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${config.bg} ${config.pulse ? 'animate-pulse' : ''}`}></span>
                        {tx.status}
                      </span>
                    </td>
                    <td className="py-4 text-xs text-slate-400 font-medium text-right">{tx.time}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MarketingBoard;
