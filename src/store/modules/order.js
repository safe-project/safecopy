const state = {
    viewOrderId:"32"
}

const mutations = {
    SET_VIEWORDERID: (state,viewOrderId) => {
        state.viewOrderId = viewOrderId
    }
}

const actions = {
    setViewOrderId({ commit }, viewOrderId) {
        commit('SET_VIEWORDERID', viewOrderId);
    }
}

export default {
    state,
    mutations,
    actions
}

