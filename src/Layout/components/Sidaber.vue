<template>
  <div class="py-5">
    <div class="User_Image mx-5 flex justify-between items-center mb-5">
      <div class="flex items-center">
        <van-image width="25" height="25" fit="cover" round src="" error-icon="manager" />
        <span class="text-sm ml-3">未登录</span>
        <van-icon name="arrow" />
      </div>
      <van-icon name="scan" />
    </div>
    <div class="mx-5 rounded-xl bg-gradient-to-r from-[#3D3938] to-[#5B4B4B] p-[20px]">
      <div class="flex justify-between border-b border-solid border-[#615555]">
        <div>
         <h6 class="flex items-center">
           <span class="text-[#FFE3DE] text-base font-bold">黑胶VIP·贰</span>
           <span class="w-[10vw] h-[1vh] bg-[#352F2F] rounded-lg mx-1 flex">
            <b class="w-[75%] bg-gradient-to-r from-[#E4C3BB] to-[#F6E9E8] h-[100%] rounded-lg"></b>
          </span>
           <span class="text-xs text-[#847573]">v3</span>
         </h6>
          <p class="flex items-center text-[#9D8D8C] text-xs my-2">
            <span>有48成长值待领取</span>
            <van-icon name="arrow" />
          </p>
        </div>
        <div class="">
          <span class="rounded-full p-2 text-xs text-[#D9BFB9] border-solid border border-[#D9BFB9]">会员中心</span>
        </div>
      </div>
      <div class="flex items-center justify-between text-[#A18F8B] text-xs mt-[20px]">
        <span>续费黑胶VIP, 尊享超21项特权</span>
        <van-icon name="music-o" class="!text-sm" />
      </div>
    </div>
    <div v-for="(item, index) in SidaberSetting" :key="index" class="bg-[white] m-5 rounded-xl overflow-hidden">
      <h3 v-if="item.title" class="text-[#999999] text-xs border-b border-[#F3F3F3] border-solid p-[15px]">{{ item.title }}</h3>
      <ul>
        <li v-for="(value, key) in item.Arr" :key="key">
          <van-cell v-if="!value.silder" :title="value.name" :icon="value.icon" :value="value.description" is-link />
          <van-cell v-if="value.silder" :title="value.name" :icon="value.icon">
            <template #right-icon>
              <van-switch v-model="DeepColor" size="15px" />
            </template>
          </van-cell>
        </li>
      </ul>
    </div>
    <div class="bg-[white] m-5 rounded-xl p-[10px] flex justify-center items-center text-sm text-[red]">退出登录/关闭</div>
  </div>
</template>

<script>
import data from '../../assetes/HomeMenu.js'
export default {
  name: "Sidaber",
  data() {
    return {
      SidaberSetting: data.SidaberSetting,
      DeepColor: false
    }
  }
}
</script>

<style scoped>
/deep/ .van-cell__value {
  font-size: 12px;
  white-space: nowrap;
}
/deep/ .van-cell__title {
  font-size: 13px;
}
</style>