<template>
  <div class="goods-relevant">
    <div class="header">
      <i class="icon"></i>
      <span class="title">{{ goodsId ? "同类商品推荐" : "猜你喜欢" }}</span>
    </div>
    <carousel :sliders="sliders"></carousel>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { findRelGoods } from "@/api/product";
const props = defineProps({
  goodsId:{
    type:String,
    default:undefined
  },
});
const useRelGoodsData = (id) => {
  let sliders = ref([]);
  findRelGoods(id).then(({ result }) => {
    const size = 4;
    const total = Math.ceil(result.length / size);
    for (let i = 0; i < total; i++) {
      sliders.value.push(result.slice(i * size, (i + 1) * size));
    }

  });
  return sliders
};
const sliders = useRelGoodsData(props.goodsId)
</script>

<style lang="less" scoped>
.goods-relevant {
  background: #fff;
  min-height: 460px;
  margin-top: 20px;
  .header {
    height: 80px;
    line-height: 80px;
    padding: 0 20px;
    .title {
      font-size: 20px;
      padding-left: 20px;
    }
    .icon {
      width: 16px;
      height: 16px;
      display: inline-block;
      box-sizing: border-box;
      border-top: 4px solid @xtxColor;
      border-right: 4px solid @xtxColor;
      position: relative;
      transform: rotate(45deg);
      &::before {
        content: "";
        width: 10px;
        height: 10px;
        position: absolute;
        left: 0;
        top: 2px;
        background: lighten(@xtxColor, 40%);
      }
    }
  }
  :deep(.carousel){
    height: 300px;
    .carousel{
      &-indicator{
        bottom: 30px;
        span{
          &.active{
            background: @xtxColor;
          }
        }
      }
      &-btn{
        top: 110px;
        opacity: 1;
        background: rgba(0, 0, 0,0);
        color: #ddd;
        i{
          font-size: 30px;
        }
      }

    }
  }
}
</style>
