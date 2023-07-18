<template>
  <div class="w-full border-b border-b-slate-200 pb-3 dark:border-b-[#24242C]">
    <h4 class="my-5 text-sm font-normal flex items-center justify-between px-4">
      <div class="flex items-center dark:text-[#E7E7E7]">
        <span>排行榜</span>
        <div>
          <Icon icon="mingcute:right-line" />
        </div>
      </div>
      <div @click="alertShare">
        <Icon icon="solar:menu-dots-bold" :rotate="1" />
      </div>
    </h4>
    <van-swipe class="my-swipe" :loop="false" :show-indicators="false">
      <van-swipe-item v-for="(item, index) in rank" :key="index">
       <div class="mx-5 p-4 rounded-md" :class="$store.state.Dark ? 'bg-[#26262E]' : 'bg-[white]'">
         <h6 class="flex justify-between items-center">
           <div class="flex items-center text-sm">
             <span>{{ item.name }}</span>
             <Icon icon="mingcute:right-line" />
           </div>
           <div class="text-xs text-gray-300">{{ item.updateFrequency }}</div>
         </h6>
         <ul>
           <li v-for="(value, key) in item.tracks" :key="key" class="flex justify-between items-center mt-3">
             <img :src="value.al.picUrl" alt="" class=" min-h-[65px] max-h-[70px] rounded">
             <span class="flex-none px-3 font-bold" v-bind:class="{ 'text-[yellow]' : key === 0, 'text-[#ccc]' : key === 1, 'text-[orange]' : key === 2 }">{{ key + 1 }}</span>
             <p class="flex-1 text-sm/[13px]">{{ value.al.name }}</p>
             <b class="text-xs font-thin">{{ value.ar[0].name }}</b>
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