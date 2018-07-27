// import Vue from 'vue'
// import {
//   Loading
// } from 'element-ui'

// Vue.use(Loading)
// 引入axios
import axios from 'axios'

// const loadingOption = {
//   lock: true,
//   text: 'Loading',
//   spinner: 'el-icon-loading',
//   background: 'rgba(255,255,255,.9)'
// }

axios.default.timeout = 6000;
// 设置拦截器，拦截请求
axios.interceptors.request.use(function(config) {
  // Loading.service(loadingOption);
  return config;
},function (error){
  return Promise.reject(error);
})

// 设置拦截器，拦截响应
axios.interceptors.response.use(function(response) {
  // Loading.service(loadingOption).close()
  return response;
},function (error){
  return Promise.reject(error);
})
