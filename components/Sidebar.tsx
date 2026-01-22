
import React from 'react';
import { DashboardType } from '../types';

interface SidebarProps {
  activeTab: DashboardType;
  setActiveTab: (tab: DashboardType) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: DashboardType.BUSINESS, label: '经营看板', icon: 'fa-chart-line' },
    { id: DashboardType.TRTC, label: 'TRTC 消耗', icon: 'fa-tower-broadcast' },
    { id: DashboardType.INSTRUCTIONAL, label: '教学效能', icon: 'fa-graduation-cap' },
    { id: DashboardType.MARKETING, label: '营销转化', icon: 'fa-filter' },
    { id: DashboardType.PLATFORM, label: '运维风控', icon: 'fa-shield-halved' },
  ];

  return (
    <div className="w-64 bg-slate-900 h-screen fixed left-0 top-0 flex flex-col text-white shadow-xl z-50">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
          <i className="fa-solid fa-gem text-white"></i>
        </div>
        <span className="text-xl font-bold tracking-tight">棱镜 PRISM</span>
      </div>
      
      <nav className="flex-1 px-4 mt-4">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-2">主控台</p>
        <div className="space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                activeTab === item.id 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <i className={`fa-solid ${item.icon} w-5`}></i>
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center gap-3 p-2 bg-slate-800 rounded-lg">
          <div className="w-8 h-8 rounded-full bg-slate-600 flex items-center justify-center">
            <i className="fa-solid fa-user text-xs"></i>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold truncate">管理员</p>
            <p className="text-[10px] text-slate-400 truncate">SaaS 机构账号</p>
          </div>
          <i className="fa-solid fa-right-from-bracket text-slate-500 cursor-pointer hover:text-white"></i>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
