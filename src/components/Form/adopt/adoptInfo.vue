<template>
  <div class="adoptInfo-body" v-loading="listLoading">
    <div v-if="isUpload">
      <el-form label-position="top" ref="adoptForm" :model="form"
               :rules="adoptFormRules">
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="动物昵称" prop="animalDtoReq.name">
              <el-input v-model="form.animalDtoReq.name"
                        type="text"
                        placeholder="请输入动物昵称"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="动物年龄" prop="animalDtoReq.age">
              <el-input-number
                v-model="form.animalDtoReq.age"
                :step="1"
                :min="0"
                :max="99"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="动物性别" prop="animalDtoReq.sex">
              <el-select
                clearable
                v-model="form.animalDtoReq.sex"
                placeholder="请选择性别">
                <el-option
                  v-for="item in sexOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="种类" prop="animalDtoReq.type">
              <el-select clearable v-model="form.animalDtoReq.type" placeholder="请选择种类">
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
          <el-col :span="24">
            <el-form-item label="领养要求" prop="requirement">
              <el-input v-model="form.requirement"
                        type="textarea"
                        :rows="2"
                        placeholder="请输入内容"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="领养地址" prop="animalDtoReq.location">
              <area-select v-model="form.animalDtoReq.location"
                           :data="pcaa"
                           :level="2"></area-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="现在的情况" prop="beforSituation">
              <el-input v-model="form.beforSituation"
                        type="textarea"
                        :rows="2"
                        placeholder="请输入内容"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="领养前照片" prop="animalDtoReq.beforAdoptPhoto">
              <el-upload
                class="avatar-uploader"
                :action="url"
                :show-file-list="false"
                :on-success="handleAvatarSuccessbeforAdopt"
              >
                <img v-if="beforAdoptUrl" :src="beforAdoptUrl" class="avatar"/>
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submit(0)">上 传</el-button>
        <el-button type="primary" @click="submit(1)">保存草稿</el-button>
      </div>
    </div>

    <div class="adoptInfo-body-isUpload" v-if="!isUpload">
      <div class="adoptInfo-body-message"
           v-if="form.isApproved === null || form.isApproved === ''">
        <svg-icon icon-class="wait" class="adoptInfo-body-message-svg"/>
        <div class="adoptInfo-body-text">
          你的信息已提交,请等待审核!
        </div>
      </div>
      <div class="adoptInfo-body-message"
           v-if="form.isApproved !== null&& form.isApproved === 'NO'">
        <svg-icon icon-class="fail" class="adoptInfo-body-message-svg"/>
        <div class="adoptInfo-body-text">
          你的信息审核不通过,请检查后再次提交!
        </div>
      </div>
      <div class="adoptInfo-body-button">
        <el-button plain @click="updateAgain">再次编辑</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import {pcaa} from 'area-data';
import {addAdopt, updateAdopt, queryAdoptById} from "@/api/adopt";
import {mapGetters} from "vuex";

export default {
  name: "adoptInfo",
  props: {
    infoId: {
      type: String,
      default: ''
    },
    isChange: {
      type: Boolean
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'name',
      'id'
    ])
  },
  created() {
    if (this.infoId === null || this.infoId === undefined || this.infoId === '') {
      this.isUpload = true
    } else {
      this.getInfoById(this.infoId)

      if ((this.isChange !== null && this.isChange == true)) {
        this.isUpload = true
      } else {
        this.isUpload = false
      }
    }
  },
  watch: {
    'form.isApproved': {
      handler: function (newVal, oldVal) {
        if (newVal && newVal === 'YES') {
          //TODO 召唤父组件的方法
        }
      }
    }
  },
  data() {
    return {
      listLoading: false,
      //是否上传信息
      isUpload: false,
      //上传图片链接
      url: this.$store.state.settings.url + 'picture/upload',
      pcaa: pcaa,
      //表单数据
      form: {
        requirement: '',
        beforSituation: '',
        animalDtoReq: {
          name: '',
          age: 0,
          sex: '',
          type: '',
          location: [],
        }
      },
      //救助前动物照片
      beforAdoptUrl: '',
      //表单规则
      adoptFormRules: {
        "animalDtoReq.name": [
          {required: true, message: '请输入动物昵称', trigger: 'blur'}
        ],
        "animalDtoReq.age": [
          {required: true, message: '请输入动物年龄（大致）', trigger: 'blur'}
        ],
        "animalDtoReq.sex": [
          {required: true, message: '请选择动物性别', trigger: 'blur'}
        ],
        "animalDtoReq.location": [
          {required: true, message: '请选择发现地点', trigger: 'blur'}
        ],
        beforSituation: [
          {required: true, message: '请输入现在动物的情况', trigger: 'blur'}
        ],
        "animalDtoReq.type": [
          {required: true, message: '请选择动物种类', trigger: 'blur'}
        ],
        requirement: [
          {required: true, message: '请输入领养要求', trigger: 'blur'}
        ]
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
    }
  },
  methods: {
    getInfoById(param) {
      this.listLoading = false
      queryAdoptById(param).then(response => {
        if (response.code == 200) {
          let temp = response.data
          this.form = {
            id: temp.id,
            animalId: temp.animalId,
            requirement: temp.requirement,
            beforSituation: temp.beforSituation,
            status: temp.status,
            isApproved: temp.isApproved ? temp.isApproved : '',
            animalDtoReq: {
              id: temp.animal.id,
              name: temp.animal.name,
              age: temp.animal.age,
              sex: temp.animal.sex,
              type: temp.animal.type,
              location: temp.animal.location,
            }
          }
          this.beforAdoptUrl = temp.animal.beforAdoptPhoto
        } else {
          this.$message.error('获取失败');
        }
        this.listLoading = false
      })
    },
    handleAvatarSuccessbeforAdopt(res, file) {
      this.beforAdoptUrl = URL.createObjectURL(file.raw);
      this.form.animalDtoReq.beforAdoptPhoto = res.data.url
    },
    updateAgain() {
      let temp = {
        id: this.infoId,
        status: 'UNCOMMIT'
      }
      updateAdopt(temp).then(response => {
        if (response.code == 200) {
          this.isUpload = true
          this.getInfoById(this.infoId)
        } else {
          this.$message.error('操作失败,请再次尝试');
        }
        this.listLoading = false
      })
    },
    submit(flag) {
      this.$refs['adoptForm'].validate((valid) => {
        if (valid) {
          this.listLoading = true
          this.form.isApproved = ''
          this.form.publisher = this.id
          if (flag == 0) {
            this.form.status = 'UNAPPROVED'
          } else {
            this.form.status = 'UNCOMMIT'
          }
          if (this.infoId !== '') {
            this.form.id = this.infoId
            updateAdopt(this.form).then(response => {
              if (response.code == 200) {
                this.$message({
                  message: '上传成功!',
                  type: 'success'
                });
                if (flag === 0) {
                  this.isUpload = false
                }
                this.getInfoById(this.infoId)
              } else {
                this.$message.error('上传失败');
              }
              this.listLoading = false
            })
          } else {
            addAdopt(this.form).then(response => {
              if (response.code == 200) {
                this.$message({
                  message: '上传成功!',
                  type: 'success'
                });
                this.infoId = response.data
                if (flag === 0) {
                  this.isUpload = false
                }
                this.getInfoById(this.infoId)
              } else {
                this.$message.error('上传失败');
              }
              this.listLoading = false
            })
          }
        } else {
          this.$message.error('数据格式错误请检查！');
        }
      });

    },
  }
}
</script>

<style scoped lang="scss">
.adoptInfo-body {
  margin: 1em 0;

  .dialog-footer {
    text-align: right;
  }

  .adoptInfo-body-isUpload {
    position: relative;
    text-align: center;
    font-size: 2em;
    vertical-align: center;

    .adoptInfo-body-message-svg {
      width: 4em;
      height: 4em;
      display: block;
      margin: 0 calc(50% - 2em);
      padding: 1em 0;
    }

    .adoptInfo-body-button {
      margin-top: 1em;
    }
  }


}
</style>
