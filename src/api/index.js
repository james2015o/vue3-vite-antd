import axios from "axios";
export default function useDefaultAxios() {
  axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL;
  // 添加请求拦截器
  axios.interceptors.request.use(
    function (config) {
      console.log(config);
      // 在发送请求之前做些什么
      return config;
    },
    function (error) {
      console.log(error);
      // 对请求错误做些什么
      return Promise.reject(error);
    }
  );

  // 添加响应拦截器
  axios.interceptors.response.use(
    function (response) {
      console.log(response);
      // 对响应数据做点什么
      return response;
    },
    function (error) {
      console.log(error);
      // 对响应错误做点什么
      return Promise.reject(error);
    }
  );
}
