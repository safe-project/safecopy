<template>
  <div class="app-container">
    <el-table 
      :data="dataList" 
      highlight-current-row
      header-align="center" 
      style="width: 99%;" stripe
      :header-cell-style="getRowClass"
      element-loading-text="拼命加载中">
      <el-table-column label="订单ID" prop="orderID" align="center" min-width="120"></el-table-column>
      <el-table-column label="车牌号" prop="carNum" align="center" min-width="120"></el-table-column>
      <el-table-column label="司机姓名" prop="driverName" align="center" min-width="120"></el-table-column>
      <el-table-column label="司机电话" prop="driverNum" align="center" min-width="120"></el-table-column>
      <el-table-column label="订单开始时间" prop="startTime" align="center" min-width="160"></el-table-column>
      <el-table-column label="预警时间" prop="warningTime" align="center" min-width="160"></el-table-column>
      <el-table-column label="预警原因" prop="WarningReason" align="center" min-width="160">
        <template slot-scope="scope">
            <el-tag
              :type="scope.row.WarningReason === '司机一键报警' ? 'danger' : scope.row.WarningReason === '严重偏航' ?'primary' : 'warning'"
              close-transition>{{scope.row.WarningReason}}</el-tag>
            </template>
      </el-table-column>
      <el-table-column label="订单详情" width="100">
        <template slot-scope="scope">
          <el-button type="text">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
      <!-- <el-col :span="24" class="toolbar pageall">
        <pagination :total="total" @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange"></pagination>
      </el-col> -->
    <br> <br> <br> <br> <br>
    <div class="dashboard-text">name: {{ name }}</div>
    <div class="dashboard-text">roles: {{ roles }}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Homepage',
  computed: {
    ...mapGetters([
      'name','roles'
    ])
  },
  data () {
    return {
      dataList:[],//数据
      listLoading: false,//显示loading
      activeId: "0",

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
            carNum: '粤AK4758',
            driverName: '谢贾睿',
            driverNum: '13912348765',
            WarningReason: '司机一键报警',
            startTime: '2019-07-15 19:00:00',
            warningTime: '2019-07-15 19:30:00',
            reasonType: 1
          }, {
            orderID: '1234212',
            carNum: '粤AK4758',
            driverName: '谢贾睿',
            driverNum: '13912348765',
            WarningReason: '严重偏航',
            startTime: '2019-07-15 19:00:00',
            warningTime: '2019-07-15 19:30:00',
            reasonType: 2
          }, {
            orderID: '1234212',
            carNum: '粤AK4758',
            driverName: '谢贾睿',
            driverNum: '13912348765',
            WarningReason: '乘客通知紧急联系人',
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
          'activeId' :this.activeId
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
      this.query(0);
    }
}
</script>

<style scoped>

</style>
