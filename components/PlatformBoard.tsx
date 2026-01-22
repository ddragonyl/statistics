
import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, PieChart, Pie, Cell, Legend
} from 'recharts';

// --- 模拟高密度数据 ---
const traffic24h = Array.from({ length: 24 }, (_, i) => ({
  time: `${i}:00`,
  pv: Math.floor(Math.random() * 200) + 50,
  uv: Math.floor(Math.random() * 50) + 10
}));

const traffic7d = Array.from({ length: 7 }, (_, i) => ({
  date: `01-${16 + i}`,
  pv: Math.floor(Math.random() * 2000) + 1000,
  uv: Math.floor(Math.random() * 500) + 200
}));

const topLocations = [
  { name: '北京市', value: 11653 },
  { name: '广东省', value: 1668 },
  { name: '新加坡', value: 141 },
  { name: '天津市', value: 80 },
  { name: '上海市', value: 58 },
  { name: '江苏省', value: 56 },
];

const deviceData = [
  { name: 'PC', value: 75, color: '#3b82f6' },
  { name: 'Mobile', value: 25, color: '#60a5fa' },
];

const osData = [
  { name: 'Android', value: 45, color: '#10b981' },
  { name: 'iOS', value: 40, color: '#34d399' },
  { name: 'Other', value: 15, color: '#a7f3d0' },
];

const topUrls = [
  { url: '/', pv: 11769, uv: 158, success: '99.99%' },
  { url: '/live/21464/auto', pv: 1215, uv: 2, success: '98.44%' },
  { url: '/live/21469/auto', pv: 269, uv: 2, success: '52.04%' },
  { url: '/live/21463/auto', pv: 130, uv: 2, success: '54.62%' },
  { url: '/robots.txt', pv: 64, uv: 47, success: '100%' },
];

const topIps = [
  { ip: '47.94.44.217', country: '中国', province: '北京市', isp: '阿里巴巴', pv: 11523 },
  { ip: '106.55.200.246', country: '中国', province: '广东省', isp: '腾讯', pv: 1204 },
  { ip: '106.55.200.45', country: '中国', province: '广东省', isp: '腾讯', pv: 271 },
  { ip: '4.194.107.19', country: '新加坡', province: 'Singapore', isp: 'microsoft', pv: 132 },
  { ip: '81.71.5.172', country: '中国', province: '广东省', isp: '腾讯', pv: 129 },
];

const PlatformBoard: React.FC = () => {
  return (
    <div className="space-y-6 pb-10">
      {/* 1. 核心流量指标 (顶部四格) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'PV (环比)', val: '12,587', change: '17.70%', up: true },
          { label: 'PV (周同比)', val: '12,587', change: '13.22%', up: true },
          { label: 'UV (环比)', val: '354', change: '8.59%', up: true },
          { label: 'UV (周同比)', val: '354', change: '0.56%', up: false },
        ].map((item, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden group">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">{item.label}</p>
            <div className="flex items-baseline gap-3">
              <h3 className="text-3xl font-black text-slate-900">{item.val}</h3>
              <div className={`flex items-center text-[10px] font-bold ${item.up ? 'text-emerald-500' : 'text-rose-500'}`}>
                <i className={`fa-solid ${item.up ? 'fa-caret-up' : 'fa-caret-down'} mr-1`}></i>
                {item.change}
              </div>
            </div>
            {/* 微型装饰线 */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-slate-50">
              <div className={`h-full ${idx < 2 ? 'bg-blue-500' : 'bg-indigo-500'} opacity-20`} style={{ width: '60%' }}></div>
            </div>
          </div>
        ))}
      </div>

      {/* 2. 地理分布模拟 (两列) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-sm font-black text-slate-800">PV 省份分布 (Heatmap)</h3>
            <i className="fa-solid fa-earth-asia text-slate-300"></i>
          </div>
          <div className="aspect-[16/9] bg-slate-50 rounded-xl flex items-center justify-center relative overflow-hidden group">
             {/* 模拟地图视觉 */}
             <i className="fa-solid fa-map text-slate-200 text-8xl group-hover:scale-110 transition-transform duration-700"></i>
             <div className="absolute top-4 left-4 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400">
                   <span className="w-2 h-2 rounded-full bg-blue-500"></span> 高热度区域
                </div>
                <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400">
                   <span className="w-2 h-2 rounded-full bg-blue-100"></span> 低热度区域
                </div>
             </div>
             <div className="absolute bottom-4 right-4 text-[10px] font-bold text-slate-400 bg-white px-2 py-1 rounded shadow-sm border border-slate-100">
                实时数据源: GeoIP2
             </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-sm font-black text-slate-800">PV 国家分布 (Global)</h3>
            <i className="fa-solid fa-globe text-slate-300"></i>
          </div>
          <div className="aspect-[16/9] bg-slate-50 rounded-xl flex items-center justify-center relative group">
             <i className="fa-solid fa-map-location-dot text-slate-200 text-8xl group-hover:scale-110 transition-transform duration-700"></i>
             <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
        </div>
      </div>

      {/* 3. 实时流量脉冲图 (24h & 7d) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-sm font-black text-slate-800 mb-6 flex items-center gap-2">
            <i className="fa-solid fa-wave-square text-blue-500 text-xs"></i>
            近 1 天 PV/UV 趋势 (24h Pulse)
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={traffic24h}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="time" hide />
                <YAxis hide />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', fontSize: '12px' }} />
                <Area type="step" dataKey="pv" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.1} strokeWidth={1} />
                <Area type="step" dataKey="uv" stroke="#10b981" fill="#10b981" fillOpacity={0.1} strokeWidth={1} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-sm font-black text-slate-800 mb-6 flex items-center gap-2">
            <i className="fa-solid fa-chart-line text-indigo-500 text-xs"></i>
            近 7 天 PV/UV 趋势 (7d Trend)
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={traffic7d}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
                <Tooltip />
                <Area type="monotone" dataKey="pv" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.05} strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 4. 访问特征拆解 (TOP 榜单与终端占比) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">TOP 10 访问省份</h3>
          <div className="space-y-4">
            {topLocations.map((item, idx) => (
              <div key={idx} className="flex flex-col gap-1.5">
                <div className="flex justify-between text-[11px] font-bold">
                  <span className="text-slate-700">{item.name}</span>
                  <span className="text-slate-400">{item.value}</span>
                </div>
                <div className="w-full h-1 bg-slate-50 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 rounded-full" 
                    style={{ width: `${(item.value / topLocations[0].value) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">移动端 vs PC 占比</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={deviceData} cx="50%" cy="50%" innerRadius={50} outerRadius={70} dataKey="value" stroke="none">
                  {deviceData.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" iconType="circle" wrapperStyle={{ fontSize: '10px', fontWeight: 'bold' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">Android/iOS 占比</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={osData} cx="50%" cy="50%" innerRadius={50} outerRadius={70} dataKey="value" stroke="none">
                  {osData.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" iconType="circle" wrapperStyle={{ fontSize: '10px', fontWeight: 'bold' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">系统性能摘要</h3>
          <div className="flex-1 flex flex-col justify-around">
             <div className="text-center">
                <p className="text-[10px] font-bold text-slate-400 mb-1 uppercase">平均响应耗时</p>
                <h4 className="text-2xl font-black text-slate-900">42<span className="text-xs ml-1">ms</span></h4>
             </div>
             <div className="text-center">
                <p className="text-[10px] font-bold text-slate-400 mb-1 uppercase">SLA 稳定性</p>
                <h4 className="text-2xl font-black text-emerald-500">99.98%</h4>
             </div>
             <div className="text-center">
                <p className="text-[10px] font-bold text-slate-400 mb-1 uppercase">异常拦截频次</p>
                <h4 className="text-2xl font-black text-rose-500">2.4<span className="text-xs ml-1">/min</span></h4>
             </div>
          </div>
        </div>
      </div>

      {/* 5. TOP URL 与 IP 明细表格 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
            <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">TOP URL 访问排名</h3>
            <button className="text-[10px] font-bold text-blue-600">更多 <i className="fa-solid fa-angle-right"></i></button>
          </div>
          <table className="w-full text-left">
            <thead className="bg-slate-50/50">
              <tr>
                <th className="px-6 py-3 text-[10px] font-black text-slate-400 uppercase">路径 (URL)</th>
                <th className="px-4 py-3 text-[10px] font-black text-slate-400 uppercase text-center">PV</th>
                <th className="px-4 py-3 text-[10px] font-black text-slate-400 uppercase text-center">UV</th>
                <th className="px-6 py-3 text-[10px] font-black text-slate-400 uppercase text-right">成功率</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {topUrls.map((item, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 text-[11px] font-mono text-slate-500 truncate max-w-[200px]">{item.url}</td>
                  <td className="px-4 py-4 text-[11px] font-black text-slate-900 text-center">{item.pv}</td>
                  <td className="px-4 py-4 text-[11px] font-bold text-slate-400 text-center">{item.uv}</td>
                  <td className="px-6 py-4 text-[11px] font-black text-emerald-500 text-right">{item.success}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
            <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">TOP 访问 IP (高频黑名单特征)</h3>
            <button className="text-[10px] font-bold text-rose-500">风险预警 <i className="fa-solid fa-shield-halved"></i></button>
          </div>
          <table className="w-full text-left">
            <thead className="bg-slate-50/50">
              <tr>
                <th className="px-6 py-3 text-[10px] font-black text-slate-400 uppercase">来源 IP</th>
                <th className="px-4 py-3 text-[10px] font-black text-slate-400 uppercase">地理/运营商</th>
                <th className="px-6 py-3 text-[10px] font-black text-slate-400 uppercase text-right">请求量</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {topIps.map((item, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 text-[11px] font-mono font-bold text-blue-600">{item.ip}</td>
                  <td className="px-4 py-4 text-[10px] font-bold text-slate-400">
                    {item.country} · {item.province} ({item.isp})
                  </td>
                  <td className="px-6 py-4 text-[11px] font-black text-slate-900 text-right">{item.pv}</td>
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
