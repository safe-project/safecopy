import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404/index'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/homepage',
    children: [{
      path: 'homepage',
      name: 'Homepage',
      component: () => import('@/views/homepage/index'),
      meta: { title: '首页', icon: 'el-icon-document' }
    }]
  },
  //   {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/table',
  //   name: 'Example',
  //   meta: { title: 'Example', icon: 'el-icon-time' },
  //   children: [
  //     {
  //       path: 'table',
  //       name: 'Table',
  //       component: () => import('@/views/table/index'),
  //       meta: { title: 'Table', icon: 'el-icon-bell',roles: ['120'] }
  //     },
  //     {
  //       path: 'tree',
  //       name: 'Tree',
  //       component: () => import('@/views/tree/index'),
  //       meta: { title: 'Tree', icon: 'el-icon-service',roles: ['120'] }
  //     }
  //   ]
  // }
]


export const asyncRoutes = [
{
    path: '/riskorder',
    component: Layout,

    children: [
      {
        path: 'index',
        name: 'Riskorder',
        component: () => import('@/views/riskorder/index'),
        meta: { title: '风险订单预警', icon: 'el-icon-warning',roles: ['120']  }
      }
    ]
  },
  {
    path: '/historyorder',
    component: Layout,
    redirect: '/historyorder/index',
    children: [
      {
        path: 'index',
        name: 'Historyorder',
        component: () => import('@/views/historyorder/index'),
        meta: { title: '历史订单查询', icon: 'el-icon-time',roles: ['130'] }
      },
      // {
      //   path: 'detail',
      //   name: 'Deatil',
      //   component: () => import('@/views/detail/index'),
      //   // hidden: true,
      //   meta: { title: '订单详情', icon: 'el-icon-success',roles: ['130'] }
      // }
    ]
  },
  {
    path: '/orderDetail',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Deatil',
        component: () => import('@/views/detail/index'),
        meta: { title: '订单详情', icon: 'el-icon-success',roles: ['130'] }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]


const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router


