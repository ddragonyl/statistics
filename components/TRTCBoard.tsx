
import React, { useState } from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, LineChart, Line, Legend
} from 'recharts';

// --- 模拟数据池 ---
const costComposition = [
  { name: '音视频', value: 45, color: '#3b82f6' },
  { name: '录制', value: 25, color: '#ef4444' },
  { name: '白板', value: 10, color: '#10b981' },
  { name: '快直播流量', value: 15, color: '#f59e0b' },
  { name: '混流转推', value: 5, color: '#8b5cf6' },
];

const costTrend = [
  { month: '1月', av: 9500, rec: 6800, traffic: 3000 },
  { month: '2月', av: 11000, rec: 7500, traffic: 3800 },
  { month: '3月', av: 12500, rec: 8200, traffic: 4200 },
  { month: '4月', av: 13200, rec: 8900, traffic: 4800 },
  { month: '5月', av: 12800, rec: 8500, traffic: 4500 },
  { month: '6月', av: 12350, rec: 8240, traffic: 4320 },
];

const dailyTrend = Array.from({ length: 30 }, (_, i) => ({
  date: `${i + 1}日`,
  count: 80 + Math.sin(i * 0.5) * 30 + Math.random() * 20
}));

const comparisonData = [
  { month: '1月', revenue: 120000, cost: 22000 },
  { month: '2月', revenue: 135000, cost: 25000 },
  { month: '3月', revenue: 152000, cost: 28000 },
  { month: '4月', revenue: 168000, cost: 32000 },
  { month: '5月', revenue: 160000, cost: 30000 },
  { month: '6月', revenue: 156800, cost: 28540 },
];

const tableData = [
  { id: '1', name: '机构A', av: '3,250', rec: '2,120', wb: '580', traffic: '1,120', push: '380', total: '7,450' },
  { id: '2', name: '机构B', av: '2,850', rec: '1,980', wb: '450', traffic: '980', push: '320', total: '6,580' },
  { id: '3', name: '机构C', av: '4,250', rec: '2,850', wb: '720', traffic: '1,450', push: '480', total: '9,750' },
  { id: '4', name: '机构D', av: '2,000', rec: '1,290', wb: '400', traffic: '770', push: '300', total: '4,760' },
  { id: '5', name: '机构E', av: '1,850', rec: '1,120', wb: '380', traffic: '650', push: '280', total: '4,280' },
];

const TRTCBoard: React.FC = () => {
  const [showProfile, setShowProfile] = useState<string | null>(null);
  const [showDetail, setShowDetail] = useState<string | null>(null);

  const Modal = ({ title, onClose, children }: { title: string, onClose: () => void, children: React.ReactNode }) => (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col border border-slate-100">
        <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
          <h3 className="text-xl font-black text-slate-900 flex items-center gap-3">
            <span className="w-2 h-6 bg-blue-600 rounded-full"></span>
            {title}
          </h3>
          <button onClick={onClose} className="w-10 h-10 rounded-full hover:bg-slate-200 flex items-center justify-center text-slate-400 transition-colors">
            <i className="fa-solid fa-xmark text-lg"></i>
          </button>
        </div>
        <div className="p-8 overflow-y-auto flex-1">{children}</div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8 pb-12">
      {/* 筛选条 */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-wrap items-center gap-6">
        <div className="flex items-center gap-3 flex-1">
          <span className="text-sm font-bold text-slate-400 whitespace-nowrap">机构：</span>
          <div className="relative flex-1 max-w-sm">
            <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-slate-300"></i>
            <input 
              type="text" 
              placeholder="输入机构名称搜索..." 
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 outline-none transition-all" 
            />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm font-bold text-slate-400 whitespace-nowrap">时间范围：</span>
          <div className="flex items-center gap-2 p-1 bg-slate-50 border border-slate-200 rounded-xl">
            <input type="date" defaultValue="2026-01-01" className="bg-transparent px-3 py-1.5 text-xs font-bold text-slate-700 outline-none" />
            <span className="text-slate-300">至</span>
            <input type="date" defaultValue="2026-01-31" className="bg-transparent px-3 py-1.5 text-xs font-bold text-slate-700 outline-none" />
          </div>
        </div>
        <button className="px-10 py-2.5 bg-blue-600 text-white text-sm font-black rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-900/10">查询</button>
      </div>

      {/* 1. 费用指标 */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-amber-100 text-amber-600 rounded-lg">
            <i className="fa-solid fa-sack-dollar"></i>
          </div>
          <h2 className="text-lg font-black text-slate-900 tracking-tight">费用指标概览</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
          {[
            { label: '总消耗', val: '¥28,540', color: 'border-rose-500' },
            { label: '音视频', val: '¥12,350', color: 'border-blue-500' },
            { label: '录制', val: '¥8,240', color: 'border-orange-500' },
            { label: '白板', val: '¥2,150', color: 'border-emerald-500' },
            { label: '快直播流量', val: '¥4,320', color: 'border-purple-500' },
            { label: '混流转推费', val: '¥1,480', color: 'border-indigo-500' },
          ].map((item, idx) => (
            <div key={idx} className={`bg-white p-6 rounded-3xl shadow-sm border-l-4 ${item.color} border-y-slate-100 border-r-slate-100 hover:shadow-md transition-all`}>
              <p className="text-[10px] font-black text-slate-400 mb-2 uppercase tracking-widest">{item.label}</p>
              <h3 className="text-2xl font-black text-slate-900">{item.val}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* 2. 直播指标 */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
            <i className="fa-solid fa-video"></i>
          </div>
          <h2 className="text-lg font-black text-slate-900 tracking-tight">运营规模监测</h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-5">
          {[
            { label: '总直播数', val: '1,256', change: '+8.5%', color: 'border-blue-500' },
            { label: '大班课数', val: '568', change: '+6.2%', color: 'border-indigo-500' },
            { label: '小班课数', val: '423', change: '+9.8%', color: 'border-cyan-500' },
            { label: '私教课数', val: '265', change: '+12.3%', color: 'border-purple-500' },
            { label: '总学生数', val: '12,580', change: '+3.5%', color: 'border-emerald-500' },
          ].map((item, idx) => (
            <div key={idx} className={`bg-white p-6 rounded-3xl shadow-sm border-t-2 ${item.color} border-x-slate-100 border-b-slate-100`}>
              <p className="text-[10px] font-black text-slate-400 mb-2 uppercase tracking-widest">{item.label}</p>
              <h3 className="text-2xl font-black text-slate-900">{item.val}</h3>
              <div className="flex items-center gap-1.5 mt-3">
                <span className="flex items-center justify-center w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 text-[8px]">
                  <i className="fa-solid fa-arrow-up"></i>
                </span>
                <span className="text-xs font-bold text-emerald-600">{item.change}</span>
                <span className="text-[10px] text-slate-400 font-medium">较上周</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. 费用明细数据表格 */}
      <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-50 flex justify-between items-center">
          <h3 className="text-lg font-black text-slate-900">机构消耗明细清单</h3>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-slate-900 text-white text-[10px] font-black rounded-xl uppercase tracking-widest hover:bg-slate-800 transition-colors">导出报表</button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50">
              <tr>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">机构名称</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">音视频(min)</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">录制费</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">白板</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">快直播流量</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">总金额(Total)</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">管理操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {tableData.map((row, i) => (
                <tr key={i} className="group hover:bg-blue-50/30 transition-all">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-[10px] font-black text-slate-500 group-hover:bg-blue-600 group-hover:text-white transition-all">
                        {row.id}
                      </div>
                      <span className="text-sm font-bold text-slate-800 tracking-tight">{row.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-6 text-sm font-medium text-slate-500">¥{row.av}</td>
                  <td className="px-6 py-6 text-sm font-medium text-slate-500">¥{row.rec}</td>
                  <td className="px-6 py-6 text-sm font-medium text-slate-500">¥{row.wb}</td>
                  <td className="px-6 py-6 text-sm font-medium text-slate-500">¥{row.traffic}</td>
                  <td className="px-6 py-6 font-black text-slate-900">¥{row.total}</td>
                  <td className="px-8 py-6 text-right space-x-2">
                    <button 
                      onClick={() => setShowProfile(row.name)} 
                      className="px-4 py-2 bg-blue-50 text-blue-600 text-[10px] font-black rounded-xl uppercase hover:bg-blue-600 hover:text-white transition-all"
                    >
                      查看画像
                    </button>
                    <button 
                      onClick={() => setShowDetail(row.name)} 
                      className="px-4 py-2 bg-slate-50 text-slate-600 text-[10px] font-black rounded-xl uppercase hover:bg-slate-900 hover:text-white transition-all"
                    >
                      账单明细
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-8 py-5 bg-slate-50/50 flex justify-between items-center">
           <span className="text-[10px] font-black text-slate-400 uppercase">Page 1 of 12</span>
           <div className="flex gap-2">
             <button className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-white"><i className="fa-solid fa-chevron-left text-[10px]"></i></button>
             <button className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold">1</button>
             <button className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-600 flex items-center justify-center text-[10px] font-bold">2</button>
             <button className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-white"><i className="fa-solid fa-chevron-right text-[10px]"></i></button>
           </div>
        </div>
      </div>

      {/* 4. 图表组 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-lg font-black text-slate-900">TRTC费用构成分布</h3>
            <div className="p-2 bg-slate-50 rounded-lg"><i className="fa-solid fa-chart-pie text-slate-400"></i></div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={costComposition} cx="50%" cy="50%" innerRadius={75} outerRadius={100} paddingAngle={8} dataKey="value" stroke="none">
                  {costComposition.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                />
                <Legend verticalAlign="bottom" iconType="circle" wrapperStyle={{ fontSize: '10px', fontWeight: 'bold', paddingTop: '30px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-lg font-black text-slate-900">费用趋势深度分析</h3>
            <div className="flex gap-4">
              <span className="flex items-center gap-1.5 text-[10px] font-black text-slate-400"><span className="w-2 h-2 rounded-full bg-blue-500"></span> 音视频</span>
              <span className="flex items-center gap-1.5 text-[10px] font-black text-slate-400"><span className="w-2 h-2 rounded-full bg-rose-500"></span> 录制费</span>
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={costTrend}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 'bold'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 'bold'}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}
                />
                <Line type="monotone" dataKey="av" name="音视频" stroke="#3b82f6" strokeWidth={4} dot={{r: 4, fill: '#fff', strokeWidth: 3}} activeDot={{r: 6}} />
                <Line type="monotone" dataKey="rec" name="录制" stroke="#ef4444" strokeWidth={3} strokeDasharray="5 5" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 5. 直播趋势 & 经济成本 (结合版) */}
      <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h3 className="text-xl font-black text-slate-900">直播业务与经济成本相关性</h3>
            <p className="text-sm text-slate-400 mt-1 font-medium">透视资源消耗如何驱动业务营收增长</p>
          </div>
          <div className="flex bg-slate-100 p-1 rounded-xl">
             <button className="px-4 py-1.5 bg-white shadow-sm text-xs font-black text-blue-600 rounded-lg">相关性分析</button>
             <button className="px-4 py-1.5 text-xs font-bold text-slate-400">原始数据流</button>
          </div>
        </div>
        <div className="h-80 mb-12">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={dailyTrend}>
              <defs>
                <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
              <Tooltip />
              <Area type="monotone" name="直播场次" dataKey="count" stroke="#8b5cf6" strokeWidth={4} fillOpacity={1} fill="url(#colorCount)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        
        {/* 底部经济指标 HUD */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pt-10 border-t border-slate-50">
           <div className="space-y-2">
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">机构总营收估算</p>
             <h4 className="text-4xl font-black text-slate-900 tracking-tight">¥156,800</h4>
             <p className="text-xs font-bold text-emerald-500 flex items-center gap-1"><i className="fa-solid fa-arrow-up"></i> 12.5% Growth</p>
           </div>
           <div className="space-y-2">
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">TRTC 总消耗额</p>
             <h4 className="text-4xl font-black text-rose-500 tracking-tight">¥28,540</h4>
             <p className="text-xs font-bold text-slate-400">实时计费对账中</p>
           </div>
           <div className="space-y-2">
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">成本收入比 (Ratio)</p>
             <h4 className="text-4xl font-black text-emerald-600 tracking-tight">18.2%</h4>
             <div className="w-full h-1.5 bg-slate-100 rounded-full mt-4 overflow-hidden">
                <div className="h-full bg-emerald-500" style={{ width: '18.2%' }}></div>
             </div>
           </div>
           <div className="space-y-2">
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">每元消耗产出 (ROI)</p>
             <h4 className="text-4xl font-black text-blue-600 tracking-tight">¥5.49</h4>
             <p className="text-xs font-medium text-slate-400 leading-relaxed">每 1 元 TRTC 消耗平均支撑 5.5 元课酬收入产生。</p>
           </div>
        </div>
      </div>

      {/* 6. 双轴对比 */}
      <div className="bg-slate-900 p-12 rounded-[3.5rem] shadow-2xl shadow-blue-900/10 text-white relative overflow-hidden">
        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start gap-12">
          <div className="max-w-xs">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-[10px] font-black uppercase mb-6 tracking-widest border border-blue-500/30">
               Market Synergy
            </div>
            <h3 className="text-3xl font-black mb-4 leading-tight">机构收入与云消耗 规模背离度分析</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              健康的业务模型应表现为收入曲线斜率大于消耗曲线，Prism 算法正实时监控各商户的资源利用率异常。
            </p>
          </div>
          <div className="flex-1 w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={comparisonData}>
                <defs>
                  <linearGradient id="colorComparisonRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#475569', fontSize: 11}} />
                <YAxis yAxisId="left" hide />
                <YAxis yAxisId="right" orientation="right" hide />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '16px' }}
                />
                <Area yAxisId="left" type="monotone" name="机构收入" dataKey="revenue" stroke="#10b981" strokeWidth={5} fillOpacity={1} fill="url(#colorComparisonRev)" />
                <Area yAxisId="right" type="monotone" name="TRTC消耗" dataKey="cost" stroke="#ef4444" strokeWidth={3} fill="transparent" strokeDasharray="10 10" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        {/* 背景饰物 */}
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-blue-600/10 blur-[120px] rounded-full"></div>
      </div>

      {/* 弹窗逻辑 */}
      {showProfile && (
        <Modal title={`👤 机构全息画像 - ${showProfile}`} onClose={() => setShowProfile(null)}>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="space-y-6">
               <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                 <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">活跃度综合评分</h4>
                 <div className="flex items-center gap-6">
                    <div className="text-5xl font-black text-blue-600">88<span className="text-sm">/100</span></div>
                    <div className="text-xs font-bold text-slate-500 leading-relaxed">
                      该机构直播频次极高，音视频清晰度达标，录制资源沉淀活跃。
                    </div>
                 </div>
               </div>
               <div className="bg-white p-6 rounded-2xl border border-slate-100 h-64">
                 <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">主要班型分布</h4>
                 <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={[
                        {name: '大班', value: 70, color: '#3b82f6'},
                        {name: '小班', value: 20, color: '#10b981'},
                        {name: '1对1', value: 10, color: '#f59e0b'}
                      ]} innerRadius={50} outerRadius={70} dataKey="value" stroke="none">
                        <Cell fill="#3b82f6" /><Cell fill="#10b981" /><Cell fill="#f59e0b" />
                      </Pie>
                      <Tooltip />
                    </PieChart>
                 </ResponsiveContainer>
               </div>
             </div>
             <div className="bg-slate-900 rounded-3xl p-8 text-white">
                <h4 className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-8">AI 经营洞察报告</h4>
                <div className="space-y-6">
                   <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/30 text-blue-400"><i className="fa-solid fa-lightbulb"></i></div>
                      <p className="text-sm font-medium leading-relaxed">
                        <span className="text-blue-400 font-black">成本优化建议：</span>
                        该机构录制开启率达 100%，建议针对部分复购课使用“冷存储”策略，可降低约 15% 录制费。
                      </p>
                   </div>
                   <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30 text-emerald-400"><i className="fa-solid fa-rocket"></i></div>
                      <p className="text-sm font-medium leading-relaxed">
                        <span className="text-emerald-400 font-black">增长爆发预警：</span>
                        过去 48 小时内互动白板调用量激增 300%，预计即将进入大班课招生高峰期，请注意 CDN 水位。
                      </p>
                   </div>
                </div>
                <button className="w-full mt-10 py-3 bg-blue-600 text-white text-[10px] font-black rounded-xl uppercase tracking-[0.2em] shadow-lg shadow-blue-900/40">生成完整 PDF 报告</button>
             </div>
           </div>
        </Modal>
      )}

      {showDetail && (
        <Modal title={`📋 账单分项深度明细 - ${showDetail}`} onClose={() => setShowDetail(null)}>
           <div className="space-y-6">
             <div className="flex justify-between items-center bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <div>
                   <p className="text-[10px] font-black text-slate-400 uppercase mb-1">本月未结算总额</p>
                   <p className="text-3xl font-black text-slate-900">¥1,250.40</p>
                </div>
                <div className="text-right">
                   <p className="text-[10px] font-black text-slate-400 uppercase mb-1">结算状态</p>
                   <span className="px-3 py-1 bg-amber-100 text-amber-600 text-[10px] font-black rounded-full uppercase">账期处理中</span>
                </div>
             </div>
             <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 border-b border-slate-100">
                    <tr>
                      <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase">计费项名称</th>
                      <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase">用量详情</th>
                      <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase">单价估算</th>
                      <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase text-right">小计金额</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {[
                      {name: '全高清(1080P)通话时长', usage: '15,200 min', price: '¥0.04/min', sub: '¥608.00'},
                      {name: '云端高清录制', usage: '4,500 min', price: '¥0.06/min', sub: '¥270.00'},
                      {name: '互动白板 API 调用', usage: '890 次', price: '¥0.10/次', sub: '¥89.00'},
                      {name: '混流转推时长', usage: '1,200 min', price: '¥0.20/min', sub: '¥240.00'},
                    ].map((m, i) => (
                      <tr key={i} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 text-xs font-bold text-slate-700">{m.name}</td>
                        <td className="px-6 py-4 text-xs font-medium text-slate-500">{m.usage}</td>
                        <td className="px-6 py-4 text-xs font-medium text-slate-500">{m.price}</td>
                        <td className="px-6 py-4 text-xs font-black text-slate-900 text-right">{m.sub}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
             </div>
             <p className="text-[10px] text-slate-400 italic font-medium">注意：以上数据每 5 分钟同步一次云服务计费接口，可能存在少量延迟。</p>
           </div>
        </Modal>
      )}
    </div>
  );
};

export default TRTCBoard;
