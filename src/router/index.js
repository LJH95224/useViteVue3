/*
 * @Author: your name
 * @Date: 2021-02-09 10:02:40
 * @LastEditTime: 2021-02-09 11:35:55
 * @LastEditors: Please set LastEditors
 * @Description: 路由
 * @FilePath: \useViteVue3\src\router\index.js
 */
import { h } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import Todos from '../components/todos/Todos.vue'
import Dashbord from '../components/Dashbord.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: Dashbord
    },
    {
      path: '/todos',
      component: Todos
    }
  ]
})

// 特性：动态路由
router.addRoute({
  path: '/about',
  name: 'about',
  component: () => import('../components/About.vue')
})

router.addRoute('about', {
  path: '/about/info',
  component: {
    render () {
      return h('div', 'info page')
    }
  }
})

export default router