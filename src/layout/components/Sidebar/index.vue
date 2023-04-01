<template>
    <div>
        <div class="menu-title"><span v-show="sidebar.opened">功能菜单</span><i @click="toggleSideBar"></i></div>
        <el-scrollbar :class="settings.sideTheme" wrap-class="scrollbar-wrapper">
            <el-menu
                :default-active="activeMenu"
                :collapse="isCollapse"
                :text-color="'#333'"
                :unique-opened="true"
                :active-text-color="settings.theme"
                :collapse-transition="false"
                mode="vertical">
                <sidebar-item
                    v-for="(route, index) in sidebarRouters"
                    :key="route.path  + index"
                    :item="route"
                    :base-path="route.path"/>
            </el-menu>
        </el-scrollbar>
    </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import SidebarItem from "./SidebarItem";
import variables from "@/assets/styles/variables.scss";

export default {
    components: { SidebarItem },
    computed: {
        ...mapState(["settings"]),
        ...mapGetters(["sidebarRouters", "sidebar"]),
        activeMenu() {
            const route = this.$route;
            const { meta, path } = route;
            // if set path, the sidebar will highlight the path you set
            if (meta.activeMenu) {
                return meta.activeMenu;
            }
            return path;
        },
        variables() {
            return variables;
        },
        isCollapse() {
            return !this.sidebar.opened;
        }
    },
    created(){
    },
    methods:{
        toggleSideBar(){
            this.$store.dispatch('app/toggleSideBar')
        }
    }
};
</script>
<style scoped>
.menu-title {
    position: relative;
    height: 40px;
    line-height: 40px;
    background-image: linear-gradient(to bottom, #fff,#ebebeb);
    padding-left: 20px;
    font-size: 14px;
    font-weight: 600;
    color: #333;
}
.menu-title > i {
    position: absolute;
    top: 5px;
    right: 10px;
    display: block;
    height: 30px;
    width: 30px;
    background: url(../../../assets/img/menu.png) no-repeat center;
    background-size: 25px;
    cursor: pointer;
}
</style>