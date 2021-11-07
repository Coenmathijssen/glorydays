import Vue from 'vue'
import VueRouter from 'vue-router'

import Music from '@/views/Music.vue'
import About from '@/views/About.vue'
import Login from '@/views/Login.vue'
import Playlist from '@/views/Playlist.vue'
import Memories from '@/views/Memories.vue'
import Memory from '@/views/Memory.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Music',
    component: Music
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
  },
  {
    path: '/memories',
    name: 'Memories',
    component: Memories,
    props: true
  },
  {
    path: '/memory',
    name: 'Memory',
    component: Memory,
    props: true
  }
]

const router = new VueRouter({
  mode: 'history',
  base: '',
  routes
})

export default router
