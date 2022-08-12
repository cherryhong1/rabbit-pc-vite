<template>
  <div class="home-banner">
    <carousel :sliders="sliders" autoPlay></carousel>
  </div>
</template>

<script setup>
import { findBrand } from '@/api/home'
import { ref } from 'vue'
const sliders = ref([])
 findBrand().then(res=> {
  sliders.value = res.result
 })
</script>

<style lang="less" scoped>
.home-banner{
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98;
}
.carousel{
  ::v-deep(.carousel-btn.prev){
    left: 270px;
  }
  ::v-deep(:carousel-btn.next){
    right: 250px;
  }
}
</style>