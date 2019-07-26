import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
// import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/404'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  // document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in 下面上线时打开
  const hasToken = getToken()
  // const hasToken = 'ceshi-token'

  if (hasToken) {
    console.log('如果有token');
    // if (to.path === '/login') {
    //   // if is logged in, redirect to the home page
    //   next({ path: '/' })
    //   NProgress.done()
    // } else {
      
    // }

    // determine whether the user has obtained his permission roles through getInfo
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        console.log('如果有权限');
        next()
        NProgress.done()
      } else {
        try {
          console.log('如果没有权限');
          // get user info
          // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
          await store.dispatch('user/getRoles').then(() => {
            console.log('获取权限成功',store.getters.roles);
          }).catch(()=>{
            console.log('获取权限失败');
          })

          // generate accessible routes map based on roles
          const accessRoutes = await store.dispatch('permission/generateRoutes', store.getters.roles)
          console.log(accessRoutes,888);
          // dynamically add accessible routes
          router.addRoutes(accessRoutes)

          // hack method to ensure that addRoutes is complete
          // set the replace: true, so the navigation will not leave a history record
          next({ ...to, replace: true })
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
  } else {
    /* has no token*/
    console.log('如果没有token');
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      // next(`/login?redirect=${to.path}`)
      Message.error('sorry，登录失败，没有token');
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
