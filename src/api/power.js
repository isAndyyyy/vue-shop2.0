import request from '@/utils/request'

export const getRightsListService = () => {
  return request.get('rights/list')
}
