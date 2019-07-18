import Vue from 'vue'
import axios from 'axios'
import store from '@/store'
import notification from 'ant-design-vue/es/notification'
import { VueAxios } from './axios'
import { ACCESS_TOKEN } from '@/store/mutation-types'

// 创建 axios 实例
const service = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL, // api base_url
  timeout: 6000 // 请求超时时间
})

service.defaults.headers = {
  'Content-Type': 'application/json;charset=UTF-8'
}
service.defaults.crossDomain = true
service.defaults.withCredentials = true

const logoutHandler = () => {
  store.dispatch('Logout').then(() => {
    setTimeout(() => {
      window.location.reload()
    }, 1500)
  })
}

const errorMessage = (title = 'Error', content = '') => {
  notification.error({
    message: title,
    description: content
  })
}

const errorHandler = error => {
  if (error.response) {
    const data = error.response.data
    const token = Vue.ls.get(ACCESS_TOKEN)
    if (error.response.status === 403) {
      errorMessage('Forbidden', data.message)
    }
    if (error.response.status === 401 && !(data.result && data.result.isLogin)) {
      errorMessage('Unauthorized', 'Authorization verification failed')
      if (token) {
        logoutHandler()
      }
    }
  }
  return Promise.reject(error)
}

// request interceptor
service.interceptors.request.use(config => {
  // rewrite url
  if (config.url.includes('${')) {
    if (['POST', 'PUT'].includes(config.method.toUpperCase()) && config.data) {
      Object.keys(config.data).forEach((key, i) => {
        config.url = config.url.replace('${' + key + '}', config.data[key])
      })
    } else if (['DELETE', 'GET'].includes(config.method.toUpperCase()) && config.params) {
      Object.keys(config.params).forEach((key, i) => {
        config.url = config.url.replace('${' + key + '}', config.params[key])
      })
    }
  }

  const token = Vue.ls.get(ACCESS_TOKEN)
  if (token) {
    config.headers['Authorization'] = token // 让每个请求携带自定义 token 请根据实际情况自行修改
  }
  return config
}, errorHandler)

// response interceptor
service.interceptors.response.use(response => {
  const code = response.data.code
  if (code !== 'SUCCESS') {
    errorMessage(response.data.message)
    if (code === 'USER_UNSIGNED_ERROR') {
      logoutHandler()
    }
    return Promise.reject(response)
  }
  return response.data.data
}, errorHandler)

const installer = {
  vm: {},
  install (Vue) {
    Vue.use(VueAxios, service)
  }
}

export { installer as VueAxios, service as axios }
