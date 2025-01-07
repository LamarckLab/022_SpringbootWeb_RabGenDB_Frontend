<template>
  <div class="loginBody">
    <div class="loginDiv">
      <div class="login-content">
        <h2 class="login-title">Welcome to RabGenDB</h2>

        <!--登录页面的表单-->
        <el-form :model="loginForm" label-width="100px"
                 :rules="rules" ref="loginForm">

          <!--Username输入框-->
          <el-form-item label="Username" prop="username">
            <el-input style="width: 200px" type="text" v-model="loginForm.username"
                      autocomplete="off" size="small" @keyup.enter.native="confirm"></el-input>
          </el-form-item>

          <!--Password输入框-->
          <el-form-item label="Password" prop="password">
            <el-input style="width: 200px" type="password" v-model="loginForm.password"
                      show-password autocomplete="off" size="small" @keyup.enter.native="confirm"></el-input>
          </el-form-item>

          <!--提交按钮-->
          <el-form-item style="margin-left: 55px">
            <el-button type="primary" @click="confirm" :disabled="confirm_disabled" style="font-weight: bold; font-size: 16px">Sign in</el-button>
          </el-form-item>

          <!--注册按钮按钮-->
          <el-form-item style="margin-left: 230px; margin-top: -5px">
            <el-button type="info" size="small" @click="signUp" :disabled="confirm_disabled" style="font-weight: bold">Sign Up</el-button>
          </el-form-item>

        </el-form>
      </div>
    </div>
  </div>
</template>


<script>
import axios from "axios";

export default {
  name: "LoginComponent",
  data(){
    return{
      confirm_disabled:false,
      loginForm:{
        username:'',
        password:''
      },
      rules:{
        username: [
          { required: true, message: 'Enter your username number please', trigger: 'blur' }
        ],
        password: [
          { required: true, message: 'Enter your password please', trigger: 'blur' }
        ],
      }
    }
  },
  methods:{
    // 点击Submit按钮，执行confirm方法
    confirm() {
      // 对表单进行检验
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          // 校验通过, 就不允许重复提交
          this.confirm_disabled = true;
          // 向Controller中的login接口发送请求
          axios.post("/login", {
            username: this.loginForm.username,
            password: this.loginForm.password,
          })
              .then((response) => {
                const res = response.data;
                if (res.success) {
                  this.$message.success(res.message);
                  // 将用户完整信息存入 sessionStorage
                  sessionStorage.setItem("userInfo", JSON.stringify(res.user));
                  if(res.user.role=='0'){
                    this.$router.push("/SuperAdmin/Home");
                  }else if(res.user.role=='1'){
                    this.$router.push("/Admin/Home");
                  }else{
                    this.$router.push("/User/Home");
                  }
                } else {
                  this.$message.error(res.message);
                  this.confirm_disabled = false;
                }
              })
              .catch((error) => {
                console.error(error);
                this.$message.error("Server error. Please try again later.");
                this.confirm_disabled = false;
              });
        } else {
          this.$message.error("Please complete the form");
        }
      });
    },
    signUp(){
      // 对表单进行检验
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          // 校验通过, 就不允许重复提交
          this.confirm_disabled = true;
          // 向Controller中的login接口发送请求
          axios.post("/save", {
            username: this.loginForm.username,
            password: this.loginForm.password,
            role: 2,
          })
          this.$message({
            message: 'SignUp successfully',
            type: 'success',
          });
          this.confirm_disabled = false;
        } else {
          this.$message.error("Please complete the form");
        }
      });
    }
  }
}
</script>

<style>
.loginBody {
  position: absolute;
  width: 100%;
  height: 100%;
  background: url('@/assets/images/background-login.png') no-repeat center center;
  background-size: contain; /* 使用 contain 让图片完整显示 */
  background-color: #000; /* 给背景填充黑色，避免图片边缘露出空白 */
  overflow: hidden; /* 防止内容超出容器 */
  margin-left: -8px;
  margin-top: -8px;
}
.loginBody::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6); /* 黑色蒙版，透明度为40% */
  z-index: 0; /* 保证蒙版在背景图片上层 */
}
.loginDiv {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 450px;
  height: 330px;
  background: rgba(255, 255, 255, 0.8); /* 添加透明背景以便表单可见 */
  border-radius: 5%;
  z-index: 1; /* 确保表单内容在蒙版之上 */
}
.login-title {
  margin: 20px;
  text-align: center;
}
.login-content {
  width: 400px;
  height: 250px;
  position: absolute;
  top: 25px;
  left: 25px;
}
</style>
