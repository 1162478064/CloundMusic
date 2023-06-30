<template>
  <div class="sticky top-0 z-10 flex justify-between items-center w-100vw px-4 bg-[#F7F8FA]">
    <van-icon name="apps-o" size="18px" @click="OpenSidaber" />
    <van-search class="flex-1" shape="round" v-model="Search" background="transparent" placeholder="请输入搜索关键词" right-icon="scan" />
    <van-icon name="music-o" size="18px" />
  </div>
</template>

<script>
export default {
  name: "Search",
  data() {
    return {
      Search: '' // 搜索框
    }
  },
  methods: {
    OpenSidaber() {
      this.$store.commit('OpenOrClose', true);
      console.log(this.$store.state.Sidaber);
    }
  }
}
</script>

<style scoped>
  /deep/ .van-search__content {
    background: linear-gradient(to right, #E7E6F4, #F7E3EE);
  }
</style>