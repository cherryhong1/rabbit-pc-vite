import { getNewCartGoods, mergeLocalCart, findCartList, insertCart, deleteCart, updateCart, checkAllCart } from "@/api/cart";

export default {
  namespaced: true,
  state: () => {
    return {
      list: [],
    };
  },
  mutations: {
    insertCart(state, goods) {
      const sameIndex = state.list.findIndex(
        (item) => goods.skuId === item.skuId
      );
      if (sameIndex > -1) {
        goods.count = state.list[sameIndex].count + goods.count;
        state.list.splice(sameIndex, 1);
      }
      state.list.unshift(goods);
    },
    updateCart(state, goods) {
      const updateGoods = state.list.filter(
        (item) => item.skuId === goods.skuId
      );
      for (const key in goods) {
        if (
          goods[key] !== null &&
          goods[key] !== undefined &&
          goods[key] !== ""
        ) {
          updateGoods[key] = goods[key];
        }
      }
    },
    deleteCart(state, skuId) {
      const index = state.list.findIndex((item) => item.skuId === skuId);
      state.list.splice(index, 1);
    },
    setCartList(state, list) {
      state.list = list;
    },
  },
  actions: {
    insertCart(ctx, goods) {
      return new Promise((resolve, reject) => {
        // 已登录
        if (ctx.rootState.user.token) {
          insertCart(goods)
            .then(() => {
              return findCartList();
            })
            .then((data) => {
              ctx.commit("setCartList", data.result);
              resolve();
            });
        } else {
          ctx.commit("insertCart", goods);
          resolve();
        }
      });
    },
    findCartList(ctx) {
      return new Promise((resolve, reject) => {
        // 已登录
        if (ctx.rootState.user.token) {
          findCartList().then(({ result }) => {
            ctx.commit("setCartList", result);
            resolve();
          });
        } else {
          const promiseArr = ctx.state.list.map((item) => {
            return getNewCartGoods(item.skuId);
          });
          Promise.all(promiseArr)
            .then((dataArr) => {
              dataArr.forEach((data, i) => {
                ctx.commit("updateCart", {
                  skuId: ctx.state.list[i].skuId,
                  ...data.result,
                });
              });
              resolve();
            })
            .catch((e) => {
              reject(e);
            });
        }
      });
    },
    deleteCart(ctx, skuId) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          deleteCart([skuId])
            .then(() => {
              return findCartList();
            })
            .then((data) => {
              ctx.commit("setCartList", data.result);
              resolve();
            });
        } else {
          ctx.commit("deleteCart", skuId);
          resolve();
        }
      });
    },
    batchDeleteCart(ctx, isClear) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.token) {
          const ids = ctx.getters[
            isClear ? "invalidList" : "selectedList"
          ].forEach((item) => item.skuId);
          deleteCart(ids)
            .then(() => {
              return findCartList();
            })
            .then((data) => {
              ctx.commit("setCartList", data.result);
              resolve();
            });
        } else {
          ctx.getters[isClear ? "invalidList" : "selectedList"].forEach(
            (item) => {
              ctx.commit("deleteCart", item.skuId);
            }
          );
          resolve();
        }
      });
    },
    updateCart(ctx, goods) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          updateCart(goods).then(()=>{
            return findCartList()
          }).then((data)=>{
            ctx.commit('setCartList',data.result)
          })
        } else {
          ctx.commit("updateCart", goods);
          resolve();
        }
      });
    },
    checkAllCart(ctx, selected) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          const ids = ctx.getters.validList.map(item=>item.skuId)
          checkAllCart({selected,ids}).then(()=>{
            return findCartList()
          }).then(({result})=>{
            ctx.commit('setCartList',result)
            resolve()
          })
        } else {
          ctx.getters.validList.forEach((item) => {
            ctx.commit("updateCart", { skuId: item.skuId, selected });
          });
          resolve();
        }
      });
    },
    updateCartSku(ctx, { oldSkuId, newSku }) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.token) {
          const oldGoods = ctx.state.list.find(
            (item) => item.skuId === oldSkuId
          );
          deleteCart([oldSkuId]).then(() =>{
            return insertCart({skuId:newSku.skuId,count:oldGoods.count})
          }).then(()=>{
            return findCartList()
          }).then(({result}) =>{
            ctx.commit('setCartList', result)
            resolve()
          })
        } else {
          const oldGoods = ctx.state.list.find(
            (item) => item.skuId === oldSkuId
          );
          ctx.commit("deleteCart", oldSkuId);
          const {
            skuId,
            price: nowPrice,
            inventory: stock,
            specsText: attrsText,
          } = newSku;
          const newGoods = { ...oldGoods, skuId, nowPrice, stock, attrsText };
          ctx.commit("insertCart", newGoods);
        }
      });
    },
    async mergeLocalCart(ctx) {
      const cartList = ctx.getters.validList.map(
        ({ skuId, selected, count }) => {
          return { skuId, selected, count };
        }
      );
      await mergeLocalCart(cartList);
      ctx.commit("setCartList", []);
    },
  },
  getters: {
    // 有效商品列表
    validList(state) {
      return state.list.filter((item) => item.stock > 0 && item.isEffective);
    },
    // 无效商品列表
    invalidList(state) {
      return state.list.filter((item) => item.stock > 0 && item.isEffective);
    },
    // 总件数
    validTotal(state, getters) {
      return getters.validList.reduce((p, c) => p + c.count, 0);
    },
    // 总金额
    validAmount(state, getters) {
      return (
        getters.validList.reduce((p, c) => p + c.nowPrice * 100 * c.count, 0) /
        100
      );
    },
    selectedTotal(state, getters) {
      return getters.selectedList.reduce((p, c) => p + c.count, 0);
    },
    selectedList(state, getters) {
      return getters.validList.filter((item) => item.selected);
    },
    selectedAmount(state, getters) {
      return (
        getters.selectedList.reduce(
          (p, c) => p + c.count * 100 * c.nowPrice,
          0
        ) / 100
      );
    },
    isAllCheck(state, getters) {
      return (
        getters.validList.length === getters.selectedList.length &&
        getters.selectedList.length !== 0
      );
    },
  },
};
