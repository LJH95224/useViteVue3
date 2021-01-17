<!--
 * @Author: your name
 * @Date: 2021-01-16 14:13:21
 * @LastEditTime: 2021-01-17 14:55:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \viteDemo\src\components\HelloWorld.vue
-->
<template>
  <h1>{{ msg }}</h1>
  <button @click="count++">count is: {{ count }}</button>
  <p>Edit <code>components/HelloWorld.vue</code> to test hot module replacement.</p>
  <!-- Composition api -->
  <Composition></Composition>
  <!-- Teleport: ModelButton -->
  <ModelButton></ModelButton>
  <!-- Emits.vue -->
  <Emits @my-click="onclick"></Emits>
  <!-- 实例方法定义组件 -->
  <comp></comp>
  <!-- v-model的使用 -->
  <VmodelText v-model="counter"></VmodelText>
  <!-- 如果子组件里面使用其他命名。则要在v-mode后面添加 v-model:counters 子组件传过来的名称-->
  <VmodelText2 v-model:counter="counters"></VmodelText2>
</template>

<script>
import { ref } from 'vue'
import Composition  from './Composition.vue'
import ModelButton from './ModelButton.vue'
import Emits from './Emits.vue'
import VmodelText from './VmodelText.vue'
import VmodelText2 from './VmodelText2.vue'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  components: {
    Composition,
    ModelButton,
    Emits,
    VmodelText2,
    VmodelText
  },
  setup () {
    const count = ref(0)
    const counter = ref(1)
    const counters = ref(1)
    return { count, counter, counters }
  },
  methods: {
    onclick () {
      console.log('click me!')
    }
  }
}
</script>
