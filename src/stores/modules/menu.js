import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useListMenuStore = defineStore(
  'listMenu',
  () => {
    const listMenu = ref([])
    return {
      listMenu
    }
  },
  {
    persist: true
  }
)
