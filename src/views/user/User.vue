<template>
  <div>
    <SearchPanel
      :collapse="4"
      :searchFields="searchFields"
      @search="onsearch"
    />

    <SearchResult :columns="columns"  :data-source="data">
      <template #headerCell="{ column }">
        <template v-if="column.key === 'name'">
          <span>
            <smile-outlined />
            Name
          </span>
        </template>
      </template>

      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'name'">
          <a>
            {{ record.name }}
          </a>
        </template>
        <template v-else-if="column.key === 'tags'">
          <span>
            <a-tag
              v-for="tag in record.tags"
              :key="tag"
              :color="
                tag === 'loser'
                  ? 'volcano'
                  : tag.length > 5
                  ? 'geekblue'
                  : 'green'
              "
            >
              {{ tag.toUpperCase() }}
            </a-tag>
          </span>
        </template>
        <template v-else-if="column.key === 'action'">
          <span>
            <a>Invite 一 {{ record.name }}</a>
            <a-divider type="vertical" />
            <a>Delete</a>
            <a-divider type="vertical" />
            <a class="ant-dropdown-link">
              More actions
              <down-outlined />
            </a>
          </span>
        </template>
      </template>
    </SearchResult>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { COMPONENT_TYPES } from "@/setup/global";
import SearchPanel from "@/components/SearchPanel.vue";
import SearchResult from "@/components/SearchResult.vue";
import dayjs from "dayjs";
import { SmileOutlined, DownOutlined } from "@ant-design/icons-vue";

const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"],
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
];
const options1 = [
  {
    label: "Manager",
    options: [
      {
        value: "jack",
        label: "Jack",
      },
      {
        value: "lucy",
        label: "Lucy",
      },
    ],
  },
  {
    label: "Engineer",
    options: [
      {
        value: "yiminghe",
        label: "Yiminghe",
      },
    ],
  },
];
const options2 = ref([
  {
    value: "jack1",
    label: "Jack",
  },
  {
    value: "lucy",
    label: "Lucy",
  },
  {
    value: "disabled",
    label: "Disabled",
    disabled: true,
  },
  {
    value: "yiminghe",
    label: "Yiminghe",
  },
]);

const searchFields = ref([
  {
    label: "用户名",
    modelValue: "name",
    component: COMPONENT_TYPES.INPUT,
    defaultValue: "张三",
    placeholder: "用户名",
  },
  {
    label: "用户名名",
    modelValue: "name1",
    component: COMPONENT_TYPES.SELECT,
    options: options1,
    placeholder: "用户名",
    onchange: onselectchange,
  },
  {
    label: "用用户名名",
    modelValue: "name2",
    component: COMPONENT_TYPES.SELECT,
    options: options2,
    showSearch: true,
    placeholder: "用户11名",
  },
  {
    label: "用用户名户名",
    modelValue: "name3",
    component: COMPONENT_TYPES.DATE_PICKER,
    placeholder: "日期",
    disabledDate: (current) => {
      return current && current < dayjs().endOf("day");
    },
  },
  {
    label: "用用户名户名",
    modelValue: "name4",
    component: COMPONENT_TYPES.RANGE_PICKER,
    placeholder: ["开始时间", "结束时间"],
    showTime: false,
    componentWidth: 200,
    options: [],
  },
  {
    label: "用户名名",
    modelValue: "name5",
    component: COMPONENT_TYPES.RADIO,
    componentWidth: 250,
    defaultValue: null,
    placeholder: "用户名",
    // optionType:"button",
    options: [
      { label: "全部", value: null },
      { label: "Apple", value: "Apple" },
      { label: "Pear", value: "Pear" },
    ],
  },
  {
    label: "用户名",
    modelValue: "name6",
    component: COMPONENT_TYPES.INPUT,
    defaultValue: 1,
    placeholder: "用户名",
  },
  {
    label: "用户名类型",
    modelValue: "name7",
    component: COMPONENT_TYPES.INPUT,
    defaultValue: 1,
    placeholder: "用户名",
  },
]);
const columns = [
  {
    name: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Tags",
    key: "tags",
    dataIndex: "tags",
  },
  {
    title: "Action",
    key: "action",
  },
];
function onsearch(values) {
  console.log(values);
}

function onselectchange(e) {
  options2.value.push({
    value: "jack1121211",
    label: "Jack121211112",
  });
}
</script>
<style lang="less" scoped></style>
