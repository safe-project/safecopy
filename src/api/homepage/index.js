import request from '@/utils/request'

export function getOrderList(page,limit) {
  return request({
    url: `/homepage/orderList/?page=${page}&limit=${limit}`,
    method: 'get'
  })
}