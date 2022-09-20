const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  // 项目打包之后白屏问题
  publicPath: "./",
  devServer: {
    port: 8888,
    host: "localhost",
    open: true,
    https: false,
    proxy: {
      [process.env.VUE_APP_BASE_API]: {
        target: process.env.VUE_APP_SERVICE_URL,
        changeOrigin: true,
        pathRewrite: {
          ["^" + process.env.VUE_APP_BASE_API]: "",
        },
      },
      // "/dev-api": {
      //   target: "http://localhost:3000",
      //   changeOrigin: true,
      //   pathRewrite: {
      //     "^/dev-api": "",
      //   },
      // },
    },
  },
  lintOnSave: false,
  productionSourceMap: false,
});
