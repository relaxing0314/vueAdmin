import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueRouter from 'vue-router'
import store from './vuex/store'
import Vuex from 'vuex'

import routes from './routes'

import Mock from './mock'
Mock.bootstrap();
import 'font-awesome/css/font-awesome.min.css'
import {loginOvertime,addMinutes} from './common/js/util'

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Vuex)

const router = new VueRouter({
  routes
})
// 剪切插件
import VueClipboards from 'vue-clipboards'
Vue.use(VueClipboards)

import components from './components/'
Object.keys(components).forEach(key => {
  Vue.component(key, components[key])
})

router.beforeEach((to, from, next) => {
  let user = JSON.parse(localStorage.getItem('user'));
  if (to.path == '/login') {
    store.dispatch('clear_local');
  }else if(to.path == '/') {
    if(user){
      next({
        path: '/login'
      })
    }else{
      next({
        path: '/404'
      })
    }
  }
  if (!user && to.path != '/login') {
    store.dispatch('clear_local');
    next({
      path: '/login'
    })
  }else if(user && !loginOvertime(user.loginOut)){
    next({
      path: '/login'
    })
  } else {
    if(user){
      if(to.path != '/login' || from.path != '/'){
        const memberInfo = {...store.state.memberInfo,...{loginOut:addMinutes(new Date(),30)}};
        store.dispatch('update_local',{memberInfo});
      }
    }
    next()
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

