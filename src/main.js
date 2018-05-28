// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import qs from 'qs'
import VueAxios from 'vue-axios'
import './ui/element-ui'
import store from './store'
import cookie from './utils/cookie'

// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

axios.defaults.baseURL = 'http://127.0.0.1/api'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
// axios.defaults.transformRequest = (data) => {
//   console.log(qs.stringify(data))
//   return qs.stringify(data)
// }
// axios 拦截器
axios.interceptors.request.use(function (config) {
  console.log(config.method)
  let isFromLogin = config.url.indexOf('/login') !== -1
  if (!isFromLogin) {
    // 如果请求不是来自login，请求添加 token
    let token = cookie.get('token')
    config.headers.Authorization = token
  }
  console.log(config)
  // 转为 urlencoded、encodeURI
  config.data = qs.stringify(config.data)
  console.log('拦截请求', config)
  return config
}, function (error) {
  // 对错误请求进行处理
  return Promise.reject(error)
})

// 添加一个响应拦截器
axios.interceptors.response.use(function (response) {
  // 预处理响应数据
  console.log('拦截响应', response)
  if (response.data.tokenIsOutdated) {
    console.log('token过期，请重新登录')
    cookie.clear('token')
    router.push({
      path: '/login'
    })
  }
  return response
}, function (error) {
  // 处理错误响应
  return Promise.reject(error)
})

Vue.use(VueAxios, axios)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
