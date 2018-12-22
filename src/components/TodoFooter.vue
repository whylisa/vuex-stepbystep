<template>
  <footer class="footer">
    <!-- This should be `0 items left` by default -->
    <span class="todo-count"><strong>{{ unDoneCount }}</strong> item left</span>
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
    <button class="clear-completed" @click="clearAllDone" v-show="showClearDone">Clear completed</button>
  </footer>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'

export default {
  methods: {
    // 清除所有已完成任务
    // clearAllDone() {
    //   this.$store.commit('clearAllDone')
    // }
    ...mapMutations(['clearAllDone'])
  },

  // 将 Vuex 中的 getters 映射为当前组件的计算属性
  // 那么，再使用的时候，直接使用 unDoneCount 这些数据就行了，就不再需要使用 $store.getters.unDoneCount 这种形式
  computed: mapGetters(['unDoneCount', 'showClearDone'])
}
</script>

<style>
</style>
