<template>
  <home-panel title="热名品牌" subTitle="国际经典 品质保障">
    <template #right>
      <a @click="toggle(-1)" :class="{disabled:index===0}" class="iconfont  icon-angle-left prev"></a>
      <a @click="toggle(1)" :class="{disabled:index===1}" class="iconfont icon-angle-right next"></a>
    </template>
    <div class="box" ref="target">
      <Transition name="fade">
        <ul v-if="goods.length" class="goods-list">
          <li v-for="item in goods" :key="item.id" :style="{transform:`translateX(${-index*1240}px)`}">
            <router-link to="/">
              <img :src="item.picture" alt="">
            </router-link>
          </li>
        </ul>
        <div v-else class="skeleton-box">
          <skeleton class="item" v-for="i in 5" :key="i" animated bg="#e4e4e4" width="240px" height="305px"></skeleton>
        </div>
      </Transition>
    </div>
  </home-panel>
</template>

<script setup>
import homePanel from "./home-panel.vue";
import { useLazyData } from "@/hooks";
import { findBrand } from "@/api/home";
import { ref } from "vue";
const {result:goods,target} = useLazyData(()=>findBrand(10))
const index = ref(0)
const toggle = (step)=>{
  const newIndex = index.value+step
  if(newIndex<0||newIndex>1) return
  index.value = newIndex
}
</script>

<style lang="less" scoped>
.home-panel{
  background: #f5f5f5;
}
.iconfont {
  width: 20px;
  height: 20px;
  background-color: @xtxColor;
  color:#ccc;
  text-align: center;
  display: inline-block;
  margin-left: 5px;
  &::before{
    font-size: 12px;
    position: relative;
    top: -2px;
  }
  &.disabled{
    background-color: #ccc;
    cursor: not-allowed;
  }
}
.box{
  display: flex;
  width: 100%;
  height: 345px;
  overflow: hidden;
  padding-bottom: 40px;
  .goods-list{
    width: 200%;
   display: flex;
   transition: all 1s ;
    li{
      margin-right: 10px;
      width: 240px;
      &:nth-child(5n){
        margin-right: 0;
      }
      img{
        width: 240px;
        height: 305px;
      }
    }
  }
}
.skeleton-box{
  width: 100%;
  display: flex;
  .item{
    margin-right: 10px;
    &:nth-child(5n) {
      margin-right: 0;
    }
  }
}
</style>
