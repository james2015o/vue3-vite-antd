<template>
  <a-modal v-model:visible="visible" title="Basic Modal" @ok="handleOk">
    <MyFormVue />
  </a-modal>
</template>
<script setup>
import MyFormVue from "../../components/MyForm.vue";
import { ref, reactive } from "vue";
const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["update:visible"]);
const handleOk = () => {
  props.visible = false;
  console.log(props.visible);
  emit("update:visible", props.visible);
};
</script>
<style lang="less" scoped></style>
