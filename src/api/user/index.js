import request from '@/utils/request'

// export function login() {
//   return request({
//     url: '/login',
//     method: 'get'
//   })
// }

export function logout() {
  return request({
    url: '/logout',
    method: 'get'
  })
}


export function getRoles() {
  return request({
    url: '/roles',
    method: 'get'
  })
}