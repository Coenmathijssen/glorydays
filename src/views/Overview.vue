<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <h1>Log in to Spotify using Authorization Code flow</h1>
      <a href="https://spotify-auth-handler.herokuapp.com/login" class="btn btn-primary">Log in with Spotify</a><br>
    <div v-if="songs">
      <p
        v-for="(song, index) in songs"
        :key="`song-${index}`"
      >
        {{song.name}}
      </p>
    </div>
  </div>
</template>

<script>
import getUserData from '@/spotify/getUserData'
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  data () {
    return {
      songs: null
    }
  },
  created () {
    if (this.$store.getters.getAccessToken) {
      getUserData.methods.getSongs().then(songs => {
        // this.songs = songs
        console.log(songs)
      })
    }
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
div {
  h1 {
    color: red;
  }
}
</style>