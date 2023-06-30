<template>
  <div class="menu w-[100vw] overflow-auto px-2">
    <van-grid :column-num="5" :border="false" class="!flex-nowrap w-auto">
      <van-grid-item v-for="(item, index) in Menu" :key="index" class="w-[20%] min-w-[20%] max-w-[20%]">
        <Icon :icon="item.icon" color="#FE3651" class="text-3xl my-2" :horizontalFlip="item.horizontalFlip" />
        <span class="text-xs">{{ item.name }}</span>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
import HomeMenuData from "@/assetes/HomeMenu";

export default {
  name: "MenuList",
  data() {
    return {
      Menu: HomeMenuData.MenuList, // 菜单
    }
  }
}
</script>

<style scoped>
.menu::-webkit-scrollbar{
  display: none;
}

/deep/ .van-grid-item__content {
  background: none;
}
</style>