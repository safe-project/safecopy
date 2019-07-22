<template>
    <div class="titleBar clearfloat">
        <div class="left-logo">
          <span class="title"><i class="logo"></i>如祺出行-安全管理平台</span>
        </div>
        <div class="right-menu">
          <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            <img src="../../assets/logo/fengche.png" class="nickNameImg">
            <span :title="nickName" class="nickName">{{nickName}}</span>
            <i class="el-icon-arrow-down el-icon--right" style="position:relative;top: 2px;right:2px;"></i>
          </span>
          <el-dropdown-menu slot="dropdown" style="margin-top:10px ">
            <el-dropdown-item @click.native="logout">退出登陆</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

	      	<!-- <el-dropdown>
            <span class="el-dropdown-link">
              <img src="" class="">
              <span class="dropdown">超级管理员</span>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
              <span style="display:block;" @click="logout">退出</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown> -->
        </div>
    </div>
</template>

<script>
    /*引组件 import userList from '@/view/userList.vue'*/
    /*引接口 import {getUserInfo} from "@/api/userConfig.js"*/
    /*引vuex import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'"*/
    export default {
        name: 'titleBar',
        data(){
            return {
              nickName:'超级管理员',
                
            }
        },
        computed:{
            
        },
        props: {
            
        },
        components: {
            
        },
        methods:{
            async logout() {
              console.log(222);
		      await this.$store.dispatch('user/logout')
		      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
		    }
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
    .titleBar{
      height: 50px;
      line-height: 50px;
      width: 100%;
      background-color: #1e2a44;
      position: fixed;
      z-index:2000;
      top: 0;
      .left-logo{
        height:50px;
        width: 300px;
        text-align: center;
        .title {
          display: inline-block;
          line-height:50px;
          font-size: 16px;
          position: relative;
          color:#fff;
          background-color:#1e2a44;
          .logo{
            display: inline-block;
            width: 30px;
            height: 30px;
            position: absolute;
            top:10px;
            left:-35px;
            background: url(../../assets/logo/icon.png) no-repeat center center;
            background-size:cover;

        }
        }
      }
      .right-menu {
        width: 15%;
        height:100%;
        position: absolute;
        top:0px;
        right:0px;
        cursor: pointer;
        .nickName{
          display: inline-block;
          color: #fff;
          text-align: right;
          margin-left: 50px;
          vertical-align: middle;
          width: 80px;
          height: 100%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .nickNameImg{
          width: 30px;
          height: 30px;
          border-radius: 50%;
          position: absolute;
          left: 24px;
          top: 10px;
          animation:nickNameImg 4s linear 0s infinite;
        }
        @keyframes nickNameImg{
          0%{
            transform:rotate(0deg);
          }
          100%{
            transform:rotate(-360deg);
          }
        }
			i{
				color: #fff;
			}
    
    	}
    	
    }
</style>
    