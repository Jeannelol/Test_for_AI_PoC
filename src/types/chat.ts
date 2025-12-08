export interface Conversation {
  id: string;
  title: string;
  summary: string;
  time: string;
}

export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  time: string;
  status?: 'pending' | 'sent' | 'failed';
  scenarioKey?: string;
}

export interface Conversation {
  id: string;
  title: string;
  summary: string;
  time: string;
  updatedAt?: number;
}

export const DEFAULT_GREETING: Message = {
  id: '1',
  content: '您好！我是您的港股市场信息助手，有什么可以帮助您的吗？',
  sender: 'assistant',
  time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
};

export const DEFAULT_CONVERSATIONS: Conversation[] = [
  {
    id: '1',
    title: '恒生指数走势分析',
    summary: '讨论近期恒指波动原因及未来趋势预测',
    time: '2023-11-15 14:30',
    updatedAt: new Date('2023-11-15T14:30:00').getTime()
  },
  {
    id: '2',
    title: '腾讯控股财报解读',
    summary: '深度解析腾讯最新季度财务表现',
    time: '2023-11-14 10:15',
    updatedAt: new Date('2023-11-14T10:15:00').getTime()
  },
  {
    id: '3',
    title: '新能源板块机会',
    summary: '探讨港股新能源行业投资机遇',
    time: '2023-11-12 16:45',
    updatedAt: new Date('2023-11-12T16:45:00').getTime()
  },
  {
    id: '4',
    title: '美联储政策影响分析',
    summary: '分析美国货币政策对港股市场的影响',
    time: '2023-11-10 09:20',
    updatedAt: new Date('2023-11-10T09:20:00').getTime()
  }
];

export const TOPIC_CARDS = [
  { icon: 'fa-search', title: '选股票', description: '基于基本面和技术面筛选优质港股标的', example: '帮我筛选市值大于100亿的科技股' },
  { icon: 'fa-stethoscope', title: '诊股票', description: '深度诊断个股健康状况和发展潜力', example: '诊断腾讯控股的投资价值' },
  { icon: 'fa-globe-asia', title: '看宏观', description: '解读宏观经济对港股市场的影响', example: '分析美联储加息对港股的影响' },
  { icon: 'fa-chart-line', title: '看大势', description: '把握市场整体趋势和热点轮动', example: '预测恒生指数短期走势' },
  { icon: 'fa-newspaper', title: '读新闻', description: '获取最新港股资讯和深度解读', example: '今日港股重要新闻有哪些' },
  { icon: 'fa-database', title: '查数据', description: '查询个股财务数据和市场统计信息', example: '查询比亚迪近五年营收情况' }
];
