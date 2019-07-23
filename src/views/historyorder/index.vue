<template>
  <div class="historyOrder">
    <el-form ref="form" :model="form" inline>
      <el-form-item label="订单ID:">
        <el-input v-model="form.orderId"></el-input>
      </el-form-item>
      <el-form-item label="司机手机号:">
        <el-input v-model="form.driverPhone"></el-input>
      </el-form-item>
      <el-form-item label="司机ID:">
        <el-input v-model="form.driverId"></el-input>
      </el-form-item>
      <el-form-item label="司机IMEI:">
        <el-input v-model="form.driverIMEI"></el-input>
      </el-form-item>
      <el-form-item label="车牌号:">
        <el-input v-model="form.carNum"></el-input>
      </el-form-item>
      <el-form-item label="乘客手机号:">
        <el-input v-model="form.passengerPhone"></el-input>
      </el-form-item>
      <el-form-item label="乘客ID:">
        <el-input v-model="form.passengerId"></el-input>
      </el-form-item>
      <el-form-item label="乘客IMEI:">
        <el-input v-model="form.passengerIMEI"></el-input>
      </el-form-item>
      <el-form-item label="上车地点:">
        <el-input v-model="form.onAddress"></el-input>
      </el-form-item>
      <el-form-item label="下车地点:">
        <el-input v-model="form.offAddress"></el-input>
      </el-form-item>
      <el-form-item label="开始时间:">
        <el-date-picker
          v-model="form.startTime"
          type="datetime"
          placeholder="选择日期时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="结束时间:" class="endTime">
        <el-date-picker
          v-model="form.endTime"
          type="datetime"
          placeholder="选择日期时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="预警信息:">
        <el-checkbox-group v-model="form.activeIdArr" class="checkbox">
          <el-checkbox v-for="p in activeIdArrList" :label="p.id" :key="p.id" :value="p.id">{{p.label}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-form>
    <el-row style="margin-left: 16px;margin-bottom: 20px;">
      <el-button type="primary" size="small" @click.native="srearch">开始查询</el-button>
    </el-row>
    <el-table 
      :data="historyOrderListData" 
      height="360"
      highlight-current-row
      border
      inline
      stripe
      v-loading="loading"
      header-align="center" 
      style="width: 99%;" stripe
      :header-cell-style="getRowClass"
      element-loading-text="拼命加载中">
      <el-table-column label="订单ID" prop="orderID" align="center" min-width="120"></el-table-column>
      <el-table-column label="车牌号" prop="carNum" align="center" min-width="80"></el-table-column>
      <el-table-column label="司机姓名" prop="driverName" align="center" min-width="80"></el-table-column>
      <el-table-column label="司机电话" prop="driverPhone" align="center" min-width="120"></el-table-column>
      <el-table-column label="订单开始时间" prop="startTime" align="center" min-width="140"></el-table-column>
      <el-table-column label="预警时间" prop="warningTime" align="center" min-width="140"></el-table-column>
      <el-table-column label="预警原因" prop="WarningReason" align="center" min-width="160">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.WarningReason === '司机一键报警' ? 'danger' : scope.row.WarningReason === '严重偏航' ?'primary' : 'warning'"
            close-transition>{{scope.row.WarningReason}}</el-tag>
          </template>
      </el-table-column>
      <el-table-column label="上车地点" prop="onAddress" align="center" min-width="160" show-overflow-tooltip></el-table-column>
      <el-table-column label="下车地点" prop="offAddress" align="center" min-width="160" show-overflow-tooltip></el-table-column>

      <el-table-column label="订单详情" width="100">
        <template slot-scope="scope">
          <el-button type="text" @click.stop="viewOrderDetail(scope)" round size="mini" style='cursor: pointer'>查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <div class="pagination clearfloat">
      <el-pagination
        background
        :total="total"
        :current-page="currentPage"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[10, 20, 50, 100, 1000]"
        layout="total, sizes, prev, pager, next, jumper"
        :page-size="limit">
      </el-pagination>
    </div>
    <!-- <orderDetailDialog 
      :dialogVisible="dialogVisible" 
      :DetailsPageActive="DetailsPageActive"
      :driverInfo="driverInfo" 
      :timeline="timeline" 
      :safeInfo="safeInfo" 
      :routeInfo="routeInfo" 
      :orderID="orderID" 
      @transfer="changeDialogVisible">
    </orderDetailDialog> -->
  </div>
</template>

<script>
  import { getHistoryOrderList} from '@/api/historyOrder'
  import { getOrderDetail} from '@/api/orderDetail'
  import orderDetailDialog from '@/views/orderDetail/index.vue';
  import { mapState,mapGetters,mapActions } from 'vuex';
  export default {
    name: 'HistoryOrder',
    data(){
      return {
        form:{
          orderId:'',
          driverPhone:'',
          driverId:'',
          driverIMEI:'',
          carNum:'',
          passengerPhone:'',
          passengerId:'',
          passengerIMEI:'',
          onAddress:'',
          offAddress:'',
          startTime:'',
          endTime:'',
          activeIdArr:[],
        },
        activeIdArrList:[
          {id: '1',label:"司机一键报警"},
          {id: '2',label:"严重偏航"},
          {id: '3',label:"乘客通知紧急联系人"},
        ],
        historyOrderListData:[],
        dialogVisible:false,
        loading:false,
        DetailsPageActive:1,
        driverInfo:{},
        timeline:[],
        safeInfo:{},
        routeInfo:[],
        orderID:"",
        currentPage:1,
        total:0,
        page:1,
        limit:20,
        /*************************/
      }
    },
    computed: {
      ...mapState(['vorderId'])
    },
    props: {
      
    },
    components:{ orderDetailDialog },
    methods:{
      getRowClass({ row, column, rowIndex, columnIndex }) {
        if (rowIndex === 0) {
          return 'background:#e5e5e5'
        }
      },
      srearch(){
        // 调用查询接口，跟本页的获取历史订单接口一致即可
        this.getHistoryOrderList(this.form.orderId,
          this.form.driverPhone,
          this.form.driverId,
          this.form.driverIMEI,
          this.form.carNum,
          this.form.passengerPhone,
          this.form.passengerId,
          this.form.passengerIMEI,
          this.form.onAddress,
          this.form.offAddress,
          this.form.startTime,
          this.form.endTime,
          this.form.activeIdArr,
          1,
          this.limit);
          // this.$router.push('/historyOrder/detail')
      },
      /*API：很多参数*/
      getHistoryOrderList(orderId,driverPhone,driverId,driverIMEI,carNum,passengerPhone,passengerId,passengerIMEI,onAddress,offAddress,startTime,endTime,activeIdArr,page,limit) {

        this.loading = true;
        getHistoryOrderList(orderId,driverPhone,driverId,driverIMEI,carNum,passengerPhone,passengerId,passengerIMEI,onAddress,offAddress,startTime,endTime,activeIdArr)
          .then(response => {
            this.loading = false;
            this.total = response.data.data.data.total;
            this.historyOrderListData = response.data.data.data.dataList;
          })
          .catch(error => {
            this.loading = false;
            this.$message({
              showClose: true,
              message: 'sorry，获取历史订单列表失败',
              type: 'error'
            });
          });
      },
      /*************************/
      // 查看订单详情按钮
      viewOrderDetail(scope){
        // this.dialogVisible = true;
        console.log(scope.row.orderID);
        this.orderID = scope.row.orderID;
        this.setVorderId(scope.row.orderID)
        this.$router.push('/orderDetail/index');
      },
      // 详情dialog关闭的时候触发的操作
      changeDialogVisible(){
        this.dialogVisible = false;
        this.driverInfo = {};
        this.timeline = [];
        this.safeInfo = {};
        this.routeInfo = [];
      },
      // 获取订单详情接口
      getOrderDetail(orderID) {
        getOrderDetail(orderID)
          .then(response => {
            this.driverInfo = response.data.data.data.driverInfo;
            this.timeline = response.data.data.data.timeline;
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
      /*************************/
      /*************************/
      handleCurrentChange(val) {
        this.page = val;
        this.getHistoryOrderList(this.form.orderId,
          this.form.driverPhone,
          this.form.driverId,
          this.form.driverIMEI,
          this.form.carNum,
          this.form.passengerPhone,
          this.form.passengerId,
          this.form.passengerIMEI,
          this.form.onAddress,
          this.form.offAddress,
          this.form.startTime,
          this.form.endTime,
          this.form.activeIdArr,
          this.page,
          this.limit);
      },
      handleSizeChange(val) {
        this.limit = val;
        this.getHistoryOrderList(this.form.orderId,
          this.form.driverPhone,
          this.form.driverId,
          this.form.driverIMEI,
          this.form.carNum,
          this.form.passengerPhone,
          this.form.passengerId,
          this.form.passengerIMEI,
          this.form.onAddress,
          this.form.offAddress,
          this.form.startTime,
          this.form.endTime,
          this.form.activeIdArr,
          this.page,
          this.limit);
      },
      /*************************/
      ...mapActions(['setVorderId'])
    },
    created(){
      this.getHistoryOrderList(this.form.orderId,
          this.form.driverPhone,
          this.form.driverId,
          this.form.driverIMEI,
          this.form.carNum,
          this.form.passengerPhone,
          this.form.passengerId,
          this.form.passengerIMEI,
          this.form.onAddress,
          this.form.offAddress,
          this.form.startTime,
          this.form.endTime,
          this.form.activeIdArr,
          this.page,
          this.limit);
    },
    mounted(){
      
    },
    watch: {
      
    }
  }
</script>
<style lang="less">
  .historyOrder{
    .el-form{
      .el-input .el-input__inner{
        width: 200px;
        height: 30px;
        line-height: 30px;
        margin-right: 10px;
      }
      .endTime label{
        width: 81px;
      }
    }
    .el-form-item {
      margin-bottom: 2px;
    }
    label{
      font-weight: normal;
      width: 90px;
    }
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
    .pagination{
      margin-top: 6px;
      margin-right: 20px;
      margin-bottom: 10px;
      .el-pagination{
        float:right;
      }
    }
  }
  
</style>
    