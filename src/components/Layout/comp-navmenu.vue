<template>
    <component
        :is="navData.children && navData.children.length ? 'el-submenu' : 'el-menu-item'"
        :index="`/${navData.path}`"
    >
        <!-- 如果有子菜单 -->
        <template v-if="navData.children && navData.children.length">
            <template slot="title">
                <i :class="navData.meta && navData.meta.icon"></i>
                <span>{{navData.name}}</span>
            </template>
            <comp-navmenu
                v-for="subNavItem in navData.children"
                :key="subNavItem.name"
                :nav-data="subNavItem"
                :prev-path="`/${navData.path}`"
            ></comp-navmenu>
        </template>
        <template v-else>
            <i :class="navData.meta && navData.meta.icon"></i>
            <span>{{navData.name}}</span>
        </template>
    </component>
</template>

<script>
export default {
    name: 'compNavmenu',
    props: {
        prevPath: {
            type: String,
            default: ''
        },
        navData: {
            type: Object,
            default: () => {}
        }
    },
    data() {
        return {
            slotName: null
        }
    },
}
</script>

<style lang="scss">
.el-menu-item.is-active{
    background: #2d8cf0!important;
}
</style>