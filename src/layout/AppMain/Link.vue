<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item class="item" :to="{ path: '/' }">
        {{breadcrumbText}}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed:{
    breadcrumbText(){
        return this.$route.meta.title
    }
  }
};
</script>

<style lang="scss" scoped>
.el-breadcrumb{
  height : 10px;
  padding: 20px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
}
.item{
  border-left:3px solid skyblue;
  padding-left:10px;
}
</style>
