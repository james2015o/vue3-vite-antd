<template>
  <div>
    <SearchPanel
      labelWidth="120px"
      :collapse="7"
      :searchFields="searchFields"
      @search="onsearch"
    />

    <SearchTable
      ref="searchTable"
      :columns="columns"
      :params="params"
      :api="userApi.getUerList"
    >
      <template #buttons>
        <div>
          <a-button type="primary" @click="exportExcel" ghost>导出</a-button>
        </div>
      </template>
      <template #emptyText> 暂无数据 </template>
      <template #headerCell="{ column }">
        <template v-if="column.dataIndex === 'name'">
          <span>
            <smile-outlined />
            Name
          </span>
        </template>
      </template>

      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'nickName'">
          <a style="color: red" @click="showUserInfo">
            {{ record.nickName }}
          </a>
        </template>
        <template v-else-if="column.key === 'action'">
          <span>
            <a>Invite 一 {{ record.nickName }}</a>
            <a-divider type="vertical" />
            <a v-permission="222">Delete</a>
          </span>
        </template>
      </template>
    </SearchTable>
    <UserInfo v-model:visible="visible" />
  </div>
</template>
<script setup>
import { ref } from "vue";
import { COMPONENT_TYPES } from "@/setup/global";
import SearchPanel from "@/components/MySearchPanel.vue";
import SearchTable from "@/components/MySearchTable.vue";
import UserInfo from "./UserInfo.vue"
import userApi from "../../api/user";
import dayjs from "dayjs";
import { SmileOutlined, DownOutlined } from "@ant-design/icons-vue";
const searchTable = ref();
const visible = ref(false)
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
    attrs: {
      placeholder: "用户名",
    },
  },
  {
    label: "用户名名",
    modelValue: "name1",
    component: COMPONENT_TYPES.SELECT,
    attrs: {
      options: options1,
      placeholder: "用户名",
      onchange: onselectchange,
    },
  },
  {
    label: "用用户名名",
    modelValue: "name2",
    component: COMPONENT_TYPES.SELECT,
    attrs: { options: options2, showSearch: true, placeholder: "用户11名" },
  },
  {
    label: "用用户名户名",
    modelValue: "name3",
    component: COMPONENT_TYPES.DATE_PICKER,
    defaultValue: ref(dayjs("2015/01/01", "YYYY-MM-DD")),
    attrs: {
      placeholder: "日期",
      disabledDate: (current) => {
        return current && current < dayjs().endOf("day");
      },
    },
  },
  {
    label: "用用户名户名",
    modelValue: "name4",
    component: COMPONENT_TYPES.RANGE_PICKER,
    attrs: {
      width: "260px",
      placeholder: ["开始时间", "结束时间"],
      showTime: false,
      options: [],
    },
  },
  {
    label: "用户名名",
    modelValue: "name51",
    component: COMPONENT_TYPES.RADIO,
    defaultValue: null,
    attrs: {
      width: "260px",
      placeholder: "用户名",
      optionType: "button",
      buttonStyle: "solid",
      options: [
        { label: "全部", value: null },
        { label: "Apple", value: "Apple" },
        { label: "Pear", value: "Pear" },
      ],
    },
  },
  {
    label: "用户名",
    modelValue: "name6",
    component: COMPONENT_TYPES.INPUT,
    defaultValue: 1,
    attrs: { placeholder: "用户名" },
  },
  {
    label: "用户名类型",
    modelValue: "name7",
    component: COMPONENT_TYPES.INPUT,
    defaultValue: 1,
    attrs: { placeholder: "用户名" },
  },
]);
const columns = ref([
  {
    dataIndex: "id",
    title: "id",
    resizable: true,
    width: 150,
  },
  {
    title: "用户名",
    dataIndex: "username",
    resizable: true,
    width: 150,
    sorter: true,
    customRender: (text, record) => {
      return text.value + "先生";
    },
  },
  {
    title: "昵称",
    dataIndex: "nickName",
    resizable: true,
    width: 100,
    minWidth: 100,
    maxWidth: 200,
    customRender: (text, record) => {
      return text + "先生";
    },
  },
  {
    title: "手机",
    dataIndex: "mobile",
  },
  {
    title: "地址",
    dataIndex: "address",
    ellipsis: true,
    resizable: true,
    width: 150,
  },
  {
    title: "部门",
    dataIndex: "dept",
  },
  {
    title: "操作",
    key: "action",
  },
]);

const params = ref();
async function onsearch(values) {
  params.value = values;
  searchTable.value.search();
}

function onselectchange(e) {
  options2.value.push({
    value: "jack1121211",
    label: "Jack121211112",
  });
}

function exportExcel() {
  console.log(searchTable.value.selectedRows);
}

function showUserInfo(){
  console.log(1,visible)
  visible.value = true
  console.log(2,visible)
}
</script>
<style lang="less" scoped></style>
