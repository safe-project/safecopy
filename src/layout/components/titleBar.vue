<template>
    <div class="titleBar clearfloat">
        <div class="wrapLogo"></div>
        <div class="right-menu">
	      	<el-dropdown>
			  <span class="el-dropdown-link">
			    <img src="">
			    <i>lipeng</i>
			    <i class="el-icon-arrow-down el-icon--right" style="position:relative;top: 2px;right:2px;"></i>
			  </span>
			  <el-dropdown-menu slot="dropdown">
			    <el-dropdown-item>
					<span style="display:block;" @click="logout">退出</span>
			    </el-dropdown-item>
			  </el-dropdown-menu>
			</el-dropdown>
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
    	.right-menu {
    		width: 100px;
    		height: 50px;
    		border: 1px solid red;
		    float: right;
		    margin-right: 20px;
		    height: 100%;
		    cursor: pointer;
			i{
				color: #fff;
			}
    
    	}
    	
    }
</style>
    