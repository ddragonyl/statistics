import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { RevenueData, UserDistribution } from '../types';

interface RevenueChartProps {
  data: RevenueData[];
}

export const RevenueChart: React.FC<RevenueChartProps> = ({ data }) => {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0070d2" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#0070d2" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorSubs" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4caf50" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#4caf50" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis 
            dataKey="date" 
            axisLine={false} 
            tickLine={false} 
            tick={{fill: '#64748b', fontSize: 12}} 
            dy={10}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{fill: '#64748b', fontSize: 12}} 
          />
          <Tooltip 
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          />
          <Area 
            type="monotone" 
            dataKey="courseSales" 
            name="课程销售"
            stroke="#0070d2" 
            fillOpacity={1} 
            fill="url(#colorSales)" 
            strokeWidth={2}
          />
          <Area 
            type="monotone" 
            dataKey="subscriptions" 
            name="会员订阅"
            stroke="#4caf50" 
            fillOpacity={1} 
            fill="url(#colorSubs)" 
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

interface DistributionChartProps {
  data: UserDistribution[];
}

export const DistributionChart: React.FC<DistributionChartProps> = ({ data }) => {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
            ))}
          </Pie>
          <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
          <Legend verticalAlign="bottom" height={36} iconType="circle" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
