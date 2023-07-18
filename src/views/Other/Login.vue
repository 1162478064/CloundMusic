<template>
  <div class="h-[100vh] flex flex-col">
    <div class="flex justify-between items-center px-5 py-4">
      <van-icon name="arrow-left" size="18px" class="text-[#959698]" @click="$router.back()" />
      <span class="text-[#696969]">游客登录</span>
    </div>
    <div class="flex-1 flex flex-col items-center">
      <div class="flex items-center my-3">
        <div class="bg-[#DE001A] rounded-lg p-1 mr-2">
          <Icon icon="ri:netease-cloud-music-line" width="29" height="29"  color="#f7fdfa" />
        </div>
        <div>网易云音乐</div>
      </div>
      <div class="mb-3 relative">
        <img v-if="qrCheckData.code != 802 && qrCheckData.code != 803" :src="qrimgs" alt="">
        <div v-if="qrCheckData.code == 800" class="absolute top-0 left-0 w-full h-full bg-[#ccc]/[0.6] flex items-center justify-center overflow-hidden">
          <span class="bg-[#FF3D16] text-sm px-4 py-1 rounded-full text-white" @click="GetQRCookie">点击刷新</span>
        </div>
        <div v-if="qrCheckData.code == 802" class="text-center">
          <img src="../../assets/images/QrSuccess.png" alt="" class="w-[35vw]">
          <p class="text-sm my-3">扫描成功</p>
          <p class="text-xs">请在手机上确认登录</p>
        </div>
        <div v-if="qrCheckData.code == 803">登录成功!</div>
      </div>
      <p v-if="qrCheckData.code != 802" class="flex items-center text-sm">用使<a href="#" class="mx-2 text-[#006CA7]">网易云App</a>扫码登录</p>
    </div>
  </div>
</template>

<script>
import { GetCheckoutQR, GetCreateKey, GetCreateQR } from "@/API/Login";
import { GetAccount } from "@/API/User";

export default {
  name: "Login",
  data() {
    return {
      unikey: '',//key
      qrurl: '',
      qrimgs: '',//二维码图片
      qrCheckData: {},//状态
      isLogin: false, //是否登录
      Timer: null
    }
  },
  watch: {
    unikey(value) {
      this.GetQR(value)
    },
    qrCheckData: {
      handler(value) {
        if(value.code === 803) {
          sessionStorage.setItem('cookie', value.cookie); // 存储登录成功的cookie
          this.isLogin = true
          this.GetUser();
          this.$router.push('/home')
        }
      },
      immediate: true,
      deep: true
    }
  },
  mounted() {
    this.GetQRCookie();
  },
  methods: {
    // 获取二维码的key值
    async GetQRCookie() {
      this.qrCheckData = {}
      const res = await GetCreateKey({ timerstamp: new Date().getTime() });
      this.unikey = res.data.unikey
    },
    // 通过key值获取二维码
    async GetQR(key) {
      const res = await GetCreateQR({ timerstamp: new Date().getTime(), qrimg: true, key:key });
      this.qrurl = res.data.qrurl
      this.qrimgs = res.data.qrimg;
      this.GetCheckQR();
      this.Timer = setInterval(() => {
        this.GetCheckQR()
      }, 3000)
    },
    //获取二维码的状态
    async GetCheckQR() {
      const res = await GetCheckoutQR({ timerstamp: new Date().getTime(), key: this.unikey });
      this.qrCheckData = res
      if(res.code === 803 || res.code === 800) clearInterval(this.Timer) // 登录成功关闭定时
      if(res.code === 803) this.$router.push('/home')
    },
    // 获取用户信息
    async GetUser() {
      const res = await GetAccount();
      sessionStorage.setItem('isLogin', res.account.status);
      sessionStorage.setItem('userid', res.account.id);
      sessionStorage.setItem('birthday', res.profile.birthday);
      sessionStorage.setItem('gender', res.profile.gender);
      sessionStorage.setItem('avatarUrl', res.profile.avatarUrl);
      sessionStorage.setItem('nickname', res.profile.nickname);
      sessionStorage.setItem('province', res.profile.province);
      sessionStorage.setItem('city', res.profile.city);
      sessionStorage.setItem('signature', res.profile.signature);
    }
  }
}
</script>

<style scoped>

</style>