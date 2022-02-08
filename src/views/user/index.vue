<template>
  <div class="user-body">
    <div class="user-info">
      <div class="user-info-img">
        <el-image
          class="user-info-img-img"
          :src="avatar"
          fit="cover"></el-image>
      </div>
      <div class="user-info-text">
        <div class="user-info-name">
          {{ name }}
        </div>
        <div class="user-info-word">
          您已在本网站注册
          <span class="user-info-word-num">
            {{ this.userInfo.days }}
          </span>
          天，这些天中您捐粮
          <span class="user-info-word-num">
            {{
              this.userInfo.foodNum !== null && this.userInfo.foodNum !== undefined ? this.userInfo.foodNum : 0
            }}
          </span>
          kg，捐款
          <span class="user-info-word-num">
            {{
              this.userInfo.moneyNum !== null && this.userInfo.moneyNum !== undefined ? this.userInfo.moneyNum : 0
            }}
          </span>
          元。接受您捐赠的用户、基地和受到帮助的小动物对您感激不尽。
        </div>
      </div>
    </div>
    <div class="user-list">
      <el-tabs
        type="border-card"
        :stretch="true"
        :value="tabChoose"
        tab-position="left"
        :before-leave="changTab"
        class="user-list-tab">
        <div class="user-list-search">
          <el-input
            class="user-list-tab-search"
            type="text"
            placeholder="请输入内容"
            v-model="table.searchValue"
            maxlength="10"
            show-word-limit
            clearable
            prefix-icon="el-icon-search"
          />
          <el-button class="user-list-tab-button" type="success" plain icon="el-icon-search" @click="search">搜索
          </el-button>
        </div>
        <el-tab-pane :lazy="true" label="救助信息" name="rescue">
          <el-table :data="tableList" border fit>
            <el-table-column label="发布人" width="110" align="center">
              <template slot-scope="scope">
                {{ scope.row.findUserName }}
              </template>
            </el-table-column>
            <el-table-column label="救助人" width="110" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.rescueUserName }}</span>
              </template>
            </el-table-column>
            <el-table-column label="动物昵称" width="110" align="center">
              <template slot-scope="scope">
                {{ scope.row.animal.name }}
              </template>
            </el-table-column>
            <el-table-column label="描述" show-overflow-tooltip width="110" align="center">
              <template slot-scope="scope">
                {{ scope.row.describes }}
              </template>
            </el-table-column>
            <el-table-column label="状态" width="110" align="center">
              <template slot-scope="scope">
                <el-tag>{{
                    statusOption.find(function (value) {
                      return value.value === scope.row.status;
                    }).label
                  }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column label="是否审核通过" width="110" align="center">
              <template slot-scope="scope">
                <el-tag :type="scope.row.isApproved | isFilter">
                  {{
                    isOptions.find(function (value) {
                      return value.value === scope.row.isApproved;
                    }).label
                  }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" align="center">
              <template slot-scope="scope">
                <!--TODO 增加跳转页面-->
                <el-button type="text" @click="getInfo(scope.row)">详情</el-button>
                <el-button type="text" @click="updateInfo(scope.row)">编辑</el-button>
                <el-button type="text" @click="deleteInfo(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane :lazy="true" label="领养信息" name="adopt">
          <el-table :data="tableList" border fit>
            <el-table-column label="发布人" width="110" align="center">
              <template slot-scope="scope">
                {{ scope.row.publisherName }}
              </template>
            </el-table-column>
            <el-table-column label="领养人" width="110" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.adoptUserName }}</span>
              </template>
            </el-table-column>
            <el-table-column label="动物昵称" width="110" align="center">
              <template slot-scope="scope">
                {{ scope.row.animal.name }}
              </template>
            </el-table-column>
            <el-table-column show-overflow-tooltip label="领养要求" width="110" align="center">
              <template slot-scope="scope">
                {{ scope.row.requirement }}
              </template>
            </el-table-column>
            <el-table-column show-overflow-tooltip label="领养前情况" width="110" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.beforSituation }}</span>
              </template>
            </el-table-column>
            <el-table-column class-name="status-col" label="是否审核通过" width="110" align="center">
              <template slot-scope="scope">
                <el-tag :type="scope.row.isApproved | isFilter">{{
                    isOptions.find(function (value) {
                      return value.value === scope.row.isApproved;
                    }).label
                  }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column label="状态" width="110" align="center">
              <template slot-scope="scope">
                <el-tag>{{
                    statusOption.find(function (value) {
                      return value.value === scope.row.status;
                    }).label
                  }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" align="center">
              <template slot-scope="scope">
                <el-button type="text" @click="getInfo(scope.row)">详情</el-button>
                <el-button type="text" @click="updateInfo(scope.row)">编辑</el-button>
                <el-button type="text" @click="deleteInfo(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane :lazy="true" label="资源对接信息" name="resource">
          <el-table :data="tableList" border fit>
            <el-table-column label="捐献者" width="110" align="center">
              <template slot-scope="scope">
                {{ scope.row.donorName }}
              </template>
            </el-table-column>
            <el-table-column label="需求者" width="110" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.giveeName }}</span>
              </template>
            </el-table-column>
            <el-table-column label="对接类型" width="110" align="center">
              <template slot-scope="scope">
                <el-tag>{{
                    typeOption.find(function (value) {
                      return value.value === scope.row.type;
                    }).label
                  }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column label="物资类别" width="110" align="center">
              <template slot-scope="scope">
                <el-tag>
                  {{
                    materialOptions.find(function (value) {
                      return value.value === scope.row.materialCategory;
                    }).label
                  }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column label="数量|金额" width="95" align="center">
              <template slot-scope="scope">
                {{ scope.row.amount }}
              </template>
            </el-table-column>
            <el-table-column label="状态" width="110" align="center">
              <template slot-scope="scope">
                <el-tag>{{
                    statusOption.find(function (value) {
                      return value.value === scope.row.status;
                    }).label
                  }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column class-name="status-col" label="是否审核通过" width="110" align="center">
              <template slot-scope="scope">
                <el-tag :type="scope.row.isApproved | isFilter">{{
                    isOptions.find(function (value) {
                      return value.value === scope.row.isApproved;
                    }).label
                  }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" align="center">
              <template slot-scope="scope">
                <el-button type="text" @click="getInfo(scope.row)">详情</el-button>
                <el-button type="text" @click="updateInfo(scope.row)">编辑</el-button>
                <el-button type="text" @click="deleteInfo(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-pagination
          class="page-component"
          background
          layout="prev, pager, next"
          :total="total"
          :current-page="table.page"
          @current-change="currentChange"
        />
      </el-tabs>

    </div>
  </div>
</template>

<script>
import {queryById} from '@/api/user'
import {getAdoptList} from '@/api/adopt'
import {getRescueList} from "@/api/resuce";
import {getResourceList} from "@/api/resource";
import {pcaa} from 'area-data';
import {mapGetters} from "vuex";

export default {
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'name',
      'id'
    ])
  },
  filters: {
    isFilter(status) {
      const statusMap = {
        YES: 'success',
        NO: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      //当前选择为哪个tab
      tabChoose: 'rescue',
      //当前tab展示的表格数据
      tableList: [],
      total: 0,
      resourceList: [],
      adoptList: [],
      rescueList: [],
      //用户信息
      userInfo: null,
      //地区数据
      pcaa: pcaa,
      // 加载变量
      listLoading: true,
      // 搜索值
      table: {
        searchValue: '',
        participantId: this.id,
        page: 1,
        pageSize: 10
      },
      // 是否选择
      isOptions: [
        {
          value: 'YES',
          label: '是'
        },
        {
          value: 'NO',
          label: '否'
        }
      ],
      //状态选择
      statusOption: [
        {
          value: 'UNCOMMIT',
          label: '信息未提交'
        },
        {
          value: 'UNAPPROVED',
          label: '信息未审核'
        },
        {
          value: 'WAITING',
          label: '等待对接人'
        },
        {
          value: 'TALKING',
          label: '双方沟通'
        },
        {
          value: 'UPLOAD',
          label: '上传过程'
        },
        {
          value: 'END',
          label: '结束'
        }
      ],
      materialOptions: [
        {
          value: 'MONEY',
          label: '金钱'
        },
        {
          value: 'FOOD',
          label: '粮食'
        },
        {
          value: 'WARM',
          label: '保暖物品'
        },
        {
          value: 'OTHER',
          label: '其他'
        }
      ],
      // 资源对接类型选择
      typeOption: [
        {
          value: 'DONATE',
          label: '捐献'
        },
        {
          value: 'DEMAND',
          label: '需求'
        }
      ],
    }
  },
  created() {
    this.fetchData(this.id)
    this.table.participantId = this.id
    this.getRescueData()
    document.getElementsByClassName("main-container")[0].style['background-color'] = '#f3f3f3'
  },
  methods: {
    search() {
      this.changTab(this.tabChoose, '')
    },
    changTab(active, old) {
      if (old !== 'changePage') {
        this.table.page = 1
      }
      this.table.participantId = this.id
      if (active === 'rescue') {
        this.tabChoose = 'rescue'
        this.getRescueData()
      } else if (active === 'adopt') {
        this.tabChoose = 'adopt'
        this.getAdoptData()
      } else if (active === 'resource') {
        this.tabChoose = 'resource'
        this.getResourceData()
      }
    },
    getResourceData() {
      this.listLoading = true
      getResourceList(this.table).then(response => {
        this.tableList = response.data.records
        this.total = response.data.total
      })
      this.listLoading = false
    },
    getAdoptData() {
      this.listLoading = true
      getAdoptList(this.table).then(response => {
        this.tableList = response.data.records
        this.total = response.data.total
      })
      this.listLoading = false
    },
    getRescueData() {
      this.listLoading = true
      getRescueList(this.table).then(response => {
        this.tableList = response.data.records
        this.total = response.data.total
      })
      this.listLoading = false
    },
    // 获取用户数据
    fetchData(param) {
      this.listLoading = true
      queryById(param).then(response => {
        this.userInfo = response.data
        let now = new Date()
        let createTime = new Date(this.userInfo.isBase === 'YES' ? this.userInfo.baseCreateTime : this.userInfo.createTime)
        this.userInfo.days = parseInt((now.getTime() - createTime.getTime()) / 86400000)
      })
      this.listLoading = false
    },
    // 分页组件选页改变时调用函数
    currentChange(newPage) {
      this.table.page = newPage
      this.changTab(this.tabChoose, 'changePage')
    }
  },
  destroyed() {
    document.getElementsByClassName("main-container")[0].style['background-color'] = '#ffffff'
  }
}
</script>

<style scoped lang="scss">
.table-column {
  height: 100px;
}

.user-body {
  .user-info {

    background-color: white;
    padding: 3em;

    .user-info-img {
      display: inline-block;
      width: 8em;
      height: 8em;
      box-shadow: 1px 1px 5px #888888;

      .user-info-img-img {

      }
    }

    .user-info-text {
      width: 80%;
      display: inline-block;
      padding: 0 2em;
      vertical-align: top;

      .user-info-name {
        font-size: 1.5em;
        line-height: 2em;
        font-weight: bolder;
      }

      .user-info-word {
        font-size: 1em;
        line-height: 1.5em;

      }

      .user-info-word-num {
        color: #5ec231;
      }
    }
  }

  .user-list {
    background-color: white;

    .user-list-tab {
      margin: 1em 0;

      .user-list-search {
        margin-bottom: 1em;

        .user-list-tab-search {
          display: inline-block;
          width: 40%;
          margin-right: 1em;
        }

        .user-list-tab-button {
          display: inline-block;
          width: 10%;
        }
      }

      .user-list-tab-label {
      }
    }
  }
}
</style>
