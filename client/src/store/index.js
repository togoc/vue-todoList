import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const state = {
    user: {},
    todoList: []
}
const getters = {
    user: state => state.user,
    todoList: state => state.todoList
}
const mutations = {
    ["todoList"](state, data) {
        state.todoList = data
    },
    ["user"](state, data) {
        state.user = data
    }
}
const actions = {
    getList({ commit }, data) {
        commit("todoList", data)
    },
    getUser({ commit }, data) {
        commit("user", data)
    }
}

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})