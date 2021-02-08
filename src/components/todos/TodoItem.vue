<!--
 * @Author: your name
 * @Date: 2021-02-08 21:32:08
 * @LastEditTime: 2021-02-08 22:21:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \viteDemo\src\components\todos\TodoItem.vue
-->
<template>
  <li :class='{ completed: todo.completed, editing: todo === editedTodo }'>
    <!-- 绑定完成状态 -->
    <div class='view'>
      <input type="checkbox" v-model='todo.completed' />
      <label @dblclick='editTodo(todo)'>{{todo.title}}</label>
      <button @click='removeTodo(todo)'>X</button>
    </div>
    <!-- 编辑待办 -->
    <EditTodo
      v-model:todo-title='todo.title'
      v-todo-focus='todo === editedTodo'
      class='edit'
      @blur='doneEdit(todo)'
      @keyup.enter='doneEdit(tdoto)'
      @keyup.escape='cancelEdit(todo)'>
    </EditTodo>
  </li>
</template>

<script>
import { reactive, toRefs } from 'vue'
export default {
  props: {
    todo: {
      type: Object,
      required: true
    },
    editedTodo: Object
  },
  emits: ['remove-todo', 'update:edited-todo'],
  setup (props, { emit }) {
    const state = reactive({
      // 缓存编辑前的title
      beforeEditCache: '',
    })

    function removeTodo (todo) {
      emit('remove-todo', todo)
    }

    function editTodo (todo) {
      state.beforeEditCache = todo.title
      emit('update:edited-todo', todo)
      // state.editedTodo = todo
    }

    function cancelEdit (todo) {
      todo.title = state.beforeEditCache
      emit('update:edited-todo', null)
      // state.editedTodo = null
    }

    function doneEdit () {
      emit('update:edited-todo', null)
      // state.editedTodo = null
    }

    return {
      ...toRefs(state),
      removeTodo,
      editTodo,
      cancelEdit,
      doneEdit
    }
  },
  directives: {
    'todo-focus': (el, {value}) => {
      if (value) {
        el.focus()
      }
    }
  }
}
</script>
<style scoped>
.completed label {
  text-decoration: line-through;
}
.edit,
.editing .view {
  display: none;
}

.view,
.editing .edit {
  display: block;
}
</style>