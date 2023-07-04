<template>
  <div>
    <div class="sticky top-0 z-10 flex justify-between items-center w-100vw px-4 bg-[#F8F9FD] text-[#959698] dark:bg-[#1B1B23]">
      <van-icon name="arrow-left" size="18px" class="text-[#959698]" @click="this.$router.back()" />
      <van-search
          v-model="SearchValue"
          shape="round"
          background="transparent"
          :placeholder="SearchPlaceholder"
          right-icon="scan"
          class="flex-1"
          :class="$store.state.Dark ? 'dark' : ''"
      />
      <span>搜索</span>
    </div>
    <ul v-show="SearchValue.length === 0" class="flex justify-between items-center">
      <li v-for="(item, index) in Menu" :key="index" class="flex-1 flex flex-col items-center my-4">
        <van-icon :name="item.icon" size="24px" color="#FE3A46" />
        <span class="text-xs">{{ item.name }}</span>
      </li>
    </ul>
    <div v-show="SearchValue.length === 0" class="m-4">
      <h4 class="text-sm mb-5">搜索历史</h4>
      <div>
        <span v-for="(item, index) in history" :key="index" class="text-xs text-[#555B6A] py-[7px] px-[12px] bg-[white] rounded-full cursor-pointer">{{ item }}</span>
      </div>
    </div>
    <div v-show="SearchValue.length === 0" class="m-4">
      <h4 class="text-sm mb-5">猜你喜欢</h4>
      <div>
        <span v-for="(item, index) in like" :key="index" class="text-xs text-[#555B6A] py-[7px] px-[12px] bg-[white] rounded-full cursor-pointer">{{ item }}</span>
      </div>
    </div>
    <van-swipe v-show="SearchValue.length === 0" :loop="false" :show-indicators="false" :width="ResizeWidth" class="mb-5">
      <van-swipe-item v-for="(item, index) in RankArr" :key="index" class="pl-5" :class="index === RankArr.length - 1 ? 'pr-5' : ''">
        <div class="p-5 bg-[white] rounded-lg">
          <h4 class="pb-5 border-b border-[#E5E5E5]">
            <span class="text-sm">{{ item.name }}</span>
            <span class="text-xs bg-[#F2F3F5] rounded-full px-2 py-1"><van-icon name="play" />播放</span>
          </h4>
          <ul>
            <li v-for="(value, key) in item.data" :key="key" class="flex mt-5">
              <span
                  class="w-[25px] text-[#7F858F] text-sm"
                  :class="{ 'text-[#FE3B3B]': key == 0, 'text-[#F73D3E]': key == 1, 'text-[#F93D3D]': key == 2 }"
              >{{ key + 1 }}</span>
              <span class="text-[#283348] text-sm truncate">{{ value.name }}</span>
            </li>
          </ul>
        </div>
      </van-swipe-item>
    </van-swipe>
    <ul>
      <li v-for="(item, index) in SearchData" :key="index" class="flex items-center pl-5">
        <van-icon name="search" size="18px" />
        <p class="border-b border-[#ccc] flex-1 truncate py-[15px] text-xs">{{ item.name }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import Vue from 'vue';
import { GetSearchRanking, GetRankingDetail, GetSearchDefault, GetSearch } from '@/API/SearchPage.js'
export default {
  name: "SearchPage",
  data() {
    return {
      SearchValue: '',
      SearchPlaceholder: '',
      SearchData: [],
      Menu: [
        {
          icon: 'manager',
          name: '歌手'
        }, {
          icon: 'music',
          name: '曲风'
        }, {
          icon: 'award',
          name: '专区'
        }, {
          icon: 'audio',
          name: '识曲'
        }
      ],
      history: [], // 搜索历史
      like: [], // 猜你喜欢
      ResizeWidth: 0, // 榜单宽度详情
      RankArr: [] // 总榜单
    }
  },
  watch: {
    SearchValue(val) {
      this.debounce(this.GetSearch(), 3000)
    }
  },
  mounted() {
    this.GetRank();
    this.resize()
    window.onresize = () => {
      this.resize()
    }
    setInterval(() => {
      if(this.SearchValue.length == 0) this.GetSearchDefault()
    }, 3000)
  },
  methods: {
    resize() {
      this.ResizeWidth = document.body.offsetWidth * 4/5
    },
    // 所有榜单集
    async GetRank() {
      const res = await GetSearchRanking();
      this.RankArr = res.list.map((item, index) => {
        if(index <= 5) {
          // GetRankingDetail({ id: item.id }).then(Val => {
          //   item.data = Val.playlist.tracks.slice(0, 20);
          // })
          // if(item.data) {
            return item
        //   }
        }
      }).filter(value => { return value !== undefined })
      for(let i = 0; i < this.RankArr.length; i++) {
        const val = await GetRankingDetail({ id: this.RankArr[i].id, s: 20 })
        Vue.set(this.RankArr[i], 'data', [...val.playlist.tracks]); // vue实时渲染视图
      }
    },
    // 搜索框默认值
    async GetSearchDefault() {
      const res = await GetSearchDefault();
      this.SearchPlaceholder = res.data.showKeyword;
    },
    // 搜索要求
    debounce(fn, wait) {
      let timer;
      return function () {
        const that = this;
        if(timer) clearTimeout(timer)
        timer = setTimeout(() => {
          timer = null;
          fn.apply(that, arguments)
        }, wait)
      }
    },
    async GetSearch() {
      const res = await GetSearch({ keywords: this.SearchValue, limit: 10 });
      console.log(res);
      this.SearchData = res.result.songs;
    }
  }
}
</script>

<style scoped>
/deep/ .van-search__content {
  background: linear-gradient(to right, #E5E7F4, #F7E3EE);
}

/deep/ .dark .van-search__content {
  background: linear-gradient(to right, #3B343B, #3B343B);
}
</style>