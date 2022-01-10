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
        <el-col :span="4">
          <el-select clearable v-model="table.type" placeholder="请选择种类">
            <el-option
              v-for="item in typeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-select clearable v-model="table.status" placeholder="请选择状态">
            <el-option
              v-for="item in statusOptions"
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
      <el-table-column align="center" label="ID" width="250">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="昵称" width="120" align="center">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="种类" width="120" align="center">
        <template slot-scope="scope">
          <svg-icon style="width: 2em;height: 2em" v-if="scope.row.type === 'SNACK'" icon-class="snack">{{
              typeOptions.find(function (value) {
                return value.value === scope.row.type;
              }).label
            }}
          </svg-icon>
          <svg-icon style="width: 2em;height: 2em" v-if="scope.row.type === 'HAMSTER'" icon-class="hamster">{{
              typeOptions.find(function (value) {
                return value.value === scope.row.type;
              }).label
            }}
          </svg-icon>
          <svg-icon style="width: 2em;height: 2em" v-if="scope.row.type === 'RABBIT'" icon-class="rabbit">{{
              typeOptions.find(function (value) {
                return value.value === scope.row.type;
              }).label
            }}
          </svg-icon>
          <svg-icon style="width: 2em;height: 2em" v-if="scope.row.type === 'DOG'" icon-class="dog">{{
              typeOptions.find(function (value) {
                return value.value === scope.row.type;
              }).label
            }}
          </svg-icon>
          <svg-icon style="width: 2em;height: 2em" v-if="scope.row.type === 'CAT'" icon-class="cat">{{
              typeOptions.find(function (value) {
                return value.value === scope.row.type;
              }).label
            }}
          </svg-icon>
          <svg-icon style="width: 2em;height: 2em" v-if="scope.row.type === 'OTHER'" icon-class="other">{{
              typeOptions.find(function (value) {
                return value.value === scope.row.type;
              }).label
            }}
          </svg-icon>
        </template>
      </el-table-column>
      <el-table-column label="性别" width="120" align="center">
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
      <el-table-column label="年龄" width="120" align="center">
        <template slot-scope="scope">
          {{ scope.row.age }}
        </template>
      </el-table-column>
      <el-table-column label="状态" width="120" align="center">
        <template slot-scope="scope">
          <el-tag>
            {{
              statusOptions.find(function (value) {
                return value.value === scope.row.status;
              }).label
            }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="领养前照片" width="300" align="center">
        <template slot-scope="scope">
          <img v-if="scope.row.beforRescuePhoto" :src="scope.row.beforRescuePhoto" class="avatar"/>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="150" align="center">
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
          <el-col :span="8">
            <el-form-item label="昵称" prop="name">
              <el-input v-model="form.name"
                        type="text"
                        placeholder="请输入内容"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="年龄" prop="age">
              <el-input-number v-model="form.age" :step="1" :min=0 :max=99></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="8">
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
            <el-form-item label="所在地" prop="location">
              <area-select v-if="dialogVisible" :disabled="disabledForm" v-model="form.location" :data="pcaa"
                           :level="2"></area-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="状态" prop="status">
              <el-select v-model="form.status" placeholder="请选择状态">
                <el-option
                  v-for="item in statusOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="种类" prop="type">
              <el-select clearable v-model="form.type" placeholder="请选择种类">
                <el-option
                  v-for="item in typeOptions"
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
            <el-form-item label="救助前照片">
              <el-upload
                class="avatar-uploader"
                action="http://localhost:8089/picture/upload"
                :show-file-list="false"
                :on-success="handleAvatarSuccessbeforRescue"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="beforRescueUrl" :src="beforRescueUrl" class="avatar"/>
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="救助后照片">
              <el-upload
                class="avatar-uploader"
                action="http://localhost:8089/picture/upload"
                :show-file-list="false"
                :on-success="handleAvatarSuccessafterRescue"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="afterRescueUrl" :src="afterRescueUrl" class="avatar"/>
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="领养前照片">
              <el-upload
                class="avatar-uploader"
                action="http://localhost:8089/picture/upload"
                :show-file-list="false"
                :on-success="handleAvatarSuccessbeforAdopt"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="beforAdoptUrl" :src="beforAdoptUrl" class="avatar"/>
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="领养后照片">
              <el-upload
                class="avatar-uploader"
                action="http://localhost:8089/picture/upload"
                :show-file-list="false"
                :on-success="handleAvatarSuccessafterAdopt"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="afterAdoptUrl" :src="afterAdoptUrl" class="avatar"/>
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
import {getAnimalList, updateAnimal, addAnimal, deletedAnimal} from '@/api/animal'
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
      // 动物状态选择
      statusOptions: [
        {
          value: 'TOBERESCUED',
          label: '待救助'
        },
        {
          value: 'RESCUED',
          label: '已救助'
        },
        {
          value: 'TOBEADOPTED',
          label: '待领养'
        },
        {
          value: 'ADOPTED',
          label: '已领养'
        }
      ],
      // 动物种类选择
      typeOptions: [
        {
          value: 'CAT',
          label: '猫咪'
        },
        {
          value: 'DOG',
          label: '狗子'
        },
        {
          value: 'RABBIT',
          label: '兔子'
        },
        {
          value: 'HAMSTER',
          label: '仓鼠'
        },
        {
          value: 'SNAKE',
          label: '蛇'
        },
        {
          value: 'OTHER',
          label: '其他'
        }
      ],
      //动物图片
      beforRescueUrl: '',
      afterRescueUrl: '',
      beforAdoptUrl: '',
      afterAdoptUrl: '',
      //表单验证
      formRules: {
        name: [
          {required: true, message: '请输入昵称', trigger: 'blur'}
        ],
        type: [
          {required: true, message: '请选择动物种类', trigger: 'blur'}
        ],
        status: [
          {required: true, message: '请选择动物状态', trigger: 'blur'}
        ]
      },
      //是否禁用表单
      disabledForm: false,
      // 对话框中表单
      form: {
        id: '',
        name: '',
        type: '',
        sex: '',
        age: 0,
        status: '',
        location: '',
        beforRescuePhoto: '',
        afterRescuePhoto: '',
        beforAdoptPhoto: '',
        afterAdoptPhoto: ''
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
        type: null,
        status: null,
        page: 1,
        pageSize: 10
      },
      //性别选择
      sexOptions: [
        {
          value: 'MAN',
          label: '♂'
        },
        {
          value: 'WOMAN',
          label: '♀'
        }
      ]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    handleAvatarSuccessbeforRescue(res, file) {
      this.beforRescueUrl = URL.createObjectURL(file.raw);
      this.form.beforRescuePhoto = res.data.url
    },
    handleAvatarSuccessafterRescue(res, file) {
      this.afterRescueUrl = URL.createObjectURL(file.raw);
      this.form.afterRescuePhoto = res.data.url
    },
    handleAvatarSuccessbeforAdopt(res, file) {
      this.beforAdoptUrl = URL.createObjectURL(file.raw);
      this.form.beforAdoptPhoto = res.data.url
    },
    handleAvatarSuccessafterAdopt(res, file) {
      this.afterAdoptUrl = URL.createObjectURL(file.raw);
      this.form.afterAdoptPhoto = res.data.url
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
      this.form.id = row.id
      this.form.name = row.name
      this.form.type = row.type
      this.form.sex = row.sex
      this.form.age = row.age
      this.form.status = row.status
      this.form.location = row.location
      this.form.beforRescuePhoto = row.beforRescuePhoto
      this.form.afterRescuePhoto = row.afterRescuePhoto
      this.form.beforAdoptPhoto = row.beforAdoptPhoto
      this.form.afterAdoptPhoto = row.afterAdoptPhoto

      this.beforRescueUrl = row.beforRescuePhoto
      this.afterRescueUrl = row.afterRescuePhoto
      this.beforAdoptUrl = row.beforAdoptPhoto
      this.afterAdoptUrl = row.afterAdoptPhoto
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
        deletedAnimal(row.id).then(response => {
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
      this.form.name = ''
      this.form.type = ''
      this.form.sex = ''
      this.form.age = 0
      this.form.status = ''
      this.form.location = ''
      this.form.beforRescuePhoto = ''
      this.form.afterRescuePhoto = ''
      this.form.beforAdoptPhoto = ''
      this.form.afterAdoptPhoto = ''
      this.beforRescueUrl = ''
      this.afterRescueUrl = ''
      this.beforAdoptUrl = ''
      this.afterAdoptUrl = ''
    },
    //点击确定按钮后的操作
    submit() {
      console.log(this.form)
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.listLoading = true
          this.form.baseCreateTime = Date.parse(this.form.baseCreateTime)
          if (this.dialogTitile == '更新') {
            updateAnimal(this.form).then(response => {
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
            addAnimal(this.form).then(response => {
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
      getAnimalList(this.table).then(response => {
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
