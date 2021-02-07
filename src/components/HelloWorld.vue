<!--
 * @Author: your name
 * @Date: 2021-01-16 14:13:21
 * @LastEditTime: 2021-02-06 21:48:42
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
  <!-- render api 的变化 -->
  <RenderTest v-model:counter="counter">
    <template v-slot:default>title</template>
    <template v-slot:content>content....</template>
  </RenderTest>
  <!-- 函数式组件 -->
  <Functional level='2'>这是一个动态 H 元素</Functional>
  <!-- 异步组件 -->
  <AsyncComp></AsyncComp>
  <!-- 自定义指令 -->
  <p v-highlight="'yellow'">Highlight this text bright yellow</p>
  <!-- 动画 -->
  <TranstionTest></TranstionTest>
  <!-- 编程式发生和监听事件 -->
  <button @click="sendMsg">emit Event</button>
</template>

<script>
import { ref, h} from 'vue'
import Composition  from './Composition.vue'
import ModelButton from './ModelButton.vue'
import Emits from './Emits.vue'
import VmodelText from './VmodelText.vue'
import VmodelText2 from './VmodelText2.vue'
import Functional from './Functional.vue'
import TranstionTest from './TranstionTest.vue'
import mitt from 'mitt'
export const emitter = mitt()

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
    VmodelText,
    Functional,
    TranstionTest,
    RenderTest: {
      props: {
        counter: {
          type: Number,
          default: 0
        }
      },
      render() {
        this.$slots.default()
        this.$slots.content()
        return h('div', { onClick: this.onRenderclick}, `I am RenderTest: ${this.counter}`, this.$slots.default(), this.$slots.content())
      },
      methods: {
        onRenderclick () {
          this.$emit('update:counter', this.counter + 1)
        }
      }
    }
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
      console.log()
    },
    sendMsg () {
      emitter.emit('someEvent', 'fooooo')
    }
  }
}
</script>
