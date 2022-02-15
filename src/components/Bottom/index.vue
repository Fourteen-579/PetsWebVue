<template>
  <div class="bottom-main">
    <div class="bottom-line bottom-first">
      <div class="bottom-first-link" v-for="item in link">
        <router-link :to="item.path">{{ item.label }}</router-link>
      </div>

    </div>
    <div class="bottom-line bottom-second">
      <div class="bottom-second-text" v-for="item in name">
        {{ item }}
      </div>
    </div>
    <div class="bottom-line bottom-third">
      <div class="bottom-line">
        Author:Fourteen-579
      </div>
      <div class="">
        GitHub:
        <a href="https://github.com/Fourteen-579">
          https://github.com/Fourteen-579
        </a>
      </div>


    </div>
  </div>
</template>

<script>
export default {
  name: "Bottom",
  data() {
    return {
      link: [
        {
          label: '关于我们',
          path: ''
        },
        {
          label: '用户协议',
          path: '/file/user'
        },
        {
          label: '加入我们',
          path: ''
        }, {
          label: '帮助中心',
          path: ''
        }, {
          label: '政策法规',
          path: '/file/policy'
        }
      ],
      name: ["动物领养", "动物救助", "动物认养", "基地筹粮", "基地助养", "宠市交易", "义购商城", "动物医生", "宠物微群", "动物知识"]
    }
  }
}
</script>

<style lang="scss" scoped>
.bottom-main {
  color: #b0b0b0;
  width: 100%;
  height: 11em;
  background-color: #1f1e1e;
  padding: 20px 155px 10px 154px;
  font-size: 15px;

  .bottom-line {
    margin-bottom: 20px;
  }

  .bottom-first {
    .bottom-first-link {
      display: inline-flex;
      margin-right: 20px;
    }
  }

  .bottom-second-text {
    display: inline-flex;
    margin-right: 20px;
    color: #5a5e66;
  }
}


</style>
