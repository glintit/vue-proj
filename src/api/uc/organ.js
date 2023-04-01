
import request from '@/utils/request'

//组织类型维护获取查询组织类型(分页)
export function  getNodeData (params){
    return request({
      url: '/edu/uc/organType/query',
      method: 'get',
      params:params
    })
  }

  // 组织类型维护保存组织类型（新增/更新）
  export function  getadd (data){
    return request({
      url: '/edu/uc/organType/save',
      method: 'post',
      data
    })
  }

  //组织类型维护查看
  export function eduOrgan (organType){
    return request({
      url: '/edu/uc/organType/'+ organType,
      method: 'get',
    })
  }
  //组织类型维护组织类型编码重复校验
  export function checkOrgan (data){
    return request({
      url: '/edu/uc/organType/checkOrganTypeCode',
      method: 'post',
      data
    })
  }
  //组织类型维护名称校验
  export function checkOrganName (data){
    return request({
      url: '/edu/uc/organType/checkOrganTypeName',
      method: 'post',
      data
    })
  }
  //组织类型维护删除
  export function eduDelete (organType){
    return request({
      url: '/edu/uc/organType/'+ organType,
      method: 'post',
    })
  }

  //组织类型维护批量删除类型
  export function allDelete (data){
    return request({
      url: '/edu/uc/organType/deleteAll',
      method: 'post',
      data
    })
  }

//组织维护保存组织节点(新增和修改)
export function  addOrgan (data){
  return request({
    url: '/edu/uc/organ/save',
    method: 'post',
    data
  })
}
//组织维护保存组织节点(修改)
export function  updateJgmc (data){
  return request({
    url: '/edu/basedata/edmEdugis/updateJgmc',
    method: 'post',
    data
  })
}

//组织维护删除组织节点
export function orgenDelete (data){
  return request({
    url: '/edu/uc/organ/delete',
    method: 'post',
    data
  })
}

//组织维护查询组织信息
export function getStruOrgan (params){
  return request({
    url: '/edu/uc/organ/getStruOrgan',
    method: 'get',
    params:params
  })
}

//查询组织变更历史信息
export function getorganhis(params){
  return request({
    url: '/edu/uc/organhis/queryModifyHis',
    method: 'get',
    params:params
  })
}


//查询具体组织变更历史
export function getHisById(organId,page,pageSize){
  return request({
    url: '/edu/uc/organhis/queryModifyHisById?organId=' + organId+'&page='+page+'&pageSize='+pageSize,
    method: 'get',
  })
}


//所属组织变更
export function getChange (data){
  return request({
    url: '/edu/uc/organ/changeOrganOwner',
    method: 'post',
    data
  })
}

//查询组织类型
export function getSelect(params){
  return request({
    url: '/edu/uc/organhis/queryOrganTypeDownList' ,
    method: 'get',
    params:params
  })
}


//组织编码校验
export function check(data){
  return request({
    url: '/edu/uc/organ/checkOrganCode' ,
    method: 'post',
    data
  })
}

//撤销组织
export function cancelOrgan(data){
  return request({
    url: '/edu/uc/organ/updateInUse' ,
    method: 'post',
    data
  })
}
/* 年级模块。。。 */
/* 1，分页查询年级列表 */
export function queryXxNjxxList(params){
  return request({
    url: '/edu/uc/njxx/queryXxNjxxList' ,
    method: 'get',
    params:params
  })
}
/* 2，查询年级数据    */
export function  getNj(params){
  return request({
    url: '/edu/uc/njxx/getNj' ,
    method: 'get',
    params:params
  })
}
/* 3，保存年级即添加年级。。。，，， */
export function saveXxNjxx(data){
  return request({
    url: '/edu/uc/njxx/saveXxNjxx' ,
    method: 'post',
    data
  })
}
/* 4，单个删除年级。。。。。 */
export function delXxnjInfo(data){
  return request({
    url: '/edu/uc/njxx/delXxnjInfo',
    method: 'post',
    data
  })
}
/* 5，查询学段和年级数据。。。。。 */
export function  getJyjd(params){
  return request({
    url: '/edu/uc/njxx/getJyjd' ,
    method: 'get',
    params:params
  })
}
/* 6,年级名称查重,,,, */
export function  checkNjmc(data){
  return request({
    url: '/edu/uc/njxx/checkNjmc',
    method: 'post',
    data
  })
}
//年级管理-指定年级主任信息
export function appointNjzr (data){
  return request({
    url: '/edu/uc/njxx/appointNjzr',
    method: 'post',
    data
  })
}
/* 7,,,, */


/*  年级模块。。。 */


// 获取年级列表
export function getNjListOption(data){
  return request({
    url: '/edu/uc/njxx/queryNjxx' ,
    method: 'get',
    params:data
  })
}
// 获取班级列表
export function getClassList(data){
  return request({
    url: '/edu/uc/bjxx/queryXxBjxxList' ,
    method: 'get',
    params:data
  })
}
// 获取最大班号
export function getClassMax(data){
  return request({
    url: '/edu/uc/bjxx/getBjbhMax' ,
    method: 'get',
    params:data
  })
}
// 班级名称查重
export function checkBj(data){
  return request({
    url: '/edu/uc/bjxx/checkBjxx' ,
    method: 'post',
    data
  })
}
// 保存班级
export function saveClass(data){
  return request({
    url: '/edu/uc/bjxx/saveXxBjxx' ,
    method: 'post',
    data
  })
}
// 删除班级
export function deleteClass(data){
  return request({
    url: '/edu/uc/bjxx/deleteXxBjxxById' ,
    method: 'post',
    data
  })
}
/* 批量添加班级。。。。。 */
export function batchSaveXxBjxx(data){
  return request({
    url: '/edu/uc/bjxx/batchSaveXxBjxx' ,
    method: 'post',
    data
  })
}
//批量删除
export function batchDeleteBjxx(data){
  return request({
    url: '/edu/uc/bjxx/batchDeleteBjxx' ,
    method: 'post',
    data
  })
}
//班级管理-检索某个学校所有教师列表（分页）
export function queryJsList (params){
  return request({
    url: '/edu/uc/bjxx/queryJsList',
    method: 'get',
    params:params
  })
}
//班级管理-指定班主任信息
export function appointBzr (data){
  return request({
    url: '/edu/uc/bjxx/appointBzr',
    method: 'post',
    data
  })
}

//组织标签管理列表(分页)
export function getLable (params){
  return request({
    url: '/edu/uc/organ/query',
    method: 'get',
    params:params
  })
}
//组织标签详情
export function getOrganById (params){
  return request({
    url: '/edu/uc/organHsf/getOrganById',
    method: 'get',
    params:params
  })
}
//标签-列表查询
export function queryEduLabelJbxxList (data){
  return request({
    url: '/edu/uc/label/queryEduLabelJbxxList',
    method: 'post',
    data
  })
}
//选择标签列表
export function queryLabelTypeAndLabels (data){
  return request({
    url: '/edu/uc/labelType/queryLabelTypeAndLabels',
    method: 'post',
    data
  })
}
//标签保存
export function saveBatch (data){
  return request({
    url: '/edu/uc/ucOrganLabel/saveBatch',
    method: 'post',
    data
  })
}
//标签删除
export function deleteEduLabelJbxx (params){
  return request({
    url: '/edu/uc/label/deleteEduLabelJbxx',
    method: 'get',
    params:params
  })
}
//组织标签关联-删除
export function deleteOrganLabel (data){
  return request({
    url: '/edu/uc/ucOrganLabel/delete',
    method: 'post',
    data
  })
}
//标签类型列表
export function queryEduLabelTypeList (data){
  return request({
    url: '/edu/uc/labelType/queryEduLabelTypeList',
    method: 'post',
    data
  })
}
//标签类型-新增或更新标签类型
export function saveOrUpdateEduLabelType (data){
  return request({
    url: '/edu/uc/labelType/saveOrUpdateEduLabelType',
    method: 'post',
    data
  })
}
//标签类型-标签类型详情
export function queryEduLabelType (params){
  return request({
    url: '/edu/uc/labelType/queryEduLabelType',
    method: 'get',
    params:params
  })
}
//标签类型-删除标签类型
export function deleteEduLabelType (params){
  return request({
    url: '/edu/uc/labelType/deleteEduLabelType',
    method: 'get',
    params:params
  })
}
//标签-添加/删除标签
export function saveOrUpdateEduLabelJbxx (data){
  return request({
    url: '/edu/uc/label/saveOrUpdateEduLabelJbxx',
    method: 'post',
    data
  })
}
//标签-详情查询
export function queryEduLabelJbxx (params){
  return request({
    url: '/edu/uc/label/queryEduLabelJbxx',
    method: 'get',
    params:params
  })
}
//标签-查询标签类型领域
export function queryAllLabelTypeDoma (params){
  return request({
    url: '/edu/uc/labelType/queryAllLabelTypeDoma',
    method: 'get',
    params:params
  })
}


//查询机构下所有教师和管理员
export function queryJsAndGlList (params){
  return request({
    url: '/edu/uc/bjxx/queryJsAndGlList',
    method: 'get',
    params:params
  })
}
// 保存指定负责人
export function appointZw (data){
  return request({
    url: '/edu/uc/duty/appointZw',
    method: 'post',
    data
  })
}

//查询用户职务列表
export function queryUserDutyList (params){
  return request({
    url: '/edu/uc/duty/queryUserDutyList',
    method: 'get',
    params:params
  })
}

// 删除指定负责人
export function cancelZw (data){
  return request({
    url: '/edu/uc/duty/cancelZw',
    method: 'post',
    data
  })
}
//根据组织机构id和组织机构名称查询组织机构信息
export function queryEdmEdugis (params){
  return request({
    url: '/edu/basedata/edmEdugis/queryEdmEdugis',
    method: 'get',
    params:params
  })
}
//保存学校信息
export function saveGisOrgan (data){
  return request({
    url: '/edu/basedata/edmEdugis/saveGisOrgan',
    method: 'post',
    data
  })
}
//删除学校信息
export function delGisOrgan (data){
  return request({
    url: '/edu/basedata/edmEdugis/delGisOrgan',
    method: 'post',
    data
  })
}
export function judgeLatlng (params){
  return request({
    url: '/edu/basedata/edmEdugis/judgeLatlng',
    method: 'get',
    params:params
  })
}

// 数据字典
export function getByType (params){
  return request({
    url: '/edu/uc/sysEnumValue/getByType',
    method: 'get',
    params:params
  })
}
//以下是专业管理

// 查询专业列表
export function getMajor (params){
  return request({
    url: '/edu/uc/xxZyxx/queryZyxxList',
    method: 'get',
    params:params
  })
}

//保存专业信息
export function saveMajor (data){
  return request({
    url: '/edu/uc/xxZyxx/saveZyxx',
    method: 'post',
    data
  })
}

//删除专业信息
export function delMajorInfo(data){
  return request({
    url: '/edu/uc/xxZyxx/delZyxx',
    method: 'post',
    data
  })
}
