<template>
    <div class="historyorder">
        历史订单查询
    </div>
</template>

<script>
    /*引组件 import userList from '@/view/userList.vue'*/
    /*引接口 import {getUserInfo} from "@/api/userConfig.js"*/
    /*引vuex import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'"*/
    import { login, logout, getInfo } from '@/api/user'
    export default {
        name: 'Historyorder',
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
            loginData(){
            	logout()
                .then(response => {
                    console.log(response.data,123);
                })
                .catch(error => {
                    console.log(333);
                });
            }
        },
        created(){
            console.log('created le ');
            this.loginData()
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
    .historyorder{
        width: 100%;
        height: 1000px;background-color: red;
    }
</style>
    