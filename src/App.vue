<template>
  <div id="app">
    <!-- <Home></Home> -->
    <router-view></router-view>
    <!-- 新订单的提醒应该在这或者home组件 -->
  </div>
</template>

<script>
import Home from './views/home/index.vue'
// import Login from './components/login/index.vue'
export default {
  name: 'App',
  data () {
    return {
      show: 1,
      // 用于存放订单号
      orderCode: ''

    }
  },
  components: {
    Home
  },
  mounted () {

  },
  methods: {

  },
  watch: {
    // orderCode: {
    //   handler (newValue, oldValue) {

    //   }
    // }
  }
}
</script>

<style lang="scss" scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
  height: 100%;
  background: #f5f5f5;
  a {
  text-decoration: none;
  margin: 0;
}}
</style>
