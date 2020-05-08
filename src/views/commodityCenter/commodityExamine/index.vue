<template>
  <div>
    <searchList :serach="serachInput"></searchList>
  </div>
</template>

<script>
import searchList from "@/components/searchList/searchList.vue";
export default {
  components: { searchList },
  name: "home",
  data() {
    return {
      serachInput: [
        {
          name: "单号",
          key: "number",
          type: "input"
        }
      ]
    };
  },

  created() {},

  methods: {
    getlist() {
      this.$router.push({ path: "login" });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
