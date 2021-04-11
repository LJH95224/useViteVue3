/*
 * @Author: your name
 * @Date: 2021-04-11 11:44:57
 * @LastEditTime: 2021-04-11 11:51:21
 * @LastEditors: Please set LastEditors
 * @Description: Store
 * @FilePath: \useViteVue3\src\store\index.js
 */
import { createStore } from 'vuex'

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

export default store