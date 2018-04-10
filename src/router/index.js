import Vue from 'vue'
import Router from 'vue-router'




import MemberManage from '../components/memberManage.vue'
import menu from '../components/menu.vue'
import homepage from '../components/homePage.vue'
import arrangingCourses from '../courseManagement/arrangingCourses'

import fireClass from '../courseManagement/fireClass.vue'
import levelExamination from '../courseManagement/levelExamination.vue'
import blackBelt from '../courseManagement/blackBelt'
import login from '../loginAndRegister/login'
import Logon from '../loginAndRegister/Logon'
import personnelCount from '../personnelManagement/personnelCount.vue'
import Payroll from '../personnelManagement/Payroll.vue'
import AttendanceManagement from '../personnelManagement/AttendanceManagement.vue'
import postSetting from '../personnelManagement/postSetting.vue'
import fireClassTimeDetail from '../courseManagement/fireClassTimeDetail'
import fireClassStudentList from '../courseManagement/fireClassStudentList'
import activeMemberList from '../courseManagement/activeMemberList'
import dailySalesStatistics  from '../salesManagement/dailySalesStatistics'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/menu',
      component: menu,
      children: [
        {
          path: '/15',
          component: homepage,//首页
         // alias: '/homepage'
        },
        {
          path: '/16',
          component: MemberManage,//会员管理
          alise: '/MemberManage',
          // meta: { requiresAuth: true }

        },
        //销售管理
        {
          path: '/19',
          component: dailySalesStatistics,//会员管理
          alise: '/MemberManage',
          // meta: { requiresAuth: true }
        },

        //课程管理
        {
          path: '/23',
          component: arrangingCourses
        },//排课管理
        {
          path: '/24',
          component: fireClass,
        },//消课记录
        {
          path:'/activeMemberList',
          name:'activeMemberList',
          component:activeMemberList
        },
        {
          path:'/fireClassTimeDetail',
          name:'fireClassTimeDetail',
          component:fireClassTimeDetail,
        },
        {
          path:'/fireClassStudentList',
          name:'fireClassStudentList',
          component:fireClassStudentList,
        },
        {
          path: '/25',
          component: levelExamination
        },//考级之路
        {
          path: '/26',
          component: blackBelt
        },//黑带之路

        //人事管理
        {
          path: '/27',
          component: personnelCount
        },//人事统计
        {
          path: '/28',
          component: AttendanceManagement
        },//考勤管理
        {
          path: '/29',
          component: Payroll
        },//工资发放
        {
          path: '/30',
          component: postSetting
        },//岗位设置

      ]
    },//首页
    {
      path: '/',
      component: login
    },
    {
      path: '/Logon',
      component: Logon,
      meta: { requiresAuth: true }

    },
  ]
})
// export default new Router({
//   routes: [
//     {
//       path: '/',
//       component:duowei,
//     },
//     {
//       path:'/homepage',
//       menuName:'首页',
//       menuShow:true,
//       hasChild:false,
//     },
//     {
//       path:'/member',
//       menuName:'会员管理',
//       component:member,
//       menuShow:true,
//       hasChild:false,
//       children:[
//         {
//           path: '/homepage',
//           component: homepage,
//         }
//
//       ]
//     },
//     {
//       path:'/commodity',
//       menuName:'课程管理',
//       menuShow:true,
//       hasChild:true,
//       children:[
//         {
//           path:'commodityList',
//           menuName:'商品列表'
//         },
//         {
//           path:'commodityClass',
//           menuName:'商品分类',
//         },
//         {
//           path:'cityGroup',
//           menuName:'城市群'
//         },
//         {
//           path:'supplier',
//           menuName:'供应商'
//         },
//         {
//           path:'areaManage',
//           menuName:'专区管理'
//         }
//       ]
//     },
//     {
//       path:'/email',
//       menuName:'邮件',
//       menuShow:true,
//       hasChild:false,
//     },
//     {
//       path:'/system',
//       menuName:'系统管理',
//       menuShow:true,
//       hasChild:true,
//       children:[
//         {
//           path:'personInfo',
//           menuName:'个人资料'
//         },
//         {
//           path:'changePassword',
//           menuName:'修改密码'
//         },
//         {
//           path:'adminList',
//           menuName:'管理员列表'
//         },
//         {
//           path:'roleManage',
//           menuName:'角色管理'
//         },
//         {
//           path:'adminRecharge',
//           menuName:'管理员充值'
//         },
//         {
//           path:'rechargeHistory',
//           menuName:'充值记录'
//         }
//       ]
//     }
//   ]
// })
