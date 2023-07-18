<template>
  <div>
    <div class="bg-white dark:bg-[#2C2C2C] flex flex-col justify-center items-center mx-4 mt-[50px] p-4 rounded-lg">
      <van-image round width="80px" height="80px" :src="UserURL" class="mt-[-50px]" />
      <h4 class="my-4 flex items-center">
        <span class="text-black dark:text-white">{{ UserName }}</span>
        <span class="bg-gradient-to-r from-[#33322E] to-[#403637] px-2 py-1 rounded-full text-xs text-[#E2D4D3] ml-3">vip·叁</span>
      </h4>
      <div>
        <span class="text-xs text-[#B8B8B8] px-3 border-r-[1px] border-[#ccc]">关注</span>
        <span class="text-xs text-[#B8B8B8] px-3 border-r-[1px] border-[#ccc]">粉丝</span>
        <span class="text-xs text-[#B8B8B8] px-3">LV8</span>
      </div>
    </div>
    <div class="bg-white dark:bg-[#2C2C2C] flex flex-col justify-center items-center mx-4 mt-5 p-4 rounded-lg">
      <ul class="grid grid-cols-4 w-full">
        <li v-for="(item, index) in Menu" :key="index" class="flex flex-col items-center justify-center h-[80px]">
          <van-icon :name="item.icon" size="26px" color="#C03231" />
          <span class="text-xs">{{ item.title }}</span>
        </li>
      </ul>
    </div>
    <div class="bg-white dark:bg-[#2C2C2C] flex items-center justify-between mx-4 mt-5 p-4 rounded-lg">
      <div class="relative w-[20%]">
        <img src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" alt="" class="rounded-lg">
        <van-icon name="like" class="!absolute top-[50%] left-[50%] -translate-y-[50%] -translate-x-[50%] !text-white" />
      </div>
      <div class="flex-1 ml-4">
        <h5 class="dark:text-[#EAEAEA] text-sm">我喜欢的音乐</h5>
        <span class="text-xs">18首</span>
      </div>
      <div class="flex items-center px-2 py-1 rounded-full border-[1px] border-[#494949] text-xs text-[#CFCFCF]">
        <van-icon name="like-o" class="mr-1" />
        <span>心动模式</span>
      </div>
    </div>
    <van-tabs
        v-model="SongActive"
        scrollspy
        sticky
        :background="$store.state.Dark ? '#1B1B23' : '#F8F9FD'"
        title-inactive-color="#898989"
        :title-active-color="$store.state.Dark ? '#F1F1F1' : 'black'"
        line-width="20px"
        offset-top="46px"
        class="z-10"
    >
      <van-tab v-for="(item, index) in MyInformation" :key="index" :title="item.title">
        <div class="bg-white dark:bg-[#2C2C2C] flex items-cente mx-4 mt-5 p-4 rounded-lg flex-col">
          <h5 class="flex justify-between items-center text">
            <span class="text-xs">{{ item.title }}({{ item.SongSheet.length }}个)</span>
            <div>
              <van-icon name="plus" />
              <van-icon name="ellipsis" class="rotate-90" />
            </div>
          </h5>
          <ul>
            <li v-for="(value, key) in item.SongSheet" :key="key" class="mt-4 flex justify-between items-center">
              <img :src="value.coverImgUrl" alt="" class="w-[20%] rounded-lg">
              <div class="flex-1 ml-4">
                <h5 class="dark:text-[#EAEAEA] text-sm">{{ value.name }}</h5>
                <span class="text-xs">{{ value.trackCount }} 首</span>
              </div>
              <div>
                <van-icon name="ellipsis" class="rotate-90" />
              </div>
            </li>
          </ul>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { GetUserSongSheet } from "@/API/User";

export default {
  name: "My",
  data() {
    return {
      UserURL: sessionStorage.getItem('avatarUrl'),
      UserName: sessionStorage.getItem('nickname'),
      Menu: [{
        icon: 'play-circle',
        title: '最近播放'
      }, {
        icon: 'music',
        title: '本地下载'
      }, {
        icon: 'todo-list',
        title: '云盘'
      }, {
        icon: 'checked',
        title: '已购'
      }, {
        icon: 'friends',
        title: '我的好友'
      }, {
        icon: 'star',
        title: '收藏和赞'
      }, {
        icon: 'gem',
        title: '我的播客'
      }, {
        icon: 'fire',
        title: '乐迷团'
      }], // 我的应用菜单
      SongActive: 0,
      MyInformation: [{
        title: '创建歌单',
        SongSheet: []
      }, {
        title: '收藏歌单',
        SongSheet: []
      }]
    }
  },
  mounted() {
    this.GetUserInfo()
  },
  methods: {
    async GetUserInfo() {
      const res = await GetUserSongSheet({ uid: sessionStorage.getItem('userid')});
      res.playlist.forEach(item => {
        if(item.subscribed) {
          this.MyInformation[1].SongSheet.push(item)
        } else {
          this.MyInformation[0].SongSheet.push(item)
        }
      })
    }
  }
}
</script>

<style scoped>

</style>