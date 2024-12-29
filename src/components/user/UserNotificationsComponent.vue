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
          default-active="/User/Notifications"
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

        <!--Notifications导航栏-->
        <el-menu-item index="/User/Notifications">
          <i class="el-icon-s-custom"></i>
          <span slot="title" style="font-size: 16px">Notifications</span>
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


      <!--这个部分是用户提交的新序列申请-->
      <div style="margin-top: 20px">
        <span style="margin-left: 30px; font-weight: bold; font-size: 20px">Waiting for check</span>
        <div style="margin-top: 15px"></div>
        <!--表格主体部分-->
        <el-table
            :data="tableData1"
            :header-cell-style="{background: '#F2F5FC', color: '#555555', textAlign: 'center'}"
            border
            :cell-style="{ textAlign: 'center' }"
        >
          <!--表头-->
          <!--Accession-->
          <el-table-column prop="accession" label="Accession" width="240">
          </el-table-column>
          <!--Collection Country-->
          <el-table-column prop="collectionCountry" label="Collection Country" width="240">
          </el-table-column>
          <!--Collection Date-->
          <el-table-column prop="collectionDate" label="Collection Date" width="240">
          </el-table-column>
          <!--Raw Host-->
          <el-table-column prop="rawHost" label="Raw Host" width="240">
          </el-table-column>
        </el-table>
      </div>


      <!--这个部分是被打回的申请-->
      <div style="margin-top: 50px">
        <span style="margin-left: 30px; font-weight: bold; font-size: 20px">Rejected applications</span>
        <div style="margin-top: 15px"></div>
        <!--表格主体部分-->
        <el-table
            :data="tableData2"
            :header-cell-style="{background: '#F2F5FC', color: '#555555', textAlign: 'center'}"
            border
            :cell-style="{ textAlign: 'center' }"
        >
          <!--表头-->
          <!--Accession-->
          <el-table-column prop="accession" label="Accession" width="240">
          </el-table-column>
          <!--Collection Country-->
          <el-table-column prop="collectionCountry" label="Collection Country" width="240">
          </el-table-column>
          <!--Collection Date-->
          <el-table-column prop="collectionDate" label="Collection Date" width="240">
          </el-table-column>
          <!--Raw Host-->
          <el-table-column prop="rawHost" label="Raw Host" width="240">
          </el-table-column>
        </el-table>
      </div>


      <!--这个部分是以及通过的申请-->
      <div style="margin-top: 50px">
        <span style="margin-left: 30px; font-weight: bold; font-size: 20px">Accepted application</span>
        <div style="margin-top: 15px"></div>
        <!--表格主体部分-->
        <el-table
            :data="tableData3"
            :header-cell-style="{background: '#F2F5FC', color: '#555555', textAlign: 'center'}"
            border
            :cell-style="{ textAlign: 'center' }"
        >
          <!--表头-->
          <!--Accession-->
          <el-table-column prop="accession" label="Accession" width="240">
          </el-table-column>
          <!--Collection Country-->
          <el-table-column prop="collectionCountry" label="Collection Country" width="240">
          </el-table-column>
          <!--Collection Date-->
          <el-table-column prop="collectionDate" label="Collection Date" width="240">
          </el-table-column>
          <!--Raw Host-->
          <el-table-column prop="rawHost" label="Raw Host" width="240">
          </el-table-column>
        </el-table>
      </div>

    </el-container>
  </el-container>
</template>


<script>


export default {
  name: "UserNotificationsComponent",
  components: {},
  data(){
    return{
      aside_width: '220px',
      isCollapse: false,
      collapseIcon: 'el-icon-s-fold',
      tableData1: [],
      tableData2: [],
      tableData3: [],

    }
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
    },
    // Waiting for check
    waitingForCheck(){
      this.$axios
          .get('http://localhost:9090/sequenceWaitingForCheck', {
            params: {
              pageNum: this.pageNum,
              pageSize: this.pageSize,
              username: JSON.parse(sessionStorage.getItem('userInfo')).username,
            },
          })
          .then((res) => {
            this.tableData1 = res.data.data;
            this.total = res.data.total;
          });
    },
    // Rejected Applications
    rejectedApplications(){
      this.$axios
          .get('http://localhost:9090/rejectedApplications', {
            params: {
              pageNum: this.pageNum,
              pageSize: this.pageSize,
              username: JSON.parse(sessionStorage.getItem('userInfo')).username,
            },
          })
          .then((res) => {
            this.tableData2 = res.data.data;
            this.total = res.data.total;
          });
    },
    // Accepted Applications
    acceptedApplications(){
      this.$axios
          .get('http://localhost:9090/acceptedApplications', {
            params: {
              pageNum: this.pageNum,
              pageSize: this.pageSize,
              username: JSON.parse(sessionStorage.getItem('userInfo')).username,
            },
          })
          .then((res) => {
            this.tableData3 = res.data.data;
            this.total = res.data.total;
          });
    }
  },
  created(){
    this.init()
  },
  beforeMount() {
    this.waitingForCheck();
    this.rejectedApplications();
    this.acceptedApplications();
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