<template>
  <!--整个页面的大容器-->
  <el-container style="height: 100%; border: 1px solid #eee; margin-top: -9px">
    <!--侧边栏-->
    <el-aside :width="aside_width" style="height: 100vh; background-color: rgb(238, 241, 246); margin-left: -9px">
      <!--侧边栏参数-->
      <el-menu
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          default-active="/User/Home"
          style="height: 100%"
          :collapse="isCollapse"
          :collapse-transition="false"
          router>

        <!--Home导航栏-->
        <el-menu-item index="/User/Home">
          <i class="el-icon-s-home"></i>
          <span slot="title" style="font-size: 16px">Home</span>
        </el-menu-item>

        <!--RABV Overview导航栏-->
        <el-menu-item index="/User/RabiesOverview">
          <i class="el-icon-user-solid"></i>
          <span slot="title" style="font-size: 16px">RABV Overview</span>
        </el-menu-item>

        <!--Sequence Search导航栏-->
        <el-menu-item index="/User/SequenceSearch">
          <i class="el-icon-s-custom"></i>
          <span slot="title" style="font-size: 16px">Sequence Search</span>
        </el-menu-item>

        <!--Sequence Submit导航栏-->
        <el-menu-item index="/User/SequenceSubmit">
          <i class="el-icon-s-custom"></i>
          <span slot="title" style="font-size: 16px">Sequence Submit</span>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <el-container style="height: 100%">  <!--页面右侧大容器-->

      <!--Header部分-->
      <el-header style="text-align: right; font-size: 12px; border-bottom: darkgray 3px solid">
        <div style="display: flex;line-height: 60px">

          <!--侧边栏的伸缩按钮以及实现-->
          <div >
            <i :class="collapseIcon" style="font-size: 25px; cursor: pointer" @click="collapse"></i>
          </div>

          <!--页面正上方的介绍字体-->
          <div style="flex:1; text-align: center; font-size: 26px">
            <span>RABV Genome DataBase</span>
          </div>

          <!--页面右上角的下拉菜单-->
          <el-dropdown>
            <i class="el-icon-user-solid" style="font-size: 25px"></i>
            <span>{{user.username}}</span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="toUser">Personal Info</el-dropdown-item>
              <el-dropdown-item @click.native="logOut">Quit</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>

      <!--个人主页的核心部分-->
      <div style="text-align: center;height: 100%;padding: 0px; margin: 0px;">

        <!--欢迎字样-->
        <h1 style="font-size: 50px;">{{'Welcome！'+user.username}}</h1>

        <!--个人信息表单-->
        <el-descriptions  title="Personal Info Sheet" :column="2" size="40" border>
-
          <!--Username-->
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-s-custom"></i>
              Username
            </template>
            {{user.username}}
          </el-descriptions-item>

          <!--Telephone-->
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-mobile-phone"></i>
              Telephone
            </template>
            {{user.telephone}}
          </el-descriptions-item>

          <!--Country-->
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-location-outline"></i>
              Country
            </template>
            {{user.country}}
          </el-descriptions-item>

          <!--Role-->
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-tickets"></i>
              Role
            </template>
            <el-tag
                type="success"
                disable-transitions>{{user.role==0?"Super Administrator":(user.role==1?"Administrator":"User")}}</el-tag>
          </el-descriptions-item>
        </el-descriptions>
      </div>
    </el-container>
  </el-container>
</template>

<script>


export default {
  name: "UserHomeComponent",
  components: {},
  data(){
    return{
      aside_width: '220px',
      isCollapse: false,
      collapseIcon: 'el-icon-s-fold',
    }
  },
  props:{
  },
  methods:{
    // 侧边栏实现伸缩的方法
    collapse(){
      this.isCollapse = !this.isCollapse;
      if(this.isCollapse){
        this.aside_width = '64px';
        this.collapseIcon = 'el-icon-s-unfold';
      }
      else{
        this.aside_width = '220px';
        this.collapseIcon = 'el-icon-s-fold';
      }
    },
    // 跳转到home页的方法
    toUser(){
      this.$router.push("/User/Home");
    },
    // 退出到登录页的方法
    logOut(){
      this.$confirm('Sure to quit?', '', {
        confirmButtonText: 'Quit',  //确认按钮的文字显示
        cancelButtonText: 'Cancel',
        type: 'warning',
        center: true, //文字居中显示
      })
          .then(() => {
            this.$message({
              type:'success',
              message:'Quit successfully'
            })
            // 清除 sessionStorage 中的用户信息
            sessionStorage.removeItem("userInfo"); //  当用户退出时, 清除sessionStorage
            this.$router.push("/"); // 返回登录页面
          })
          .catch(() => {
            this.$message({
              type:'info',
              message:'Cancelled'
            })
          })
    },
    // 初次加载界面的时候, 读取登录用户的userInfo
    init(){
      this.user = JSON.parse(sessionStorage.getItem('userInfo'))
    }
  },
  created(){
    this.init()
  }
}
</script>

<style  scoped>
.el-descriptions {
  width: 90%;
  margin: 0 auto;
  text-align: center;
}
</style>