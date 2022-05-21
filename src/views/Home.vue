<template>
  <div>asdfas</div>
  <div>ho9me{{ user?.username }}</div>
  <a-button @click="login('ddd')">click</a-button>
</template>

<script setup>
import useUserStore from "../store/user.js";

console.log(useUserStore);
const { user, login } = useUserStore();
</script>

<style lang="scss" scoped></style>
