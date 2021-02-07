/*
 * @Author: your name
 * @Date: 2021-02-06 20:48:41
 * @LastEditTime: 2021-02-06 20:50:24
 * @LastEditors: Please set LastEditors
 * @Description: 配置
 * @FilePath: \viteDemo\vite.config.js
 */

module.exports = {
  vueCompilerOptions: {
    isCustomElement: tag => tag === 'piechart' || tag === 'AsyncComp'
  }
}