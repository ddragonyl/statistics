import { KPI, RevenueData, UserDistribution, Institution, Teacher } from '../types';

export const KPIS: KPI[] = [
  {
    id: 'total_revenue',
    label: '平台总收入',
    value: '5,230.5',
    change: 12.5,
    trend: 'up',
    prefix: '¥',
    suffix: '万'
  },
  {
    id: 'service_fee',
    label: '机构服务费收入',
    value: '1,840.2',
    change: 8.2,
    trend: 'up',
    prefix: '¥',
    suffix: '万'
  },
  {
    id: 'new_users',
    label: '新注册用户数',
    value: '8,432',
    change: 24.1,
    trend: 'up'
  },
  {
    id: 'points_revenue',
    label: '购买果能点收入',
    value: '85.6',
    change: -2.4,
    trend: 'down',
    prefix: '¥',
    suffix: '万'
  },
  {
    id: 'code_revenue',
    label: '购买兑换码收入',
    value: '42.8',
    change: 5.6,
    trend: 'up',
    prefix: '¥',
    suffix: '万'
  },
  {
    id: 'inst_gmv',
    label: '机构 GMV',
    value: '2.45',
    change: 15.3,
    trend: 'up',
    prefix: '¥',
    suffix: '亿'
  },
  {
    id: 'inst_orders',
    label: '机构成单量',
    value: '14.5',
    change: 11.2,
    trend: 'up',
    suffix: '万单'
  }
];

export const REVENUE_DATA: RevenueData[] = [
  { date: '周一', courseSales: 4000, subscriptions: 2400 },
  { date: '周二', courseSales: 3000, subscriptions: 1398 },
  { date: '周三', courseSales: 2000, subscriptions: 9800 },
  { date: '周四', courseSales: 2780, subscriptions: 3908 },
  { date: '周五', courseSales: 1890, subscriptions: 4800 },
  { date: '周六', courseSales: 2390, subscriptions: 3800 },
  { date: '周日', courseSales: 3490, subscriptions: 4300 },
];

export const CATEGORY_DISTRIBUTION: UserDistribution[] = [
  { name: 'K-12 学科教育', value: 45, color: '#0070d2' },
  { name: '职业技能培训', value: 25, color: '#4caf50' },
  { name: '语言学习', value: 20, color: '#ffb75d' },
  { name: '艺术与兴趣', value: 10, color: '#ff5388' },
];

export const TOP_INSTITUTIONS: Institution[] = [
  { id: '1', name: '环球科技学院', totalStudents: 15400, activeCourses: 45, revenue: 1250000, status: 'Active' },
  { id: '2', name: '未来少儿编程', totalStudents: 8200, activeCourses: 12, revenue: 840000, status: 'Active' },
  { id: '3', name: '大师设计工坊', totalStudents: 5600, activeCourses: 28, revenue: 620000, status: 'Onboarding' },
  { id: '4', name: '语言通达教育', totalStudents: 12000, activeCourses: 65, revenue: 450000, status: 'Active' },
  { id: '5', name: '数学天才训练营', totalStudents: 3200, activeCourses: 8, revenue: 120000, status: 'Churned' },
];

export const RECENT_TEACHERS: Teacher[] = [
  { id: 't1', name: '张晓梅', specialty: '数学', rating: 4.9, students: 1205 },
  { id: 't2', name: '李伟博士', specialty: '物理', rating: 4.8, students: 890 },
  { id: 't3', name: '王芳', specialty: '英语', rating: 5.0, students: 2100 },
];
