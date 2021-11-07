<template>
  <div id="app">
    <router-view/>
    <PlayBar/>
    <AddMemory/>
    <MenuBar/>
  </div>
</template>

<script>
// import axios from 'axios'
import spotifyAuth from '@/js/spotifyAuth/spotify_auth'
import PlayBar from '@/components/PlayBar.vue'
import AddMemory from '@/components/AddMemory.vue'
import MenuBar from '@/components/MenuBar.vue'

export default {
  name: 'App',
  components: {
    PlayBar,
    AddMemory,
    MenuBar
  },
  mounted() {
    // Get access token. If older than 1 hour, redirect to login
    spotifyAuth.then(() => {
      const currentTimeInSeconds = new Date().getTime() / 1000
      if (currentTimeInSeconds - this.$store.getters.getTokenDate.seconds > 3600) {
        this.$router.push('/login')
      }

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
@import '~@/scss/base/mixins/rem';

#app {
  min-height: 100vh;
  padding-bottom: rem(50px);
  overflow: hidden;
  background-color: $main-bg;
  font-family: 'Avenir';
}
</style>
