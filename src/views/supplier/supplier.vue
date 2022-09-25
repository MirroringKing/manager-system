<template>
  <div class="member">
    <!-- 搜索 -->
    <el-form
      :inline="true"
      :model="SupplierQueryParams"
      ref="ruleForm"
      class="demo-form-inline"
    >
      <el-form-item prop="linkman">
        <el-input
          v-model="SupplierQueryParams.linkman"
          placeholder="供应商名称"
          class="inp"
        ></el-input>
      </el-form-item>
      <el-form-item prop="name">
        <el-input
          v-model="SupplierQueryParams.name"
          placeholder="联系人"
          class="inp"
        ></el-input>
      </el-form-item>
      <el-form-item prop="mobile">
        <el-input
          v-model="SupplierQueryParams.mobile"
          placeholder="联系电话"
          class="inp"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="left" @click="SupplierSearch"
          >查询</el-button
        >
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleOpenDialog">新增</el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="SupplierresetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 数据 -->
    <el-table :data="SupplierList" border style="width: 100%">
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column prop="name" label="供应商名称"> </el-table-column>
      <el-table-column prop="linkman" label="联系人"> </el-table-column>
      <el-table-column prop="mobile" label="联系电话" width="110">
      </el-table-column>
      <el-table-column prop="remark" label="备注"> </el-table-column>
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
        <el-form-item label="供应商新增" prop="name">
          <el-input
            v-model="dialogFormParams.name"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="联系人" prop="linkman">
          <el-input
            v-model="dialogFormParams.linkman"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="mobile">
          <el-input
            v-model="dialogFormParams.mobile"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input
            v-model="dialogFormParams.remark"
            autocomplete="off"
          ></el-input>
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
import SupplierApi from "../../api/supplier";

export default {
  data() {
    return {
      SupplierList: [],
      page: 1,
      size: 10,
      total: 10,
      SupplierQueryParams: {
        name: "",
        linkman: "",
        mobile: "",
      },
      // payType: Memberenum.payType,
      dialogFormVisible: false,
      // 保存弹窗表单的数据
      dialogFormParams: {
        name: "",
        linkman: "",
        mobile: "",
        remark: "",
      },
      // 弹窗标题
      dialogTitle: "供应商新增",
      // 弹窗表单的校验规则
      dialogRules: {
        linkman: [
          { required: true, message: "联系人不能为空", trigger: "blur" },
        ],
        name: [{ required: true, message: "供应商不能为空", trigger: "blur" }],
      },
    };
  },
  created() {
    this.getSupplierList();
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
    async getSupplierList() {
      //   const memberList = await MemberApi.getMemberList();
      const { rows, total } = await SupplierApi.getSupplierList(
        this.page,
        this.size,
        this.SupplierQueryParams
      );
      this.total = total;
      this.SupplierList = rows;
      console.log(rows);
      console.log(total);
    },
    handleSizeChange(size) {
      console.log(size);
      this.size = size;
      this.getSupplierList();
    },
    handleCurrentChange(page) {
      console.log(page);
      this.page = page;
      this.getSupplierList();
    },
    // 查找
    SupplierSearch() {
      this.page = 1;
      this.getSupplierList();
    },
    // 重置
    SupplierresetForm(formName) {
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
            const response = await SupplierApi.deleteSupplier(id);
            this.$message.success("删除成功");
            this.getSupplierList();
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
        this.handleFindSupplier(id);
        return;
      }
      this.dialogTitle = "供应商新增";
    },
    // 弹窗的提交方法
    handleSubmit() {
      this.$refs["dialogForm"].validate((valid) => {
        if (!valid) return;
        this.dialogFormParams.id
          ? this.handleEditSupplier()
          : this.handleAddSupplier();
      });
    },
    // 新增
    async handleAddSupplier() {
      try {
        const response = await SupplierApi.addSupplier(this.dialogFormParams);
        this.SupplierresetForm("dialogForm");
        this.dialogFormVisible = false;
        this.$message.success("新增成功");
        this.getSupplierList();
      } catch (e) {
        console.log(e.message);
      }
    },
    // 编辑
    async handleEditSupplier() {
      try {
        const response = await SupplierApi.editSupplier(
          this.dialogFormParams.id,
          this.dialogFormParams
        );
        this.SupplierresetForm("dialogForm");
        this.dialogFormVisible = false;
        this.$message.success("编辑成功");
        this.getSupplierList();
      } catch (e) {
        console.log(e.message);
      }
    },

    // 查看单个会员数据
    async handleFindSupplier(id) {
      try {
        const member = await SupplierApi.findSupplier(id);
        this.dialogFormParams = member;
      } catch (e) {
        console.log(e.message);
      }
    },
    // 弹窗取消
    handleCancel() {
      this.dialogFormVisible = false;
      this.SupplierresetForm("dialogForm");
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
