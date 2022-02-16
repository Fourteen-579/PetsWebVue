<template>
  <div class="info-body" v-loading="listLoading">
    <div class="info-title">
      {{ info.title }}
    </div>
    <div class="info-author">
      官方出品
    </div>
    <div class="info-zanNum">
      {{ info.user !== null && info.user !== undefined ? info.user.length : 0 }}人喜欢了这篇文章
    </div>
    <div class="info-main" v-html="info.describes">

    </div>
    <div class="info-update-time">
      编辑于{{ info.updateTime }}
    </div>
    <div class="info-label">
      <el-tag>{{
          associationType.find(function (value) {
            return value.value === info.associationType;
          }).label
        }}
      </el-tag>
    </div>
  </div>
</template>

<script>
import {getPropagandaById, addComment, addUser} from "@/api/propaganda"
import {mapGetters} from "vuex";

export default {
  name: "info",
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'name',
      'id'
    ])
  },
  created() {
    this.infoId = this.$route.query.id
    this.getPropaganda(this.infoId)
  },
  data() {
    return {
      //宣传信息详情
      info: null,
      //宣传信息id
      infoId: null,
      //页面加载变量
      listLoading: false,
      //当前用户是否点赞该文章
      isUp: false,
      //当前用户是否评论该文章
      isComment: false,
      //当前用户发表的评论
      comment: '测试评论',
      // 关联类型选择
      associationType: [
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
    }
  },
  methods: {
    //获取宣传信息详细数据
    getPropaganda(params) {
      this.listLoading = true;
      getPropagandaById(params).then(response => {
        this.info = response.data
        if (this.info.user !== null) {
          for (let i = 0; i < this.info.user.length; i++) {
            if (this.info.user[i].id === this.id) {
              this.isUp = true
            }
          }
        }
        if (this.info.comment !== null) {
          for (let i = 0; i < this.info.comment.length; i++) {
            if (this.info.comment[i].createUser === this.id) {
              this.isComment = true
            }
          }
        }
      }).finally(() => {
        this.listLoading = false;
      })
    },
    //新增评论
    addComments() {
      this.listLoading = true;
      let param = {
        id: this.infoId,
        comment: [{
          content: this.comment,
          createUser: this.id
        }]
      }
      addComment(param).then(response => {
        if (response.code === 200 && response.data) {
          this.isComment = true
        } else {
          this.$message({
            message: '发生错误!',
            type: 'error'
          });
        }
      }).finally(() => {
        this.getPropaganda(this.infoId)
        this.listLoading = false;
      })
    },
    //点赞文章
    addUsers() {
      this.listLoading = true;
      let param = {
        id: this.infoId,
        user: [{
          id: this.id
        }]
      }
      addUser(param).then(response => {
        if (response.code === 200 && response.data) {
          this.isUp = true
        } else {
          this.$message({
            message: '发生错误!',
            type: 'error'
          });
        }
      }).finally(() => {
        this.getPropaganda(this.infoId)
        this.listLoading = false;
      })
    },
  }
}
</script>

<style scoped lang="scss">

</style>
