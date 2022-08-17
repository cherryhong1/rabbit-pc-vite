<template>
  <div class="sub-category">
    <div class="container">
      <sub-bread></sub-bread>
      <sub-filter @filter-change="changeFilter"></sub-filter>
      <div class="goods-list">
        <sub-sort @sort-change="changeSort"></sub-sort>
        <ul>
          <li v-for="goods in goodsList" :key="goods.id">
            <goods-item :goods="goods"></goods-item>
          </li>
        </ul>
        <infinite-loading
          :loading="loading"
          :finished="finished"
          @infinite="getData"
        ></infinite-loading>
      </div>
    </div>
  </div>
</template>

<script setup>
import subBread from "./sub-bread.vue";
import subFilter from "./sub-filter.vue";
import subSort from "./components/sub-sort.vue";
import goodsItem from "./components/goods-item.vue";

import { useRoute } from "vue-router";
import { ref, watch } from "vue";
import { findSubCategoryGoods } from "@/api/category";

const route = useRoute();
let loading = ref(false);
let finished = ref(false);
let goodsList = ref([]);

let resParams = {
  page: 1,
  pageSize: 20,
};
const getData = () => {
  loading.value = true;
  resParams.categoryId = route.params.id;
  findSubCategoryGoods(resParams).then(({ result }) => {
    if (result.items.length) {
      goodsList.value.push(...result.items);
      resParams.page++;
    } else {
      finished.value = true;
    }
    loading.value = false;
  });
};
watch(
  () => route.params.id,
  (newVal) => {
    if (newVal && route.path === `/category/sub/${newVal}`) {
      goodsList.value = [];
      let resParams = {
        page: 1,
        pageSize: 20,
      };
      finished.value = false;
    }
  }
);
const changeSort = (sortParams) => {
  resParams = { ...resParams, ...sortParams };
  console.log('changeSort',resParams)
  resParams.page = 1;
  finished.value = false;
  goodsList.value = [];
  getData()
};
const changeFilter = (filterParams) => {
  resParams = { ...resParams, ...filterParams };
  console.log('changeFilter',resParams)
  resParams.page = 1;
  finished.value = false;
  goodsList.value = [];
  getData()
};
</script>

<style lang="less" scoped>
.goods-list {
  background-color: #fff;
  margin-top: 25px;
  padding: 0 25px;
  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 5px;
    li {
      margin-right: 20px;
      margin-bottom: 20px;
      &:nth-child(5n) {
        margin: 0;
      }
    }
  }
}
</style>
