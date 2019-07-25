import request from '@/utils/request'

export function getOrderDetail() {
  return request({
    url: '/orderDetail/orderDetail',
    method: 'get'
  })
}

export function dealRiskMessage() {
  return request({
    url: '/orderDetail/dealRiskMessage',
    method: 'get'
  })
}

export function removeRiskMessage() {
  return request({
    url: '/orderDetail/removeRiskMessage',
    method: 'get'
  })
}