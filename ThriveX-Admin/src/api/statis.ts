import Request from '@/utils/request';

type StatisType = 'overview' | 'new-visitor' | 'basic-overview';

// overview(概览趋势), new-visitor(新访客趋势), basic-overview(基础概览趋势)
// 获取 PV量、IP量、跳出率、平均访问时长
export const getStatisAPI = (type: StatisType, startDate: string, endDate: string) => Request('GET', `/statis`, {
  params: {
    startDate,
    endDate,
    type
  },
})