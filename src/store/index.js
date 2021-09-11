import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    accessToken: null,
    headers: null,
    player: null,
    playerInstance: null,
    deviceId: null,
    currentPlayingSong: null,
    isPlaying: false,
    isPaused: false,
    personalPlaylists: [],
    easyPlaylists: [],
    nostalgicPlaylists: [],
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
    setPlayerInstance: (state, payload) => {
      state.playerInstance = payload
    },
    setPlayer: (state, payload) => {
      state.player = payload
    },
    setDeviceId: (state, payload) => {
      state.deviceId = payload
    },
    setCurrentPlayingSong: (state, payload) => {
      state.currentPlayingSong = payload
    },
    setIsPlaying: (state, payload) => {
      state.isPlaying = payload
    },
    setIsPaused: (state, payload) => {
      state.isPaused = payload
    },
    setPersonalPlaylists: (state, payload) => {
      state.personalPlaylists = payload
    },
    setEasyPlaylists: (state, payload) => {
      state.easyPlaylists.push(payload)
    },
    setNostalgicPlaylists: (state, payload) => {
      state.nostalgicPlaylists.push(payload)
    }
  },
  // async
  actions: {},
  modules: {},
  getters: {}
})