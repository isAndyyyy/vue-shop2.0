import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getUserListService } from '../../api/user'

export const useUserStore = defineStore(
  'User',
  () => {
    const token = ref('')
    // 设置token
    const setToken = (newValue) => {
      token.value = newValue
    }
    // 移除token
    const removeToken = () => {
      token.value = ''
    }

    const user = ref([])

    const getUser = async () => {
      const { data: res } = await getUserListService() //请求获取数据
      user.value = res.data.users
    }

    const setUser = (obj) => {
      user.value = obj
    }
    const removeUser = () => {
      user.value = ''
    }
    return {
      token,
      setToken,
      removeToken,
      user,
      getUser,
      setUser,
      removeUser
    }
  },
  {
    persist: true
  }
)
