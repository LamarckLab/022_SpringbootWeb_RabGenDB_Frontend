<template>
  <div class="infoSettingBody">
    <div class="infoSettingDiv">
      <div class="infoSetting-content">
        <h2 class="infoSetting-title" style="font-size: 30px; margin-left: 130px">Personal &nbsp;Info &nbsp;Setting &nbsp; Sheet</h2>
        <br>

        <!--登录页面的表单-->
        <el-form :model="loginForm" label-width="100px"
                 :rules="rules" ref="loginForm">

          <!--Username展示框-->
          <el-form-item style="font-weight: bold" label="Username :">
            <el-col :span="18">
              <span style="font-size: 16px">{{this.username}}</span>
            </el-col>
          </el-form-item>

          <!--Password输入框-->
          <el-form-item style="font-weight: bold" label="Password">
            <el-col :span="18">
              <el-input v-model="this.password"></el-input>
            </el-col>
          </el-form-item>

          <!--Telephone输入框-->
          <el-form-item style="font-weight: bold" label="Telephone">
            <el-col :span="18">
              <el-input v-model="this.telephone"></el-input>
            </el-col>
          </el-form-item>

          <!--Email输入框-->
          <el-form-item style="font-weight: bold" label="Email">
            <el-col :span="18">
              <el-input v-model="this.email"></el-input>
            </el-col>
          </el-form-item>

          <!--Country输入框-->
          <el-form-item style="font-weight: bold" label="Country">
            <el-col :span="18">
              <el-input v-model="this.country"></el-input>
            </el-col>
          </el-form-item>

          <!--提交按钮-->
          <el-form-item style="margin-left: 55px">
            <el-button type="primary" @click="confirm" :disabled="confirm_disabled" style="font-weight: bold; font-size: 16px">Submit</el-button>
          </el-form-item>

          <!--注册按钮按钮-->
          <el-form-item style="margin-left: 200px; margin-top: -5px">
            <el-button type="info" size="small" @click="backToHome" :disabled="confirm_disabled" style="font-weight: bold">Back to Home</el-button>
          </el-form-item>

        </el-form>
      </div>
    </div>
  </div>
</template>


<script>
// import axios from "axios";

export default {
  name: "LoginComponent",
  data(){
    return{
      username: JSON.parse(sessionStorage.getItem('userInfo')).username,
      password: JSON.parse(sessionStorage.getItem('userInfo')).password,
      telephone: JSON.parse(sessionStorage.getItem('userInfo')).telephone,
      email: JSON.parse(sessionStorage.getItem('userInfo')).email,
      country: JSON.parse(sessionStorage.getItem('userInfo')).country,
    }
  },
  methods:{
    backToHome(){
      this.$router.push("/SuperAdmin/Home");
    },
  },
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
  width: 800px;
  height: 550px;
  background: rgba(255, 255, 255, 0.75); /* 添加透明背景以便表单可见 */
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
