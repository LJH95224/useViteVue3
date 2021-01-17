<!--
 * @Author: your name
 * @Date: 2021-01-16 15:39:46
 * @LastEditTime: 2021-01-16 15:42:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \viteDemo\src\components\Composition.vue
-->

<template>
  <div>
    <p> counter: {{ data.counter }} || doubleCounter: {{ data.doubleCounter }}</p>
    <p> counter2: {{ counter2 }} || doubleCounter2: {{ doubleCounter2 }}</p>
    <p ref="desc"></p>
  </div>
</template>

<script>
import { computed, onMounted, onUnmounted, reactive, ref, toRefs, watch } from 'vue'
export default {
  name: 'Composition',
  setup() {

    const data = useCounter()

    const { counter2, doubleCounter2 } = useCounter2()
    // 使用元素引用
    const desc = ref(null)

    // 侦听器
    watch(() => data.counter, (val, oldVal) => {
      const p = desc.value
      p.textContent = `counter change from ${oldVal} to ${val}`
    })
    return { data, counter2, doubleCounter2, desc }
  }
}
// 使用 useCounter 和 useCounter2 区分 toRefs 的作用
function useCounter () {
  // counter 相关的数据
  const data = reactive({
    counter: 1,
    doubleCounter: computed(() => data.counter * 2)
  })

  // 设置定时器，改变counter
  let timer

  onMounted(() => {
    timer = setInterval(() => {
      data.counter++
    }, 1000)
  })

  onUnmounted(() => {
    clearInterval(timer)
  })

  return data
}
function useCounter2 () {
  // counter 相关的数据
  const data = reactive({
    counter2: 1,
    doubleCounter2: computed(() => data.counter2 * 2)
  })

  // 设置定时器，改变counter
  let timer

  onMounted(() => {
    timer = setInterval(() => {
      data.counter2++
    }, 1000)
  })

  onUnmounted(() => {
    clearInterval(timer)
  })
  // 使用 toRefs 将data 里面的数据都变成 ref的单值
  return toRefs(data)
}
</script>