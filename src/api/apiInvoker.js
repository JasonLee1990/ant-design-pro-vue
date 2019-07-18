import { axios } from '../utils/request'

const apiInvoker = {
  request(config) {
    return axios.request(config)
  },
  get(url, ) {
    {}
    return axios.get(url, config)
  },
  delete(url, config) {
    return axios.delete(url, config)
  },
  head(url, config) {
    return axios.head(url, config)
  },
  post(url, data, config) {
    return axios.post(url, data, config)
  },
  put(url, data, config) {
    return axios.put(url, data, config)
  },
  patch(url, data, config) {
    return axios.patch(url, data, config)
  },
}
export default apiInvoker
