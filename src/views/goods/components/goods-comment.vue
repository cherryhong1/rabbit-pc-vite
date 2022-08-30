<template>
  <div class="goods-comment">
    <div class="head">
      <div class="data">
        <p><span>100</span><span>人购买</span></p>
        <p><span>99.99%</span><span>好评率</span></p>
      </div>

      <dl class="tags">
        <dt>大家都在说</dt>
        <dd>
          <a href="javascript:;" target="_blank" rel="noopener noreferrer"
            >好吃</a
          ><a href="javascript:;" target="_blank" rel="noopener noreferrer"
            >好吃</a
          ><a href="javascript:;" target="_blank" rel="noopener noreferrer"
            >好吃</a
          ><a href="javascript:;" target="_blank" rel="noopener noreferrer"
            >好吃</a
          ><a href="javascript:;" target="_blank" rel="noopener noreferrer"
            >好吃</a
          ><a href="javascript:;" target="_blank" rel="noopener noreferrer"
            >好吃</a
          >
        </dd>
      </dl>
    </div>
    <div class="sort">
      <span>排序：</span>
      <a href="javascript:;">默认</a>
      <a href="javascript:;">最新</a>
      <a href="javascript:;">最热</a>
    </div>
  </div>
  <div class="list"></div>
</template>

<script setup></script>

<style lang="less" scoped>
.goods-comment {
  .head {
    display: flex;
    padding: 30px 0;
    .data {
      display: flex;
      width: 340px;
      padding: 20px;
      p {
        flex: 1;
        text-align: center;
        span {
          display: block;
          &:first-child {
            color: @priceColor;
            font-size: 32px;
          }
          &:last-child {
            color: #999;
          }
        }
      }
    }
    .tags {
      flex: 1;
      display: flex;
      flex-wrap: wrap;
      dt {
        font-weight: bold;
        width: 100px;
        text-align: right;
        line-height: 42px;
      }
      dd {
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        a {
          display: inline-block;
          width: 132px;
          height: 42px;
          margin-left: 20px;
          margin-bottom: 20px;
          border: 1px solid #e4e4e4;
          border-radius: 4px;
          background: #f5f5f5;
          text-align: center;
          line-height: 40px;
          color: #999;
          &:hover {
            border-color: @xtxColor;
            background: lighten(@xtxColor, 50%);
            color: @xtxColor;
          }
          &.active {
            border: @xtxColor;
            background: @xtxColor;
            color: #fff;
          }
        }
      }
    }
  }
  .sort {
    height: 60px;
    line-height: 60px;
    border-top: 1px solid #f5f5f5;
    border-bottom: 1px solid #f5f5f5;
    margin: 0 20px;
    color: #666;
    span {
      margin-left: 20px;
    }
    > a {
      margin-left: 30px;
      &.active,
      &:hover {
        color: @xtxColor;
      }
    }
  }
}
</style>
