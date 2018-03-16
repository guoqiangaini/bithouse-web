'use strict'

import axios from 'axios'
import qs from 'qs'

axios.interceptors.request.use(config => {
  // loading
  return config
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
  return response
}, error => {
  return Promise.resolve(error.response)
})

function checkStatus (response) {
  // loading
  // 如果http状态码正常，则直接返回数据
  if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
    return response
    // 如果不需要除了data之外的数据，可以直接 return response.data
  }
  // 异常状态下，把错误信息返回去
  return {
    status: -404,
    msg: '网络异常'
  }
}

function checkCode (res) {
  // 如果code异常(这里已经包括网络错误，服务器错误，后端抛出的错误)，可以弹出一个错误提示，告诉用户
  if (res.status === -404) {

  }
  if (res.data && (!res.data.success)) {

  }
  return res
}

export default {
  post (data,mmethod,commit) {

    var b = qs.parse(data.jsonParam);
    b['regserial'] = '10001';
    b['permissions_id'] = '1';
    axios({
      method: 'post',
      baseURL: 'http://192.168.1.162:8080/dowinsysws/services/',
      url:data.methodUrl,
      data: b,
      timeout: 10000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json; charset=UTF-8'
      }
    }).then(
      (response) => {

        var data = {};
        data[mmethod] = response.data.data;
        console.log(response.data)
        console.log('------------25588--------------')
        console.log(data[mmethod])
        commit(mmethod, data)

      }
    ).then(
      (res) => {

       // return checkCode(res)
      }
    )
  }
  // ,
  // get (url, params) {
  //   return axios({
  //     method: 'get',
  //     baseURL: 'https://cnodejs.org/api/v1',
  //     url,
  //     params, // get 请求时带的参数
  //     timeout: 10000,
  //     headers: {
  //       'X-Requested-With': 'XMLHttpRequest'
  //     }
  //   }).then(
  //     (response) => {
  //       return checkStatus(response)
  //     }
  //   ).then(
  //     (res) => {
  //       return checkCode(res)
  //     }
  //   )
  // }
}
