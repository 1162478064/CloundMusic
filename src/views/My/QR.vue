<template>
  <div class="h-[100vh] bg-black flex flex-col justify-center">
    <div class="bg-white p-5 m-2 flex flex-col items-center">
      <div class="flex items-center">
        <img :src="avatarurl" alt="" class="w-[35px] h-[35px] rounded-full">
        <span class="text-xs ml-4">{{ nickname }}</span>
      </div>
      <img src="../../assets/images/qr.jpg" alt="" class="w-[50vw] my-5">
      <div class="text-[#ccc] text-xs">扫描上面二维码, 即可在网易云里关注</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "QR",
  data() {
    return {
      avatarurl: sessionStorage.getItem('avatarUrl'),
      nickname: sessionStorage.getItem('nickname')
    }
  }
}
</script>

<style scoped>

</style>