<template>
    <div class="login">
        <div class="wrap">
            <el-input
              placeholder="请输入用户名"
              prefix-icon="el-icon-user-solid"
              v-model="loginForm.username">
            </el-input>
            
            <el-input
              placeholder="请输入密码"
              prefix-icon="el-icon-lock"
              v-model="loginForm.password">
            </el-input>

            
        </div>
    </div>
</template>

<script>
    /*引组件 import userList from '@/view/userList.vue'*/
    /*引接口 import {getUserInfo} from "@/api/userConfig.js"*/
    /*引vuex import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'"*/
    export default {
        name: '',
        data(){
            return {
                loginForm: {
                  username: 'admin',
                  password: '111111'
                },
            }
        },
        computed:{
            
        },
        props: {
            
        },
        components: {
            
        },
        methods:{
            
        },
        created(){
            
        },
        mounted(){
            
        },
        watch: {
            ''(to,from){
                
            }
        }
    }
</script>

<style scoped lang="less">
    .login{
      width: 100%;
      height: 100%;
      background-color: #1e2a44;
      .wrap{
        width: 600px;
        height: 400px;
        border: 1px solid red;
        margin: 0 auto;
        .el-input{
          width: 300px;
        }
      }
    }
</style>
    