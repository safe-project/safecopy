<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">安全管理平台</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <!-- <svg-icon icon-class="user" /> -->
          <i class="el-icon-user-solid"></i>
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="Username"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <!-- <svg-icon icon-class="password" /> -->
          
          <i class="el-icon-lock"></i>
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="Password"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <i class="el-icon-view"></i>
        </span>
      </el-form-item>
      <el-row :gutter="20" class="tips">
        <el-col :span="9"><el-checkbox v-model="checked">记住密码</el-checkbox></el-col>
        <el-col :span="9" :offset="6"><span> 忘记密码请联系管理员</span></el-col>
      </el-row>
      <el-row :gutter="20" class="tips">
        <el-col :span="12"><el-button type="primary" class ="tipsButton" @click.native.prevent="handleReset">取消</el-button></el-col>
        <el-col :span="12"><el-button :loading="loading" type="primary" class="tipsButton" @click.native.prevent="handleLogin">登录</el-button></el-col>
      </el-row>

      
      


    </el-form>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'
import Cookies from 'js-cookie'
export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('用户名输入错误'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不得少于六位'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
      checked: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleReset(){
      console.log("重置");
      this.loginForm.username = ''
      this.loginForm.password = ''
      
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm).then(() => {
            console.log('登录成功');
            if (this.checked) {
              this.storeCookie();
            }
            
            //获取权限
            // this.$store.dispatch('user/getRoles').then(() => {
            // }).catch(()=>{

            // })
            this.$router.push({ path: this.redirect || '/' })
            this.loading = false
          }).catch(() => {
            console.log('888');
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 存储cookie
    storeCookie(){
      console.log('存储cookie了');
      Cookies.set('username', this.loginForm.username,{ expires:7, path: '' });
      Cookies.set('password', this.loginForm.password,{ expires: 7, path: '' });
    }
  },
  created(){
    if (Cookies.get('username')&&Cookies.get('password')) {
      this.loginForm.username = Cookies.get('username')
      this.loginForm.password = Cookies.get('password')
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#F3F3F3;
$light_gray:#000;
$cursor: #000;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 48px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 48px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: #F3F3F3;
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: #1e2a44;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 480px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span{
      color:#606266;
    }
    .el-checkbox, .el-checkbox-button__inner{
      color: #f3f3f3;
    }
    .tipsButton {
      width:100%;
      height:48px;
      margin-bottom:30px;
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    font-size:24px;
  }

  .title-container {
    position: relative;
    right:12px;
    width:110%;

    .title {
      height:53px;
      line-height:53px;
      font-size: 24px;
      padding-left:158px;
      color: $light_gray;
      margin: 0px auto 35px auto;
      text-align: center;
      font-weight: bold;
      background: url(../../assets/logo/logo.png) no-repeat left center;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
