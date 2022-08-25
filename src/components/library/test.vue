<template>
  <div>
   modelValue: {{modelValue}}
  </div>
</template>

<script setup name="test">
import { useField } from 'vee-validate';
import { toRef } from 'vue';
const props = defineProps({
  modelValue:{
    type:Boolean,
    default:false
  }
})
// const {value} = useField(toRef(props,'modelValue'))
</script>

<style lang="less" scoped>

</style>