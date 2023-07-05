<template>
  <div>
    登录页
  </div>
</template>

<script>
import { GetCreateKey } from "@/API/Login";

export default {
  name: "Login",
  mounted() {
    this.GetCookie();
  },
  methods: {
    async GetCookie() {
      const res = await GetCreateKey();
      console.log(res);
    }
  }
}
</script>

<style scoped>

</style>