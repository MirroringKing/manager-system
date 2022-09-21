// eslint-disable-next-line prettier/prettier
import axios from "axios";

// 创建axios配置
const service = axios.create({
  timeout: 5000,
});

// 请求拦截器
service.interceptors.request.use(function (config) {
  return config;
}),
  // eslint-disable-next-line prettier/prettier
    function (error) {
    // eslint-disable-next-line prettier/prettier
        return Promise.reject(error);
  };

// 响应拦截器
service.interceptors.response.use(function (response) {
  return response;
}),
  function (error) {
    return Promise.reject(error);
  };

// 解决不同请求时候统一使用data来进行传参
const request = (options) => {
  options.method = options.method || "get";
  if (options.method.toLocaleLowerCase() === "get") {
    options.params = options.data || options.params;
    delete options.data;
  }
  // 解决多个代理请求的问题
  service.defaults.baseURL = options.proxy || process.env.VUE_APP_BASE_API;

  return service(options);
}
// 导出实例对象
export default request;
