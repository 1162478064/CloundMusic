<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import {mapState, mapMutations, mapActions} from 'vuex';
export default {
  name: "app",
  computed: {
    ...mapState('Player', ['NowActive', 'NowPlay', 'Audio'])
  },
  watch: {
    NowActive() {
      this.GetSongUrl();
    },
    NowPlay(value) {
      value ? this.Audio.play() : this.Audio.pause();
    }
  },
  mounted() {
    // 初始化播放器事件全局只能由一个播放器
    this.PlayerLoading();
  },
  methods: {
    ...mapMutations('Player', ['PlayerLoading']),
    ...mapActions('Player', ['GetSongUrl'])
  }
}
</script>

<style scoped>
* {
  transition: all 0.2s;		/*加上过渡使主题转换更加自然 */
}
.el-input__inner {
  background: transparent;
  transition: all 0.2s ease-out;		/*必须单独添加，不然el-input的组件过渡效果不能生效*/
}
</style>