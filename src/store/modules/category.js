/*
 * @Descripttion:
 * @version:
 * @@Company: DCIT-SH
 * @Author: cherry hong
 * @Date: 2022-08-05 09:28:24
 * @LastEditors: cherry hong
 * @LastEditTime: 2022-08-05 15:23:49
 */
import { topCategory } from '@/api/constant'
import { findAllCategory } from '@/api/category'
export default {
  namespaced: true,
  state: () => {
    return {
      list: topCategory.map(item => ({ name: item }))
    }
  },
  mutations: {
    setList (state, headCategory) {
      state.list = headCategory
    },
    show (state, item) {
      const category = state.list.find(category => {
        return category.id === item.id
      })
      category.open = true
    },
    hide (state, item) {
      const category = state.list.find(category => {
        return category.id === item.id
      })
      category.open = false
    }
  },
  actions: {
    async getList ({ commit }) {
      const { result } = await findAllCategory()
      result.forEach(item => {
        item.open = false
      })
      commit('setList', result)
    }
  }
}
