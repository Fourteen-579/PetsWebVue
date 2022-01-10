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
          <el-select clearable v-model="table.isApproved" placeholder="请选择是否审核通过">
            <el-option
              v-for="item in isOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-select clearable v-model="table.type" placeholder="请选择对接类别">
            <el-option
              v-for="item in typeOption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-select clearable v-model="table.status" placeholder="请选择状态">
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
            }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="描述" align="center">
        <template slot-scope="scope">
          {{ scope.row.describes }}
        </template>
      </el-table-column>
      <el-table-column label="物资类别" width="110" align="center">
        <template slot-scope="scope">
          <el-tag>
            {{
              materialOptions.find(function (value) {
                return value.value === scope.row.materialCategory;
              }).label
            }}</el-tag>
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
          <el-col :span="12">
            <el-form-item label="捐献者" prop="donor">
              <el-select v-model="form.donor" placeholder="请选择捐献者">
                <el-option
                  v-for="item in userOption"
                  :key="item.id"
                  :label="item.nickName"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="需求者" prop="givee">
              <el-select v-model="form.givee" placeholder="请选择需求者">
                <el-option
                  v-for="item in userOption"
                  :key="item.id"
                  :label="item.nickName"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="状态" prop="status">
              <el-select v-model="form.status" placeholder="请选择状态">
                <el-option
                  v-for="item in statusOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="标签" prop="label">
              <el-select v-model="form.label" multiple placeholder="请选择标签">
                <el-option
                  v-for="item in labelOption"
                  :key="item.id"
                  :label="item.value"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="对接时间" prop="collectionTime">
              <el-date-picker
                style="width: auto;"
                v-model="form.collectionTime"
                type="datetime"
                placeholder="选择日期时间"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="对接类型" prop="type">
              <el-select v-model="form.type" placeholder="请选择对接类型">
                <el-option
                  v-for="item in typeOption"
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
          <el-col :span="8">
            <el-form-item label="物资类别" prop="materialCategory">
              <el-select v-model="form.materialCategory" placeholder="请选择物资类别">
                <el-option
                  v-for="item in materialOptions"
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
            <el-form-item label="金额|数量" prop="amount">
              <el-input v-model="form.amount"
                        type="textarea"
                        :rows="2"
                        placeholder="请输入内容"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="地点" prop="location">
              <el-input v-model="form.location"
                        type="textarea"
                        :rows="2"
                        placeholder="请输入内容"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="描述" prop="describes">
              <el-input v-model="form.describes"
                        type="textarea"
                        :rows="2"
                        placeholder="请输入内容"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="对接过程" prop="process">
              <el-input v-model="form.process"
                        type="textarea"
                        :rows="2"
                        placeholder="请输入内容"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-upload
              :limit="4"
              class="upload-demo"
              action="http://localhost:8089/picture/upload"
              :on-remove="handleRemove"
              :on-success="fileUploadSuccess"
              :file-list="fileList"
              list-type="picture">
              <el-button size="small" type="primary">点击上传图片</el-button>
            </el-upload>
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
import {getResourceList, updateResource, addResource, deletedResource} from '@/api/resource'
import {getUserList} from '@/api/user'
import {getLabelList} from "@/api/label"

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
      fileList: [],
      labelOption: [],
      materialOptions: [
        {
          value: 'MONEY',
          label: '金钱'
        },
        {
          value: 'FOOT',
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
      //表单验证
      formRules: {
        type: [{required: true, message: '请选择对接类型', trigger: 'blur'}],
        status: [
          {required: true, message: '请选择状态', trigger: 'blur'}
        ],
        materialCategory: [
          {required: true, message: '请选择物资类别', trigger: 'blur'}
        ],
        amount: [
          {required: true, message: '请输入金额|数量', trigger: 'blur'}
        ],
        isApproved: [
          {required: true, message: '请选择是否审核通过', trigger: 'blur'}
        ]
      },
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
      //是否禁用表单
      disabledForm: false,
      userOption: [],
      // 对话框中表单
      form: {
        id: '',
        status: '',
        donor: '',
        givee: '',
        materialCategory: '',
        describes: '',
        process: '',
        amount: 0,
        isApproved: '',
        collectionTime: '',
        location: '',
        type: '',
        label: [],
        photo: []
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
        searchValue: null,
        type: null,
        isApproved: null,
        status: null,
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
    this.getLabelOptions(search)
    this.getUserOptions(search)
  },
  methods: {
    //文件上传成功
    fileUploadSuccess(response, file, fileList) {
      console.log(fileList)
      console.log(this.fileList)
      this.fileList = fileList
    },
    //移除某一文件
    handleRemove(file, fileList) {
      console.log(file, fileList);
      this.fileList = fileList
    },
    getLabelOptions(search) {
      getLabelList(search).then(response => {
        this.labelOption = response.data.records
      })
    },
    getUserOptions(search) {
      getUserList(search).then(response => {
        this.userOption = response.data.records
      })
    },
    initForm(row) {
      this.form.id = row.id
      this.form.status = row.status
      this.form.donor = row.donor
      this.form.givee = row.givee
      this.form.materialCategory = row.materialCategory
      this.form.describes = row.describes
      this.form.process = row.process
      this.form.amount = row.amount
      this.form.isApproved = row.isApproved
      this.form.collectionTime = row.collectionTime
      this.form.location = row.location
      this.form.type = row.type
      // this.form.photo = row.photos
      this.form.label = row.label
      if (this.form.photo === undefined) {
        this.form.photo = []
        this.fileList = []
      }
      this.fileList = row.photos
    },
    getInfo(row) {
      this.dialogVisible = true
      this.disabledForm = true
      // this.dialogTitile = '详情'
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
        deletedResource(row.id).then(response => {
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
      this.form.status = ''
      this.form.donor = ''
      this.form.givee = ''
      this.form.materialCategory = ''
      this.form.describes = ''
      this.form.process = ''
      this.form.amount = 0
      this.form.isApproved = ''
      this.form.collectionTime = ''
      this.form.location = ''
      this.form.type = ''
      this.form.label = []
      this.form.photo = []
      this.fileList = []
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
      updateResource(this.form).then(response => {
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
      let _that = this
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.listLoading = true
          this.form.collectionTime = Date.parse(this.form.collectionTime)
          this.form.photo = []
          if (this.fileList !== undefined && this.fileList !== null && this.fileList !== []) {
            for (let i = 0; i < this.fileList.length; i++) {
              console.log(this.fileList[i])
              if (this.fileList[i].response === undefined) {
                _that.form.photo.push(this.fileList[i].id)
              } else {
                _that.form.photo.push(this.fileList[i].response.data.id)
              }
            }
          }
          if (this.dialogTitile == '更新') {
            updateResource(this.form).then(response => {
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
            addResource(this.form).then(response => {
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
      getResourceList(this.table).then(response => {
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

/deep/ .el-table .warning-row {
  background: #fcbfbf;
}
</style>
