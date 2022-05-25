<template>
  <a-tabs
    class="header-nav-tabs"
    v-model:activeKey="activeKey"
    type="editable-card"
    hideAdd
    @change="onchange"
    @edit="onedit"
  >
    <a-tab-pane v-for="pane in panes" :key="pane.name" :closable="closable">
      <template #tab>
        <span style="display: flex; align-items: center">
          {{ pane.name }}
          <reload-outlined
            v-if="activeKey === pane.name"
            class="tab-refresh"
            @click="refresh"
          />
        </span>
      </template>
    </a-tab-pane>
  </a-tabs>
</template>
<script setup>
import { computed, getCurrentInstance, inject, nextTick } from "vue";
import { getTabs, removeTab, activeKey } from "../../store/tabs";
import { AppleOutlined, ReloadOutlined } from "@ant-design/icons-vue";
let _this = getCurrentInstance().ctx;

let panes = getTabs();
const closable = computed(() => {
  //如果tab只剩一个就不能再关闭
  return panes.value.length > 1;
});
const onchange = (key) => {
  const find = panes.value.find((p) => p.name === key);
  if (find.fullPath) {
    _this.$goto(find.fullPath);
  }
};

const onedit = (key, action) => {
  if (action == "remove") {
    const index = removeTab(key);

    //如果本删除的是当前tab，返回新的当前tab
    if (key === activeKey.value) {
      const newTab = panes.value[index] || panes.value[index - 1];
      //设置新的
      activeKey.value = newTab.name;
    }
  }
};
const reload = inject("reload");
const refresh = () => {
  reload.value = true;
  nextTick(() => {
    reload.value = false;
  });
};
</script>

<style lang="less" scoped>
.header-nav-tabs {
  :deep(.ant-tabs-nav) {
    margin-bottom: 0lpx;
  }
  :deep(.ant-tabs-tab-active) {
    border-bottom-color: var(--blue) !important ;
  }
  :deep(.ant-tabs-tab-remove) {
    margin-left: 0;
  }
  .tab-refresh {
    margin: 0 0px 0 8px;
    font-size: 12px;
    color: rgba(0, 0, 0, 0.45);
  }
  .tab-refresh:hover {
    color: rgba(0, 0, 0, 0.85);
  }
}
</style>
