<template>
  <div class="w-full border-b border-b-slate-200 pb-3">
    <h4 class="my-5 text-sm font-normal flex items-center justify-between px-4">
      <div class="flex items-center">
        <span>排行榜</span>
        <div>
          <Icon icon="mingcute:right-line" />
        </div>
      </div>
      <div @click="alertShare">
        <Icon icon="solar:menu-dots-bold" :rotate="1" />
      </div>
    </h4>
    <van-swipe class="my-swipe" :loop="false" indicator-color="white">
      <van-swipe-item v-for="(item, index) in rank" :key="index">
       <div class="bg-[white] mx-5 p-4 rounded">
         <h6 class="flex justify-between items-center">
           <div class="flex items-center text-sm">
             <span>{{ item.uiElement.mainTitle.title }}</span>
             <Icon icon="mingcute:right-line" />
           </div>
           <div class="text-xs text-gray-300">{{ item.uiElement.mainTitle.titleDesc }}</div>
         </h6>
         <ul>
           <li v-for="(value, key) in item.resources" :key="key" class="flex justify-between items-center mt-3">
             <img :src="value.uiElement.image.imageUrl" alt="" class=" min-h-[65px] max-h-[70px] rounded">
             <span v-if="key == 0" class="flex-none px-3 font-bold text-red-600">{{ key + 1 }}</span>
             <span v-else-if="key == 1" class="flex-none px-3 font-bold text-orange-500">{{ key + 1 }}</span>
             <span v-else class="flex-none px-3 font-bold text-lime-950">{{ key + 1 }}</span>
             <p class="flex-1 text-sm/[13px]">{{ value.uiElement.mainTitle.title }}</p>
             <b class="text-xs font-thin">{{ value.uiElement.labelText.text }}</b>
           </li>
         </ul>
       </div>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  name: "Ranking",
  props: ['rank'],
  methods: {
    alertShare() {
      this.$emit('transfer',{ whether: true, title: '排行榜' })
    }
  }
}
</script>

<style scoped>

</style>