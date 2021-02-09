<!--
 * @Author: your name
 * @Date: 2021-02-06 21:56:50
 * @LastEditTime: 2021-02-09 11:41:38
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
    <!-- 返回dashbord -->
    <button @click="goBackDashbord">goBackToDashbord</button>
  </div>
</template>

<script>
import { toRefs, reactive, computed, watchEffect } from 'vue'
import TodoItem from './TodoItem.vue'
import Filter from './Filter.vue'
import { useTodos } from './useTodos.js'
import { useFilter } from './useFilter'
import { useRouter } from 'vue-router'
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
    
    const router = useRouter()

    
    return {
      ...toRefs(todoState),
      ...toRefs(filterState),
      addTodo,
      removeTodo,
      goBackDashbord () {
        router.push('/')
      }
    }
  }
}
</script>