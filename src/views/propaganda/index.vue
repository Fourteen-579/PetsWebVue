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
          <el-select clearable v-model="table.associationType" placeholder="请选择关联类型">
            <el-option
              v-for="item in associationTypeOptions"
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
      <el-table-column label="关联类型" width="110" align="center">
        <template slot-scope="scope">
          <el-tag>{{
              associationTypeOptions.find(function (value) {
                return value.value === scope.row.associationType;
              }).label
            }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="关联id" width="150" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.associationId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="宣传描述" width="300" align="center">
        <template slot-scope="scope">
          <div
            id="content"
            v-html="scope.row.describes"
            style="
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              width: 100%;
              height: 34px;
              text-align: center;
            "
          ></div>
        </template>
      </el-table-column>
      <el-table-column label="点赞数" width="110" align="center">
        <template slot-scope="scope">
          <i class="el-icon-thumb"/>
          <span>{{ scope.row.user !== undefined ? scope.row.user.length : 0 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="评论数" width="110" align="center">
        <template slot-scope="scope">
          <i class="el-icon-chat-round"/>
          {{ scope.row.comment !== undefined && scope.row.comment !== null ? scope.row.comment.length : 0 }}
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

    <el-pagination
      class="page-component"
      background
      layout="prev, pager, next"
      :total="total"
      :current-page="table.page"
      @current-change="currentChange"
    />

    <el-dialog top="0" :title="dialogTitile" :visible.sync="dialogVisible">
      <el-form ref="form" :model="form" :disabled='disabledForm' :rules="formRules">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="关联类型" prop="associationType">
              <el-select v-model="form.associationType" placeholder="请选择关联类型">
                <el-option
                  v-for="item in associationTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="关联id" prop="associationId">
              <el-select v-model="form.associationId" placeholder="请选择关联id">
                <el-option
                  v-for="item in associationIdOptions"
                  :key="item.id"
                  :label="item.beforSituation"
                  :value="item.id"
                />
              </el-select>
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
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="点赞用户" prop="user">
              <el-tag
                v-for="tag in form.user"
                :key="tag.id"
                closable>
                {{ tag.nickName }}
              </el-tag>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="用户评论" prop="comment">
              <el-button size="mini" type="success" plain @click="addComment">新增</el-button>
              <el-table
                :data="form.comment"
                style="width: 100%"
                max-height="250">
                <el-table-column
                  fixed
                  prop="createUserName"
                  label="用户昵称"
                  width="120">
                  <template slot-scope="scope">
                    <el-select v-model="scope.row.createUser" placeholder="请选择评论用户">
                      <el-option
                        v-for="item in userOptions"
                        :key="item.id"
                        :label="item.nickName"
                        :value="item.id"
                      />
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="content"
                  label="评论内容"
                  width="400">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      :rows="2"
                      placeholder="请输入内容"
                      v-model="scope.row.content">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  fixed="right"
                  label="操作">
                  <template slot-scope="scope">
                    <el-button
                      @click.native.prevent="deleteRow(scope.$index, form.comment)"
                      type="text"
                      size="small">
                      移除
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="宣传描述">
              <quill-editor ref="text" v-model="form.describes" class="myQuillEditor"/>
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
import {getPropagandaList, updatePropaganda, addPropaganda, deletedPropaganda} from '@/api/propaganda'
import {getAdoptList} from '@/api/adopt'
import {getRescueList} from '@/api/resuce'
import {getResourceList} from '@/api/resource'
import {getUserList} from '@/api/user'
import {quillEditor} from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import "highlight.js/styles/monokai-sublime.css";

export default {
  components: {
    quillEditor
  },
  data() {
    return {
      //用户选择
      userOptions: [],
      // 关联id选择
      associationIdOptions: [],
      //表单验证
      formRules: {
        associationType: [
          {required: true, message: '请选择关联类型', trigger: 'blur'}
        ],
        associationId: [
          {required: true, message: '请选择关联id', trigger: 'blur'}
        ],
        status: [
          {required: true, message: '请选择状态', trigger: 'blur'}
        ]
      },
      //是否禁用表单
      disabledForm: false,
      // 对话框中表单
      form: {
        id: '',
        status: '',
        describes: '',
        associationType: '',
        associationId: '',
        user: [],
        comment: []
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
        associationType: null,
        status: '',
        page: 1,
        pageSize: 10
      },
      // 关联类型选择
      associationTypeOptions: [
        {
          value: 'RESCUE',
          label: '救助'
        },
        {
          value: 'ADOPT',
          label: '领养'
        },
        {
          value: 'RESOURCE',
          label: '资源对接'
        }
      ],
      // 状态选择
      statusOption: [
        {
          value: 'PUBLISHED',
          label: '已发布'
        },
        {
          value: 'TOBERELEASED',
          label: '未发布'
        }
      ]
    }
  },
  created() {
    this.fetchData()
    const search = {
      page: 1,
      pageSize: 999
    };
    this.getUserOptions(search);
  },
  watch: {
    form: {
      handler: function (old, newVal) {
        this.associationIdOptions = []
        console.log(old.associationType)
        console.log(newVal.associationType)
        const search = {
          page: 1,
          pageSize: 999
        };
        if (newVal.associationType === 'RESCUE') {
          this.getRescueOptions(search);
        } else if (newVal.associationType === 'ADOPT') {
          this.getAdoptOptions(search);
        } else if (newVal.associationType === 'RESOURCE') {
          this.getResourceOptions(search);
        }
      },
      deep: true
    }
  },
  methods: {
    //评论添加一行
    addComment() {
      console.log(this.form.comment)
      this.form.comment.push({
        content: '',
        createUser: ''
      })
    },
    // 评论删除一行
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    getUserOptions(search) {
      getUserList(search).then(response => {
        this.userOptions = response.data.records
      })
    },
    getAdoptOptions(search) {
      getAdoptList(search).then(response => {
        this.associationIdOptions = response.data.records
      })
    },
    getRescueOptions(search) {
      getRescueList(search).then(response => {
        this.associationIdOptions = response.data.records
      })
    },
    getResourceOptions(search) {
      getResourceList(search).then(response => {
        this.associationIdOptions = response.data.records
      })
    },
    initForm(row) {
      this.form.id = row.id
      this.form.status = row.status
      this.form.describes = row.describes
      this.form.associationType = row.associationType
      this.form.associationId = row.associationId
      this.form.user = row.user !== undefined ? row.user : []
      this.form.comment = row.comment !== undefined ? row.comment : []
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
        deletedPropaganda(row.id).then(response => {
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
      this.form.describes = ''
      this.form.associationType = ''
      this.form.associationId = ''
      this.form.user = []
      this.form.comment = []
    },
    //点击确定按钮后的操作
    submit() {
      console.log(this.form)
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.listLoading = true
          for (let i = 0; i < this.form.comment.length; i++) {
            this.form.comment[i].createTime = Date.parse(this.form.comment[i].createTime)
          }
          if (this.dialogTitile == '更新') {
            updatePropaganda(this.form).then(response => {
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
            addPropaganda(this.form).then(response => {
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
      getPropagandaList(this.table).then(response => {
        this.total = response.data.total
        this.list = response.data.records
        console.log(this.list)
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

.myQuillEditor {
  display: inline-block;
  height: 200px;
}
</style>
