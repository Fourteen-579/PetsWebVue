<template>
  <div v-loading="listLoading" class="main-body">
    <el-form label-position="top" ref="rescueForm" :model="form"
             :rules="rescueFormRules">
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="动物昵称" prop="animalDtoReq.name">
            <el-input v-model="form.animalDtoReq.name"
                      type="text"
                      placeholder="请输入内容"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
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
        <el-col :span="6">
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
        <el-col :span="6">
          <el-form-item label="动物年龄" prop="animalDtoReq.age">
            <el-input-number
              v-model="form.animalDtoReq.age"
              :step="1"
              :min="0"
              :max="99"/>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="救助时间" prop="rescueTime">
            <el-date-picker
              style="width: auto;"
              v-model="form.rescueTime"
              type="datetime"
              placeholder="选择日期时间"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="发现时情况" prop="findSituation">
            <el-input v-model="form.findSituation"
                      type="textarea"
                      :rows="2"
                      placeholder="请输入内容"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="救助后情况" prop="afterSituation">
            <el-input v-model="form.afterSituation"
                      type="textarea"
                      :rows="2"
                      placeholder="请输入内容"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="救助过程" prop="process">
            <el-input v-model="form.process"
                      type="textarea"
                      :rows="2"
                      placeholder="请输入内容"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="救助后照片">
            <el-upload
              class="avatar-uploader"
              :action="url"
              :show-file-list="false"
              :on-success="handleAvatarSuccessafterRescue"
            >
              <img v-if="afterRescueUrl" :src="afterRescueUrl" class="avatar"/>
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submit(0)" title="提交后对接人也不可以修改了哦~">提 交</el-button>
      <el-button @click="submit(1)">保存草稿</el-button>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import {addRescue, queryRescueById, updateRescue} from "@/api/resuce";

export default {
  name: "rescueProcess",
  props: {
    infoId: {
      type: String,
      required: true
    },
    active: {
      type: Number,
      required: true
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
    this.getInfoById(this.infoId)
  },
  data() {
    return {
      //是否显示为表单
      showForm: true,
      //上传图片链接
      url: this.$store.state.settings.url + 'picture/upload',
      listLoading: false,
      form: {},
      rescueFormRules: {
        "animalDtoReq.name": [
          {required: true, message: '请输入动物昵称', trigger: 'blur'}
        ],
        "animalDtoReq.age": [
          {required: true, message: '请输入动物年龄（大致）', trigger: 'blur'}
        ],
        "animalDtoReq.sex": [
          {required: true, message: '请选择动物性别', trigger: 'blur'}
        ],
        "animalDtoReq.type": [
          {required: true, message: '请选择动物种类', trigger: 'blur'}
        ],
        findSituation: [{required: true, message: '请输入发现时情况', trigger: 'blur'}],
        afterSituation: [{required: true, message: '请输入救助后情况', trigger: 'blur'}],
        process: [{required: true, message: '请输入救助过程', trigger: 'blur'}],
        rescueTime: [{required: true, message: '请选择救助时间', trigger: 'blur'}],
      },
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
      afterRescueUrl: '',
    }
  },
  methods: {
    handleAvatarSuccessafterRescue(res, file) {
      this.afterRescueUrl = URL.createObjectURL(file.raw);
      this.form.animalDtoReq.afterRescuePhoto = res.data.url
    },
    getInfoById(param) {
      this.listLoading = false
      queryRescueById(param).then(response => {
        if (response.code == 200) {
          let temp = response.data
          this.form = {
            id: temp.id,
            animalId: temp.animalId,
            status: temp.status,
            isApproved: temp.isApproved,
            findSituation: temp.findSituation,
            process: temp.process,
            afterSituation: temp.afterSituation,
            rescueTime: temp.rescueTime ? temp.rescueTime : new Date(),
            animalDtoReq: {
              id: temp.animal.id,
              name: temp.animal.name,
              age: temp.animal.age,
              sex: temp.animal.sex,
              type: temp.animal.type,
              location: temp.animal.location,
            }
          }
          this.afterRescueUrl = temp.animal.afterRescuePhoto
        } else {
          this.$message.error('获取失败');
        }
        this.listLoading = false
      })
    },
    submit(flag) {
      this.$refs['rescueForm'].validate((valid) => {
        if (valid) {
          this.listLoading = true
          if (flag === 0) {
            this.form.status = 'END'
          } else {
            this.form.status = 'UPLOAD'
          }
          this.form.rescueTime = Date.parse(this.form.rescueTime)
          updateRescue(this.form).then(response => {
            if (response.code == 200) {
              this.$message({
                message: '上传成功!',
                type: 'success'
              });
              if (flag === 1) {
                this.getInfoById(this.infoId)
              } else {
                this.$emit("activeChange", 4);
              }
            } else {
              this.$message.error('上传失败');
            }
            this.listLoading = false
          })

        } else {
          this.$message.error('数据格式错误请检查！');
        }
      });
    },
  }
}
</script>

<style scoped lang="scss">
.main-body {
  margin: 1em 0;

  .dialog-footer {
    text-align: right;
  }
}
</style>
