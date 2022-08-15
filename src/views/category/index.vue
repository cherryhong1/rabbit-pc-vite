<template>
  <div class="top-category">
    <div class="container">
      <bread>
        <bread-item to="/">首页</bread-item>
        <transition name="fade-right" mode="out-in">
          <bread-item :key="topCategory.id">{{ topCategory.name }}</bread-item>
        </transition>
      </bread>
      <carousel :sliders="sliders" :style="{ height: '500px' }"></carousel>
      <div class="sub-list">
        <h3>全部分类</h3>
        <ul>
          <li v-for="item in topCategory.children" :key="item.id">
            <a :href="item.hrefUrl">
              <img :src="item.picture" alt="" />
              <p>{{ item.name }}</p>
            </a>
          </li>
        </ul>
      </div>
      <div class="ref-goods" v-for="item in subList" :key="item.id">
        <div class="head">
          <h3>{{ item.name }}</h3>
          <p class="tag">{{ item.desc }}</p>
          <more></more>
        </div>
        <div class="body">
          <goods-item
            v-for="subItem in item.goods"
            :key="subItem.id"
            :goods="subItem"
          ></goods-item>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { findBanner } from "@/api/home";
import { findTopCategory } from "@/api/category";
import goodsItem from "./components/goods-item.vue";

const store = useStore();
const route = useRoute();

const sliders = ref([]);
findBanner().then((result) => {
  sliders.value = result.result;
});

const topCategory = computed(() => {
  let cate = {};
  const item = store.state.category.list.find((item) => {
    return (item.id = route.params.id);
  });
  if (item) {
    cate = item;
  }
  return cate;
});

// 推荐商品
const subList = ref([]);
const getSubList = () => {
  findTopCategory(route.params.id).then((res) => {
    subList.value = res.result.children;
  });
};
watch(
  () => route.params.id,
  (newVal) => {
    if(newVal && `/category/${newVal}` === route.path){
      getSubList()
    }
  },
  { immediate: true }
);
</script>

<style lang="less" scoped>
.top-category {
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }
  .sub-list {
    margin-top: 20px;
    background: #fff;
    ul {
      display: flex;
      padding: 0 20px;
      flex-wrap: wrap;
      li {
        width: 168px;
        height: 169px;
        a {
          display: block;
          text-align: center;
          font-size: 16px;
          img {
            width: 100px;
            height: 100px;
          }
          p {
            line-height: 40px;
          }
        }
        &:hover {
          color: @xtxColor;
        }
      }
    }
  }
  .ref-goods {
    background-color: #fff;
    margin-top: 20px;
    position: relative;
    .head {
      .more {
        position: absolute;
        top: 20px;
        right: 20px;
      }
      .tag {
        text-align: center;
        color: #999;
        position: relative;
        top: -20px;
        font-size: 20px;
      }
    }
    .body {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      padding: 0 65px 30px;
    }
  }
}
</style>
