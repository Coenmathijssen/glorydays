<template>
  <div class="search-results">
    <div class="container"> 
      <section v-if="songs && songs.length > 0" >
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
          <div class="col col__third col__third__top">
            <div class="text-14 bold tt-uppercase">
              Duur
            </div>
          </div>
          <div class="col col__fourth">
            <div class="text-14 bold tt-uppercase">
              Emotie
            </div>
          </div>
        </div>
        <div v-for="(song, index) in songs" :key="`song-${index}`">
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
              <div class="col col__fourth">
                <template v-if="song.emotion === 'none'">
                  <span class="text-14 lighter">
                    Niet gemeten
                  </span>
                </template>
                <template v-else-if="song.emotion >= 0 && song.emotion <= 0.2">
                  <div class="d-flex align-items-center avatar-container">
                    <img src="~@/assets/svg/avatars/emotions/0.svg" alt="Horrible">
                    <span class="text-14">
                      Veschrikkelijk
                    </span>
                  </div>
                </template>
                <template v-else-if="song.emotion >= 0.3 && song.emotion <= 0.5">
                  <div class="d-flex align-items-center avatar-container">
                    <img src="~@/assets/svg/avatars/emotions/1.svg" alt="Bad">
                    <span class="text-14">
                      Matig
                    </span>
                  </div>
                </template>
                <template v-else-if="song.emotion >= 0.6 && song.emotion <= 0.7">
                  <div class="d-flex align-items-center avatar-container">
                    <img src="~@/assets/svg/avatars/emotions/2.svg" alt="Neutral">
                    <span class="text-14">
                      Neutraal
                    </span>
                  </div>
                </template>
                <template v-else-if="song.emotion >= 0.8 && song.emotion <= 0.9">
                  <div class="d-flex align-items-center avatar-container">
                    <img src="~@/assets/svg/avatars/emotions/3.svg" alt="Happy">
                    <span class="text-14">
                      Blij
                    </span>
                  </div>
                </template>
                <template v-else-if="song.emotion > 0.9">
                  <div class="d-flex align-items-center avatar-container">
                    <img src="~@/assets/svg/avatars/emotions/4.svg" alt="Amazing">
                    <span class="text-14">
                      Geweldig
                    </span>
                  </div>
                </template>
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
            :name="buttonTextSongs"
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
            :name="buttonTextArtists"
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
import db from '@/js/firebase/firebase_init.js'
import { collection, getDocs } from 'firebase/firestore/lite'
import playSong from '@/spotify/playSong'
import OrangeButton from '@/components/buttons/OrangeButton'

export default {
  name: 'SearchResults',
  props: {
    results: Object
  },
  data () {
    return {
      buttonTextSongs: 'Meer nummers inladen',
      buttonTextArtists: 'Meer artiesten inladen',
      maxSongs: 5,
      maxArtists: 5,
      songs: null,
      emotions: null
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
  mounted () {
    this.getEmotions()
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
    },
    async getEmotions () {
      const querySnapshot = await getDocs(collection(db, 'emotions'))
      const data = []
      querySnapshot.forEach((doc) => {
        data.push(doc.data())
      })
      this.emotions = data
      
      this.compareEmotions()
    },
    compareEmotions () {
      this.searched.songs.forEach(song => {
        this.emotions.forEach(emotion => {
          if (song.found) return
          
          if (song.id === emotion.Track_ID) {
            song.emotion = Math.round(emotion.RNN * 10) / 10
            song.found = true
          } else {
            song.emotion = 'none'
          }
        })
      })
      this.songs = this.searched.songs
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
  padding: rem(30) 0 rem(160px);

  .text-14 {
    display: block;
    color: $black;
  }

  .row {
    border-bottom: solid 1px $almost-white;
    width: calc(100% - 16px);
    padding: rem(6px) rem(16px) rem(4px) 0;
  }

  .row-left {
    padding-right: rem(32px);
  }

  .col {
    padding-right: rem(32px);

    &__first {
      width: rem(50px);
    }

    &__second {
      width: rem(280px);
    }

    &__third {
      padding-right: rem(64px);

      &__top {
        padding-right: rem(48px);
      }
    }

    &__fourth {
      padding-right: 0;
    }
  }

  .avatar-container {
    img {
      padding-right: rem(12px);
      width: 100%;
      max-width: rem(40px);
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