import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
// import settings from './modules/settings'
import permission from './modules/permission'
import user from './modules/user'
import order from './modules/order'

Vue.use(Vuex)

const state = {
    vorderId:"lplp"
}
const mutations = {
  SET_VORDERID: (state,vorderId) => {
      state.vorderId = vorderId
  }
}
const actions = {
    setVorderId({ commit }, vorderId) {
        commit('SET_VORDERID', vorderId);
    }
}
const store = new Vuex.Store({
	state,
	mutations,
	actions,
  modules: {
    app,
    // settings,
    order,
    permission,
    user
  },
  getters
})

export default store
