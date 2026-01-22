
import React, { useState } from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, LineChart, Line, BarChart, Bar
} from 'recharts';

// --- 模拟数据 ---
const costComposition = [
  { name: '音视频', value: 12350, color: '#3b82f6' },
  { name: '录制', value: 8240, color: '#ef4444' },
  { name: '白板', value: 2150, color: '#10b981' },
  { name: '快直播流量', value: 4320, color: '#f59e0b' },
  { name: '混流转推', value: 1480, color: '#8b5cf6' },
];

const dailyLiveTrend = Array.from({length: 15}, (_, i) => ({
  day: `01-${i + 15}`,
  count: Math.floor(Math.random() * 100) + 50
}));

const tableData = [
  { id: 'A', name: '新东方教育', av: '¥3,250', rec: '¥2,120', wb: '¥580', total: '¥7,450', gmv: '¥42,000' },
  { id: 'B', name: '学而思培优', av: '¥4,250', rec: '¥2,850', wb: '¥720', total: '¥9,750', gmv: '¥58,000' },
  { id: 'C', name: '高途精品课', av: '¥2,000', rec: '¥1,290', wb: '¥400', total: '¥4,760', gmv: '¥29,000' },
  { id: 'D', name: '作业帮直播', av: '¥1,850', rec: '¥1,120', wb: '¥380', total: '¥4,280', gmv: '¥31,000' },
];

const TRTCBoard: React.FC = () => {
  const [selectedOrg, setSelectedOrg] = useState('all');
  const [showProfile, setShowProfile] = useState<string | null>(null);
  const [showDetail, setShowDetail] = useState<string | null>(null);

  // 渲染通用弹窗容器
  const Modal = ({ title, onClose, children }: { title: string, onClose: () => void, children: React.ReactNode }) => (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col border border-slate-100">
        <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
          <h3 className="text-xl font-black text-slate-900 flex items-center gap-3">
            <span className="w-2 h-6 bg-blue-600 rounded-full"></span>
            {title}
          </h3>
          <button onClick={onClose} className="w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 transition-colors">
            <i className="fa-solid fa-xmark text-lg"></i>
          </button>
        </div>
        <div className="p-8 overflow-y-auto flex-1">{children}</div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* 1. 顶部控制条 */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-wrap items-center justify-between gap-5">
        <div className="flex flex-wrap items-center gap-4 flex-1">
          <div className="relative min-w-[220px]">
            <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
            <select 
              className="block w-full pl-9 pr-10 py-2.5 text-sm border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 rounded-xl bg-slate-50 font-bold text-slate-700 appearance-none cursor-pointer border"
              value={selectedOrg}
              onChange={(e) => setSelectedOrg(e.target.value)}
            >
              <option value="all">全平台机构筛选</option>
              <option value="new-oriental">新东方教育集团</option>
              <option value="tal">学而思培优</option>
            </select>
          </div>
          <div className="flex items-center gap-3 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl">
            <i className="fa-regular fa-calendar-days text-slate-400"></i>
            <span className="text-sm font-bold text-slate-700 tracking-tight">2026年01月01日 ～ 2026年01月31日</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-6 py-2.5 bg-blue-600 text-white text-xs font-black rounded-xl shadow-lg shadow-blue-900/20 hover:scale-105 transition-transform uppercase tracking-widest">
            Run Analysis
          </button>
        </div>
      </div>

      {/* 2. 核心指标概览 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-1.5 h-4 bg-rose-500 rounded-full shadow-lg shadow-rose-500/30"></div>
            <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest">TRTC 消耗详细账单 (当月)</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { label: '总消耗计费', val: '¥28,540', color: 'text-rose-500', bg: 'bg-rose-50/50' },
              { label: '音视频通话', val: '¥12,350', color: 'text-slate-800', bg: 'bg-slate-50' },
              { label: '云端录制', val: '¥8,240', color: 'text-slate-800', bg: 'bg-slate-50' },
              { label: '互动白板', val: '¥2,150', color: 'text-slate-800', bg: 'bg-slate-50' },
              { label: '快直播流量', val: '¥4,320', color: 'text-slate-800', bg: 'bg-slate-50' },
              { label: '混流转推费', val: '¥1,480', color: 'text-slate-800', bg: 'bg-slate-50' },
            ].map((m, i) => (
              <div key={i} className={`${m.bg} p-6 rounded-2xl border border-slate-100 transition-all hover:shadow-md`}>
                <p className="text-[10px] font-black text-slate-400 uppercase mb-2">{m.label}</p>
                <h3 className={`text-2xl font-black ${m.color}`}>{m.val}</h3>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-4 bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-8">
              <div className="w-1.5 h-4 bg-blue-500 rounded-full shadow-lg shadow-blue-500/30"></div>
              <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest">直播热度监控</h2>
            </div>
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-blue-50/50 rounded-2xl border border-blue-50">
                <div>
                  <p className="text-[10px] font-black text-blue-400 uppercase">总直播场次</p>
                  <p className="text-2xl font-black text-slate-900">1,256</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white"><i className="fa-solid fa-play text-xs"></i></div>
              </div>
              <div className="flex items-center justify-between p-4 bg-emerald-50/50 rounded-2xl border border-emerald-50">
                <div>
                  <p className="text-[10px] font-black text-emerald-400 uppercase">累计学生数</p>
                  <p className="text-2xl font-black text-slate-900">12,580</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white"><i className="fa-solid fa-users text-xs"></i></div>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-slate-50">
            <div className="flex justify-between items-baseline mb-2">
              <span className="text-[10px] font-black text-slate-400 uppercase">服务器并发水位</span>
              <span className="text-xs font-black text-slate-900">62.4%</span>
            </div>
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-500" style={{ width: '62.4%' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. 趋势分析 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-lg font-black text-slate-900">直播场次波动趋势 (15日)</h3>
            <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-3 py-1 rounded-full border border-slate-100 tracking-widest uppercase">Dynamic Refresh</span>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dailyLiveTrend}>
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
                <Tooltip contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}} />
                <Area type="monotone" dataKey="count" stroke="#3b82f6" strokeWidth={4} fillOpacity={1} fill="url(#colorCount)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-4 bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-black text-slate-900 mb-10">消耗构成占比</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={costComposition} cx="50%" cy="50%" innerRadius={60} outerRadius={85} paddingAngle={8} dataKey="value" stroke="none">
                  {costComposition.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 4. 经济成本深度分析 (暗色 HUD 风格) */}
      <div className="bg-slate-900 p-10 rounded-[3rem] text-white shadow-2xl shadow-slate-900/40 relative overflow-hidden">
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-2 border-r border-white/10 pr-4">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">机构总营收 (Revenue)</p>
            <h4 className="text-4xl font-black tracking-tight text-white">¥156,800</h4>
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold pt-4">
              <i className="fa-solid fa-arrow-trend-up"></i>
              <span>+12.5% vs Last Period</span>
            </div>
          </div>
          <div className="space-y-2 border-r border-white/10 pr-4">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">TRTC 总消耗 (Consumption)</p>
            <h4 className="text-4xl font-black tracking-tight text-rose-400">¥28,540</h4>
            <div className="flex items-center gap-2 text-rose-400 text-xs font-bold pt-4">
              <i className="fa-solid fa-cloud-arrow-down"></i>
              <span>Monitoring active...</span>
            </div>
          </div>
          <div className="space-y-2 border-r border-white/10 pr-4">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">成本收入比 (Ratio)</p>
            <h4 className="text-4xl font-black tracking-tight text-emerald-400">18.2%</h4>
            <div className="w-full h-1.5 bg-white/10 rounded-full mt-6 overflow-hidden">
               <div className="h-full bg-emerald-500 shadow-[0_0_10px_#10b981]" style={{ width: '18.2%' }}></div>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">每元消耗产出 (ROI)</p>
            <h4 className="text-4xl font-black tracking-tight text-blue-400">¥5.49</h4>
            <p className="text-[10px] text-slate-400 pt-5 font-medium leading-relaxed">
              每消耗 1 元云资源，平均可支撑机构产生约 5.5 元的课时交易收入。
            </p>
          </div>
        </div>
        {/* 背景光晕 */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 blur-[100px] rounded-full"></div>
      </div>

      {/* 5. 数据明细表 */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/20">
          <div>
            <h3 className="text-lg font-black text-slate-900 tracking-tight">各机构消耗明细清单</h3>
            <p className="text-xs text-slate-400 mt-1 font-medium italic">Data synced from Cloud Billing Center</p>
          </div>
          <button className="px-5 py-2 bg-slate-900 text-white text-[10px] font-black rounded-xl uppercase tracking-widest hover:bg-slate-800 transition-colors">
            Export Data
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">机构名称</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">总GMV</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">消耗构成 (AV/Rec/WB)</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">总金额 (Total)</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">操作行为</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {tableData.map(row => (
                <tr key={row.id} className="group hover:bg-blue-50/30 transition-all duration-200">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-900 font-black text-sm group-hover:bg-blue-600 group-hover:text-white transition-all">
                        {row.id}
                      </div>
                      <span className="text-sm font-bold text-slate-800 tracking-tight">{row.name}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-center text-xs font-bold text-emerald-600">{row.gmv}</td>
                  <td className="px-8 py-6">
                    <div className="flex flex-col gap-1">
                      <div className="flex gap-4 text-[10px] font-bold text-slate-500">
                        <span>{row.av}</span>
                        <span>/</span>
                        <span>{row.rec}</span>
                        <span>/</span>
                        <span>{row.wb}</span>
                      </div>
                      <div className="w-24 h-1 bg-slate-100 rounded-full flex overflow-hidden mt-1">
                         <div className="h-full bg-blue-500" style={{width: '45%'}}></div>
                         <div className="h-full bg-rose-500" style={{width: '35%'}}></div>
                         <div className="h-full bg-emerald-500" style={{width: '20%'}}></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-sm font-black text-slate-900">{row.total}</span>
                  </td>
                  <td className="px-8 py-6 text-right space-x-2">
                    <button 
                      onClick={() => setShowProfile(row.name)}
                      className="px-4 py-2 bg-blue-50 text-blue-600 text-[10px] font-black rounded-lg uppercase hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                    >
                      查看画像
                    </button>
                    <button 
                      onClick={() => setShowDetail(row.name)}
                      className="px-4 py-2 bg-slate-50 text-slate-600 text-[10px] font-black rounded-lg uppercase hover:bg-slate-900 hover:text-white transition-all border border-slate-100 shadow-sm"
                    >
                      详细清单
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- 画像弹窗 --- */}
      {showProfile && (
        <Modal title={`👤 机构全息画像 - ${showProfile}`} onClose={() => setShowProfile(null)}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-8">
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <h4 className="text-xs font-black text-slate-400 uppercase mb-6">机构活跃度评分 (Active Index)</h4>
                <div className="flex items-center gap-6">
                   <div className="relative w-24 h-24 flex items-center justify-center">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-200" />
                        <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray={251} strokeDashoffset={251 * (1 - 0.85)} className="text-blue-600" />
                      </svg>
                      <span className="absolute text-2xl font-black text-slate-900">85</span>
                   </div>
                   <div>
                      <p className="text-sm font-black text-slate-900">A级 核心机构</p>
                      <p className="text-xs text-slate-400 mt-1 font-medium">高于全平台 92% 的入驻机构</p>
                   </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-100 h-64">
                <h4 className="text-xs font-black text-slate-400 uppercase mb-4">课程类型偏好</h4>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[
                    { name: '数学', val: 85 }, { name: '英语', val: 72 }, { name: '物理', val: 64 }, { name: '化学', val: 45 }
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 'bold'}} />
                    <Bar dataKey="val" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="space-y-8">
              <div className="bg-white p-6 rounded-2xl border border-slate-100 h-64">
                <h4 className="text-xs font-black text-slate-400 uppercase mb-4">班型消耗分布</h4>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    {/* Fix: Recharts Pie component expects an array of Cell components as children, not a function. */}
                    <Pie 
                      data={[
                        { name: '大班', value: 45, color: '#3b82f6' },
                        { name: '小班', value: 35, color: '#10b981' },
                        { name: '1对1', value: 20, color: '#f59e0b' }
                      ]} 
                      innerRadius={50} 
                      outerRadius={70} 
                      dataKey="value" 
                      stroke="none"
                    >
                      {[
                        { name: '大班', value: 45, color: '#3b82f6' },
                        { name: '小班', value: 35, color: '#10b981' },
                        { name: '1对1', value: 20, color: '#f59e0b' }
                      ].map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                   <p className="text-[10px] font-black text-slate-400 uppercase mb-1">活跃课程</p>
                   <p className="text-lg font-black text-slate-900">24</p>
                 </div>
                 <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                   <p className="text-[10px] font-black text-slate-400 uppercase mb-1">平均时长</p>
                   <p className="text-lg font-black text-slate-900">45m</p>
                 </div>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* --- 账单明细下钻 --- */}
      {showDetail && (
        <Modal title={`📋 账单深度明细 - ${showDetail}`} onClose={() => setShowDetail(null)}>
          <div className="space-y-6">
            <div className="flex gap-4 mb-4">
               <div className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold">2026年1月全部账单</div>
               <div className="px-4 py-2 bg-slate-100 text-slate-500 rounded-lg text-xs font-bold hover:bg-slate-200 cursor-pointer transition-colors">导出为 PDF 存证</div>
            </div>
            <div className="overflow-hidden rounded-2xl border border-slate-100 shadow-sm">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase">课程/课时</th>
                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase text-center">在线人数</th>
                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase">消耗时长 (min)</th>
                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase text-right">费用小计 (RMB)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {[
                    { name: '数学基础: 第一章实数', users: 45, time: 60, cost: '¥128.50' },
                    { name: '数学基础: 第二章代数', users: 52, time: 60, cost: '¥135.80' },
                    { name: '英语口语强化班 L1', users: 12, time: 45, cost: '¥64.20' },
                    { name: '物理实验动态模拟课', users: 85, time: 90, cost: '¥242.00' },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 text-xs font-bold text-slate-700">{row.name}</td>
                      <td className="px-6 py-4 text-xs text-center font-medium text-slate-500">{row.users}</td>
                      <td className="px-6 py-4 text-xs font-medium text-slate-500">{row.time}</td>
                      <td className="px-6 py-4 text-xs font-black text-slate-900 text-right">{row.cost}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-6 bg-blue-50/50 rounded-2xl border border-blue-100 flex justify-between items-center">
               <p className="text-xs font-bold text-blue-600 italic">以上明细包含音视频分钟数、录制时长及混流转推费用，已抵扣机构专属优惠额度。</p>
               <div className="text-right">
                  <p className="text-[10px] font-black text-slate-400 uppercase">Subtotal</p>
                  <p className="text-xl font-black text-slate-900">¥570.50</p>
               </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default TRTCBoard;
