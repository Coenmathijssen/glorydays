<template>
  <div>
    <OverviewPlaylist
      :title="title"
      :madeBy="madeBy"
      :totalTracks="totalTracks"
    />
    <div class="container">
      <div class="search-bar-container">
        <SearchBar/>
      </div>
      <transition name="list-fade">
        <PlaylistGrid 
          v-if="!searchActive"
          :playlistId="playlistId"
        />
      </transition>
      <transition name="list-fade">
        <SearchResults v-if="searchActive"/>
      </transition>
    </div>
    <AddMemory/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import OverviewPlaylist from '@/components/OverviewPlaylist.vue'
import SearchBar from '@/components/SearchBar.vue'
import PlaylistGrid from '@/components/PlaylistGrid.vue'
import SearchResults from '@/components/SearchResults.vue'
import AddMemory from '@/components/AddMemory.vue'

export default {
  name: 'Playlist',
  computed: {
    ...mapState(['searchActive'])
  },
  props: {
    playlistId: String,
    title: String,
    madeBy: Object,
    totalTracks: Number,
    firstTrack: String
  },
  components: {
    OverviewPlaylist,
    SearchBar,
    PlaylistGrid,
    SearchResults,
    AddMemory
  }
}
</script>

<style lang="scss" scoped>
@import '~@/scss/base/mixins/rem';

.search-bar-container {
  margin-top: rem(32px);
}

</style>