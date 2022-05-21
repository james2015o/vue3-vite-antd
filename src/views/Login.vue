<template>
  <div>login</div>
  <a-button @click="login">login</a-button>
</template>
<script setup>
import { ref, reactive } from "vue";

import userApi from "../api/user";

const login = () => {
  userApi.login({ username: "xxx", password: "123123" });
};
</script>
<style lang="less" scoped></style>
