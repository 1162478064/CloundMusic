<template>
  <div class="w-full border-b border-b-slate-200 pb-3 dark:border-b-[#24242C]">
    <h4 class="my-5 text-sm font-normal flex items-center justify-between px-4">
      <div class="flex items-center dark:text-[#E7E7E7]">
        <span>新歌新碟/数字专辑</span>
        <Icon icon="mingcute:right-line" />
      </div>
      <div @click="alertShare">
        <Icon icon="solar:menu-dots-bold" :rotate="1" />
      </div>
    </h4>
    <van-swipe :show-indicators="false" class="px-4 w-[100%]">
      <van-swipe-item v-for="(item, index) in quicksong" :key="index">
        <div v-for="(value, key) in item.resources" :key="key" class="flex justify-between items-center my-2">
          <img :src="value.uiElement.image.imageUrl" alt="" class="w-[17vw] rounded">
          <div class="flex-1 px-2">
            <h5 class="dark:text-[#E7E8E8]">{{ value.uiElement.mainTitle.title }}</h5>
            <p class="text-xs mx-2 mt-2">
              <van-tag plain type="primary" size="mini" color="#ffe1e1" text-color="#ad0000">超清母带</van-tag>
              <span class="text-xs">{{ value.resourceExtInfo.artists[0].name }}</span>
            </p>
          </div>
          <van-icon name="play-circle-o" color="#6C6B70" class="flex-none pr-[8vw]" />
        </div>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  name: "NewSong",
  props: ['quicksong'],
  methods: {
    alertShare() {
      this.$emit('transfer',{ whether: true, title: '新歌新碟/数字专辑' })
    }
  }
}
</script>

<style scoped>
/deep/ .van-grid-item__content {
  background: transparent;
}
</style>