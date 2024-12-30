<template>
  <!--整个页面中最大的容器-->
  <el-container style="height: 100%; border: 1px solid #eee; margin-top: -9px">
    <!--左侧导航栏-->
    <el-aside :width="aside_width" style="height: 100vh; background-color: rgb(238, 241, 246); margin-left: -9px">
      <el-menu
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          default-active="/SuperAdmin/Authority"
          style="height: 100%"
          :collapse="isCollapse"
          :collapse-transition="false"
          router>

        <!--导航栏 1-->
        <el-menu-item index="/SuperAdmin/Home">
          <i class="el-icon-s-home"></i>
          <span slot="title" style="font-size: 16px">Home</span>
        </el-menu-item>

        <!--导航栏 2-->
        <el-menu-item index="/SuperAdmin/Manage">
          <i class="el-icon-user-solid"></i>
          <span slot="title" style="font-size: 16px">User Info Manage</span>
        </el-menu-item>

        <!--导航栏 3-->
        <el-menu-item index="/SuperAdmin/Authority">
          <i class="el-icon-s-custom"></i>
          <span slot="title" style="font-size: 16px">Authority Manage</span>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <el-container style="height: 100%">  <!--页面右侧的大容器-->

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



      <el-main style="height: 100%">
        <!--用户表单部分-->
        <div>
          <div style="margin-bottom: 20px">

            <!--姓名输入搜索框-->
            <el-input v-model="searchUsername" placeholder="Enter username please" style="width: 200px" suffix-icon="el-icon-search"
                      @keyup.enter.native="loadPost"></el-input>

            <!--国家输入搜索框-->
            <el-input v-model="searchCountry" placeholder="Enter Country please" style="width: 200px" suffix-icon="el-icon-search"
                      @keyup.enter.native="loadPost"></el-input>

            <!--搜索按钮-->
            <el-button type="primary" style="margin-left: 10px" @click="loadPost">Search</el-button>
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
            <!--Username-->
            <el-table-column prop="username" label="Username" width="300">
            </el-table-column>
            <!--Country-->
            <el-table-column prop="country" label="Country" width="300">
            </el-table-column>
            <!--Role-->
            <el-table-column prop="role" label="Role" width="300">
              <!--三种角色类型分别映射成为三种彩色标签-->
              <template slot-scope="scope">
                <el-tag
                    :type="scope.row.role == '0' ? 'danger' : (scope.row.role == '1' ? 'warning' : 'info')"
                    disable-transitions>{{scope.row.role == '0' ? 'Super Admin' : (scope.row.role == '1' ? 'Admin' : 'User')}}</el-tag>
              </template>
            </el-table-column>

            <!--Operate-->
            <el-table-column prop="operate" label="Authority Management" width="300">
              <!--这里的插槽标签用于访问此行的内容-->
              <template slot-scope="scope">
                <!--编辑按钮-->
                <el-button type="warning" size="medium" @click="editUser(scope.row)">Edit</el-button>
              </template>
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


          <!--点击Edit按钮后弹出来的表单-->
          <el-dialog
              title="User Information Edit Sheet"
              :visible.sync="centerDialogVisible"
              width="40%"
              center>
            <!--表单的属性部分-->
            <el-form ref="form" :model="editForm" label-width="100px">
              <!--Username输入框-->
              <el-form-item label="Username :">
                <el-col :span="18">
                  <span>{{this.editForm.username}}</span>
                </el-col>
              </el-form-item>
              <!--Role选择输入框-->
              <el-form-item label="Role">
                <el-radio-group v-model="editForm.role">
                  <el-radio label="0">SuperAdmin</el-radio>
                  <el-radio label="1">Admin</el-radio>
                  <el-radio label="2">User</el-radio>
                </el-radio-group>
              </el-form-item>


            </el-form>
            <!--表单末端部分-->
            <span slot="footer" class="dialog-footer">
          <!--取消按钮-->
          <el-button @click="centerDialogVisible = false">Cancel</el-button>
              <!--提交按钮-->
          <el-button type="primary" @click="modUser">Submit</el-button>
    </span>
          </el-dialog>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>


export default {
  name: "SuperAdminManageAuthorityComponent",
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
      searchUsername:'',
      searchCountry:'',
      centerDialogVisible: false,
      editForm:{
        username:'',
        password:'',
        telephone:'',
        email:'',
        country:'',
        role:'',
      },
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
      this.$router.push("/SuperAdmin/Home");
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
    // Reset按钮绑定的事件，用于重置参数
    resetParam(){
      this.searchUsername = '';
      this.searchCountry = '';
    },
    // New按钮绑定的事件，用于弹出新增角色表单
    addUser(){
      this.centerDialogVisible = true;
    },
    // Edit按钮绑定的事件，用于读取当前行信息，赋值到Edit表单
    editUser(row){
      this.editForm.username = row.username;
      this.editForm.password = row.password;
      this.editForm.telephone = row.telephone;
      this.editForm.email = row.email;
      this.editForm.country = row.country;
      this.editForm.role = row.role;
      this.centerDialogVisible = true;
    },
    // Edit表单中Submit按钮绑定的事件，用于修改用户信息
    modUser(){
      this.$axios.post('http://localhost:9090/modAuthority', this.editForm);
      this.$message({
        message: 'Edit successfully',
        type: 'success',
      });
      this.centerDialogVisible  = false;
      this.loadPost();
    },
    // 分页查询方法
    loadPost() {
      this.$axios
          .get('http://localhost:9090/listPage', {
            params: {
              pageNum: this.pageNum,
              pageSize: this.pageSize,
              username: this.searchUsername,
              country: this.searchCountry,
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

<style  scoped>
.el-descriptions {
  width: 90%;
  margin: 0 auto;
  text-align: center;
}
</style>