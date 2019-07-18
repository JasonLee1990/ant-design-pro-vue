import apiInvoker from './apiInvoker'

const endpoints = {
  login: '/pub/login',
  sendVerifyCode: '/pub/verifyCode',
  forgetPassword: '/pub/forgetPassword',
  logout: '/auth/logout',
  currentUser: '/auth/current'
}

/**
 * login func
 * data: {
 *     username: '',
 *     password: '',
 *     remember_me: true,
 *     login_type: 0,
 *     captcha: '12345'
 * }
 * @param data
 * @returns {*}
 */
const login = (data = {}) => {
  return apiInvoker.post(endpoints.login, data)
}

const sendVerifyCode = (data = {}) => {
  return apiInvoker.post(endpoints.sendVerifyCode, data)
}

const logout = (data = {}) => {
  return apiInvoker.post(endpoints.logout, data)
}

const currentUser = () => {
  return apiInvoker.get(endpoints.currentUser)
}

const forgetPassword = (data = {}) => {
  return apiInvoker.post(endpoints.forgetPassword, data)
}

const commonService = {
  login,
  sendVerifyCode,
  logout,
  currentUser,
  forgetPassword
}
export default commonService
