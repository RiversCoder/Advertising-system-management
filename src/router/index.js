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
import Histogram from '@/base/histogram/histogram'
import On from '@/base/on/on'
import Off from '@/base/off/off'
import Full from '@/base/full/full'


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
            requireAuth: true,
            keepAlive: true // 需要被缓存
          }
        },
        {
          path: 'program-production',
          component: ProgramProduction,
          redirect: '/program-production/work-time',
          meta: { 
            requireAuth: true,
            keepAlive: false
          },
          children:[
            {
              path:'work-time',
              component: WorkTime,
              meta: { 
                requireAuth: true,
                keepAlive: false
              },
              redirect: '/program-production/work-time/on',
              children: [{
                path:'on',
                component: On,
                keepAlive: false
              },{
                path:'off',
                component: Off,
                keepAlive: false
              },{
                path:'full',
                component: Full,
                keepAlive: false
              }]
            },
            {
              path: 'select',
              component: SelectFile,
              meta: { 
                requireAuth: true,
                keepAlive: false
              }
            },
            {
              path: 'order',
              component: DragFile,
              meta: { 
                requireAuth: true,
                keepAlive: false 
              }
            }
          ]
        },
        {
          path: 'source-manage',
          component: SourceManage,
          meta: { 
            requireAuth: true,
            keepAlive: true // 需要被缓存
          }
        },
        {
          path: 'terminal',
          component: Terminal,
          meta: { 
            requireAuth: true,
            keepAlive: true // 需要被缓存
          }
        },
        {
          path: 'help',
          component: Help,
          meta: { 
            requireAuth: true,
            keepAlive: true // 需要被缓存
          }
        },
        {
          path: 'store',
          component: Store,
          meta: { 
            requireAuth: true,
            keepAlive: true // 需要被缓存
          }
        },
        {
          path: 'draft-box',
          component: DraftBox,
          meta: { 
            requireAuth: true,
            keepAlive: false 
          }
        }
      ]
    },
    {
      path: '/login',
      component: Login,
      keepAlive: false 
    },
    {
      path: '/reset',
      component: Reset,
      keepAlive: false 
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
