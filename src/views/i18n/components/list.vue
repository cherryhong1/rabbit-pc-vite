<template>
  <ul class="list">
    <li class="item" v-for="item in data" :key="item.title">
      <p class="name">{{ item.title }}</p>
      <p class="des">{{ $t(item.describe) }}</p>
    </li>
  </ul>
</template>

<script setup>
const data = defineProps({
  data: {
    type: Object,
    default: () => [],
  },
});
</script>

<style lang="less" scoped></style>
