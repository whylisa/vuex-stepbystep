// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

// 导入样式
import '@/assets/index.css'

// 导入store
import store from './store'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  // 将 Vuex（store） 和 Vue实例关联到一起
  store,
  components: { App },
  template: '<App/>'
})
