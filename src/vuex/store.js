import Vue from 'vue'
import Vuex from 'vuex'
// 引入 axios
import axios from 'axios'
import qs from 'qs'
import http from '../utils/http'

Vue.use(Vuex)

const store = new Vuex.Store({
  // 定义状态
  state: {
    //菜单
   menu:[
     {menuId:'1',
     menuName:'首页'
     },
     {menuId:'2',
       menuName:'会员管理'
     },

   ],
    //会员

    grades:[
        {
        number: '1',
        Fullname: '张继科',
        gender: '男',
        roadMuseum:'新桥',
        classes:'成人班',
        coach:'刘国梁',
        teacher:'孔令辉',
        level:'白黄带',
        rowcourse:'2018.03.08',

        fireClass:'120/次',

        states:'正常',
      },
    ],
  members:[
    {
    number: '1',
    Fullname: '张继科',
    gender: '男',
    coach:'刘国梁',
    teacher:'孔令辉',
    level:'白黄带',
    enrollTime:'2018.03.08',
    payTime:'2018.03.08',
    payMethod:'分段',
    renewTime:'2018.03.08',
    roadMuseum:'新桥',
    classes:'成人班',
    switches:'无',
    fireClass:'120/次',
    card:'年卡',
    states:'正常',
  },
    {
      number: '2',
      Fullname: '张怡宁',
      gender: '女',
      coach:'刘国梁',
      teacher:'孔令辉',
      level:'白黄带',
      enrollTime:'2018.03.08',
      payTime:'2018.03.08',
      payMethod:'一次性',
      renewTime:'2018.03.08',
      roadMuseum:'新桥',
      classes:'成人班',
      switches:'无',
      fireClass:'120/次',
      card:'年卡',
      states:'代缴费',
    },
    {
      number: '3',
      Fullname: '张怡宁',
      gender: '女',
      coach:'刘国梁',
      teacher:'孔令辉',
      level:'白黄带',
      enrollTime:'2018.03.08',
      payTime:'2018.03.08',
      payMethod:'一次性',
      renewTime:'2018.03.08',
      roadMuseum:'新桥',
      classes:'成人班',
      switches:'无',
      fireClass:'120/次',
      card:'年卡',
      states:'代缴费',
    },
    {
      number: '4',
      Fullname: '张怡宁',
      gender: '女',
      coach:'刘国梁',
      teacher:'孔令辉',
      level:'白黄带',
      enrollTime:'2018.03.08',
      payTime:'2018.03.08',
      payMethod:'一次性',
      renewTime:'2018.03.08',
      roadMuseum:'新桥',
      classes:'成人班',
      switches:'无',
      fireClass:'120/次',
      card:'年卡',
      states:'代缴费',
    },
    {
      number: '5',
      Fullname: '张怡宁',
      gender: '女',
      coach:'刘国梁',
      teacher:'孔令辉',
      level:'白黄带',
      enrollTime:'2018.03.08',
      payTime:'2018.03.08',
      payMethod:'一次性',
      renewTime:'2018.03.08',
      roadMuseum:'新桥',
      classes:'成人班',
      switches:'无',
      fireClass:'120/次',
      card:'年卡',
      states:'代缴费',
    },
    {
      number: '6',
      Fullname: '张怡宁',
      gender: '女',
      coach:'刘国梁',
      teacher:'孔令辉',
      level:'白黄带',
      enrollTime:'2018.03.08',
      payTime:'2018.03.08',
      payMethod:'一次性',
      renewTime:'2018.03.08',
      roadMuseum:'新桥',
      classes:'成人班',
      switches:'无',
      fireClass:'120/次',
      card:'年卡',
      states:'代缴费',
    },
    {
      number: '7',
      Fullname: '张怡宁',
      gender: '女',
      coach:'刘国梁',
      teacher:'孔令辉',
      level:'白黄带',
      enrollTime:'2018.03.08',
      payTime:'2018.03.08',
      payMethod:'一次性',
      renewTime:'2018.03.08',
      roadMuseum:'新桥',
      classes:'成人班',
      switches:'无',
      fireClass:'120/次',
      card:'年卡',
      states:'代缴费',
    },
    {
      number: '8',
      Fullname: '张怡宁',
      gender: '女',
      coach:'刘国梁',
      teacher:'孔令辉',
      level:'白黄带',
      enrollTime:'2018.03.08',
      payTime:'2018.03.08',
      payMethod:'一次性',
      renewTime:'2018.03.08',
      roadMuseum:'新桥',
      classes:'成人班',
      switches:'无',
      fireClass:'120/次',
      card:'年卡',
      states:'代缴费',
    },
    {
      number: '9',
      Fullname: '张怡宁',
      gender: '女',
      coach:'刘国梁',
      teacher:'孔令辉',
      level:'白黄带',
      enrollTime:'2018.03.08',
      payTime:'2018.03.08',
      payMethod:'一次性',
      renewTime:'2018.03.08',
      roadMuseum:'新桥',
      classes:'成人班',
      switches:'无',
      fireClass:'120/次',
      card:'年卡',
      states:'代缴费',
    },
    {
      number: '10',
      Fullname: '张怡宁',
      gender: '女',
      coach:'刘国梁',
      teacher:'孔令辉',
      level:'白黄带',
      enrollTime:'2018.03.08',
      payTime:'2018.03.08',
      payMethod:'一次性',
      renewTime:'2018.03.08',
      roadMuseum:'新桥',
      classes:'成人班',
      switches:'无',
      fireClass:'120/次',
      card:'年卡',
      states:'代缴费',
    }],
    //来源
    sources:[],
    //卡型
    cardType:[],
    //道馆
    rooms:[{
      value: '',
      label: ''
    }],
    //班级
    classes:[{
      value: '选项2',
      label: '招生活动'
    }],
    //教练
    coachs:[{
      value: '选项2',
      label: '招生活动'
    }],
    //老师
    teachers:[{
      value: '选项2',
      label: '招生活动'
    }],
    //级别
    levels:[{
      value: '选项2',
      label: '招生活动'
    }],
    //状态
    statuses:[{
      value: '选项2',
      label: '招生活动'
    }],
    //性别
    genders:[
      {
        value: '选项1',
        label: '男'
      },
      {
        value: '选项2',
        label: '女'
      }
    ],
    //课程
    courses:[],
    //报名时间
    times:[],

    //消课
    rows:[
      {
        number: '1',
        Fullname: '张继科',
       gender:'男',
        roadMuseum:'新桥',
        classes:'成人班',
        coach:'刘国梁',
        teacher:'孔令辉',
        level:'白黄带',
        rowcourse:'2018.03.08',

        fireClass:'120/次',

        states:'正常',
      },
      {
        number: '1',
        Fullname: '张继科',
        gender: '男',
        roadMuseum:'新桥',
        classes:'成人班',
        coach:'刘国梁',
        teacher:'孔令辉',
        level:'白黄带',
        rowcourse:'2018.03.08',

        fireClass:'120/次',

        states:'正常',
      },
      {
        number: '1',
        Fullname: '张继科',
        gender: '男',
        roadMuseum:'新桥',
        classes:'成人班',
        coach:'刘国梁',
        teacher:'孔令辉',
        level:'白黄带',
        rowcourse:'2018.03.08',

        fireClass:'120/次',

        states:'正常',
      },
      {
        number: '1',
        Fullname: '张继科',
        gender: '男',
        roadMuseum:'新桥',
        classes:'成人班',
        coach:'刘国梁',
        teacher:'孔令辉',
        level:'白黄带',
        rowcourse:'2018.03.08',

        fireClass:'120/次',

        states:'正常',
      },
      {
        number: '1',
        Fullname: '张继科',
        gender: '男',
        roadMuseum:'新桥',
        classes:'成人班',
        coach:'刘国梁',
        teacher:'孔令辉',
        level:'白黄带',
        rowcourse:'2018.03.08',

        fireClass:'120/次',

        states:'正常',
      },
    ],//消课表
  },
  actions:{
    //axios请求菜单数据
    sMenu :({ commit }) => {
      var data = {
        methodUrl: "adminMenu/getMenuList",
        jsonParam: ''
      };
      http.post(data,'selectMenu',commit);

    },
    //axios请求会员数据
    sMember :({ commit },postData) => {
      console.log(postData);
      var data = {
        methodUrl: "memberManagement/memberClickQuery",
        jsonParam: qs.stringify(postData)
      };
      http.post(data,'selectMember',commit);

    },
    //axios请求来源数据
    sSources:({ commit }) => {


      var data = {
        methodUrl: "memberManagement/memberSource",
        jsonParam: ''
      };
      http.post(data,'selectSource',commit);
      // http.post(data);
    },
    //axios请求卡型数据
    sCard:({ commit }) => {
      var data={
        methodUrl:"memberManagement/memberCard",
        jsonParam:"",
      };
      http.post(data,'selectCard',commit);
    },
    //axios请求道馆数据
    sRoom:({ commit }) => {
      var d = {};
      d['dep_lx'] = 1;
      var data={
        methodUrl:"memberManagement/memberClass",
        jsonParam:qs.stringify(d),
      };
      http.post(data,'selectRoom',commit);
    },
    //axios请求班级数据
    sClass:({ commit }) => {

      var d = {};
      d['dep_lx'] = 2;
      console.log(qs.stringify(d))
      var data={
        methodUrl:"memberManagement/memberClass",
        jsonParam:qs.stringify(d),
      };
      http.post(data,'selectClass',commit);
    },
    //axios请求教练数据
    sCoach:({ commit }) => {

      var d = {};
      d['department_serial'] = '';
      d['role_id']=103
      var data={
        methodUrl:"memberManagement/memberTeacher",
        jsonParam:qs.stringify(d),
      };
      http.post(data,'selectCoach',commit);
    },
    //axios请求老师数据
    sTeacher:({ commit }) => {
      var d = {};
      d['department_serial'] = '';
      d['role_id']=102
      var data={
        methodUrl:"memberManagement/memberTeacher",
        jsonParam:qs.stringify(d),
      };
      http.post(data,'selectTeacher',commit);
    },
    //axios请求级别数据
    sLevel:({ commit }) => {
      var data={
        methodUrl:"memberManagement/memberLevel",
        jsonParam:"",
      };
      http.post(data,'selectLevel',commit);
    },
    //axios请求状态数据
    sStatus:({ commit }) => {
      var data = {
        methodUrl: "memberManagement/memberState",
        jsonParam: ''
      };
      http.post(data,'selectStatus',commit);
    },
    // //axios请求课程数据
    // sCourse:({ commit }) => {
    //
    //   var data={
    //     methodUrl:"memberManagement/memberClass",
    //     jsonParam:"",
    //   };
    //   http.post(data);
    // },
  },
  mutations:{
    //将符合要求的数据存到全局菜单
    selectMenu:(state,{selectMenu})=>{

      state.menu=selectMenu;
    },
    //将符合要求的数据存到全局会员信息
    selectMember:(state,{selectMember})=>{

      state.members=selectMember;
    },
    //将符合要求的数据存到全局来源
    selectSource:(state,{selectSource})=>{
      state.sources=selectSource;
    },
    //将符合要求的数据存到全局卡类型
    selectCard:(state,{selectCard})=>{

      state.cardType=selectCard;
    },
    //将符合要求的数据存到全局道馆
    selectRoom:(state,{selectRoom})=>{

      state.rooms=selectRoom;
    },
    //将符合要求的数据存到全局班级
    selectClass:(state,{selectClass})=>{

      state.classes=selectClass;
    },
    //将符合要求的数据存到全局班级
    selectCoach:(state,{selectCoach})=>{

      state.coachs=selectCoach;
    },
    //将符合要求的数据存到全局老师
    selectTeacher:(state,{selectTeacher})=>{

      state.teachers=selectTeacher;
    },
    //将符合要求的数据存到全局级别
    selectLevel:(state,{selectLevel})=>{

      state.levels=selectLevel;
    },
    //将符合要求的数据存到全局状态
    selectStatus:(state,{selectStatus})=>{

      state.statuses=selectStatus;
    },
    //将符合要求的数据存到全局状态
    selectCourse:(state,{courseList})=>{

      state.courses=courseList;
    },
  },
  getters:{
  },
})

export default store
