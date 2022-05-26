<template>
  <a-table
    v-bind="$attrs"
    @resizeColumn="handleResizeColumn"
    :dataSource="data.list"
    :loading="loading"
    bordered
    size="middle"
    :row-class-name="
      (_record, index) => (index % 2 === 1 ? 'table-striped' : null)
    "
    :pagination="{
      position: 'topLeft',
    }"
  >
    <template #title>
      <div style="display: flex">
        <div>总共：{{ data.total }}</div>
      </div>
    </template>
    <template #headerCell="{ title, column }">
      <slot name="headerCell" :title="title" :column="column"></slot>
    </template>
    <template #bodyCell="{ text, record, index, column }">
      <slot
        name="bodyCell"
        :text="text"
        :record="record"
        :index="index"
        :column="column"
      ></slot>
    </template>
    <template #emptyText>
      <slot name="emptyText"></slot>
    </template>
    <template #summary>
      <slot name="summary"></slot>
    </template>
    <template #footer>
      <slot name="footer"></slot>
    </template>
  </a-table>
</template>
<script setup>
import { ref, onMounted } from "vue";
const data = ref({});
const props = defineProps({
  //自动加载数据
  autoLoad: {
    type: Boolean,
    default: true,
  },
  api: {
    type: String,
  },
  params: {
    type: Object,
    default: () => {
      return {
        current: 1,
        pageSize: 10,
      };
    },
  },
});
onMounted(() => {
  if (props.autoLoad) {
    search();
  }
});
const handleResizeColumn = (w, col) => {
  col.width = w;
};
const search = () => {
  props.api(props.params).then((d) => {
    data.value = d;
  });
};
defineExpose({
  search,
});
</script>
<style scoped>
 :deep(.table-striped) td {
  background-color: #fafafa;
}
</style>
