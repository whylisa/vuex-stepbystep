import Vue from 'vue'
import Vuex from 'vuex'

// 安装
Vue.use(Vuex)

// 初始化state
const state = {
  todos: [
    { id: 1, name: '学框架', done: false },
    { id: 2, name: '学设计模式', done: false },
    { id: 3, name: '学算法', done: true },
    { id: 3, name: '秃顶', done: true },
    { id: 3, name: '秃光光', done: true },
    { id: 3, name: '老婆没得', done: true }
  ]
}

// mutations
const mutations = {
  // 根据id修改完任务的成状态
  changeDone(state, payload) {
    // 1 根据id找到当前任务
    const curTodo = state.todos.find(item => item.id === payload.id)
    // 2 状态直接取反即可
    curTodo.done = !curTodo.done
  },

  // 添加任务方法
  addTodo(state, payload) {
    const length = state.todos.length
    const id = length === 0 ? 1 : state.todos[length - 1].id + 1

    state.todos.push({
      id,
      name: payload.name,
      done: false
    })
  },

  // 删除任务方法
  delTodo(state, payload) {
    state.todos.splice(payload.index, 1)
  },

  // 更新任务方法
  updateTodo(state, payload) {
    // 查找到当前要更新的任务
    const curTodo = state.todos.find(item => item.id === payload.id)
    // 修改名称
    curTodo.name = payload.name
  },

  // 清除已完成任务
  clearAllDone(state) {
    state.todos = state.todos.filter(item => !item.done)
  }
}

// actions 异步操作
// 内部还是提交的 mutations
const actions = {
  // 异步添加任务
  addTodoAsync(context, payload) {
    // setTimeout就是一个异步操作, 内部还是提交的 mutations
    setTimeout(() => {
      context.commit('addTodo', {
        name: payload.name
      })
    }, 2000)
  }
}

// getters
// 相当于Vue组件中的 计算属性 ，用法完全相同
// 当需要从现有的state中得到一些新的数据（比如：从 todos 集合中，得到未完成任务数量）
// 就要使用 getters ，也就是计算属性
const getters = {
  // 未完成任务数量
  unDoneCount(state) {
    return state.todos.filter(item => !item.done).length
  },

  // 控制清除已完成任务按钮的展示和隐藏
  showClearDone(state) {
    return state.todos.some(item => item.done)
  }
}

// todos模块
const todosModule = {
  state,
  mutations,
  actions,
  getters
}

// 创建store
const store = new Vuex.Store({
  // 开启严格模式
  // 开发期间 NODE_ENV 的值为： 'development'
  // 生成环境中 NODE_ENV 的值为： 'production'
  strict: process.env.NODE_ENV !== 'production',

  // 模块
  // 添加模块之后，只会对 state 产生影响
  // 也就是说现在要访问 todosModule 模块中的 state ，需要添加模块名
  // 原来：$store.state.todos
  // 有了模块以后：$store.state.a.todos
  modules: {
    a: todosModule
  }
  // state,
  // mutations,
  // actions,
  // getters
})

export default store
