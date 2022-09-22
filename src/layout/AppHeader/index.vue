<template>
  <div>
    <router-link class="link" to="/">
      <img
        class="logo"
        src="https://img1.baidu.com/it/u=3765568759,3229889963&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1663952400&t=d80475fbea4c8464b1c8a8c7abe56031"
        alt="logo"
        width="25px"
      />
      <span class="company">小新会员管理系统</span>
    </router-link>
    <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link">
        {{ $store.getters.userInfo.name || ""
        }}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item icon="el-icon-edit" command="changePass"
          >修改密码</el-dropdown-item
        >
        <el-dropdown-item icon="el-icon-s-fold" command="logout"
          >退出登录</el-dropdown-item
        >
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  name: "AppHeader",
  methods: {
    handleCommand(command) {
      switch (command) {
        case "changePass":
          this.handleChangePass();
          break;
        case "logout":
          this.handleLogout();
          break;
      }
    },
    handleChangePass() {
      alert("修改密码");
    },
    handleLogout() {
      alert("退出登录");
    },
  },
};
</script>

<style scoped>
.link {
  text-decoration: none;
  color: #fff;
  margin-left: 30px;
}

.logo {
  vertical-align: middle;
}
.company {
  margin-left: 5px;
  vertical-align: middle;
}

.el-dropdown {
  float: right;
  margin-right: 30px;
  color: #fff;
}
</style>
