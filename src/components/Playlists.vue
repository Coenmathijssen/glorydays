<template>
  <section class="row playlists">
    <div class="container">
      <div class="playlist-section">
        <h3 class="text-28">
          Ontspannen lijsten samengesteld door de familie
        </h3>
        <div v-if="playlists">
          <div class="swiper-container">
            <div class="swiper-wrapper">
              <Playlist 
                v-for="(playlist, index) in playlists"
                :key="`playlist-${index}`"
                :id="playlist.id"
                :title="playlist.title"
              /> 
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Swiper from 'swiper'
import 'swiper/swiper-bundle.css'

console.log(Swiper)

import getUserData from '@/spotify/getUserData'
import Playlist from '@/components/Playlist'

export default {
  name: 'Playlists',
  components: {
    Playlist
  },
  data () {
    return {
      playlists: null,
      swiper: null
    }
  },
  created () {
    this.getPlaylists()
  },
  mounted () {
    this.initSwiper()
  },
  methods: {
    getPlaylists () {
      const storePlaylists = this.$store.getters.getPlaylists
      if (storePlaylists.length > 0) {
        this.playlists = storePlaylists
        return
      }
      
      getUserData.methods.getPlaylists().then(playlists => {
        this.playlists = playlists
        this.$store.commit('setPlaylists', playlists)
      })
    },
    initSwiper () {
      if (this.swiper) return

      this.swiper = new Swiper('.swiper-container', {
        slidesPerView: 3,
        spaceBetween: 16
      })
    }
  }
}
</script>

<style lang="scss">
@import '~@/scss/variables';
@import '~@/scss/base/breakpoints';
@import '~@/scss/base/mixins/rem';

.playlists {
  padding: rem(70px) 0 rem(50px);

  .swiper-container {
    width: 100%;
    height: 100%;
  }

  h3 {
    font-weight: 500;
    color: $black;
  }
}
</style>