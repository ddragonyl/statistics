// Time range options for filtering
export enum TimeRange {
  WEEK = 'Last 7 Days',
  MONTH = 'Last 30 Days',
  QUARTER = 'Last Quarter',
  YEAR = 'Year to Date'
}

// Key Performance Indicators
export interface KPI {
  id: string;
  label: string;
  value: string | number;
  change: number; // percentage
  trend: 'up' | 'down' | 'neutral';
  prefix?: string;
  suffix?: string;
}

// Chart Data Types
export interface RevenueData {
  date: string;
  courseSales: number;
  subscriptions: number;
  [key: string]: any;
}

export interface UserDistribution {
  name: string;
  value: number;
  color: string;
  [key: string]: any;
}

// Entity Types
export interface Institution {
  id: string;
  name: string;
  totalStudents: number;
  activeCourses: number;
  revenue: number;
  status: 'Active' | 'Onboarding' | 'Churned';
}

export interface Teacher {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  students: number;
}