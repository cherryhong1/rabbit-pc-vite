<template>
  <transition name="down">
    <div class="massage" :style="style[type]" v-show="visible">
      <i class="iconfont" :class="[style[type].icon]"></i>
      <span class="text">{{ text }}</span>
    </div>
  </transition>
</template>

<script setup>
import { onMounted, ref } from 'vue';

const props = defineProps({
  type: {
    type: String,
    default: "warn",
  },
  text: {
    type: String,
    default: "",
  },
});
console.log(props.type)
const visible = ref(false)
onMounted(()=>{
  visible.value = true
})
const style = {
  warn: {
    icon: "icon-warning",
    color: "#E6A23C",
    backgroundColor: "rgb(253, 246, 236)",
    borderColor: "rgb(250, 236, 216)",
  },
  error: {
    icon: "icon-shanchu",
    color: "#F56C6C",
    backgroundColor: "rgb(254, 240, 240)",
    borderColor: "rgb(253, 226, 226)",
  },
  success: {
    icon: "icon-queren2",
    color: "#67C23A",
    backgroundColor: "rgb(240, 249, 235)",
    borderColor: "rgb(225, 243, 216)",
  },
};
</script>

<style lang="less" scoped>
.message {
  width: 300px;
  height: 50px;
  position: fixed;
  left: 50%;
  top: 50%;
  margin-left: -150px;
  margin-top: -25px;
  padding: 0 25px;
  background: #f5f5f5;
  color: #999;
  line-height: 50px;
  border-radius: 4px;
  i {
    margin-right: 4px;
    vertical-align: middle;
  }
  .text {
    vertical-align: middle;
  }
}
.down{
  &-enter{
    &-from{
      transform: translate3d(0,-75px,0);
      opacity: 0;
    }
    &-active{
      transition: all .5s;
    }
    &-to{
      transform: none;
      opacity: 1;
    }
  }
}
</style>
