<template>
  <div class="member">
    <!-- 搜索 -->
    <el-form
      :inline="true"
      :model="memberQueryParams"
      ref="ruleForm"
      class="demo-form-inline"
    >
      <el-form-item prop="cardNum">
        <el-input
          v-model="memberQueryParams.cardNum"
          placeholder="会员卡号"
          class="inp"
        ></el-input>
      </el-form-item>
      <el-form-item prop="name">
        <el-input
          v-model="memberQueryParams.name"
          placeholder="会员名字"
          class="inp"
        ></el-input>
      </el-form-item>
      <el-form-item prop="payType">
        <el-select
          v-model="memberQueryParams.payType"
          placeholder="支付类型"
          class="inp"
          prop="payType"
        >
          <el-option
            v-for="(item, index) in payType"
            :label="item.name"
            :key="index"
            :value="item.type"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="birthday">
        <el-date-picker
          v-model="memberQueryParams.birthday"
          value-format="yyyy-MM--dd"
          type="date"
          placeholder="出生日期"
          class="inp"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="left" @click="MemberSearch"
          >查询</el-button
        >
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleOpenDialog"
          >新增</el-button
        >
      </el-form-item>
      <el-form-item>
        <el-button @click="MemberresetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 数据 -->
    <el-table :data="memberList" border style="width: 100%">
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column prop="cardNum" label="会员卡号"> </el-table-column>
      <el-table-column prop="name" label="会员姓名"> </el-table-column>
      <el-table-column prop="birthday" label="会员生日"> </el-table-column>
      <el-table-column prop="phone" label="手机号码" width="110">
      </el-table-column>
      <el-table-column prop="integral" label="可用积分"> </el-table-column>
      <el-table-column prop="money" label="开卡金额"> </el-table-column>
      <el-table-column prop="payType" label="支付类型">
        <template v-slot="scope">
          {{ scope.row.payType | filterPayType }}
        </template>
      </el-table-column>
      <el-table-column prop="address" label="会员地址" width="180">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="150">
        <template v-slot="scope">
          <el-button type="text" size="small" @click="handleOpenDialog(scope.row.id)">编辑</el-button>
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
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" width="500px">
      <el-form
        ref="dialogForm"
        :model="dialogFormParams"
        :rules="dialogRules"
        style="width: 400px"
        label-width="120px"
      >
        <el-form-item label="会员卡号" prop="cardNum">
          <el-input
            v-model="dialogFormParams.cardNum"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="会员姓名" prop="name">
          <el-input
            v-model="dialogFormParams.name"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="会员生日" prop="birthday">
          <el-date-picker
            value-format="yyyy-MM-dd"
            v-model="dialogFormParams.birthday"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
          <el-input
            v-model="dialogFormParams.phone"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="开卡金额" prop="money">
          <el-input
            v-model="dialogFormParams.money"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="可用积分" prop="integral">
          <el-input
            v-model="dialogFormParams.integral"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="支付类型" prop="payType">
          <el-select v-model="dialogFormParams.payType" placeholder="支付类型">
            <el-option
              v-for="(item, index) in payType"
              :key="index"
              :label="item.name"
              :value="item.type"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="会员地址" prop="address">
          <el-input
            type="textarea"
            v-model="dialogFormParams.address"
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
import MemberApi from "../../api/member";
import Memberenum from "../../enum/member";

export default {
  data() {
    return {
      memberList: [],
      page: 1,
      size: 10,
      total: 10,
      memberQueryParams: {
        cardNum: "",
        name: "",
        payType: "",
        birthday: "",
      },
      payType: Memberenum.payType,
      dialogFormVisible: false,
      // 保存弹窗表单的数据
      dialogFormParams: {
        cardNum: "",
        name: "",
        payType: "",
        address: "",
        money: "",
        integral: "",
        phone: "",
        birthday: "",
      },
      // 弹窗标题
      dialogTitle: "会员新增",
      // 弹窗表单的校验规则
      dialogRules: {
        cardNum: [{ required: true, message: "卡号不能为空", trigger: "blur" }],
        name: [{ required: true, message: "姓名不能为空", trigger: "blur" }],
        payType: [
          { required: true, message: "支付类型不能为空", trigger: "change" },
        ],
      },
    };
  },
  created() {
    this.getMemberList();
  },
  filters: {
    filterPayType(value) {
      const data = Memberenum.payType.find((item, index) => {
        return item.type === value;
      });
      return data ? data.name : "";
    },
  },
  methods: {
    async getMemberList() {
      //   const memberList = await MemberApi.getMemberList();
      const { rows, total } = await MemberApi.getMemberList(
        this.page,
        this.size,
        this.memberQueryParams
      );
      this.total = total;
      this.memberList = rows;
      console.log(rows);
      console.log(total);
    },
    handleSizeChange(size) {
      console.log(size);
      this.size = size;
      this.getMemberList();
    },
    handleCurrentChange(page) {
      console.log(page);
      this.page = page;
      this.getMemberList();
    },
    // 查找
    MemberSearch() {
      this.page = 1;
      this.getMemberList();
    },
    // 重置
    MemberresetForm(formName) {
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
            const response = await MemberApi.deleteMember(id);
            this.$message.success("删除成功");
            this.getMemberList();
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
        this.dialogTitle = "会员编辑";
        this.handleFindMember(id);
        return;
      }
      this.dialogTitle = "会员新增";
    },
    // 弹窗的提交方法
    handleSubmit() {
      this.$refs["dialogForm"].validate((valid) => {
        if (!valid) return;
        this.dialogFormParams.id
          ? this.handleEditMember()
          : this.handleAddMember();
      });
    },
    // 新增
    async handleAddMember() {
      try {
        const response = await MemberApi.addMember(this.dialogFormParams);
        this.MemberresetForm("dialogForm");
        this.dialogFormVisible = false;
        this.$message.success("新增成功");
        this.getMemberList();
      } catch (e) {
        console.log(e.message);
      }
    },
    // 编辑
    async handleEditMember() {
      try {
        const reqponse = await MemberApi.editMember(this.dialogFormParams.id,this.dialogFormParams);
        this.MemberresetForm("dialogForm");
        this.dialogFormVisible = false;
        this.$message.success("编辑成功");
        this.getMemberList();
      } catch (e) {
        console.log(e.message);
      }
    },
    // 查看单个会员数据
    async handleFindMember(id) {
      try {
        const member = await MemberApi.findMember(id);
        this.dialogFormParams = member;
      } catch (e) {
        console.log(e.message);
      }
    },
    // 弹窗取消
    handleCancel() {
      this.dialogFormVisible = false;
      this.MemberresetForm("dialogForm");
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
