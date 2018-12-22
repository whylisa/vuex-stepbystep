<template>
  <footer class="footer">
    <!-- This should be `0 items left` by default -->
    <span class="todo-count"><strong>{{ $store.getters.unDoneCount }}</strong> item left</span>
    <!-- Remove this if you don't implement routing -->
    <ul class="filters">
      <li>
        <a class="selected" href="#/">All</a>
      </li>
      <li>
        <a href="#/active">Active</a>
      </li>
      <li>
        <a href="#/completed">Completed</a>
      </li>
    </ul>
    <!-- Hidden if no completed items are left ↓ -->
    <button class="clear-completed" @click="clearAllDone" v-show="$store.getters.showClearDone">Clear completed</button>
  </footer>
</template>

<script>
export default {
  methods: {
    // 清除所有已完成任务
    clearAllDone() {
      this.$store.commit('clearAllDone')
    }
  }
}
</script>

<style>
</style>
