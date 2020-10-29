import Life from '@/pages/Life'
import Life1 from '@/pages/Life/Life1'
import Life2 from '@/pages/Life/Life2'

import Comp from '@/pages/Comp'
import DynamicCacheAsync from '@/pages/Comp/DynamicCacheAsync'
import FunctionalComp from '@/pages/Comp/FunctionalComp'
import RecurseComp from '@/pages/Comp/RecurseComp'

export default [
  
  {
    path: '/life',
    component: Life,
    children: [
      {
        path: 'life1',
        component: Life1,
      },
      {
        path: 'life2',
        component: Life2
      },
    ]
  },
  {
    path: '/comp',
    component: Comp,
    children: [
      {
        path: 'dca',
        component: DynamicCacheAsync,
        
      },
      {
        path: 'functional',
        component: FunctionalComp
      },
      {
        path: 'recurse',
        component: RecurseComp
      },
    ]
  },

	{
    path: '/communication',
    component: () => import('@/pages/Communication'),
    children: [
      {
        path: 'event',
        component: () => import('@/pages/Communication/EventTest/EventTest'),
      },
      {
        path: 'model',
        component: () => import('@/pages/Communication/ModelTest/ModelTest'),
      },
      {
        path: 'sync',
        component: () => import('@/pages/Communication/SyncTest/SyncTest'),
      },
      {
        path: 'attrs-listeners',
        component: () => import('@/pages/Communication/AttrsListenersTest/AttrsListenersTest'),
      },
      {
        path: 'children-parent',
        component: () => import('@/pages/Communication/ChildrenParentTest/ChildrenParentTest'),
      },
      {
        path: 'scope-slot',
        component: () => import('@/pages/Communication/ScopeSlotTest/ScopeSlotTest'),
      },
      {
        path: 'provide-inject',
        component: () => import('@/pages/Communication/ProvideInjectTest/ProvideInjectTest'),
      },
    ],
  },

  {
    path: '/reactive',
    component: () => import('@/pages/Reactive'),
  },

  {
    path: '/reuse',
    component: () => import('@/pages/Reuse'),
  },
  {
    path: '/router',
    component: () => import('@/pages/Router'),
  },
  {
    path: '/vuex',
    component: () => import('@/pages/Vuex'),
    children: [
      {
        path: 'shopcart',
        component: () => import('@/pages/Vuex/ShopCart'),
      },
      {
        path: 'personal',
        component: () => import('@/pages/Vuex/Personal'),
      }
    ]
  },
]