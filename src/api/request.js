// 对axios进行二次封装
import axios from 'axios'

// import store from '@/store'

// 利用axios对象的方法create，创建一个实例
const requests = axios.create({
  baseURL: '/business',
  // 请求超时的时间
  timeout: 5000
})

export default requests
