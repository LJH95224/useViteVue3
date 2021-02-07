<!--
 * @Author: your name
 * @Date: 2021-01-30 15:44:04
 * @LastEditTime: 2021-01-30 15:46:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \viteDemo\src\components\Functional.vue
-->
<script>
// vue3中函数式组件只能用函数方式声明
import { h } from 'vue'

const Heading = (props, context) => {
  return h(`h${props.level}`, context.attrs, context.slots)
}

Heading.props = ['level']

export default Heading
</script>