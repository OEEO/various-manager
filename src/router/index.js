import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Article from '@/components/Article'
import Photos from '@/components/Photos'
import Home from '@/components/Home'
import Index from '@/components/Index'
import ArticleDetail from '@/components/ArticleDetail'
import Post from '@/components/Post'
import Question from '@/components/Question'
import UserSetting from '@/components/user/Setting'

Vue.use(Router)

export default new Router({
  // mode: history,
  routes: [
    {
      path: '/',
      redirect: '/Index'
    },
    {
      path: '/user/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      component: Home,
      children: [
        {
          path: 'Index',
          name: 'Index',
          component: Index
        },
        {
          path: 'Article',
          name: 'Article',
          component: Article
        },
        {
          path: 'Photos',
          name: 'Photos',
          component: Photos
        },
        {
          path: 'Post',
          name: 'Post',
          component: Post
        },
        {
          path: 'Question',
          name: 'Question',
          component: Question
        },
        {
          path: 'user/setting',
          component: UserSetting
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
