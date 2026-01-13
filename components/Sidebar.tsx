import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Building2, 
  GraduationCap, 
  PieChart, 
  Settings, 
  LogOut 
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  return (
    <aside className="hidden md:flex flex-col w-64 bg-slate-900 text-white h-screen fixed left-0 top-0 border-r border-slate-800 z-20">
      <div className="p-6 flex items-center border-b border-slate-800">
        <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center mr-3 font-bold text-lg">E</div>
        <span className="font-semibold text-lg tracking-tight">教育云平台</span>
      </div>

      <nav className="flex-1 overflow-y-auto py-6">
        <div className="px-4 mb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">数据分析</div>
        <ul className="space-y-1 px-2 mb-8">
          <li>
            <a href="#" className="flex items-center px-4 py-3 bg-blue-600 text-white rounded-md shadow-lg shadow-blue-900/20">
              <LayoutDashboard className="w-5 h-5 mr-3" />
              概览
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center px-4 py-3 text-slate-300 hover:bg-slate-800 hover:text-white rounded-md transition-colors">
              <Building2 className="w-5 h-5 mr-3" />
              机构管理
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center px-4 py-3 text-slate-300 hover:bg-slate-800 hover:text-white rounded-md transition-colors">
              <GraduationCap className="w-5 h-5 mr-3" />
              师资管理
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center px-4 py-3 text-slate-300 hover:bg-slate-800 hover:text-white rounded-md transition-colors">
              <Users className="w-5 h-5 mr-3" />
              学员管理
            </a>
          </li>
        </ul>

        <div className="px-4 mb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">系统管理</div>
        <ul className="space-y-1 px-2">
          <li>
            <a href="#" className="flex items-center px-4 py-3 text-slate-300 hover:bg-slate-800 hover:text-white rounded-md transition-colors">
              <PieChart className="w-5 h-5 mr-3" />
              数据报表
            </a>
          </li>
           <li>
            <a href="#" className="flex items-center px-4 py-3 text-slate-300 hover:bg-slate-800 hover:text-white rounded-md transition-colors">
              <Settings className="w-5 h-5 mr-3" />
              平台设置
            </a>
          </li>
        </ul>
      </nav>

      <div className="p-4 border-t border-slate-800">
        <button className="flex items-center w-full px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors">
          <LogOut className="w-4 h-4 mr-3" />
          退出登录
        </button>
      </div>
    </aside>
  );
};
