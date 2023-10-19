import request from '@/utils/request'
import { ref } from 'vue'
const info = ref({ query: '', pagenum: 1, pagesize: 2 })

// 登录接口
export const userLoginService = ({ username, password }) => {
  return request.post('login', { username, password })
}

// 获取用户列表
export const getUserListService = () => {
  return request.get('users', { params: info.value })
}
