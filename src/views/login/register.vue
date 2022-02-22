<template>
  <div class="register-body">
    <div class="register-body-main">
      <div class="title">
        注册
      </div>
      <el-form label-position="top"
               ref="form"
               :model="form"
               :rules="formRules"
               class="edit-form">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="联系电话(登录账号)" prop="phoneNumber">
              <el-input v-model="form.phoneNumber"
                        type="text"
                        placeholder="请输入联系电话(登录账号)"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="登录密码" prop="password">
              <el-input v-model="form.password"
                        type="text"
                        placeholder="请输入登录密码"/>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="昵称" prop="nickName">
              <el-input v-model="form.nickName"
                        type="text"
                        placeholder="请输入昵称"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="邮箱地址" prop="email">
              <el-input v-model="form.email"
                        type="text"
                        placeholder="请输入邮箱地址"/>
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
      <div class="login-router">
        <router-link to="/login">
          已有账号？点击这里登录
        </router-link>
      </div>
    </div>
  </div>

</template>

<script>
import {addUser} from "@/api/user";
import {pcaa} from 'area-data';

export default {
  name: "register",
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
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ],
      },
      // 对话框中表单
      form: {
        nickName: '',
        phoneNumber: '',
        email: '',
        address: [],
        photo: '',
        describes: '',
        isBase: '',
        password: '',
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
  mounted() {
    document.getElementsByClassName("register-body")[0].style['background-color'] = '#f3f3f3'
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleAvatarSuccess1(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.form.photo = res.data.url
    },
    //点击确定按钮后的操作
    submit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.listLoading = true
          addUser(this.form).then(async response => {
            if (response.code == 200) {
              this.$message({
                message: '注册成功!即将跳转至登录界面...',
                type: 'success'
              });
              this.$router.push(`/login`)

            } else {
              this.$message.error('注册失败');
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
    document.getElementsByClassName("register-body")[0].style['background-color'] = '#ffffff'
  }
}
</script>

<style scoped lang="scss">
.register-body {
  padding: 1em 15em;

  .register-body-main {
    background-color: white;
    padding: 1em 3em;

    .title {
      text-align: center;
      font-size: 2em;
      font-weight: bolder;
      margin: 1em 0;
    }

    .dialog-footer {
      text-align: center;
    }
  }

  .login-router {
    display: block;
    text-align: center;
    margin-top: 1em;
    color: blue;
  }
}

</style>
