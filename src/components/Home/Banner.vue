<template>
  <van-swipe :autoplay="5000">
    <van-swipe-item v-for="(item, index) in banner" :key="index" class="px-4">
      <van-image v-bind:src="item.pic" radius="20" class="w-[100%]" />
    </van-swipe-item>
  </van-swipe>
</template>

<script>
export default {
  name: "bannerPage",
  props: ['banner']
}
</script>

<style scoped>

</style>