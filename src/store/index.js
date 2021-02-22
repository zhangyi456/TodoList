import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    list: [],
    setInputValue: 'x',
    nextId: 5,
    viewKey: 'all'
  },
  mutations: {
    initList (state, list) {
      state.list = list
    },
    inputChange (state, val) {
      state.setInputValue = val
    },
    addItem (state) {
      const obj = {
        id: 'nextId',
        info: state.setInputValue.trim(),
        done: false
      }
      this.state.list.push(obj)
      state.nextId++
      state.setInputValue = ''
    },
    removeItem (state, id) {
      const i = state.list.findIndex(x => x.id === id)
      if (i !== -1) {
        state.list.splice(i, 1)
      }
    },
    statusChange (state, param) {
      const i = state.list.findIndex(x => x.id === param.id)
      if (i !== -1) {
        state.list[i].done = param.status
      }
    },
    clearDone (state) {
      state.list = state.list.filter(x => x.done === false)
    },
    changViewKey (state, key) {
      state.viewKey = key
    }
  },
  actions: {
    async getList (context) {
      const { data } = await axios.get('/list.json')
      context.commit('initList', data)
    }
  },
  // 统计未完成的条数
  getters: {
    unDoneLength (state) {
      return state.list.filter(x => x.done === false).length
    },
    infoList (state) {
      if (state.viewKey === 'all') {
        return state.list
      }
      if (state.viewKey === 'undone') {
        return state.list.filter(x => !x.done)
      }
      if (state.viewKey === 'done') {
        return state.list.filter(x => x.done)
      }
      return state.list
    }
  },
  modules: {
  }
})
