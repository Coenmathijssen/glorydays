<template>
  <div class="search-results">
    <div class="container"> 
      <section v-if="searched.songs.length > 0" >
        <h1 class="text-28">
          Gevonden nummers
        </h1>
        <div class="d-flex align-items-center row">
          <div class="col col__first">
            <div class="text-14 bold tt-uppercase">
            </div>
          </div>
          <div class="col col__second">
            <div class="text-14 bold tt-uppercase">
              Titel
            </div>
          </div>
          <div class="col col__third">
            <div class="text-14 bold tt-uppercase">
              Duur
            </div>
          </div>
        </div>
        <div v-for="(song, index) in searched.songs" :key="`song-${index}`">
          <div v-if="index < maxSongs" class="d-flex-between align-items-center row">
            <div class="d-flex align-items-center">
              <div class="col col__first">
                  <img 
                    class="album-cover"
                    :src="song.albumCover.small" 
                    alt="song album cover"
                  >
              </div>
              <div class="col col__second">
                <span class="text-14 bold">
                  {{song.name }}
                </span>
                <span class="text-14">
                  <span v-for="(artist, index) in song.artists" :key="`col-1-artist-${index}`">
                    <span>
                      {{ artist.name }}<template v-if="index !== song.artists.length - 1">,</template>
                    </span>
                  </span>
                </span>
              </div>
              <div class="col col__third">
                <span class="text-14">
                  {{ convertToTime(song.duration) }}
                </span>
              </div>
            </div>
            <div class="col col__fourth">
              <div class="icon-container">
                <button class="button-add">
                  <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><path d="M43-12v38H3a18.94 18.94 0 0 1-13.435-5.565A18.94 18.94 0 0 1-16 7a18.94 18.94 0 0 1 5.565-13.435A18.94 18.94 0 0 1 3-12h40Z" stroke="#25333A" stroke-width="2" fill="#F8FCFF" opacity=".202"/><path fill="#000" fill-rule="nonzero" d="M6.82 11.82v-5h5V5.18h-5v-5H5.18v5h-5v1.64h5v5z"/></g></svg>
                </button>
                <button class="button-play js-play" @click="(e) => { playSong(e.currentTarget, song) }">
                  <svg width="15" height="17" xmlns="http://www.w3.org/2000/svg"><path d="M.563 16.296l13.339-7.413c.311-.171.311-.452 0-.623L.562.847C.253.677 0 .827 0 1.18v14.785c0 .352.251.503.563.332z" fill="#FFF" fill-rule="nonzero"/></svg>
                  <svg width="12" height="15" xmlns="http://www.w3.org/2000/svg"><path d="M12 14.584V.616H8.016v13.968H12zm-8.016 0V.616H0v13.968h3.984z" fill="#FFF" fill-rule="nonzero"/></svg>
                </button> 
              </div>
            </div>
          </div>
        </div>
        <div 
          v-if="maxSongs < 6 && searched.songs.length > 5"
          class="more-button-container">
          <OrangeButton 
            @click.native="loadMoreSongs"
            :name="buttonText"
          />
        </div>
      </section>
      <section v-if="searched.artists.length > 0" >
        <h1 class="text-28">
          Gevonden artiesten
        </h1>
        <div class="d-flex flex-wrap">
          <div v-for="(artist, index) in searched.artists" :key="`artist-${index}`">
            <div v-if="index < maxArtists" class="d-flex-column align-items-center artist">
              <img 
                v-if="artist.albumCover.large"
                :src="artist.albumCover.large"
                class="artist__cover"
                alt="Artist image"
              >
              <div v-else class="artist__cover__empty">
              </div>
              <p class="text-14">
                {{ artist.name }}
              </p>
             </div>
          </div>
        </div>
        <div 
          v-if="maxArtists < 6 && searched.artists.length > 5"
          class="more-button-container">
          <OrangeButton 
            @click.native="loadMoreArtists"
            :name="buttonText"
          />
        </div>
      </section>
      <section v-if="searched.songs.length === 0 && searched.artists.length === 0" >
        <h1 class="text-28">
          Geen resultaten gevonden
        </h1>
      </section>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import playSong from '@/spotify/playSong'
import OrangeButton from '@/components/buttons/OrangeButton'

export default {
  name: 'SearchResults',
  props: {
    results: Object
  },
  data () {
    return {
      buttonText: 'Meer nummers inladen',
      maxSongs: 5,
      maxArtists: 5
    }
  },
  computed: {
    ...mapState(['isPlaying', 'currentPlayingSong', 'player', 'searched'])
  },
  watch: {
    '$store.state.isPlaying': function handler() {
      const activeButton = document.querySelector('.js-play.active')

      if (this.isPlaying === false) {
        activeButton.classList.remove('playing')
      } else {
        activeButton.classList.add('playing')
      }
    }
  },
  components: {
    OrangeButton
  },
  methods: {
    convertToTime(milliseconds) {
      const minutes = Math.floor(milliseconds / 60000)
      const seconds = ((milliseconds % 60000) / 1000).toFixed(0)
      return minutes + ':' + (seconds < 10 ? '0' : '') + seconds
    },
    playSong (el, song) {
      console.log(el)
      if (song !== this.currentPlayingSong) {
        playSong.methods.start(song.id)  
        this.$store.commit('setCurrentPlayingSong', song)
        this.$store.commit('setIsPlaying', true)
        this.trigggerPlayButton(el, 'new')
      } else {
        this.trigggerPlayButton(el, 'same')
      }
    },
    trigggerPlayButton (el, type) {
      if (type === 'new') {
        const activeButton = document.querySelector('.js-play.playing')
        if (activeButton) {
          activeButton.classList.remove('active')
          activeButton.classList.remove('playing')
        }
        el.classList.add('active')
        el.classList.add('playing')
        this.$store.commit('setIsPlaying', true)
      } else {
        if (el.classList.contains('playing')) {
          this.$store.commit('setIsPlaying', false)
          el.classList.remove('playing')
        } else {
          this.$store.commit('setIsPlaying', true)
          el.classList.add('playing')
        }
      }
    },
    loadMoreSongs () {
      this.maxSongs = this.searched.songs.length
    },
    loadMoreArtists () {
      this.maxArtists = this.searched.artists.length
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/scss/variables';
@import '~@/scss/base/breakpoints';
@import '~@/scss/base/mixins/rem';

section:last-of-type {
  padding-top: rem(40px);
}

.search-results {
  padding: rem(30) 0 rem(60px);

  .text-14 {
    display: block;
    color: $black;
  }

  .row {
    border-bottom: solid 1px $almost-white;
    width: calc(100% - 16px);
    padding: rem(6px) rem(16px) rem(4px) 0;
  }

  .col {
    padding-right: rem(32px);

    &__first {
      width: rem(50px);
    }

    &__second {
      width: rem(340px);
    }

    &__fourth {
      padding-right: 0;
    }
  }

  .text-28 {
    padding: rem(30px) 0 rem(20px);
    font-weight: 500;
  }

  .album-cover {
    border-radius: 10px;
    max-width: rem(50px);
  }

  .more-button-container {
    padding-top: rem(20px);
  }

  .artist {
    padding: rem(16px) rem(20px) rem(16px) 0;

    &__cover, &__cover__empty {
      width: rem(100px);
      height: rem(100px);
      object-fit: cover;
      border-radius: 50%;

      &__empty {
        background-color: $very-light-blue;
      }
    }

    .text-14 {
      padding-top: rem(8px);
      font-weight: bold;
    }
  }
}
</style>