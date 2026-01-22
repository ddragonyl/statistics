
export enum DashboardType {
  BUSINESS = 'BUSINESS',
  INSTRUCTIONAL = 'INSTRUCTIONAL',
  MARKETING = 'MARKETING',
  PLATFORM = 'PLATFORM',
  TRTC = 'TRTC',
  USER_ANALYSIS = 'USER_ANALYSIS'
}

export interface MetricCardData {
  title: string;
  value: string;
  change: number;
  icon: string;
  color: string;
}

export interface FunnelData {
  name: string;
  value: number;
  fill: string;
}

export interface HeatmapPoint {
  time: number;
  intensity: number;
}
