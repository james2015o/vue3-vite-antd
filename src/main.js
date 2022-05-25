import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import setup from "./setup"; //全局配置项

createApp(App).use(router).use(Antd).use(setup).mount("#app");
