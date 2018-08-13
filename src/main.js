// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import qs from 'qs'
import VueAxios from 'vue-axios'
import store from './store'
import cookie from './utils/cookie'

// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import './ui/element-ui'
// 正式
axios.defaults.baseURL = 'http://www.wangchaozhen.com:8088/api'
// 测试
// axios.defaults.baseURL = 'http://127.0.0.1:8088/api'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

// axios 默认不带上cookie，如果需要设置如下参数
// axios.defaults.withCredentials = true

// axios.defaults.transformRequest = (data) => {
//   console.log(qs.stringify(data))
//   return qs.stringify(data)
// }
// axios 拦截器
axios.interceptors.request.use(function (config) {
  // 非注册，非登录，添加 token
  let isLogin = config.url.indexOf('/login') !== -1
  let isRegister = config.url.indexOf('/register') !== -1
  if (!isLogin && !isRegister) {
    // 如果请求不是来自login，请求添加 token
    let token = cookie.get('token')
    config.headers.Authorization = token
  }
  // 转为 urlencoded、encodeURI
  if (config.method.toLowerCase() === 'post' && !(config.data instanceof FormData)) {
    config.data = qs.stringify(config.data)
  }
  console.log('请求', config)
  return config
}, function (error) {
  // 对错误请求进行处理
  return Promise.reject(error)
})

// 添加一个响应拦截器
axios.interceptors.response.use(function (response) {
  // 预处理响应数据
  console.log('响应', response)
  if (response.data.tokenIsOutdated) {
    console.log('token过期，请重新登录')
    cookie.clear('token')
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
