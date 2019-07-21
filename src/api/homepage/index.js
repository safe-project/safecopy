import request from '@/utils/request'

export function getOrderList() {
  return request({
    url: '/homepage/orderList',
    method: 'get'
  })
}