
import React from 'react';
import { MetricCardData } from '../types';

const MetricCard: React.FC<MetricCardData> = ({ title, value, change, icon, color }) => {
  const isPositive = change >= 0;
  
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
          <i className={`fa-solid ${icon} text-white`}></i>
        </div>
        <div className={`flex items-center gap-1 text-xs font-bold ${isPositive ? 'text-emerald-500' : 'text-rose-500'}`}>
          <i className={`fa-solid ${isPositive ? 'fa-arrow-trend-up' : 'fa-arrow-trend-down'}`}></i>
          {Math.abs(change)}%
        </div>
      </div>
      <div>
        <p className="text-slate-500 text-sm font-medium">{title}</p>
        <h3 className="text-2xl font-bold text-slate-900 mt-1">{value}</h3>
      </div>
    </div>
  );
};

export default MetricCard;
