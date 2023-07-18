<template>
  <div class="h-screen bg-[#F8F9FD] dark:bg-[#1B1B23] dark:text-[#BABABD]">
    <van-nav-bar :border="false" placeholder class="!bg-[#F8F9FD] dark:!bg-[#1B1B23]">
      <template #left>
        <van-icon name="apps-o" size="18px" @click="OpenSidaber" class="!text-[#959698]" />
      </template>
      <template #title>
        <van-search
            v-show="$route.name === 'homePage'"
            shape="round"
            background="transparent"
            right-icon="scan"
            class="flex-1 !px-0"
            :class="$store.state.Dark ? 'dark' : ''"
            @click="$router.push('/Description')"
        />
        <van-tabs v-show="$route.name === 'podcastPage'" v-model="podcastActive" background="transparent" :title-active-color="$store.state.Dark ? 'white' : 'black'" line-width="20">
          <van-tab v-for="(item, index) in podcastNavBar" :key="index" :name="item.name" :title="item.title" />
        </van-tabs>
        <span v-if="$route.name === 'followPage'">动态</span>
        <van-tabs v-show="$route.name === 'communityPage'" v-model="communityActive" background="transparent" :title-active-color="$store.state.Dark ? 'white' : 'black'" line-width="20">
          <van-tab v-for="(item, index) in communityNavBar" :key="index" :name="item.name" :title="item.title" />
        </van-tabs>
      </template>
      <template #right>
        <van-icon v-show="$route.name === 'homePage'" name="music-o" size="18px" class="!text-[#959698]" />
        <van-icon v-show="$route.name === 'podcastPage' || $route.name === 'followPage'" name="add" size="24px" />
        <van-icon v-show="$route.name === 'myPage'" name="search" size="18px" class="!text-[#959698]" />
        <van-icon v-show="$route.name === 'communityPage'" name="chat-o" size="18px" class="!text-[#959698]" />
      </template>
    </van-nav-bar>
    <!--主体-->
    <div class="h-[calc(100vh-100px)] overflow-auto">
      <AppMain />
    </div>
    <!--音乐播放器-->
    <div class="z-30 fixed bottom-[50px] left-0 w-[100%] h-[50px] bg-[rgba(0, 0, 0, .9)]">
      <Player />
    </div>
    <!--侧边栏-->
    <div class="z-40 fixed w-full h-full top-0 left-0 transition-all" :class="Sidaber ? 'OpenSidaber' : 'CloseSidaber'" @click.self="CloseSidaber">
      <Sidaber class="w-[85%] h-full bg-[#F5F5F5] overflow-auto" />
    </div>
    <!--底部导航栏-->
    <van-tabbar v-model="RouteActive" :border="false" :placeholder="true" fixed active-color="#FF3549" inactive-color="#979AA3">
      <van-tabbar-item
          v-for="(item, index) in Routes"
          :key="index"
          :name="item.name"
          :to="item.href"
          :icon="item.icon"
          class="dark:bg-[#1B1B23] dark:text-[#908F94]"
      >
        {{ item.title }}
      </van-tabbar-item>
    </van-tabbar>

  </div>
</template>

<script>
import AppMain from './components/AppMain.vue'
import Sidaber from './components/Sidaber.vue'
import data from '@/assets/HomeMenu.js'

export default {
  name: "Layout",
  components: {
    AppMain,
    Sidaber,
    Player: () => import('@/components/PlayerFoot.vue')
  },
  data() {
    return {
      Routes: data.Route,
      podcastNavBar: data.podcastNavBar,
      communityNavBar: data.communityNavBar,
      RouteActive: data.Route.find(item => { return item.name === this.$route.name }).name, // 底部导航栏当前路由名
      podcastActive: 0,
      communityActive: 0
    }
  },
  computed: {
    Sidaber() {
      return this.$store.state.Sidaber
    }
  },
  methods: {
    // 打开侧边栏
    OpenSidaber() {
      this.$store.commit('OpenOrClose', true);
    },
    // 关闭侧边栏
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

/deep/ .van-nav-bar__left,
/deep/ .van-nav-bar__right {
  width: 50px;
  position: unset;
}

/deep/ .van-nav-bar__title {
  margin: 0;
  max-width: none;
  flex: 1;
}

/deep/ .van-search__content {
  background: linear-gradient(to right, #E5E7F4, #F7E3EE);
}

/deep/ .dark .van-search__content {
  background: linear-gradient(to right, #3B343B, #3B343B);
}

/deep/ .van-nav-bar .van-icon {
  color: #959698 !important;
}
</style>