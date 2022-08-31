import Vue from 'vue'

import Validator from 'vue-validator'

Vue.use(Validator)

// 自定义验证器

// 添加一个简单的手机号验证
Vue.validator('phone', function (val) {
  return /^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(val)
})

// 添加一个密码验证
// 匹配6-20位的任何字类字符，包括下划线。与“[A-Za-z0-9_]”等效。
Vue.validator('passw', function (val) {
  return /^\w\w{7,15}$/.test(val)
})
