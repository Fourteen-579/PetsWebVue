<template>
  <div class="auth-body-main">
    <div class="auth-body"
         v-if="(userInfo.isAuth === null||userInfo.isAuth === undefined || userInfo.isAuth === 'NULL')&&(userInfo.baseAuthenticationDtoResult === null||userInfo.baseAuthenticationDtoResult === undefined)"
         :v-loading="listLoading">
      <div class="auth-text">
        <div class="auth-title">
          基地\个人认证
        </div>
        <div class="auth-slogan">
          流浪动物救助平台是全国小动物保护联盟，获得联盟官方认证后可提升基地\个人公信力，同时只有在进行认证之后才能参加救助、领养、资源对接活动。
        </div>
      </div>
      <div class="auth-form">
        <el-form label-position="top" ref="form" :model="form" :disabled='disabledForm' :rules="formRules">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="真实姓名" prop="realName">
                <el-input v-model="form.realName"
                          type="text"
                          placeholder="请输入真实姓名"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="身份证号" prop="idNumber">
                <el-input v-model="form.idNumber"
                          type="text"
                          placeholder="请输入身份证号"/>
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
            <el-col :span="12">
              <el-form-item label="联系电话" prop="phoneNumber">
                <el-input v-model="form.phoneNumber"
                          type="text"
                          placeholder="请输入内容"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="邮箱地址" prop="email">
                <el-input v-model="form.email"
                          type="text"
                          placeholder="请输入内容"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="所在地" prop="address">
                <area-select v-model="form.address" :data="pcaa"
                             :level="2"></area-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" v-if="userInfo.isBase === 'YES'">
            <el-col :span="24">
              <el-form-item label="基地社会信用代码" prop="baseAuthenticationDtoReq.creditCode">
                <el-input v-model="form.baseAuthenticationDtoReq.creditCode"
                          type="text"
                          placeholder="请输入内容"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" v-if="userInfo.isBase === 'YES'">
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
            <el-col :span="12">
              <el-form-item label="身份证正面" prop="baseAuthenticationDtoReq.frountPhoto">
                <el-upload
                  class="avatar-uploader"
                  :action="url"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess2"
                >
                  <img v-if="frountPhoto" :src="frountPhoto" class="avatar"/>
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="身份证反面" prop="baseAuthenticationDtoReq.reversePhoto">
                <el-upload
                  class="avatar-uploader"
                  :action="url"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess3"
                >
                  <img v-if="reversePhoto" :src="reversePhoto" class="avatar"/>
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" v-if="userInfo.isBase === 'YES'">
            <el-col :span="12">
              <el-form-item label="基地图片" prop="baseAuthenticationDtoReq.basePhoto">
                <el-upload
                  class="avatar-uploader"
                  :action="url"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess4"
                >
                  <img v-if="basePhoto" :src="basePhoto" class="avatar"/>
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="基地营业执照" prop="baseAuthenticationDtoReq.businessLicense">
                <el-upload
                  class="avatar-uploader"
                  :action="url"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess5"
                >
                  <img v-if="businessLicense" :src="businessLicense" class="avatar"/>
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="auth-buttom">
        <div slot="footer" class="dialog-footer">
          <el-checkbox
            class="auth-buttom-left"
            v-model="checked">我已阅读
            <router-link to="/file/auth" style="color: #20a0ff">《动保联盟基地认证协议》</router-link>
          </el-checkbox>
          <el-button
            :disabled="!checked"
            type="primary"
            class="auth-buttom-right"
            @click="submit">提交信息
          </el-button>
        </div>
      </div>
    </div>
    <div class="auth-success" v-else>
      <div class="auth-success-div"
           v-if="userInfo.isAuth!==null&&userInfo.isAuth === 'YES'">
        <svg-icon icon-class="success" class="auth-success-svg"/>
        你的认证已经通过!
      </div>
      <div class="auth-success-div"
           v-else-if="(userInfo.isAuth!==null&&userInfo.isAuth !== 'NO')&&(userInfo.baseAuthenticationDtoResult !== null || userInfo.baseAuthenticationDtoResult !== undefined)">
        <svg-icon icon-class="wait" class="auth-success-svg"/>
        你已经提交了认证信息，请等待认证通过!
      </div>
      <div class="auth-success-div"
           v-if="userInfo.isAuth!==null&&userInfo.isAuth === 'NO'">
        <svg-icon icon-class="fail" class="auth-success-svg"/>
        认证失败!请重新上传认证!
      </div>
    </div>
  </div>

</template>

<script>
import {mapGetters} from "vuex";
import {pcaa} from 'area-data';
import {queryById, updateUser, checkInfo} from '@/api/user'

export default {
  name: "index",
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'name',
      'id'
    ])
  },
  data() {
    return {
      //是否阅读
      checked: false,
      userInfo: {},
      listLoading: false,
      //地区数据
      pcaa: pcaa,
      //用户身份证正面
      frountPhoto: '',
      //用户身份证反面
      reversePhoto: '',
      // 基地照片
      basePhoto: '',
      // 基地营业执照
      businessLicense: '',
      //上传图片链接
      url: this.$store.state.settings.url + 'picture/upload',
      //表单信息
      form: {},
      //表单是否可编辑
      disabledForm: false,
      formRules: {
        address: [{required: true, message: '请选择所在地', trigger: 'blur'}],
        phoneNumber: [{required: true, message: '请输入联系电话', trigger: 'blur'}],
        realName: [
          {required: true, message: '请输入真实姓名', trigger: 'blur'}
        ],
        idNumber: [
          {required: true, message: '请输入身份证号', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ],
        email: [
          {required: true, message: '请输入电子邮箱', trigger: 'blur'}
        ],
        "baseAuthenticationDtoReq.creditCode": [
          {required: true, message: '请输入社会信用代码', trigger: 'blur'}
        ],
        baseCreateTime: [
          {required: true, message: '请选择基地创建时间', trigger: 'blur'}
        ],
        slogan: [
          {required: true, message: '请输入基地标语', trigger: 'blur'}
        ],
        "baseAuthenticationDtoReq.frountPhoto": [
          {required: true, message: '请上传身份证正面照', trigger: 'blur'}
        ],
        "baseAuthenticationDtoReq.reversePhoto": [
          {required: true, message: '请上传身份证反面照', trigger: 'blur'}
        ],
        "baseAuthenticationDtoReq.basePhoto": [
          {required: true, message: '请上传基地照片', trigger: 'blur'}
        ],
        "baseAuthenticationDtoReq.businessLicense": [
          {required: true, message: '请上传基地营业执照', trigger: 'blur'}
        ],
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
    this.fetchData(this.id)
  },
  mounted() {
    document.getElementsByClassName("main-container")[0].style['background-color'] = '#f3f3f3'
  },
  methods: {
    submit() {
      console.log(this.form)
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.listLoading = true
          this.form.baseCreateTime = Date.parse(this.form.baseCreateTime)
          this.form.id = this.id
          checkInfo(this.form).then(response => {
            if (response.code == 200) {
              this.$message({
                message: '提交认证信息成功',
                type: 'success'
              });
              this.fetchData(this.id)
            } else {
              this.$message.error('提交认证信息失败');
            }
          })
        } else {
          this.$message.error('数据格式错误请检查！');
        }
      });
    },
    // 获取用户数据
    fetchData(param) {
      this.listLoading = true
      queryById(param).then(response => {
        this.userInfo = response.data
        this.form = {
          age: this.userInfo.age,
          sex: this.userInfo.sex,
          phoneNumber: this.userInfo.phoneNumber,
          email: this.userInfo.email,
          address: this.userInfo.address,
          baseCreateTime: this.userInfo.baseCreateTime,
          slogan: this.userInfo.slogan,
          baseAuthenticationDtoReq: {
            creditCode: '',
            frountPhoto: '',
            reversePhoto: '',
            basePhoto: '',
            businessLicense: ''
          }
        }
      }).finally(() => {
        this.listLoading = false
        let _that = this
        if (_that.userInfo.isAuth === 'NO') {
          setTimeout(function () {
            _that.userInfo.isAuth = ''
            _that.userInfo.baseAuthenticationDtoResult = null
          }, 2000);
        }
      })
    },
    handleAvatarSuccess2(res, file) {
      this.frountPhoto = URL.createObjectURL(file.raw);
      this.form.baseAuthenticationDtoReq.frountPhoto = res.data.url
    },
    handleAvatarSuccess3(res, file) {
      this.reversePhoto = URL.createObjectURL(file.raw);
      this.form.baseAuthenticationDtoReq.reversePhoto = res.data.url
    },
    handleAvatarSuccess4(res, file) {
      this.basePhoto = URL.createObjectURL(file.raw);
      this.form.baseAuthenticationDtoReq.basePhoto = res.data.url
    },
    handleAvatarSuccess5(res, file) {
      this.businessLicense = URL.createObjectURL(file.raw);
      this.form.baseAuthenticationDtoReq.businessLicense = res.data.url
    },
  },
  destroyed() {
    document.getElementsByClassName("main-container")[0].style['background-color'] = '#ffffff'
  }
}
</script>

<style scoped lang="scss">
.auth-body-main {
  background-color: white;
}

.auth-body {
  margin: 0 3em;
  padding: 1em 0;

  .auth-text {
    text-align: center;
    margin: 1em;

    .auth-title {
      font-size: 2em;
      margin-bottom: 0.5em;
    }

    .auth-slogan {
      font-size: 0.8em;
      color: #5a5e66;
    }
  }

  .auth-form {

  }

  .auth-buttom {

    .auth-buttom-left {
      display: block;
    }

    .auth-buttom-right {
      display: block;
      width: 100%;
      margin: 0.5em 0;
    }
  }
}

.auth-success {
  background-color: white;
  height: calc(100vh - 50px);
  margin-bottom: 5px;
  width: 100%;
  position: relative;
  text-align: center;
  font-size: 2em;
  vertical-align: center;

  .auth-success-div {
    position: relative;
    padding: calc(50vh - 50px - 4em) 0 0 0;
  }

  .auth-success-svg {
    width: 4em;
    height: 4em;
    display: block;
    margin: 0 calc(50% - 2em);
    padding: 1em 0;
  }
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
