import { login, logout, getRoles} from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const state = {
  token: getToken(),
  name: '',
  roles: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then((response) => {
        console.log('登录成功的response',response.data.data.data.token);

        // const { data } = response;
        commit('SET_TOKEN', response.data.data.data.token);
        commit('SET_NAME', username);
        setToken(response.data.data.data.token)

        // 登录成功之后，去获取对应的权限
      
        resolve()
      }).catch(error => {
        reject('Verification failed, please Login again.')
      })
    })
  },

  // get user roles
  getRoles({ commit, state }) {
    return new Promise((resolve, reject) => {
      getRoles(state.token).then(response => {
        const { data } = response

        if (!data) {
          reject('Verification failed, please Login again.')
        }
        console.log('返回来的roles',data.data.data.roles);
        const  roles = data.data.data.roles;
        // const { roles, name, avatar, introduction } = data
        // roles must be a non-empty array
        if (!roles || roles.length <= 0) {
          reject('getInfo: roles must be a non-null array!')
        }

        commit('SET_ROLES', roles)
        resolve(roles)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then((response) => {
        console.log('注销成功的response',response);
        commit('SET_TOKEN', '')
        commit('SET_ROLES', '')
        removeToken()
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

