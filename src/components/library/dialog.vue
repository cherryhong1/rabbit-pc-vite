<template>
  <div class="dialog" :class="{fade}">
    <div class="wrapper" :class="{fade}">
      <div class="header">
        <h3>{{title}}</h3>
        <a href="javascript:;" class="iconfont icon-close-new"></a>
      </div>
      <div class="body">
        <slot></slot>
      </div>
      <div class="footer">
        <slot name="right"/>
        <buttonBox type="gray" style="margin-right: 20px"  @click="dialogVisible === false">取消</buttonBox>
        <buttonBox type="primary" @click="dialogVisible === false">确定</buttonBox>
      </div>
    </div>
  </div>
</template>

<script setup name="dialogBox">
import {  ref, watch } from 'vue';

const props = defineProps({
  title:{
    type: String,
    default:''
  },
  visible:{
    type:Boolean,
    default:false
  }
})
const emits = defineEmits(['update:visible'])
const fade= ref(true)
watch(()=>props.visible,() =>{
  setTimeout(()=>{
    fade.value = props.visible
  },0)

},{
  immediate:true
})
const close = () =>{
  emits('update:visible',false)
}
</script>

<style lang="less" scoped>
.dialog{
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 8887;
  background: rgba(0,0,0,.3);
  &.fade{
    transition: all 0.4s;
    background: rgba(0,0,0,.5);

  }
  .wrapper{
    opacity: 0;
    position: absolute;
    left: 50%;
    top: 50%;
    width: 600px;
    border-radius: 4px;
    background: #fff;
    transform: translate(-50%,-50%);
    &.fade{
      opacity: 1;
      transition: all 0.4s;
    }
    .body {
      padding: 20px 40px;
      font-size: 16px;
      .icon-warning {
        color: @priceColor;
        margin-right: 3px;
        font-size: 16px;
      }
    }
    .footer {
      text-align: center;
      padding: 10px 0 30px 0;
    }
    .header {
      position: relative;
      height: 70px;
      line-height: 70px;
      padding: 0 20px;
      border-bottom: 1px solid #f5f5f5;
      h3 {
        font-weight: normal;
        font-size: 18px;
      }
      a {
        position: absolute;
        right: 25px;
        top: 25px;
        font-size: 24px;
        width: 20px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        color: #999;
        &:hover {
          color: #666;
        }
      }
    }
  }
}
</style>