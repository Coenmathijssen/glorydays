import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    accessToken: null,
    headers: null,
    deviceId: null,
    playlists: [],
    likedSongs: [],
    searched: []
  },
  // synchronous
  mutations: {
    setAccessToken: (state, payload) => {
      state.accessToken = payload
    },
    setHeaders: (state, payload) => {
      state.headers = payload
    },
    setDeviceId: (state, payload) => {
      state.deviceId = payload
    },
    setPlaylists: (state, payload) => {
      state.playlists = payload
    },
  },
  // async
  actions: {},
  modules: {},
  getters: {
    getAccessToken: state => state.accessToken,
    getHeaders: state => state.headers,
    getPlaylists: state => state.playlists,
    getLikedSongs: state => state.likedSongs,
    getSearched: state => state.searched
  }
})