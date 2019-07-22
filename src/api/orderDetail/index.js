import request from '@/utils/request'

export function getOrderDetail() {
  return request({
    url: '/orderDetail/orderDetail',
    method: 'get'
  })
}