<template>
  <div class="homepage">
    <div class="orderList">
      <el-table
        :data="orderListData"
        border
        inline
        stripe
        v-loading="loading"
        header-align="center" 
        highlight-current-row
        style="width: 99%;"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(193, 193, 193, 0.6)"
        :header-cell-style="getRowClass">
        <el-table-column
          prop="orderID"
          label="订单ID"
          min-width="140"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="carNum"
          label="车牌号"
          min-width="80"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column 
          label="司机姓名" 
          prop="driverName" 
          align="center" 
          min-width="80"
          show-overflow-tooltip>
          </el-table-column>
        <el-table-column 
          label="司机电话" 
          prop="driverNum" 
          align="center" 
          min-width="100"
          show-overflow-tooltip>
          </el-table-column>
        <el-table-column 
          label="订单开始时间" 
          prop="startTime" 
          align="center" 
          min-width="160"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column 
        label="预警时间" 
        prop="warningTime" 
        align="center" 
        min-width="160"
        show-overflow-tooltip>
        </el-table-column>
        <el-table-column 
          label="预警原因" 
          prop="WarningReason" 
          align="center" 
          min-width="160"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.WarningReason === '司机一键报警' ? 'danger' : scope.row.WarningReason === '严重偏航' ?'primary' : 'warning'"
              close-transition>{{scope.row.WarningReason}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="订单详情"
          width="140"
          align="center">
          <template slot-scope="scope">
              <!-- <el-tooltip class="item" effect="dark" content="查看订单详情" placement="top">
                  <el-button type="primary" @click.stop="viewOrderDetail(scope)" round size="mini" style='cursor: pointer'>查看</el-button>
              </el-tooltip> -->

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

    <orderDetailDialog 
      :dialogVisible="dialogVisible" 
      :DetailsPageActive="DetailsPageActive"
      :driverInfo="driverInfo" 
      :timeline="timeline" 
      :safeInfo="safeInfo" 
      :routeInfo="routeInfo" 
      :orderID="orderID" 
      @transfer="changeDialogVisible">
    </orderDetailDialog>


    <!-- <div class="dashboard-text">name: {{ name }}</div>
    <div class="dashboard-text">roles: {{ roles }}</div> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { getOrderList} from '@/api/homepage';
import { getOrderDetail} from '@/api/orderDetail';
import orderDetailDialog from '@/views/orderDetail/index.vue';
export default {
  name: 'Homepage',
  computed: {
    ...mapGetters([
      'name','roles'
    ])
  },
  data () {
    return {
      orderListData:[],
      loading: false,
      /*************************/
      DetailsPageActive:3,
      dialogVisible:false,
      driverInfo:{},
      timeline:[],
      safeInfo:{},
      routeInfo:[],
      orderID:"",
      /*************************/
      currentPage:1,
      total:0,
      page:1,
      limit:10,
      /*************************/
    }
  },
  /*************************/
  components:{ orderDetailDialog },
  /*************************/
  methods : {
    getRowClass({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'background:#e5e5e5'
      }
    },
    getOrderList(page,limit) {
      getOrderList(page,limit)
        .then(response => {
          this.total = response.data.data.data.total;
          this.orderListData = response.data.data.data.dataList;
        })
        .catch(error => {
          this.$message({
            showClose: true,
            message: 'sorry，获取订单列表失败',
            type: 'error'
          });
        });
    },
    /*************************/
    // 查看订单详情按钮
    viewOrderDetail(scope){
      this.dialogVisible = true;
      console.log(scope.row.orderID);
      this.orderID = scope.row.orderID;
      //获取订单详情
      this.getOrderDetail(scope.row.orderID);
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
    handleCurrentChange(val) {
      this.page = val;
      this.getOrderList(this.page, this.limit);
    },
    handleSizeChange(val) {
      this.limit = val;
      this.getOrderList(this.page, this.limit);
    },
    /*************************/
  },
  created(){
    this.getOrderList(this.page, this.limit);
  }
}
</script>

<style lang="less">
.homepage .orderList{
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
    margin-bottom: 50px;
    .el-pagination{
      float:right;
    }
  }
}

  .el-button--text:focus, .el-button--text:hover{
    color: #4278EF;
    font-weight: bolder;
  }

</style>
