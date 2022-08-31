import { getNewCartGoods } from "@/api/cart"

export default {
  namespaced: true,
  state: () => {
    return {
      list: []
    }
  },
  mutations: {
    insertCart(state,goods) {
      const sameIndex = state.list.findIndex(item=>goods.skuId === item.skuId)
      if(sameIndex>0) {
        goods.count =state.list[sameIndex].count+goods.count
        state.list.split(sameIndex,1)
      }
      state.list.unshift(goods)
    },
    updateCart(state,goods){
      const updateGoods = state.list.filter(item=>item.skuId === goods.skuId)
      for(const key in goods){
        if(goods[key] !==null&&goods[key]!==undefined&&goods[key]!==''){
          updateGoods[key] = goods[key]
        }
      }
    },
    deleteCart(state,skuId){
     const index= state.list.findIndex(item=>item.skuId === skuId)
     state.list.splice(index,1)
    }
  },
  actions:{
    insertCart(ctx,goods) {
      return new Promise((resolve, reject) => {
        // 已登录
        if(ctx.rootState.user.token) {

        }else {
          ctx.commit('insertCart',goods)
          resolve()
        }
      })
    },
    findCartList(ctx) {
      return new Promise((resolve, reject) => {
        // 已登录
        if(ctx.rootState.user.token) {

        }else {
          const promiseArr = ctx.state.list.map(item=>{
            return getNewCartGoods(item.skuId)
          })
          Promise.all(promiseArr).then(dataArr=>{
            dataArr.forEach((data,i)=>{
              ctx.commit('updateCart',{skuId:ctx.state.list[i].skuId,...data.result})
            })
            resolve()
          }).catch(e=>{
            reject(e)
          })

        }
      })
    },
    deleteCart(ctx,skuId){
      return new Promise((resolve,reject)=>{
        if(ctx.rootState.user.profile.token){

        }else{
          ctx.commit('deleteCart',skuId)
          resolve()
        }
      })

    }
  },
  getters:{
    validList(state) {
      return state.list.filter(item=>item.stock>0&&item.isEffective)
    },
    // 总件数
    validTotal(state, getters) {
      return getters.validList.reduce((p,c)=>p+c.count,0)
    },
    // 总金额
    validAmount(state,getters) {
      return getters.validList.reduce((p,c)=>p+c.nowPrice*100*c.count,0)/100
    }
  }
}
