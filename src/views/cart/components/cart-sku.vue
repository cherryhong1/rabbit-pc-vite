<template>
  <div class="cart-sku" ref="target">
    <div class="attrs" @click="toggle">
      <span class="ellipsis">{{ attrsText }}</span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <div class="layer" v-if="visible">
      <div class="loading" v-if="!goods"></div>
      <goods-sku v-if="goods" :skuId="skuId" :goods="goods" @change="changeSku"></goods-sku>
      <buttonBox
        v-if="goods"
        type="primary"
        size="mini"
        style="margin-left: 60px"
        @click="submit"
        >确认</buttonBox
      >
    </div>
  </div>
</template>

<script setup>
import { onClickOutside } from "@vueuse/core";
import { ref } from "vue";
import goodsSku from "@/views/goods/components/goods-sku.vue";
import { getSpecsAndSkus } from "@/api/product";
const props = defineProps({
  attrsText: {
    type: String,
    default: "",
  },
  skuId: {
    type: String,
    default: "",
  },
});
const emit = defineEmits(['change'])
const goods = ref(null);
const visible = ref(false);
const hide = () => {
  visible.value = false;
  goods.value = null
};
const show = () => {
  visible.value = true;
  getSpecsAndSkus(props.skuId).then(res=>{
    goods.value = res.result
  })
};
const toggle = () => {
  visible.value ? hide() : show();
};
const target = ref(null);
onClickOutside(target, () => {
  hide();
});
const curSku = ref(null)
const changeSku = (sku) =>{
  curSku.value = sku
}
const submit = () =>{
  if(curSku?.value?.skuId &&curSku.value.skuId !==props.skuId){
    emit('change',curSku.value)
    hide()
  }
}

</script>

<style lang="less" scoped>
.cart-sku {
  height: 28px;
  border: 1px solid #f5f5f5;
  padding: 0 6px;
  position: relative;
  margin-top: 10px;
  display: inline-block;
  .attrs {
    line-height: 24px;
    display: flex;
    span {
      max-width: 230px;
      font-size: 14px;
      color: #999;
    }
  }
  .layer {
    position: absolute;
    top: 40px;
    left: -1px;
    z-index: 10;
    width: 400px;
    padding: 20px;
    border: 1px solid @xtxColor;
    border-radius: 4px;
    background: #fff;
    font-size: 14px;
    box-shadow: 2px 2px 4px lighten(@xtxColor, 50%);
    &::before {
      position: absolute;
      content: "";
      width: 12px;
      height: 12px;
      border-left: 1px solid @xtxColor;
      border-top: 1px solid @xtxColor;
      left: 12px;
      top: -7px;
      background: #fff;
      transform: scale(0.8) rotate(45deg);
    }
    .loading {
      height: 224px;
      background: url(@/assets/images/loading.gif) no-repeat center;
    }
  }
}
</style>
