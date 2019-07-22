import request from '@/utils/request'

export function getRiskOrderList() {
  return request({
    url: '/riskOrder/riskOrderList',
    method: 'get'
  })
}