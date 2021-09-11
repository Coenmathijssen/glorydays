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
      <PlaylistGrid 
        :playlistId="playlistId"
      />
    </div>
  </div>
</template>

<script>
import OverviewPlaylist from '@/components/OverviewPlaylist.vue'
import SearchBar from '@/components/SearchBar.vue'
import PlaylistGrid from '@/components/PlaylistGrid.vue'

export default {
  name: 'Playlist',
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
    PlaylistGrid
  }
}
</script>

<style lang="scss" scoped>
@import '~@/scss/base/mixins/rem';

.search-bar-container {
  margin-top: rem(32px);
}

</style>