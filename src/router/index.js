/*
 * @Author: your name
 * @Date: 2021-02-09 10:02:40
 * @LastEditTime: 2021-04-10 19:19:24
 * @LastEditors: Please set LastEditors
 * @Description: 路由
 * @FilePath: \useViteVue3\src\router\index.js
 */
import { h } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import Todos from '../components/todos/Todos.vue'
import Dashbord from '../components/Dashbord.vue'
import NotFound from '../components/NotFound.vue'

const router = createRouter({
  history: createWebHashHistory('base-directory'),
  routes: [
    {
      path: '/',
      component: Dashbord
    },
    {
      path: '/todos',
      component: Todos
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFound
    }
  ],
  // scrollBehavior (to, from, savedPosition) {
  //   // before {x: 10, y: 10}
  //   // now {left: 10, top: 10}
  //   if (savedPosition) {
  //     return savedPosition
  //   } else {
  //     return {top: 0}
  //   }
  // }
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