<template>
  <div class="uploaderCustomDiv" v-show="showUploder">
    <el-card class="box-card uploaderCustomDivCard" >
    <template #header>
      <div class="card-header">
        <span> 视频上传 </span>
        <el-button-group class="buttonGroups">
          <el-button class="button" type="text">选择视频</el-button>
          <el-button class="button" type="text">选择要绑定的商品</el-button>
          <el-button class="button" type="text" @click="openUploader()" >关闭窗口</el-button>
        </el-button-group>
      </div>
    </template>
    <el-container>
      <el-aside width="200px">
        <el-col :span="12">
          <h5>默认颜色</h5>
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose">
            <el-submenu index="1">
              <template #title>
                <i class="el-icon-location"></i>
                <span>导航一</span>
              </template>
              <el-menu-item-group>
                <template #title>分组一</template>
                <el-menu-item index="1-1">选项1</el-menu-item>
                <el-menu-item index="1-2">选项2</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="分组2">
                <el-menu-item index="1-3">选项3</el-menu-item>
              </el-menu-item-group>
              <el-submenu index="1-4">
                <template #title>选项4</template>
                <el-menu-item index="1-4-1">选项1</el-menu-item>
              </el-submenu>
            </el-submenu>
            <el-menu-item index="2">
              <i class="el-icon-menu"></i>
              <template #title>导航二</template>
            </el-menu-item>
            <el-menu-item index="3" disabled>
              <i class="el-icon-document"></i>
              <template #title>导航三</template>
            </el-menu-item>
            <el-menu-item index="4">
              <i class="el-icon-setting"></i>
              <template #title>导航四</template>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-aside>
      <el-container>
        <el-header>Header</el-header>
        <el-main class="customMainContent">Main</el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </el-card>
  </div>
  <div class="content_page" v-show="!showUploder">
    <el-button type="primary" icon="el-icon-edit" circle @click="openUploader()"></el-button>
  </div>

</template>

<script>
export default {
  data() {
    return {
      showUploder: false
    }
  },
  methods: {
    openUploader() {
      this.showUploder = !this.showUploder;
      let message;
      if (this.showUploder) {
        message = '上传窗口即将展示';
      } else {
        message = '上传窗口即将关闭';
      }
      this.$notify({
        title: '成功',
        message: message,
        type: 'success'
      });
    }
  }
}
</script>

<style lang="less" scoped>
.content_page {
  color: red;
  position: fixed;
  z-index: 100001;
  right: 10px;
  bottom: 10px;

  .content_page_main {
    color: green;
  }

}
.uploaderCustomDiv{
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  width: 100%;
  height: 100%;
  background: white;
  z-index: 99999;
  .uploaderCustomDivCard{
    width: 100%;
    .card-header{
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .buttonGroups{
        min-width: 40%;
        display: flex;
        justify-content: space-between;
      }
    }
    .customMainContent{
      flex-grow: 1;
    }
  }
}
</style>
