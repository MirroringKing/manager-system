<template>
  <div class="member">
    <!-- 搜索 -->
    <el-form
      :inline="true"
      :model="StaffQueryParams"
      ref="ruleForm"
      class="demo-form-inline"
    >
      <el-form-item prop="linkman">
        <el-input
          v-model="StaffQueryParams.mobile"
          placeholder="账号"
          class="inp"
        ></el-input>
      </el-form-item>
      <el-form-item prop="name">
        <el-input
          v-model="StaffQueryParams.name"
          placeholder="姓名"
          class="inp"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="left" @click="StaffSearch"
          >查询</el-button
        >
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleOpenDialog">新增</el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="StaffresetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 数据 -->
    <el-table :data="StaffList" border style="width: 100%">
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column prop="username" label="账号"> </el-table-column>
      <el-table-column prop="name" label="姓名"> </el-table-column>
      <el-table-column prop="age" label="年龄" width="110"> </el-table-column>
      <el-table-column prop="mobile" label="电话"> </el-table-column>
      <el-table-column prop="salary" label="薪酬"> </el-table-column>
      <el-table-column prop="entryDate" label="入职时间"> </el-table-column>
      <el-table-column fixed="right" label="操作" width="150">
        <template v-slot="scope">
          <el-button
            type="text"
            size="small"
            @click="handleOpenDialog(scope.row.id)"
            >编辑</el-button
          >
          <el-button
            type="text"
            size="small"
            @click="handleDelete(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>

    <!-- 新增和编辑 -->
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogFormVisible"
      width="500px"
    >
      <el-form
        ref="dialogForm"
        :model="dialogFormParams"
        :rules="dialogRules"
        style="width: 400px"
        label-width="120px"
      >
        <el-form-item label="账号" prop="username">
          <el-input
            v-model="dialogFormParams.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input
            v-model="dialogFormParams.name"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input
            v-model="dialogFormParams.age"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input
            v-model="dialogFormParams.mobile"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="酬薪" prop="salary">
          <el-input
            v-model="dialogFormParams.salary"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="入职时间" prop="entryDate">
          <el-date-picker
            value-format="yyyy-MM-dd"
            v-model="dialogFormParams.birthday"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import StaffApi from "../../api/staff";

export default {
  data() {
    return {
      StaffList: [],
      page: 1,
      size: 10,
      total: 10,
      StaffQueryParams: {
        name: "",
        mobile: "",
      },
      // payType: Memberenum.payType,
      dialogFormVisible: false,
      // 保存弹窗表单的数据
      dialogFormParams: {
        name: "",
        mobile: "",
        entryDate: "",
        age: "",
        salary: "",
        username: "",
      },
      // 弹窗标题
      dialogTitle: "员工新增",
      // 弹窗表单的校验规则
      dialogRules: {
        username: [
          { required: true, message: "账号不能为空", trigger: "blur" },
        ],
        name: [{ required: true, message: "姓名不能为空", trigger: "blur" }],
      },
    };
  },
  created() {
    this.getStaffList();
  },
  filters: {
    // filterPayType(value) {
    //   const data = Memberenum.payType.find((item, index) => {
    //     return item.type === value;
    //   });
    //   return data ? data.name : "";
    // },
  },
  methods: {
    async getStaffList() {
      //   const memberList = await MemberApi.getMemberList();
      const { rows, total } = await StaffApi.getStaffList(
        this.page,
        this.size,
        this.StaffQueryParams
      );
      this.total = total;
      this.StaffList = rows;
      console.log(rows);
      console.log(total);
    },
    handleSizeChange(size) {
      console.log(size);
      this.size = size;
      this.getStaffList();
    },
    handleCurrentChange(page) {
      console.log(page);
      this.page = page;
      this.getStaffList();
    },
    // 查找
    StaffSearch() {
      this.page = 1;
      this.getStaffList();
    },
    // 重置
    StaffresetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 删除
    handleDelete(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          try {
            const response = await StaffApi.deleteStaff(id);
            this.$message.success("删除成功");
            this.getStaffList();
          } catch (e) {
            console.log(e.message);
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 打开弹窗
    handleOpenDialog(id) {
      this.dialogFormVisible = true;
      if (typeof id === "number") {
        this.dialogTitle = "供应商编辑";
        this.handleFindStaff(id);
        return;
      }
      this.dialogTitle = "供应商新增";
    },
    // 弹窗的提交方法
    handleSubmit() {
      this.$refs["dialogForm"].validate((valid) => {
        if (!valid) return;
        this.dialogFormParams.id
          ? this.handleEditStaff()
          : this.handleAddStaff();
      });
    },
    // 新增
    async handleAddStaff() {
      try {
        const response = await StaffApi.addStaff(this.dialogFormParams);
        this.StaffresetForm("dialogForm");
        this.dialogFormVisible = false;
        this.$message.success("新增成功");
        this.getStaffList();
      } catch (e) {
        console.log(e.message);
      }
    },
    // 编辑
    async handleEditStaff() {
      try {
        const response = await StaffApi.editStaff(
          this.dialogFormParams.id,
          this.dialogFormParams
        );
        this.StaffresetForm("dialogForm");
        this.dialogFormVisible = false;
        this.$message.success("编辑成功");
        this.getStaffList();
      } catch (e) {
        console.log(e.message);
      }
    },

    // 查看单个会员数据
    async handleFindStaff(id) {
      try {
        const member = await StaffApi.findStaff(id);
        this.dialogFormParams = member;
      } catch (e) {
        console.log(e.message);
      }
    },
    // 弹窗取消
    handleCancel() {
      this.dialogFormVisible = false;
      this.StaffresetForm("dialogForm");
    },
  },
};
</script>

<style lang="scss" scoped>
.member {
  margin-top: 20px;
}
.demo-form-inline {
  .inp {
    width: 160px;
  }
  .left {
    margin-left: 10px;
  }
}
</style>
