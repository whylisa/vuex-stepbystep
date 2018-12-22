<template>
  <section class="main">
    <input id="toggle-all" class="toggle-all" type="checkbox">
    <label for="toggle-all">Mark all as complete</label>
    <ul class="todo-list">
      <!--
        完成状态： completed
        编辑状态： editing
       -->
      <li :class="{ completed: todo.done, editing: todo.id === editId }" v-for="(todo, index) in $store.state.todos" :key="todo.id">
        <div class="view">
          <!--
            前提：因为我们知道 Vuex 中的数据，只能通过 mutations 中提供的方法来修改
            因为在 checkbox 中使用了 v-model，v-model是双向绑定的，当点击 复选框 的时候，会将其对应的数据修改，
            这样就违背了 Vuex 中数据只能由 mutations 修改这个原则了！！！

            数据 -> 视图： :checked="todo.done" （单向）
            视图 -> 数据： 先绑定一个事件，在事件中调用 mutations 来完成数据修改
           -->
          <input class="toggle" type="checkbox" :checked="todo.done" @change="changeDone(todo.id)">
          <!-- <input class="toggle" type="checkbox" v-model="todo.done"> -->
          <label @dblclick="showEditStatus(todo.id)">{{ todo.name }}</label>
          <button class="destroy" @click="delTodo(index)"></button>
        </div>
        <input class="edit" :value="todo.name" @keyup.enter="updateTodo(todo.id, index)" ref="todoUpdate">
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  data() {
    return {
      // 临时变量，用来处理编辑状态
      editId: -1
    }
  },
  methods: {
    // 出现编辑状态
    showEditStatus(id) {
      this.editId = id
    },

    // 更新任务名称
    updateTodo(id, index) {
      // 根据索引号找到对应的文本框
      const name = this.$refs.todoUpdate[index].value

      this.$store.commit('updateTodo', {
        id,
        name
      })

      // 去掉编辑状态
      this.editId = -1
    },

    // 切换完成状态
    changeDone(id) {
      // 调用 mutations 中提供的方法，来修改state中的数据
      this.$store.commit('changeDone', {
        id
      })
    },

    // 删除任务
    delTodo(index) {
      this.$store.commit('delTodo', {
        index
      })
    }
  }
}
</script>

<style>
</style>
