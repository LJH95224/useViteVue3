/*
 * @Author: your name
 * @Date: 2021-02-08 22:23:37
 * @LastEditTime: 2021-02-08 22:26:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \viteDemo\src\components\todos\useFilter.js
 */

 import { reactive, computed } from 'vue'
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

export function useFilter (todos) {
  const filterState = reactive({
    visibility: 'all',
    filterdTodos: computed(() => {
      return filters[filterState.visibility](todos.value)
    }),
    filterItems: [
      { label: 'All', value: 'all'},
      { label: 'Active', value: 'active'},
      { label: 'Completed', value: 'completed'}
    ]
  })
  return filterState
}
