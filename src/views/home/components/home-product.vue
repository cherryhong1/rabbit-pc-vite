<template>
  <div class="home-product" ref="target">
    <home-panel :title="item.name" v-for="item in list" :key="item.id">
      <template #right>
        <div class="sub">
          <router-link v-for="i in item.children" :key="i.id" to="/">{{i.name}}</router-link>
        </div>
        <more></more>
      </template>
      <div class="box" >
        <router-link to="/" class="cover">
          <img :src="item.picture" alt="" />
          <strong class="label">
            <span>{{item.name}}馆</span>
            <span>{{item.saleInfo}}</span>
          </strong>
        </router-link>
        <ul class="goods-list">
          <li v-for="good in item.goods" :key="good.id">
            <home-goods :good="good"></home-goods>
          </li>
        </ul>
      </div>
    </home-panel>
  </div>
</template>

<script setup>
import homePanel from "./home-panel.vue";
import homeGoods from "./home-goods.vue";
import { useLazyData } from "@/hooks";
import { findGoods } from "@/api/home";
const {result:list,target} = useLazyData(findGoods)
console.log(list.value)
</script>

<style lang="less" scoped>
.home-product {
  background: #fff;
  height: 2900px;
  .sub {
    margin-bottom: 2px;
    a {
      padding: 2px 12px;
      border-radius: 4px;
      font-size: 16px;
      &:hover {
        background-color: @xtxColor;
        color: #fff;
      }
      &:last-child {
        margin-right: 80px;
      }
    }
  }
  .box{
    display: flex;
    .cover{
      width: 240px;
      height: 610px;
      margin-right: 10px;
      position: relative;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .label{
      width: 188px;
      height: 66px;
      display: flex;
      font-size: 18px;
      line-height: 66px;
      color: #fff;
      position: absolute;
      left: 0;
      top: 50%;
      transform: translate3d(0,-50%,0);
      font-weight: normal;
      span{
        text-align: center;
        &:first-child{
          background: rgba(0,0,0,.9);
          width: 76px;
        }
        &:last-child{
          background: rgba(0,0,0,.7);
          flex: 1;
        }
      }
    }
    .goods-list{
      width: 990px;
      flex-wrap: wrap;
      display: flex;
      li{
        width: 240px;
        height: 300px;
        margin-right: 10px;
        margin-bottom: 10px;
        &:nth-child(4n){
          margin-right: 0;
        }
        &:nth-last-child(-n+4){
          margin-bottom: 0;
        }
      }
    }
  }
}
</style>
