
import React, { useState } from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend, BarChart, Bar, ComposedChart
} from 'recharts';

// --- 模拟高度还原截图的数据 ---

// 高频 24h 流量脉冲 (PV/UV)
const trafficPulse24h = Array.from({ length: 96 }, (_, i) => ({
  time: `${Math.floor(i/4)}:${(i%4)*15}`,
  pv: Math.floor(Math.random() * 200) + (i > 60 && i < 80 ? 400 : 50), // 模拟突发脉冲
  uv: Math.floor(Math.random() * 8) + 2
}));

// 近 7 日趋势
const traffic7d = Array.from({ length: 168 }, (_, i) => ({
  time: `D-${Math.floor(i/24)}`,
  pv: Math.floor(Math.random() * 60) + (i % 24 > 10 && i % 24 < 20 ? 40 : 10),
  uv: Math.floor(Math.random() * 14)
}));

const topRegions = [
  { name: '北京市', value: 11653, percent: 85 },
  { name: '广东省', value: 1668, percent: 12 },
  { name: '新加坡', value: 141, percent: 1 },
  { name: '天津市', value: 80, percent: 0.5 },
  { name: '上海市', value: 58, percent: 0.4 },
];

const deviceData = [
  { name: 'PC', value: 75, color: '#3b82f6' },
  { name: 'Mobile', value: 25, color: '#6366f1' },
];

const osData = [
  { name: 'Android', value: 60, color: '#22d3ee' },
  { name: 'iOS', value: 40, color: '#3b82f6' },
];

const topUrls = [
  { url: '/', pv: 11769, uv: 158, success: '99.99%' },
  { url: '/live/21464/auto', pv: 1215, uv: 2, success: '58.44%' },
  { url: '/live/21469/auto', pv: 269, uv: 2, success: '52.04%' },
  { url: '/live/21463/auto', pv: 130, uv: 2, success: '54.62%' },
  { url: '/robots.txt', pv: 64, uv: 47, success: '100%' },
];

const topIps = [
  { ip: '47.94.44.217', location: '中国/北京/阿里巴巴', pv: 11523 },
  { ip: '106.55.200.246', location: '中国/广东/腾讯', pv: 1204 },
  { ip: '192.154.20.11', location: '荷兰/ColocaTel', pv: 842 },
  { ip: '4.194.107.19', location: '新加坡/Microsoft', pv: 132 },
  { ip: '81.71.5.172', location: '中国/广东/腾讯', pv: 129 },
];

const PlatformBoard: React.FC = () => {
  const [selectedOrg, setSelectedOrg] = useState('all');
  const [timeRange, setTimeRange] = useState('today');
  const [dateRange, setDateRange] = useState({
    start: '2024年05月01日',
    end: '2024年05月22日'
  });

  return (
    <div className="space-y-6 pb-12">
      {/* 1. 顶部筛选控制条 (全平台一致的右对齐风格) */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-wrap items-center justify-end gap-5">
        <div className="flex flex-wrap items-center gap-4">

          {/* 自定义日期范围显示 */}
          <div className="flex items-center gap-3 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer hover:border-blue-400 transition-all group">
            <i className="fa-regular fa-calendar-days text-slate-400 group-hover:text-blue-500 transition-colors"></i>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-slate-700 tracking-tight">{dateRange.start}</span>
              <span className="text-slate-300 font-light">～</span>
              <span className="text-sm font-bold text-slate-700 tracking-tight">{dateRange.end}</span>
            </div>
            <i className="fa-solid fa-caret-down text-[10px] text-slate-300 ml-1"></i>
          </div>

          {/* 快捷时间范围选择 */}
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

      {/* 2. 核心指标 HUD */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'PV (环比)', val: '12,587', sub: '较 1 天前', change: '17.70%', up: true },
          { label: 'PV (同比)', val: '12,587', sub: '较 7 天前', change: '13.22%', up: true },
          { label: 'UV (环比)', val: '354', sub: '较 1 天前', change: '8.59%', up: true },
          { label: 'UV (同比)', val: '354', sub: '较 7 天前', change: '0.56%', up: false },
        ].map((item, idx) => (
          <div key={idx} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{item.label}</p>
            <h3 className="text-3xl font-black text-slate-900 tracking-tight">{item.val}</h3>
            <p className="text-[11px] font-bold text-slate-400 mt-2">
              {item.sub} 
              <span className={`ml-1 ${item.up ? 'text-emerald-500' : 'text-rose-500'}`}>
                <i className={`fa-solid fa-arrow-${item.up ? 'up' : 'down'} mr-0.5`}></i>
                {item.change}
              </span>
            </p>
          </div>
        ))}
      </div>

      {/* 3. 流量趋势脉冲 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-6">
            <h4 className="text-sm font-black text-slate-800 flex items-center gap-2">
              <i className="fa-solid fa-bolt text-blue-500"></i>
              PV 趋势
            </h4>
          </div>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trafficPulse24h}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="time" hide />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
                <Tooltip />
                <Area type="monotone" dataKey="pv" stroke="#3b82f6" strokeWidth={2} fill="rgba(59,130,246,0.1)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-6">
            <h4 className="text-sm font-black text-slate-800 flex items-center gap-2">
              <i className="fa-solid fa-chart-line text-emerald-500"></i>
              UV 趋势
            </h4>
          </div>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={traffic7d}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="time" hide />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
                <Tooltip />
                <Area type="monotone" dataKey="uv" stroke="#10b981" strokeWidth={2} fill="rgba(16,185,129,0.1)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 4. 地理与分布分析 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 地域分布排行 */}
        <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col">
          <h4 className="text-sm font-black text-slate-800 mb-6 uppercase tracking-widest">TOP 5 访问省份</h4>
          <div className="space-y-5 flex-1">
            {topRegions.map((reg, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex justify-between text-[11px] font-bold">
                  <span className="text-slate-700">{reg.name}</span>
                  <span className="text-slate-400">{reg.value.toLocaleString()}</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: `${reg.percent}%` }}></div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-4 border-t border-slate-50 text-center">
            <button className="text-[10px] font-black text-blue-600 uppercase tracking-widest">查看地理热力图</button>
          </div>
        </div>

        {/* 终端占比 */}
        <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col">
          <h4 className="text-sm font-black text-slate-800 mb-6 uppercase tracking-widest">移动端/PC 占比</h4>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={deviceData} cx="50%" cy="50%" innerRadius={50} outerRadius={70} dataKey="value" stroke="none">
                  {deviceData.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-around mt-4">
             <div className="text-center">
                <p className="text-[10px] font-black text-slate-400">PC</p>
                <p className="text-lg font-black text-slate-900">75%</p>
             </div>
             <div className="text-center">
                <p className="text-[10px] font-black text-slate-400">Mobile</p>
                <p className="text-lg font-black text-slate-900">25%</p>
             </div>
          </div>
        </div>

        {/* 系统占比 */}
        <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col">
          <h4 className="text-sm font-black text-slate-800 mb-6 uppercase tracking-widest">Android/iOS 占比</h4>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={osData} cx="50%" cy="50%" innerRadius={50} outerRadius={70} dataKey="value" stroke="none">
                  {osData.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-around mt-4">
             <div className="text-center">
                <p className="text-[10px] font-black text-slate-400">Android</p>
                <p className="text-lg font-black text-slate-900">60%</p>
             </div>
             <div className="text-center">
                <p className="text-[10px] font-black text-slate-400">iOS</p>
                <p className="text-lg font-black text-slate-900">40%</p>
             </div>
          </div>
        </div>
      </div>

      {/* 5. 性能与安全表格 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top URL */}
        <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
          <div className="px-8 py-5 border-b border-slate-50 bg-slate-50/50 flex justify-between items-center">
            <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest">性能监测: TOP URL</h4>
            <i className="fa-solid fa-list-check text-slate-300"></i>
          </div>
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-50">
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-tighter">接口</th>
                <th className="px-4 py-4 text-[10px] font-black text-slate-400 uppercase text-center">PV</th>
                <th className="px-4 py-4 text-[10px] font-black text-slate-400 uppercase text-center">UV</th>
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase text-right">可用率</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {topUrls.map((item, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="px-8 py-4"><span className="text-[11px] font-mono font-bold text-slate-600 truncate block max-w-[160px]">{item.url}</span></td>
                  <td className="px-4 py-4 text-[11px] font-black text-slate-900 text-center">{item.pv.toLocaleString()}</td>
                  <td className="px-4 py-4 text-[11px] font-black text-slate-400 text-center">{item.uv}</td>
                  <td className="px-8 py-4 text-right">
                    <span className={`text-[11px] font-black ${parseFloat(item.success) < 90 ? 'text-rose-500' : 'text-emerald-500'}`}>
                      {item.success}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Top IP */}
        <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
          <div className="px-8 py-5 border-b border-slate-50 bg-slate-50/50 flex justify-between items-center">
            <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest">威胁监测: TOP 访问 IP</h4>
            <i className="fa-solid fa-shield-virus text-rose-500"></i>
          </div>
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-50">
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-tighter">来源 IP</th>
                <th className="px-4 py-4 text-[10px] font-black text-slate-400 uppercase">地理/ISP</th>
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase text-right">请求量</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {topIps.map((item, i) => (
                <tr key={i} className="hover:bg-rose-50/30 transition-colors group">
                  <td className="px-8 py-4"><span className="text-[11px] font-mono font-black text-slate-700">{item.ip}</span></td>
                  <td className="px-4 py-4 text-[10px] font-bold text-slate-400 tracking-tight">{item.location}</td>
                  <td className="px-8 py-4 text-right">
                    <span className="text-[11px] font-black text-slate-900">{item.pv.toLocaleString()}</span>
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

export default PlatformBoard;
