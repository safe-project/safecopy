<template>
  <div class="DetailsPage" v-if="DetailsPageVisible && DetailsPageDataList.length !==0">
    <span>业务时间轴</span>
    <div style="width: 100%; height: 300px; padding-bottom: 40px; display: table;margin-top: 10px;">
      <div class="DetailsPage-lt">
        <div class="delate-time"
          :style="{'top': `${index*((300-46)/(DetailsPageDataList.length-1))+4}px`}"
          v-for="(item, index) in DetailsPageDataList"
          :key="index"
        >{{item.D_time}}</div>
      </div>
      <div class="DetailsPage-rt">
        <el-steps direction="vertical" :active="DetailsPageActive">
          <el-step
          v-for="(item, index) in DetailsPageDataList"
          :key="index"
          :title="item.D_title"
          :description="item.D_content==='null'?'':item.D_content"
          ></el-step>
        </el-steps>
      </div>
    </div>
  </div>
</template>
<script>
export default {
    name:'DetailsPage',
    props:{
        DetailsPageVisible:{
            type: Boolean
        },
        DetailsPageDataList:{
            type: Array
        },
        DetailsPageActive:{
            type: Number
        }
    },
}
</script>
<style>
  .DetailsPage-lt {
    width: 80px;
    color: #818181;
    font-size: 13px;
    display: table-cell;
    position: relative;
  } 
  .DetailsPage-lt .delate-time {
    position: absolute;
  }
  .DetailsPage-rt {
    display: table-cell;
  }
</style>
