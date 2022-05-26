<template>
  <a-layout class="main-layout">
    <a-layout-header class="header">
      <Head />
    </a-layout-header>
    <a-layout style="flex: 1; overflow: hidden">
      <a-layout-sider class="layout-side" :collapsed="collapsed">
        <div
          style="
            text-align: center;
            font-size: 16px;
            background-color: white;
            border-bottom: 1px solid #f0f0f0;
            height: 40px;
            line-height: 40px;
          "
          @click="collapsed = !collapsed"
        >
          <MenuUnfoldOutlined v-if="collapsed" style="cursor: pointer" />
          <MenuFoldOutlined v-else style="cursor: pointer" />
        </div>
        <LeftMenu />
      </a-layout-sider>
      <a-layout>
        <div style="background-color: white">
          <MultiTabsVue />
        </div>
        <a-layout-content class="layout-content">
          <div style="background: white; min-height: 100%">
            <router-view v-if="!reload" v-slot="{ Component }">
              <KeepAlive>
                <component :is="Component" style="padding:14px" />
              </KeepAlive>
            </router-view>
          </div>
        </a-layout-content>
        <div style="text-align: center" @click="$goto('/login')">footer</div>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<script setup>
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons-vue";
import LeftMenu from "./modules/LeftMenu.vue";
import Head from "./modules/Head.vue";
import MultiTabsVue from "./modules/MultiTabs.vue";
import { provide, ref } from "vue";

const collapsed = ref(false);
const reload = ref(false);
provide("reload", reload);
</script>
<style lang="less" scoped>
.main-layout {
  height: 100%;
  display: flex;
  flex-direction: column;
  .header {
    background-color: var(--blue);
    display: flex;
    color: white;
  }

  .layout-side {
    width: 200px;
    background-color: white;
    height: 100%;
    overflow: hidden;
    border-right: 1px solid #f0f0f0;
    :deep(.ant-menu-item),
    :deep(.ant-menu-submenu-title) {
      margin-top: 0;
      margin-bottom: 4px;
    }
    :deep(.ant-menu-inline) {
      border: none;
    }
  }
  .layout-side:hover {
    overflow-y: auto;
  }
  .layout-content {
    flex: 1;
    padding: 10px 16px;
    margin: 0;
    min-height: 280px;
    overflow: auto;
  }
  .layout-content:hover {
    overflow: auto;
  }
}
</style>
