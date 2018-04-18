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

import ListView from '@/base/list-view/list-view'


Vue.use(Router)

export default new Router({
    routes: [
    {
        path: '/',
        component:ElementUi,
        redirect: '/home',
        children: [
        {
          path: 'home',
          component: Home
        },
        {
          path: 'program-production',
          component: ProgramProduction,
          redirect: '/program-production/work-time',
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
          component: SourceManage
        },
        {
          path: 'terminal',
          component: Terminal
        },
        {
          path: 'help',
          component: Help
        },
        {
          path: 'store',
          component: Store
        },
        {
          path: 'draft-box',
          component: DraftBox
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
    }
  ],
  linkActiveClass: 'menuActive'
})
