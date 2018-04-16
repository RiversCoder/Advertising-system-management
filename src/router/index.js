import Vue from 'vue'
import Router from 'vue-router'
import ElementUi from '@/components/element-ui/element-ui'
import Home from '@/components/home/home'
import SourceManage from '@/components/source-manage/source-manage'
import ProgramProduction from '@/components/program-production/program-production'
import DraftBox from '@/components/draft-box/draft-box'
import Terminal from '@/components/terminal/terminal'

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
          component: ProgramProduction
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
          path: 'draft-box',
          component: DraftBox
        }
      ]
    }
  ]
})
