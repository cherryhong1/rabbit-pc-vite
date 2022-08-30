<template>
  <button class="buttonBox" :class="[size, type]">
    <slot></slot>
  </button>
</template>

<script setup name="buttonBox">
const props = defineProps({
  size: {
    type: String,
    default: "middle",
  },
  type:{
    type:String,
    default:'default'
  }
});
</script>

<style lang="less" scoped>
  .buttonBox{
    appearance: none;
    border: none;
    outline: none;
    text-align: center;
    background: #fff;
    border: 1px solid transparent;
    cursor: pointer;
    border-radius: 4px;
    &.lager{
      width: 240px;
      height: 50px;
      font-size: 16px;
      line-height: 50px;
    }
    &.middle{
      width: 180px;
      height: 50px;
      line-height: 50px;
      font-size: 16px;
    }
    .small{
      width: 100px;
      height: 32px;
      line-height: 32px;
      font-size: 14px;
    }
    .mini{
      width: 60px;
      height: 32px;
      line-height: 32px;
      font-size: 14px;
    }
    &.primary{
      border-color:@xtxColor ;
      background: @xtxColor;
      color: #fff;
    }
    &.default{
      border-color:#e4e4e4;
      color: #666;
    }
    &.plain {
      background: lighten(@xtxColor,50%);
      border-color: @xtxColor;
      color: @xtxColor;
    }
    &.gray{
      border-color: #ccc;
      background: #ccc;
      color: #fff;
    }
  }
</style>
