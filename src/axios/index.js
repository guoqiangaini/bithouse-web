import axios from 'axios'
import qs from 'qs'
// axios 配置
axios.defaults.timeout = 5000;
// axios.defaults.headers.post['Content-Type'] = 'application/json; charset=UTF-8';
// axios.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.baseURL = 'https://bit.jpbvip.com/captainbitsysws/services/';
// axios.defaults.baseURL = 'http://192.168.199.228:8080/dowinsysws/services/';
//返回状态判断
axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  return Promise.reject(error);
});

export function fetch(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params)
      .then(response => {
        // console.log(response)
        if (response.status == 200) {
          resolve(response.data);
        }
      }, err => {
        reject(err);
        console.log(err)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
export function fetchImage(url, params, config) {
  return new Promise((resolve, reject) => {
    axios.post(url, params, config)
      .then(response => {
        if (response.status == 200) {
          resolve(response.data);
        }
      }, err => {
        reject(err);
        console.log(err)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export default {
  postRequest(params) {
    var methodParams = qs.parse(params.jsonParam);
    return fetch(params.methodUrl, methodParams)
  },
  postImageRequest(url, params, config) {
    return fetchImage(url, params, config)
  }
}
