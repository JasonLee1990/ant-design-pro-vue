import apiInvoker from './apiInvoker'

const endpoints = {
  login: '/pub/login',
  sendVerifyCode: '/pub/verifyCode',
  logout: '/auth/logout',
  currentUser: '/auth/current'
}

/**
 * login func
 * parameter: {
 *     username: '',
 *     password: '',
 *     remember_me: true,
 *     captcha: '12345'
 * }
 * @param parameter
 * @returns {*}
 */
const login = (parameter = {}) => {
  return apiInvoker.post(endpoints.login, parameter)
}

const sendVerifyCode = (parameter = {}) => {
  return apiInvoker.sendVerifyCode(endpoints.sendVerifyCode, parameter)
}

const logout = (parameter = {}) => {
  return apiInvoker.post(endpoints.logout, parameter)
}

const currentUser = () => {
  return apiInvoker.get(endpoints.currentUser)
}

export default (commonService = {
  login,
  sendVerifyCode,
  logout,
  currentUser
})
