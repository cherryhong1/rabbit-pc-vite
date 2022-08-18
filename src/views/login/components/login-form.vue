<template>
  <div class="account-box">
    <div class="toggle">
      <span @click="isMsgLogin = false" v-if="isMsgLogin">
        <i class="iconfont icon-user"></i> 使用账号登录
      </span>
      <span @click="isMsgLogin = true" v-if="!isMsgLogin">
        <i class="iconfont icon-msg"></i> 使用短信登录
      </span>
    </div>
    <Form
      ref="formCom"
      class="form"
      :validation-schema="myScheme"
      v-slot="{ errors }"
    >
      <template v-if="!isMsgLogin">
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-user"></i>
            <Field
              :class="{ error: errors.account }"
              v-model="form.account"
              name="account"
              type="text"
              placeholder="请输入用户名或者手机号"
            ></Field>
          </div>
          <div class="error" v-if="errors.account">
            <i class="iconfont icon-warning" />{{ errors.account }}
          </div>
        </div>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-lock"></i>
            <Field
              name="password"
              :class="{ error: errors.password }"
              v-model="form.password"
              type="password"
              autocomplete
              placeholder="请输入密码"
            ></Field>
          </div>
          <div class="error" v-if="errors.password">
            <i class="iconfont icon-warning" />{{ errors.password }}
          </div>
        </div>
      </template>
      <template v-else>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-user"></i>
            <Field
              name="mobile"
              :class="{ error: errors.mobile }"
              v-model="form.mobile"
              type="text"
              placeholder="请输入手机号"
            ></Field>
          </div>
          <div class="error" v-if="errors.mobile">
            <i class="iconfont icon-warning" />{{ errors.mobile }}
          </div>
        </div>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-code"></i>
            <Field
              name="code"
              v-model="form.code"
              :class="{ error: errors.code }"
              type="text"
              placeholder="请输入验证码"
            ></Field>
            <span class="code" @click="send">{{
              time <= 0 ? "发送验证码" : `${time}秒后发送`
            }}</span>
          </div>
          <div class="error" v-if="errors.code">
            <i class="iconfont icon-warning" />{{ errors.code }}
          </div>
        </div>
      </template>
      <div class="form-item">
        <div class="agree">
          <!-- <checkbox as="checkbox" name="isAgree" v-model="form.isAgree" @change="changeCheck"></checkbox> -->
          <Field
            as="checkbox"
            name="isAgree"
            v-model="form.isAgree"
            @change="changeCheck"
          ></Field>
          <span>我已同意</span>
          <a href="javascript;;">《隐私条款》</a>
          <span>和</span>
          <a href="javascript;;">《服务条款》</a>
        </div>
      </div>
      <div class="btn" @click="login">登录</div>
    </Form>
    <div class="action">
      <img
        src="https://qzonestyle.gtimg.cn/qzone/vas/opensns/res/img/Connect_logo_7.png"
        alt=""
      />
      <div class="url">
        <a href="javascript;;">忘记密码</a>
        <a href="javascript;;">免费注册</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onUnmounted, reactive, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { Form, Field } from "vee-validate";
import { useIntervalFn } from "@vueuse/core";
import veeSchema from "@/utils/vee-validate-schema";
import {
  userAccountLogin,
  userMobileLogin,
  userMobileLoginMsg,
} from "@/api/user";
import Message from "@/components/library/message/message";

const route = useRoute();
const router = useRouter();
const store = useStore();

const isMsgLogin = ref(false);
const formCom = ref(null);
const form = reactive({
  isAgree: true,
  account: "xiaotuxian001",
  password: "123456",
  mobile: null,
  code: null,
});
const myScheme = {
  account: veeSchema.account,
  isAgree: veeSchema.isAgree,
  password: veeSchema.password,
  mobile: veeSchema.mobile,
  code: veeSchema.code,
};

// 定时器
const time = ref(0);
const { pause, resume } = useIntervalFn(
  () => {
    time.value--;
    if (time.value <= 0) {
      pause();
    }
  },
  1000,
  false
);
onUnmounted(() => {
  pause();
});

const login = async () => {
  const valid = await formCom.value.validate();
  if (valid) {
    let data = null;
    try {
      if (!isMsgLogin.value) {
        data = await userAccountLogin(form);
      } else {
        data = await userMobileLogin(form);
      }
    } catch (e) {
      Message({
        type: "warn",
        text: e.response.data.message || "登录失败",
      });
    }

    const { id, account, nickName, avatar, token, mobile } = data.result;
    store.commit("user/setUser", {
      id,
      account,
      nickName,
      avatar,
      token,
      mobile,
    });
    Message({ type: "success", text: "登录成功" });
    router.push(route.query.redirectUrl || "/");
  }
};
const changeCheck = () => {
  console.log(form.isAgree);
};
// 短信验证码
const send = async () => {
  const valid = myScheme.mobile(form.mobile);
  if (valid) {
    if (time.value <= 0) {
      await userMobileLoginMsg(form.mobile);
      Message({ type: "success", text: "发送成功" });
      time.value = 60;
      resume();
    }
  } else {
    formCom.value.setField("mobile", valid);
  }
};

watch(isMsgLogin, () => {
  form.isAgree = true;
  form.account = null;
  form.code = null;
  form.mobile = null;
  form.password = null;
  formCom.value.resetForm();
});
</script>

<style lang="less" scoped>
.account-box {
  .toggle {
    padding: 15px 40px;
    text-align: right;
    span {
      color: @xtxColor;
      i {
        font-size: 14px;
      }
    }
  }
  .form {
    padding: 0 40px;
    &-item {
      margin-bottom: 28px;
      .input {
        position: relative;
        height: 36px;
        > i {
          width: 34px;
          height: 32px;
          line-height: 34px;
          text-align: center;
          font-size: 14px;
          background: #cfcdcf;
          color: #fff;
          position: absolute;
          left: 1px;
          top: 1px;
        }
        input {
          padding-left: 44px;
          width: 100%;
          height: 34px;
          line-height: 34px;
          border: 1px solid #cfcdcf;
          &.error {
            border-color: @priceColor;
          }
          &.active,
          &:focus {
            border-color: @xtxColor;
          }
        }
        .code {
          position: absolute;
          right: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 14px;
          background: #f5f5f5;
          color: #666;
          width: 90px;
          height: 32px;
          cursor: pointer;
        }
      }
      > .error {
        position: absolute;
        font-size: 12px;
        line-height: 28px;
        color: @priceColor;
        i {
          font-size: 14px;
          margin-right: 2px;
        }
      }
      .agree {
        a {
          color: #069;
        }
      }
    }
    .btn {
      width: 100%;
      height: 40px;
      line-height: 40px;
      text-align: center;
      background: @xtxColor;
      color: #fff;
      &.disabled {
        background: #cfcdcf;
      }
    }
  }
  .action {
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .url {
      a {
        color: #999;
        margin-left: 10px;
      }
    }
  }
}
</style>
