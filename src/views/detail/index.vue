<template>
  <div class="orderDetail">
  
    <el-row :gutter="20">{{clientHeight}}--{{offsetHeight}}
      <!-- 左侧订单信息 -->
      
        <el-col :span="11" class="leftInfo">
          <el-scrollbar style="height: 600px;">
            <div style="padding: 6px 0;background-color: #fff;">

              <div class="driverInfo public">
                <div class="title"><strong>司机信息</strong></div>
                <el-row>
                  <el-col :span="24"><div><span>订单ID：</span>{{driverInfo.orderID}}</div></el-col>
                </el-row>
                <el-row>
                  <el-col :span="8"><div><span>司机手机号：</span>{{driverInfo.driverPhone}}</div></el-col>
                  <el-col :span="6"><div><span>司机ID：</span>{{driverInfo.driverID}}</div></el-col>
                  <el-col :span="8"><div><span>司机IMEI：</span>{{driverInfo.driverIMEI}}</div></el-col>
                </el-row>
                <el-row>
                  <el-col :span="8"><div><span>乘客手机号：</span>{{driverInfo.passengerPhone}}</div></el-col>
                  <el-col :span="6"><div><span>乘客ID：</span>{{driverInfo.passengerID}}</div></el-col>
                  <el-col :span="8"><div><span>乘客IMEI：</span>{{driverInfo.passengerIMEI}}</div></el-col>
                </el-row>
                <el-row>
                  <el-col :span="24"><div><span>紧急联系人手机号：</span>{{driverInfo.emergencyPhone}}</div></el-col>
                </el-row>
              </div>
              <div class="timelineSteps public" style="margin-bottom:0px">
                <div class="title"><strong>业务时间轴</strong></div>
                <div style="width: 100%;  display: table;margin-top: 10px;">
                  <div class="DetailsPage-lt">
                    <div class="delate-time"
                      :style="{'top': `${index*(80)+4}px`}"
                      v-for="(item, index) in timeline.timelineSteps"
                      :key="index"
                    >{{item.D_time}}</div>
                  </div>
                  <div class="DetailsPage-rt">
                    <el-steps direction="vertical" :active="timeline.timelineActive" :space="80">
                      <el-step
                      v-for="(item, index) in timeline.timelineSteps"
                      :key="index"
                      :title="item.D_title"
                      :description="item.D_content==='null'?'':item.D_content"
                      ></el-step>
                    </el-steps>
                  </div>
                </div>
              </div>
              <div class="safeInfo public" style="margin-top:0px">
                <div class="title"><strong>安全信息</strong></div>
                <el-row>
                  <el-col :span="9"><div><span>行驶里程：</span>{{safeInfo.driverMileage}}</div></el-col>
                  <el-col :span="8"><div><span>偏航次数：</span>{{safeInfo.yawNum}}</div></el-col>
                  <el-col :span="6"><div><span>偏航频率：</span>{{safeInfo.yawRate}}</div></el-col>
                </el-row>
                <el-row>
                  <el-col :span="9"><div><span>初始ETA：</span>{{safeInfo.startETA}}</div></el-col>
                  <el-col :span="8"><div><span>当前ETA：</span>{{safeInfo.currentETA}}</div></el-col>
                  <el-col :span="6"><div><span>偏航角度：</span>{{safeInfo.yawAngle}}</div></el-col>
                </el-row>
                <el-row>
                  <el-col :span="9"><div><span>司机一键报警：</span><span class="redSpan">{{safeInfo.driverPolice}}</span></div></el-col>
                  <el-col :span="8"><div><span>通知紧急联系人：</span>{{safeInfo.emergencyPhone}}</div></el-col>
                  <el-col :span="6"><div><span>乘客一键报警：</span>{{safeInfo.passengerPolice}}</div></el-col>
                </el-row>
                <el-row>
                  <el-col :span="24"><div><span>安全日志：</span>{{safeInfo.safeLog}}</div></el-col>
                </el-row>
              </div>
              <div class="textarea public">
                <el-input type="textarea" v-model="textarea"></el-input>
                <el-row  type="flex" justify='center' style="margin-top: 10px;">
                  <el-col :span="6"><el-button type="warning" size="small" @click.native.stop="riskDialogVisible = true">处理风险</el-button></el-col>
                  <el-col :span="6"><el-button type="danger" size="small" @click="riskDialogVisible = true">解除风险</el-button></el-col>
                </el-row>
              </div>
              <div class="routeInfo public">
                <div class="title"><strong>路线信息</strong></div>
                <el-table
                  :data="routeInfo"
                  border
                  inline
                  stripe
                  header-align="center" 
                  highlight-current-row
                  style="width: 99%;"
                  :header-cell-style="getRowClass">
                  <el-table-column
                    prop="id"
                    label="序号"
                    min-width="80"
                    align="center"
                    show-overflow-tooltip>
                  </el-table-column>
                  <el-table-column
                    prop="routeID"
                    label="路线ID"
                    min-width="120"
                    align="center"
                    show-overflow-tooltip>
                  </el-table-column>
                  <el-table-column 
                    label="开始日期" 
                    prop="startDate" 
                    align="center" 
                    min-width="100"
                    show-overflow-tooltip>
                  </el-table-column>
                  <el-table-column 
                    label="阶段" 
                    prop="stage" 
                    align="center" 
                    min-width="100"
                    show-overflow-tooltip>
                  </el-table-column>
                  <el-table-column
                    label="显示路线"
                    width="80"
                    align="center">
                    <template slot-scope="scope">
                        <el-button type="text" @click.stop="viewRoute(scope)" round size="mini" style='cursor: pointer'>查看</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>

            </div>
          </el-scrollbar>
        </el-col>
      
      <!-- 处理风险的弹框dialog -->
      <el-dialog
        title="提示"
        :visible.sync="riskDialogVisible"
        append-to-body
        width="30%"
        center>
        <span style='font-size: 12px;'>处理风险需要将线下与乘人员沟通的结果填写到备注中，是否已沟通</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="riskDialogVisible = false" size="mini">否</el-button>
          <el-button type="primary" @click="riskDialogVisible = false" size="mini">是</el-button>
        </span>
      </el-dialog>
      <!-- 右侧地图 -->
      <el-col :span="13" class="rightMap">
        <div class="grid-content bg-purple">
      
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState,mapGetters,mapActions } from 'vuex';
import { getOrderDetail} from '@/api/orderDetail';
  export default {
    name: 'OrderDetail',
    data(){
      return {
        textarea:"",
        riskDialogVisible:false,
        driverInfo:{},
        timeline:{
          timelineActive:0,
          timelineSteps:[]
        },
        safeInfo:{},
        routeInfo:[],
        offsetHeight:document.documentElement.offsetHeight,
        clientHeight: document.documentElement.clientHeight
      }
    },
    computed: {
      ...mapState(['vorderId'])
    },
    methods:{
      getRowClass({ row, column, rowIndex, columnIndex }) {
        if (rowIndex === 0) {
          return 'background:#e5e5e5;font-size:12px;'
        }
      },
      viewRoute(scope){

      },
      // 获取订单详情接口
      getOrderDetail(orderID) {
        getOrderDetail(orderID)
          .then(response => {
            this.driverInfo = response.data.data.data.driverInfo;
            this.timeline = response.data.data.data.timeline;
            this.timeline.timelineActive = Number(response.data.data.data.timeline.timelineActive);
            this.safeInfo = response.data.data.data.safeInfo;
            this.routeInfo = response.data.data.data.routeInfo;
          })
          .catch(error => {
            this.$message({
              showClose: true,
              message: 'sorry，获取订单详情失败',
              type: 'error'
            });
          });
      },
    },
    created(){
      console.log("详情页created了");
      this.getOrderDetail(this.vorderId);
      this.height = document.body.offsetHeight;
    },
    mounted(){
      const that = this
      window.onresize = () => {
        return (() => {
          window.clientHeight = document.documentElement.clientHeight
          window.offsetHeight = document.documentElement.offsetHeight
          that.clientHeight = window.clientHeight
          that.offsetHeight = window.offsetHeight
        })()
      }
    },
    watch: {
      clientHeight (val) {
        if(!this.timer) {
          this.clientHeight = val
          this.timer = true
          let that = this
          setTimeout(function (){
            that.timer = false
          },400)
        }
      },
      offsetHeight (val) {
        if(!this.timer) {
          this.offsetHeight = val
          this.timer = true
          let that = this
          setTimeout(function (){
            that.timer = false
          },400)
        }
      }
    }
  }
</script>

<style lang="less">
.orderDetail{
  .redSpan{
    color:#FF4C4C;
  }
  .el-row{
    margin-bottom: 10px;
    .el-col{
      font-family: PingFangSC-Medium;
      font-size: 12px;
      color: #4D4D4D;
      letter-spacing: 0;
      line-height: 20px;
      white-space:nowrap;
    }
  }
  .textarea{
    .btnWrap{
      margin-top: 10px;
    }
  }
  .routeInfo{
    padding-bottom: 20px;
  }
}
  .public{
    margin: 20px;
  }
  .el-dialog.dialog{
    background-color: #f3f5f9;
  }
  .title{
    height: 40px;
    line-height: 40px;
    font-size: 14px;
  }

  /* 布局样式 */
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple {
    background: #fff;
  }
  .grid-content {
    border-radius: 4px;
    height: 36px;
  }

  .orderDetail .routeInfo{
    .el-table__header tr,.el-table__header th {
      padding: 0;
      height: 40px;
      font-size: 12px;
      color: #1e2a44;
    }
    .el-table__body tr,.el-table__body td {
        padding: 0;
        height: 40px;
        font-size: 12px;
    }
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
.el-scrollbar__wrap {
   overflow-x: hidden;
 }
</style>
    