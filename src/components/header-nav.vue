
<template>
  <ul class="navs">
    <li class="home">
      <router-link to="/">首页</router-link>
    </li>
    <li v-for="list in lists" :key="list.id"  @mouseenter="show(list)" @mouseleave="hide(list)">
    <router-link :to="`/category/${list.id}`" @click="hide(list)">{{list.name}}</router-link>
    <div class="layer">
      <ul>
        <li v-for="child in list.children" :key="child.id">
          <router-link :to="`/category/sub/${child.id}`">
            <img :src="child.picture" alt="">
            <p>{{child.name}}</p>
         </router-link>
        </li>
      </ul>
    </div></li>
    <li>
      <router-link to="/login">请先登录</router-link>
    </li>
  </ul>
</template>

<script setup>
import { computed } from '@vue/runtime-core'
import { useStore } from 'vuex'

const store = useStore()

const lists = computed(() => {
  return store.state.category.list
})
const show = (item) => {
  store.commit('category/show', item)
}
const hide = (item) => {
  store.commit('category/hide', item)
}
</script>

<style lang="less" scoped>
.navs {
  width: 820px;
  display: flex;
  justify-content: space-around;
  padding-left: 40px;
  position: relative;
  z-index: 998;
  > li {
    margin-right: 40px;
    width: 38px;
    text-align: center;
    > a {
      font-size: 16px;
      line-height: 32px;
      height: 32px;
      display: inline-block;
    }
    &:hover {
      > a {
        color: @xtxColor;
        border-bottom: 1px solid @xtxColor;
      }
      > .layer {
        height: 132px;
        opacity: 1;
      }
    }
  }
}
.layer {
  width: 1240px;
  background-color: #fff;
  position: absolute;
  left: -200px;
  top: 56px;
  height: 0;
  overflow: hidden;
  opacity: 0;
  box-shadow: 0 0 5px #ccc;
  transition: all .2s .1s;
  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 70px;
    align-items: center;
    height: 132px;
    li {
      width: 110px;
      text-align: center;
      img {
        width: 60px;
        height: 60px;
      }
      p {
        padding-top: 10px;
      }
      &:hover {
        p {
          color: @xtxColor;
        }
      }
    }
  }
  &.open{
    height: 132px;
    opacity: 1;
  }
}
</style>
