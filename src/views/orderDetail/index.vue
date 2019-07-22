<template>
  <div class="orderDetail">
    <el-dialog :title="title" :visible.sync="detailDialogVisible" width='96%' center custom-class="dialog">
      <el-row :gutter="20">
        <!-- 左侧订单信息 -->
	  		<el-col :span="11" class="leftInfo">
		  		<div class="grid-content bg-purple">
		  			<div class="driverInfo public" style="">
		  				<div class="title"><strong>司机信息</strong></div>
		  				<el-row>
							  <el-col :span="24"><div><strong>订单ID：</strong>{{driverInfo.orderID}}</div></el-col>
							</el-row>
							<el-row>
							  <el-col :span="8"><div><strong>司机手机号：</strong>{{driverInfo.driverPhone}}</div></el-col>
							  <el-col :span="6"><div><strong>司机ID：</strong>{{driverInfo.driverID}}</div></el-col>
							  <el-col :span="8"><div><strong>司机IMEI：</strong>{{driverInfo.driverIMEI}}</div></el-col>
							</el-row>
							<el-row>
							  <el-col :span="8"><div><strong>乘客手机号：</strong>{{driverInfo.passengerPhone}}</div></el-col>
							  <el-col :span="6"><div><strong>乘客ID：</strong>{{driverInfo.passengerID}}</div></el-col>
							  <el-col :span="8"><div><strong>乘客IMEI：</strong>{{driverInfo.passengerIMEI}}</div></el-col>
							</el-row>
							<el-row>
							  <el-col :span="24"><div><strong>紧急联系人手机号：</strong>{{driverInfo.emergencyPhone}}</div></el-col>
							</el-row>
		  			</div>
		  			<div class="timeline public" style="">
		  				<div class="title"><strong>业务时间轴</strong></div>
					    <div style="width: 100%; height: 300px; padding-bottom: 40px; display: table;margin-top: 10px;">
					      <div class="DetailsPage-lt">
					        <div class="delate-time"
					          :style="{'top': `${index*((300-46)/(timeline.length-1))+4}px`}"
					          v-for="(item, index) in timeline"
					          :key="index"
					        >{{item.D_time}}</div>
					      </div>
					      <div class="DetailsPage-rt">
					        <el-steps direction="vertical" :active="DetailsPageActive">
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
		  			<div class="safeInfo public">
		  				<div class="title"><strong>安全信息</strong></div>
		  				<el-row>
							  <el-col :span="8"><div><strong>行驶里程：</strong>{{safeInfo.driverMileage}}</div></el-col>
							  <el-col :span="6"><div><strong>偏航次数：</strong>{{safeInfo.yawNum}}</div></el-col>
							  <el-col :span="8"><div><strong>偏航频率：</strong>{{safeInfo.yawRate}}</div></el-col>
							</el-row>
							<el-row>
							  <el-col :span="8"><div><strong>初始ETA：</strong>{{safeInfo.startETA}}</div></el-col>
							  <el-col :span="6"><div><strong>当前ETA：</strong>{{safeInfo.currentETA}}</div></el-col>
							  <el-col :span="8"><div><strong>偏航角度：</strong>{{safeInfo.yawAngle}}</div></el-col>
							</el-row>
							<el-row>
							  <el-col :span="8"><div><strong>司机一键报警：</strong>{{safeInfo.driverPolice}}</div></el-col>
							  <el-col :span="6"><div><strong>通知紧急联系人：</strong>{{safeInfo.emergencyPhone}}</div></el-col>
							  <el-col :span="8"><div><strong>乘客一键报警：</strong>{{safeInfo.passengerPolice}}</div></el-col>
							</el-row>
							<el-row>
							  <el-col :span="24"><div><strong>安全日志：</strong>{{safeInfo.safeLog}}</div></el-col>
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
    </el-dialog>
  </div>
</template>

<script>
  /*引组件 import userList from '@/view/userList.vue'*/
  /*引接口 import {getUserInfo} from "@/api/userConfig.js"*/
  /*引vuex import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'"*/
  export default {
    name: 'OrderDetail',
    data(){
      return {
        detailDialogVisible:false,
        title:"",
        textarea:"",
        riskDialogVisible:false,
      }
    },
    props:{
      dialogVisible:{
       	type:Boolean,
       	required:true
      },
      DetailsPageActive:{
        type: Number
    	},
      driverInfo:{
      	type:Object,
        required:true
      },
      timeline:{
      	type:Array,
        required:true
      },
      safeInfo:{
      	type:Object,
        required:true
      },
      routeInfo:{
      	type:Array,
        required:true
      },
      orderID:{
      	type:String,
        required:true
      }
  	},
    methods:{
      getRowClass({ row, column, rowIndex, columnIndex }) {
	      if (rowIndex === 0) {
	        return 'background:#e5e5e5;font-size:12px;'
	      }
	    },
	    viewRoute(scope){

	    }
    },
    created(){
    	console.log("create了");
    },
    watch: {
      // dialog弹框打开关闭触发的操作
      dialogVisible(){
      	console.log("打开了");
      	// 如果打开
        if (this.dialogVisible) {
          this.detailDialogVisible = this.dialogVisible;
          this.title = this.orderID + "订单详情";
        }else{
           this.title = "";
           this.textarea = "";
        }
      },
      detailDialogVisible(){
        if (!this.detailDialogVisible) {
            this.$emit('transfer')
        }
      },
    }
  }
</script>

<style lang="less">
.orderDetail{
	.el-row{
		margin-bottom: 10px;
		.el-col{
			font-size: 12px;
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
    min-height: 36px;
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
    