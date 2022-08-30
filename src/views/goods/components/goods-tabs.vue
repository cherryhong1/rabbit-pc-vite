<template>
  <div class="goods-tabs">
    <nav>
      <a
        href="javascript:;"
        :class="{ active: activeName === 'detail' }"
        @click="changeTabs('detail')"
        >商品详情</a
      >
      <a
        href="javascript:;"
        :class="{ active: activeName === 'comment' }"
        @click="changeTabs('comment')"
        >商品评价 <span>(500+)</span>
      </a>
    </nav>
    <component :is="activeName === 'detail' ? goodsDetail : goodsComment" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import goodsComment from "./goods-comment.vue";
import goodsDetail from "./goods-detail.vue";
let activeName = ref("detail");
const props = defineProps({
  goods: {
    type: Object,
    default: () => {},
  },
});
const changeTabs = (name) => {
  activeName.value = name;
};
</script>

<style lang="less" scoped>
.goods-tabs {
  min-height: 600px;
  background: #fff;
  nav {
    height: 70px;
    line-height: 70px;
    border-bottom: 1px solid #f5f5f5;
    display: flex;
    > a {
      padding: 0 40px;
      position: relative;
      font-size: 18px;
      span {
        color: @xtxColor;
        font-size: 16px;
        margin-left: 10px;
      }
      &:first-child {
        border-left: 1px solid #f5f5f5;
      }
      &.active {
        &::before {
          content: "";
          position: absolute;
          left: 40px;
          bottom: -1px;
          width: 72px;
          height: 2px;
          background: @xtxColor;
        }
      }
    }
  }
}
</style>
