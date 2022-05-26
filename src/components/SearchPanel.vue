<template>
  <div class="search-panel-wrap">
    <template v-for="(field, index) in searchFields" :key="field.modelValue">
      <div
        class="search-panel"
        v-if="index <= collapse - 1 || !collapse || expand"
      >
        <div class="search-panel-lable" :style="{ width: labelWidth }">
          {{ field.label + (colon ? ":" : "") }}
        </div>
        <div>
          <component
            :is="field.component"
            v-model:value="values[field.modelValue]"
            v-bind="field.attrs"
            :style="{
              width: field.attrs.width ? field.attrs.width : componentWidth,
            }"
          ></component>
        </div>
      </div>
    </template>
    <a-space class="search-panel">
      <a
        style="font-size: 12px"
        @click="expand = !expand"
        v-if="collapse < searchFields.length"
      >
        <template v-if="expand"> <UpOutlined /> 收起 </template>
        <template v-else> <DownOutlined /> 展开 </template>
      </a>
      <a-button type="primary" @click="submit" :loading="loading"
        >查询</a-button
      >
      <a-button type="primary" ghost @click="reset" :loading="loading"
        >重置</a-button
      >
    </a-space>
  </div>
</template>
<script setup>
import { ref } from "vue";
import MyRangePicker from "./MyRangePicker.vue";
import { DownOutlined, UpOutlined } from "@ant-design/icons-vue";

const props = defineProps({
  searchFields: {
    type: Array,
    default: () => [],
  },
  //是否线上冒号
  colon: {
    type: Boolean,
    default: true,
  },
  labelWidth: {
    type: String,
    default: "100px",
  },
  //组件宽度
  componentWidth: {
    type: String,
    default: "170px",
  },
  //展开，收起，>0生效
  collapse: {
    type: Number,
    default: 0,
  },
});
const expand = ref(false);
const values = ref({});
//设置默认值
reset();

const emit = defineEmits(["search"]);
function submit() {
  emit("search", values.value);
}
//设置默认值
function reset() {
  props.searchFields.forEach((item) => {
    values.value[item.modelValue] = item.defaultValue;
  });
}
</script>

<style lang="less" scoped>
.search-panel-wrap {
  display: flex;
  flex-wrap: wrap;
  row-gap: 14px;
  column-gap: 14px;
  .search-panel {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .search-panel-lable {
    text-align: right;
    padding-right: 4px;
    overflow: hidden;
    white-space: nowrap;
  }
}
</style>
