<!--
 * @Author: your name
 * @Date: 2021-02-06 21:50:05
 * @LastEditTime: 2021-02-06 21:51:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \viteDemo\src\components\NextPage.vue
-->
<template>
  <div>
    this is next-page
  </div>
</template>

<script>
import { emitter } from './HelloWorld.vue'
export default {
  mounted () {
    emitter.on('someEvent', msg => {
      console.log(msg);
    })
  }
}
</script>