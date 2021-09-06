<template>
  <div class="home">
    <OverviewHeader 
      :daytime="overview.daytime"
      :name="overview.name"
      :message="overview.message"
    />
    <Playlists/>
    <h1>Log in to Spotify using Authorization Code flow</h1>
      <a href="https://spotify-auth-handler.herokuapp.com/login" class="btn btn-primary">Log in with Spotify</a><br>
    <!-- <div v-if="songs">
      <p
        v-for="(song, index) in songs"
        :key="`song-${index}`"
      >
        {{song.name}}
      </p>
    </div> -->
  </div>
</template>

<script>
// import getUserData from '@/spotify/getUserData'
import OverviewHeader from '@/components/OverviewHeader.vue'
import Playlists from '@/components/Playlists.vue'

export default {
  name: 'Home',
  components: {
    OverviewHeader,
    Playlists
  },
  data () {
    return {
      overview: {
        daytime: 'evening',
        name: 'Kees',
        message: 'hier zijn wat afspeellijsten om tot rust te komen.' 
      },
      songs: null
    }
  },
  // created () {
  //   if (this.$store.getters.getAccessToken) {
  //     getUserData.methods.getSongs().then(songs => {
  //       // this.songs = songs
  //       console.log(songs)
  //     })
  //   }
  // },
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