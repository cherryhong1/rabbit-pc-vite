<template>
  <div class="infinite-loading" ref="container">
    <div class="loading" v-if="loading">
      <span class="img"></span>
      <span class="text">正在加载中...</span>
    </div>
    <div class="finished" v-if="finished">
      <span class="img"></span>
      <span class="text">亲，已经到底啦！</span>
    </div>
  </div>
</template>

<script setup name="infinite-loading">
import { useIntersectionObserver } from "@vueuse/core";
import { ref } from "vue";
const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
  finished: {
    type: Boolean,
    default: false,
  },
});
const emits = defineEmits(['infinite'])
const container = ref(null);
useIntersectionObserver(
  container,
  ([{ isIntersecting }], observeElement) => {
    if(isIntersecting) {
      if(props.finished===false && props.loading === false){
        emits('infinite')
      }
    }
  },
  {
    threshold:0
  }
);
</script>

<style lang="less" scoped>
.infinite-loading{
  .loading{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px;
    .img{
       display: inline-block;
      width: 50px;
      height: 50px;
      background: url('http://erabbit.itheima.net/img/load.88daf935.gif') no-repeat center / contain;
    }
    .text{
      color: #999;
      font-size: 16px;
    }
  }
  .finished{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px;
    .img{
      display: inline-block;
      width: 200px;
      height: 134px;
      background: url('@/assets/images/none.png') no-repeat center / contain;
    }
    .text{
      color: #999;
      font-size: 16px;
    }
  }
}
</style>
