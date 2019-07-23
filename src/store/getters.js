const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  name: state => state.user.name,
  roles: state => state.user.roles,
  orderId1: state => state.user.orderId1,
  viewOrderId: state => state.order.viewOrderId,
  permission_routes: state => state.permission.routes,
}
export default getters
