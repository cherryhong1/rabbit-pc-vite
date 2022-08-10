<template>
  <div class="home-page">
    <div class="home-entry">
      <div class="container">
        <home-category></home-category>
        <home-banner></home-banner>
      </div>
    </div>
  </div>
</template>

<script setup>
import homeCategory from './components/home-category.vue'
import homeBanner from './components/home-banner.vue';
</script>

<style lang="less" scoped>

</style>
