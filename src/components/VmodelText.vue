<!--
 * @Author: your name
 * @Date: 2021-01-17 14:44:30
 * @LastEditTime: 2021-01-17 14:47:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \viteDemo\src\components\VmodelText.vue
-->
<template>
  <div @click="$emit('update:modelValue', modelValue + 1)">Counter: {{ modelValue }}</div>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style>

</style>