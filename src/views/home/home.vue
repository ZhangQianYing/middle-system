<template>
  <div>
    <button @click="getlist">模拟请求操作</button>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
     
    };
  },

  components: {
  },

  created() {
  },

  methods: {
    getlist() {
        this.$router.push({path: 'login'})
        
    },

  }
}
</script>

<style lang="scss" scoped>

</style>

