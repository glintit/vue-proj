export function parseMenu(list){
    // var buf=[];
    for(var i=0,size=list.length;i<size;i++){
        var d=list[i];
        if(!d.path){
            d.path='/'+i;
        }
        if(!d.parentId){
            d.alwaysShow=true;
        }
        d.meta={
            title:d.menuName,
            icon:d.icon
        }
    }
    return list;
}

export function toTree(array){
    var optStrict = false;
    var optKey = 'menuId';
    var optParentKey = 'parentId';
    var optChildren = 'children';
    var optMapChildren = 'children';
    var result = []
    var treeMap = {}
    var idList, id, treeData, parentId;
  
    idList = map(array, function (item) {
      return item[optKey]
    });

    // console.log(idList);
  
    each(array, function (item) {
        // console.log(item);
      id = item[optKey];
      treeData = item;
  
      parentId = item[optParentKey]
      treeMap[id] = treeMap[id] || []
      treeMap[parentId] = treeMap[parentId] || []
      treeMap[parentId].push(treeData)
      treeData[optKey] = id
      treeData[optParentKey] = parentId
      treeData[optChildren] = treeMap[id]
      if (optMapChildren) {
        treeData[optMapChildren] = treeMap[id]
      }
  
      if (!optStrict || (optStrict && !parentId)) {
        if (!includes(idList, parentId)) {
          result.push(treeData)
        }
      }
    });

    return result;
}

function each(obj, iterate, context) {
    if (obj) {
      return (arrayEach)(obj, iterate, context);
    }
    return obj;
}

function map(obj, iterate, context) {
    var result = []
    if (obj && arguments.length > 1) {
      if (obj.map) {
        return obj.map(iterate, context)
      } else {
        each(obj, function () {
          result.push(iterate.apply(context, arguments))
        })
      }
    }
    return result
}

function arrayEach(list, iterate, context) {
    if (list) {
      if (list.forEach) {
        list.forEach(iterate, context)
      } else {
        for (var index = 0, len = list.length; index < len; index++) {
          iterate.call(context, list[index], index, list)
        }
      }
    }
}

function includes(obj, val) {
    if (obj) {
      if (obj.includes) {
        return obj.includes(val)
      }
      for (var key in obj) {
        if (hasOwnProp(obj, key)) {
          if (val === obj[key]) {
            return true
          }
        }
      }
    }
    return false;
}

function hasOwnProp(obj, key) {
    return obj && obj.hasOwnProperty ? obj.hasOwnProperty(key) : false
}
