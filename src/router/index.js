import Vue from 'vue'
import Router from 'vue-router'
import personnelManagement from '../personnelManagement/personnelManagement'
import menu from '../components/menu.vue'
import Login from '../loginAndRegister/Login'
import estateManagement from '../personnelManagement/estateManagement.vue'
import houseTypeInfo from '../courseManagement/houseTypeInfo'
import allTradedInfo  from '../salesManagement/allTradedInfo'
import serviceTradedInfo from '../salesManagement/serviceTradedInfo'
import tagsManagement from '../courseManagement/tagsManagement'
import bargain from '../components/bargain'
import initiatingPersonnel from '../components/initiatingPersonnel'
import participants from '../components/participants'
import myTemplate from '../components/myTemplate'
Vue.use(Router)
export default new Router({
  routes: [
    // 登陆管理
    {
      path: '/',
      component:Login,
    },
    //菜单管理
    {
      path: '/menu',
      component: menu,
      meta:{ requiresAuth: true },
      children: [
        //楼盘管理
        {
          path: '/15',
          component:estateManagement,
          meta: {requiresAuth: true}
        },
        //人员管理
        {
          path: '/16',
          component:personnelManagement,
          meta: {requiresAuth: true}

        },
        //管理员成交信息
        {
          path: '/17',
          component:allTradedInfo,
          meta: {requiresAuth: true}
        },
        //标签管理
        {
          path: '/18',
          component:tagsManagement,
          meta: {requiresAuth: true}
        },
        //客服成交信息
        {
          path: '/19',
          component:serviceTradedInfo,
          meta: { requiresAuth: true }
        },
        //户型信息
        {
          path: '/houseTypeInfo',
          name:'houseTypeInfo',
          component:houseTypeInfo,
          meta: { requiresAuth: true }
        },
        //砍价活动
        {
          path: '/20',
          component:bargain,
          meta: { requiresAuth: true }
        },
        //砍价活动
        {
          path: '/21',
          component:myTemplate,
          meta: { requiresAuth: true }
        },
        {
          path: '/initiatingPersonnel',
          name:'initiatingPersonnel',
          component:initiatingPersonnel,
          meta: { requiresAuth: true }
        },
        {
          path:'participants',
          name:'participants',
          component:participants,
          meta: { requiresAuth: true }
        }
      ]
    },
  ]
})
