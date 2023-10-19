import request from '@/utils/request'

const queryInfo = {
  query: '',
  pagenum: 1,
  pagesize: 10
}
export const getOrderList = async () => {
  await request.get('orders', {
    params: queryInfo
  })
}
