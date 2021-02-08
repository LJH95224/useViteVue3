<!--
 * @Author: your name
 * @Date: 2021-02-06 21:56:50
 * @LastEditTime: 2021-02-08 22:25:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \viteDemo\src\components\todos\Todos.vue
-->
<template>
  <div>
    <!-- 新增todo -->
    <EditTodo
      v-model:todo-title="newTodo"
      @keyup.enter='addTodo'
      autofocus
      placeholder='新增今日待办'
      autocomplate='off'>
    </EditTodo>
    <!-- todo 列表 -->
    <ul>
      <TodoItem
        v-for='todo in filterdTodos'
        :key='todo.id'
        :todo='todo'
        v-model:edited-todo='editedTodo'
        @remove-todo='removeTodo'></TodoItem>
    </ul>
    <!-- 过滤 -->
    <Filter :items='filterItems' v-model="visibility"></Filter>
      <!-- <span @click="visibility = 'all'" :class="{ selected: visibility === 'all' }">All</span>
      <span @click="visibility = 'active'" :class="{ selected: visibility === 'active' }">Active</span>
      <span @click="visibility = 'completed'" :class="{ selected: visibility === 'completed' }">Completed</span> -->
  </div>
</template>

<script>
import { toRefs, reactive, computed, watchEffect } from 'vue'
import TodoItem from './TodoItem.vue'
import Filter from './Filter.vue'
import { useTodos } from './useTodos.js'
import { useFilter } from './useFilter'

export default {
  components: {
    TodoItem,
    Filter
  },
  setup () {
    const todoState = reactive({
      newTodo: '',
      // 正在编辑的todo
      editedTodo: null,
    })
    const { todos, addTodo, removeTodo } = useTodos(todoState)
    const filterState = useFilter(todos)

    return {
      ...toRefs(todoState),
      ...toRefs(filterState),
      addTodo,
      removeTodo
    }
  }
}
</script>