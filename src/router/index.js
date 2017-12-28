import Vue from 'vue'
import Router from 'vue-router'
import Game from 'components/game/Game'
import GameDetail from 'components/game-detail/game-detail'
import openArea from 'components/open-area/openArea'
import Search from 'components/search/Search'
import Activity from 'components/activity/Activity'
import Kefu from 'components/kefu/kefu'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/game'
    },
    {
      path: '/game',
      name: 'Game',
      component: Game,
      children:[
        {
          path:':id',
          component: GameDetail
        }
      ]
    },
    {
      path: '/openarea',
      name: 'openArea',
      component: openArea,
      children:[
        {
          path:':id',
          component: GameDetail
        }
      ]
    },
    {
      path: '/search',
      name: 'Search',
      component: Search,
      children:[
        {
          path:':id',
          component: GameDetail
        }
      ]
    },
    {
      path: '/activity',
      name: 'Activity',
      component: Activity
    },
    {
      path: '/kefu',
      name: 'Kefu',
      component: Kefu
    }
  ]
})
