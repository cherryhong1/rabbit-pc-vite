<template>
  <div class="goods-sku">
    <dl v-for="item in goods.specs" :key="item.id">
      <dt>{{ item.name }}</dt>
      <dd>
        <template v-for="sub in item.values" :key="sub.name">
          <img
            v-if="sub.picture"
            @click="clickSpecs(item, sub)"
            :class="{ selected: sub.selected }"
            :src="sub.picture"
            :alt="sub.name"
          />
          <span
            v-else
            :class="{ selected: sub.selected }"
            @click="clickSpecs(item, sub)"
          >
            {{ sub.name }}</span
          >
        </template>
      </dd>
    </dl>
  </div>
</template>

<script setup>
import { getPathMap ,updateDisabledStatus, initSelectedStatus, getSelectedArr, spliter} from "../js/goods-sku"
const props = defineProps({
  goods: {
    type: Object,
    default: () => ({ specs: [], skus: [] }),
  },
  skuId:{
    type:String,
    default:''
  }
});
const emits = defineEmits(['change'])
const pathMap = getPathMap(props.goods.skus)
initSelectedStatus(props.goods,props.skuId)
updateDisabledStatus(props.goods.specs,pathMap)
const clickSpecs = (item, sub) => {
  if(item.disabled) return false
  if(sub.selected) {
    sub.selected = false
  }else{
    item.values.forEach(val=>{
      val.selected = false
    })
    sub.selected = true
  }
  updateDisabledStatus(props.goods.specs,pathMap)
  const selectedArr = getSelectedArr(props.goods.specs).filter(v=>v)
  if (selectedArr.length === props.goods.specs.length) {
    const skuId = pathMap[selectedArr.join(spliter)]
    const sku = props.goods.skus.find(sku=>sku.id === skuId[0])
    emits('change',{
      skuId:sku.id,
      price:sku.price,
      oldPrice:sku.oldPrice,
      inventory:sku.inventory,
      specsText: sku.specs.reduce((p, n) => `${p} ${n.name}：${n.valueName}`, '').replace(' ', '')
    })
  } else {
    emits('change',{})
  }
};





</script>

<style lang="less" scoped>
.sku-state-mixin {
  border: 1px solid #e4e4e4;
  margin-right: 10px;
  cursor: pointer;
  &.selected {
    border-color: @xtxColor;
  }
  &.disabled {
    opacity: 0.6;
    cursor: not-allowed;
    border-style: dashed;
  }
}
.goods-sku {
  padding-left: 10px;
  padding-top: 20px;
  dl {
    display: flex;
    padding-bottom: 20px;
    align-items: center;
    dt {
      width: 50px;
      color: #999;
    }
    dd {
      flex: 1 1 0%;
      color: #666;
      line-height: 40px;
      > img {
        width: 50px;
        height: 50px;
        .sku-state-mixin();
      }
      > span {
        display: inline-block;
        height: 30px;
        line-height: 28px;
        padding: 0 20px;
        .sku-state-mixin();
      }
    }
  }
}
</style>
