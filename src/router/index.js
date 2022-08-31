import Vue from 'vue'
import Router from 'vue-router'
import Count from '@/views/shopManage/count/index.vue'
import Comment from '@/views/comment/index.vue'
import ShopSet from '@/views/shopManage/shopset/index.vue'
import AddGood from '@/views/goodManage/addGood/index.vue'
import GoodList from '@/views/goodManage/goodList/index.vue'
import Type from '@/views/type/index.vue'
import Set from '@/views/set/index.vue'
import Login from '@/components/login/index.vue'
import Home from '@/views/home/index.vue'
import Register from '@/components/register/index.vue'
import Order from '@/views/orderManage/index.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: Home,
      name: Home,
      beforeEnter: (to, from, next) => {
        if (from.path === '/login' || localStorage.getItem('token').length > 0) {
          next()
        } else {
          next(false)
        }
      },
      // meta: {
      //   isshow: true
      // },
      children: [
        {
          path: '/home',
          redirect: '/home/count'
        },
        {
          path: 'count',
          component: Count
          // name: Count
          // meta: {
          //   isshow: true
          // }
        },
        {
          path: 'comment',
          component: Comment
          // name: Comment,
          // meta: {
          //   isshow: true
          // }
        },
        {
          path: 'shopset',
          component: ShopSet
          // name: ShopSet,
          // meta: {
          //   isshow: true
          // }
        },
        {
          path: 'addgood',
          component: AddGood
          // name: AddGood,
          // meta: {
          //   isshow: true
          // }
        },
        {
          path: 'goodlist',
          component: GoodList
          // name: GoodList,
          // meta: {
          //   isshow: true
          // }
        },
        {
          path: 'type',
          component: Type
          // name: Type,
          // meta: {
          //   isshow: true
          // }
        },
        // 订单管理
        {
          path: 'order',
          component: Order
        },
        // 店铺装修
        {
          path: 'decoration',
          component: Set
          // name: Set,
          // meta: {
          //   isshow: true
          // }
        }
      ]
    },
    {
      component: Login,
      name: Login,
      path: '/login'
    },
    {
      path: '/register',
      component: Register
    }
  ]
}

)
