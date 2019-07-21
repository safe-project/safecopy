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
        :header-cell-style="getRowClass"
        class="innerTable">
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
              <el-tooltip class="item" effect="dark" content="查看订单详情" placement="top">
                  <el-button type="primary" @click="" round size="mini">查看</el-button>
              </el-tooltip>
          </template>
        </el-table-column>

<!--             <el-table-column
                prop="app_id"
                label="应用ID"
                width="60">
            </el-table-column>
            <el-table-column
                prop="app_desc"
                label="应用描述"
                width="80"
                show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                prop="app_sql_desc"
                label="脚本描述"
                show-overflow-tooltip>
            </el-table-column>

            <el-table-column
                prop="tag"
                label="计算状态"
                width="100"
                filter-placement="bottom-end">
              <template slot-scope="scope">
                    <el-popover trigger="hover" placement="left" @show="viewJobProgress(scope)">
                        <p style="margin-bottom: 5px;">执行进度:</p>
                        <el-progress :text-inside="true" :stroke-width="18" :percentage="percentage" :status="progressStatus"></el-progress>
                        <div slot="reference" class="name-wrapper">
                            <el-tag :type="tagType(scope)" disable-transitions v-if="scope.row.job_status === 0">INIT</el-tag>
                            <el-tag :type="tagType(scope)" disable-transitions v-if="scope.row.job_status === 1">RUNNING</el-tag>
                            <el-tag :type="tagType(scope)" disable-transitions v-if="scope.row.job_status === 2">FAILED</el-tag>
                            <el-tag :type="tagType(scope)" disable-transitions v-if="scope.row.job_status === 3">DONE</el-tag>
                        </div>
                    </el-popover>
              </template>
            </el-table-column>

            <el-table-column
                prop="job_erp"
                label="用户名"
                width="80"
                show-overflow-tooltip>
            </el-table-column>
        
            <el-table-column
                label="完成日期"
                width="100"
                show-overflow-tooltip>
                <template slot-scope="scope">
                    <i class="el-icon-time" v-if="scope.row.finish_date"></i>
                    <span>{{ scope.row.finish_date }}</span>
                </template>
            </el-table-column>
        
            <el-table-column
                label="最后一次备份更新日期"
                width="100"
                show-overflow-tooltip>
                <template slot-scope="scope">
                    <i class="el-icon-time" v-if='scope.row.backup_date'></i>
                    <span>{{ scope.row.backup_date }}</span>
                </template>
            </el-table-column>
        
            <el-table-column
                prop="job_tag"
                label="备份标签"
                show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                label="操作"
                width="460">
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" content="修改备份标签" placement="top">
                        <el-button type="primary" @click="modifyBackupTag(scope)" round size="mini">修改标签</el-button>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="查看基础表" placement="top">
                        <el-button type="success" @click="viewSrcVersion(scope)" round size="mini">基础表</el-button>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="查看参数表" placement="top">
                        <el-button type="info" @click="viewParamsTable(scope)" round size="mini">参数表</el-button>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="查看计算结果" placement="top">
                        <el-button type="warning" @click="viewResult(scope)" round size="mini">结果</el-button>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="下载报表合并结果" placement="top">
                        <el-button type="danger" @click="downloadAllResult(scope)" round size="mini">下载合并结果</el-button>
                    </el-tooltip>
                </template>
            </el-table-column> -->
      </el-table>
    </div>
    <!-- <div class="dashboard-text">name: {{ name }}</div>
    <div class="dashboard-text">roles: {{ roles }}</div> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getOrderList} from '@/api/homepage'
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
    }
  },
  methods : {
    getRowClass({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'background:#e5e5e5'
      }
    },
    getOrderList() {
      getOrderList()
          .then(response => {
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
  },
  created(){
    this.getOrderList();
  }
}
</script>

<style lang="less">
.homepage .orderList{
  .el-table__header tr,.el-table__header th {
    padding: 0;
    height: 40px;
    font-size: 12px;
    color: #348dba;
  }
  .el-table__body tr,.el-table__body td {
      padding: 0;
      height: 40px;
      font-size: 12px;
  }
}

</style>
