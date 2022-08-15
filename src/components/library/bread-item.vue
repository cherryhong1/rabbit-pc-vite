<template>
  <div class="bread-item">
    <router-link :to="props.to" v-if="to">
      <slot></slot>
    </router-link>
    <span v-else><slot></slot></span>
  </div>
</template>

<script setup name="bread-item">
const props = defineProps({
  to:{
    type:String,
    default:'/'
  }
})
</script>

<style lang="less" scoped>

</style>