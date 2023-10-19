import { defineStore } from 'pinia'
import { getOrderList } from '../../api/order'

export const useOrderStore = defineStore('order', () => {
  const orderList = []
  const getList = () => {
    orderList.values = getOrderList()
  }
  return {
    getList
  }
})
