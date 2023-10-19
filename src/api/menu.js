import request from '@/utils/request'

export const getMenuListService = () => {
  return request.get('menus')
}
