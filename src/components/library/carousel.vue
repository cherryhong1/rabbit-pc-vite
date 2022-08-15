<template>
  <div class="carousel" @mouseleave="start()" @mouseenter="stop()">
    <ul class="carousel-body">
      <li
        class="carousel-item"
        v-for="(slider, i) in props.sliders"
        :key="i"
        :class="{ fade: index === i }"
      >
        <router-link to="/" v-if="slider.picture||slider.imgUrl">
          <img :src="slider.picture?slider.picture:slider.imgUrl" alt="" />
        </router-link>
      </li>
    </ul>
    <a href="javascript;" class="carousel-btn prev" @click="toggle(-1)">
      <i class="iconfont icon-angle-left"></i>
    </a>
    <a href="javascript;" class="carousel-btn next" @click="toggle(1)">
      <i class="iconfont icon-angle-right"></i>
    </a>
    <div class="carousel-indicator">
      <span
        v-for="(slider, i) in props.sliders"
        :key="i"
        :class="{ active: i === index }"
        @click="index = i"
      ></span>
    </div>
  </div>
</template>

<script setup name="carousel">
import { onUnmounted, watch, ref } from "@vue/runtime-core";

// 测试
const props = defineProps({
  sliders: {
    type: Array,
    default: () => [],
  },
  duration: {
    type: Number,
    default: 3000,
  },
  autoPlay: {
    type: Boolean,
    default: false,
  },
});
const index = ref(0);
let timer = null;
const autoPlayFn = () => {
  clearInterval(timer);
  timer = setInterval(() => {
    index.value++;
    if (index.value >= props.sliders.length) {
      index.value = 0;
    }
  }, props.duration);
};
watch(
  () => props.sliders,
  (newV) => {
    if (newV && props.autoPlay) {
      index.value = 0;
      autoPlayFn();
    }
  },
  { immediate: true }
);

const stop = () => {
  if (timer) {
    clearInterval(timer);
  }
};
const start = () => {
  if (props.sliders.length && props.autoPlay) {
    autoPlayFn();
  }
};

const toggle = (step) => {
  // 将要改变的索引
  const newIndex = index.value + step;
  // 超出的情况，太大了
  if (newIndex > props.sliders.length - 1) {
    index.value = 0;
    return;
  }
  // 超出的情况，太小了
  if (newIndex < 0) {
    index.value = props.sliders.length - 1;
    return;
  }
  // 正常
  index.value = newIndex;
};
onUnmounted(() => {
  clearInterval(timer);
});
</script>

<style lang="less" scoped>
.carousel {
  width: 100%;
  height: 100%;
  min-width: 300px;
  min-height: 150px;
  position: relative;
  &-body {
    width: 100%;
    height: 100%;
  }
  &-item {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
    transition: opacity 0.5s linear;
    &.fade {
      opacity: 1;
      z-index: 1;
    }
    img {
      width: 100%;
      height: 100%;
    }
  }
  &-indicator {
    position: absolute;
    left: 0;
    bottom: 20px;
    z-index: 2;
    width: 100%;
    text-align: center;
    span {
      display: inline-block;
      width: 12px;
      height: 12px;
      background: rgba(0, 0, 0, 0.2);
      border-radius: 50%;
      cursor: pointer;
      ~ span {
        margin-left: 12px;
      }
      &.active {
        background: #fff;
      }
    }
  }
  &-btn {
    width: 44px;
    height: 44px;
    background: rgba(0, 0, 0, 0.4);
    color: #fff;
    border-radius: 50%;
    position: absolute;
    top: 228px;
    z-index: 2;
    text-align: center;
    line-height: 44px;
    transition: all 0.5s;
    opacity: 0;
    &.prev {
      left: 20px;
    }
    &.next {
      right: 20px;
    }
  }
  &:hover {
    .carousel-btn {
      opacity: 1;
    }
  }
}
</style>
