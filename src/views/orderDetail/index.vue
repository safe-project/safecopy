<template>
  <div class="orderDetail">
    <el-dialog :title="title" :visible.sync="detailDialogVisible" width='96%' center custom-class="dialog">
      <el-row :gutter="20">
        <!-- 左侧订单信息 -->
	  		<el-col :span="11" class="leftInfo">
		  		<div class="grid-content bg-purple">
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
		  			<div class="timeline public" style="margin-bottom:0px">
		  				<div class="title"><strong>业务时间轴</strong></div>
					    <div style="width: 100%;  display: table;margin-top: 10px;">
					      <div class="DetailsPage-lt">
					        <div class="delate-time"
					          :style="{'top': `${index*(80)+4}px`}"
					          v-for="(item, index) in timeline1"
					          :key="index"
					        >{{item.D_time}}</div>
					      </div>
					      <div class="DetailsPage-rt">
					        <el-steps direction="vertical" :active="DetailsPageActive" :space="80">
					          <el-step
					          v-for="(item, index) in timeline1"
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
		"timeline1":[
        {
        "D_title":"乘客下单",
        "D_content":"广州市天河区广汽中心南门  GPS: 23.1009.113.2154",
        "D_time":"2019.07.11 19:31:42"
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
      },{
        "D_title":"订单结束",
        "D_content":"广州市天河区淇滨幼儿园大门  GPS: 23.1009.113.4532",
        "D_time":"2019.07.15 19:56:32"
      }
    ],
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
    