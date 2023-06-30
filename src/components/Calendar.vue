<template>
  <div class="w-full border-b border-b-slate-200 pb-3">
    <h4 class="my-5 text-sm font-normal flex items-center justify-between px-4">
      <div class="flex items-center">
        <span>音乐日历</span>
        <Icon icon="mingcute:right-line" />
      </div>
      <div @click="alertShare">
        <Icon icon="solar:menu-dots-bold" :rotate="1" />
      </div>
    </h4>
    <div class="m-5 bg-[white] rounded">
      <div v-for="item in calendar" class="flex justify-between items-center p-3 bg-black-/[.6]">
        <div class="border-b border-b-slate-200 flex-1 mx-3">
          <p class="text-xs mb-2 text-slate-300">今天 06:28 云村热点</p>
          <p class="text-sm pb-2">{{ item.title }}</p>
        </div>
        <img :src="item.img" alt="" class="w-[17vw] rounded-md">
      </div>
    </div>
  </div>
</template>

<script>
import data from '@/assetes/HomeMenu.js'
export default {
  name: "Calendar",
  data() {
    return {
      calendar: data.calendar
    }
  },
  methods: {
    alertShare() {
      this.$emit('transfer',{ whether: true, title: '音乐日历' })
    }
  }
}
</script>

<style scoped>

</style>