<template>
  <section class="todoapp">
    <!-- 头部添加任务组件 -->
    <TodoHeader></TodoHeader>
    <!-- 中间任务列表组件 -->
    <TodoList></TodoList>
    <!-- 底部状态操作组件 -->
    <TodoFooter></TodoFooter>
  </section>
</template>

<script>
// 导入三个组件
import TodoHeader from '@/components/TodoHeader'
import TodoList from '@/components/TodoList'
import TodoFooter from '@/components/TodoFooter'

export default {
  // 注册为局部组件
  components: {
    TodoHeader,
    TodoList,
    TodoFooter
  }
}
</script>

<style>
</style>
