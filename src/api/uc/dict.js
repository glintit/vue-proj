import request from '@/utils/request';

//查询字典值列表
export function queryType (data){
    return request({
      url: '/edu/uc/sysEnumType/query',
      method: 'post',
      data
    })
}