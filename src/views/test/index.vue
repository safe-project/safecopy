<template>
  <div class="historyOrder">
    <div class="timeline public" style="margin-bottom:0px">

              <div style="width: 100%; height: 350px; display: table;margin-top: 10px;">

                <div class="DetailsPage-lt">
                  <div class="delate-time"
                    :style="{'top': `${index*((350-46)/(timeline.length-1))+4}px`}"
                    v-for="(item, index) in timeline"
                    :key="index"
                  >{{item.D_time}}</div>
                </div>


                <div class="DetailsPage-rt">
                  <el-steps direction="vertical" :active="DetailsPageActive" :space="80">
                    <el-step
                    v-for="(item, index) in timeline"
                    :key="index"
                    :title="item.D_title"
                    :description="item.D_content==='null'?'':item.D_content"
                    ></el-step>
                  </el-steps>
                </div>
              </div>

              
            </div>
  </div>
</template>

<script>
  /*引组件 import userList from '@/view/userList.vue'*/
  /*引接口 import {getUserInfo} from "@/api/userConfig.js"*/
  /*引vuex import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'"*/
  export default {
    name: 'RiskOrder',
    data(){
      return {
        DetailsPageActive:1,
        timeline:[
        {
        "D_title":"乘客下单",
        "D_content":"广州市天河区广汽中心南门  GPS: 23.1009.113.2154",
        "D_time":"2019.07.15 19:31:42"
      },{
        "D_title":"司机接单",
        "D_content":"广州市天河区天汇广场IGC-西门  GPS: 23.1009.113.4321",
        "D_time":"2019.07.15 19:31:42"
      },{
        "D_title":"乘客上车",
        "D_content":"广州市天河区淇滨幼儿园大门  GPS: 23.1009.113.4532",
        "D_time":"2019.07.15 19:35:43"
      },{
        "D_title":"司机一键报警",
        "D_content":"广州市天河区淇滨幼儿园大门  GPS: 23.1009.113.4532",
        "D_time":"2019.07.15 19:35:43"
      }
    ]
      }
    },
    computed:{
      
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
      
    }
  }
</script>

<style scoped lang="less">
  .delate-step-lt {
    width: 80px;
     color: #818181;
     font-size: 13px;
     display: table-cell;
     position: relative;
     .delate-time {
          position: absolute;
           // &:first-child {
            //   top: 4px;
            // }
            // &:nth-child(2) {
            //   top: 80px;
            // }
            // &:nth-child(3) {
            //   top: 170px;
            // }
            // &:last-child {
            //   bottom: 24px;
            // }
      }
}
.delate-step-rt {
  display: table-cell;
}


.DetailsPage-lt {
    width: 70px;
    color: #4D4D4D;
    font-size: 13px;
    display: table-cell;
    position: relative;
  white-space:normal;
  } 
  .DetailsPage-lt .delate-time {
    position: absolute;
  }
  .DetailsPage-rt {
  display: table-cell;
  .el-step__title.is-finish{
    color: #4D4D4D ;
  }
  .el-step__description.is-finish{
    color: #4D4D4D ;
  }
  .el-step__head.is-finish{
    color: #4D4D4D;
    border-color: #4D4D4D;
  }
  .el-step__line{
    background-color: #D8D8D8;
    opacity: 1;
  }
  .el-step.is-vertical .el-step__line{
    border:1px;
  }
  .el-step__line-inner{
    border: 1px;
  }
  .el-step.is-vertical .el-step__head{
    // width: 60px;
  }
  .el-step__icon{
    width: 14px;
    height: 14px;
    top: -3px;
    left: 4px;
    border:0;
  }
  .el-step__icon-inner{
    background-color: #939393;
    color: #939393;
    border-radius: 50%;
    width: 14px;
    height: 14px;
  }
  .el-step__title.is-process{
    color:#FF4C4C;
  }
  .el-step__description.is-process{
    color:#FF4C4C;
  }
  .el-step__head.is-process .el-step__icon-inner{
    color:#FF4C4C;
    background-color:#FF4C4C;
  }
  }
</style>
    