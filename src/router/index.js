import Vue from 'vue'
import VueRouter from 'vue-router'

import Overview from '@/views/Overview.vue'
import About from '@/views/About.vue'
import Login from '@/views/LoginSpotify.vue'
import Playlist from '@/views/Playlist.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Overview',
    component: Overview
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/playlist',
    name: 'Playlist',
    component: Playlist,
    props: true
  }
]

const router = new VueRouter({
  mode: 'history',
  base: '',
  routes
})

export default router
