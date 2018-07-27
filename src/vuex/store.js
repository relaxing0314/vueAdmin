import Vue from 'vue'
import Vuex from 'vuex'

import  mutations from './mutations'
import actions from './actions'
import * as getters from './getters'
import state from './state'

Vue.use(Vuex)
const isDev = process.env.NODE_ENV === "development"

// 创建 store 实例
export default new Vuex.Store({
  strict:isDev,
  state,
  mutations,
  actions,
  getters,

})
