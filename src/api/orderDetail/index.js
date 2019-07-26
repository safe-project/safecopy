import request from '@/utils/request'

export function getOrderDetail(orderID) {
  return request({
    url: `/orderDetail/orderDetail/?orderID=${orderID}`,
    method: 'get'
  })
}

export function dealRiskMessage(orderID,riskMessage) {
  return request({
    url: '/orderDetail/dealRiskMessage',
    method: 'post',
    data:{
      "orderID":orderID,
      "riskMessage":riskMessage
    }
  })
}

export function removeRiskMessage(orderID,riskMessage) {
  return request({
    url: '/orderDetail/removeRiskMessage',
    method: 'post',
    data:{
      "orderID":orderID,
      "riskMessage":riskMessage
    }
  })
}