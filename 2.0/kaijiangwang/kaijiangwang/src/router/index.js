import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import record from '@/components/record'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
        {
          path: '/record/:gameNo/:gameName',
          name: 'record',
          component: record
        }
  ]
})
