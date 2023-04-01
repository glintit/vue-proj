<template>
  <div :class="classObj" class="app-wrapper">
    <div class="layout-head">
      <a href="javascript:;" class="logo"><img src="../assets/img/logo.png"/></a>
      <div class="right user-area">
        <a class="uname" href="javascript:;" @click="touc()">{{userInfo.username}}</a>
        <a class="logout" href="javascript:;" @click="logout()"></a>
      </div>
    </div>
    <sidebar v-if="!sidebar.hide" class="sidebar-container" />
    <div :class="{sidebarHide:sidebar.hide}" class="main-container">
      <div><breadcrumb id="breadcrumb-container" class="breadcrumb-container"/></div>
      <!-- <tags-view /> -->
      <app-main />
    </div>
  </div>
</template>

<script>
import { AppMain, Sidebar,TagsView } from './components';
import ResizeMixin from './mixin/ResizeHandler';
import { mapState } from 'vuex';
import Breadcrumb from '@/components/Breadcrumb';

export default {
  name: 'Layout',
  components: {
    Breadcrumb,
    AppMain,
    Sidebar,
    TagsView
  },
  mixins: [ResizeMixin],
  computed: {
    ...mapState({
      // sideTheme: state => state.settings.sideTheme,
      sidebar: state => state.app.sidebar,
      device: state => state.app.device
      // needTagsView: state => state.settings.tagsView
      // fixedHeader: state => state.settings.fixedHeader
    }),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  data() {
    return {
      userInfo: {}
    };
  },
  created(){
    this.userInfo=this.$store.state.menu.userInfo;
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    },
    touc(){
      this.$router.push('/userCenter');
    },
    logout(){
      this.$store.dispatch('user/logout').then(() => {
          location.href = '/index';
      });
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/assets/styles/mixin.scss";

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;

    &.mobile.openSidebar {
      position: fixed;
      top: 0;
    }
  }

  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

.layout-head {
  height: 70px;
  padding: 0 15px;
  background: url(../assets/img/head-bg.png) no-repeat;
  background-size: cover;
}
.layout-head > a.logo {
  line-height: 70px;
  font-size: 26px;
  color: #fff;
  font-weight: 600;
}
.layout-head > a.logo > img {
  height: 45px;
  margin-top: 13px;
  border: none;
}
.layout-head > .user-area {
  padding-top: 20px;
  line-height: 30px;
}
.layout-head > .user-area > a {
  display: block;
  float: left;
  height: 30px;
  color: #fff;
}
.layout-head > .user-area > a.logout {
  width: 30px;
  background: url(../assets/img/logout.png) no-repeat center;
  background-size: 22px;
}
.layout-head > .user-area > a + a {
  margin-left: 10px;
}
</style>
