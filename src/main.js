// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Vuex from 'vuex'
import store from './vuex/store'
import axios from './axios'
import VueContextMenu from 'vue-contextmenu'
import 'vue-contextmenu/style/css/font-awesome.min.css'
import contentmenu from 'v-contextmenu'
import 'v-contextmenu/dist/index.css'
import utils from './utils/http'
import echarts from 'echarts'

Vue.prototype.$echarts = echarts
Vue.use(contentmenu)
Vue.prototype.$utils=utils
Vue.use(VueContextMenu)
Vue.prototype.$axios = axios
Vue.use(Vuex)
Vue.config.productionTip = false
Vue.use(ElementUI)
/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'

})
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // 如果路由配置了元数据requiresAuth为true，则需要鉴权，这是需要判断是否登录
    // 如果没有登录则跳转到login页面
    if (!auth.loggedIn()) {
      next({
        path: '/login',
        //这里传递fullPath，是为了登录之后作为return back
        query: { redirect: to.fullPath }
      })
    } else {
      //如果已经登录过，直接执行进入下一步
      next()
    }
  } else {
    //对没有配置requiresAuth的路由进行处理，如果不加入，则路由未配置requiresAuth，无法进入，所以确保一定要调用 next()
    next()
  }
})
