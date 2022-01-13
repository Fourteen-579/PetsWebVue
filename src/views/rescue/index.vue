<template>
  <div class="app-container">
    <div class="to-rescued">
      <Title titleName="待救助动物"/>
      <RescueBlock :rescue-item="item" v-for="item in list"/>
    </div>
  </div>
</template>

<script>
import {getRescueList, updateRescue, addRescue, deletedRescue} from '@/api/resuce'
import {getUserList} from '@/api/user'
import {getAnimalList} from '@/api/animal'
import RescueBlock from "@/components/RescueBlock/index"
import Title from "@/components/Title/index"

export default {
  components: {
    RescueBlock,
    Title
  },
  data() {
    return {
      // 数据
      list: [],
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
      ],
      //状态选择
      statusOption: [
        {
          value: 'UNCOMMIT',
          label: '信息未提交'
        },
        {
          value: 'UNAPPROVED',
          label: '信息未审核'
        },
        {
          value: 'WAITING',
          label: '等待对接人'
        },
        {
          value: 'TALKING',
          label: '双方沟通'
        },
        {
          value: 'UPLOAD',
          label: '上传过程'
        },
        {
          value: 'END',
          label: '结束'
        }
      ]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    // 获取数据
    fetchData() {
      this.listLoading = true
      let search = {
        page: 1,
        pageSize: 5,
        status: 'WAITING'
      }
      getRescueList(search).then(response => {
        this.list = response.data.records
      }).finally(() => {
        this.listLoading = false
      })
    },

  }
}
</script>

<style scoped>

</style>
