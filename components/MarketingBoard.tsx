
import React from 'react';
import { 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, Cell
} from 'recharts';

const topMetrics = [
  { label: '总 GMV (实时)', value: '¥1,842,500', change: 22.5, icon: 'fa-sack-dollar', color: 'text-emerald-500' },
  { label: '总成单量', value: '4,821', change: 11.0, icon: 'fa-cart-flatbed-suitcase', color: 'text-blue-500' },
  { label: '新注册用户', value: '1,420', change: 4.2, icon: 'fa-user-plus', color: 'text-amber-500' },
];

const funnelData = [
  { label: '访客总数', count: 12500, drop: '0%', fill: 'rgba(16, 185, 129, 0.9)' },
  { label: '优惠领取', count: 4800, drop: '61.6%', fill: 'rgba(16, 185, 129, 0.7)' },
  { label: '试听转化', count: 1560, drop: '67.5%', fill: 'rgba(16, 185, 129, 0.5)' },
  { label: '支付下单', count: 320, drop: '79.5%', fill: 'rgba(16, 185, 129, 0.3)' },
];

const toolStats = [
  { name: '多人拼团', roi: '+12.4x', orders: 156, trend: 'up', icon: 'fa-users-rectangle', color: 'bg-emerald-500' },
  { name: '限时秒杀', roi: '+8.2x', orders: 89, trend: 'up', icon: 'fa-bolt-lightning', color: 'bg-amber-500' },
  { name: '新客专享', roi: '+5.1x', orders: 210, trend: 'down', icon: 'fa-gift', color: 'bg-blue-500' },
  { name: '分享返现', roi: '+9.8x', orders: 64, trend: 'up', icon: 'fa-share-nodes', color: 'bg-indigo-500' },
];

const recentTransactions = [
  { id: 'ORD-001', org: '新东方北京', amount: '¥2,999', status: '已成交', type: '直播课', time: '14:20' },
  { id: 'ORD-002', org: '学而思', amount: '¥1,500', status: '提现中', type: '素材包', time: '14:15' },
  { id: 'ORD-003', org: '高途教育', amount: '¥4,200', status: '已成交', type: '一对一', time: '14:05' },
  { id: 'ORD-004', org: '作业帮', amount: '¥899', status: '已结算', type: '点播课', time: '13:50' },
];

const MarketingBoard: React.FC = () => {
  return (
    <div className="space-y-6">
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
        {/* Left: Deep Funnel */}
        <div className="lg:col-span-3 bg-white p-8 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden">
          <div className="flex justify-between items-center mb-10">
             <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
               <i className="fa-solid fa-filter text-emerald-500"></i>
               全链路营销转化漏斗
             </h3>
             <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">智能追踪中</span>
          </div>
          <div className="space-y-4">
            {funnelData.map((step, idx) => (
              <div key={step.label} className="flex items-center gap-4">
                <div className="w-20 text-right">
                   <p className="text-[10px] font-black text-slate-400 uppercase">{step.label}</p>
                   <p className="text-xs font-bold text-slate-800">{step.count}</p>
                </div>
                <div className="flex-1 relative">
                  <div 
                    className="h-12 rounded-lg flex items-center px-4 transition-all hover:brightness-110"
                    style={{ 
                      width: `${100 - (idx * 15)}%`, 
                      background: step.fill,
                      boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.2)'
                    }}
                  >
                    <span className="text-xs font-black text-white">{100 - (idx * 15)}% 覆盖</span>
                  </div>
                  {idx > 0 && (
                    <div className="absolute -top-4 left-4 text-[9px] font-bold text-rose-500 flex items-center gap-1 bg-white px-1 shadow-sm rounded">
                      <i className="fa-solid fa-arrow-down-long"></i>
                      流失率 {step.drop}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          {/* Background decoration */}
          <div className="absolute bottom-0 right-0 opacity-[0.03] pointer-events-none translate-x-1/4 translate-y-1/4">
             <i className="fa-solid fa-chart-pie text-[200px]"></i>
          </div>
        </div>

        {/* Right: Toolbox Comparison */}
        <div className="lg:col-span-2 space-y-4">
           <div className="flex justify-between items-center">
             <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">营销工具实战战果</h3>
             <i className="fa-solid fa-ellipsis-h text-slate-300"></i>
           </div>
           <div className="flex flex-col gap-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
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
           <button className="w-full py-4 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 text-xs font-bold hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-600 transition-all flex items-center justify-center gap-2">
             <i className="fa-solid fa-plus-circle"></i>
             去创建新的拼团活动
           </button>
        </div>
      </div>

      {/* Bottom: Transaction Details */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex justify-between items-center mb-6">
           <h3 className="text-lg font-bold text-slate-800">营销成交与提现明细</h3>
           <div className="flex gap-2">
             <button className="px-4 py-1.5 bg-slate-50 text-slate-600 rounded-lg text-xs font-bold border border-slate-200 hover:bg-slate-100 transition-all">
               导出报表
             </button>
             <button className="px-4 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-900/10">
               批量结算
             </button>
           </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-50">
                <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">订单 ID</th>
                <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">所属机构</th>
                <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">课程类型</th>
                <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">交易金额</th>
                <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">状态</th>
                <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">时间</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {recentTransactions.map((tx) => (
                <tr key={tx.id} className="group hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 text-xs font-mono font-bold text-slate-500">{tx.id}</td>
                  <td className="py-4 text-sm font-bold text-slate-800">{tx.org}</td>
                  <td className="py-4">
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-bold">{tx.type}</span>
                  </td>
                  <td className="py-4 text-sm font-black text-slate-900">{tx.amount}</td>
                  <td className="py-4">
                    <span className={`inline-flex items-center gap-1 text-[10px] font-bold ${
                      tx.status === '已成交' ? 'text-emerald-500' : 
                      tx.status === '提现中' ? 'text-amber-500' : 'text-blue-500'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        tx.status === '已成交' ? 'bg-emerald-500' : 
                        tx.status === '提现中' ? 'bg-amber-500 animate-pulse' : 'bg-blue-500'
                      }`}></span>
                      {tx.status}
                    </span>
                  </td>
                  <td className="py-4 text-xs text-slate-400 font-medium text-right">{tx.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MarketingBoard;
