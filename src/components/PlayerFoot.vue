<template>
  <div v-if="SongSheet.length > 0" class="h-full bg-white/[0.6] dark:bg-black/[0.6]">
    <div class="h-full flex justify-between items-center" @click="ChangePlayerShow(!PlayerShow)">
      <van-image
          v-if="SongSheet[NowActive]"
          :src="SongSheet[NowActive].al.picUrl"
          radius="10px"
          class="w-[40px] h-[40px] mx-2"
      />
      <h4 class="flex-1">
      <span v-if="SongSheet[NowActive]" class="text-sm text-[#404758] dark:text-white">
        {{ SongSheet[NowActive].name }} -
      </span>
        <span v-if="SongSheet[NowActive]" class="text-xs text-[#7E828D]">
        {{ SongSheet[NowActive].ar[0].name }}
      </span>
      </h4>
      <div @click.stop="ChangePlayeStatus(!NowPlay)">
        <van-circle
            :value="NowScale"
            rate="100"
            layer-color="#C7C8D2"
            color="#485063"
            size="30px"
            class="cursor-pointer mx-2"
        >
          <template #default>
            <div class="h-full flex justify-center items-center">
              <Icon :icon="NowPlay ? 'carbon:pause-filled' : 'ph:play-fill'" class="!w-[15px] !h-[18px]" style="position: unset" />
            </div>
          </template>
        </van-circle>
      </div>
      <div @click.stop="SongSheetShow = !SongSheetShow">
        <Icon icon="icon-park-solid:menu-fold-one" class="text-3xl mx-2" />
      </div>
    </div>
    <van-action-sheet v-model="PlayerShow" :round="false" :overlay="false" class="!max-h-full h-full">
      <div v-if="SongSheet[NowActive]" class="h-screen bg-auto" :style="`background: url('${ SongSheet[NowActive].al.picUrl || '' }') black no-repeat center`">
        <div class="h-full backdrop-blur-2xl">
          <div class="flex justify-between items-center text-[#F6F8FA] px-3 py-2">
            <van-icon name="arrow-down" size="25px" @click="ChangePlayerShow(false)" />
            <p class="flex-1 mx-2 text-center flex flex-col">
              <span v-if="SongSheet[NowActive]" class="text-sm text-[#FEFFFE]">{{ SongSheet[NowActive].name }}</span>
              <span v-if="SongSheet[NowActive]" class="text-xs text-[#ABADAE]">{{ SongSheet[NowActive].ar[0].name }}</span>
            </p>
            <van-icon name="share-o" size="25px" />
          </div>
          <div class="h-[calc(100vh-242px)]" @click="LyricShow = !LyricShow">
            <div v-show="LyricShow" id="Lyric-Thumb" class="h-full overflow-scroll py-7">
              <ul class="flex flex-col items-center">
                <li v-for="(item, index) in Lyric" :key="index" class="my-3">
                <span
                    class="text-[#949494] text-xs"
                    :class="index === LyricPosition ? 'text-[#DFDEEB] !text-sm' : ''"
                >{{ item.text }}</span>
                </li>
              </ul>
            </div>
            <div v-show="!LyricShow" class="h-full flex justify-center items-center relative">
              <img
                  src="@/assets/images/needle-ab.png"
                  alt=""
                  class="absolute w-[70px] top-0 ml-[50px] origin-top-left transition"
                  :class="NowPlay ? 'rotate-0' : '-rotate-[20deg]'"
                  @click.stop="ChangePlayeStatus(!NowPlay)"
              >
              <div class="min-w-[250px] max-w-[350px] min-h-[250px] max-h-[350px] bg-[url('@/assets/images/fang.png')] bg-no-repeat bg-cover flex justify-center items-center">
                <van-image round fit="cover" position="center" :src="SongSheet[NowActive].al.picUrl" class="min-w-[160px] max-w-[160px] transition" :style="`transform: rotate(${angle}deg)`" />
              </div>
            </div>
          </div>
          <div class="px-3">
            <div class="flex items-center text-xl pb-7 text-[#F6F8FA]">
              <span class="flex-1 text-center text-base"><van-icon name="like-o" class="flex-1" /></span>
              <span class="flex-1 text-center"><van-icon name="down" class="flex-1" /></span>
              <span class="flex-1 text-center"><van-icon name="music-o" class="flex-1" /></span>
              <span class="flex-1 text-center"><van-icon name="chat-o" class="flex-1" /></span>
              <span class="flex-1 text-center"><van-icon name="ellipsis" class="rotate-90" /></span>
            </div>
            <div class="flex items-center text-[#F6F8FA]">
              <span class="text-xs">{{ FormatPlayer(Audio.duration / 100 * NowScale) }}</span>
              <van-slider
                  v-model="NowScale"
                  bar-height="3px"
                  button-size="10px"
                  inactive-color="#515151"
                  active-color="#A4B6CC"
                  @drag-start="ChangePlayeStatus(false)"
                  @drag-end="ChangePlayeStatus(true)"
                  class="mx-3"
              ></van-slider>
              <span class="text-xs">{{ FormatPlayer(Audio.duration) }}</span>
            </div>
            <div class="flex items-center text-xl pt-7 pb-10 text-[#F6F8FA]">
              <span class="flex-1 flex justify-center"><Icon icon="ps:random" /></span>
              <span class="flex-1 flex justify-center"><van-icon name="arrow-left" @click="ChangeActive(NowActive - 1 < 0 ? SongSheet.length - 1 : NowActive - 1)" /></span>
              <span class="flex-1 flex justify-center"><van-icon :name="NowPlay ? 'pause-circle-o' : 'play-circle-o'" size="50px" @click="ChangePlayeStatus(!NowPlay)" /></span>
              <span class="flex-1 flex justify-center"><van-icon name="arrow" @click="ChangeActive(NowActive + 1 === SongSheet.length ? 0 : NowActive + 1)" /></span>
              <span class="flex-1 flex justify-center"><Icon icon="icon-park-solid:menu-fold-one" class="text-3xl mx-2" /></span>
            </div>
          </div>
        </div>
      </div>
    </van-action-sheet>
    <van-popup v-model="SongSheetShow" round position="bottom" teleport="#app">
      <div>
        <h4 class="p-3">
          <span class="text-base">当前播放</span>
          <span class="text-xs text-[#999999]">({{ SongSheet.length }})</span>
        </h4>
        <div class="px-3">
          <div class="py-6 flex justify-between items-center border-b border-[#E6E6E6] text-[18px] text-[#999999]">
            <div>
              <van-icon name="replay" />
              <span class="text-sm">列表循环</span>
            </div>
            <div>
              <van-icon name="down" class="mr-2" />
              <van-icon name="add-o" class="mr-2" />
              <van-icon name="delete-o" class="mr-2" />
            </div>
          </div>
        </div>
        <div class="h-[50vh] overflow-scroll">
          <div>
            <van-cell v-for="(item, index) in SongSheet" :border="false" clickable :key="index" @click="ChangeActive(index)">
              <template #icon>
                <div class="flex items-center">
                  <Icon v-if="index === NowActive" icon="svg-spinners:bars-scale-middle" color="red" class="mr-4" />
                </div>
              </template>
              <template #title>
                <span class="text-sm" :class="index === NowActive ? 'text-[#F04140]' : ''">{{ item.name }}</span>
                <span>·</span>
                <span class="text-xs" :class="index === NowActive ? 'text-[#F04140]' : 'text-[#808080]'">{{ item.ar[0].name }}</span>
              </template>
              <template #right-icon>
                <van-icon name="cross" color="#B6B6B6" size="17px" />
              </template>
            </van-cell>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
  name: "Player",
  data() {
    return {
      Timer: null,
      angle: 0,
      LyricShow: false, // 是否显示歌词
      SongSheetShow: false // 是否展示歌单
    }
  },
  computed: {
    ...mapState('Player', ['SongSheet', 'NowActive', 'NowPlay', 'Audio', 'Lyric', 'LyricPosition']),
    // 当前播放进度
    NowScale: {
      get() {
        return this.$store.state.Player.NowScale;
      },
      set(value) {
        this.ChangePlayerScale(value);
      }
    },
    // 详情播放器弹出框
    PlayerShow: {
      get() {
        return this.$store.state.Player.PlayerShow;
      },
      set() {}
    }
  },
  watch: {
    NowPlay(value) {
      if(value) {
        this.Timer = setInterval(() => {
          this.angle += 1;
        }, 100)
      } else {
        clearInterval(this.Timer)
      }
    },
    LyricPosition(value) {
      // 变换滚动条
      let Lyric = document.getElementById('Lyric-Thumb');
      if(Lyric) Lyric.scrollTop = (value - 3) * 48
    }
  },
  methods: {
    ...mapMutations('Player', ['ChangePlayeStatus', 'ChangePlayerShow', 'ChangePlayerScale', 'ChangeActive']),
    ...mapActions('Player', ['GetSongUrl']),
    // 转化播放时间格式
    FormatPlayer(value) {
      const Sum = value >= 0 ? Math.floor(value) : 0;
      const mm = Sum / 60 < 10 ? `0${ Math.floor(Sum / 60) }` : Math.floor(Sum / 60);
      const ss = Sum % 60 < 10 ? `0${ Math.floor(Sum % 60) }` :Math.floor(Sum % 60);
      return `${ mm }:${ ss }`
    }
  }
}
</script>

<style scoped>

</style>