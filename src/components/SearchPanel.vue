<template>
  <div class="search-panel-wrap">
    <template v-for="(field, index) in searchFields" :key="field.modelValue">
      <div
        class="search-panel"
        v-if="index <= collapse - 1 || !collapse || expand"
      >
        <div class="search-panel-lable" :style="{ width: labelWidth + 'px' }">
          {{ field.label + (colon ? ":" : "") }}
        </div>
        <div>
          <!-- 默认trim -->
          <template v-if="COMPONENT_TYPES.INPUT === field.component">
            <MyComponent
              :is="field.component"
              v-model:value="values[field.modelValue]"
              :placeholder="field.placeholder"
              :style="{
                width:
                  (field.componentWidth
                    ? field.componentWidth
                    : componentWidth) + 'px',
              }"
            />
            <!-- <a-input 
              v-model:value="values[field.modelValue]"
              :placeholder="field.placeholder"
              :style="{
                width:
                  (field.componentWidth
                    ? field.componentWidth
                    : componentWidth) + 'px',
              }"
            >
            </a-input> -->
          </template>
          <template v-if="COMPONENT_TYPES.SELECT === field.component">
            <MyComponent
              :is="field.component"
              v-model:value="values[field.modelValue]"
              :placeholder="field.placeholder"
              :style="{
                width:
                  (field.componentWidth
                    ? field.componentWidth
                    : componentWidth) + 'px',
              }"
              :options="field.options"
              :showSearch="field.showSearch"
              @change="field.onchange"
            />
            <!-- <a-select
              v-model:value="values[field.modelValue]"
              :placeholder="field.placeholder"
              :style="{
                width:
                  (field.componentWidth
                    ? field.componentWidth
                    : componentWidth) + 'px',
              }"
              :options="field.options"
              :showSearch="field.showSearch"
              @change="field.onchange"
            >
            </a-select> -->
          </template>
          <template v-if="COMPONENT_TYPES.DATE_PICKER === field.component">
            <a-date-picker
              v-model:value="values[field.modelValue]"
              :placeholder="field.placeholder"
              :style="{
                width:
                  (field.componentWidth
                    ? field.componentWidth
                    : componentWidth) + 'px',
              }"
              :disabled-date="field.disabledDate"
            ></a-date-picker>
          </template>
          <template v-if="COMPONENT_TYPES.RANGE_PICKER === field.component">
            <my-range-picker
              v-model:value="values[field.modelValue]"
              :placeholder="field.placeholder"
              :style="{
                width:
                  (field.componentWidth
                    ? field.componentWidth
                    : 2 * componentWidth) + 'px',
              }"
              :disabled-date="field.disabledDate"
              :showTime="field.showTime"
            ></my-range-picker>
          </template>
          <template v-if="COMPONENT_TYPES.RADIO === field.component">
            <a-radio-group
              v-model:value="values[field.modelValue]"
              :options="field.options"
              :optionType="field.optionType ? field.optionType : 'button'"
              button-style="solid"
              :style="{
                width:
                  (field.componentWidth
                    ? field.componentWidth
                    : componentWidth) + 'px',
              }"
            />
          </template>
        </div>
      </div>
    </template>
    <a-space class="search-panel">
      <a style="font-size: 12px" @click="expand = !expand" v-if="collapse">
        <template v-if="expand"> <UpOutlined /> 收起 </template>
        <template v-else> <DownOutlined /> 展开 </template>
      </a>
      <a-button type="primary" @click="submit">查询</a-button>
      <a-button type="primary" ghost @click="reset">重置</a-button>
    </a-space>
  </div>
</template>
<script setup>
import { ref, h } from "vue";
import { COMPONENT_TYPES } from "@/setup/global";
import MyRangePicker from "./MyRangePicker.vue";
import MyComponent from "./MyComponent.vue";
import { DownOutlined, UpOutlined } from "@ant-design/icons-vue";
const expand = ref(false);
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
    type: Number,
    default: 100,
  },
  //组件宽度
  componentWidth: {
    type: Number,
    default: 170,
  },
  //展开，收起，>0生效
  collapse: {
    type: Number,
    default: 0,
  },
});
const values = ref({});
const original = h("div", { innerHTML: "hello" });
props.searchFields.forEach((item) => {
  values.value[item.modelValue] = item.defaultValue;
});

const emit = defineEmits(["search"]);
function submit() {
  emit("search", values.value);
}
function reset() {
  values.value = {};
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
