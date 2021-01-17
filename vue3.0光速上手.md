# VUE3.0 光速入门

文件参考来自于

https://juejin.cn/post/6866373381424414734/

### cdn

```
<script src="https://unpkg.com/vue@next"></script>
```



### vue-cli	

升级 vue-cli v4.5

```bash
npm i -g @vue/cli@next
```

新建项目会有 vue3 选项

![image-20210116140130120](C:/Users/lvjin/AppData/Roaming/Typora/typora-user-images/image-20210116140130120.png)

如果升级不成功的话，建议先卸载再安装。重启电脑

### vite

使用 vite 体验更快速	

```bash
npm init vite-app <project-name>
cd <project-name>
npm install
npm run dev
```

 

## 从 Vue2 迁移

### vue3 的新特性

- Composition API
- Teleport
- Fragments
- Emits Component Option
- `createRenderer` API 用于创建自定义渲染器

###  破坏性变化，不能直接将 vue2升级成vue3

- Global API 改为应用程序实例调用
- Global and internal APIs 重构为可做摇树优化
- `model` 选项和 `v-bind` 的 `sync`修饰符被移除，统一为 `v-model` 参数形式
- 渲染函数 API 修改
- 函数式组件仅能通过简单函数方式创建
- 废弃在 SFC 的 template 上使用 functional 或者 添加 functional 选项的方式声明函数式组件
- 异步组件要求使用 `defineAsyncComponent` 方法创建
- 组件 data 选项应该总是声明为函数
- 自定义组件白名单执行于编译时
- `is` 属性仅限于用在 `component` 标签上
- `$scopedSlots` 属性被移除，都用 `$slots` 代替
- 特性强制策略变更
- 自定义指令 API 与组件一致
- 一些 transition 类型修改
  - `v-enter`  --> `v-enter-from`
  - `v-leave` --> `v-leave-from`
- watch 选项 和 $watch 不再支持点分隔字符串路径，使用计算函数作为其参数
- Vue2.x 中应用程序根容器的 `outerHTML` 会被根组件的模板替代（或被编译为 template）。vue3.x 现在应用根容器的 `innerHTML` 取代

### 移除

- 移除 `keyCode` 作为 `v-on` 修饰符
- `$on`, `$off` and `$once` 移除
- Filters 移除
- Inline template attributes 移除



### Composition api

composition api为 vue 应用提供更好的逻辑复用和代码组

```vue
<templeate>
	<div>
       	<p> counter：{{ counter2 }} </p>
        <p>doubleCounter： {{ doubleCounter2 }}</p>
        <p ref='desc'></p>
    </div>
</templeate>
<script>
import { reactive, computed, watch, ref, toRefs, onMounted } from 'vue'
    
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  setup () {
    const count = ref(0)

    const { counter2, doubleCounter2 } = useCounter2()

    return { counter2, doubleCounter2 }
  }
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
```



### Teleport

传送门组件提供一种简介的方式可以指定它里面内容的父元素

```vue
<!--
 * @Author: your name
 * @Date: 2021-01-16 15:50:04
 * @LastEditTime: 2021-01-16 16:05:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \viteDemo\src\components\ModelButton.vue
-->

<template>
  <div>
    <button @click="modelOpen=true">弹出一个模态窗口</button>
    <teleport to='body'>
      <div v-if="modelOpen" class="modal">
        <div>
          这是一个弹窗
          我的父元素是body
          <button @click="modelOpen=false">关闭</button>
        </div>
      </div>
    </teleport>
  </div>
</template>

<script>
export default {
  data() {
    return {
      modelOpen: false
    }
  }
}
</script>

<style scoped>
.modal {
  margin: auto;
  position: absolute;
  top: 0; left: 0; bottom: 0; right: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.modal div {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  width: 300px;
  height: 300px;
  padding: 5px;
}
</style>
```

将元素添加到了body里面

![image-20210116160638845](C:/Users/lvjin/AppData/Roaming/Typora/typora-user-images/image-20210116160638845.png)



### Fragments

vue3 中组件可以拥有多个根

```vue
<template>
	<header>...</header>
	<main>....</main>
	<footer>...</footer>
</template>
```



### Emits Component Option

vue3 中组件发送的自定义事件需要定义在 emits 选项中：

- 原生事件会触发两次，比如 `click`
- 更好的指示组件工作方式
- 对象形式事件校验

```vue
<template>
	<div @click="$emit('my-click')">
        <h3>自定义事件</h3>
    </div>
</template>
<script>
export default {
    emits: ['my-click']
}
</script>
```

![image-20210116162145553](C:/Users/lvjin/AppData/Roaming/Typora/typora-user-images/image-20210116162145553.png)

![image-20210116161946875](C:/Users/lvjin/AppData/Roaming/Typora/typora-user-images/image-20210116161946875.png)

emits 不设置的话，会执行两遍 自定义处理使他激活了一次，原生事件也会使他激活一次，所以执行了两遍。所以要设置 emits

> 设置emits的时候，建议不要使用click等原生事件名称重复



### 自定义渲染器 custom renderer

vue3.0 中支持 `自定义渲染器(Renderer)`: 这个api可以用来自定义渲染逻辑。比如下面的案例我们可以把数据渲染到 canvas 上

首先创建一个组件描绘要渲染的数据，我们想要渲染一个叫做 piechart 的组件，我们不需要单独声明该组件，因为我们只是想把它携带的数据绘制到 canvas 上。创建 canvasApp.vue

```vue
<template>
  <piechart @click="handleClick" :data="state.data" :x="200" :y="200" :r="200"></piechart>
</template>
<script>
import { reactive, ref } from "vue";
export default {
  setup() {
    const state = reactive({
      data: [
        { name: "大专", count: 200, color: "brown" },
        { name: "本科", count: 300, color: "yellow" },
        { name: "硕士", count: 100, color: "pink" },
        { name: "博士", count: 50, color: "skyblue" }
      ]
    });
    function handleClick() {
      state.data.push({ name: "其他", count: 30, color: "orange" });
    }
    return {
      state,
      handleClick
    };
  }
};
</script>
```

下面我们创建自定义渲染器，main.js

```javascript
import { createApp, createRenderer } from 'vue'
import CanvasApp from './CanvasApp.vue'

const nodeOps = {
  insert: (child, parent, anchor) => {
    // 我们重写了insert逻辑，因为在我们canvasApp中不存在实际dom插入操作
    // 这里面只需要将元素之间的父子关系保存一下即可
    child.parent = parent;

    if (!parent.childs) { 
      parent.childs = [child]
    } else {
      parent.childs.push(child);
    }

    // 只有canvas有nodeType，这里就是开始绘制内容到canvas
    if (parent.nodeType == 1) {
      draw(child); 
      // 如果子元素上附加了事件，我们给canvas添加监听器
      if (child.onClick) {
        ctx.canvas.addEventListener('click', () => {
          child.onClick();
          setTimeout(() => {
            draw(child)
          }, 0);
        })
      }
    }
  },
  remove: child => {},
  createElement: (tag, isSVG, is) => {
    // 创建元素时由于没有需要创建的dom元素，只需返回当前元素数据对象
    return {tag}
  },
  createText: text => {},
  createComment: text => {},
  setText: (node, text) => {},
  setElementText: (el, text) => {},
  parentNode: node => {},
  nextSibling: node => {},
  querySelector: selector => {},
  setScopeId(el, id) {},
  cloneNode(el) {},
  insertStaticContent(content, parent, anchor, isSVG) {},
  patchProp(el, key, prevValue, nextValue) {
    el[key] = nextValue;
  },
};

// 创建一个渲染器
let renderer = createRenderer(nodeOps);

// 保存画布和其上下文
let ctx;
let canvas;

// 扩展mount，首先创建一个画布元素
function createCanvasApp(App) {
  const app = renderer.createApp(App);
  const mount = app.mount
  app.mount = function (selector) {
    canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.querySelector(selector).appendChild(canvas);
    ctx = canvas.getContext('2d');
    mount(canvas);
  }
  return app
}

createCanvasApp(CanvasApp).mount('#demo')
```

> index.html里面添加一个div#demo

编写绘制逻辑

```javascript
const draw = (el,noClear) => {
  if (!noClear) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  }
  if (el.tag == 'piechart') {
    let { data, r, x, y } = el;
    let total = data.reduce((memo, current) => memo + current.count, 0);
    let start = 0,
        end = 0;
    data.forEach(item => {
      end += item.count / total * 360;
      drawPieChart(start, end, item.color, x, y, r);
      drawPieChartText(item.name, (start + end) / 2, x, y, r);
      start = end;
    });
  }
  el.childs && el.childs.forEach(child => draw(child,true));
}

const d2a = (n) => {
  return n * Math.PI / 180;
}
const drawPieChart = (start, end, color, cx, cy, r) => {
  let x = cx + Math.cos(d2a(start)) * r;
  let y = cy + Math.sin(d2a(start)) * r;
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.lineTo(x, y);
  ctx.arc(cx, cy, r, d2a(start), d2a(end), false);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.stroke();
  ctx.closePath();
}
const drawPieChartText = (val, position, cx, cy, r) => {
  ctx.beginPath();
  let x = cx + Math.cos(d2a(position)) * r/1.25 - 20;
  let y = cy + Math.sin(d2a(position)) * r/1.25;
  ctx.fillStyle = '#000';
  ctx.font = '20px 微软雅黑';
  ctx.fillText(val,x,y);
  ctx.closePath();
}
```

### Global API 改为应用程序实例调用

vue2中有很多全局api可以改变vue的行为，比如`Vue.component`等。这导致一些问题：

- vue2没有app概念，new Vue()得到的根实例被作为app，这样的话所有创建的根实例是共享相同的全局配置，这在测试时会污染其他测试用例，导致测试变得困难。
- 全局配置也导致没有办法在单页面创建不同全局配置的多个app实例。

vue3中使用createApp返回app实例，由它暴露一系列全局api

```js
import { createApp } from 'vue'
const app = createApp({})
	.component('comp', { render: () => h('div', 'i am comp') })
  .mount('#app')
```

列举如下：

| 2.x Global API             | 3.x Instance API (`app`)   |
| -------------------------- | -------------------------- |
| vue.config                 | app.config                 |
| Vue.config.productionTip   | removed(移除)              |
| Vue.config.ignoredElements | app.config.isCustomElement |
| Vue.component              | app.component              |
| Vue.directive              | app.directive              |
| Vue.mixin                  | app.mixin                  |
| Vue.use                    | app.use                    |
| Vue.filter                 | removed(移除)              |

### Global and internal（内部） APIs重构为可做摇树优化

vue2中不少global-api是作为静态函数直接挂在构造函数上的，例如`Vue.nextTick()`，如果我们从未在代码中用过它们，就会形成所谓的`dead code`，这类global-api造成的`dead code`无法使用webpack的tree-shaking排除掉。

```javascript
import Vue from 'vue'

Vue.nextTick(() => {
  // something something DOM-related
})
```

vue3中做了相应的变化，将它们抽取成为独立函数，这样打包工具的摇树优化可以将这些dead code排除掉。

```javascript
import { nextTick } from 'vue'

nextTick(() => {
  // something something DOM-related
})
```

受影响api：

- `Vue.nextTick`
- `Vue.observable` (replaced by `Vue.reactive`)
- `Vue.version`
- `Vue.compile` (only in full builds)
- `Vue.set` (only in compat builds)
- `Vue.delete` (only in compat builds)

### `model`选项和`v-bind`的`sync` 修饰符被移除，统一为v-model参数形式

```html
<div id="app">
  <h3>{{data}}</h3>    
  <comp v-model="data"></comp>
  <!--等效于-->
  <comp :modelValue='data' @update:modelValue='data=$event'></comp>
</div>
```

```javascript
app.component('comp', {
  template: `
    <div @click="$emit('update:modelValue', 'new value')">
    	i am comp, {{modelValue}}
    </div>
	`,
  props: ['modelValue'],
})
```

> 子组件中 model 选项移除

```html
<VmodelText2 v-model:counter="counters"></VmodelText2>

<script>
import { ref } from 'vue'
import VmodelText2 from './VmodelText2.vue'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  components: {
    VmodelText2
  },
  setup () {
    const counters = ref(1)
    return { counters }
  }
}
</script>
```

```vue
<!--
 * @Author: your name
 * @Date: 2021-01-17 14:44:30
 * @LastEditTime: 2021-01-17 14:56:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \viteDemo\src\components\VmodelText2.vue
-->
<template>
  <div @click="$emit('update:counter', counter + 1)">v-model 使用其他命名 Counters: {{ counter }}</div>
</template>

<script>
export default {
  props: {
    counter: {
      type: Number,
      default: 0
    }
  }
}
</script>
```



### 渲染函数API修改

渲染函数变得更简单好用了，修改主要有以下几点：

不再传入h函数，需要我们手动导入；拍平的props结构。scopedSlots删掉了，统一到slots

```js
import {h} from 'vue'

render() {
  const emit = this.$emit
  const onclick = this.onclick
  return h('div', [
    h('div', {
      onClick() {
      	emit('update:modelValue', 'new value')
    	}}, 
      `i am comp, ${this.modelValue}`
    ),
    h('button', {
      onClick(){
      	onclick()
    	}}, 
      'buty it!'
    )
  ])
}
```











