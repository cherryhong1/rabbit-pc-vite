<template>
  <div class="checkbox" @click="changeChecked">
    <i v-if="checked" class="iconfont icon-checked"></i>
    <i v-else class="iconfont icon-unchecked"></i>
    <span v-if="$slots.default"> <slot></slot></span>
  </div>
</template>

<script setup name="checkbox">
import { ref, watch } from "vue";
import { useVModel } from "@vueuse/core";
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
});
const emits = defineEmits(["update:modelValue", "change"]);

let checked = useVModel(props, "modelValue", emits);
const changeChecked = () => {
  const newVal = !checked.value;
  checked.value = newVal;
  emits("change", newVal);
};

// 常规方法
// let checked = ref(false)
// const changeChecked = () => {
//   checked.value = !checked.value;
//   emits("update:modelValue", checked.value);
// };
// watch(
//   () => props.modelValue,
//   () => {
//     checked.value = props.modelValue;
//   },
//   { immediate: true }
// );
</script>

<style lang="less" scoped>
.checkbox {
  display: inline-block;
  margin-right: 2px;
  icon-checked {
    color: @xtxColor;
    ~ span {
      color: @xtxColor;
    }
  }
  i {
    position: relative;
    top: 1px;
  }
  span {
    margin-left: 2px;
  }
}
</style>
