<template>
  <div class="goods-page" v-if="goods">
    <div class="container">
      <bread>
        <bread-item to="/">首页</bread-item>
        <bread-item :to="`/category/${goods.categories[0].id}`">{{
          goods.categories[0].name
        }}</bread-item>
        <bread-item :to="`/category/${goods.categories[1].id}`">{{
          goods.categories[1].name
        }}</bread-item>
        <bread-item>{{ goods.name }}</bread-item>
      </bread>
      <!--  商品信息 -->
      <div class="goods-info">
        <div class="media">
          <goods-images :images="goods.mainPictures"></goods-images>
          <goods-sales :goods="goods"></goods-sales>
        </div>
        <div class="spec">
          <goods-name :goods="goods"></goods-name>
          <goods-sku :goods="goods" @change="changeSku"></goods-sku>
          <numBox v-model="num" label="数量" :max="goods.inventory"></numBox>
          <buttonBox type="primary" style="margin-top: 20px" @click="insertCart"
            >加入购物车</buttonBox
          >
        </div>
      </div>
      <!--  商品推荐 -->
      <goodsRelevant :goodsId="goods.id"></goodsRelevant>
      <!--  商品详情 -->
      <div class="goods-footer">
        <div class="goods-article">
          <goodsTabs :goods="goods"></goodsTabs>
          <div class="goods-warn"></div>
        </div>
        <!--  专题推荐 -->
        <div class="goods-aside"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getCurrentInstance, nextTick, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { findGoods } from "@/api/product";
import goodsRelevant from "./components/goods-relevant.vue";
import goodsName from "./components/goods-name.vue";
import goodsImages from "./components/goods-images.vue";
import goodsSales from "./components/goods-sales.vue";
import goodsSku from "./components/goods-sku.vue";
import goodsTabs from "./components/goods-tabs.vue";
import { useStore } from "vuex";
const useGoods = () => {
  const goods = ref(null);
  const route = useRoute();
  watch(
    () => route.params.id,
    (newValue) => {
      if (newValue && `/product/${newValue}` === route.path) {
        findGoods(newValue).then(({ result }) => {
          goods.value = null;
          result.skus.forEach((sku) => {
            const sortSpects = [];
            result.specs.forEach((spec) => {
              sortSpects.push(
                sku.specs.find((item) => item.name === spec.name)
              );
            });
            sku.specs = sortSpects;
          });
          nextTick(() => {
            goods.value = result;
          });
        });
      }
    },
    { immediate: true }
  );
  return goods;
};
const num = ref(1);
const curSku = ref(null);
const instance = getCurrentInstance();
const store = useStore();
const goods = useGoods();
const changeSku = (sku) => {
  if (sku.skuId) {
    goods.value.price = sku.price;
    goods.value.oldPrice = sku.oldPrice;
    goods.value.inventory = sku.inventory;
    curSku.value = sku;
  } else {
    curSku.value = null;
  }
};
const insertCart = () => {
  if (curSku.value === null) {
    return instance.proxy.$message({ type: "warn", text: "请选择商品规格" });
  }
  if (num.value > goods.inventory) {
    return instance.proxy.$message({ text: "库存不足", type: "warn" });
  }
  store
    .dispatch("cart/insertCart", {
      id: goods.value.id,
      skuId: curSku.value.skuId,
      name: goods.value.name,
      picture: goods.value.mainPictures[0],
      price: curSku.value.price,
      nowPrice: curSku.value.price,
      count: num.value,
      attrsText: curSku.value.specsText,
      selected: true,
      isEffective: true,
      stock: curSku.value.inventory,
    })
    .then(() => {
      instance.proxy.$message({text:"加入购物城成功", type:"success"});
    });
};
</script>

<style lang="less" scoped>
.goods-info {
  min-height: 600px;
  background: #fff;
  display: flex;
  .media {
    min-height: 600px;
    background: #fff;
    padding: 30px 50px;
  }
  .spec {
    flex: 1;
    padding: 30px 30px 30px 0;
  }
}
.goods-footer {
  display: flex;
  margin-top: 20px;
  .goods-article {
    width: 940px;
    margin-right: 20px;
    .goods-warn {
      min-height: 600px;
      background: #fff;
      margin-top: 20px;
    }
  }
  .goods-aside {
    min-height: 1000px;
    width: 280px;
  }
}
</style>
