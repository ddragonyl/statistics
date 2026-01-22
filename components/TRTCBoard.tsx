
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

// 画像模拟数据
const coursePreferenceData = [
  { name: '数学', value: 35, color: '#3b82f6' },
  { name: '英语', value: 25, color: '#ef4444' },
  { name: '物理', value: 15, color: '#10b981' },
  { name: '化学', value: 10, color: '#f59e0b' },
  { name: '生物', value: 10, color: '#8b5cf6' },
  { name: '其他', value: 5, color: '#cbd5e1' },
];

const classTypeData = [
  { name: '大班课', value: 45, color: '#3b82f6' },
  { name: '小班课', value: 35, color: '#ef4444' },
  { name: '一对一', value: 20, color: '#10b981' },
];

const teachingStyleData = [
  { name: '直播', value: 60, color: '#3b82f6' },
  { name: '点播', value: 25, color: '#ef4444' },
  { name: '混合', value: 15, color: '#10b981' },
];

const TRTCBoard: React.FC = () => {
  const [selectedOrg, setSelectedOrg] = useState('all');
  const [timeRange, setTimeRange] = useState('30days');
  const [showProfile, setShowProfile] = useState<string | null>(null);
  const [showDetail, setShowDetail] = useState<string | null>(null);
  const [dateRange] = useState({
    start: '2024年05月01日',
    end: '2024年05月22日'
  });

  const Modal = ({ title, onClose, children }: { title: string, onClose: () => void, children: React.ReactNode }) => (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-6xl max-h-[95vh] overflow-hidden flex flex-col border border-slate-100">
        <div className="px-8 py-6 border-b border-slate-50 flex justify-between items-center">
          <h3 className="text-xl font-black text-slate-800 flex items-center gap-3">
            {title}
          </h3>
          <button onClick={onClose} className="w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 transition-colors">
            <i className="fa-solid fa-xmark text-lg"></i>
          </button>
        </div>
        <div className="p-8 overflow-y-auto flex-1 bg-slate-50/30">{children}</div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8 pb-12">
      {/* 筛选控制条 */}
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

      {/* 1. 费用指标概览 */}
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

      {/* 2. 运营规模监测 */}
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

      {/* 3. 机构消耗明细清单 */}
      <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-50 flex justify-between items-center">
          <h3 className="text-lg font-black text-slate-900">机构消耗明细清单</h3>
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
                      统计信息
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
      </div>

      {/* 弹窗逻辑 - 统计信息 (原机构画像) */}
      {showProfile && (
        <Modal title={`👤 统计信息 - ${showProfile}`} onClose={() => setShowProfile(null)}>
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
             
             {/* 左侧列 */}
             <div className="space-y-6">
                {/* 机构活跃度 */}
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden">
                   <h4 className="text-sm font-bold text-slate-800 mb-6">机构活跃度</h4>
                   <div className="flex justify-between items-baseline mb-4">
                      <span className="text-xs font-medium text-slate-400 uppercase tracking-widest">活跃度评分</span>
                      <span className="text-2xl font-black text-slate-900">85<span className="text-sm text-slate-400">/100</span></span>
                   </div>
                   {/* 进度条 */}
                   <div className="relative h-2 bg-slate-100 rounded-full mb-2">
                      <div className="absolute top-0 left-0 h-full bg-blue-500 rounded-full" style={{ width: '85%' }}></div>
                   </div>
                   <div className="flex justify-between text-[10px] font-bold text-slate-400">
                      <span>低</span>
                      <span>中</span>
                      <span>高</span>
                   </div>
                   {/* 级别徽章 */}
                   <div className="absolute top-6 right-6 text-right">
                      <p className="text-4xl font-black text-slate-800 tracking-tighter">A级</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">机构等级</p>
                   </div>
                </div>

                {/* 课程类型偏好 */}
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                   <h4 className="text-sm font-bold text-slate-800 mb-6">课程类型偏好</h4>
                   <div className="h-64 flex flex-col items-center">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie 
                            data={coursePreferenceData} 
                            cx="50%" cy="50%" 
                            innerRadius={60} outerRadius={80} 
                            paddingAngle={5} 
                            dataKey="value" 
                            stroke="none"
                          >
                            {coursePreferenceData.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                      {/* 自定义 Legend */}
                      <div className="grid grid-cols-3 gap-y-3 gap-x-6 mt-4 w-full px-4">
                         {coursePreferenceData.map((item, idx) => (
                           <div key={idx} className="flex items-center gap-2">
                              <div className="w-4 h-2.5 rounded-sm" style={{ backgroundColor: item.color }}></div>
                              <span className="text-xs font-bold text-slate-500">{item.name}</span>
                           </div>
                         ))}
                      </div>
                   </div>
                </div>

                {/* 关键指标 */}
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                   <h4 className="text-sm font-bold text-slate-800 mb-6">关键指标</h4>
                   <div className="grid grid-cols-2 gap-4">
                      {[
                        { label: '月营业额', val: '¥156,800', valColor: 'text-slate-900' },
                        { label: '题库使用频率', val: '高', valColor: 'text-blue-600' },
                        { label: '活跃课程数', val: '24', valColor: 'text-slate-900' },
                        { label: '平均直播时长', val: '45分钟', valColor: 'text-slate-900' },
                      ].map((m, i) => (
                        <div key={i} className="bg-slate-50/50 p-4 rounded-xl border border-slate-100/50">
                           <p className="text-[10px] font-bold text-slate-400 uppercase mb-2 tracking-tight">{m.label}</p>
                           <p className={`text-xl font-black ${m.valColor}`}>{m.val}</p>
                        </div>
                      ))}
                   </div>
                </div>
             </div>

             {/* 右侧列 */}
             <div className="space-y-6">
                {/* 班型偏好 */}
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                   <h4 className="text-sm font-bold text-slate-800 mb-6">班型偏好</h4>
                   <div className="h-64 flex flex-col items-center">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie 
                            data={classTypeData} 
                            cx="50%" cy="50%" 
                            innerRadius={60} outerRadius={80} 
                            paddingAngle={5} 
                            dataKey="value" 
                            stroke="none"
                          >
                            {classTypeData.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                      <div className="flex justify-center gap-6 mt-4">
                         {classTypeData.map((item, idx) => (
                           <div key={idx} className="flex items-center gap-2">
                              <div className="w-4 h-2.5 rounded-sm" style={{ backgroundColor: item.color }}></div>
                              <span className="text-xs font-bold text-slate-500">{item.name}</span>
                           </div>
                         ))}
                      </div>
                   </div>
                </div>

                {/* 教学方式偏好 */}
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                   <h4 className="text-sm font-bold text-slate-800 mb-6">教学方式偏好</h4>
                   <div className="h-64 flex flex-col items-center">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie 
                            data={teachingStyleData} 
                            cx="50%" cy="50%" 
                            innerRadius={60} outerRadius={80} 
                            paddingAngle={5} 
                            dataKey="value" 
                            stroke="none"
                          >
                            {teachingStyleData.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                      <div className="flex justify-center gap-6 mt-4">
                         {teachingStyleData.map((item, idx) => (
                           <div key={idx} className="flex items-center gap-2">
                              <div className="w-4 h-2.5 rounded-sm" style={{ backgroundColor: item.color }}></div>
                              <span className="text-xs font-bold text-slate-500">{item.name}</span>
                           </div>
                         ))}
                      </div>
                   </div>
                </div>
             </div>
           </div>
        </Modal>
      )}

      {/* 弹窗逻辑 - 账单明细 */}
      {showDetail && (
        <Modal title={`📋 费用明细 - ${showDetail}`} onClose={() => setShowDetail(null)}>
           <div className="space-y-6">
             <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-slate-50/80">
                    <tr>
                      <th className="px-6 py-5 text-sm font-bold text-slate-800">课程名</th>
                      <th className="px-6 py-5 text-sm font-bold text-slate-800">课时名称</th>
                      <th className="px-6 py-5 text-sm font-bold text-slate-800">课时id</th>
                      <th className="px-6 py-5 text-sm font-bold text-slate-800">开始结束时间</th>
                      <th className="px-6 py-5 text-sm font-bold text-slate-800 text-center">在线人数</th>
                      <th className="px-6 py-5 text-sm font-bold text-slate-800 text-center">音视频(分钟)</th>
                      <th className="px-6 py-5 text-sm font-bold text-slate-800 text-center">快直播流量(M)</th>
                      <th className="px-6 py-5 text-sm font-bold text-slate-800 text-right">费用明细(元)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {[
                      {course: '数学基础', lesson: '第一章 实数', id: 'lesson_001', time: '2026-01-15 14:00-15:00', count: 45, av: 60, traffic: 1250, fee: '¥128.50'},
                      {course: '数学基础', lesson: '第二章 代数', id: 'lesson_002', time: '2026-01-16 14:00-15:00', count: 52, av: 60, traffic: 1320, fee: '¥135.80'},
                      {course: '数学基础', lesson: '第三章 几何', id: 'lesson_003', time: '2026-01-17 14:00-15:00', count: 48, av: 60, traffic: 1280, fee: '¥131.20'},
                    ].map((m, i) => (
                      <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-5 text-sm font-medium text-slate-700">{m.course}</td>
                        <td className="px-6 py-5 text-sm font-medium text-slate-600">{m.lesson}</td>
                        <td className="px-6 py-5 text-sm font-mono text-slate-500">{m.id}</td>
                        <td className="px-6 py-5 text-sm font-medium text-slate-500">{m.time}</td>
                        <td className="px-6 py-5 text-sm font-bold text-slate-700 text-center">{m.count}</td>
                        <td className="px-6 py-5 text-sm font-bold text-slate-700 text-center">{m.av}</td>
                        <td className="px-6 py-5 text-sm font-bold text-slate-700 text-center">{m.traffic}</td>
                        <td className="px-6 py-5 text-sm font-black text-slate-900 text-right">{m.fee}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
             </div>
             <p className="text-[10px] text-slate-400 italic font-medium ml-2">数据说明：上述明细由云端实时计费引擎生成，最终结算请以月结对账单为准。</p>
           </div>
        </Modal>
      )}
    </div>
  );
};

export default TRTCBoard;
