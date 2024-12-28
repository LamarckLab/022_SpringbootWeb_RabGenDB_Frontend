<template>
  <!--页面中的大容器-->
  <el-container style="height: 100%; border: 1px solid #eee; margin-top: -9px">
    <!--左侧导航栏-->
    <el-aside :width="aside_width" style="height: 100vh; background-color: rgb(238, 241, 246); margin-left: -9px">
      <el-menu
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          default-active="/Admin/SequenceCheck"
          style="height: 100%"
          :collapse="isCollapse"
          :collapse-transition="false"
          router>

        <!--管理员Home页-->
        <el-menu-item index="/Admin/Home">
          <i class="el-icon-s-home"></i>
          <span slot="title" style="font-size: 16px">Home</span>
        </el-menu-item>

        <!--序列搜索-->
        <el-menu-item index="/Admin/SequenceSearch">
          <i class="el-icon-user-solid"></i>
          <span slot="title" style="font-size: 16px">Sequence Search</span>
        </el-menu-item>

        <!--新序列核查-->
        <el-menu-item index="/Admin/SequenceCheck">
          <i class="el-icon-s-custom"></i>
          <span slot="title" style="font-size: 16px">Sequence Check</span>
        </el-menu-item>

      </el-menu>
    </el-aside>

    <el-container style="height: 100%">

      <!--Header部分-->
      <el-header style="text-align: right; font-size: 12px; border-bottom: darkgray 3px solid">
        <div style="display: flex;line-height: 60px">

          <!--侧边栏的伸缩按钮以及实现-->
          <div >
            <i :class="collapseIcon" style="font-size: 25px; cursor: pointer" @click="collapse"></i>
          </div>

          <!--页面正上方的介绍字体-->
          <div class="header-style" style="flex:1; text-align: center; font-size: 26px">
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


      <el-main style="height: 100%">
        <!--序列表单部分-->
        <div>

          <!--表格主体部分-->
          <el-table
              :data="tableData"
              :header-cell-style="{background: '#F2F5FC', color: '#555555', textAlign: 'center'}"
              border
              :cell-style="{ textAlign: 'center' }"
          >
            <!--表头-->
            <!--Username-->
            <el-table-column prop="accession" label="Accession" width="240">
            </el-table-column>
            <!--Name-->
            <el-table-column prop="collectionCountry" label="Collection Country" width="240">
            </el-table-column>
            <!--Age-->
            <el-table-column prop="collectionDate" label="Collection Date" width="240">
            </el-table-column>
            <!--Country-->
            <el-table-column prop="rawHost" label="Raw Host" width="240">
            </el-table-column>
            <!--Role-->
            <el-table-column prop="refinedHost" label="Refined Host" width="240">
            </el-table-column>
          </el-table>

          <!--分页组件-->
          <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :page-size="pageSize"
              :current-page="pageNum"
              :page-sizes="[5, 10, 20, 50]"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
          </el-pagination>


        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "UserSequenceSearchComponent",
  components: {},
  data(){
    return{
      aside_width: '220px',
      isCollapse: false,
      collapseIcon: 'el-icon-s-fold',
      tableData: [],
      pageNum: 1,
      pageSize: 5,
      total: 0,
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
        this.aside_width = '220px';
        this.collapseIcon = 'el-icon-s-fold';
      }
    },
    toUser(){
      this.$router.push("/User/Home");
    },
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
    init(){
      this.user = JSON.parse(sessionStorage.getItem('userInfo'))
    },
    // 分页器监听页面尺寸
    handleSizeChange(val) {
      this.pageSize = val;
      this.pageNum = 1;
      this.loadPost();
    },
    // 分页器监听页码
    handleCurrentChange(val) {
      this.pageNum = val;
      this.loadPost();
    },
    // 分页查询方法
    loadPost() {
      this.$axios
          .get('http://localhost:9090/listGenomeTempPage', {
            params: {
              pageNum: this.pageNum,
              pageSize: this.pageSize,
            },
          })
          .then((res) => {
            this.tableData = res.data.data;
            this.total = res.data.total;
          });
    },
  },
  created(){
    this.init()
  },
  beforeMount() {
    this.loadPost()
  }
}
</script>

<style>
.el-descriptions {
  width: 90%;
  margin: 0 auto;
  text-align: center;
}
</style>