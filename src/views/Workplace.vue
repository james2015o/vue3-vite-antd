<template>
  <div>workplace</div>
    <a-range-picker v-model:value="value1" />
</template>
<script setup>
import {ref, onMounted} from 'vue' 
const value1 = ref();
onMounted(() => {
  console.log(1212);
});
</script>
<style lang='less' scoped>
</style>