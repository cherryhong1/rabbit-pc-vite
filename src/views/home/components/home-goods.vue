<template>
  <div class="good-item">
    <router-link to="/" class="image">
      <img v-lazy="props.good.picture" alt="" />
    </router-link>
    <p class="name ellipsis2">{{props.good.name}}</p>
    <p class="desc ellipsis">{{props.good.desc}}</p>
    <p class="price">&yen;{{props.good.price}}</p>
    <div class="extra">
      <router-link to="">
        <span>找相似</span>
        <span>发现更多的宝贝&gt;</span>
      </router-link>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  good: {
    type:Object,
    default:() => {}
  }
})
</script>

<style lang="less" scoped>
.good-item{
  width: 240px;
  height: 300px;
  border: 1px solid transparent;
  padding: 10px 30px;
  position: relative;
  overflow: hidden;
  transition: all 1s;
  .image{
    display: block;
    width: 160px;
    height: 160px;
    margin: 0 auto;
    img{
      width: 100%;
      height: 100%;
    }
  }
  p{
    margin-top: 6px;
    font-size: 16px;
    &.name{
      height: 44px;
    }
    &.desc{
      height: 22px;
      line-height: 22px;
      color:#666;
    }
    &.price{
      color: @priceColor;
      margin-top: 10px;
      font-size: 22px;
    }
  }
  .extra{
    position: absolute;
    left: 0;
    bottom: 0;
    background: @xtxColor;
    width: 100%;
    height: 86px;
    transform: translate3d(0,100%,0);
    transition: all .5s;
    text-align: center;
    span{
      width: 120px;
      display: block;
      height: 33px;
      line-height: 33px;
      color: #fff;
      margin: 0 auto;
      &:first-child{
        font-size: 18px;
        margin-top: 5px;
        line-height: 40px;
        border-bottom: 1px solid #fff;
      }
    }
  }
  &:hover{
    border-color: @xtxColor;
    .extra{
      transform: none;
    }
  }
}
</style>
