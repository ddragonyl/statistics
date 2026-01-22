
import React, { useEffect, useState } from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

// 实时延迟模拟数据
const latencyData = [
  { time: '14:00', api: 12, live: 45, load: 60 },
  { time: '14:05', api: 15, live: 42, load: 62 },
  { time: '14:10', api: 28, live: 120, load: 85 }, 
  { time: '14:15', api: 18, live: 55, load: 70 },
  { time: '14:20', api: 14, live: 48, load: 65 },
  { time: '14:25', api: 16, live: 50, load: 64 },
];

// 风险事件流
const riskEvents = [
  { id: 1, time: '14:32:10', type: 'FINANCE', msg: '博雅教育：短时集中退费 (25笔/1h)', level: 'danger', action: '提现锁定' },
  { id: 2, time: '14:30:45', type: 'OPS', msg: '华南 CDN 节点带宽触顶，启动弹性分流', level: 'warning', action: '自动调度' },
  { id: 3, time: '14:28:12', type: 'CONTENT', msg: '直播间 #8829 识别到疑似违规敏感词', level: 'warning', action: '人工介入' },
  { id: 4, time: '14:25:00', type: 'AUTH', msg: '账号 user_9921 异地高频登录 (北京/成都)', level: 'info', action: '日志标记' },
];

const PlatformBoard: React.FC = () => {
  const [pulse, setPulse] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => setPulse(p => !p), 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-[#0D1117] -m-8 p-8 min-h-screen text-slate-300 selection:bg-cyan-500/30">
      {/* 顶部 HUD 核心监控条 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {/* 全局状态球 */}
        <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-3xl relative overflow-hidden flex items-center gap-5">
          <div className="relative">
            <div className={`w-14 h-14 rounded-full flex items-center justify-center border transition-all duration-1000 ${pulse ? 'bg-emerald-500/20 border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.3)]' : 'bg-slate-800 border-slate-700'}`}>
              <div className="w-4 h-4 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]"></div>
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-slate-900 animate-ping"></div>
          </div>
          <div>
            <h3 className="text-xl font-black text-white tracking-tight">系统极佳</h3>
            <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">Global Status: Optimal</p>
          </div>
        </div>

        {/* 核心指标 1 */}
        <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-3xl">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">QPS 请求成功率</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl font-black text-white">99.99%</h3>
            <span className="text-[10px] text-emerald-500 font-bold">Stable</span>
          </div>
          <div className="w-full h-1 bg-slate-800 mt-4 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500" style={{ width: '99%' }}></div>
          </div>
        </div>

        {/* 核心指标 2 */}
        <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-3xl">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">今日拦截攻击</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl font-black text-white">1,402</h3>
            <span className="text-[10px] text-rose-500 font-bold">+12%</span>
          </div>
          <div className="flex gap-1 mt-4">
            {[1,1,1,1,1,1,0,0,0,0,0,0].map((v, i) => (
              <div key={i} className={`h-1 flex-1 rounded-full ${v ? 'bg-indigo-500' : 'bg-slate-800'}`}></div>
            ))}
          </div>
        </div>

        {/* 核心指标 3 */}
        <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-3xl">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">弹性资源负载</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl font-black text-cyan-400">62.4<span className="text-sm ml-0.5">%</span></h3>
            <span className="text-[10px] text-slate-500 font-bold">AutoScale Off</span>
          </div>
          <div className="w-full h-1 bg-slate-800 mt-4 rounded-full overflow-hidden">
            <div className="h-full bg-cyan-500" style={{ width: '62%' }}></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-slate-900/40 border border-slate-800 rounded-[2rem] p-8">
            <div className="flex justify-between items-center mb-10">
              <div>
                <h2 className="text-lg font-black text-white flex items-center gap-2">
                  <i className="fa-solid fa-tower-broadcast text-indigo-400"></i>
                  全链路延迟与质量热力图
                </h2>
                <p className="text-xs text-slate-500 mt-1">实时追踪登录、支付、直播间进入等核心 SLA 表现</p>
              </div>
              <div className="flex items-center gap-4 text-[10px] font-bold">
                 <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded bg-cyan-500"></span> API 延迟</span>
                 <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded bg-amber-500"></span> 直播卡顿</span>
              </div>
            </div>
            
            <div className="h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={latencyData}>
                  <defs>
                    <linearGradient id="colorApi" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                  <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#475569', fontSize: 11}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#475569', fontSize: 11}} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
                  />
                  <Area type="monotone" dataKey="api" stroke="#06b6d4" strokeWidth={3} fillOpacity={1} fill="url(#colorApi)" />
                  <Area type="monotone" dataKey="live" stroke="#f59e0b" strokeWidth={2} fill="transparent" strokeDasharray="4 4" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900/40 border border-slate-800 rounded-[2rem] p-8">
              <h3 className="text-sm font-black text-white uppercase tracking-widest mb-8 flex items-center gap-2">
                <i className="fa-solid fa-money-bill-transfer text-emerald-500"></i>
                财务资产安全监测
              </h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-[11px] font-bold mb-2.5">
                    <span className="text-slate-500">短时退费波动率</span>
                    <span className="text-emerald-400">0.42% (正常)</span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500" style={{ width: '42%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[11px] font-bold mb-2.5">
                    <span className="text-slate-500">大额提现风险暴露 (5w+)</span>
                    <span className="text-amber-500">中度预警</span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500" style={{ width: '75%' }}></div>
                  </div>
                </div>
                <div className="pt-4 mt-4 border-t border-slate-800/50 flex items-center justify-between">
                   <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                      <span className="text-xs font-bold text-slate-300">防机构跑路熔断机制已激活</span>
                   </div>
                   <button className="text-[10px] font-black text-indigo-400 hover:text-white uppercase">配置策略</button>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/40 border border-slate-800 rounded-[2rem] p-8 relative overflow-hidden group">
              <h3 className="text-sm font-black text-white uppercase tracking-widest mb-8 flex items-center gap-2">
                <i className="fa-solid fa-water text-cyan-500"></i>
                并发水位计 (Current Load)
              </h3>
              <div className="flex justify-center py-4">
                 <div className="relative w-36 h-36 rounded-full border-4 border-slate-800 flex items-center justify-center overflow-hidden">
                    <div 
                      className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-cyan-600 to-indigo-500 transition-all duration-[2000ms] ease-in-out" 
                      style={{ height: pulse ? '65%' : '60%' }}
                    >
                       <div className="absolute top-0 w-full h-4 bg-white/20 blur-md animate-pulse"></div>
                    </div>
                    <div className="relative z-10 text-center">
                       <span className="text-4xl font-black text-white drop-shadow-lg">64</span>
                       <span className="text-xs font-bold text-white/70 ml-0.5">%</span>
                    </div>
                 </div>
              </div>
              <div className="flex justify-between mt-6 text-[10px] font-mono text-slate-500">
                <span>0 UNIT</span>
                <span>MAX_CAP: 25,000</span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="bg-slate-900/40 border border-slate-800 rounded-[2rem] p-8 h-full flex flex-col min-h-[600px]">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-lg font-black text-white flex items-center gap-2">
                <i className="fa-solid fa-satellite text-rose-500"></i>
                风险与运维实时流
              </h2>
              <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></div>
            </div>
            
            <div className="flex-1 space-y-4 overflow-y-auto pr-2 custom-scrollbar">
              {riskEvents.map((event) => (
                <div key={event.id} className={`p-4 rounded-2xl border transition-all hover:bg-slate-800/40 ${
                  event.level === 'danger' ? 'bg-rose-500/5 border-rose-500/20' : 
                  event.level === 'warning' ? 'bg-amber-500/5 border-amber-500/20' : 
                  'bg-slate-800/20 border-slate-800'
                }`}>
                  <div className="flex justify-between items-center mb-2">
                    <span className={`text-[9px] font-black px-1.5 py-0.5 rounded uppercase ${
                      event.type === 'FINANCE' ? 'bg-emerald-500/20 text-emerald-500' :
                      event.type === 'OPS' ? 'bg-cyan-500/20 text-cyan-500' :
                      'bg-indigo-500/20 text-indigo-500'
                    }`}>
                      {event.type}
                    </span>
                    <span className="text-[9px] font-mono text-slate-600">{event.time}</span>
                  </div>
                  <p className="text-xs font-bold text-slate-200 leading-relaxed mb-3">{event.msg}</p>
                  <div className="flex justify-between items-center pt-3 border-t border-slate-800/50">
                    <span className={`text-[10px] font-black ${
                      event.level === 'danger' ? 'text-rose-500' : 
                      event.level === 'warning' ? 'text-amber-500' : 'text-slate-500'
                    }`}>
                      处置状态: {event.action}
                    </span>
                    <button className="text-[10px] font-black text-indigo-400 hover:text-white transition-colors">
                      查看溯源
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-8 border-t border-slate-800">
               <div className="bg-slate-950/50 p-5 rounded-2xl border border-white/5">
                  <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <i className="fa-solid fa-brain text-indigo-400"></i>
                    AI 内容巡检实时状态
                  </h4>
                  <div className="flex items-center gap-4">
                     <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden flex">
                        <div className="h-full bg-emerald-500 w-[92%]"></div>
                        <div className="h-full bg-rose-500 w-[8%]"></div>
                     </div>
                     <span className="text-xs font-mono text-emerald-500 font-black">92%</span>
                  </div>
                  <p className="text-[9px] text-slate-600 mt-3 leading-relaxed">
                    已巡检 2,480 场直播 / 自动禁言 12 人 / 内容合规率达标。
                  </p>
               </div>
               {/* 修改：移除了底部的“生成风险月报”按钮 */}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-between items-center px-4 pt-6 border-t border-slate-800/50">
        <div className="flex gap-10">
          <div className="flex flex-col">
            <span className="text-[9px] font-black text-slate-700 uppercase tracking-widest">Network Node</span>
            <span className="text-xs font-black text-emerald-500 uppercase">Secured</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] font-black text-slate-700 uppercase tracking-widest">Database Sync</span>
            <span className="text-xs font-black text-emerald-500 uppercase">Active</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] font-black text-slate-700 uppercase tracking-widest">Encryption</span>
            <span className="text-xs font-black text-indigo-500 uppercase">AES-256</span>
          </div>
        </div>
        <div className="text-[9px] font-mono text-slate-800 tracking-tighter">
          PRISM_KERNEL_X64 // COMMAND_CENTER_AUTH_OK // 2024.05.22
        </div>
      </div>
    </div>
  );
};

export default PlatformBoard;
