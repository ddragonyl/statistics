
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import BusinessBoard from './components/BusinessBoard';
import InstructionalBoard from './components/InstructionalBoard';
import MarketingBoard from './components/MarketingBoard';
import PlatformBoard from './components/PlatformBoard';
import { DashboardType } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<DashboardType>(DashboardType.BUSINESS);

  const renderContent = () => {
    switch (activeTab) {
      case DashboardType.BUSINESS:
        return <BusinessBoard />;
      case DashboardType.INSTRUCTIONAL:
        return <InstructionalBoard />;
      case DashboardType.MARKETING:
        return <MarketingBoard />;
      case DashboardType.PLATFORM:
        return <PlatformBoard />;
      default:
        return <BusinessBoard />;
    }
  };

  const getTitle = () => {
    switch (activeTab) {
      case DashboardType.BUSINESS: return '经营看板';
      case DashboardType.INSTRUCTIONAL: return '教学效能';
      case DashboardType.MARKETING: return '营销转化';
      case DashboardType.PLATFORM: return '运维风控';
      default: return '棱镜数据监控平台';
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 ml-64 p-8">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">{getTitle()}</h1>
            <p className="text-slate-500 font-medium mt-1">
              {activeTab === DashboardType.BUSINESS && '实时监控机构生命线，掌控整体营收与经营健康度'}
              {activeTab === DashboardType.INSTRUCTIONAL && '全方位洞察教学质量与学情反馈，提升完课率'}
              {activeTab === DashboardType.MARKETING && '精准定位流量流失环节，提升工具效能与转化 ROI'}
              {activeTab === DashboardType.PLATFORM && '监控 SaaS 资源水位与并发峰值，守护平台底层安全'}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-lg border border-emerald-100">
               <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
               <span className="text-xs font-bold">系统运行正常</span>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all">
              生成全平台体验报告
            </button>
            <button className="bg-white p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-all relative">
              <i className="fa-regular fa-bell"></i>
              <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white"></span>
            </button>
          </div>
        </header>

        {renderContent()}

        <footer className="mt-16 py-8 border-t border-slate-200 text-center">
          <p className="text-slate-400 text-xs">
            © 2024 Prism PRM Platform | 棱镜数据决策系统 
            <span className="mx-2">|</span> 
            从看见到洞察，从洞察到决策
          </p>
        </footer>
      </main>
    </div>
  );
};

export default App;
