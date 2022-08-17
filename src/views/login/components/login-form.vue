<template>
  <div class="account-box">
    <div class="toggle">
      <span @click="isMsgLogin = false" v-if="!isMsgLogin">
        <i class="iconfont icon-user"></i> 使用账号登录
      </span>
      <span @click="isMsgLogin = true" v-if="isMsgLogin">
        <i class="iconfont icon-msg"></i> 使用短信登录
      </span>
    </div>
    <div class="form">
      <template v-if="!isMsgLogin">
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-user"></i>
            <input type="text" placeholder="请输入用户名或者手机号">
          </div>
          <!-- <div class="error"><i class="iconfont icon-warning" />请输入手机号</div> -->
        </div>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-lock"></i>
            <input type="password" placeholder="请输入密码">
          </div>
        </div>
      </template>
      <template v-else>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-user"></i>
            <input type="text" placeholder="请输入手机号">
          </div>
        </div>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-code"></i>
            <input type="password" placeholder="请输入密码">
            <span class="code">发送验证码</span>
          </div>
        </div>
      </template>
      <div class="form-item">
        <div class="agree">
          <checkbox v-model="form.isAgree"></checkbox>
          <span>我已同意</span>
          <a href="javascript;;">《隐私条款》</a>
          <span>和</span>
          <a href="javascript;;">《服务条款》</a>
        </div>
      </div>
      <div class="btn">登录</div>
      <div class="action">
         <img src="https://qzonestyle.gtimg.cn/qzone/vas/opensns/res/img/Connect_logo_7.png" alt=""/>
         <div class="url">
          <a href="javascript;;">忘记密码</a>
          <a href="javascript;;">免费注册</a>
         </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";

const isMsgLogin = ref(false)
const form = reactive({
  isAgree:true
})
</script>

<style lang="less" scoped>
.account-box{
  .toggle{
    padding: 15px 40px;
    text-align: right;
    span{
      color: @xtxColor;
      i{
        font-size: 14px;
      }
    }
  }
  .form{
    padding: 0 40px;
    &-item{
      margin-bottom: 28px;
      .input{
        position: relative;
        height: 36px;
        >i{
          width: 34px;
          height: 34px;
          line-height: 34px;
          text-align: center;
          font-size: 14px;
          background: #cfcdcf;
          color: #fff;
          position: absolute;
          left: 1px;
          top: 1px;
        }
        input{
          padding-left: 4px;
          width: 100%;
          height: 34px;
          line-height: 34px;
          border: 1px solid #cfcdcf;
          &.error{
          border-color: @priceColor;
        }
        &.active,&:focus{
          border-color: @xtxColor;
        }
        }
        .code{
          position: absolute;
          right: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 14px;
          background: #f5f5f5;
          color: #666;
          width: 90px;
          height: 34px;
          cursor: pointer;
        }
        
      }
      >.error{
        position: absolute;
        font-size: 12px;
        line-height: 28px;
        color: @priceColor;
        i{
          font-size: 14px;
          margin-right: 2px;
        }
      }
      .agree{
        a{
          color: #069;
        }
      }

    }
    .btn{
      width: 100%;
      height: 40px;
      line-height: 40px;
      text-align: center;
      background: @xtxColor;
      color: #fff;
      &.disabled{
        background: #cfcdcf;
      }
    }
    .action{
      padding: 20px 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .url{
        a{
          color: #999;
          margin-left: 10px;
        }
      }

    }
  }
}
</style>