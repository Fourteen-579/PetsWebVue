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
      编辑于 {{ info.updateTime }}
    </div>
    <div class="info-label">
      <el-tag type="success" class="info-label-item">{{
          associationType.find(function (value) {
            return value.value === info.associationType;
          }).label
        }}
      </el-tag>
      <el-tag type="success" class="info-label-item">
        宣传
      </el-tag>
      <el-tag type="success" class="info-label-item">
        流浪动物
      </el-tag>
    </div>
    <div class="info-function">
      <div class="info-function-up info-function-item"
           @click="addUsers"
           title="点赞后就不能取消了哦~">
        <svg-icon :icon-class="isUp?'up-yes':'up-no'" class="info-function-up-svg info-function-svg"/>
        <span :class="{green:isUp}" class="info-function-up-text info-function-text">
              {{ info.user !== null && info.user !== undefined ? info.user.length : 0 }}个喜欢
        </span>
      </div>
      <div class="info-function-comment info-function-item"
           @click="isShowComment = !isShowComment">
        <svg-icon icon-class="comment-hui" class="info-function-comment-svg info-function-svg"/>
        <span class="info-function-comment-text info-function-text">
          {{
            isShowComment ? '收起评论' : '查看' + (info.comment !== null && info.comment !== undefined ? info.comment.length : 0) + '条评论'
          }}
        </span>
      </div>
    </div>

    <div class="info-comment" v-if="isShowComment&&info.comment">
      <div class="info-comment-num">
        {{ info.comment !== null && info.comment !== undefined ? info.comment.length : 0 }}条评论
      </div>
      <div class="info-comment-for">
        <div class="info-comment-item" v-for="comment in info.comment">
          <div class="info-comment-left">
            <div class="info-comment-item-photo">
              <el-image
                v-if="comment.createUserPhoto"
                class="info-comment-item-photo-img"
                :src="comment.createUserPhoto"
                fit="cover"></el-image>
            </div>
          </div>
          <div class="info-comment-right">
            <div class="info-comment-item-name-time">
              <span class="info-comment-item-name">{{ comment.createUserName }}</span>
              <span class="info-comment-item-time">
            {{ $moment(comment.createTime).format('YYYY-MM-DD') }}</span>
            </div>
            <div class="info-comment-item-content">
              {{ comment.content }}
            </div>
          </div>
        </div>
      </div>
      <div class="info-comment-add">
        <div class="info-comment-add-left">
          <el-input
            class="info-comment-add-input"
            placeholder="请输入你的评论"
            v-model="comment"
            clearable>
          </el-input>
        </div>
        <div class="info-comment-add-right">
          <el-button
            class="info-comment-add-button"
            :disabled="comment === ''"
            @click="addComments"
            type="primary">发布
          </el-button>
        </div>

      </div>
    </div>
    <div class="info-comment" v-if="isShowComment&&!info.comment">
      <div class="info-comment-num">
        暂无评论
      </div>

      <div class="info-comment-add">
        <div class="info-comment-add-left">
          <el-input
            class="info-comment-add-input"
            placeholder="请输入你的评论"
            v-model="comment"
            clearable>
          </el-input>
        </div>
        <div class="info-comment-add-right">
          <el-button
            class="info-comment-add-button"
            :disabled="comment === ''"
            @click="addComments"
            type="primary">发布
          </el-button>
        </div>

      </div>
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
      comment: '',
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
      //是否展示评论
      isShowComment: false,
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
      if (!this.isUp) {
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
      }
    },
  }
}
</script>

<style scoped lang="scss">
.info-body {
  margin: 1.5em 5em;

  .info-title {
    font-size: 2em;
    font-weight: bolder;
    margin-bottom: 0.5em;
    line-height: 2em;
  }

  .info-author {
    font-size: 1em;
    font-weight: bolder;
    margin-bottom: 0.5em;
    line-height: 1em;
  }

  .info-zanNum {
    font-size: 0.75em;
    margin-bottom: 0.5em;
    color: #5a5e66;
  }

  .info-main {
    width: 100%;
    overflow-x: hidden;
    margin-bottom: 2em;
  }

  .info-update-time {
    font-size: 1em;
    margin-bottom: 1em;
    color: #5a5e66;
  }

  .info-label {
    .info-label-item {
      margin-right: 1em;
    }
  }

  .info-function {
    margin-top: 2em;
    font-size: 1em;

    .info-function-item {
      display: inline-block;
      margin-right: 2em;
    }

    .info-function-svg {

    }

    .info-function-text {

    }
  }

  .info-comment {
    margin-top: 2em;
    box-shadow: 1px 1px 5px #888888;

    .info-comment-num {
      font-size: 1em;
      font-weight: bolder;
      padding: 1em;
      border-bottom: 0.5px solid rgba(136, 136, 136, 0.30);
    }

    .info-comment-for {
      max-height: 50vh;
      overflow-y: auto;

      .info-comment-item {
        padding: 1em 1em 0;
        border-top: 0.5px solid rgba(136, 136, 136, 0.30);
        font-size: 1em;
        line-height: 2em;

        .info-comment-left {
          display: inline-block;
          vertical-align: top;
          width: 5%;

          .info-comment-item-photo {

            .info-comment-item-photo-img {
              width: 2em;
              height: 2em;
            }
          }
        }

        .info-comment-right {
          display: inline-block;
          width: 95%;

          .info-comment-item-name-time {
            vertical-align: top;


            .info-comment-item-name {

            }

            .info-comment-item-time {
              float: right;
              font-size: 0.9em;
              color: #8c939d;
            }
          }

          .info-comment-item-content {
            display: -webkit-box;
            overflow: hidden;
            white-space: normal !important;
            text-overflow: ellipsis;
            word-wrap: break-word;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
        }


      }
    }


    .info-comment-add {
      border-top: 0.5px solid rgba(136, 136, 136, 0.30);

      .info-comment-add-left {
        width: 90%;
        display: inline-block;
        padding: 1em;

        .info-comment-add-input {

        }
      }

      .info-comment-add-right {
        width: 10%;
        display: inline-block;
        padding: 1em;

        .info-comment-add-button {

        }
      }
    }
  }
}
</style>
