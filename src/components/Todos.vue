<!--
 * @Author: your name
 * @Date: 2021-02-06 21:56:50
 * @LastEditTime: 2021-02-07 22:11:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \viteDemo\src\components\Todos.vue
-->
<template>
  <div>
    <!-- 新增todo -->
    <input type="text" v-model='newTodo' @keyup.enter='addTodo' autofocus placeholder='新增今日待办' autocomplate='off' />
    <!-- todo 列表 -->
    <ul>
      <li v-for='todo in filterdTodos' :key='todo.id' :class='{ completed: todo.completed, editing: todo === editedTodo }'>
        <!-- 绑定完成状态 -->
        <div class='view'>
          <input type="checkbox" v-model='todo.completed' />
          <label @dblclick='editTodo(todo)'>{{todo.title}}</label>
          <button @click='removeTodo(todo)'>X</button>
        </div>
        <!-- 编辑待办 -->
        <input type='text' v-todo-focus='todo === editedTodo' class='edit' v-model='todo.title' @blur='doneEdit(todo)' @keyup.enter='doneEdit(tdoto)' @keyup.escape='cancelEdit(todo)' />
      </li>
    </ul>
    <!-- 过滤 -->
    <p class="filters">
      <span @click="visibility = 'all'" :class="{ selected: visibility === 'all' }">All</span>
      <span @click="visibility = 'active'" :class="{ selected: visibility === 'active' }">Active</span>
      <span @click="visibility = 'completed'" :class="{ selected: visibility === 'completed' }">Completed</span>
    </p>
  </div>
</template>

<script>
import { toRefs, reactive, computed, watchEffect } from 'vue'

const filters = {
  all (todos) {
    return todos
  },
  active(todos) {
    return todos.filter(todo => !todo.completed)
  },
  completed(todos) {
    return todos.filter(todo => todo.completed)
  },
}

// 缓存操作
const todoStorage = {
  fetch() {
    let todos = JSON.parse(localStorage.getItem('vue3-todos') || '[]')
    todos.forEach((todo, index) => {
      todo.id = index + 1
    })
    return todos
  },
  save(todos) {
    localStorage.setItem('vue3-todos', JSON.stringify(todos))
  }
}

export default {
  setup () {
    const state = reactive({
      newTodo: '',
      todos: todoStorage.fetch(),
      // 缓存编辑前的title
      beforeEditCache: '',
      // 正在编辑的todo
      editedTodo: null,
      visibility: 'all',
      filterdTodos: computed(() => {
        return filters[state.visibility](state.todos)
      })
    })

    function addTodo () {
      state.todos.push({
        id: state.todos.length + 1,
        title: state.newTodo,
        completed: false
      })
      state.newTodo = ''
    }

    function removeTodo (todo) {
      state.todos.splice(state.todos.indexOf(todo), 1)
    }


    function editTodo (todo) {
      state.beforeEditCache = todo.title
      state.editedTodo = todo
    }

    function cancelEdit (todo) {
      todo.title = state.beforeEditCache
      state.editedTodo = null
    }

    function doneEdit () {
      state.editedTodo = null
    }

    watchEffect(() => {
      todoStorage.save(state.todos)
    })

    return {
      ...toRefs(state),
      addTodo,
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

.filters > span {
  padding: 2px 4px;
  margin-right: 4px;
  border: 1px solid transparent;
}

.filters > span.selcted {
  border-color: ragb(173, 47, 47, .2)
}
</style>