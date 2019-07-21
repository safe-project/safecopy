<template>
  <div class="app-container">
    <!-- <bread-crumb :page="$options.const.pageName"></bread-crumb> -->
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
      :data="dataList" 
      header-align="center" 
      style="width: 99%;" 
      element-loading-text="拼命加载中" stripe >
      <el-table-column label="订单ID" prop="orderID" align="center" min-width="120"></el-table-column>
      <el-table-column label="车牌号" prop="carNum" align="center" min-width="120"></el-table-column>
      <el-table-column label="司机姓名" prop="driverName" align="center" min-width="120"></el-table-column>
      <el-table-column label="司机电话" prop="driverNum" align="center" min-width="120"></el-table-column>
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
    name: 'Riskorder',
    data () {
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
      handleSizeChange(val) {
        this.pageSize = val;
        this.query();
      },
      handleCurrentChange(val) {
        this.page = val;
        this.query();
      },
      handleClick(val) {
        this.activeId = val;
        this.tabsButtonList[val].isActive = true;
        for (var i = 0; i < this.tabsButtonList.length; i++) {
          this.tabsButtonList[i].isActive = (i == val)?true:false;
        }
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
      this.handleClick(0);
    }
  }
</script>
<style scoped>
  .tabsButton{
    margin-bottom: 15px;
  }
  .tabsButton .el-button:focus, .el-button:hover{
    background: #4278EF;
    color: white;
  }
  .isActive{
    background: #4278EF;
    color: white;
  }

</style>
