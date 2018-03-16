import Vue from 'vue'
import Router from 'vue-router'


import signIn from '../components/signIn.vue'
import shiyan from '../components/shiyan.vue'
import member from '../components/member.vue'
import personalList from '../components/personalList.vue'
import duowei from '../components/duowei.vue'
import homepage from '../components/homepage.vue'
import curriculum from '../components/curriculum.vue'
import people from '../components/people.vue'
import rowCourse from '../components/rowCourse.vue'
import gradeTest from '../components/gradeTest.vue'
import blackBelt from '../components/blackBelt'

Vue.use(Router)

export default new Router({
  routes: [


    {
      path:'/',
      component:duowei,
      children:[
        {
          path:'/1',
          component:homepage,//首页
          alias: '/homepage'
        },
        {
          path:'/16',
          component:member,//会员管理
          alise:'/member',
          children:[
            {
              path:'/personalList',
              component:personalList
            },
          ]
        },//课程管理
        {
          path:'/23',
          component:curriculum
        },//课程管理
        {
          path:'/people',
          component:people
        },//人事管理
        {
          path:'/24',
          component:rowCourse
        },
        {
          path:'/25',
          component:gradeTest
        },
        {
          path:'/26',
          component:blackBelt
        },

      ]
    },//首页
    {
      path:'shiyan',
      component:shiyan
    },
    {
      path:'/signIn',
      component:signIn
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
