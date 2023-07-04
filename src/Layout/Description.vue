<template>
  <div id="Description" class="h-[100vh] flex justify-between flex-col">
    <router-view :key="key" class="h-[calc(100vh-50px)] bg-[#F8F9FD] overflow-auto" />
    <div class="bg-[#FCFDFF] h-[50px]">播放器</div>
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