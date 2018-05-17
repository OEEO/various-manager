import Vue from 'vue'
import Router from 'vue-router'
import Article from '@/components/Article'
import Photos from '@/components/Photos'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Article',
      component: Article
    },
    {
      path: '/Article',
      name: 'Article',
      component: Article
    },
    {
      path: '/Photos',
      name: 'Photos',
      component: Photos
    }
  ]
})
