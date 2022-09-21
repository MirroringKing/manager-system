<template>
  <div class="member-login">
    <div class="menu">
      <h3>会员登录系统</h3>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="账户" prop="username">
          <el-input v-model="ruleForm.username" class="inp"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password" class="inp"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {login} from '../api/user.js'
export default {
  data() {
    return {
      ruleForm: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入账户", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "change" },
        ],
      },
    };
  },
  methods: {
    submitForm() {
      this.$refs["ruleForm"].validate((valid) => {
        if (!valid) return;
        this.handleLogin();
      });
    },
    async handleLogin() {
      try {
        const response = await login(this.ruleForm);
        console.log('token=>',response.token);
      } catch (e) {
        console.log(e.message);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.member-login {
  width: 100%;
  height: 100%;
  background-image: url("../../public/2051313.jpg");
  overflow: hidden;
  background-position: 0 0;
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.menu {
  width: 500px;
  height: 300px;
  background-color: skyblue;
  margin: auto;
  h3 {
    margin-top: 150px;
    margin-left: 200px;
    margin-bottom: 60px;
  }
  .inp {
    width: 350px;
  }
}
</style>
