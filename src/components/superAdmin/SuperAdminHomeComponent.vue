<template>
  <!--Aside-->
  <el-container style="height: 100%; border: 1px solid #eee; margin-top: -9px">  <!--整个页面中最大的容器-->
    <!--Aside部分-->
    <el-aside :width="aside_width" style="height: 100vh; background-color: rgb(238, 241, 246); margin-left: -9px">  <!--页面中的左侧导航栏-->
      <el-menu
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          default-active="/Home"
          style="height: 100%"
          :collapse="isCollapse"
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
          <div >
            <i :class="collapseIcon" style="font-size: 25px; cursor: pointer" @click="collapse"></i>  <!--给侧边栏控制按钮添加了点击事件，点击就会触发collapse方法-->
          </div>
          <div style="flex:1; text-align: center; font-size: 26px">
            <span>Welcome to RabGenDB</span>
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
      aside_width: '200px',
      isCollapse: false,
      collapseIcon: 'el-icon-s-fold'
    }
  },
  props:{
  },
  methods:{
    collapse(){
      this.isCollapse = !this.isCollapse;
      if(this.isCollapse){
        this.aside_width = '64px';
        this.collapseIcon = 'el-icon-s-unfold';
      }
      else{
        this.aside_width = '200px';
        this.collapseIcon = 'el-icon-s-fold';
      }
    }
  }
}
</script>

<style>

</style>