import { getUserInfo } from '@/api/user'

const permission = {
  state: {
    userInfo: {}
  },
  mutations: {
    SET_MENUS: (state, menus) => {
      state.menus = menus
    },
    SET_USER_INFO: (state, userInfo) => {
      state.userInfo = userInfo
    }
  },
  actions: {
    getUserInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getUserInfo().then(res => {
          let userInfo = res.data;
          userInfo.extraAttrs.imgUrl =
            process.env.VUE_APP_BASE_API +
            '/edu/uc/getImg?id=' +
            userInfo.extraAttrs.avatar +
            '&dir=';
          commit('SET_USER_INFO', userInfo);
          resolve(userInfo)
        }).catch((e) => {
          reject(e)
        })
      }).catch((e) => {
      })
    },
    removeMenu({ commit }) {
        commit('SET_MENUS', []);
        commit('SET_USER_INFO', {});
    }

  }
}

export default permission