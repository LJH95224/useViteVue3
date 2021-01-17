<!--
 * @Author: your name
 * @Date: 2021-01-16 16:16:38
 * @LastEditTime: 2021-01-16 16:23:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \viteDemo\src\components\Emits.vue
-->
<template>
  <div @click="$emit('my-click')">
    自定义事件
  </div>
</template>

<script>
export default {
  emits: ['my-click']
}
</script>

<style>

</style>