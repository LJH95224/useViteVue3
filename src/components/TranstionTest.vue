<!--
 * @Author: your name
 * @Date: 2021-02-06 21:28:50
 * @LastEditTime: 2021-02-06 21:30:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \viteDemo\src\components\TranstionTest.vue
-->
<template>
  <div id="demo">
    <button @click="show = !show">Toggle</button>

    <transition name="fade">
      <p v-if="show">hello</p>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: true,
    };
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>