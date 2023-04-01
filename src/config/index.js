/**
 * 项目默认配置项
 * storageOptions: {} - Vue-ls 插件配置项 (localStorage/sessionStorage)
 *
 */
 export default {
    apiUrl: `${process.env.NODE_ENV !== 'production' ? process.env.VUE_APP_BASE_API : customConfig.vueAppBaseApi}`
  }
  