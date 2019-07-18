import { axios } from '@/utils/request'

const apiInvoker = {
  request (config) {
    return axios.request(config)
  },
  get (url, params = {}) {
    const config = {
      params
    }
    return axios.get(url, config)
  },
  delete (url, params = {}) {
    const config = {
      params
    }
    return axios.delete(url, config)
  },
  head (url, config) {
    return axios.head(url, config)
  },
  post (url, data) {
    return axios.post(url, data)
  },
  put (url, data) {
    return axios.put(url, data)
  },
  patch (url, data) {
    return axios.patch(url, data)
  }
}
export default apiInvoker
