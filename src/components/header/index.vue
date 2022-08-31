<template>
  <div>

  </div>
</template>

<script>
// import { mapState } from 'vuex'
export default {
  name: 'MerchantHeader',

  data () {
    return {
      activeIndex: '1',
      activeIndex2: '1'
    }
  },

  mounted () {

  },

  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    }
  },
  computed: {

  }
}
</script>

<style lang="scss" scoped>
div{
  background: white;
  width: 83%;
  float: right;
  height: 10%;
  .userava{
     float: right;
     width: 150px;
     span{
      float: left;
     }
    img{
      height: 30px;
      width: 30px;
      float: left;
    }
  }
}
</style>
