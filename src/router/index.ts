import Vue from 'vue'
import VueRouter from 'vue-router'

import Feeds from '@/views/pages/Feeds.vue'
import Settings from '@/views/pages/Settings.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Feeds',
    component: Feeds,
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings,
  },
]

const router = new VueRouter({
  mode: process.env.IS_ELECTRON ? 'hash' : 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
