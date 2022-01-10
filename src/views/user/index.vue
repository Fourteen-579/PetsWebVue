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
          <el-select clearable v-model="table.sex" placeholder="请选择性别">
            <el-option
              v-for="item in sexOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-select clearable v-model="table.isBase" placeholder="请选择是否为基地">
            <el-option
              v-for="item in isOptions"
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
      <el-table-column align="center" label="ID" width="190">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="真实姓名" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.realName }}
        </template>
      </el-table-column>
      <el-table-column label="昵称" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.nickName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="性别" width="110" align="center">
        <template slot-scope="scope">
          <svg-icon v-if="scope.row.sex === 'WOMAN'" icon-class="woman">{{
              sexOptions.find(function (value) {
                return value.value === scope.row.sex;
              }).label
            }}
          </svg-icon>
          <svg-icon v-if="scope.row.sex === 'MAN'" icon-class="man">{{
              sexOptions.find(function (value) {
                return value.value === scope.row.sex;
              }).label
            }}
          </svg-icon>
        </template>
      </el-table-column>
      <el-table-column label="年龄" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.age }}
        </template>
      </el-table-column>
      <el-table-column label="身份证号" width="210" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.idNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column label="电话号码" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.phoneNumber }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="是否为基地" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.isBase | isFilter">{{
              isOptions.find(function (value) {
                return value.value === scope.row.isBase;
              }).label
            }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="210" align="center">
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
      <el-form label-position="top" ref="form" :model="form" :disabled='disabledForm' :rules="formRules">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="真实姓名" prop="realName">
              <el-input v-model="form.realName"
                        type="textarea"
                        :rows="2"
                        placeholder="请输入内容"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="昵称" prop="nickName">
              <el-input v-model="form.nickName"
                        type="textarea"
                        :rows="2"
                        placeholder="请输入内容"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="年龄" prop="age">
              <el-input-number v-model="form.age" :step="1" :min=0 :max=99></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="性别" prop="sex">
              <el-select clearable v-model="form.sex" placeholder="请选择性别">
                <el-option
                  v-for="item in sexOptions"
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
            <el-form-item label="密码(展示为加密后密码)" prop="password">
              <el-input v-model="form.password"
                        type="text"
                        placeholder="请输入内容"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="身份证号" prop="idNumber">
              <el-input v-model="form.idNumber"
                        type="text"
                        placeholder="请输入内容"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系电话" prop="phoneNumber">
              <el-input v-model="form.phoneNumber"
                        type="text"
                        placeholder="请输入内容"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="邮箱地址" prop="email">
              <el-input v-model="form.email"
                        type="text"
                        placeholder="请输入内容"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="居住地" prop="address">
              <area-select v-if="dialogVisible" :disabled="disabledForm" v-model="form.address" :data="pcaa"
                           :level="2"></area-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="描述" prop="describes">
              <el-input v-model="form.describes"
                        type="textarea"
                        :rows="2"
                        placeholder="请输入内容"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="是否为基地" prop="isBase">
              <el-select v-model="form.isBase" placeholder="请选择是否为基地">
                <el-option
                  v-for="item in isOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否为明星基地" prop="isStartBase">
              <el-select clearable v-model="form.isStartBase" placeholder="请选择是否为明星基地">
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
            <el-form-item label="基地创建时间" prop="baseCreateTime">
              <el-date-picker
                v-model="form.baseCreateTime"
                type="datetime"
                placeholder="选择日期时间"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="基地标语" prop="slogan">
              <el-input v-model="form.slogan"
                        type="textarea"
                        :rows="2"
                        placeholder="请输入内容"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="照片">
              <el-upload
                class="avatar-uploader"
                action="http://localhost:8089/picture/upload"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="imageUrl" :src="imageUrl" class="avatar"/>
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
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
import {getUserList, updateUser, addUser, deletedUser} from '@/api/user'
import {pcaa} from 'area-data';

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
      //地区数据
      pcaa: pcaa,
      //用户上传头像
      imageUrl: '',
      //表单验证
      formRules: {
        phoneNumber: [{required: true, message: '请输入联系电话', trigger: 'blur'}],
        nickName: [
          {required: true, message: '请选择发布人', trigger: 'blur'}
        ],
        isBase: [
          {required: true, message: '请选择是否为基地', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ],
      },
      //是否禁用表单
      disabledForm: false,
      // 对话框中表单
      form: {
        realName: '',
        nickName: '',
        age: 0,
        sex: '',
        idNumber: '',
        phoneNumber: '',
        email: '',
        address: [],
        photo: '',
        describes: '',
        isBase: '',
        slogan: '',
        isStartBase: '',
        baseCreateTime: '',
        password: ''
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
        sex: null,
        isBase: null,
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
      //性别选择
      sexOptions: [
        {
          value: 'MAN',
          label: '男'
        },
        {
          value: 'WOMAN',
          label: '女'
        }
      ],
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.form.photo = res.data.url
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    initForm(row) {
      this.form.password = row.password
      this.form.id = row.id
      this.form.realName = row.realName
      this.form.nickName = row.nickName
      this.form.age = row.age
      this.form.sex = row.sex
      this.form.idNumber = row.idNumber
      this.form.phoneNumber = row.phoneNumber
      this.form.email = row.email
      this.form.address = row.address
      this.form.photo = row.photo
      this.form.describes = row.describes
      this.form.isBase = row.isBase
      this.form.slogan = row.slogan
      this.form.isStartBase = row.isStartBase
      this.form.baseCreateTime = row.baseCreateTime
      this.imageUrl = row.photo
    },
    getInfo(row) {
      this.dialogVisible = true
      this.disabledForm = true
      this.dialogTitile = '详情'
      this.initForm(row)
      console.log(this.form)

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
        deletedUser(row.id).then(response => {
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
      this.form.password = ''
      this.form.id = ''
      this.form.realName = ''
      this.form.nickName = ''
      this.form.age = 0
      this.form.sex = ''
      this.form.idNumber = ''
      this.form.phoneNumber = ''
      this.form.email = ''
      this.form.address = []
      this.form.photo = ''
      this.form.describes = ''
      this.form.isBase = ''
      this.form.slogan = ''
      this.form.isStartBase = ''
      this.form.baseCreateTime = ''

      this.imageUrl = ''
    },
    //点击确定按钮后的操作
    submit() {
      console.log(this.form)
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.listLoading = true
          this.form.baseCreateTime = Date.parse(this.form.baseCreateTime)
          if (this.dialogTitile == '更新') {
            updateUser(this.form).then(response => {
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
            addUser(this.form).then(response => {
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
      getUserList(this.table).then(response => {
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

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
