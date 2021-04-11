# VUE3.0 光速入门

作者：杨村长
链接：https://juejin.cn/post/6866373381424414734/
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

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

### 函数式组件仅能通过简单函数方式创建，functional选项废弃

函数式组件变化较大，主要有以下几点：

- 性能提升在vue3中可忽略不计，所以vue3中推荐使用状态组件
- 函数式组件仅能通过纯函数形式声明，接收 `props` 和 `context` 两个参数
- SFC 中 `<template>` 不能添加 `functional` 特性声明函数是组件
- `functional:true` 组件选项移除

声明一个函数式组件，functional.js

```js
import { h } from 'vue'

const Heading = (props, context) => {
  return h(`h${props.level}`, context.attrs, context.slots)
}

Heading.props = ['level']

export default Heading
```

```html
<Functional level="3">这是一个h3</Functional>
```

移除functional选项，这里以element中[divider](https://github.com/ElemeFE/element/blob/dev/packages/divider/src/main.vue)为例说明

### 异步组件要求使用`defineAsyncComponent` 方法创建

由于vue3中函数式组件必须定义为纯函数，异步组件定义时有如下变化：

- 必须明确使用`defineAsyncComponent`包裹
- `component` 选项重命名为 `loader`
- Loader 函数不在接收 `resolve` and `reject` 且必须返回一个Promise

定义一个异步组件

```js
import { defineAsyncComponent } from 'vue'

// 不带配置的异步组件
const asyncPage = defineAsyncComponent(() => import('./NextPage.vue'))
```

带配置的异步组件，loader选项是以前的component

```js
import ErrorComponent from './components/ErrorComponent.vue'
import LoadingComponent from './components/LoadingComponent.vue'

// 待配置的异步组件
const asyncPageWithOptions = defineAsyncComponent({
  loader: () => import('./NextPage.vue'),
  delay: 200,
  timeout: 3000,
  errorComponent: ErrorComponent,
  loadingComponent: LoadingComponent
})
```



### 组件 data 选项应该总是声明为函数

vue3 中 data 选项统一为函数形式，返回响应式数据。

```javascript
createApp({
    data () {
        return {
            apiKey: 'a1b2c3'
        }
    }
}).mount('#app')
```



### 自定义组件白名单

 vue3中自定义元素检测发生在模板编译时，如果要添加一些vue之外的自定义元素，需要在编译器选项中设置`isCustomElement`选项。

使用构建工具时，模板都会用vue-loader预编译，设置它提供的compilerOptions即可：

```javascript
rules: [
  {
    test: /\.vue$/,
    use: 'vue-loader',
    options: {
      compilerOptions: {
        isCustomElement: tag => tag === 'plastic-button'
      }
    }
  }
  // ...
]
```

我们演示项目使用vite，在 `vite.config.js`中配置`vueCompilerOptions`即可：

```javascript
module.exports = {
  vueCompilerOptions: {
    isCustomElement: tag => tag === 'piechart'
  }
}
```

如果是采用的运行时编译版本的vue，可通过全局配置`isCustomElement`

```javascript
const app = Vue.createApp({})
app.config.isCustomElement = tag => tag === 'plastic-button'
```

### `is`属性仅限于用在`component`标签上

vue3中设置动态组件时，`is`属性仅能用于`component`标签上

```html
<component is="comp"></component>
```

dom 内模板解析使用 `v-is` 代替

```html
<table>
    <tr v-is="'blog-post-row'"></tr>
</table>
```

> 仅限in-dom模板，因此我们测试放到独立页面测试，index2.html
>
> ```javascript
> <div id="app">
>   <table>
>     <tr v-is="'row'" v-for="item in items" :data="item"></tr>
>   </table>
> </div>
> 
> <script src="https://cdn.bootcdn.net/ajax/libs/vue/3.0.0-rc.9/vue.global.js"></script>
> <script>
>   Vue.createApp({
>     data() {
>       return {
>         items: ["aaa", "bbb"],
>       };
>     },
>   })
>     .component("row", {
>       props: ["data"],
>       template: "<tr><td>{{this.data}}</td></tr>",
>     })
>     .mount("#app");
> </script>
> ```

### `$scopedSlots` 属性被移除，都用`$slots`代替

vue3中统一普通插槽和作用域插槽到`$slots`，具体变化如下：

- 插槽均以函数形式暴露
- $scopedSlots移除

函数形式访问插槽内容，MyLink.vue

```vue
<script>
import {h} from 'vue'
export default {
  props: {
    to: {
      type: String,
      required: true,
    },
  },
  render() {
    return h("a", { href: this.to }, this.$slots.default());
  },
};
</script>
```

> 迁移时，注意修改`$slots.xx`为`$slots.xx()`，这里以element中[uploader](https://github.com/ElemeFE/element/blob/dev/packages/upload/src/index.vue)为例说明

### 特性强制策略变更

底层api变化，不影响多数开发者

[v3.vuejs.org/guide/migra…](https://v3.vuejs.org/guide/migration/attribute-coercion.html#overview)



### 自定义指令API和组件保持一致

vue3中指令api和组件保持一致，具体表现在：

- bind → **beforeMount**
- inserted → **mounted**
- **beforeUpdate**: new! 元素自身更新前调用, 和组件生命周期钩子很
- update → removed! 和updated基本相同，因此被移除之，使用updated代替。
- componentUpdated → **updated**
- **beforeUnmount** new! 和组件生命周期钩子相似, 元素将要被移除之前调用。
- unbind  →  **unmounted**

写一个指令实验一下

```js
const app = Vue.createApp({})

app.directive('highlight', {
  beforeMount(el, binding, vnode) {
    el.style.background = binding.value
  }
})
```

```html
<p v-highlight="'yellow'">Highlight this text bright yellow</p>
// 注意 绑定的值是 yellow 字符串，里面是双引号里面添加单引号
```

### transition类名变更:

- `v-enter` --> `v-enter-from`
- `v-leave` --> `v-enter-from`

Vue2中过度流程图：图中两个起始类名发生变化

![image-20210206212559704](C:/Users/lvjin/AppData/Roaming/Typora/typora-user-images/image-20210206212559704.png)

试验一下，TransitionTest.vue

```vue
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
```



### 组件watch选项和实例方法$watch不再支持点分隔符字符串路径

以`.`分割的表达式不再被watch和watch支持，可以使用计算函数作为*w**a**t**c**h*支持，可以使用计算函数作为watch参数实现。

```javascript
this.$watch(() => this.foo.bar, (v1, v2) => {
  console.log(this.foo.bar)
})
```

### Vue 2.x中应用程序根容器的 `outerHTML` 会被根组件的模板替换 (或被编译为template)，Vue 3.x现在使用根容器的`innerHTML`取代

### `keyCode` 作为 `v-on` 修饰符被移除

vue2中可以使用keyCode指代某个按键，vue3不再支持。

```javascript
<!-- keyCode方式不再被支持 -->
<input v-on:keyup.13="submit" />

<!-- 只能使用alias方式 -->
<input v-on:keyup.enter="submit" />
```

### on off and $once 移除

上述3个方法被认为不应该由vue提供，因此被移除了，可以使用其他三方库实现。

```html
<script src="https://unpkg.com/mitt/dist/mitt.umd.js"></script>
```

```javascript
// 创建emitter
const emitter = mitt()

// 发送事件
emitter.emit('foo', 'foooooooo')

// 监听事件
emitter.on('foo', msg => console.log(msg))
```

### Filters移除

vue3中移除了过滤器，请调用方法或者计算属性代替。

### Inline templates attributes移除

vue2中提供`inline-template`特性可提供自定义组件内部内容作为其模板

```html
<my-component inline-template>
  <div>
    <p>These are compiled as the component's own template.</p>
    <p>Not parent's transclusion content.</p>
  </div>
</my-component>
```

vue3不再支持，可以使用script替代

```html
<script type="text/html" id="my-comp-template">
  <div>{{ hello }}</div>
</script>
```

```javasc
const MyComp = {
  template: '#my-comp-template'
  // ...
}
```



## vue-router

安装

```bash
npm install vue-router@4
```

引入vue-router4

```bash
import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: []
})

const app = createApp(App)
app.use(router)
```

### 实例创建方式

#### history 选项替代了 mode 选项

- history： createWebHistory()
- hash: createWebHashHistory()
- abstract: createMemoryHistory()

#### base 选项移至 createWebHistory等方法中

> history: createWebHashHistory('base-directory')

#### 通配符*被移除

#### isReady() 替代 onReady()

```javascript
router.push()
// before
router.onReady(onSuccess, onError)

// now
router.isReady().then(onSuccess).catch(onError)
```

#### scrollBehavior 变化

之前返回的是x,y,  现在返回的是 top和left

#### 现在 Keep-alive 和 transition必须用在 router-view 内部

```html
<!--old-->
<keep-alive>
	<router-view></router-view>
</keep-alive>

<!--new-->
<router-view v-slot={Component}>
	<keep-alive>
		<component :is='Component'></component>
	</keep-alive>
</router-view>
```

#### router-link 移除了很多属性

- append

```html
<!--old-->
<router-link to='child-route' append></router-link>

<!--new-->
<router-link :to='append($route.path, "child-route")'></router-link>
```

```js
app.config.globalProperties.append = (path, pathToAppend) => {
    return path + pathToAppend
}
```

- tag/event

```html
<!--old-->
<router-link to='/xx' tag='span' event='dblclick'></router-link>

<!--new-->
<router-link to='/xx' custom v-slot='{navigate}'>
	<span @dblclick='navigate'></span>
</router-link>
```

- exact 现在完全匹配逻辑简化了

#### mixins 中的路由守卫将被忽略

#### metch 方法被移除，使用 resolve 替代

#### 移除 router.getMatchedComponents()

```js
router.currentRoute.value.metched --> Array
```



包括首屏导航在内所有导航均为异步

```js
app.use(router)
router.isReady().then(() => app.mount('#app'))
```

> 如果首屏存在路由守卫，则可以不等待就绪直接挂载，产生的结果将和Vue2 相同



#### route 的 parent 属性被移除

```js
const parent = this.$route.matched[this.$route.matched.length - 2]
```



#### pathToRegexpOptions 选项被移除

- pathToRegexpOptions => strict
- caseSensitive => sensitive



#### 使用 history.state

```js
// 之前
history.pushState(myState, '', url)

// 现在
router.push(url)
history.replaceState({...history.state, ...myState})
```



#### routes 选项是必填项

```js
createRouter({
    routes: []
})
```



#### 跳转不存在命名路由报错

```js
router.push({name: 'dashboad'})
```



#### 缺少必填的参数会抛出异常

#### 命名子路由如果path为空的时候，不再追加 /

```js
[
    {
      path: '/dashboard',
      children: [
          {
              path: '',
              component: Dashbord
          }
      ]
    }
]
```

以前的URL: /deshboard/

副作用： 给设置了重定向 redirect 选项的子路由带来副作用

```
[
    {
      path: '/dashboard',
      children: [
          {
              path: '',
              redirect: 'home'
              component: Dashbord
          },
          {
              path: 'home',
              component: Dashbord
          }
      ]
    }
]
```

以前的URL : /dashboard/home

现在的URL： /home

>  修改建议:  redirect: '/dashboard/home' 
>
> 在重定向里面写全部的地址



#### $route 属性的编码行为

params/query/hash

- path/fullPath 不再做解码
- hash 会被解码
- push、resolve 和 replace , 字符串参数，或者对象参数 path 属性必须编码
- params 里面的 / 会被解码
- query 中 + 不处理， stringifyQuery



## Vuex4

Vuex4 是 Vue3 的兼容版本，关注与兼容性，提供和 Vuex3 相同的API，因此我们可以在Vue3 中复用之前已存在的 Vuex 代码

### 安装 Vuex4

```bash
npm install vuex@4
```

### 初始化方式

为了向 Vue3 初始化方式看齐，Vuex4 初始化方式作出了相应变化，使用新的 createStore 函数创建新的 store 实例。

```js
import { createStore } from 'vuex'
import { createApp } from 'vue'

const store = createStore({
  state () {
    return {
      count: 0
    }
  },
  mutations: {
    add (state) {
      state.count++
    }
  }
})

const app = createApp(App)
app.use(store)
```
















