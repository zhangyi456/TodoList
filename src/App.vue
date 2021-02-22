<template>
  <div id="app">
    <a-input placeholder="请输入任务" class="my_ipt" :value='setInputValue' @change='hangleInputChange'/>
    <a-button type="primary" @click='addInputCount'>添加事项</a-button>

    <a-list bordered :dataSource="infoList" class="dt_list">
      <a-list-item slot="renderItem" slot-scope="item">
        <!-- 复选框 -->
        <a-checkbox :checked='item.done' @change='(e) => {
          cdStatusChange(e, item.id)}'>{{ item.info }}</a-checkbox>
        <!-- 删除链接 -->
        <a slot="actions" @click='removeItemById(item.id)'>删除</a>
      </a-list-item>

      <!-- footer区域 -->
      <div slot="footer" class="footer">
        <!-- 未完成的任务个数 -->
        <span>{{unDoneLength}}条剩余</span>
        <!-- 操作按钮 -->
        <a-button-group>
          <a-button :type="viewKey === 'all' ? 'primary' : 'default'" @click="changeList('all')">全部</a-button>
          <a-button  :type="viewKey === 'undone' ? 'primary' : 'default'" @click="changeList('undone')">未完成</a-button>
          <a-button  :type="viewKey === 'done' ? 'primary' : 'default'" @click="changeList('done')">已完成</a-button>
        </a-button-group>
        <!-- 把已经完成的任务清空 -->
        <a @click='clear'>清除已完成</a>
      </div>
    </a-list>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'app',
  data () {
    return {}
  },
  computed: {
    ...mapState(['setInputValue', 'viewKey']),
    ...mapGetters(['unDoneLength', 'infoList'])
  },
  created () {
    this.$store.dispatch('getList')
    // console.log(this.$store.sate.list)
  },
  methods: {
    hangleInputChange (e) {
      // console.log(e.taget.value);
      this.$store.commit('inputChange', e.target.value)
    },
    // 添加项目的方法
    addInputCount () {
      if (this.setInputValue.trim().length <= 0) {
        return this.$message.warning('文本框内容不能为空')
      }
      this.$store.commit('addItem')
    },
    // 删除项目的方法
    removeItemById (id) {
      this.$store.commit('removeItem', id)
    },
    // 监听复选框选中状态变化的事件
    cdStatusChange (e, id) {
      // console.log(e.target.checked)
      // console.log(id)
      const param = {
        id: id,
        status: e.target.checked
      }
      this.$store.commit('statusChange', param)
    },
    // 清除已完成的事件
    clear () {
      this.$store.commit('clearDone')
    },
    // 改变的完成状态的事件
    changeList (key) {
      this.$store.commit('changViewKey', key)
    }
  }
}
</script>

<style scoped>
#app {
  padding: 10px;
}

.my_ipt {
  width: 500px;
  margin-right: 10px;
}

.dt_list {
  width: 500px;
  margin-top: 10px;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
