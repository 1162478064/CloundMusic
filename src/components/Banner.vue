<template>
  <van-swipe :autoplay="5000">
    <van-swipe-item v-for="item in banner" class="px-4">
      <van-image v-bind:src="item.pic" radius="20" class="w-[100%]" />
    </van-swipe-item>
  </van-swipe>
</template>

<script>
export default {
  name: "banner",
  props: ['banner']
}
</script>

<style scoped>

</style>