export default{
  account(value) {
    if(!value) return '请输入用户名'
    if(!/^[a-zA-Z]\w{6,19}$/.test(value)) return '用户名必须字母开头且6-19个字节'
    return true
  },
  password(value) {
    if(!value) return '请输入密码'
    if(!/\w{6,24}$/.test(value)) return '密码是6-24个字节'
    return true
  },
  mobile(value){
    if(!value) return '请输入手机号'
    if(!/^1[3-9]\d{9}$/.test(value)) return '手机号格式不正确'
    return true
  },
  code(value) {
    if(!value) return '请输入验证码'
    if(!/^\d{6}$/.test(value)) return '请输入6位数字验证码'
    return true
  },
  isAgree(value) {
    if(!value) return '请勾选用户同意协议'
    return true
  }
}