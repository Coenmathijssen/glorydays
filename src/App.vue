<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
import spotifyAuth from '@/js/spotifyAuth/spotify_auth'

export default {
  name: 'App',
  mounted() {
    console.log(this.$store.getters.getAccessToken)
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
      window.onSpotifyWebPlaybackSDKReady = () => {
        const playerInit = new window.Spotify.Player({
          name: 'Glory Days Player',
          getOAuthToken: cb => { cb(this.$store.getters.getAccessToken); }
        })
  
        // Ready
        playerInit.connect().then(success => {
          if (success) {
            playerInit.addListener('ready', ({ device_id }) => {
              console.log('ready with device id: ', device_id)
              this.$store.commit('setDeviceId', device_id)
              this.$store.deviceI
            })
          }
        })
      }
    }
  }
}
</script>


<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
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
