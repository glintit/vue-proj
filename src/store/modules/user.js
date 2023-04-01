import { login, logout, getInfo, loginIphone } from '@/api/user'
import { getToken, setToken, removeToken, setRefreshToken } from '@/utils/auth'
import router from '@/router'
import { Message } from 'element-ui'
import store from '@/store'
import { getUserInfo, getUserMenu } from '@/api/user'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: [],
  loginAttempts: 0,
  preStatus: '11',
  curStatus: '11',
  errorCount: 0,
  preUsername: '',
  curUsername: '',
  tempStatus: '',
  menuType: '',
  // ext
  menus: [],
  elements: undefined,
  permissionMenus: undefined,
  welcome: '',
  authorities: [],
  info: {}
}
const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_LOGINATTEMPTS: (state, loginAttempts) => {
    state.loginAttempts = loginAttempts
  },
  SET_PRESTATUS: (state, preStatus) => {
    state.preStatus = preStatus
  },
  SET_CURSTATUS: (state, curStatus) => {
    state.curStatus = curStatus
  },
  SET_ERRORCOUNT: (state, errorCount) => {
    state.errorCount = errorCount
  },
  SET_PREUSERNAME: (state, preUsername) => {
    state.preUsername = preUsername
  },
  SET_CURUSERNAME: (state, curUsername) => {
    state.curUsername = curUsername
  },
  SET_TEMPSTATUS: (state, tempStatus) => {
    state.tempStatus = tempStatus
  },
  SET_MENUTYPE: (state, menuType) => {
    state.menuType = menuType
  },
  SET_AUTHORITIES: (state, authorities) => {
    state.authorities = authorities
  },
  SET_ELEMENTS: (state, elements) => {
    state.elements = elements
  },
  SET_PERMISSION_MENUS: (state, permissionMenus) => {
    state.permissionMenus = permissionMenus
  },
  SET_INFO: (state, info) => {
    state.info = info
  }
}

const actions = {
  // user login
  async login({ commit }, userInfo) {
    const username = userInfo.username
    commit('SET_CURUSERNAME', username)
    if (store.state.user.curUsername !== store.state.user.preUsername) {
      commit('SET_ERRORCOUNT', 0)
    }
    return new Promise((resolve, reject) => {
      login(userInfo).then(response => {
        commit('SET_ERRORCOUNT', 0)
        const token = response.data.access_token
        commit('SET_TOKEN', token)
        commit('SET_NAME', username)
        setToken(token)
        setRefreshToken(response.data.refresh_token)
        resolve()
      }).catch(error => {
        // let message = error.messages
        // if (error.response.code === 400) {
        //   message = error.response.data.error_description
        //   if (message === 'Bad credentials') {
        //     message = i18n.t('login.passwordError')
        //   }
        //   commit('SET_ERRORCOUNT', store.state.user.errorCount + 1)
        // }
        // if (error.response.code === 401) {
        //   message = i18n.t('login.passwordError')
        // }
        reject(error)
      })
    })
  },

  async loginIphone({ commit }, userInfo) {
    console.log(userInfo)
    const username = userInfo.j_username
    commit('SET_CURUSERNAME', username)
    if (store.state.user.curUsername !== store.state.user.preUsername) {
      console.log(0)
      commit('SET_ERRORCOUNT', 0)
    }
    return new Promise((resolve, reject) => {
      loginIphone(userInfo).then(response => {
        console.log(response);
        commit('SET_ERRORCOUNT', 0)
        const token = response.data.access_token
        commit('SET_TOKEN', token)
        commit('SET_NAME', username)
        setToken(token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    // debugger;
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        commit('SET_MENUTYPE', response.tokenAttributes.menu_type)
        const data = response
        data.roles = ['admin']
        data.introduction = 'I am a super administrator'
        data.avatar = 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'

        if (!data) {
          reject('Verification failed, please Login again.')
        }

        const { roles, name, avatar, introduction } = data

        // roles must be a non-empty array
        if (!roles || roles.length <= 0) {
          reject('getInfo: roles must be a non-null array!')
        }

        commit('SET_ROLES', roles)
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        commit('SET_INTRODUCTION', introduction)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }, redirectUri) {
    // return new Promise((resolve, reject) => {
    //   logout(redirectUri).then(() => {
    //     commit('SET_TOKEN', '')
    //     commit('SET_ROLES', [])
    //     removeToken()
    //     resetRouter()
    //     resolve()
    //   }).catch(error => {
    //     reject(error)
    //   })
    // })
    commit('SET_TOKEN', '')
    commit('SET_ROLES', [])
    removeToken()
    // resetRouter()
    // resolve()
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  changeRoles({ commit, dispatch }, role) {
    return new Promise(async resolve => {
      const token = role + '-token'

      commit('SET_TOKEN', token)
      setToken(token)

      const { roles } = await dispatch('getInfo')

      // resetRouter()

      // generate accessible routes map based on roles
      const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })

      // dynamically add accessible routes
      router.addRoutes(accessRoutes)

      // reset visited views and cached views
      dispatch('tagsView/delAllViews', null, { root: true })

      resolve()
    })
  },
  saveAuditLog({ commit, state }, auditLog) {

  },
  // get user info
  GetInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getUserInfo().then(response => {
        const menuTypeId = response.data.menuTypeId
        if (!menuTypeId) {
          reject('菜单类型获取失败')
        }
        commit('SET_MENUTYPE', menuTypeId)

        const data = response.data
        data.roles = ['admin']
        data.introduction = 'I am a super administrator'
        data.avatar = 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
        // console.log(data)

        if (!data) {
          reject('Verification failed, please Login again.')
        }
        // debugger
        const { roles, userName, avatar, introduction } = data

        // roles must be a non-empty array
        if (!roles || roles.length <= 0) {
          reject('getInfo: roles must be a non-null array!')
        }

        commit('SET_ROLES', roles)
        commit('SET_NAME', userName)
        commit('SET_AVATAR', avatar)
        commit('SET_INTRODUCTION', introduction)

        const result = response.data
        const access = []
        if (result.authorities) {
          result.authorities.map(item => {
            if (item.authority) {
              access.push(item.authority)
            }
          })
        }
        // commit('SET_AVATAR', result.avatar)
        commit('SET_AVATAR', '/avatar.jpg')
        // commit('SET_NAME', { name: result.nickName, welcome: welcome() })
        // commit('SET_NAME', { name: result.userName, welcome: "welcome todo" })

        // 转换权限
        commit('SET_AUTHORITIES', access)
        commit('SET_INFO', result)

        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
