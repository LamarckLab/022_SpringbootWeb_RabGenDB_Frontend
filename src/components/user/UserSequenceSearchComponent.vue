<template>
  <!--整个页面的大容器-->
  <el-container style="height: 100%; border: 1px solid #eee; margin-top: -9px">
    <!--左侧导航栏-->
    <el-aside :width="aside_width" style="height: 100vh; background-color: rgb(238, 241, 246); margin-left: -9px">
      <el-menu
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          default-active="/User/SequenceSearch"
          style="height: 100%"
          :collapse="isCollapse"
          :collapse-transition="false"
          router>

        <!--管理员Home导航栏-->
        <el-menu-item index="/User/Home">
          <i class="el-icon-s-home"></i>
          <span slot="title" style="font-size: 16px">Home</span>
        </el-menu-item>

        <!--RABV Overview导航栏-->
        <el-menu-item index="/User/RabiesOverview">
          <i class="el-icon-info"></i>
          <span slot="title" style="font-size: 16px">RABV Overview</span>
        </el-menu-item>

        <!--Sequence Search导航栏-->
        <el-menu-item index="/User/SequenceSearch">
          <i class="el-icon-search"></i>
          <span slot="title" style="font-size: 16px">Sequence Search</span>
        </el-menu-item>

        <!--Sequence Submit导航栏-->
        <el-menu-item index="/User/SequenceSubmit">
          <i class="el-icon-upload"></i>
          <span slot="title" style="font-size: 16px">Sequence Submit</span>
        </el-menu-item>

        <!--Notifications导航栏-->
        <el-menu-item index="/User/Notifications">
          <i class="el-icon-bell"></i>
          <span slot="title" style="font-size: 16px">Notifications</span>
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
          <div style="flex:1; text-align: center; font-size: 32px">
            <span style="font-weight: bold;font-family: 'Calibri';">RABV Genome DataBase</span>
          </div>

          <!--页面右上角的下拉菜单-->
          <el-dropdown>
            <i class="el-icon-user-solid" style="font-size: 25px"></i>
            <span>{{user.username}}</span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="toInfoSetting">Info Setting</el-dropdown-item>
              <el-dropdown-item @click.native="logOut">Quit</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>


      <el-main style="height: 100%">
        <!--序列表单部分-->
        <div>
          <div style="margin-bottom: 20px">

            <!--Accession精确搜索输入框-->
            <el-input v-model="searchAccession" placeholder="Enter accession please" style="width: 200px" suffix-icon="el-icon-search"
                      @keyup.enter.native="preciseSearch"></el-input>

            <!--精确搜索按钮-->
            <el-button type="danger" style="margin-left: 10px; font-weight: bold" @click="preciseSearch">Precise Search</el-button>

            <!--Collection_country模糊搜索输入框-->
            <el-input v-model="searchCountry" placeholder="Enter Collection Country please" style="width: 260px; margin-left: 100px" suffix-icon="el-icon-search"
                      @keyup.enter.native="flexSearch"></el-input>

            <!--Host模糊搜索输入框-->
            <el-input v-model="searchHost" placeholder="Enter Host please" style="width: 160px; margin-left: 10px" suffix-icon="el-icon-search"
                      @keyup.enter.native="flexSearch"></el-input>

            <!--模糊搜索按钮-->
            <el-button type="primary" style="margin-left: 10px" @click="flexSearch">FlexSearch</el-button>

            <!--重置按钮-->
            <el-button type="success" @click="resetParam">Reset</el-button>
          </div>

          <!--表格主体部分-->
          <el-table
              :data="tableData"
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
            <!--Refined Host-->
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

  data(){
    return{
      aside_width: '220px',
      isCollapse: false,
      collapseIcon: 'el-icon-s-fold',
      tableData: [],
      pageNum: 1,
      pageSize: 10,
      total: 0,
      searchAccession:'',
      searchCountry:'',
      searchHost:'',
    }
  },

  methods:{
    // 侧边栏的伸缩方法
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
    toInfoSetting(){
      this.$router.push("/User/InfoSetting");
    },
    // 退出登录的方法
    logOut(){
      this.$confirm('Sure to quit?', '', {
        confirmButtonText: 'Quit',
        cancelButtonText: 'Cancel',
        type: 'warning',
        center: true,
      })
          .then(() => {
            this.$message({
              type:'success',
              message:'Quit successfully'
            })
            sessionStorage.removeItem("userInfo");
            this.$router.push("/");
          })
          .catch(() => {
            this.$message({
              type:'info',
              message:'Cancelled'
            })
          })
    },
    // 初次加载页面时会调用的一个方法
    init(){
      this.user = JSON.parse(sessionStorage.getItem('userInfo'))
    },
    // 分页器监听页面尺寸
    handleSizeChange(val) {
      this.pageSize = val;
      this.pageNum = 1;
      this.flexSearch();
    },
    // 分页器监听页码
    handleCurrentChange(val) {
      this.pageNum = val;
      this.flexSearch();
    },
    // Reset按钮绑定的事件，用于重置参数
    resetParam(){
      this.searchAccession = '';
      this.searchCountry = '';
      this.searchHost = '';
    },
    // 根据Accession进行精确搜索的方法
    preciseSearch(){
      this.$axios
          .get('/genomePreciseSearchPage', {
            params: {
              pageNum: this.pageNum,
              pageSize: this.pageSize,
              accession: this.searchAccession,
            },
          })
          .then((res) => {
            this.tableData = res.data.data;
            this.total = res.data.total;
          });
    },
    // 根据Collection Country和Host进行模糊搜索的方法
    flexSearch(){
      this.$axios
          .get('/genomeFlexSearchPage', {
            params: {
              pageNum: this.pageNum,
              pageSize: this.pageSize,
              country: this.searchCountry,
              refinedHost: this.searchHost,
            },
          })
          .then((res) => {
            this.tableData = res.data.data;
            this.total = res.data.total;
          });
    }
  },
  created(){
    this.init();
  },
  beforeMount() {
    this.flexSearch();
  }
}
</script>

<style>

</style>