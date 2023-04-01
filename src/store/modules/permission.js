import auth from '@/plugins/auth'
import router, { constantRoutes } from '@/router'
import { queryMenus } from '@/api/menu'
import Layout from '@/layout/index'
import ParentView from '@/components/ParentView'
import {parseMenu, toTree} from '@/utils/totree';

const permission = {
  state: {
    routes: [],
    addRoutes: [],
    defaultRoutes: [],
    topbarRouters: [],
    sidebarRouters: []
  },
  mutations: {
    SET_ROUTES: (state, routes) => {
      state.addRoutes = routes
      state.routes = constantRoutes.concat(routes)
    },
    SET_DEFAULT_ROUTES: (state, routes) => {
      state.defaultRoutes = constantRoutes.concat(routes)
    },
    SET_TOPBAR_ROUTES: (state, routes) => {
      state.topbarRouters = routes
    },
    SET_SIDEBAR_ROUTERS: (state, routes) => {
      state.sidebarRouters = routes
    },
  },
  actions: {
    // 生成路由
    GenerateRoutes({ commit }) {
      return new Promise(resolve => {
        // 向后端请求路由数据
        // queryMenus({clientId:'code_generation',optType:'0'}).then(res => {
        //   var buf=parseMenu(res.data);
        //   var data=toTree(buf);

          /* test data */
          var data=[
            {
              name:'DEMO',path:'/demo/index',meta:{title:'DEMO',icon:'eye-open'},
              alwaysShow:true,
              children:[
                {name:'按钮',path:'/demo/button',meta:{title:'按钮',icon:'button'}},
                {name:'列表',path:'/demo/list',meta:{title:'列表',icon:'list'}},
                {name:'对话框',path:'/demo/dialog',meta:{title:'对话框',icon:'form'}},
                {name:'选择框',path:'/demo/select',meta:{title:'选择框',icon:'select'}},
                {name:'表格',path:'/demo/table',meta:{title:'表格',icon:'table'}},
                {name:'echarts',path:'/demo/echarts',meta:{title:'echarts',icon:'chart'}},
                {name:'进度条',path:'/demo/progress',meta:{title:'进度条',icon:'list'}},
                {name:'图片预览',path:'/demo/image',meta:{title:'图片预览',icon:'icon'}}
              ]
            },
            {name:'addr',path:'http://www.baidu.com',meta:{title:'跳转',icon:'guide'}}
          ];
          // test end

          const sdata = JSON.parse(JSON.stringify(data))
          const rdata = JSON.parse(JSON.stringify(data))
          const sidebarRoutes = filterAsyncRouter(sdata)
          const rewriteRoutes = filterAsyncRouter(rdata, false, true)
          rewriteRoutes.push({ path: '*', redirect: '/404', hidden: true })
          commit('SET_ROUTES', rewriteRoutes)
          commit('SET_SIDEBAR_ROUTERS', constantRoutes.concat(sidebarRoutes))
          commit('SET_DEFAULT_ROUTES', sidebarRoutes)
          commit('SET_TOPBAR_ROUTES', sidebarRoutes)
          resolve(rewriteRoutes)
        // });


      })
    }
  }
}

// 遍历后台传来的路由字符串，转换为组件对象
function filterAsyncRouter(asyncRouterMap, lastRouter = false, type = false) {
  return asyncRouterMap.filter(route => {
    if (type && route.children) {
      route.children = filterChildren(route.children)
    }
    if (route.component) {
      // Layout ParentView 组件特殊处理
      if (route.component === 'Layout') {
        route.component = Layout
      } else if (route.component === 'ParentView') {
        route.component = ParentView
      } else {
        route.component = loadView(route.component)
      }
    }
    if (route.children != null && route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children, route, type)
    } else {
      delete route['children']
      delete route['redirect']
    }
    return true
  })
}

function filterChildren(childrenMap, lastRouter = false) {
  var children = []
  childrenMap.forEach((el, index) => {
    if (el.children && el.children.length) {
      if (el.component === 'ParentView' && !lastRouter) {
        el.children.forEach(c => {
          c.path = el.path + '/' + c.path
          if (c.children && c.children.length) {
            children = children.concat(filterChildren(c.children, c))
            return
          }
          children.push(c)
        })
        return
      }
    }
    if (lastRouter) {
      el.path = lastRouter.path + '/' + el.path
    }
    children = children.concat(el)
  })
  return children
}

// 动态路由遍历，验证是否具备权限
export function filterDynamicRoutes(routes) {
  const res = []
  routes.forEach(route => {
    if (route.permissions) {
      if (auth.hasPermiOr(route.permissions)) {
        res.push(route)
      }
    } else if (route.roles) {
      if (auth.hasRoleOr(route.roles)) {
        res.push(route)
      }
    }
  })
  return res
}

export const loadView = (view) => {
  if (process.env.NODE_ENV === 'development') {
    return (resolve) => require([`@/views/${view}`], resolve)
  } else {
    // 使用 import 实现生产环境的路由懒加载
    return () => import(`@/views/${view}`)
  }
}

export default permission
