<template>
  <div class="app-container">
    <div class="top-search">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-input
            clearable
            v-model="table.searchValue"
            type="text"
            placeholder="请输入搜索值"
            maxlength="10"
            show-word-limit
          />
        </el-col>
        <el-col :span="4">
          <el-select
            clearable v-model="table.isApproved" placeholder="请选择是否审核通过">
            <el-option
              v-for="item in isOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-select
            clearable v-model="table.status" placeholder="请选择状态">
            <el-option
              v-for="item in statusOption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" icon="el-icon-search" @click="fetchData">搜索</el-button>
          <el-button type="primary" icon="el-icon-plus" @click="addInfo">新增</el-button>
        </el-col>
      </el-row>


    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
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
          {{ scope.row.animalName }}
        </template>
      </el-table-column>
      <el-table-column label="领养要求" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.requirement }}
        </template>
      </el-table-column>
      <el-table-column label="领养前情况" width="110" align="center">
        <template slot-scope="scope">
          <i class="el-icon-time"/>
          <span>{{ scope.row.beforSituation }}</span>
        </template>
      </el-table-column>
      <el-table-column label="领养后情况" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.afterSituation }}
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
            }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="290" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="getInfo(scope.row)">详情</el-button>
          <el-button type="text" @click="updateInfo(scope.row)">编辑</el-button>
          <el-button type="text" @click="deleteInfo(scope.row)">删除</el-button>
          <el-button type="text" @click="approve(scope.row,0)">审核通过</el-button>
          <el-button type="text" @click="approve(scope.row,1)">审核不通过</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="page-component"
      background
      layout="prev, pager, next"
      :total="total"
      :current-page="table.page"
      @current-change="currentChange"
    />
    <el-dialog top="0" :title="dialogTitile" :visible.sync="dialogVisible">
      <el-form label-position="top" ref="form" :model="form" :disabled='disabledForm' :rules="formRules">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="发布者" prop="publisher">
              <el-select v-model="form.publisher" placeholder="请选择发布者">
                <el-option
                  v-for="item in userOption"
                  :key="item.id"
                  :label="item.nickName"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="领养者" prop="adoptUser">
              <el-select v-model="form.adoptUser" placeholder="请选择领养人">
                <el-option

                  v-for="item in userOption"
                  :key="item.id"
                  :label="item.nickName"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="领养动物" prop="animalId">
              <el-select v-model="form.animalId" placeholder="请选择领养动物">
                <el-option
                  v-for="item in animalOption"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="领养时间" prop="adoptTime">
              <el-date-picker
                style="width: auto"
                v-model="form.adoptTime"
                type="datetime"
                placeholder="选择日期时间"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="状态" prop="status">
              <el-select v-model="form.status" placeholder="请选择状态">
                <el-option
                  clearable
                  v-for="item in statusOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="是否审核通过" prop="isApproved">
              <el-select v-model="form.isApproved" placeholder="请选择状态">
                <el-option
                  v-for="item in isOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="领养前情况" prop="beforSituation">
              <el-input v-model="form.beforSituation"
                        type="textarea"
                        :rows="2"
                        placeholder="请输入内容"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="领养后情况" prop="afterSituation">
              <el-input v-model="form.afterSituation"
                        type="textarea"
                        :rows="2"
                        placeholder="请输入内容"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="领养要求" prop="requirement">
              <el-input v-model="form.requirement"
                        type="textarea"
                        :rows="2"
                        placeholder="请输入内容"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="领养过程" prop="process">
              <el-input v-model="form.process"
                        type="textarea"
                        :rows="2"
                        placeholder="请输入内容"/>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button v-if="dialogTitile != '详情'" type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {getAdoptList, updateAdopt, addAdopt, deletedAdopt} from '@/api/adopt'
import {getUserList} from '@/api/user'
import {getAnimalList} from '@/api/animal'

export default {
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
      //表单验证
      formRules: {
        publisher: [
          {required: true, message: '请选择发布人', trigger: 'blur'}
        ],
        animalId: [
          {required: true, message: '请选择救助动物', trigger: 'blur'}
        ],
        isApproved: [
          {required: true, message: '请选择是否审核通过', trigger: 'blur'}
        ],
        status: [
          {required: true, message: '请选择状态', trigger: 'blur'}
        ],
        findSituation: [
          {required: true, message: '请选择发现时情况', trigger: 'blur'}
        ],
        requirement: [
          {required: true, message: '请输入领养要求', trigger: 'blur'}
        ]
      },
      animalOption: [],
      //是否禁用表单
      disabledForm: false,
      userOption: [],
      // 对话框中表单
      form: {
        id: '',
        animalId: '',
        adoptUser: '',
        requirement: '',
        afterSituation: '',
        publisher: '',
        adoptTime: '',
        process: '',
        beforSituation: '',
        status: '',
        isApproved: ''
      },
      // 对话框标题
      dialogTitile: '',
      // 对话框可视变量
      dialogVisible: false,
      // 表格数据数量
      total: 0,
      // 数据
      list: [],
      // 加载变量
      listLoading: true,
      // 搜索值
      table: {
        searchValue: '',
        isApproved: null,
        status: '',
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
      ]
    }
  },
  created() {
    this.fetchData()
    var search = {
      page: 1,
      pageSize: 999
    }
    this.getUserOptions(search)
    this.getAnimalOptions(search)
  },
  methods: {
    getAnimalOptions(search) {
      getAnimalList(search).then(response => {
        this.animalOption = response.data.records
      })
    },
    getUserOptions(search) {
      getUserList(search).then(response => {
        this.userOption = response.data.records
      })
    },
    initForm(row) {
      this.form.id = row.id
      this.form.animalId = row.animalId
      this.form.adoptUser = row.adoptUser
      this.form.requirement = row.requirement
      this.form.afterSituation = row.afterSituation
      this.form.publisher = row.publisher
      this.form.adoptTime = row.adoptTime
      this.form.process = row.process
      this.form.beforSituation = row.beforSituation
      this.form.status = row.status
      this.form.isApproved = row.isApproved
    },
    getInfo(row) {
      this.dialogVisible = true
      this.disabledForm = true
      this.dialogTitile = '详情'
      this.initForm(row)
    },
    updateInfo(row) {
      this.dialogVisible = true
      this.disabledForm = false
      this.dialogTitile = '更新'
      this.initForm(row)
    },
    deleteInfo(row) {
      this.$confirm('是否确认删除该条信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.listLoading = true
        deletedAdopt(row.id).then(response => {
          if (response.code == 200) {
            this.$message({
              message: '删除成功',
              type: 'success'
            });
          } else {
            this.$message.error('删除失败');
          }
          this.listLoading = false
          this.fetchData();
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    //新增救助信息
    addInfo() {
      this.dialogVisible = true
      this.disabledForm = false
      this.dialogTitile = '新增'
      this.form.id = ''
      this.form.animalId = ''
      this.form.adoptUser = ''
      this.form.requirement = ''
      this.form.afterSituation = ''
      this.form.publisher = ''
      this.form.adoptTime = ''
      this.form.process = ''
      this.form.beforSituation = ''
      this.form.status = ''
      this.form.isApproved = ''
    },
    //更新是否审核通过
    approve(row, status) {
      this.listLoading = true
      this.form.id = row.id
      if (status == 0) {
        this.form.isApproved = 'YES'
      } else {
        this.form.isApproved = 'NO'
      }
      updateAdopt(this.form).then(response => {
        if (response.code == 200) {
          this.$message({
            message: '更新成功',
            type: 'success'
          });
          this.fetchData();
        } else {
          this.$message.error('更新失败');
        }
        this.listLoading = false
      })
    },
    //点击确定按钮后的操作
    submit() {
      console.log(this.form)
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.listLoading = true
          this.form.adoptTime = Date.parse(this.form.adoptTime)
          if (this.dialogTitile == '更新') {
            updateAdopt(this.form).then(response => {
              if (response.code == 200) {
                this.$message({
                  message: '更新成功',
                  type: 'success'
                });
                this.dialogVisible = false
                this.fetchData();
              } else {
                this.$message.error('更新失败');
              }
              this.listLoading = false
            })
          } else if (this.dialogTitile == '新增') {
            addAdopt(this.form).then(response => {
              if (response.code == 200) {
                this.$message({
                  message: '新增成功',
                  type: 'success'
                });
                this.dialogVisible = false
                this.fetchData();
              } else {
                this.$message.error('新增失败');
              }
              this.listLoading = false
            })
          }
        } else {
          console.log('数据格式错误请检查！');
        }
      });
    },
    // 获取数据
    fetchData() {
      this.listLoading = true
      getAdoptList(this.table).then(response => {
        this.total = response.data.total
        this.list = response.data.records
      })
      this.listLoading = false
    },
    // 分页组件选页改变时调用函数
    currentChange(newPage) {
      this.table.page = newPage
      this.fetchData()
    }
  }
}
</script>

<style scoped>
.top-search {
  margin-bottom: 20px;
  color: #20a0ff;
}
</style>
