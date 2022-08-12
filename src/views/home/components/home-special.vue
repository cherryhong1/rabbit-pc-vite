<template>
  <div class="home-special">
    <home-panel title="最新专题">
      <template #right>
        <more></more>
      </template>
      <ul class="special-list" ref="target">
        <li class="special-item" v-for="item in list" :key="item.id">
          <router-link to="/">
            <img :src="item.cover" alt="" />
            <div class="meta">
              <p class="title">
                <span class="top ellipsis"
                  >{{ item.title }} </span
                >
                <span class="sub ellipsis">{{item.summary}}</span>
              </p>
              <span class="price"> &yen;{{ item.lowestPrice }} </span>
            </div>
          </router-link>
          <div class="foot">
            <span class="like"
              ><i class="iconfont icon-hart1"></i>{{ item.collectNum }}</span
            >
            <span class="view"
              ><i class="iconfont icon-see"></i>{{ item.viewNum }}</span
            >
            <span class="reply"
              ><i class="iconfont icon-message"></i>{{ item.replyNum }}</span
            >
          </div>
        </li>
      </ul>
    </home-panel>
  </div>
</template>

<script setup>
import homePanel from "./home-panel.vue";
import { findSpecial } from "@/api/home";
import { useLazyData } from "@/hooks";
const { result: list, target } = useLazyData(findSpecial);
</script>

<style lang="less" scoped>
.home-special {
  background: #f5f5f5;
  .special-list {
    height: 380px;
    padding-bottom: 20px;
    display: flex;
    justify-content: space-between;
    .special-item {
      width: 404px;
      background: #fff;
      a {
        display: block;
        width: 100%;
        height: 288px;
        position: relative;
        img {
          width: 100%;
          height: 100%;
        }
        .meta {
          background-image: linear-gradient(
            to top,
            rgba(0, 0, 0, 0.8),
            transparent 50%
          );
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 288px;
          .title {
            position: absolute;
            left: 0;
            bottom: 0;
            width: 70%;
            height: 70px;
            padding-left: 16px;
            .top{
              color: #fff;
              font-size: 22px;
              display: block;
            }
            .sub{
              display: block;
              font-size: 19px;
              color: #999;
            }
          }
        }
        .price {
          position: absolute;
          bottom: 25px;
          right: 15px;
          padding: 4px 8px 4px 7px;
          background: #fff;
          font-size: 17px;
          color: @priceColor;
          border-radius: 2px;
        }
      }
      .foot {
        height: 72px;
        line-height: 72px;
        padding: 0 20px;
        font-size: 16px;
        i {
          display: inline-block;
          width: 15px;
          height: 14px;
          margin-right: 5px;
          color: #999;
        }
        .like,
        .view {
          display: inline-block;
          float: left;
          margin-right: 25px;
          vertical-align: middle;
        }
        .reply {
          float: right;
          vertical-align: middle;
        }
      }
    }
  }
}
</style>
