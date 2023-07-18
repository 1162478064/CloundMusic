<template>
  <div class="flex flex-col pt-[56px]">
    <div class="flex-1 flex flex-col overflow-auto">
      <div class="py-4">
        <div class="px-4 grid grid-cols-3 gap-2">
          <div>
            <img :src="SongDetail.coverImgUrl" alt="" class="w-full rounded-lg">
          </div>
          <div class="col-span-2 flex flex-col justify-between">
            <div class="flex justify-between">
              <h5 class="text-sm truncate">{{ SongDetail.name }}</h5>
              <van-icon name="arrow-down" size="12px" color="#FBFBFA" class="p-1 ml-3 bg-[#7F7C77] rounded-full" />
            </div>
            <div class="flex items-center">
              <van-image v-if="SongDetail.creator" round width="30px" height="30px" :src="SongDetail.creator.avatarUrl" />
              <span v-if="SongDetail.creator" class="text-xs mx-2">{{ SongDetail.creator.nickname }}</span>
              <span class="flex justify-between items-center text-xs"><van-icon name="plus" />关注</span>
            </div>
            <div>
              <van-tag color="#ffe1e1" size="mini" text-color="#F4F3F1" class="flex items-center text-xs">8.6分<van-icon name="arrow" /></van-tag>
            </div>
          </div>
        </div>
        <p class="px-4 my-3 truncate text-xs text-[#C9C7C4]">{{ SongDetail.description }}</p>
        <div class="grid grid-cols-3 gap-2 px-4 text-white text-sm">
          <button class="rounded-[50px] py-2 bg-[#999691]/[0.6]">
            <van-icon name="share" />
            <span>{{ SongDetail.shareCount > 10000 ? (SongDetail.shareCount/10000).toFixed(0) + '万' : SongDetail.shareCount }}</span>
          </button>
          <button class="rounded-[50px] py-2 bg-[#999691]/[0.6]">
            <van-icon name="chat" />
            <span>{{ SongDetail.commentCount > 10000 ? (SongDetail.commentCount/10000).toFixed(0) + '万' : SongDetail.commentCount }}</span>
          </button>
          <button class="rounded-[50px] py-2 bg-[#999691]/[0.6]">
            <van-icon name="add" />
            <span>{{ SongDetail.playCount > 10000 ? (SongDetail.playCount/10000).toFixed(0) + '万' : SongDetail.playCount }}</span>
          </button>
        </div>
      </div>
      <div class="flex-1 bg-white rounded-t-3xl">
        <div class="sticky top-0 left-0 bg-white dark:bg-white px-4 py-5 flex justify-between z-10">
          <div>
            <van-icon name="play" size="14px" color="white" class="bg-[#FE4437] p-1 rounded-full" />
            <span class="mx-3 text-sm">播放全部</span>
            <span class="text-sm">({{ AllSong.length }})</span>
          </div>
          <div>
            <van-icon name="down" />
            <van-icon name="bars" />
          </div>
        </div>
        <ul>
          <img src="../../assets/images/NowPlay.gif" alt="">
          <li v-for="(item, index) in AllSong" :key="index" class="flex">
            <van-cell center :clickable="true" @click="ChangeActive(index)">
              <template #icon>
                <img src="../../assets/images/NowPlay.gif" alt="">
                <span class="mr-4 text-[#B3B3B3]">{{ index + 1 }}</span>
              </template>
              <template #title>
                <span class="text-[#323232] text-sm">{{ item.name }}</span>
              </template>
              <template #label>
                <van-tag plain type="primary" size="mini" color="#D0A145" text-color="#D0A145" class="scale-75">超清母带</van-tag>
                <span class="text-xs">{{ item.ar[0].name }}</span>
              </template>
              <template #right-icon>
                <van-icon name="ellipsis" color="#B3B3B3" class="rotate-90" />
              </template>
            </van-cell>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { GetSingDetail, GetSingAllSong } from "@/API/Description";
import { mapMutations } from "vuex";

export default {
  name: "SingDetail",
  data() {
    return {
      SongDetail: {},
      AllSong: []
    }
  },
  mounted() {
    this.GetSongDetail();
    this.GetSong();
  },
  methods: {
    ...mapMutations('Player', ['ChangeSongSheet', 'ChangeActive']),
    // 获取歌单详情
    async GetSongDetail() {
      const res = await GetSingDetail({ id: this.$route.query.id });
      this.SongDetail = res.playlist;
    },
    // 获取歌单所有歌曲
    async GetSong() {
      const res = await GetSingAllSong({ id: this.$route.query.id });
      this.AllSong = res.songs
      this.ChangeSongSheet(this.AllSong); // 给全局歌单赋值
      this.ChangeActive(0); // 切换到当前歌列表第一首歌
    }
  }
}
</script>

<style scoped>

</style>