import Vue from 'vue'//引入vue
import Vuex from 'vuex'//引入vuex

// 安装
Vue.use(Vuex)

// 初始化state
const state = {}

// mutations
const mutations = {}

// 创建store把state和mutation 写入Vuex.store中
const store = new Vuex.Store({
  state,
  mutations
})

export default store //导出store
