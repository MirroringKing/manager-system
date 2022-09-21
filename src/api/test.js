import request from "../utils/request";

const getBanner = () => {
  return request({
    url: "/",
    proxy: process.env["VUE_APP_BASE_V1"],
  });
};

export default {
  getBanner,
};
