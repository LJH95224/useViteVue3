<!--
 * @Author: your name
 * @Date: 2021-01-16 14:13:21
 * @LastEditTime: 2021-02-08 21:12:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \viteDemo\src\App.vue
-->
<template>
  <div style="width: 100%;height: 800px;">
    <img alt="Vue logo" src="./assets/logo.png" />
    <Todos></Todos>
  </div>
  <div>
    <HelloWorld msg="Hello Vue 3.0 + Vite" />
    <next-page></next-page>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import NextPage from './components/NextPage.vue'
import Todos from './components/todos/Todos.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
    NextPage,
    Todos
  }
}
</script>
