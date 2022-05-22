import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
// 替换当前项目引入样式文件为 CSS Variable 版本：以支持动态切换主题能力。
//https://www.antdv.com/docs/vue/customize-theme-variable-cn
// import 'ant-design-vue/dist/antd.variable.min.css';
 
createApp(App).use(router).use(Antd).mount("#app");
