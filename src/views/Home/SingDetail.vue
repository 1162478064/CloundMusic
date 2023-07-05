<template>
  <div class="flex flex-col">
    <div class="flex justify-between items-center px-5 py-4 bg-[#696562] text-white">
      <van-icon name="arrow-left" size="18px" class="text-[#959698]" @click="$router.back()" />
      <div class="flex-1 flex justify-between items-center px-3">
        <span>歌单</span>
        <van-icon name="search" size="18px" class="text-[#959698]" @click="$router.back()" />
      </div>
      <Icon icon="solar:menu-dots-bold" :rotate="1" />
    </div>
    <div class="flex-1 flex flex-col overflow-auto">
      <div class="py-4">
        <div class="px-4 grid grid-cols-3 gap-2">
          <div>
            <img src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" alt="" class="w-full rounded-lg">
          </div>
          <div class="col-span-2 flex flex-col justify-between">
            <div class="flex">
              <h5 class="text-sm truncate">addsa标题asfasffdfsdsdfsdsssssssabcddasdsdsfds</h5>
              <van-icon name="arrow-down" size="12px" color="#FBFBFA" class="p-1 ml-3 bg-[#7F7C77] rounded-full" />
            </div>
            <div class="flex items-center">
              <van-image round width="30px" height="30px" src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
              <span class="text-xs mx-2">LiriCam</span>
              <span class="flex justify-between items-center text-xs"><van-icon name="plus" />关注</span>
            </div>
            <div>
              <van-tag color="#ffe1e1" size="mini" text-color="#F4F3F1" class="flex items-center text-xs">8.6分<van-icon name="arrow" /></van-tag>
            </div>
          </div>
        </div>
        <p class="px-4 my-3 truncate text-xs text-[#C9C7C4]">asdasjsdfdsfsdfsddsfsdfdsfsddfkdfjlsdjfsjdljsdjdfkgjsljgksdjfklds</p>
        <div class="grid grid-cols-3 gap-2 px-4 text-white text-sm">
          <button class="rounded-[50px] py-2 bg-[#999691]">
            <van-icon name="share" />
            <span>128</span>
          </button>
          <button class="rounded-[50px] py-2 bg-[#999691]">
            <van-icon name="chat" />
            <span>32</span>
          </button>
          <button class="rounded-[50px] py-2 bg-[#999691]">
            <van-icon name="add" />
            <span>9638</span>
          </button>
        </div>
      </div>
      <div class="flex-1 bg-white rounded-t-3xl">
        <div class="sticky top-0 left-0 bg-white px-4 py-5 flex justify-between z-10">
          <div>
            <van-icon name="play" size="14px" color="white" class="bg-[#FE4437] p-1 rounded-full" />
            <span class="mx-3 text-sm">播放全部</span>
            <span class="text-sm">(52)</span>
          </div>
          <div>
            <van-icon name="down" />
            <van-icon name="bars" />
          </div>
        </div>
        <ul>
          <li v-for="item in 100" class="flex">
            <van-cell center label="描述信息" :clickable="true">
              <template #icon><span class="mr-4 text-[#B3B3B3]">1</span></template>
              <template #title>
                <span class="text-[#323232] text-sm">adfsdfdf</span>
              </template>
              <template #label>
                <van-tag plain type="primary" size="mini" color="#D0A145" text-color="#D0A145" class="scale-75">超清母带</van-tag>
                <span class="text-xs">阿萨是佛山分公司</span>
              </template>
              <template #right-icon>
                <van-icon name="ellipsis" color="#B3B3B3" class="rotate-90" />
              </template>
            </van-cell>
          </li>
        </ul>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "SingDetail",
  data() {
    return {

    }
  },
  mounted() {
    console.log(this.$route.query.id)
  }
}
</script>

<style scoped>

</style>