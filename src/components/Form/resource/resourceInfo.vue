<template>
  <div class="resourceInfo-body" v-loading="listLoading">
    <div v-if="isUpload">
      <el-form label-position="top" ref="resourceForm" :model="form"
               :rules="resourceFormRules">
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="标题" prop="title">
              <el-input v-model="form.title"
                        type="textarea"
                        :rows="2"
                        placeholder="请输入内容"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="对接类型" prop="type">
              <el-select v-model="form.type" placeholder="请选择对接类型">
                <el-option
                  v-for="item in typeOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="物资类别" prop="materialCategory">
              <el-select v-model="form.materialCategory" placeholder="请选择物资类别">
                <el-option
                  v-for="item in materialOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="标签" prop="label">
              <el-select v-model="form.label" multiple placeholder="请选择标签">
                <el-option
                  v-for="item in labelOption"
                  :key="item.id"
                  :label="item.value"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="14">
            <el-form-item label="地点" prop="location">
              <area-select v-model="form.location" :data="pcaa"
                           :level="2"></area-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="金额|数量" prop="amount">
              <el-input v-model="form.amount"
                        type="textarea"
                        :rows="2"
                        placeholder="请输入内容"/>
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
        <el-button type="primary" @click="submit(0)">上 传</el-button>
        <el-button type="primary" @click="submit(1)">保存草稿</el-button>
      </div>
    </div>

    <div class="resourceInfo-body-isUpload" v-if="!isUpload">
      <div class="resourceInfo-body-message"
           v-if="form.isApproved === undefined ||form.isApproved === null || form.isApproved === ''">
        <svg-icon icon-class="wait" class="resourceInfo-body-message-svg"/>
        <div class="resourceInfo-body-text">
          你的信息已提交,请等待审核!
        </div>
      </div>
      <div class="resourceInfo-body-message"
           v-if="form.isApproved !== null&& form.isApproved === 'NO'">
        <svg-icon icon-class="fail" class="resourceInfo-body-message-svg"/>
        <div class="resourceInfo-body-text">
          你的信息审核不通过,请检查后再次提交!
        </div>
      </div>
      <div class="resourceInfo-body-button">
        <el-button plain @click="updateAgain">再次编辑</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import {pcaa} from 'area-data';
import {addResource, updateResource, queryResourceById, updateResourceStatus} from "@/api/resource";
import {mapGetters} from "vuex";
import {getLabelList} from "@/api/label";

export default {
  name: "resourceInfo",
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
    var search = {
      page: 1,
      pageSize: 999
    }
    this.getLabelOptions(search)
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
      fileList: [],
      listLoading: false,
      //是否上传信息
      isUpload: false,
      //上传图片链接
      url: this.$store.state.settings.url + 'picture/upload',
      pcaa: pcaa,
      //表单数据
      form: {
        id: '',
        title: '',
        status: '',
        donor: '',
        givee: '',
        materialCategory: '',
        describes: '',
        amount: '',
        location: [],
        type: '',
        label: '',
        photo: []
      },
      //救助前动物照片
      beforResourceUrl: '',
      //表单规则
      //资源对接信息表单验证规则
      resourceFormRules: {
        location: [
          {required: true, message: '请选择所在地', trigger: 'blur'}
        ],
        describes: [
          {required: true, message: '请输入描述', trigger: 'blur'}
        ],
        type: [
          {required: true, message: '请选择对接类型', trigger: 'blur'}
        ],
        title: [
          {required: true, message: '请输入标题', trigger: 'blur'}
        ],
        materialCategory: [
          {required: true, message: '请选择物资类别', trigger: 'blur'}
        ],
        amount: [
          {required: true, message: '请输入金额|数量', trigger: 'blur'}
        ],
        label: [
          {required: true, message: '请选择标签', trigger: 'blur'}
        ]
      },
      labelOption: [],
      materialOptions: [
        {
          value: 'MONEY',
          label: '金钱'
        },
        {
          value: 'FOOD',
          label: '粮食'
        },
        {
          value: 'WARM',
          label: '保暖物品'
        },
        {
          value: 'OTHER',
          label: '其他'
        }
      ],
      // 资源对接类型选择
      typeOption: [
        {
          value: 'DONATE',
          label: '捐献'
        },
        {
          value: 'DEMAND',
          label: '需求'
        }
      ],
    }
  },
  methods: {
    getInfoById(param) {
      this.listLoading = true
      queryResourceById(param).then(response => {
        if (response.code == 200) {
          let row = response.data
          this.form.id = row.id
          this.form.isApproved = row.isApproved
          this.form.title = row.title
          this.form.status = row.status
          this.form.donor = row.donor
          this.form.givee = row.givee
          this.form.materialCategory = row.materialCategory
          this.form.describes = row.describes
          this.form.amount = row.amount
          this.form.location = row.location
          this.form.type = row.type
          this.form.label = row.label
          if (this.form.photo === undefined) {
            this.form.photo = []
            this.fileList = []
          }
          this.fileList = row.photos
          if (this.form.status === 'UNCOMMIT') {
            this.isUpload = true
          }
        } else {
          this.$message.error('获取失败');
        }
        this.listLoading = false
      })
    },
    updateAgain() {
      let temp = {
        id: this.infoId,
        status: 'UNCOMMIT'
      }
      updateResourceStatus(temp).then(response => {
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
      console.log(this.form)
      this.$refs['resourceForm'].validate((valid) => {
        if (valid) {
          this.listLoading = true
          this.form.isApproved = ''
          if (this.form.type === 'DONATE') {
            this.form.donor = this.id
          } else {
            this.form.givee = this.id
          }
          this.form.createUser = this.id
          if (flag == 0) {
            this.form.status = 'UNAPPROVED'
          } else {
            this.form.status = 'UNCOMMIT'
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
          if (this.infoId !== '') {
            this.form.id = this.infoId
            updateResource(this.form).then(response => {
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
            addResource(this.form).then(response => {
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
    getLabelOptions(search) {
      getLabelList(search).then(response => {
        this.labelOption = response.data.records
      })
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
.resourceInfo-body {
  margin: 1em 0;

  .dialog-footer {
    text-align: right;
    margin-top: 1em;
  }

  .resourceInfo-body-isUpload {
    position: relative;
    text-align: center;
    font-size: 2em;
    vertical-align: center;

    .resourceInfo-body-message-svg {
      width: 4em;
      height: 4em;
      display: block;
      margin: 0 calc(50% - 2em);
      padding: 1em 0;
    }

    .resourceInfo-body-button {
      margin-top: 1em;
    }
  }


}
</style>
