<template>
  <component v-bind="$attrs" :is="$attrs.is"></component>
</template>
<script setup>
import { ref, reactive, onMounted } from "vue";
onMounted((props) => {
  console.log(props);
});
</script>
<script>
export default {
  mounted() {
    console.log(this.$attrs);
  },
};
</script>
<style lang="less" scoped></style>
