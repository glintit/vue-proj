import request from '@/utils/request'


//获取所有菜单树
export function getMenuList (params){
  return request({
    url: '/edu/uc/menu/getMenuOptions',
    method: 'get',
    params:params
  })
}

//获取子菜单树
export function getSubMenuList (params){
  return request({
    url: '/edu/uc/menu/getSubMenuList',
    method: 'get',
    params:params
  })
}

//新增或修改菜单（含menu_id修改，不含id新增）
export function menuAdd (data){
  return request({
    url: '/edu/uc/menu/addMenu',
    method: 'post',
    data
  })
}

//删除
export function deleteById (menuId){
  console.log(menuId)
  return request({
    url: '/edu/uc/menu/'+menuId,
    method: 'post',
  })
}