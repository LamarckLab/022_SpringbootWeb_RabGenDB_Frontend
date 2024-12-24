<template>
  <!--Aside-->
  <el-container style="height: 100%; border: 1px solid #eee; margin-top: -9px">  <!--整个页面中最大的容器-->
    <!--Aside部分-->
    <el-aside style="height: 100vh; width: 200px; background-color: rgb(238, 241, 246); margin-left: -9px">  <!--页面中的左侧导航栏-->
      <el-menu
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          default-active="/Home"
          style="height: 100%"
          :collapse-transition="false"
          router
      >
        <el-menu-item index="/One">
          <i class="el-icon-s-home"></i>
          <span slot="title" style="font-size: 16px">Option One</span>
        </el-menu-item>

        <el-menu-item index="/Two">
          <i class="el-icon-user-solid"></i>
          <span slot="title" style="font-size: 16px">Option two</span>
        </el-menu-item>

        <el-menu-item index="/Three">
          <i class="el-icon-s-custom"></i>
          <span slot="title" style="font-size: 16px">Option Three</span>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <el-container style="height: 100%">  <!--页面右侧的大容器-->
      <!--Header部分-->
      <el-header style="text-align: right; font-size: 12px; border-bottom: darkgray 3px solid">  <!--页面右侧的header-->
        <div style="display: flex;line-height: 60px">
          <div>
            <i class="el-icon-s-fold" style="font-size: 25px; cursor: pointer"></i>  <!--给侧边栏控制按钮添加了点击事件，点击就会触发collapse方法-->
          </div>
          <div style="flex:1; text-align: center; font-size: 26px">
            <span>Welcome to Lamarck's Warehouse Management System</span>
          </div>
          <el-dropdown>
            <i class="el-icon-user-solid" style="font-size: 25px"></i>
            <span></span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="toUser">Personal Info</el-dropdown-item>
              <el-dropdown-item @click.native="logOut">Quit</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>




    </el-container>




  </el-container>

</template>

<script>


export default {
  name: "SuperAdminHomeComponent",
  components: {},
  data(){
    return{
    }
  },
  props:{
  }
}
</script>

<style>

</style>