<template>
  <div class="confirm" :class="{ fade }">
    <div class="wrapper" :class="{ fade }">
      <div class="header">
        <h3>{{ title }}</h3>
        <a
          href="javascript:;"
          class="iconfont icon-close-new"
          @click="cancelCallback"
        >
        </a>
      </div>
      <div class="body">
        <i class="iconfont icon-warning"></i>
        <span>{{ text }}</span>
      </div>
      <div class="footer">
        <buttonBox type="gray" size="mini" @click="cancelCallback"
          >取消</buttonBox
        >
        <buttonBox type="primary" size="mini" @click="submitCallback"
          >确认</buttonBox
        >
      </div>
    </div>
  </div>
</template>

<script setup name="confirm">
import { onMounted, ref } from "vue";
import buttonBox from "../button.vue";
const props = defineProps({
  title: {
    type: String,
    default: "温馨提醒：",
  },
  text: {
    type: String,
    default: "",
  },
  cancelCallback: {
    type: Function,
  },
  submitCallback: {
    type: Function,
  },
});
console.log(props.text);
const fade = ref(false);
onMounted(() => {
  setTimeout(() => {
    fade.value = true;
  }, 0);
});
</script>

<style lang="less" scoped>
.confirm {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 8888;
  background: rgba(0, 0, 0, 0.5);
  &.fade {
    transition: all 0.4s;
  }
  .wrapper {
    width: 400px;
    background: #fff;
    border-radius: 4px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -60%);
    opacity: 0;
    &.fade {
      opacity: 1;
      transform: translate(-50%, -50%);
      transition: all 0.4s;
    }
    .header,
    .footer {
      height: 50px;
      line-height: 50px;
      padding: 0 20px;
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
      text-align: right;
      .buttonBox {
        margin-left: 20px;
      }
    }
    .header {
      position: relative;
      h3 {
        font-size: 18px;
        font-weight: normal;
      }
      a {
        position: absolute;
        right: 15px;
        top: 15px;
        font-size: 20px;
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
