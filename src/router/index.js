import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Article from '@/components/Article'
import Photos from '@/components/Photos'
import Home from '@/components/Home'
import ArticleDetail from '@/components/ArticleDetail'
import Post from '@/components/Post'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/Home/:username',
      component: Home,
      children: [
        {
          path: '/Article',
          name: 'Article',
          component: Article
        },
        {
          path: '/Photos',
          name: 'Photos',
          component: Photos
        },
        {
          path: '/Post',
          name: 'Post',
          component: Post
        }
      ]
    },
    {
      path: '/ArticleDetail',
      name: 'ArticleDetail',
      component: ArticleDetail
    }
  ]
})
