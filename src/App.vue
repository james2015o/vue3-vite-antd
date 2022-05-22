<template>
  <a-config-provider :locale="zhCN">
    <router-view></router-view>
  </a-config-provider>
</template>

<script setup>
import zhCN from "ant-design-vue/es/locale/zh_CN";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
dayjs.locale("zh-cn");
</script>

<style>
#app {
  width: 100%;
  height: 100%;
}
:root {
  --primary-color: #1e90ff;
  --border-color: #cccccc;
  --green: rgb(15, 199, 21);
  --blue: #1e90ff;
  --white: #ffffff;

  --scroll-track-color: #dddee0;
  --scroll-thumb-color: #1e90ff;
}

* {
  scrollbar-width: 10px;
  scrollbar-color: var(--scroll-track-color) var(--scroll-thumb-color);
}

/* Works on Chrome, Edge, and Safari */
*::-webkit-scrollbar {
  width: 8px;
}
*::-webkit-scrollbar:hover {
  width: 10px;
}
*::-webkit-scrollbar-track {
  background: var(--scroll-track-color);
}

*::-webkit-scrollbar-thumb {
  background-color: var(--scroll-thumb-color);
  border-radius: 5px;
  border: 2px solid #fcfdff;
}
</style>
