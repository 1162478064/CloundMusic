<template>
  <div class="dark:bg-[#1B1B23] dark:text-[#BBBBBC] pt-[50px]">
    <ul class="flex justify-between items-center">
      <li v-for="(item, index) in Menu" :key="index" class="flex-1 flex flex-col items-center my-4">
        <van-icon :name="item.icon" size="24px" color="#FE3A46" />
        <span class="text-xs">{{ item.name }}</span>
      </li>
    </ul>
    <div class="m-4">
      <h4 class="text-sm mb-5">搜索历史</h4>
      <div>
        <span v-for="(item, index) in history" :key="index" class="text-xs text-[#555B6A] py-[7px] px-[12px] bg-[white] rounded-full cursor-pointer dark:bg-[#32323A] dark:text-[#D6D6D8]">{{ item }}</span>
      </div>
    </div>
    <div class="m-4">
      <h4 class="text-sm mb-5">猜你喜欢</h4>
      <div>
        <span v-for="(item, index) in like" :key="index" class="text-xs text-[#555B6A] py-[7px] px-[12px] bg-[white] rounded-full cursor-pointer dark:bg-[#32323A] dark:text-[#D6D6D8]">{{ item }}</span>
      </div>
    </div>
    <van-swipe :loop="false" :show-indicators="false" :width="ResizeWidth" class="mb-5">
      <van-swipe-item v-for="(item, index) in RankArr" :key="index" class="pl-5">
        <div class="p-5 bg-[white] dark:bg-[#32323A] rounded-lg">
          <h4 class="pb-5 border-b border-[#E5E5E5] dark:border-[#404048]">
            <span class="text-sm">{{ item.name }}</span>
            <span class="text-xs bg-[#F2F3F5] dark:bg-[#3A3A42] rounded-full px-2 py-1"><van-icon name="play" />播放</span>
          </h4>
          <ul>
            <li v-for="(value, key) in item.data" :key="key" class="flex mt-5">
              <span
                  class="w-[25px] text-[#7F858F] text-sm"
                  :class="{ 'text-[#FE3B3B]': key == 0, 'text-[#F73D3E]': key == 1, 'text-[#F93D3D]': key == 2 }"
              >{{ key + 1 }}</span>
              <span class="text-[#283348] dark:text-[#EBECF1] text-sm truncate">{{ value.name }}</span>
            </li>
          </ul>
        </div>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import Vue from 'vue';
import { GetSearchRanking, GetRankingDetail } from '@/API/SearchPage.js'
export default {
  name: "SearchPage",
  data() {
    return {
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
  mounted() {
    this.GetRank();
    this.resize()
    window.onresize = () => { this.resize() }
  },
  methods: {
    resize() {
      this.ResizeWidth = document.body.offsetWidth * 4/5
    },
    // 所有榜单集
    async GetRank() {
      const res = await GetSearchRanking();
      this.RankArr = res.list.map((item, index) => {
        if(index <= 5) return item
      }).filter(value => { return value !== undefined })
      for(let i = 0; i < this.RankArr.length; i++) {
        const val = await GetRankingDetail({ id: this.RankArr[i].id })
        Vue.set(this.RankArr[i], 'data', val.playlist.tracks.map((item, index) => {
          if(index < 20) return item
        }).filter(value => { return value != undefined })); // vue实时渲染视图
      }
    }
  }
}
</script>

<style scoped>
</style>