<template>
  <div class="checkout-address">
    <div class="text">
      <!-- <div class="none">您需要先添加收货地址才可提交订单。</div> -->
      <ul>
        <li>
          <span>收<i />货<i />人：</span>{{ showAddress.receiver }}
        </li>
        <li><span>联系方式：</span>{{ showAddress.contact }}</li>
        <li>
          <span>收货地址：</span
          >{{
            showAddress.fullLocation.replace(/ /g, "") + showAddress.address
          }}
        </li>
      </ul>
      <a href="javascript:;">修改地址</a>
    </div>
    <div class="action">
      <buttonBox class="btn" @click="dialogVisible === true">切换地址</buttonBox>
      <buttonBox class="btn">添加地址</buttonBox>
    </div>
    <dialogBox title="切换收获地址" :visible="dialogVisible">
      <div class="text item" v-for="item in list " :key="item.id">
        <ul>
        <li>
          <span>收<i />货<i />人：</span>{{ item.receiver }}
        </li>
        <li><span>联系方式：</span>{{ item.contact }}</li>
        <li>
          <span>收货地址：</span
          >{{
            item.fullLocation.replace(/ /g, "") + item.address
          }}
        </li>
      </ul>
      </div>

      <template #foot>
        <buttonBox type="gray" style="margin-right: 20px"  @click="dialogVisible === false">取消</buttonBox>
        <buttonBox type="primary" @click="dialogVisible === false">确定</buttonBox>
      </template>
    </dialogBox>
  </div>
</template>
<script setup>
import { ref } from "vue";

const props = defineProps({
  list: {
    type: Array,
    default: () => [],
  },
});
const emits = defineEmits(['change'])
const showAddress = ref(null);
if (props.list.length) {
  const defaultAddress = props.list.find((item) => {
    item.isDefault === 1;
  });
  if (defaultAddress) {
    showAddress.value = defaultAddress;
  } else {
    showAddress.value = props.list[0];
  }
}
emits('change',showAddress.value?.id)
const dialogVisible = ref(false)
</script>
<style scoped lang="less">
.checkout-address {
  border: 1px solid #f5f5f5;
  display: flex;
  align-items: center;
  .text {
    flex: 1;
    min-height: 90px;
    display: flex;
    align-items: center;
    .none {
      line-height: 90px;
      color: #999;
      text-align: center;
      width: 100%;
    }
    > ul {
      flex: 1;
      padding: 20px;
      li {
        line-height: 30px;
        span {
          color: #999;
          margin-right: 5px;
          > i {
            width: 0.5em;
            display: inline-block;
          }
        }
      }
    }
    > a {
      color: @xtxColor;
      width: 160px;
      text-align: center;
      height: 90px;
      line-height: 90px;
      border-right: 1px solid #f5f5f5;
    }
  }
  .action {
    width: 420px;
    text-align: center;
    .btn {
      width: 140px;
      height: 46px;
      line-height: 44px;
      font-size: 14px;
      &:first-child {
        margin-right: 10px;
      }
    }
  }
}
</style>
