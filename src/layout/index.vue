<template>
  <div>
    <el-container>
      <el-header>
        <app-header></app-header>
      </el-header>
      <el-container>
        <el-aside width="230px">
          <app-aside></app-aside>
        </el-aside>
        <el-main>
          <app-main>
            <router-link ></router-link>
          </app-main>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import AppHeader from "./AppHeader/index.vue";
import AppAside from "./AppAside/index.vue";
import AppMain from "./AppMain/index.vue";
export default {
  data() {
    return {};
  },
  components: {
    AppHeader,
    AppAside,
    AppMain,
  },
};
</script>

<style lang="scss" scoped>
.el-container {
  height: 100vh;
}
.el-header {
  height: 50px !important;
  line-height: 50px;
  background-color: #2d3a4b;
  padding: 0;
}

.el-aside {
  background-color: #545c64;
  height: 100%;
}

.el-main {
  background-color: #fff;
  height: 100%;
}
</style>
