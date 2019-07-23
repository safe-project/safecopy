<template>
    <div class="titleBar clearfloat">
        <div class="left-logo">
          <span class="title"><i class="logo"></i>如祺出行-安全管理平台</span>
        </div>
        <div class="right-menu clearfloat">
          <el-dropdown trigger="click">
          <span class="el-dropdown-link" >
            <img src="../../assets/logo/fengche.png" class="nickNameImg" style="">
            <span :title="nickName" class="nickName">{{nickName}}</span>
            <i class="el-icon-arrow-down el-icon--right" style="position:relative;top: 1px;right:6px;font-size: 10px;"></i>
          </span>
          <el-dropdown-menu slot="dropdown" style="margin-top:10px ">
            <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
    export default {
        name: 'titleBar',
        data(){
            return {
              nickName:'admin',
                
            }
        },
        computed: {
          ...mapGetters([
            'name','roles'
          ])
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
      height: 60px;
      line-height: 60px;
      width: 100%;
      background-color: #1e2a44;
      position: fixed;
      z-index:2000;
      top: 0;
      .left-logo{
        height:60px;
        width: 300px;
        text-align: center;
        .title {
          display: inline-block;
          line-height:60px;
          font-size: 18px;
          position: relative;
          color:#fff;
          background-color:#1e2a44;
          .logo{
            display: inline-block;
            width: 30px;
            height: 30px;
            position: absolute;
            top:14px;
            left:-35px;
            background: url(../../assets/logo/icon.png) no-repeat center center;
            background-size:cover;

        }
        }
      }
      .right-menu {
        width: 120px;
        height:100%;
        position: absolute;
        //background-color: blue;
        top:0px;
        right:20px;
        cursor: pointer;
        .nickName{
          display: inline-block;
          margin-left: 2px;
          font-size: 16px;
          color: #fff;
          //border: 1px solid red;
          width: 47px;
          //text-align: left;
          float: left;
          height: 60px;
          line-height: 60px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .nickNameImg{
          width: 30px;
          height: 30px;
          border-radius: 50%;
          float: left;
          position: relative;
          top: 16px;
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
    