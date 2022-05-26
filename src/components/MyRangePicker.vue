<template>
  <a-range-picker v-bind="$attrs"></a-range-picker>
  <a-radio-group v-model:value="value1" button-style="solid">
    <a-radio-button value="a">今日</a-radio-button>
    <a-radio-button value="b">昨日</a-radio-button>
    <a-radio-button value="c">本月</a-radio-button>
    <a-radio-button value="d">本年</a-radio-button>
  </a-radio-group>
</template>
<script setup>
import { ref, reactive } from "vue";
const value1 = ref("a");
</script>
<script>
export default{
  name:"my-range-picker"
}
</script>
<style lang="less" scoped></style>
