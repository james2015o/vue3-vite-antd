<template>
  <a-table
    v-bind="$attrs"
    :rowKey="
      (record, index) => {
        return record.id || index; //优先id，其次index
      }
    "
    @resizeColumn="handleResizeColumn"
    :dataSource="data.list"
    :loading="loading"
    bordered
    size="middle"
    :row-class-name="
      (_record, index) => (index % 2 === 1 ? 'table-striped' : null)
    "
    :pagination="false"
    :columns="columnList.filter((c) => c.checked)"
    :row-selection="{
      selectedRowKeys: selectedRowKeys,
      onChange: onSelectChange,
    }"
  >
    <template #title>
      <div style="display: flex; align-items: center; column-gap: 10px">
        <div>总共：{{ data.total }}条</div>
        <div
          style="
            flex: 1;
            display: flex;
            justify-content: flex-end;
            align-items: center;
          "
        >
          <!-- 额外按钮，如新增，导出等 -->
          <slot name="buttons"></slot>
        </div>
        <div style="margin-left: auto">
          <a-tooltip>
            <template #title> 列设置 </template>
            <a-dropdown :trigger="['click']">
              <span
                style="cursor: pointer"
                class="ant-dropdown-link"
                @click.prevent
              >
                <setting-outlined />
              </span>
              <template #overlay>
                <div class="ant-dropdown-menu" style="padding: 4px 10px">
                  <div style="border-bottom: 1px solid #fcfcfc">
                    <holder-outlined style="opacity: 0" /><a-checkbox
                      v-model:checked="checkAll"
                      :indeterminate="indeterminate"
                      @click.stop="oncheckAllClick"
                      >列展示/排序</a-checkbox
                    >
                    <a @click.stop="resetColumns">重置</a>
                  </div>
                  <draggable
                    v-model="columnList"
                    group="columns"
                    @start="drag = true"
                    @end="drag = false"
                    ghost-class="ghost"
                    item-key="dataIndex"
                  >
                    <template #item="{ element }">
                      <div
                        @click.stop
                        v-if="element.title"
                        style="padding: 2px"
                      >
                        <holder-outlined
                          style="cursor: move; margin-right: 2px"
                        />
                        <a-checkbox
                          @change="oncheckboxchange"
                          @click.stop
                          v-model:checked="element.checked"
                          >{{ element.title }}</a-checkbox
                        >
                      </div>
                    </template>
                  </draggable>
                </div>
              </template>
            </a-dropdown>
          </a-tooltip>
        </div>
      </div>
    </template>
    <template #headerCell="{ title, column }">
      <slot name="headerCell" :title="title" :column="column"></slot>
    </template>
    <template
      v-if="columnList.filter((c) => c.checked).length > 0"
      #bodyCell="{ text, record, index, column }"
    >
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
      <a-pagination
        v-model:current="pagination.current"
        v-model:pageSize="pagination.pageSize"
        show-size-changer
        :total="data.total"
        size="smal"
        @showSizeChange="onShowSizeChange"
        @change="onPaginationChange"
      />
    </template>
  </a-table>
</template>
<script setup>
import { SettingOutlined, HolderOutlined } from "@ant-design/icons-vue";
import draggable from "vuedraggable";
import { ref, onMounted, computed, watch } from "vue";

const drag = ref(false);
const indeterminate = ref(false);
const checkAll = ref(true);
const data = ref({});
const pagination = ref({
  current: 1,
  pageSize: 10,
});
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
    default: () => {},
  },
  columns: {
    type: Array,
    default: () => [],
  },
});

const columnList = ref(props.columns);
checkAllColumns();

onMounted(() => {
  if (props.autoLoad) {
    search();
  }
});
const handleResizeColumn = (w, col) => {
  col.width = w;
};
const search = () => {
  // console.log(Object.assign({},props.params,pagination.value) );
  props.api(Object.assign({}, props.params, pagination.value)).then((d) => {
    data.value = d;
  });
};
const onPaginationChange = (current, pageSize) => {
  search();
};
const onShowSizeChange = (c) => {};

const oncheckboxchange = () => {};

function checkAllColumns() {
  columnList.value = columnList.value.map((c) => {
    c.checked = true;
    return c;
  });
}
function uncheckAllColumns() {
  columnList.value = columnList.value.map((c) => {
    if (c.title) {
      c.checked = false;
    }
    return c;
  });
}

const oncheckAllClick = (e) => {
  console.log(e.target.checked);
  if (e.target.checked) {
    checkAllColumns();
  } else {
    uncheckAllColumns();
  }
};
const resetColumns = () => {
  columnList.value = props.columns;
  checkAllColumns();
};

checkAll.value = columnList.value.filter((c) => !c.checked).length === 0;
watch(
  columnList,
  (val) => {
    indeterminate.value =
      val.filter((c) => c.checked && c.title).length !== 0 &&
      val.filter((c) => c.checked).length < val.length;
    console.log(checkAll.value, indeterminate.value);
    checkAll.value = val.filter((c) => !c.checked).length === 0;
  },
  { deep: true }
);

const selectedRowKeys = ref([]);
const selectedRows = ref([]);
const onSelectChange = (keys, rows) => {
  // console.log("selectedRowKeys changed: ", keys);
  selectedRowKeys.value = keys;
  selectedRows.value = rows;
};

defineExpose({
  search,
  selectedRowKeys,
  selectedRows,
});
</script>
<style scoped>
:deep(.table-striped) td {
  background-color: #fafafa;
}
:deep(.ant-table-footer) {
  background-color: #fff;
  display: flex;
  justify-content: flex-end;
}

.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
</style>
