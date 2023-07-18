<template>
	<div class="w-full">
    <van-pull-refresh v-model="loading" @refresh="onRefresh" class="z-0">
      <banner :banner="data.banners" />
      <menulist />
      <recomendsong :recommended="data.Recommended" @transfer="GetShare" />
      <newsong :quicksong="data.QuickSong" @transfer="GetShare" />
      <ranking :rank="data.Ranking" @transfer="GetShare" />
      <calendar @transfer="GetShare" />
    </van-pull-refresh>
    <van-action-sheet v-model="share.whether" :title="share.title">
      <div class="content">
        <van-cell>
          <template #title>
            <div class="flex items-center">
              <Icon icon="iconamoon:like" class="text-lg" />
              <span class="custom-title ml-3">优先推荐</span>
            </div>
          </template>
        </van-cell>
        <van-cell>
          <template #title>
            <div class="flex items-center">
              <Icon icon="icon-park-outline:unlike" class="text-lg" />
              <span class="custom-title ml-3">减少推荐</span>
            </div>
          </template>
        </van-cell>
        <van-cell>
          <template #title>
            <div class="flex items-center">
              <Icon icon="mingcute:more-4-line" class="text-lg" />
              <span class="custom-title ml-3">更多内容</span>
            </div>
          </template>
        </van-cell>
      </div>
    </van-action-sheet>
	</div>
</template>

<script>
import { GetBanner, GetRecommendedSong, GetNewSongs, GetRanking } from "@/API/Home";
import { GetSingDetail } from '@/API/Description'

export default {
  name: "Home",
  components: {
    search: () => import('../../components/Search.vue'),
    banner: () => import('../../components/Home/Banner.vue'),
    menulist: () => import('../../components/Home/Menu.vue'),
    recomendsong: () => import('../../components/Home/RecommendedSong.vue'),
    newsong: () => import('../../components/Home/NewSong.vue'),
    ranking: () => import('../../components/Home/Ranking.vue'),
    calendar: () => import('../../components/Home/Calendar.vue')
  },
  data() {
    return {
      loading: false, // 是否重新加载
      share: { whether: false, title: '' }, // 分享组件展示
      data: {
        banners: [], // 轮播图
        Recommended: [], // 推荐歌单
        QuickSong: [], // 新歌速递
        Ranking: [] // 排行榜
      }
    }
  },
  mounted() {
    this.onRefresh()
  },
  methods: {
    // 下拉刷新
    onRefresh() {
      setTimeout(() => {
        this.GetBanner();
        this.GetRecommended();
        this.GetNewSongs();
        this.GetRanking();
        this.loading = false;
      }, 1000);

    },
    // 获取轮播图
    async GetBanner() {
      const res = await GetBanner({ type: 1 });
      this.data.banners = res.banners || [];
    },
    // 推荐歌单
    async GetRecommended() {
      const res = await GetRecommendedSong({ limit: 6 });
      this.data.Recommended = res.result || [];
    },
    // 新歌新碟数字专辑
    async GetNewSongs() {
      const res = await GetNewSongs();
      this.data.QuickSong = res.products.map((item, index) => {
        if(index % 3 == 0) return [item, res.products[index+1], res.products[index+2]]
      }).filter(value => { return value != undefined })
    },
    // 排行榜
    async GetRanking() {
      const res = await GetRanking();
      this.data.Ranking = res.list.map((item, index) => {
        if(index <= 4) return item
      }).filter(value => { return value != undefined })
      this.data.Ranking.forEach(async item => {
        const value = await GetSingDetail({ id: item.id })
        item.tracks = value.playlist.tracks.map((val, index) => {
          if(index < 3) return val
        }).filter(summary => { return summary != undefined })
      })
    },
    // 接收子组件的改变指令
    GetShare(value) {
      this.share = value
    }
  }
};
</script>

<style>
</style>
