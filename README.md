# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

##依赖
vue3,vite,vur-router,axiso,vueuse,antd of vue3,dayjs,less

***
##.env文件
[.evn参考](https://vitejs.dev/guide/env-and-mode.html#env-files)


##http请求 
- **封装axios**
  + 请求拦截
  + 统一消息处理
  + 统一loading处理
  + 封装GET,POST,PUT,DELETE函数

##状态管理
  - token
  - 用户
  - loading
  - tabbar
##路由
  - 路由拦截，登录状态，权限检查
  - 路由成功后，加入tabbar
  - keepAlive

##权限
 - 菜单权限
 - 按钮权限
- 
##Tabbar
- 关闭
- 刷新
  
## 全局setup
 /src/setup/index.js

## Composables
业务代码提炼，代码复用