<template>
  <div class="edit-body">
    <Title title-name="编辑个人信息" backLinkName="我的主页" back-link="/user/user"/>
    <el-form label-position="top"
             ref="form"
             :model="form"
             :rules="formRules"
             class="edit-form">
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="昵称" prop="nickName">
            <el-input v-model="form.nickName"
                      type="text"
                      placeholder="请输入内容"/>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="联系电话(登录账号)" prop="phoneNumber">
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
        <el-col :span="8">
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
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="居住地" prop="address">
            <area-select v-model="form.address" :data="pcaa"
                         :level="2"></area-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="描述" prop="describes">
            <el-input v-model="form.describes"
                      type="textarea"
                      :rows="4"
                      placeholder="请输入内容"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" v-if="form.isBase === 'YES'">
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
          <el-form-item label="头像\基地logo">
            <el-upload
              class="avatar-uploader"
              :action="url"
              :show-file-list="false"
              :on-success="handleAvatarSuccess1">
              <img v-if="imageUrl" :src="imageUrl" class="avatar"/>
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submit">确 定</el-button>
    </div>
  </div>
</template>

<script>
import Title from "@/components/Title/index"
import {mapGetters} from "vuex";
import {updateUser, queryById} from '@/api/user'
import {pcaa} from 'area-data';
import store from "@/store";

export default {
  name: "edit",
  components: {
    Title
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'name',
      'id'
    ])
  },
  mounted() {
    this.getUserInfo(this.id)
    document.getElementsByClassName("main-container")[0].style['background-color'] = '#f3f3f3'
  },
  data() {
    return {
      url: this.$store.state.settings.url + 'picture/upload',
      //地区数据
      pcaa: pcaa,
      //用户上传头像
      imageUrl: '',
      //表单验证
      formRules: {
        address: [{required: true, message: '请选择所在地', trigger: 'blur'}],
        phoneNumber: [{required: true, message: '请输入联系电话', trigger: 'blur'}],
        nickName: [
          {required: true, message: '请输入昵称', trigger: 'blur'}
        ],
        isBase: [
          {required: true, message: '请选择是否为基地', trigger: 'blur'}
        ],
      },
      userInfo: {},
      // 对话框中表单
      form: {
        nickName: '',
        phoneNumber: '',
        email: '',
        address: [],
        photo: '',
        describes: '',
        isBase: '',
        slogan: '',
        baseCreateTime: ''
      },
      // 加载变量
      listLoading: true,
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
      ]
    }
  },
  methods: {
    // 获取用户数据
    getUserInfo(param) {
      this.listLoading = true
      queryById(param).then(response => {
        this.userInfo = response.data
        this.form.id = this.userInfo.id
        this.form.nickName = this.userInfo.nickName
        this.form.phoneNumber = this.userInfo.phoneNumber
        this.form.email = this.userInfo.email
        this.form.address = this.userInfo.address
        this.form.photo = this.userInfo.photo
        this.form.describes = this.userInfo.describes
        this.form.isBase = this.userInfo.isBase
        this.form.slogan = this.userInfo.slogan
        this.form.baseCreateTime = this.userInfo.baseCreateTime
        this.imageUrl = this.userInfo.photo
      }).finally(() => {
        this.listLoading = false
      })
    },
    handleAvatarSuccess1(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.form.photo = res.data.url
    },
    //点击确定按钮后的操作
    submit() {
      console.log(this.form)
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.listLoading = true
          this.form.baseCreateTime = Date.parse(this.form.baseCreateTime)
          updateUser(this.form).then(async response => {
            if (response.code == 200) {
              this.$message({
                message: '修改成功,请重新登录!即将跳转...',
                type: 'success'
              });

              await this.$store.dispatch('user/logout')
              this.$router.push(`/login?redirect=${this.$route.fullPath}`)

            } else {
              this.$message.error('修改失败');
            }
            this.listLoading = false
          })
        } else {
          this.$message.error('数据格式错误请检查！');
        }
      });
    },
  },
  destroyed() {
    document.getElementsByClassName("main-container")[0].style['background-color'] = '#ffffff'
  }
}
</script>

<style scoped lang="scss">
.edit-body {
  background-color: white;
  padding: 1em;
  min-height: calc(100vh - 50px);

  .edit-form {
    padding: 1em 6em;
  }

  .dialog-footer {
    text-align: center;
  }
}
</style>
