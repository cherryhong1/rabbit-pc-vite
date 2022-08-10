/*
 * @Descripttion: 
 * @version: 
 * @@Company: DCIT-SH
 * @Author: cherry hong
 * @Date: 2022-08-09 11:42:39
 * @LastEditors: cherry 1044369926@qq.com
 * @LastEditTime: 2022-08-09 14:15:23
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
import path from 'path'

export default defineConfig({
  plugins: [vue(), vueSetupExtend()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname,'./src')
    },
    extensions:  ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
  },
  css: {
    preprocessorOptions: {
      less: {
        charset:false,
        additionalData:'@import "./src/assets/styles/variables.less";'
      }
    }
  }
})
