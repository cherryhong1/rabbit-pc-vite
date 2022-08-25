<template>
  <p class="goods-name">{{ goods.name }}</p>
  <p class="goods-desc">{{ goods.desc }}</p>
  <p class="goods-price">
    <span>{{ goods.price }}</span
    ><span>{{ goods.oldPrice }}</span>
  </p>
  <div class="goods-service">
    <dl>
      <dt>促销</dt>
      <dd>12月好物放送，App领券购买直降120元</dd>
    </dl>
    <dl>
      <dt>配送</dt>
      <dd>至</dd>
    </dl>
    <dl>
      <dt>服务</dt>
      <dd>
        <span>无忧退货</span>
        <span>快速退款</span>
        <span>免费包邮</span>
        <a href="javascript:;">了解详情</a>
      </dd>
    </dl>
  </div>
</template>

<script setup>
const props = defineProps({
  goods: {
    type: Object,
    default: () => {},
  },
});
</script>

<style lang="less" scoped>
.goods-name {
  font-size: 22px;
}
.goods-desc {
  color: #999;
  margin-top: 10px;
}
.goods-price {
  margin-top: 10px;
  span {
    &::before {
      content: "￥";
      font-size: 14px;
    }
    &:first-child {
      color: @priceColor;
      margin-right: 10px;
      font-size: 22px;
    }
    &:last-child {
      color: #999;
      font-size: 16px;
      text-decoration: line-through;
    }
  }
}
.goods-service {
  background: #f5f5f5;
  width: 500px;
  margin-top: 10px;
  padding: 20px 10px 0 10px;
  dl {
    padding-bottom: 20px;
    display: flex;
    align-items: center;
    dt {
      width: 50px;
      color: #999;
    }
    dd {
      color: #666;
      &:first-child {
        span {
          margin-right: 10px;
          &::before {
            content: "*";
            color: @xtxColor;
            margin-right: 2px;
          }
        }
      }
      a {
        color: @xtxColor;
      }
    }
  }
}
</style>
