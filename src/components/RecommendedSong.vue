<template>
  <div class="w-full border-b border-b-slate-200 pb-3 dark:border-b-[#24242C]">
    <h4 class="my-5 text-sm font-normal flex items-center justify-between px-4">
      <div class="flex items-center dark:text-[#E7E7E7]">
        <span>推荐歌单</span>
        <Icon icon="mingcute:right-line" />
      </div>
      <div @click="alertShare">
        <Icon icon="solar:menu-dots-bold" :rotate="1" />
      </div>
    </h4>
    <div class="recommendedsong w-full overflow-auto px-4">
      <ul class="flex">
        <ul class="overflow-hidden min-w-[33%] max-w-[33%] mr-2">
          <div class="w-full overflow-hidden relative">
            <img v-if="recommended[Current]" :src="recommended[Current].picUrl" alt="" class="invisible">
            <transition v-for="(item, index) in recommended" :key="index" name="abc">
              <div v-if="Current == index" class=" w-[100%] absolute top-0 left-0">
                <img :src="item.picUrl" alt="" class="rounded w-full" />
              </div>
            </transition>
            <Icon icon="ion:infinite" width="20" color="white" class="absolute top-1 right-1" />
          </div>
          <p v-if="recommended[Current]" class="van-multi-ellipsis--l2 text-xs my-1">{{ recommended[Current].name }}</p>
        </ul>
        <li v-for="(item, index) in recommended" :key="index" class="min-w-[33%] max-w-[33%] mr-2">
          <div class="relative">
            <img :src="item.picUrl" alt="" class="rounded-lg">
            <Icon icon="ph:play-fill" color="white" class="absolute bottom-2 right-2 text-xl" />
            <div class="absolute top-1 right-1 flex items-center text-[#F5E7E8] font-bold text-xs">
              <Icon icon="ph:play-fill" color="#F5E7E8" />
              <span>{{ (item.playCount/10000).toFixed(0) }}万</span>
            </div>
          </div>
          <p class="text-xs my-1 van-multi-ellipsis--l2">{{ item.name }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecommendedSong",
  props: ['recommended'],
  data() {
    return {
      Current: 0
    }
  },
  mounted() {
    setInterval(() => {
      if(this.Current == this.recommended.length - 1) {
        this.Current = 0
      }
      this.Current++
    }, 3000);
  },
  methods: {
    alertShare() {
      this.$emit('transfer',{ whether: true, title: '推荐歌单' })
    }
  }
}
</script>

<style scoped>
.recommendedsong::-webkit-scrollbar {
  display: none;
}
.abc-enter {
  transform: translateY(100%) scale(.7);
}

.abc-enter-active {
  transition: all ease-in-out 1s;
}

.abc-enter-to {
  transform: translateY(0) scale(1);
}

.abc-leave {
  transform: translateY(0) scale(1);
}

.abc-leave-active {
  transition: all ease-in-out 1s;
}

.abc-leave-to {
  transform: translateY(-100%) scale(.7);
}
</style>