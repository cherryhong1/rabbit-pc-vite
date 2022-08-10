<template>
  <div class="home-skeleton">
    <div
      class="item"
      v-for="i in 4"
      :key="i"
      :style="{ backgroundColor: props.bgColor }"
    >
      <skeleton bg="#e4e4e4" width="306px" height="306px" animated></skeleton>
      <skeleton bg="#e4e4e4" width="160px" height="306px" animated></skeleton>
      <skeleton bg="#e4e4e4" width="120px" height="306px" animated></skeleton>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  bgColor: {
    type:String,
    default:'#fff'
  }
})
</script>

<style lang="less" scoped>
.home-skeleton{
  width: 1240px;
  height: 406px;
  display: flex;
  justify-content: space-between;
  .item{
    width: 306px;
    .skeleton ~.skeleton{
      display: block;
      margin: 16px auto 0;
    }
  }
}
</style>
