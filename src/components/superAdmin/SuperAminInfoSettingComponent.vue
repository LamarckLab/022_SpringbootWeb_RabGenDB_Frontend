<template>
  <div class="infoSettingBody">
    <div class="infoSettingDiv">
      <div class="infoSetting-content">
        <h2 class="infoSetting-title" style="font-size: 30px; margin-left: 20px">Personal Info Setting Sheet</h2>
        <br>

        <!--登录页面的表单-->
        <el-form label-width="100px">

          <!--Username展示框-->
          <el-form-item style="font-weight: bold" label="Username :">
            <el-col :span="18">
              <span style="font-size: 16px">{{username}}</span>
            </el-col>
          </el-form-item>

          <!--Password输入框-->
          <el-form-item style="font-weight: bold" label="Password">
            <el-col :span="18">
              <el-input v-model="password"></el-input>
            </el-col>
          </el-form-item>

          <!--Telephone输入框-->
          <el-form-item style="font-weight: bold" label="Telephone">
            <el-col :span="18">
              <el-input v-model="telephone"></el-input>
            </el-col>
          </el-form-item>

          <!--Email输入框-->
          <el-form-item style="font-weight: bold" label="Email">
            <el-col :span="18">
              <el-input v-model="email"></el-input>
            </el-col>
          </el-form-item>

          <!--Country输入框-->
          <el-form-item style="font-weight: bold" label="Country">
            <el-col :span="18">
              <el-input v-model="country"></el-input>
            </el-col>
          </el-form-item>

          <!--提交按钮-->
          <el-form-item style="margin-left: 55px">
            <el-button type="primary" @click="modUser" style="font-weight: bold; font-size: 18px; margin-left: 80px">Submit</el-button>
          </el-form-item>

          <!--注册按钮按钮-->
          <el-form-item style="margin-left: 200px; margin-top: -5px">
            <el-button type="info" size="small" @click="backToHome" style="font-weight: bold; margin-left: 140px">Back to Home</el-button>
          </el-form-item>

        </el-form>
      </div>
    </div>
  </div>
</template>


<script>

export default {
  name: "LoginComponent",
  data(){
    return{
        username: '',
        password: '',
        telephone: '',
        email: '',
        country: '',
    }
  },
  methods:{
    backToHome(){
      this.$router.push("/SuperAdmin/Home");
    },
    modUser(){
      this.$axios.post('/mod', {
        username: this.username,
        password: this.password,
        telephone: this.telephone,
        email: this.email,
        country: this.country,
      });
      this.$message({
        message: 'Edit successfully',
        type: 'success',
      });
      this.$router.push("/");
    },
    getInfo(){
      this.username = JSON.parse(sessionStorage.getItem('userInfo')).username;
      this.password = JSON.parse(sessionStorage.getItem('userInfo')).password;
      this.telephone = JSON.parse(sessionStorage.getItem('userInfo')).telephone;
      this.email = JSON.parse(sessionStorage.getItem('userInfo')).email;
      this.country = JSON.parse(sessionStorage.getItem('userInfo')).country;
    },
  },
  beforeMount() {
    this.getInfo();
  }
}
</script>

<style>
.infoSettingBody {
  position: absolute;
  width: 100%;
  height: 100%;
  background: url('@/assets/images/info-setting.png') no-repeat center center;
  background-size: contain; /* 使用 contain 让图片完整显示 */
  background-color: #000; /* 给背景填充黑色，避免图片边缘露出空白 */
  overflow: hidden; /* 防止内容超出容器 */
  margin-left: -8px;
  margin-top: -8px;
}
.infoSettingBody::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0); /* 黑色蒙版，透明度为40% */
  z-index: 0; /* 保证蒙版在背景图片上层 */
}
.infoSettingDiv {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 650px;
  height: 550px;
  background: rgba(255, 255, 255, 0.6); /* 添加透明背景以便表单可见 */
  border-radius: 10%;
  z-index: 1; /* 确保表单内容在蒙版之上 */
}
.infoSetting-title {
  margin: 20px;
  text-align: center;
}
.infoSetting-content {
  width: 600px;
  height: 250px;
  position: absolute;
  top: 25px;
  left: 25px;
}
</style>
