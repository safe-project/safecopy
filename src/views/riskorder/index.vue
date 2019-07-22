<template>
  <div class="riskOrder">
    <el-row class="tabsButton">
      <el-button type="default" size="small" @click.native="handleClick(0)">全部</el-button>
      <el-button type="danger" size="small" @click.native="handleClick(1)">司机一键报警</el-button>
      <el-button type="primary" size="small" @click.native="handleClick(3)">严重偏航</el-button>
      <el-button type="warning" size="small" @click.native="handleClick(2)">乘客通知紧急联系人</el-button>
    </el-row>
    <el-table 
      :data="riskOrderListData" 
      highlight-current-row
      border
      inline
      stripe
      header-align="center" 
      style="width: 99%;" stripe
      :header-cell-style="getRowClass"
      element-loading-text="拼命加载中">
      <el-table-column label="订单ID" prop="orderID" align="center" min-width="120"></el-table-column>
      <el-table-column label="车牌号" prop="carNum" align="center" min-width="120"></el-table-column>
      <el-table-column label="司机姓名" prop="driverName" align="center" min-width="120"></el-table-column>
      <el-table-column label="司机电话" prop="driverPhone" align="center" min-width="120"></el-table-column>
      <el-table-column label="订单开始时间" prop="startTime" align="center" min-width="160"></el-table-column>
      <el-table-column label="订单预警时间" prop="warningTime" align="center" min-width="160"></el-table-column>
      <el-table-column label="预警原因" prop="WarningReason" align="center" min-width="160">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.WarningReason === '司机一键报警' ? 'danger' : scope.row.WarningReason === '严重偏航' ?'primary' : 'warning'"
            close-transition>{{scope.row.WarningReason}}</el-tag>
          </template>
      </el-table-column>
      <el-table-column label="订单详情" width="100">
        <template slot-scope="scope">
          <el-button type="text" @click.stop="viewOrderDetail(scope)" round size="mini" style='cursor: pointer'>查看</el-button>
        </template>
      </el-table-column>
    </el-table>

    <orderDetailDialog 
      :dialogVisible="dialogVisible" 
      :driverInfo="driverInfo" 
      :timeline="timeline" 
      :safeInfo="safeInfo" 
      :routeInfo="routeInfo" 
      :orderID="orderID" 
      @transfer="changeDialogVisible">
    </orderDetailDialog>
  </div>
</template>

<script>
  import { getRiskOrderList} from '@/api/riskOrder'
  import { getOrderDetail} from '@/api/orderDetail'
  import orderDetailDialog from '@/views/orderDetail/index.vue';
  export default {
    name: 'RiskOrder',
    data(){
      return {
        riskOrderListData:[],//数据

        dialogVisible:false,
        driverInfo:{},
        timeline:{},
        safeInfo:{},
        routeInfo:[],
        orderID:""
      }
    },
    computed:{
      
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
      getRiskOrderList() {
        getRiskOrderList()
          .then(response => {
            this.riskOrderListData = response.data.data.data.dataList;
          })
          .catch(error => {
            this.$message({
              showClose: true,
              message: 'sorry，获取风险订单列表失败',
              type: 'error'
            });
          });
      },
      handleClick(id) {
        this.getRiskOrderList(id);
      },

      /*************************/
      // 查看订单详情按钮
      viewOrderDetail(scope){
        this.dialogVisible = true;
        console.log(scope.row.orderID);
        this.orderID = scope.row.orderID;
        //获取订单详情
        this.getOrderDetail();
      },
      // 详情dialog关闭的时候触发的操作
      changeDialogVisible(){
        this.dialogVisible = false;
        this.driverInfo = {};
        this.timeline = {};
        this.safeInfo = {};
        this.routeInfo = [];
      },
      // 获取订单详情接口
      getOrderDetail() {
        getOrderDetail()
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
    },
    created(){
      this.getRiskOrderList(0);
    },
    mounted(){
      
    },
    watch: {
      
    }
  }
</script>

<style lang="less">
  .riskOrder{
    .tabsButton{
      margin: 20px 0;
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
  }
</style>