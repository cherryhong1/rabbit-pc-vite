<template>
  <div>
    <topNav></topNav>
    <globalHeader></globalHeader>
    <main>
      <router-view></router-view>
    </main>
    <global-footer></global-footer>
  </div>
</template>

<script setup>
import topNav from '@/components/top-nav.vue'
import globalHeader from '@/components/global-header'
import globalFooter from '@/components/global-footer.vue'
import { useStore } from 'vuex'

const store = useStore()
store.dispatch('category/getList')
</script>

<style lang="less" scoped></style>
