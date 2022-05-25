import axios from "axios";
import { message } from "ant-design-vue";
import { ref, watch } from "vue";

const RESPOND_CODE_SUCCESS = 10000; // 成功响应代码
const RESPOND_CODE_SESSION_GONE = 10001; //session过期
const REQUEST_HEARDER_TOKEN = "x-token"; //请求头token名称
//引入响应式loading变量
import loading from "../store/loading";
import { getToken } from "../store/token";

const loadingCount = ref(0);
//监听loading数量
watch(loadingCount, (val) => {
  loading.value = val === 0 ? false : true;
});

axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL;
// 添加请求拦截器
axios.interceptors.request.use(
  function (config) {
    // console.log(config);
    //设置请求头的token
    config.headers[REQUEST_HEARDER_TOKEN] = getToken().value;
    //改请求需要使用loading，不传默认useLoading
    if (config.useLoading === undefined || config.useLoading) {
      loadingCount.value++;
    }
    // 在发送请求之前做些什么
    return config;
  },
  function (error) {
    // console.log(error);
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);
// 添加响应拦截器
axios.interceptors.response.use(
  function (response) {
    if (
      response.config.useLoading === undefined ||
      response.config.useLoading
    ) {
      loadingCount.value--;
    }
    if (response.status == 200) {
      const { code, msg, data } = response.data;
      //响应成功
      if (code === RESPOND_CODE_SUCCESS) {
        if (response.config.okMsg) {
          message.success(response.config.okMsg);
        }
      } else {
        //处理失败
        const errMsg = response.config.errMsg || msg;
        message.error(errMsg);
        //session过期,跳转登录页面
        if (code === RESPOND_CODE_SESSION_GONE) {
          window.location.href = "/login";
        }
      }
      return data;
    }
  },
  function (error) {
    // console.log(error);
    if (error.config.useLoading === undefined || error.config.useLoading) {
      loadingCount.value--;
    }
    message.error(error.message);
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export const GET = (url, params, option) =>
  axios({ url, method: "GET", params, ...option });

export const DELETE = (url, params, option) =>
  axios({ url, method: "DELETE", params, ...option });

export const POST = (url, params, option) => axios.post(url, params, option);
export const PUT = (url, params, option) => axios.put(url, params, option);
