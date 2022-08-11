<template>
  <div class="home-new">
    <homePanel title="新鲜好物" subTitle="新鲜好物 品质靠谱">
      <template #right>
        <more path="/"></more>
      </template>
      <div style="position:relative;height:426px" ref="target">
        <Transition name="fade">
          <ul class="goods-list" v-if="goods.length" ref="panel">
            <li v-for="good in goods" :key="good.is">
              <router-link :to="`/product/${good.id}`">
                <img :src="good.picture" alt="" />
                <p class="name ellipsis">{{ good.name }}</p>
                <p class="price">&yen;{{ good.price }}</p>
              </router-link>
            </li>
          </ul>
          <home-skeleton bgColor="#fof9f4" v-else></home-skeleton>
        </Transition>
      </div>
    </homePanel>
  </div>
</template>

<script setup>
import { findNew } from "@/api/home";
import { ref } from "vue";
import homePanel from "./home-panel.vue";
import homeSkeleton from "./home-skeleton.vue";
import { useLazyData } from "@/hooks"
const {result:goods,target}=useLazyData(findNew)
</script>

<style lang="less" scoped>
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 406px;
  li {
    width: 306px;
    height: 406px;
    background: #f0f9f4;
    .hoverShadow {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding: 12px 30px 0 30px;
      text-align: center;
    }
    .price {
      color: @priceColor;
    }
  }
}
</style>
