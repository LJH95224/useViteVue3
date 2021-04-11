<!--
 * @Author: your name
 * @Date: 2021-01-16 14:13:21
 * @LastEditTime: 2021-04-11 11:57:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \viteDemo\src\App.vue
-->
<template>
  <div style="width: 100%;height: 800px;">
    <img alt="Vue logo" src="./assets/logo.png" />
    <!-- 传统写法 -->
    <p @click="$store.commit('add')">{{ $store.state.count }}</p>
    <!-- composition 写法 -->
    <p @click='add'>{{ state.count }}</p>
    <!-- <Todos></Todos> -->
    <router-view v-slot={Component}>
      <keep-alive>
        <component :is='Component'></component>
      </keep-alive>
    </router-view>
    <!-- <router-view></router-view> -->
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
import { useStore } from 'vuex'
export default {
  name: 'App',
  components: {
    HelloWorld,
    NextPage,
    Todos
  },
  setup () {
    const store = useStore()
    console.log(store)
    return {
      // state 是响应式的，但是state里面的值不是响应式的
      state: store.state,
      add () {
        store.commit('add')
      }
    }
  }
}
</script>
