<template>
  <div class="riskOrder">
    <el-row class="tabsButton">
      <el-button 
        size="small" 
        :class="item.isActive?'isActive':'isNormal'"
        v-for="item in tabsButtonList" 
        :key="item.id" 
        :value="item.id" 
        @click.native="handleClick(item.id)">{{item.label}}</el-button>
    </el-row>
    <el-table 
      :data="riskOrderListData" 
      highlight-current-row
      height="510"
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
  </div>
</template>

<script>
  import { mapState,mapGetters,mapActions } from 'vuex';
  import { getRiskOrderList} from '@/api/riskOrder'
  import { getOrderDetail} from '@/api/orderDetail'
  import orderDetailDialog from '@/views/orderDetail/index.vue';
  export default {
    name: 'RiskOrder',
    data(){
      return {
        tabsButtonList: [
          {
            id:'0',
            isActive:false,
            label:'全部'
          },{
            id:'1',
            isActive:false,
            label:'司机一键报警'
          },{
            id:'2',
            isActive:false,
            label:'严重偏航'
          },{
            id:'3',
            isActive:false,
            label:'乘客通知紧急联系人'
          }
        ],
        riskOrderListData:[],//数据
        stateId:"0",
        dialogVisible:false,
        DetailsPageActive:3,
        driverInfo:{},
        timeline:[],
        safeInfo:{},
        routeInfo:[],
        orderID:"",
        currentPage:1,
        total:0,
        page:1,
        limit:20,
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
      getRiskOrderList(id,page,limit) {
        getRiskOrderList(id,page,limit)
          .then(response => {
            this.total = response.data.data.data.total;
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
        console.log(id);
        this.stateId = id;
        this.tabsButtonList[id].isActive = true;
        for (var i = 0; i < this.tabsButtonList.length; i++) {
          this.tabsButtonList[i].isActive = (i == id)?true:false;
        }
        this.getRiskOrderList(id,1,this.limit);
      },

      /*************************/
      // 查看订单详情按钮
      viewOrderDetail(scope){
        console.log(scope.row.orderID);
        this.orderID = scope.row.orderID;
        //获取订单详情
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
      handleCurrentChange(val) {
        this.page = val;
        this.getRiskOrderList(this.stateId,this.page, this.limit);
      },
      handleSizeChange(val) {
        this.limit = val;
        this.getRiskOrderList(this.stateId,this.page, this.limit);
      },
      /*************************/
      ...mapActions(['setVorderId'])
    },
    created(){
      this.getRiskOrderList(0,1,this.limit);
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
      margin-bottom: 15px;  
      .el-button:focus, .el-button:hover{
        color:#fff;
        background-color:  #4278EF;
      }
      .isActive{
        background: #4278EF;
        color: white;
      }
    }
    .el-button--text:focus, .el-button--text:hover{
      color: #4278EF;
      font-weight: bolder;
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