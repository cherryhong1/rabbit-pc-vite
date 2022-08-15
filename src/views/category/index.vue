<template>
  <div class="top-category">
    <div class="container">
      <bread>
        <bread-item to="/">首页</bread-item>
        <bread-item>{{topCategory.name}}</bread-item>
      </bread>
      <carousel :sliders="sliders" :style="{ height: '500px' }"></carousel>
      <div class="sub-list">
        <h3>全部分类</h3>
        <ul>
          <li v-for="item in topCategory.children" :key="item.id">
            <a :href="item.hrefUrl">
              <img :src="item.picture" alt="" />
              <p>{{item.name}}</p>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { findBanner } from "@/api/home";

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
  return cate
});
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
}
</style>
