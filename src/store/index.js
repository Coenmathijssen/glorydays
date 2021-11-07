import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    accessToken: null,
    tokenDate: null,
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
    searchActive: false,
    searched: null,
    addMemory: false,
    memories: null
  },
  // synchronous
  mutations: {
    setAccessToken: (state, payload) => {
      state.accessToken = payload
    },
    setTokenDate: (state, payload) => {
      state.tokenDate = payload
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
    },
    setSearchActive: (state, payload) => {
      state.searchActive = payload
    },
    setSearched: (state, payload) => {
      state.searched = payload
    },
    setAddMemory: (state, payload) => {
      state.addMemory = payload
    },
    setMemories: (state, payload) => {
      state.memories = payload
    }
  },
  // async
  actions: {},
  modules: {},
  getters: {
    getAccessToken: state => state.accessToken,
    getTokenDate: state => state.tokenDate,
    getHeaders: state => state.headers,
    getPlayerInstance: state => state.playerInstance,
    getPlayer: state => state.player,
    getDeviceId: state => state.deviceId,
    getPlaylists: state => state.playlists,
    getLikedSongs: state => state.likedSongs,
    getSearched: state => state.searched
  }
})