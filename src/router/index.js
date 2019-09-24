import Vue from 'vue'
import Router from 'vue-router'
import goods from '../components/goods/goods.vue'
import ratings from '../components/ratings/ratings.vue'
import seller from '../components/seller/seller.vue'
import login from '../components/login/login.vue'
import main from '../components/main/main.vue'
import source from '../components/source/source'
import newDetalis from '../components/newdetalis/newDetalis'
import singup from '../components/signup/singup'
Vue.use(Router)

export default new Router({

  routes: [{
    path: '/login',
    component: login
  },{
    path: '/',
    component: singup
  },
    {
      path: '/detailed',
      component: newDetalis
  },
    {path: '/source',
    component: source,
      meta: {
        keepAlive:true,
        isBack: false
      }
    },
  {
    path: '/main',
    component: main,
    meta: {
      requireAuth: true

    },
    children: [{
      name: 'goods',
      path: 'goods',
      component: goods,
      meta: {
        requireAuth: true,
        refresh: false
      }
    }, {
      meta: {
        requireAuth: true,
        refresh: false
      },
      path: 'seller',
      component: seller
    }, {
      path: 'ratings',
      component: ratings
    }]
  }

  ]
})
