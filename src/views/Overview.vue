<template>
  <div class="home">
    <OverviewHeader 
      :daytime="overview.daytime"
      :name="overview.name"
      :message="overview.message"
    />
    
    <transition name="list-fade">
      <Playlists v-if="!searchActive"/>
    </transition>

    <transition name="list-fade">
      <SearchResults v-if="searchActive"/>
    </transition>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import OverviewHeader from '@/components/OverviewHeader.vue'
import Playlists from '@/components/Playlists.vue'
import SearchResults from '@/components/SearchResults.vue'

export default {
  name: 'Home',
  computed: {
    ...mapState(['searchActive'])
  },
  components: {
    OverviewHeader,
    Playlists,
    SearchResults
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