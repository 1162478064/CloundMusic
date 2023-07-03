<template>
	<div class="w-full">
    <search />
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
import { GetMusicList, GetRecommendedSong } from "@/API/List";

export default {
  name: "Home",
  components: {
    search: () => import('../components/Search.vue'),
    banner: () => import('../components/Banner.vue'),
    menulist: () => import('../components/Menu.vue'),
    recomendsong: () => import('../components/RecommendedSong.vue'),
    newsong: () => import('../components/NewSong.vue'),
    ranking: () => import('../components/Ranking.vue'),
    calendar: () => import('../components/Calendar.vue')
  },
  data() {
    return {
      loading: false, // 是否重新加载
      share: { whether: false, title: '' }, // 分享组件展示
      data: {
        banners: [],
        Recommended: [],
        QuickSong: [],
        Ranking: []
      }
    }
  },
  mounted() {
   this.onRefresh()
  },
  methods: {
    async GetHomeData() {
      const res = await GetMusicList();
      this.data.banners = res.data.blocks[0].extInfo.banners || [];
      this.data.QuickSong = res.data.blocks[5].creatives || []; // 新歌速递
      this.data.Ranking = res.data.blocks[3].creatives || []; // 排行榜
    },
    // 新歌推荐
    async GetRecommended() {
      const res = await GetRecommendedSong({ limit: 6 });
      this.data.Recommended = res.result || [];
    },
    // 下拉刷新
    onRefresh() {
      setTimeout(() => {
        this.GetHomeData();
        this.GetRecommended();
        this.loading = false;
      }, 1000);

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
