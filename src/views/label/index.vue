<template>
  <div class="app-container">
    <div class="top-search">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-input
            v-model="table.searchValue"
            type="text"
            placeholder="请输入搜索值"
            maxlength="10"
            show-word-limit
          />
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
      <el-table-column align="center" label="ID" width="500">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="标签值" width="500" align="center">
        <template slot-scope="scope">
          {{ scope.row.value }}
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="updateInfo(scope.row)">编辑</el-button>
          <el-button type="text" @click="deleteInfo(scope.row)">删除</el-button>
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
    <el-dialog :title="dialogTitile" :visible.sync="dialogVisible">
      <el-form ref="form" :model="form" :disabled='disabledForm' :rules="formRules">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="Key" prop="key">
              <el-input v-model="form.key"
                        type="textarea"
                        :rows="2"
                        placeholder="请输入内容"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Value" prop="value">
              <el-input v-model="form.value"
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
import {getLabelList, updateLabel, addLabel, deletedLabel} from '@/api/label'

export default {
  data() {
    return {
      //表单验证
      formRules: {
        key: [
          {required: true, message: '请输入Key', trigger: 'blur'}
        ],
        value: [
          {required: true, message: '请输入Value', trigger: 'blur'}
        ]
      },
      //是否禁用表单
      disabledForm: false,
      // 对话框中表单
      form: {
        id: '',
        key: '',
        value: ''
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
        page: 1,
        pageSize: 10
      },
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    initForm(row) {
      this.form.id = row.id
      this.form.key = row.key
      this.form.value = row.value
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
        deletedLabel(row.id).then(response => {
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
      this.form.key = ''
      this.form.value = ''
    },
    //点击确定按钮后的操作
    submit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.listLoading = true
          this.form.rescueTime = Date.parse(this.form.rescueTime)
          if (this.dialogTitile == '更新') {
            updateLabel(this.form).then(response => {
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
            addLabel(this.form).then(response => {
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
      getLabelList(this.table).then(response => {
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
