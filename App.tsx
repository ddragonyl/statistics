import React from 'react';
import { Sidebar } from './components/Sidebar';
import { MetricCard } from './components/MetricCard';
import { RevenueChart, DistributionChart } from './components/Charts';
import { TopInstitutions } from './components/TopInstitutions';
import { AiInsightPanel } from './components/AiInsightPanel';
import { KPIS, REVENUE_DATA, CATEGORY_DISTRIBUTION, TOP_INSTITUTIONS } from './services/mockData';
import { Search, Bell, HelpCircle, ChevronDown } from 'lucide-react';

const App: React.FC = () => {
  return (
    <div className="flex h-screen bg-slate-50">
      {/* Navigation */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 md:ml-64 flex flex-col h-screen overflow-hidden">
        
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex justify-between items-center px-8 z-10">
          <div className="flex items-center flex-1">
             <div className="relative w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input 
                  type="text" 
                  placeholder="搜索机构、教师或报表..." 
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
             </div>
          </div>
          
          <div className="flex items-center space-x-4">
             <button className="text-slate-500 hover:text-blue-600 transition-colors">
                <HelpCircle className="w-5 h-5" />
             </button>
             <button className="text-slate-500 hover:text-blue-600 transition-colors relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
             </button>
             <div className="h-8 w-px bg-slate-200 mx-2"></div>
             <div className="flex items-center cursor-pointer group">
                <img 
                  src="https://picsum.photos/32/32" 
                  alt="Admin User" 
                  className="w-8 h-8 rounded-full border border-slate-200"
                />
                <div className="ml-3 hidden lg:block">
                   <p className="text-sm font-medium text-slate-800 group-hover:text-blue-600">Alex Morgan</p>
                   <p className="text-xs text-slate-500">超级管理员</p>
                </div>
                <ChevronDown className="w-4 h-4 text-slate-400 ml-2" />
             </div>
          </div>
        </header>

        {/* Dashboard Content - Scrollable */}
        <div className="flex-1 overflow-y-auto p-8">
          
          <div className="max-w-7xl mx-auto">
             <div className="flex justify-between items-end mb-8">
                <div>
                   <h1 className="text-2xl font-bold text-slate-900">数据概览</h1>
                   <p className="text-slate-500 mt-1">实时统计数据 • 2024年11月14日</p>
                </div>
                <div className="flex space-x-2">
                   <select className="bg-white border border-slate-300 text-slate-700 text-sm rounded-md px-3 py-2 outline-none focus:border-blue-500">
                      <option>最近7天</option>
                      <option>最近30天</option>
                      <option>本季度</option>
                   </select>
                   <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-md shadow-sm transition-colors">
                      导出报表
                   </button>
                </div>
             </div>

             {/* AI Section */}
             <AiInsightPanel />

             {/* KPIs Grid - Adjusted for 7 items */}
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {KPIS.map((kpi) => (
                  <MetricCard key={kpi.id} kpi={kpi} />
                ))}
             </div>

             {/* Charts Row */}
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                {/* Revenue Chart (Takes up 2/3) */}
                <div className="lg:col-span-2 bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
                   <div className="flex justify-between items-center mb-6">
                      <h2 className="text-lg font-bold text-slate-800">营收趋势</h2>
                      <div className="flex items-center space-x-4">
                         <div className="flex items-center">
                            <span className="w-3 h-3 rounded-full bg-blue-600 mr-2"></span>
                            <span className="text-xs text-slate-500">课程销售</span>
                         </div>
                         <div className="flex items-center">
                            <span className="w-3 h-3 rounded-full bg-green-500 mr-2"></span>
                            <span className="text-xs text-slate-500">会员订阅</span>
                         </div>
                      </div>
                   </div>
                   <RevenueChart data={REVENUE_DATA} />
                </div>

                {/* Distribution Chart (Takes up 1/3) */}
                <div className="lg:col-span-1 bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
                   <h2 className="text-lg font-bold text-slate-800 mb-6">课程类目占比</h2>
                   <DistributionChart data={CATEGORY_DISTRIBUTION} />
                </div>
             </div>

             {/* Top Institutions Table */}
             <div className="bg-white rounded-lg border border-slate-200 shadow-sm mb-8">
                <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center">
                   <h2 className="text-lg font-bold text-slate-800">优质合作机构</h2>
                   <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-800">查看全部</a>
                </div>
                <TopInstitutions institutions={TOP_INSTITUTIONS} />
             </div>

             {/* Footer */}
             <footer className="border-t border-slate-200 pt-6 flex justify-between items-center text-sm text-slate-500">
                <p>&copy; 2024 教育云平台 (EdTech Pro). 保留所有权利.</p>
                <div className="flex space-x-4">
                   <a href="#" className="hover:text-slate-800">隐私政策</a>
                   <a href="#" className="hover:text-slate-800">服务条款</a>
                </div>
             </footer>

          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
