import React from 'react';
import { Institution } from '../types';
import { MoreVertical } from 'lucide-react';

interface Props {
  institutions: Institution[];
}

export const TopInstitutions: React.FC<Props> = ({ institutions }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-slate-200">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">机构名称</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">状态</th>
            <th className="px-6 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">学员总数</th>
            <th className="px-6 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">活跃课程</th>
            <th className="px-6 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">营收</th>
            <th className="px-6 py-3 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider">操作</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-slate-100">
          {institutions.map((inst) => (
            <tr key={inst.id} className="hover:bg-slate-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-slate-900">{inst.name}</div>
                <div className="text-xs text-slate-500">ID: {inst.id}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                  ${inst.status === 'Active' ? 'bg-green-100 text-green-800' : 
                    inst.status === 'Onboarding' ? 'bg-blue-100 text-blue-800' : 
                    'bg-red-100 text-red-800'}`}>
                  {inst.status === 'Active' ? '活跃' : inst.status === 'Onboarding' ? '入驻中' : '流失'}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 text-right">
                {inst.totalStudents.toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 text-right">
                {inst.activeCourses}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900 text-right">
                ¥{inst.revenue.toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                <button className="text-slate-400 hover:text-slate-600">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
