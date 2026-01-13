import React from 'react';
import { KPI } from '../types';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface MetricCardProps {
  kpi: KPI;
}

export const MetricCard: React.FC<MetricCardProps> = ({ kpi }) => {
  return (
    <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wide">{kpi.label}</h3>
        <div className={`flex items-center text-xs font-semibold px-2 py-1 rounded-full ${
          kpi.trend === 'up' ? 'bg-green-50 text-green-700' : 
          kpi.trend === 'down' ? 'bg-red-50 text-red-700' : 'bg-slate-100 text-slate-600'
        }`}>
          {kpi.trend === 'up' && <TrendingUp className="w-3 h-3 mr-1" />}
          {kpi.trend === 'down' && <TrendingDown className="w-3 h-3 mr-1" />}
          {kpi.trend === 'neutral' && <Minus className="w-3 h-3 mr-1" />}
          {Math.abs(kpi.change)}%
        </div>
      </div>
      <div className="flex items-baseline">
        <span className="text-2xl font-bold text-slate-900">
          {kpi.prefix}{kpi.value}{kpi.suffix}
        </span>
      </div>
      <p className="text-xs text-slate-400 mt-2">vs. previous period</p>
    </div>
  );
};
