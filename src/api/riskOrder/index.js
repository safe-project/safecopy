import request from '@/utils/request'

export function getRiskOrderList(id,page,limit) {
  return request({
    url: `/riskOrder/riskOrderList/?id=${id}&page=${page}&limit=${limit}`,
    method: 'get'
  })
}