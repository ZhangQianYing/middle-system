<template>
  <div class="logo">
    <transition name="fade">
      <span v-if="isCollapse" class="logo_title is-bold is-text" key="0">
        <template>
          中台
        </template>
      </span>
    </transition>
    <transition-group name="fade">
      <template v-if="!isCollapse">
        <span class="logo_title is-bold" key="1">中台</span>
        <span class="logo_subtitle" key="2">系统</span>
      </template>
    </transition-group>
  </div>
</template>

<script>
export default {
  name: 'logo',
  data() {
    return {}
  },
  props: ['isCollapse'],
  created() {},
  computed: {

  },
  methods: {}
}
</script>

<style scoped="scoped" lang="scss">
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-active {
  transition: opacity 3.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.logo {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: calc(100% - 1px);
  height: 50px;
  line-height: 50px;
  background: #473C8B;
  color: #fdfdfd;
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  overflow: hidden;
//   box-sizing: border-box;
}
.logo_title {
//   padding: 0 3px 0 0;
  color: #42b983;
  font-size: 19px;
  &.is-bold {
    font-weight: 700;
  }
}
.is-text {
  position: absolute;
  top: 0;
  // left: 20px;
}
.is-img {
  position: absolute;
  top: 10px;
  left: 10px;
}
.logo_subtitle {
  font-size: 15px;
  padding-top: 15px;
}
</style>