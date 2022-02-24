<template>
  <div v-loading="listLoading" class="step-4">
    <el-form label-position="top" ref="resourceForm" :model="form"
             :rules="resourceFormRules">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="对接时间" prop="collectionTime">
            <el-date-picker
              style="width: auto;"
              v-model="form.collectionTime"
              type="datetime"
              placeholder="选择日期时间"/>
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
            :action="url"
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
      <el-button type="primary" @click="submit(0)" title="提交后对接人也不可以修改了哦~">提 交</el-button>
      <el-button @click="submit(1)">保存草稿</el-button>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import {queryResourceById, updateResource} from "@/api/resource";

export default {
  name: "resourceProcess",
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
      fileList: [],
      listLoading: false,
      //上传图片链接
      url: this.$store.state.settings.url + 'picture/upload',
      //表单数据
      form: {
        id: '',
        collectionTime: new Date(),
        process: '',
        photo: []
      },

      //表单规则
      //资源对接信息表单验证规则
      resourceFormRules: {
        collectionTime: [
          {required: true, message: '请选择对接时间', trigger: 'blur'}
        ],
        process: [
          {required: true, message: '请输入对接过程', trigger: 'blur'}
        ]
      },
    }
  },
  methods: {
    getInfoById(param) {
      this.listLoading = true
      queryResourceById(param).then(response => {
        if (response.code == 200) {
          let row = response.data
          this.form.id = row.id
          this.form.collectionTime = row.collectionTime
          this.form.process = row.process
          if (this.form.photo === undefined) {
            this.form.photo = []
            this.fileList = []
          }
          this.fileList = row.photos
        } else {
          this.$message.error('获取失败');
        }
        this.listLoading = false
      })
    },
    submit(flag) {
      this.$refs['resourceForm'].validate((valid) => {
        if (valid) {
          this.listLoading = true
          if (flag === 0) {
            this.form.status = 'END'
          } else {
            this.form.status = 'UPLOAD'
          }
          this.form.photo = []
          if (this.fileList !== undefined && this.fileList !== null && this.fileList !== []) {
            for (let i = 0; i < this.fileList.length; i++) {
              if (this.fileList[i].response === undefined) {
                this.form.photo.push(this.fileList[i].id)
              } else {
                this.form.photo.push(this.fileList[i].response.data.id)
              }
            }
          }
          this.form.collectionTime = Date.parse(this.form.collectionTime)
          updateResource(this.form).then(response => {
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
  }
}
</script>

<style scoped lang="scss">
.step-4 {
  margin: 1em 0;

  .dialog-footer {
    text-align: right;
    margin-top: 1em;
  }
}
</style>
