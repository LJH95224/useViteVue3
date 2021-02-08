<!--
 * @Author: your name
 * @Date: 2021-02-08 21:11:59
 * @LastEditTime: 2021-02-08 21:31:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \viteDemo\src\components\todos\EditTodo.vue
-->
<template>
  <input type="text" :value='todoTitle' @input='onInputChange' v-bind="$attrs" />
</template>

<script>
export default {
  props: {
    todoTitle: {
      type: String,
      default: ''
    }
  },
  methods: {
    onInputChange(e) {
      this.$emit('update:todoTitle', e.target.value)
    }
  }
}
</script>