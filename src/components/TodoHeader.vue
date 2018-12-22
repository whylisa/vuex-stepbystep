<template>
  <header class="header">
    <h1>todos</h1>
    <input v-model="todoName" @keyup.enter="addTodo" class="new-todo" placeholder="What needs to be done?" autofocus>
  </header>
</template>

<script>
export default {
  data() {
    return {
      // 因为这个数据只会在当前组件中使用
      // 因此，就不需要放到 Vuex 中
      todoName: ''
    }
  },

  methods: {
    // 添加任务
    addTodo() {
      if (this.todoName.trim() === '') {
        return
      }

      // 调用 Vuex 中提供的 mutations 即可
      // this.$store.commit('addTodo', {
      //   name: this.todoName
      // })

      // 调用 actions 来完成，异步添加
      this.$store.dispatch('addTodoAsync', {
        name: this.todoName
      })

      this.todoName = ''
    }
  }
}
</script>

<style>
</style>
