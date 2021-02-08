<!--
 * @Author: your name
 * @Date: 2021-02-08 21:58:00
 * @LastEditTime: 2021-02-08 22:06:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \viteDemo\src\components\todos\Filter.vue
-->
<template>
  <p class="filters">
    <span
      v-for="item in items"
      :key="item.value"
      @click="$emit('update:modelValue', item.value)"
      :class="{ selected: modelValue === item.value }">
      {{ item.label }}
    </span>
  </p>
</template>

<script>
export default {
  props: ['items', 'modelValue'],
  emits: ['update:modelValue']
}
</script>
<style scoped>
.filters > span {
  padding: 2px 4px;
  margin-right: 4px;
  border: 1px solid transparent;
}

.filters > span.selcted {
  border-color: ragb(173, 47, 47, .2)
}
</style>