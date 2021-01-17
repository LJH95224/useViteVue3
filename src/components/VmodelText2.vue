<!--
 * @Author: your name
 * @Date: 2021-01-17 14:44:30
 * @LastEditTime: 2021-01-17 14:56:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \viteDemo\src\components\VmodelText.vue
-->
<template>
  <div @click="$emit('update:counter', counter + 1)">v-model 使用其他命名 Counters: {{ counter }}</div>
</template>

<script>
export default {
  props: {
    counter: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style>

</style>