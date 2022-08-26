<template>
  <div class="numbox">
    <div class="label">数量</div>
    <div class="num">
      <a href="javascript;;">-</a>
      <input type="text" value="1" readonly />
      <a href="javascript;;">+</a>
    </div>
  </div>
</template>

<script setup name="numbox"></script>

<style lang="less" scoped>
.numbox {
  display: flex;
  text-align: center;
  .label {
    width: 60px;
    color: #999;
    padding-left: 10px;
  }
  .number {
    width: 120px;
    height: 30px;
    border: 1px solid #e4e4e4;
    display: flex;
    >a{
      width: 29px;
      line-height: 28px;
      text-align: center;
      background: #f8f8f8;
      font-size: 16px;
      color: #666;
      &:first-of-type{
        border-right: 1px solid #e4e4e4;
      }
      &:last-of-type{
        border-left: 1px solid #e4e4e4;
      }
    }
    input{
      width: 60px;
      text-align: center;
      color: #666;
      padding: 0 5px;
    }
  }
}
</style>
