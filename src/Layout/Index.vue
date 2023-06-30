<template>
  <div class="h-screen">
    <!--主体-->
    <div class="h-[calc(100vh-50px)] overflow-auto">
      <AppMain />
    </div>
    <!--音乐播放器-->
    <div class="fixed bottom-[50px] left-0 w-[100%] h-[50px] bg-[white]/[.6]">
      <img src="" alt="">
    </div>
    <!--侧边栏-->
    <div
        class="z-50 fixed w-full h-full top-0 left-0 transition-all"
         :class="Sidaber ? 'OpenSidaber' : 'CloseSidaber'"
         @click.self="CloseSidaber"
    >
      <Sidaber class="w-[85%] h-full bg-[#F5F5F5] overflow-auto" />
    </div>
    <!--底部导航栏-->
    <van-tabbar v-model="active"  active-color="#ee0a24" inactive-color="#000">
      <van-tabbar-item to="/home" icon="eye-o">发现</van-tabbar-item>
      <van-tabbar-item to="/podcast" icon="music-o">播客</van-tabbar-item>
      <van-tabbar-item to="/my" icon="contact">我的</van-tabbar-item>
      <van-tabbar-item to="/follow" icon="goods-collect-o">关注</van-tabbar-item>
      <van-tabbar-item to="/community" icon="friends-o">社区</van-tabbar-item>
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
      console.log(this.$store.state.Sidaber);
    }
  }
}
</script>

<style lang="less" scoped>
.active {
  background: red;
  color: white;
}

.OpenSidaber {
  width: 100%;
  background: rgba(0, 0, 0, .6);
}

.CloseSidaber {
  width: 0;
  background: rgba(0, 0, 0, 0);
}
</style>