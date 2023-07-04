<template>
  <div class="sticky top-0 z-10 flex justify-between items-center w-100vw px-4 bg-[#F8F9FD] text-[#959698] dark:bg-[#1B1B23]">
    <van-icon name="apps-o" size="18px" @click="OpenSidaber" class="text-[#959698]" />
    <van-search
        v-model="Search"
        shape="round"
        background="transparent"
        placeholder=""
        right-icon="scan"
        class="flex-1"
        :class="$store.state.Dark ? 'dark' : ''"
        @focus="$router.push('/description/search')"
    />
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
/deep/ .van-search__content {
  background: linear-gradient(to right, #E5E7F4, #F7E3EE);
}

/deep/ .dark .van-search__content {
  background: linear-gradient(to right, #3B343B, #3B343B);
}
</style>