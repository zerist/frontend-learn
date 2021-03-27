import axios from 'axios'
//import qs from 'qs'
import config from "./config"

const service = axios.create(config)

service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  res => {
    return res.data
  },
  error => {
    return Promise.reject(error)
  }
)

export default service
