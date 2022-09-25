<template>
  <div>
    <el-form :inline="true" ref="ruleForm" :model="GoodsQueryParams" class="demo-form-inline">
      <el-form-item prop="name">
        <el-input
          v-model="GoodsQueryParams.name"
          placeholder="商品名称"
        ></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input
          v-model="GoodsQueryParams.code"
          placeholder="商品编号"
        ></el-input>
      </el-form-item>
      <el-form-item prop="supplierName">
        <el-input
          v-model="GoodsQueryParams.supplierName"
          placeholder="选择供应商"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="left" @click="GoodsSearch"
          >查询</el-button
        >
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleOpenDialog">新增</el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="GoodsresetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 数据 -->
    <el-table :data="GoodsList" border style="width: 100%">
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column prop="name" label="商品名称"> </el-table-column>
      <el-table-column prop="code" label="商品编码"> </el-table-column>
      <el-table-column prop="spec" label="商品规格"> </el-table-column>
      <el-table-column prop="retailPrice" label="零售价"> </el-table-column>
      <el-table-column prop="purchasePrice" label="进货价"> </el-table-column>
      <el-table-column prop="storageNum" label="库存数量"> </el-table-column>
      <el-table-column prop="supplierName" label="供应商"> </el-table-column>
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

    <!-- 表单 -->
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
        <el-form-item label="商品名称" prop="name">
          <el-input
            v-model="dialogFormParams.name"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="商品编码" prop="code">
          <el-input
            v-model="dialogFormParams.code"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="商品规格" prop="spec">
          <el-input
            v-model="dialogFormParams.spec"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="零售价" prop="purchasePrice">
          <el-input
            v-model="dialogFormParams.purchasePrice"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="进货价" prop="retailPrice">
          <el-input
            v-model="dialogFormParams.retailPrice"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="库存数量" prop="storageNum">
          <el-input
            v-model="dialogFormParams.storageNum"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="供应商" prop="supplierName">
          <el-input
            v-model="dialogFormParams.supplierName"
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
import GoodsApi from "../../api/goods";
export default {
  data() {
    return {
      GoodsList: [],
      page: 1,
      size: 10,
      total: 10,
      GoodsQueryParams: {
        code: "",
        name: "",
        supplierName: "",
      },
      dialogFormVisible: false,
      // 保存弹窗表单的数据
      dialogFormParams: {
        name: "",
        code: "",
        purchasePrice: "",
        spec: "",
        storageNum: "",
        supplierName: "",
        retailPrice: "",
      },
      // 弹窗标题
      dialogTitle: "商品新增",
      // 弹窗表单的校验规则
      dialogRules: {
        name: [
          { required: true, message: "商品名称不能为空", trigger: "blur" },
        ],
        code: [
          { required: true, message: "商品编码不能为空", trigger: "blur" },
        ],
        purchasePrice: [
          { required: true, message: "零售价不能为空", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.getGoodsList();
  },
  methods: {
    // 渲染数据
    async getGoodsList() {
      const { rows, total } = await GoodsApi.getGoodsList(
        this.page,
        this.size,
        this.GoodsQueryParams
      );
      this.total = total;
      this.GoodsList = rows;
      console.log(rows);
      console.log(total);
    },
    handleSizeChange(size) {
      this.size = size;
      this.getGoodsList();
    },
    handleCurrentChange(page) {
      this.page = page;
      this.getGoodsList();
    },
    // 查找
    GoodsSearch() {
      this.page = 1;
      this.getGoodsList();
    },
    // 重置
    GoodsresetForm(formName) {
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
            const response = await GoodsApi.deleteGoods(id);
            this.$message.success("删除成功");
            this.getGoodsList();
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
        this.dialogTitle = "商品编辑";
        this.handleFindGoods(id);
        return;
      }
      this.dialogTitle = "商品新增";
    },
    // 弹窗的提交方法
    handleSubmit() {
      this.$refs["dialogForm"].validate((valid) => {
        if (!valid) return;
        this.dialogFormParams.id
          ? this.handleEditGoods()
          : this.handleAddGoods();
      });
    },
    // 新增
    async handleAddGoods() {
      try {
        const response = await GoodsApi.addGoods(this.dialogFormParams);
        this.GoodsresetForm("dialogForm");
        this.dialogFormVisible = false;
        this.$message.success("新增成功");
        this.getGoodsList();
      } catch (e) {
        console.log(e.message);
      }
    },
    // 编辑
    async handleEditGoods() {
      try {
        const response = await GoodsApi.editGoods(
          this.dialogFormParams.id,
          this.dialogFormParams
        );
        this.GoodsresetForm("dialogForm");
        this.dialogFormVisible = false;
        this.$message.success("编辑成功");
        this.getGoodsList();
      } catch (e) {
        console.log(e.message);
      }
    },

    // 查看单个会员数据
    async handleFindGoods(id) {
      try {
        const member = await GoodsApi.findGoods(id);
        this.dialogFormParams = member;
      } catch (e) {
        console.log(e.message);
      }
    },
    // 弹窗取消
    handleCancel() {
      this.dialogFormVisible = false;
      this.GoodsresetForm("dialogForm");
    },
  },
};
</script>

<style lang="scss" scoped>
.demo-form-inline {
  margin-top: 20px;
}
</style>
