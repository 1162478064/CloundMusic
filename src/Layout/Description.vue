<template>
  <div id="Description" class="h-[100vh] flex justify-between flex-col">
    <router-view :key="key" class="flex-1" />
    <div>播放器</div>
  </div>
</template>

<script>
export default {
  name: "Description",
  computed: {
    key() {
      return this.$route.path
    }
  }
}
</script>

<style scoped>

</style>