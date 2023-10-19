import axios from 'axios'
import { useUserStore } from '@/stores/index'
const baseURL = 'http://127.0.0.1:8888/api/private/v1/'
// import router from '@/router'

// 创建axios实例
const instance = axios.create({
  // TODO 1. 基础地址，超时时间
  baseURL,
  timeout: 10000
})

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // TODO 2. 携带token
    const useStore = useUserStore()
    if (useStore.token) {
      config.headers.Authorization = useStore.token
    }
    return config
  },
  (err) => Promise.reject(err)
)

// 响应拦截器
instance.interceptors.response.use((res) => {
  // TODO 4. 摘取核心响应数据
  if (res.data.meta.status === 200) {
    return res.data.data
  }
})

export default instance
export { baseURL }
