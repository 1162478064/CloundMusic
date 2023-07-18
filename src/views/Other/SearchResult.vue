<template>
  <div class="pt-[50px]">
    <ul>
      <li v-for="(item, index) in SearchData" :key="index" class="flex items-center pl-5">
        <van-icon name="search" size="18px" />
        <p class="border-b border-[#ccc] dark:border-[#404048] flex-1 truncate py-[15px] text-xs">{{ item.name }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import { GetSearch } from '@/API/SearchPage'
export default {
  name: "SearchResult",
  data() {
    return {
      SearchData: []
    }
  },
  watch: {
    '$route': {
      handler(value) {
       this.GetSearch()
      },
      immediate: true
    }
  },
  methods: {
    async GetSearch() {
      const res = await GetSearch({ keywords: this.$route.params.SearchValue, limit: 10 });
      console.log(res);
      this.SearchData = res.result.songs;
    }
  }
}
</script>

<style scoped>

</style>