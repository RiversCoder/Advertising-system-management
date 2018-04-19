import Vue from 'vue'
import Router from 'vue-router'
import ElementUi from '@/components/element-ui/element-ui'
import Home from '@/components/home/home'
import SourceManage from '@/components/source-manage/source-manage'
import ProgramProduction from '@/components/program-production/program-production'
import DraftBox from '@/components/draft-box/draft-box'
import Terminal from '@/components/terminal/terminal'
import Login from '@/components/login/login'
import Reset from '@/components/reset/reset'
import Store from '@/components/store/store'
import Help from '@/components/help/help'
import WorkTime from '@/components/work-time/work-time'
import NoworkTime from '@/components/nowork-time/nowork-time'
import FullScreen from '@/components/full-screen/full-screen'
import SelectFile from '@/components/select-file/select-file'
import DragFile from '@/components/drag-file/drag-file'

import ListView from '@/base/list-view/list-view'



import store from '../store/index'
import * as types from '../store/mutation-types'


Vue.use(Router)

const router =  new Router({
    routes: [
    {
        path: '/',
        component:ElementUi,
        redirect: '/home',
        children: [
        {
          path: 'home',
          component: Home,
          meta: { 
            requireAuth: true
          }
        },
        {
          path: 'program-production',
          component: ProgramProduction,
          redirect: '/program-production/work-time',
          meta: { 
            requireAuth: true
          },
          children:[
            {
              path:'work-time',
              component: WorkTime
            },
            {
              path:'nowork-time',
              component: NoworkTime
            },
            {
              path:'full-screen',
              component: FullScreen
            }
          ]
        },
        {
          path: 'source-manage',
          component: SourceManage,
          meta: { 
            requireAuth: true
          }
        },
        {
          path: 'terminal',
          component: Terminal,
          meta: { 
            requireAuth: true
          }
        },
        {
          path: 'help',
          component: Help,
          meta: { 
            requireAuth: true
          }
        },
        {
          path: 'store',
          component: Store,
          meta: { 
            requireAuth: true
          }
        },
        {
          path: 'draft-box',
          component: DraftBox,
          meta: { 
            requireAuth: true
          }
        }
      ]
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/reset',
      component: Reset
    },
    {
      path: '/list',
      component: ListView
    },
    {
      path: '/select',
      component: SelectFile
    },
    {
      path: '/order',
      component: DragFile
    }
  ],
  linkActiveClass: 'menuActive'
})

// 页面刷新时，重新赋值token
if (window.localStorage.getItem('token')) {
    store.commit(types.LOGIN, window.localStorage.getItem('token'))
}

// 判断是否需要登录权限 以及是否登录
router.beforeEach((to, from, next) => {
  if (to.matched.some(res => res.meta.requireAuth)) { // 判断是否需要登录权限
    if (localStorage.getItem('token')) { // 判断是否登录
      next()
    } else { // 没登录则跳转到登录界面
      next({
        path: '/login'
      })
    }
  } else {
    next()
  }
})

export default router
