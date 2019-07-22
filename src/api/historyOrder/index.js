import request from '@/utils/request'

export function getHistoryOrderList() {
  return request({
    url: '/historyOrder/historyOrderList',
    method: 'get'
  })
}