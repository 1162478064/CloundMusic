<template>
  <div>
    <div v-if="UserInfo.profile" class="h-[40vh]" :style="'background: url(' + UserInfo.profile.backgroundUrl + ')'"></div>
    <div class="bg-white shadow-lg dark:bg-gradient-to-b from-[#2C2C2C] to-[#2C2C2C] -mt-[25px] mx-4 rounded-lg flex flex-col justify-center items-center" id="MyInfo">
      <van-image v-if="UserInfo.profile" round width="80px" height="80px" :src="UserInfo.profile.avatarUrl" class="mt-[-50px]" />
      <h4 class="mt-4 flex items-center">
        <span v-if="UserInfo.profile" class="text-black dark:text-white">{{ UserInfo.profile.nickname }}</span>
        <span class="bg-gradient-to-r from-[#33322E] to-[#403637] px-2 py-1 rounded-full text-xs text-[#E2D4D3] ml-3">vip·叁</span>
      </h4>
      <div class="mt-4">
        <span v-if="UserInfo.profile" class="text-xs text-[#B8B8B8] px-3 border-r-[1px] border-[#ccc]">{{ UserInfo.profile.followeds || 0 }}关注</span>
        <span v-if="UserInfo.profile" class="text-xs text-[#B8B8B8] px-3 border-r-[1px] border-[#ccc]">{{ UserInfo.profile.follows || 0 }}粉丝</span>
        <span class="text-xs text-[#B8B8B8] px-3">LV{{ UserInfo.level }}</span>
      </div>
      <div class="mt-4">
        <span class="text-xs text-[#B8B8B8] mx-1 px-2 py-1 rounded-lg border border-[#ccc] dark:bg-[#292929] dark:border-[transparent]">IP:{{ Location.province }}</span>
        <span class="text-xs text-[#B8B8B8] mx-1 px-2 py-1 rounded-lg border border-[#ccc] dark:bg-[#292929] dark:border-[transparent]">{{ Location.city }} {{ Location.district }}</span>
        <span class="text-xs text-[#B8B8B8] mx-1 px-2 py-1 rounded-lg border border-[#ccc] dark:bg-[#292929] dark:border-[transparent]">村龄{{ UserInfo.createText }}年</span>
      </div>
      <div class="my-4">
        <span class="text-xs border dark:border-[#3C3C3C] rounded-full px-2 py-[5px]" @click="$router.push({ path: '/Description/AccountSetting'})">编辑资料</span>
        <van-icon name="arrow-down" class="text-xs border dark:border-[#3C3C3C] rounded-full p-[5px]" />
      </div>
    </div>
    <van-tabs
        v-model="MyInfoActive"
        sticky
        :animated="true"
        :background="$store.state.Dark ? '#1B1B23' : '#F8F9FD'"
        title-inactive-color="#898989"
        :title-active-color="$store.state.Dark ? '#F1F1F1' : 'black'"
        line-width="20px"
        offset-top="46px"
        class="z-10"
    >
      <van-tab v-for="(t, i) in MyInfoTabs" :key="i" :title="t.title" class="px-4">
        <div v-if="i == 0">
          <div class="bg-white dark:bg-[#2C2C2C] flex items-cente mt-5 p-4 rounded-lg flex-col">
            <h5 class="mt-1 mb-2">音乐品味</h5>
            <ul class="grid grid-cols-3 gap-1">
              <li class="bg-gradient-to-b from-[#FDF1F1] to-[#FEFCFD] border border-[#F5E7E7] dark:border-0 dark:from-[#434343] dark:to-[#313131] rounded-xl p-3 flex flex-col justify-between">
                <h6 class="flex flex-col mb-6">
                  <span class="text-xs text-[#838087]">我的喜欢</span>
                  <span class="text-base text-[#555868] dark:text-[#D8D8D8] mt-2">18首</span>
                </h6>
                <div class="flex items-center text-[#B1AFB0]">
                  <van-icon name="like" size="12px" />
                  <span class="text-xs">喜欢的音乐</span>
                </div>
              </li>
              <li class="bg-gradient-to-b from-[#FFF5E1] to-[#FFFDF4] border border-[#F9F6EE] dark:border-0 dark:from-[#434343] dark:to-[#313131] rounded-xl p-3 flex flex-col justify-between">
                <h6 class="flex flex-col mb-6">
                  <span class="text-xs text-[#838087]">累计听歌</span>
                  <span class="text-base text-[#555868] dark:text-[#D8D8D8] mt-2">4870首</span>
                </h6>
                <div class="flex items-center text-[#B1AFB0]">
                  <van-icon name="bar-chart-o" size="12px" />
                  <span class="text-xs">听歌排行</span>
                </div>
              </li>
              <li class="bg-gradient-to-b from-[#F0F5FB] to-[#FBFDFF] border border-[#F2F4F8] dark:border-0 dark:from-[#434343] dark:to-[#313131] rounded-xl p-3 flex flex-col justify-between">
                <h6 class="flex flex-col mb-6">
                  <span class="text-xs text-[#838087]">本周关键词</span>
                  <span class="text-base text-[#555868] dark:text-[#D8D8D8] mt-2">在云村连宿两周</span>
                </h6>
                <div class="flex items-center text-[#B1AFB0]">
                  <van-icon name="graphic" size="12px" />
                  <span class="text-xs">黑胶时光机</span>
                </div>
              </li>
            </ul>
          </div>
          <div v-for="(item, index) in MySongSheet" :key="index" class="bg-white dark:bg-[#2C2C2C] flex items-cente mt-5 p-4 rounded-lg flex-col">
            <h5 class="flex justify-between items-center text">
              <span class="text-xs">{{ item.title }}({{ item.SongSheet.length }}个)</span>
            </h5>
            <ul>
              <li v-for="(value, key) in item.SongSheet" :key="key" class="mt-4 flex justify-between items-center">
                <img :src="value.coverImgUrl" alt="" class="w-[20%] rounded-lg">
                <div class="flex-1 ml-4">
                  <h5 class="dark:text-[#EAEAEA] text-sm">{{ value.name }}</h5>
                  <span class="text-xs">{{ value.trackCount }} 首</span>
                </div>
              </li>
            </ul>
          </div>
          <div class="bg-white dark:bg-[#2C2C2C] flex items-cente mt-5 rounded-lg flex-col mb-7">
            <h5 class="flex justify-between items-center text p-4">
              <span class="text-base">基本信息</span>
              <span class="px-4 py-1 rounded-2xl border border-[#3D3D3D] text-xs">村名证</span>
            </h5>
            <div class="p-4 pt-0 text-sm">
              <p class="mb-3">村龄: {{ UserInfo.createText }}年</p>
              <p class="mb-3" v-if="UserInfo.profile">性别: {{ UserInfo.profile.privacyItemUnlimit.gender ? '男' : '女' }}</p>
              <p class="mb-3">地区: {{ Location.province }}{{ Location.city }}{{ Location.district }}{{ Location.street }}{{ Location.township }}{{ Location.township }}</p>
            </div>
            <div class="p-3 text-center border-t border-[#E6E6E6] dark:border-[#3A3A3A] text-[#878787] text-sm">
              <span>查看全部</span>
              <van-icon name="arrow" size="12px" />
            </div>
          </div>
        </div>
        <div v-else-if="i == 1">
          动态
        </div>
        <div v-else>
          播客
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import moment from 'moment';
import { GetUserDetail, GetUserSongSheet } from "@/API/User";

export default {
  name: "MyCount",
  data() {
    return {
      UserInfo: {},
      Location: {},
      MyInfoActive: '主页',
      MyInfoTabs: [
        {
          title: '主页'
        }, {
          title: '动态'
        }, {
          title: '播客'
        }
      ],
      MySongSheet: [{
        title: '创建歌单',
        SongSheet: []
      }, {
        title: '收藏歌单',
        SongSheet: []
      }]
    }
  },
  mounted() {
    this.GetUserInfo();
    this.GetUserDetail();
    setTimeout(() => {
      this.GetlLocation();
    },2000);
  },
  methods: {
    // 获取用户歌单
    async GetUserInfo() {
      const res = await GetUserSongSheet({ uid: sessionStorage.getItem('userid')});
      res.playlist.forEach(item => {
        if(item.subscribed) {
          this.MySongSheet[1].SongSheet.push(item)
        } else {
          this.MySongSheet[0].SongSheet.push(item)
        }
      })
    },
    // 获取用户详情数据
    async GetUserDetail() {
      const res = await GetUserDetail({ uid: sessionStorage.getItem('userid')});
      res.createText = moment(res.createTime, '').fromNow().split(' ')[0];
      this.UserInfo = res
    },
    // 获取当前位置
    GetlLocation() {
      const that = this
      this.$AMap.plugin('AMap.Geolocation', function() {
        new AMap.Geolocation({ enableHighAccuracy: true, GeoLocationFirst: true }).getCurrentPosition(function (status, result) {
          if(status == 'complete') {
            that.GetAddress(result.position)
          }
        })
      })
    },
    // 做标位置转化
    GetAddress(position) {
      const that = this;
      this.$AMap.plugin('AMap.Geocoder', function() {
        new AMap.Geocoder().getAddress(position, function(status, result) {
          if (status === 'complete') {
            that.Location = result.regeocode.addressComponent;
          }
        })
      })
    }
  }
}
</script>

<style scoped>

</style>