<template>
  <div>
    <bread>
      <bread-item to="/">首页</bread-item>
      <bread-item v-if="category.top" :to="`/category/${category.top.id}`">{{
        category.top.name
      }}</bread-item>
      <transition name="fade-right" mode="out-in">
        <bread-item v-if="category.sub" :key="category.sub.id">{{category.sub.name}}</bread-item>
      </transition>
    </bread>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { computed } from "vue";
const route = useRoute();
const store = useStore();
const category = computed(() => {
  const obj = {};
  store.state.category.list.forEach((item) => {
    item.children &&
      item.children.forEach((sub) => {
        if (sub.id === route.params.id) {
          obj.sub = {
            id: sub.id,
            name: sub.name,
          };
          obj.top = {
            id: item.id,
            name: item.name,
          };
        }
      });
  });
  return obj;
});
</script>

<style lang="less" scoped></style>
