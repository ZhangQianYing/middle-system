<!-- 面包屑导航 -->
<template>
    <div id="breadcrumb-nav">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item
                v-for="item in breadcrumbList"
                :key="item.name"
                :to="item.path"
            >{{item.name}}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script>
export default {
    name: 'breadcrumb',
    data() {
        return {}
    },
    computed: {
        breadcrumbList() {
            return this.$route.matched
        }
    }
}
</script>

<style lang="scss">
</style>