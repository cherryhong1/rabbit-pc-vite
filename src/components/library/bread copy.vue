<template>
  <div class="bread">
   <slot></slot>
  </div>
</template>

<script setup>
const props = defineProps({
  parentName: {
    type:String,
    default:''
  },
  parentPath: {
    type:String,
    default: ''
  }
})
</script>

<style lang="less">
.bread {
  display: flex;
  padding: 25px 10px;
  &-item{
    a{
      color: #666;
      transition: all 1s;
      &:hover{
        color: @xtxColor;
      }
    }
  }
  i{
    font-size: 12px;
    margin-left: 5px;
    margin-right: 5px;
    line-height: 22px;
  }
}
</style>
