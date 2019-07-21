import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
// import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  // document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()

  if (hasToken) {
    console.log("如果有token");
    if (to.path === '/login') {
      console.log('如果有token--如果跳登录页，那就跳首页');
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      // 如有不是跳登录页面
      console.log('如果有token--不是跳登录页');
      const hasGetUserInfo = store.getters.name
      console.log('用户信息:',hasGetUserInfo);

      const hasRoles = store.getters.roles && store.getters.roles.length > 0;

      
      if (hasGetUserInfo) {
        console.log('如果有token--不是跳登录页--如果有用户name');
        next()
      } else {
        console.log('走的else');
        try {
          // get user info
          // await store.dispatch('user/getInfo')
          console.log('走了try');
          next()
        } catch (error) {
          console.log('走了catch');
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/
    console.log('如果没有token');
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      console.log('如果没有token--如果在白名单里');
      next()
    } else {
      console.log('如果没有token--并且不在白名单里');
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
