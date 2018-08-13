import Vue from 'vue'
import Router from 'vue-router'
import index from '../pages/index'
import login from '../pages/user/login'
import userSetting from '../pages/user/setting'

import articleAdd from '../pages/article/article-add'
import articleList from '../pages/article/article-list'
import articleDetail from '../pages/article/article-detail'

import albums from '../pages/albums'
import wxQuestion from '../pages/wx-question'

Vue.use(Router)
export default new Router({
  // mode: history,
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      children: [
        {
          path: '',
          redirect: '/article/list'
        },
        // 文章相关
        {
          path: 'article',
          name: 'article',
          children: [
            {
              path: '',
              redirect: '/article/list'
            },
            {
              path: 'list',
              name: 'articleList',
              component: articleList
            },
            {
              path: 'add',
              name: 'articleAdd',
              component: articleAdd
            },
            {
              path: 'detail',
              name: 'articleDetail',
              component: articleDetail
            }
          ]
        },
        {
          path: 'albums',
          name: 'albums',
          component: albums
        },
        {
          path: 'wx-question',
          name: 'wxQuestion',
          component: wxQuestion
        },
        // 用户相关
        {
          path: 'user',
          children: [
            {
              path: 'setting',
              name: 'userSetting',
              component: userSetting
            },
            {
              path: 'login',
              name: 'login',
              component: login
            }
          ]
        }
      ]
    }
  ]
})
