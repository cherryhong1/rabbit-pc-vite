<template>
  <div>
    <buttonBox @click="mockTest">测试Mock</buttonBox>
  </div>
</template>

<script setup>
import { findCollect } from "@/api/test";
import { ref } from "vue";
const collectGoods = ref([]);
const mockTest = () => {
  findCollect({
    page: 1,
    pageSize: 4,
  }).then((data) => {
    console.log('data',data)
    collectGoods.value = data.result.items;
  });
};
</script>

<style lang="scss" scoped></style>
