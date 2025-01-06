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

        <!--Admin Home导航栏-->
        <el-menu-item index="/Admin/Home">
          <i class="el-icon-s-home"></i>
          <span slot="title" style="font-size: 16px">Home</span>
        </el-menu-item>

        <!--Admin Sequence Search导航栏-->
        <el-menu-item index="/Admin/SequenceSearch">
          <i class="el-icon-search"></i>
          <span slot="title" style="font-size: 16px">Sequence Search</span>
        </el-menu-item>

        <!--Admin Sequence Check导航栏-->
        <el-menu-item index="/Admin/SequenceCheck">
          <i class="el-icon-view"></i>
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

          <!--表格主体部分-->
          <el-table
              :data="tableData"
              :header-cell-style="{background: '#F2F5FC', color: '#555555', textAlign: 'center'}"
              border
              :cell-style="{ textAlign: 'center' }"
          >
            <!--表头-->
            <!--Accession-->
            <el-table-column prop="accession" label="Accession" width="180">
            </el-table-column>
            <!--Collection Country-->
            <el-table-column prop="collectionCountry" label="Collection Country" width="240">
            </el-table-column>
            <!--Collection Date-->
            <el-table-column prop="collectionDate" label="Collection Date" width="160">
            </el-table-column>
            <!--Raw Host-->
            <el-table-column prop="rawHost" label="Raw Host" width="180">
            </el-table-column>
            <!--Refined Host-->
            <el-table-column prop="refinedHost" label="Refined Host" width="180">
            </el-table-column>
            <!--Username-->
            <el-table-column prop="username" label="Username" width="160">
            </el-table-column>

            <!--Operate-->
            <el-table-column prop="operate" label="Operate" width="120">
              <!--这里的插槽标签用于访问此行的内容-->
              <template slot-scope="scope">
                <!--审核序列按钮-->
                <el-button type="primary" size="small" @click="checkSequence(scope.row)">Check</el-button>
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

          <!--点击Check按钮后弹出来的表单-->
          <el-dialog
              title="Sequence Check"
              :visible.sync="centerDialogVisible"
              width="60%"
              center>
            <!--表单中的值绑定到form变量中-->
            <el-form ref="form" :model="form" label-width="220px">
              <!--Username浏览框-->
              <el-form-item label="Username :">
                <el-col :span="18">
                  <span>{{form.username}}</span>
                </el-col>
              </el-form-item>
              <!--Accession输入框-->
              <el-form-item label="Accession">
                <el-col :span="18">
                  <el-input v-model="form.accession"></el-input>
                </el-col>
              </el-form-item>
              <!--Collection Country输入框-->
              <el-form-item label="Collection Country">
                <el-col :span="18">
                  <el-input v-model="form.collectionCountry"></el-input>
                </el-col>
              </el-form-item>
              <!--Collection Date输入框-->
              <el-form-item label="Collection Date">
                <el-col :span="18">
                  <el-input v-model="form.collectionDate"></el-input>
                </el-col>
              </el-form-item>
              <!--Raw Host输入框-->
              <el-form-item label="Raw Host">
                <el-col :span="18">
                  <el-input v-model="form.rawHost"></el-input>
                </el-col>
              </el-form-item>
              <!--Refined Host输入框-->
              <el-form-item label="Refined Host">
                <el-col :span="18">
                  <el-input v-model="form.refinedHost"></el-input>
                </el-col>
              </el-form-item>
              <!--Message输入框-->
              <el-form-item label="Message">
                <el-col :span="18">
                  <el-input v-model="form.message"></el-input>
                </el-col>
              </el-form-item>
            </el-form>
            <!--表单末端部分-->
            <span slot="footer" class="dialog-footer">
          <!--取消按钮-->
          <el-button @click="centerDialogVisible = false">Cancel</el-button>
          <!--打回按钮-->
          <el-button type="danger" @click="sequenceReject">Reject</el-button>
          <!--通过按钮-->
          <el-button type="success" @click="sequenceAccept">Accept</el-button>
        </span>
          </el-dialog>


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
      pageSize: 5,
      total: 0,
      centerDialogVisible: false,
      form:{
        username:'',
        accession:'',
        collectionCountry:'',
        collectionDate:'',
        rawHost:'',
        refinedHost:'',
        message:'',
        isSubmit:'',
      },
    }
  },

  methods:{
    // 实现导航栏伸缩功能
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
      this.$router.push("/Admin/InfoSetting");
    },
    // 跳转到登录页
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
    // 初次加载页面时, 将会话存储中userInfo加载到user变量中
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
          .get('/listGenomePage', {
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
    // 点击check按钮后, 会调用的方法
    checkSequence(row){
      this.form.username = row.username;
      this.form.accession = row.accession;
      this.form.collectionCountry = row.collectionCountry;
      this.form.collectionDate = row.collectionDate;
      this.form.rawHost = row.rawHost;
      this.form.refinedHost = row.refinedHost;
      this.form.isSubmit = row.isSubmit;
      this.form.message = row.message;
      this.centerDialogVisible = true;
    },
    // 在check表单中, 点击accept按钮后, 会调用的方法
    sequenceAccept(){
      this.$axios.post('/sequenceAccept', this.form);
      this.$message({
        message: 'Accept successfully',
        type: 'success',
      });
      this.centerDialogVisible  = false;
    },
    // 在check表单中, 点击reject按钮后, 会调用的方法
    sequenceReject(){
      this.$axios.post('/sequenceReject', this.form);
      this.$message({
        message: 'Reject successfully',
        type: 'success',
      });
      this.centerDialogVisible  = false;
    }
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