<template>
  <div class="member">
    <!-- 搜索 -->
    <el-form :inline="true" :model="memberQueryParams" class="demo-form-inline">
      <el-form-item>
        <el-input
          v-model="memberQueryParams.cardNum"
          placeholder="会员卡号"
          class="inp"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="memberQueryParams.name"
          placeholder="会员名字"
          class="inp"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-select
          v-model="memberQueryParams.payType"
          placeholder="支付类型"
          class="inp"
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
      <el-date-picker
        v-model="memberQueryParams.birthday"
        value-format="yyyy-MM--dd"
        type="date"
        placeholder="出生日期"
        class="inp"
      >
      </el-date-picker>
      <el-form-item>
        <el-button type="primary" class="left" @click="MemberSearch">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">新增</el-button>
      </el-form-item>
      <el-form-item>
        <el-button>重置</el-button>
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
          <el-button type="text" size="small">编辑</el-button>
          <el-button type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
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
      total: 0,
      memberQueryParams: {
        cardNum: "",
        name: "",
        payType: "",
        birthday: "",
      },
      payType: Memberenum.payType,
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
        this.size
        // this.memberQueryParams
      );
      this.total = total;
      this.memberList = rows;
      console.log(rows);
    },
    handleSizeChange(val) {
      this.size = val;
      this.getMemberList();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getMemberList();
    },
    // 查找
    MemberSearch(){
      this.page = 1
      this.getMemberList()
    }
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
