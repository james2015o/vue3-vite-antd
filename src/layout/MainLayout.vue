<template>
  <a-layout class="main-layout">
    <a-layout-header class="header">
      <div class="logo">后台管理系统</div>
    </a-layout-header>
    <a-layout style="flex: 1; overflow: hidden">
      <a-layout-sider class="layout-side" :collapsed="collapsed">
        <div
          style="text-align: center; font-size: 16px; background-color: #f0f2f5"
          @click="collapsed = !collapsed"
        >
          <MenuUnfoldOutlined v-if="collapsed" />
          <MenuFoldOutlined v-else />
        </div>
        <LeftMenu />
      </a-layout-sider>
      <a-layout style="padding: 0 24px 24px">
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item>Home</a-breadcrumb-item>
          <a-breadcrumb-item>List</a-breadcrumb-item>
          <a-breadcrumb-item>App</a-breadcrumb-item>
        </a-breadcrumb>
        <a-layout-content
          :style="{
            background: '#fff',
            padding: '24px',
            margin: 0,
            minHeight: '280px',
          }"
        >
          <router-view></router-view>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<script setup>
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons-vue";
import LeftMenu from "./modules/LeftMenu.vue";
import { ref } from "vue";
const collapsed = ref(false);
</script>
<style lang="less" scoped>
.main-layout {
  height: 100%;
  display: flex;
  flex-direction: column;
  .header {
    background-color: var(--blue);
    .logo {
      color: white;
      font-size: 24px;
    }
  }

  .layout-side {
    width: 200px;
    background-color: white;
    height: 100%;
    overflow: hidden;

    /deep/.ant-menu-item,/deep/.ant-menu-submenu-title {
      margin-top: 0 ;
      margin-bottom: 4px;
    }
  }
  .layout-side:hover {
    overflow: auto;
  }
}
</style>
