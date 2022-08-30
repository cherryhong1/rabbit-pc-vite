<template>
  <div class="numbox">
    <div class="label">{{ label }}</div>
    <div class="number">
      <a href="javascript:;" @click="changeNum(-1)">-</a>
      <input
        type="text"
        :value="modelValue"
        :min="min"
        :max="max"
        readonly
      />
      <a href="javascript:;" @click="changeNum(1)">+</a>
    </div>
  </div>
</template>

<script setup name="numBox">
import { useVModel } from "@vueuse/core";
const emits = defineEmits(["update:modelValue", "change"]);
const props = defineProps({
  modelValue: {
    type: Number,
    default: 1,
  },
  label: String,
  min: {
    type: Number,
    default: 1,
  },
  max: {
    type: Number,
    default: 100,
  },
});
const num = useVModel(props, "modelValue", emits);
const changeNum = (val) => {
  const newVal = num.value + val;
  if (newVal < props.min) return;
  if (newVal > props.max) return;
  num.value = newVal;
  emits("change", newVal);
};
</script>

<style lang="less" scoped>
.numbox {
  display: flex;
  text-align: center;
  .label {
    width: 60px;
    color: #999;
    padding-left: 10px;
    text-align: left;
  }
  .number {
    width: 120px;
    height: 30px;
    border: 1px solid #e4e4e4;
    display: flex;
    > a {
      width: 29px;
      line-height: 28px;
      text-align: center;
      background: #f8f8f8;
      font-size: 16px;
      color: #666;
      &:first-of-type {
        border-right: 1px solid #e4e4e4;
      }
      &:last-of-type {
        border-left: 1px solid #e4e4e4;
      }
    }
    input {
      width: 60px;
      text-align: center;
      color: #666;
      padding: 0 5px;
      border: none;
      
    }
    /*在谷歌下移除input[number]的上下箭头*/
    input[type="number"]::-webkit-outer-spin-button,
      :deep(input[type="number"]::-webkit-inner-spin-button) {
        -webkit-appearance: none !important;
        margin: 0;
      }
      /*在firefox下移除input[number]的上下箭头*/
      input[type="number"] {
        -moz-appearance: textfield;
      }
  }
}
</style>
