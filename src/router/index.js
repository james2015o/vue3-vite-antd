import { createRouter, createWebHistory } from "vue-router";
import { getUser } from "../store/user";
import { addTab, clearTab, activeKey } from "../store/tabs";
import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";

import MainLayout from "@/layout/MainLayout.vue";
//name 和 path 需要唯一
const routes = [
  {
    path: "/",
    name: "MainLayout",
    component: MainLayout,
    redirect: "/workplace",
    children: [
      {
        path: "home",
        name: "首页",
        component: Home,
        meta: { keepAlive: true },
      },
      {
        path: "task",
        name: "任务列表",
        component: () => import("@/views/Task.vue"),
        meta: { keepAlive: true },
      },
      {
        path: "workplace",
        name: "工作台",
        component: () => import("@/views/Workplace.vue"),
      },
      {
        path: "user",
        name: "用户管理",
        component: () => import("@/views/user/User.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

//路由拦截
router.beforeEach(async (to, from, next) => {
  if (to.name !== "Login") {
    const user = await getUser();
    // console.log(user.value);
    //用户不存在就跳登录页面
    if (!user.value.id) {
      next({ path: "/login" });
    } else {
      next();
    }
  }

  next();
});
//把路由加入tabs
router.afterEach((to, from) => {
  // console.log(to);
  addTab(to);
  //新加入的路由设为当前tab
  activeKey.value = to.name;
  if (to.path === "/login") {
    clearTab();
  }
});
export default router;
