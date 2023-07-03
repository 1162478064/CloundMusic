<template>
  <div class="h-screen bg-[#F8F9FD] dark:bg-[#1B1B23] dark:text-[#BABABD]">
    <!--主体-->
    <div class="h-[calc(100vh-50px)] overflow-auto">
      <AppMain />
    </div>
    <!--音乐播放器-->
    <div class="fixed bottom-[50px] left-0 w-[100%] h-[50px] bg-[rgba(0, 0, 0, .9)]">
      播放器
      <img src="" alt="">
    </div>
    <!--侧边栏-->
    <div class="z-50 fixed w-full h-full top-0 left-0 transition-all" :class="Sidaber ? 'OpenSidaber' : 'CloseSidaber'" @click.self="CloseSidaber">
      <Sidaber class="w-[85%] h-full bg-[#F5F5F5] overflow-auto" />
    </div>
    <!--底部导航栏-->
    <van-tabbar v-model="active" :fixed="true"  active-color="#FF3549" inactive-color="#979AA3">
      <van-tabbar-item to="/home" icon="eye-o" class="dark:bg-[#1B1B23] dark:text-[#908F94]">发现</van-tabbar-item>
      <van-tabbar-item to="/podcast/index" icon="music-o" class="dark:bg-[#1B1B23] dark:text-[#908F94]">播客</van-tabbar-item>
      <van-tabbar-item to="/my/index" icon="contact" class="dark:bg-[#1B1B23] dark:text-[#908F94]">我的</van-tabbar-item>
      <van-tabbar-item to="/follow/index" icon="goods-collect-o" class="dark:bg-[#1B1B23] dark:text-[#908F94]">关注</van-tabbar-item>
      <van-tabbar-item to="/community/index" icon="friends-o" class="dark:bg-[#1B1B23] dark:text-[#908F94]">社区</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import AppMain from './components/AppMain.vue'
import Sidaber from './components/Sidaber.vue'

export default {
  name: "Layout",
  components: {
    AppMain,
    Sidaber
  },
  data() {
    return {
      active: 0
    }
  },
  computed: {
    Sidaber() {
      return this.$store.state.Sidaber
    }
  },
  methods: {
    CloseSidaber() {
      this.$store.commit('OpenOrClose', false);
    }
  }
}
</script>

<style lang="less" scoped>
.OpenSidaber {
  width: 100%;
  background: rgba(0, 0, 0, .6);
}

.CloseSidaber {
  width: 0;
}
</style>