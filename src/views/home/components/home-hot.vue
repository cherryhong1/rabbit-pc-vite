<template>
  <div class="home-new">
    <homePanel title="人气推荐" subTitle="人气爆款 不容错过">
      <template #right>
        <more path="/"></more>
      </template>
      <div style="position:relative;height:426px;">
        <Transition name="fade">
          <ul class="goods-list" v-if="goods.length" ref="panel">
            <li v-for="good in goods" :key="good.is">
              <router-link :to="`/product/${good.id}`">
                <img :src="good.picture" alt="" />
                <p class="name">{{ good.title }}</p>
                <p class="desc">{{ good.alt }}</p>
              </router-link>
            </li>
          </ul>
          <home-skeleton v-else bgColor="#f0f9f4"></home-skeleton>
        </Transition>
      </div>
    </homePanel>
  </div>
</template>

<script setup>
import { findHot } from "@/api/home";
import { ref } from "vue";
import homePanel from "./home-panel.vue";
import homeSkeleton from './home-skeleton.vue'
const goods = ref([]);
findHot().then((data) => {
  goods.value = data.result;
});
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
      padding-top: 12px;
      text-align: center;
    }
    .desc {
      color: #999;
      font-size: 18px;
    }
  }
}
</style>
