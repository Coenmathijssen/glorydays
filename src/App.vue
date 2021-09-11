<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
// import axios from 'axios'
import spotifyAuth from '@/js/spotifyAuth/spotify_auth'

export default {
  name: 'App',
  mounted() {
    if (this.$store.getters.getAccessToken) return

    // Set access token
    spotifyAuth.then(() => {
      if (!this.$store.getters.getDeviceId) {
        this.playbackInit()
      }
    })
  },
  methods: {
    playbackInit () {
      // Setup playback
      let externalScript = document.createElement('script')
      externalScript.setAttribute('src', 'https://sdk.scdn.co/spotify-player.js')
      document.head.appendChild(externalScript)

      // Called when the Spotify Web Playback SDK is ready to use
      window.onSpotifyWebPlaybackSDKReady = () => {  
        // Define the Spotify Connect device, getOAuthToken has an actual token
        // hardcoded for the sake of simplicity
        const player = new window.Spotify.Player({
          name: 'Glory Days',
          getOAuthToken: (callback) => {
            callback(
              this.$store.getters.getAccessToken
            )
          },
          volume: 0.3
        })

        player.connect()

        player.addListener("ready", ({ device_id }) => {
          this.$store.commit('setDeviceId', device_id)
        })

        this.$store.commit('setPlayer', player)
        console.log("playing?")
      }
    },
  }
}
</script>


<style lang="scss">
@import '~@/scss/variables';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: $main-bg;
  color: #2c3e50;
  min-height: 100vh;
  overflow: hidden;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
