<template>
  <div id="Description" class="h-[100vh] flex justify-between flex-col bg-[#F8F9FD] dark:bg-[#1B1B23] dark:text-[#BABABD]" @scroll="handleScoll()">
    <van-nav-bar :border="false" z-index="20" fixed :class="toFixed ? '!bg-[transparent]' : '!bg-[#F8F9FD] dark:!bg-[#1B1B23]'">
      <template #left>
        <van-icon name="arrow-left" size="18px" class="!text-[#959698]" @click="$router.back()" />
      </template>
      <template #title>
        <div class="flex">
          <span>{{ $route.meta.title }}</span>
          <van-search
              v-show="$route.name === 'Search' || $route.name === 'SearchResult'"
              v-model="SearchValue"
              shape="round"
              background="transparent"
              :placeholder="SearchPlaceholder"
              right-icon="scan"
              class="flex-1 !px-0"
              :class="$store.state.Dark ? 'dark' : ''"
              @input="SearchValue.length > 0 ? GetJumpResult() : $router.push('/Description')"
          />
        </div>
      </template>
      <template #right>
        <div v-show="$route.name == 'Search' || $route.name == 'SearchResult'" class="text-xs text-[#959698]">搜索</div>
        <van-icon v-show="$route.name === 'mycount'" name="ellipsis" class="rotate-90 !text-[#959698]" />
      </template>
    </van-nav-bar>
    <router-view :key="key" class="bg-[#F8F9FD] dark:bg-[#1B1B23] pb-[50px]" />
    <div v-show="$route.meta.title != '我的二维码'" class="bg-[#FCFDFF] dark:bg-[#1B1B23] dark:text-[#BBBBBC] h-[50px] z-20 fixed bottom-0 left-0 right-0">
      <Player />
    </div>
  </div>
</template>

<script>
import { GetSearchDefault } from "@/API/SearchPage";
import debounce from "@/utils/Setting"

export default {
  name: "Description",
  components: {
    Player: () => import('@/components/PlayerFoot.vue')
  },
  data() {
    return {
      SearchPlaceholder: '',
      SearchValue: '',
      toFixed: true,
      Timer: null // 默认占位符定时器
    }
  },
  watch:  {
    'SearchPlaceholder': {
      handler(value) {
        const name = this.$route.name;
        if(name === 'Search' ||name === 'SearchResult') {
          this.Timer = setInterval(() => {
            if(this.SearchValue.length == 0) this.GetSearchDefault()
          }, 3000)
        }
      },
      immediate: true
    }
  },
  computed: {
    key() {
      return this.$route.path
    }
  },
  mounted() {
    const that = this
    window.addEventListener('scroll', that.handleScoll)
  },
  methods: {
    // 搜索框默认值
    async GetSearchDefault() {
      const res = await GetSearchDefault();
      this.SearchPlaceholder = res.data.showKeyword;
    },
    // 跳转到搜查结果页面携带参数
    GetJumpResult: debounce(function () {
      clearInterval(this.Timer);
      this.$router.push({ name: 'SearchResult', params: { SearchValue: this.SearchValue }})
    }, 3000),
    // 判断是否在顶部
    handleScoll() {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      this.toFixed = scrollTop == 0
    }
  },
  destroyed() {
    clearInterval(this.Timer);
  }
}
</script>

<style scoped>
/deep/ .van-nav-bar__left,
/deep/ .van-nav-bar__right {
  width: 50px;
  position: unset;
  padding: 0;
  justify-content: center;
}

/deep/ .van-nav-bar__title {
  margin: 0;
  max-width: none;
  flex: 1;
}

/deep/ .dark .van-search__content {
  background: #313139;
}

/deep/ .van-field__control {
  color: #958767;
}

/deep/ .dark .van-icon {
  color: #958767 !important;
}
</style>