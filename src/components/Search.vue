<template>
  <div class="sticky top-0 z-10 flex justify-between items-center w-100vw px-4 py-[10px] bg-[#F8F9FD] text-[#959698] dark:bg-[#1B1B23]">
    <van-icon name="apps-o" size="18px" @click="OpenSidaber" class="text-[#959698]" />
    <div class="flex-1 flex justify-between items-center py-[12px] px-[5px] mx-[9px] rounded-[50px] bg-[white] dark:bg-[#2D2D35]">
      <van-icon name="search" class="mx-[5px]" />
      <input type="text" class="flex-1 bg-transparent text-sm" @click="$router.push('/description/search')">
      <van-icon name="scan" class="mx-[5px]" />
    </div>
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
    }
  }
}
</script>

<style scoped>
</style>