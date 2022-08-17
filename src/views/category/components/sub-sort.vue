<template>
  <div class="sub-sort">
    <div class="sort">
      <span
        @click="changeSort(null)"
        :class="{ active: saleParams.sortField === null }"
        >默认排序</span
      ><span
        @click="changeSort('publishTime')"
        :class="{ active: saleParams.sortField === 'publishTime' }"
        >最新商品</span
      ><span
        @click="changeSort('orderNum')"
        :class="{ active: saleParams.sortField === 'orderNum' }"
        >最高人气</span
      >
      <span
        @click="changeSort('evaluateNum')"
        :class="{ active: saleParams.sortField === 'evaluateNum' }"
        >评论最多 </span
      ><span @click="changeSort('price')"
        >价格排序
        <i
          class="arrow up"
          :class="{
            active:
              saleParams.sortField === 'price' &&
              saleParams.sortMethod === 'asc',
          }"
        ></i>
        <i
          class="arrow down"
          :class="{
            active:
              saleParams.sortField === 'price' &&
              saleParams.sortMethod === 'desc',
          }"
        ></i>
      </span>
    </div>
    <div class="check">
      <checkbox v-model="saleParams.inventory" @change="changeCheck">仅显示有货商品</checkbox>
      <checkbox v-model="saleParams.onlyDiscount" @change="changeCheck">仅显示特惠商品</checkbox>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";

const emits =defineEmits(['sort-change'])
const saleParams = reactive({
  inventory: false, // 存货
  onlyDiscount: false, // 折扣
  sortField: null, // sortField====>publishTime,orderNum,price,evaluateNum
  sortMethod: null, // asc为正序 desc为倒序
});

const changeSort = (sortFiled) => {
  if (sortFiled === "price") {
    saleParams.sortField = sortFiled;
    if (saleParams.sortMethod === null) {
      saleParams.sortMethod = "desc";
    } else {
      saleParams.sortMethod = saleParams.sortMethod === "desc" ? "asc" : "desc";
    }
  } else {
    if (sortFiled === saleParams.sortField) return;
    saleParams.sortField = sortFiled;
    saleParams.sortMethod = null;
  }
  emits('sort-change',saleParams)
};
const changeCheck = (sortField) =>{
  emits('sort-change',saleParams)
}
</script>

<style lang="less" scoped>
.sub-sort {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
  text-align: center;
  .sort {
    display: flex;
    span {
      display: inline-block;
      height: 30px;
      line-height: 28px;
      border: 1px solid #e4e4e4;
      padding: 0 20px;
      border-radius: 2px;
      position: relative;
      transition: all 1s;
      margin-right: 20px;
      &.active {
        background: @xtxColor;
        border-color: @xtxColor;
        color: #fff;
      }
      i.arrow {
        position: absolute;
        border: 5px solid transparent;
        right: 8px;
        &.up {
          top: 3px;
          border-bottom-color: #bbb;
          &.active {
            border-bottom-color: @xtxColor;
          }
        }
        &.down {
          bottom: 3px;
          border-top-color: #bbb;
          &.active {
            border-top-color: @xtxColor;
          }
        }
      }
    }
  }
  .check {
    .checkbox {
      margin-left: 20px;
      color: #999;
    }
  }
}
</style>
