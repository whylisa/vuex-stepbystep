<template>
  <section class="main">
    <input id="toggle-all" class="toggle-all" type="checkbox">
    <label for="toggle-all">Mark all as complete</label>
    <ul class="todo-list">
      <!--
        完成状态： completed
        编辑状态： editing
       -->
      <li :class="{ completed: todo.done, editing: todo.id === editId }" v-for="(todo, index) in $store.state.a.todos" :key="todo.id">
        <div class="view">
          <!--
            前提：因为我们知道 Vuex 中的数据，只能通过 mutations 中提供的方法来修改
            因为在 checkbox 中使用了 v-model，v-model是双向绑定的，当点击 复选框 的时候，会将其对应的数据修改，
            这样就违背了 Vuex 中数据只能由 mutations 修改这个原则了！！！

            数据 -> 视图： :checked="todo.done" （单向）
            视图 -> 数据： 先绑定一个事件，在事件中调用 mutations 来完成数据修改
           -->
          <input class="toggle" type="checkbox" :checked="todo.done" @change="changeDone({ id: todo.id })">
          <!-- <input class="toggle" type="checkbox" v-model="todo.done"> -->
          <label @dblclick="showEditStatus(todo.id)">{{ todo.name }}</label>
          <button class="destroy" @click="delTodo({
            index: index
          })"></button>
        </div>
        <input class="edit" :value="todo.name" @keyup.enter="updateTodo(todo.id, index)" ref="todoUpdate">
      </li>
    </ul>
  </section>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
// import { mapMutations } from 'vuex'

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

    // 将 Vuex 中的 mutations 方法映射为当前组件的方法
    // 组件中调用 changeDone 方法，实际上就是直接调用 mutations 中的 changeDone
    // 注意：参数的问题！！！
    ...mapMutations(['changeDone', 'delTodo'])

    /* // 切换完成状态
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
    } */
  },

  // 使用 mapState 将 Vuex 中的 todos，与 当前组件的
  // 计算属性 todos 关联到一起了。此时，就可以使用
  // this.todos 代替原始 $store.state.todos
  // 使用 mapState 后，简化了在组件中使用 Vuex 中的数据
  // computed: mapState(['todos'])
  //
  // 上面的代码相当于这句：
  // computed: mapState({
  //   todos: state => state.todos
  // })

  // 如果想要映射 模块 中的todos 到 组件的计算属性中，需要使用这种形式：
  computed: mapState({
    todos: state => state.a.todos
  })
}
</script>

<style>
</style>
