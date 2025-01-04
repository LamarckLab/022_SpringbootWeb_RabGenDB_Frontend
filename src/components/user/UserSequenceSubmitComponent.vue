<template>
  <!--整个页面中最大的容器-->
  <el-container style="height: 100%; border: 1px solid #eee; margin-top: -9px">
    <!--左侧导航栏-->
    <el-aside :width="aside_width" style="height: 100vh; background-color: rgb(238, 241, 246); margin-left: -9px">
      <el-menu
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          default-active="/User/SequenceSubmit"
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

    <!--页面右侧的大容器-->
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
              <el-dropdown-item @click.native="toUser">Personal Info</el-dropdown-item>
              <el-dropdown-item @click.native="logOut">Quit</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>


      <!--RABV的简介部分-->
      <div style="padding: 20px; background-color: #f9f9f9; border: 1px solid #ddd; border-radius: 8px; margin: 20px;">
        <h2>**** Sequence Submission Guidelines ****</h2>

        <p class="paragraph-style">
          1. When uploading a sequence, you are required to provide the following sample information: accession, collection country, collection date, and host.
          If the sequence does not have an officially provided accession, this field can be left blank.
        </p>
        <p class="paragraph-style">
          2 .After a sequence is uploaded, it will be reviewed by the administrator.
          Sequences that pass the review will be added to RabGenDB and you will be notified in the Notifications section.
          During the review process, the administrator will classify the submitted host into one of the following Refined Host categories:
          <strong><em>Bats</em></strong>, <strong><em>Bovidae</em></strong>, <strong><em>Canidae</em></strong>, <strong><em>Feliformia</em></strong>, <strong><em>Mustelidae and Mephitidae</em></strong>, <strong><em>Primates</em></strong>, <strong><em>Procyonidae</em></strong> or 'others'.
        </p>
        <p class="paragraph-style">
          3. If there are errors in the submitted sequence information, the administrator will reject your submission and provide the reason for rejection.
          You may modify the previous submission and resubmit it.
        </p>

      </div>

      <div style="margin-left: 30px; margin-top: 30px">

        <!--序列提交按钮-->
        <div style="text-align: center;">
          <el-button type="success" style="margin-top: 10px; font-size: 20px; font-weight: bold; color: floralwhite" @click="addSequence">
            Sequence Submit
          </el-button>
        </div>

        <!--点击Sequence Submit按钮后弹出来的表单-->
        <el-dialog
            title="Sequence Submit"
            :visible.sync="centerDialogVisible"
            width="60%"
            center>
          <!--表单中的值绑定到form变量中-->
          <el-form ref="form" :model="form" label-width="220px">
            <!--Username输入框-->
            <el-form-item label="Username">
              <el-col :span="18">
                <span>{{user.username}}</span>
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
            <!--Host输入框-->
            <el-form-item label="Host">
              <el-col :span="18">
                <el-input v-model="form.rawHost"></el-input>
              </el-col>
            </el-form-item>
          </el-form>
          <!--表单末端部分-->
          <span slot="footer" class="dialog-footer">
          <!--取消按钮-->
          <el-button @click="centerDialogVisible = false">Cancel</el-button>
            <!--提交按钮-->
          <el-button type="primary" @click="sequenceSubmit">Submit</el-button>
        </span>
        </el-dialog>

      </div>
    </el-container>
  </el-container>
</template>

<script>


export default {
  name: "UserSequenceSubmitComponent",

  data(){
    return{
      aside_width: '220px',
      isCollapse: false,
      collapseIcon: 'el-icon-s-fold',
      centerDialogVisible: false,
      form:{
        accession:'',
        collectionCountry:'',
        collectionDate:'',
        rawHost:'',
        username: JSON.parse(sessionStorage.getItem('userInfo')).username,
        isSubmit:'1',
      },
    }
  },

  methods:{
    // 实现侧边栏伸缩的方法
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
    // 跳转到用户home页
    toUser(){
      this.$router.push("/User/Home");
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
    // 初次加载页面的时候, 把登录用户的信息加载到user中
    init(){
      this.user = JSON.parse(sessionStorage.getItem('userInfo'))
    },
    // 点击Sequence Submit按钮后触发的事件
    addSequence(){
      this.centerDialogVisible = true
    },
    // 提交表单时, 点击submit后触发的事件
    sequenceSubmit(){
      this.$axios.post('http://localhost:9090/sequenceSave', this.form);
      this.$message({
        message: 'Submit successfully',
        type: 'success',
      });
      this.centerDialogVisible = false;
      this.form.accession='';
      this.form.collectionCountry='';
      this.form.collectionDate='';
      this.form.rawHost='';
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

.paragraph-style{
  line-height: 1.6;
  font-size: 16px;
  color: #333;
}
</style>