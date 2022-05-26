<template>
  <div>{{ user?.nickName }}</div>

  <a-button v-permission="1" type="primary">权限1</a-button>
  <a-button v-permission="200">权限200</a-button>
  <a-button v-permission="100" type="dashed">权限100</a-button>
  <a-button type="text">Text Button</a-button>
  <a-button type="link">Link Button</a-button>
  <div style="height: 400px; background-color: aquamarine"></div>
  <a-range-picker v-model:value="value1" />

  {{ value1 }}
</template>

<script setup>
import { onMounted, ref } from "vue";
import { getUser } from "../store/user";
// console.log(useUserStore);

const value1 = ref();
const user = getUser();
// console.log(user);
// 测试session过期
// setTimeout(() => {
//   userApi.testSessionGone();
// }, 4000);

onMounted(() => {
  console.log(1212);
});
</script>

<style lang="scss" scoped></style>
