import request from '@/utils/request'

export function getHistoryOrderList(orderId,driverPhone,driverId,driverIMEI,carNum,passengerPhone,passengerId,passengerIMEI,onAddress,offAddress,startTime,endTime,activeIdArr,page,limit) {
  return request({
    url: `/historyOrder/historyOrderList/?orderId=${orderId}$driverPhone=${driverPhone}&driverId=${driverId}&driverIMEI=${driverIMEI}&carNum=${carNum}&passengerPhone=${passengerPhone}&passengerId=${passengerId}&passengerIMEI=${passengerIMEI}&onAddress=${onAddress}&offAddress=${offAddress}&startTime=${startTime}&endTime=${endTime}&activeIdArr=${activeIdArr}&page=${page}&limit=${limit}`,
    method: 'get'
  })
}
