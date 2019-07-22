<template>
  <div class="app-container">
    <!-- <bread-crumb :page="$options.const.pageName"></bread-crumb> -->
    
    <el-form :model="addMsgForm" ref="addMsgForm" class='addMsgForm'>
      <el-row class="addMsgFormRow">
        <el-col :span="24" class='rowTitle'>
          <span>订单以及司乘信息</span>
        </el-col>
        <el-col :span="2">
          <el-form-item label="订单ID:" prop="orderId" :showMessage='false' ></el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item prop="orderId">
            <el-input size="mini" prefix-icon="el-icon-search" type="text" v-model="addMsgForm.orderId" auto-complete="off" placeholder="输入文本"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="2" :offset='1'>
          <el-form-item prop="driverTel" label="司机手机号:" :showMessage='false'></el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item prop="driverTel">
            <el-input size="mini" prefix-icon="el-icon-search" type="text" v-model="addMsgForm.driverTel" auto-complete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="2" :offset='1'>
          <el-form-item label="司机ID:" prop="driverId" :showMessage='false'></el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item prop="driverId">
            <el-input size="mini" prefix-icon="el-icon-search" type="text" v-model="addMsgForm.driverId" auto-complete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="2" :offset='1'>
          <el-form-item label="司机IMEI:" prop="driverIMEI" :showMessage='false'></el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item prop="driverIMEI">
            <el-input size="mini" prefix-icon="el-icon-search" type="text" v-model="addMsgForm.driverIMEI" auto-complete="off"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="addMsgFormRow">
        <el-col :span="2">
          <el-form-item label="车牌号:" prop="carNumber" :showMessage='false' ></el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item prop="carNumber">
            <el-input size="mini" prefix-icon="el-icon-search" type="text" v-model="addMsgForm.carNumber" auto-complete="off" placeholder="输入文本"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="2" :offset='1'>
          <el-form-item prop="passengerTel" label="乘客手机号:" :showMessage='false'></el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item prop="passengerTel">
            <el-input size="mini" prefix-icon="el-icon-search" type="text" v-model="addMsgForm.passengerTel" auto-complete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="2" :offset='1'>
          <el-form-item label="乘客ID:" prop="passengerId" :showMessage='false'></el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item prop="passengerId">
            <el-input size="mini" prefix-icon="el-icon-search" type="text" v-model="addMsgForm.passengerId" auto-complete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="2" :offset='1'>
          <el-form-item label="乘客IMEI:" prop="passengerIMEI" :showMessage='false'></el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item prop="passengerIMEI">
            <el-input size="mini" prefix-icon="el-icon-search" type="text" v-model="addMsgForm.passengerIMEI" auto-complete="off"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="addMsgFormRow">
        <el-col :span="2">
          <el-form-item label="上车地点:" prop="onAddress" :showMessage='false' ></el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item prop="onAddress">
            <el-input size="mini" prefix-icon="el-icon-search" type="text" v-model="addMsgForm.onAddress" auto-complete="off" placeholder="输入文本"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="2" :offset='1'>
          <el-form-item prop="offAddress" label="下车地点:" :showMessage='false'></el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item prop="offAddress">
            <el-input size="mini" prefix-icon="el-icon-search" type="text" v-model="addMsgForm.offAddress" auto-complete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="2" :offset='1'>
          <el-form-item label="开始时间:" prop="startTime" :showMessage='false'></el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item prop="startTime">
            <el-date-picker
              v-model="addMsgForm.startTime"
              type="datetime"  size="mini"
              placeholder="选择日期时间">
            </el-date-picker>
            <!-- <el-input size="mini" prefix-icon="el-icon-search" type="text" v-model="addMsgForm.startTime" auto-complete="off"></el-input> -->
          </el-form-item>
        </el-col>
        <el-col :span="2" :offset='1'>
          <el-form-item label="结束时间:" prop="endTime" :showMessage='false'></el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item prop="endTime">
            <el-date-picker
              v-model="addMsgForm.endTime"
              type="datetime"  size="mini"
              placeholder="选择日期时间">
            </el-date-picker>
            <!-- <el-input size="mini" prefix-icon="el-icon-search" type="text" v-model="addMsgForm.endTime" auto-complete="off"></el-input> -->
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="addMsgFormRow">
        <el-col :span="24" class='rowTitle'>
          <span>预警信息</span>
        </el-col>
        <el-form-item prop="activeIdArr">
          <el-checkbox-group v-model="addMsgForm.activeIdArr" class="checkbox">
            <el-checkbox v-for="p in activeIdArrList" :label="p.id" :key="p.id" :value="p.id">{{p.label}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-row>
    </el-form>
    <el-table 
      :data="dataList" 
      highlight-current-row
      header-align="center" 
      style="width: 99%;" stripe
      :header-cell-style="getRowClass"
      element-loading-text="拼命加载中">
      <el-table-column label="乘客手机号" prop="passengerTel" align="center" min-width="120"></el-table-column>
      <el-table-column label="订单开始时间" prop="startTime" align="center" min-width="160"></el-table-column>
      <el-table-column label="预警时间" prop="warningTime" align="center" min-width="160"></el-table-column>
      <el-table-column label="预警原因" prop="WarningReason" align="center" min-width="160">
        <template slot-scope="scope">
            <el-tag v-if="scope.row.WarningReason"
              :type="scope.row.WarningReason === '司机一键报警' ? 'danger' : scope.row.WarningReason === '严重偏航' ?'primary' : 'warning'"
              close-transition>{{scope.row.WarningReason}}</el-tag>
              <span v-else>无</span>
            </template>
      </el-table-column>
      <el-table-column label="上车地点" prop="onAddress" align="center" min-width="120"></el-table-column>
      <el-table-column label="下车地点" prop="offAddress" align="center" min-width="120"></el-table-column>
      <el-table-column label="订单详情" width="100">
        <template slot-scope="scope">
          <el-button type="text">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
      <!-- <el-col :span="24" class="toolbar pageall">
        <pagination :total="total" @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange"></pagination>
      </el-col> -->
  </div>
</template>

<script>
  // import pagination from "@/common/pagination";
  // import breadCrumb from 'Components/breadcrumb';
  export default {
    // components: {pagination,breadCrumb},
    name: 'historyorder',
    data () {
      return {
        addMsgForm:{
          orderId:'',
          driverTel:'',
          driverId:'',
          driverIMEI:'',
          carNumber:'',
          passengerTel:'',
          passengerId:'',
          passengerIMEI:'',
          onAddress:'',
          offAddress:'',
          startTime:'',
          endTime:'',
          activeIdArr:[],
        },
        dataList:[],//数据
        listLoading: false,//显示loading
        
        activeIdArrList:[
          {id: '1',label:"司机一键报警"},
          {id: '2',label:"严重偏航"},
          {id: '3',label:"乘客通知紧急联系人"},
        ],

        total: 0,//总数
        page: 1,//当前页
        pageSize : 10,//每页数量
        sels: [],//列表选中列
        sortColumn: '',//排序字段
        sortType: '',//排序方式

        data1: {     //接口調通之後刪除
          total: 3000,
          dataList: [
            {
              orderID: '1234212',
              passengerTel: '13912348766',
              onAddress: '北京东直门',
              offAddress: '北京西直门',
              carNum: '粤AK4758',
              driverName: '谢贾睿1',
              driverNum: '13912348765',
              WarningReason: '司机一键报警',
              startTime: '2019-07-15 19:00:00',
              warningTime: '2019-07-15 19:30:00',
              reasonType: 1
            },
            {
              orderID: '1234212',
              passengerTel: '13912348766',
              onAddress: '北京东直门',
              offAddress: '北京西直门',
              carNum: '粤AK4758',
              driverName: '谢贾睿2',
              driverNum: '13912348765',
              WarningReason: '乘客通知紧急联系人',
              startTime: '2019-07-15 19:00:00',
              warningTime: '2019-07-15 19:30:00',
              reasonType: 1
            }, {
              orderID: '1234212',
              passengerTel: '13912348766',
              onAddress: '北京东直门',
              offAddress: '北京西直门',
              carNum: '粤AK4758',
              driverName: '谢贾睿3',
              driverNum: '13912348765',
              WarningReason: '严重偏航',
              startTime: '2019-07-15 19:00:00',
              warningTime: '2019-07-15 19:30:00',
              reasonType: 2
            }, {
              orderID: '1234212',
              passengerTel: '13912348766',
              onAddress: '北京东直门',
              offAddress: '北京西直门',
              carNum: '粤AK4758',
              driverName: '谢贾睿4',
              driverNum: '13912348765',
              WarningReason: '',
              startTime: '2019-07-15 19:00:00',
              warningTime: '2019-07-15 19:30:00',
              reasonType: 2
            }
          ]
        }
      }
    },
    methods : {
      getRowClass({ row, column, rowIndex, columnIndex }) {
        if (rowIndex === 0) {
            return 'background:#e5e5e5'
        }
      },
      handleSizeChange(val) {
        this.pageSize = val;
        this.query();
      },
      handleCurrentChange(val) {
        this.page = val;
        this.query();
      },
      query() {
        let params = {
          'page': this.page,
          'pageSize': this.pageSize,
          'activeId' :this.activeIdArr
        };
        console.log("参数：",params);
        this.dataList = this.data1.dataList;//接口調通之後刪除
        this.total = this.data1.total;      //接口調通之後刪除
        // this.listLoading = true;
        // this.$apis['onlinestateratearea/accordingToAreaHistory'](params).then(data =>{
        //   if (data.code == 1) {
        //     this.dataList = data.dataList;
        //     this.total = data.total;
        //     this.listLoading = false;
        //   }else{
        //     this.$message({
        //       showClose: true,
        //       message: data.errormsg,
        //       type: 'error'
        //     });
        //   }
        // }).catch( data =>{
        //   this.listLoading = false;
        // });
      }
    },
    mounted() {
      this.query();
    }
  }
</script>
<style>
  .addMsgForm .el-date-editor.el-input, .el-date-editor.el-input__inner{
    width:148px;
  }
  .addMsgForm .rowTitle{
    font-size: 14px;
    line-height: 20px;
    color:#4D4D4D;
  }
  .addMsgForm .el-form-item__label{
    font-size: 14px;
    line-height: 20px;
    color:#4D4D4D;
    margin-top: 10px;
    padding:0;
    font-weight: normal;
  }
  .addMsgForm .addMsgFormRow{
    margin-bottom:10px;
  }
  .addMsgForm .el-form-item{
    margin:0;
  }
  .el-button--text:focus, .el-button--text:hover{
    color: #4278EF;
    font-weight: bolder;
  }

</style>
