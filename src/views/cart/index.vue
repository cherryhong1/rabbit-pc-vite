<template>
  <div class="cart-page">
    <div class="container">
      <bread>
        <bread-item to="/">首页</bread-item>
        <bread-item>购物车</bread-item>
      </bread>
      <div class="cart">
        <table>
          <thead>
            <tr>
              <th width="120">
                <checkbox
                  :modelValue="$store.getters['cart/isAllCheck']"
                  @change="($event) => checkAll($event)"
                  >全选</checkbox
                >
              </th>
              <th width="400">商品信息</th>
              <th width="220">单价</th>
              <th width="180">数量</th>
              <th width="180">小计</th>
              <th width="140">操作</th>
            </tr>
          </thead>
          <!-- 有效商品 -->
          <tbody v-if="$store.getters['cart/validList']?.length > 0">
            <tr v-for="item in $store.getters['cart/validList']" :key="item.id">
              <td>
                <checkbox
                  :modelValue="item.selected"
                  @change="($event) => checkOne(item.skuId, $event)"
                ></checkbox>
              </td>
              <td>
                <div class="goods">
                  <router-link :to="`/product/${item.id}`">
                    <img :src="item.picture" alt="" />
                  </router-link>
                  <div>
                    <p class="name ellipsis">{{ item.name }}</p>
                    <cartSku
                      :attrs-text="item.attrsText"
                      :skuId="item.skuId"
                      @change="($event) => updateCartSku(item.skuId, $event)"
                    ></cartSku>
                  </div>
                </div>
              </td>
              <td class="tc">
                <p>&yen;{{ item.nowPrice }}</p>
                <p v-if="item.price - item.nowPrice > 0">
                  比加入时降价<span class="red">{{
                    item.price - item.nowPrice
                  }}</span>
                </p>
              </td>
              <td class="tc">
                <numBox
                  v-model="item.count"
                  @change="($event) => changeCount(item.skuId, $event)"
                ></numBox>
              </td>
              <td class="tc">
                <p class="f16 red">
                  &yen;{{ (item.nowPrice * 100 * item.count) / 100 }}
                </p>
              </td>
              <td class="tc">
                <p><a href="javascript:;">移入收藏夹</a></p>
                <p>
                  <a
                    href="javascript:;"
                    class="green"
                    @click="deleteCart(item.skuId)"
                    >删除</a
                  >
                </p>
                <p><a href="javascript:;">找相似</a></p>
              </td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <td colspan="6">
                <cart-none></cart-none>
              </td>
            </tr>
          </tbody>
          <!-- 失效商品 -->
          <tbody v-if="$store.getters['cart/invalidList']?.length > 0">
            <tr>
              <td colspan="6">失效商品</td>
            </tr>
            <tr
              v-for="item in $store.getters['cart/invalidList']"
              :key="item.id"
            >
              <td>
                <checkbox style="color: #eee"></checkbox>
              </td>
              <td>
                <div class="goods">
                  <router-link :to="`/product/${item.id}`">
                    <img :src="item.picture" alt="" />
                  </router-link>
                  <div>
                    <p class="name ellipsis">{{ item.name }}</p>
                    <p class="attr">{{ item.attrsText }}</p>
                  </div>
                </div>
              </td>
              <td class="tc">
                <p>&yen;{{ item.nowPrice }}</p>
              </td>
              <td class="tc">
                {{ item.count }}
              </td>
              <td class="tc">
                <p class="f16 red">
                  &yen;{{ (item.nowPrice * 100 * item.count) / 100 }}
                </p>
              </td>
              <td class="tc">
                <p><a href="javascript:;" class="green">删除</a></p>
                <p><a href="javascript:;">找相似</a></p>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="action">
          <div class="batch">
            <checkbox :modelValue="$store.getters['cart/isAllCheck']"
              >全选</checkbox
            >
            <a href="javascript:;" class="green" @click="batchDeleteCart"
              >删除商品</a
            >
            <a href="javascript:;">移入收藏夹</a>
            <a href="javascript:;" @click="batchDeleteCart(true)"
              >清空失效商品</a
            >
          </div>
          <div class="total">
            共计{{ $store.getters["cart/validTotal"] }}件商品，已选择{{
              $store.getters["cart/selectedTotal"]
            }}件，商品合计：
            <span class="red"
              >&yen;{{ $store.getters["cart/selectedAmount"] }}</span
            >
            <buttonBox type="plain" @click="goCheckOut()">下单结算</buttonBox>
          </div>
        </div>
      </div>
      <goodsRelevant></goodsRelevant>
    </div>
  </div>
</template>

<script setup>
import goodsRelevant from "@/views/goods/components/goods-relevant.vue";
import cartNone from "./components/cart-none.vue";
import cartSku from "./components/cart-sku.vue";
import Confirm from "@/components/library/confirm/confirm";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import Message from "@/components/library/message/message";

const store = useStore();

// 选中单个
const checkOne = (skuId, selected) => {
  store.dispatch("cart/updateCart", { skuId, selected });
};
// 全选
const checkAll = (selected) => {
  store.commit("cart/checkAllCart", selected);
};
// 删除商品
const deleteCart = (skuId) => {
  Confirm({ text: "您确定将从购物车中删除该商品？" })
    .then((res) => {
      store.commit("cart/deleteCart", skuId);
      console.log("删除成功");
    })
    .catch((e) => {
      console.log("删除失败");
    });
};
// 删除，isClear为true删除失效商品
const batchDeleteCart = (isClear) => {
  Confirm({ text: `您确定删除所${isClear ? "失效" : "选中"}的商品吗？` }).then(
    (res) => {
      store.commit("cart/batchDeleteCart", isClear);
    }
  );
};
// 数量修改
const changeCount = (skuId, count) => {
  store.commit("cart/updateCart", { skuId, count });
};

const updateCartSku = (oldSkuId, newSku) => {
  console.log(oldSkuId, newSku)
  store.dispatch("cart/updateCartSku", { oldSkuId, newSku });
};
const router = useRouter()
const goCheckOut = ()=>{
  if(store.getters['cart/selectedTotal'] === 0) return Message({text:'请至少选中一件商品才能结算',type:'warn'})
  if(!store.state.user.profile.token){
    Confirm({text:'下单结算需要登录，您是否去登录？'}).then(()=>{
      router.push('/member/checkout')
    }).catch(()=>{})
  }else{
    router.push('/member/checkout')
  }
}
</script>

<style lang="less" scoped>
.tc {
  text-align: center;
  .numberBox {
    margin: 0 auto;
    width: 120px;
  }
}
.red {
  color: @priceColor;
}
.greed {
  color: @xtxColor;
}
.f16 {
  font-size: 16px;
}
.goods {
  display: flex;
  align-items: center;
  img {
    width: 100px;
    height: 100px;
  }
  > div {
    width: 280px;
    padding-left: 10px;
    font-size: 16px;
    .attr {
      font-size: 14px;
      color: #999;
    }
  }
}
.action {
  display: flex;
  justify-content: space-between;
  background: #fff;
  padding: 0 30px;
  align-items: center;
  font-size: 16px;
  margin-top: 20px;
  height: 80px;
  .checkbox {
    color: #999;
  }
  .batch {
    a {
      margin-left: 20px;
    }
  }
  .red {
    font-size: 18px;
    margin-right: 20px;
    font-weight: bold;
  }
}
.tit {
  color: #666;
  font-size: 16px;
  font-weight: normal;
  line-height: 50px;
}
.cart-page {
  .cart {
    background: #fff;
    color: #666;
    table {
      border-spacing: 0;
      border-collapse: collapse;
      line-height: 24px;
      th,
      td {
        padding: 10px;
        border-bottom: 1px solid #f5f5f5;
        &:first-child {
          text-align: left;
          padding-left: 30px;
          color: #999;
        }
      }
      th {
        font-size: 16px;
        font-weight: normal;
        line-height: 50px;
      }
    }
  }
}
</style>
