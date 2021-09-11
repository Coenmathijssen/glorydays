<template>
  <section class="playlist">
    <div v-if="playlist" class="header"> 
      <div class="d-flex align-items-center row">
        <div class="col col__first">
          <div class="text-14 bold tt-uppercase">
            Titel
          </div>
        </div>
        <div class="col col__second">
          <div class="text-14 bold tt-uppercase">
            Door
          </div>
        </div>
        <div class="col col__third">
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
      <div v-for="(song, index) in playlist" :key="`row-${index}`" class="d-flex align-items-center row">
        <div class="col col__first">
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
        <div class="col col__second">
          <span class="text-14">
            {{ song.addedBy }}
          </span>
        </div>
        <div class="col col__third">
          <span class="text-14">
            {{ convertToTime(song.duration) }}
          </span>
        </div>
        <div class="col col__fourth">
          <template v-if="index % 4 == 0 || index % 10== 0">
            <div class="d-flex align-items-center avatar-container">
              <img src="~@/assets/svg/avatars/male_white/happy.svg" alt="Happy">
              <span class="text-14">
                Gelukkig
              </span>
            </div>
          </template>
          <template v-else-if="index % 6 == 0">
             <div class="d-flex align-items-center avatar-container">
              <img src="~@/assets/svg/avatars/male_white/bored.svg" alt="Happy">
              <span class="text-14">
                Verveeld
              </span>
            </div>
          </template>
          <template v-else>
            <span class="text-14 lighter">
              Niet gemeten
            </span>
          </template>
        </div>
        <div class="col col__fifth">
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
  </section>
</template>

<script>
import { mapState } from 'vuex'
import getPlaylist from '@/spotify/getPlaylist'
import playSong from '@/spotify/playSong'

export default {
  name: 'PlaylistGrid',
  props: {
    playlistId: String
  },
  data () {
    return {
      playlist: null
    }
  },
  computed: {
    ...mapState(['isPlaying', 'currentPlayingSong', 'player'])
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
  created () {
    this.getCurrentPlaylist()
  },
  methods: {
    getCurrentPlaylist () {
      getPlaylist.methods.getPlaylistTracks(this.playlistId).then(playlist => {
        this.playlist = playlist.songs
        console.log(this.playlist)
      })
    },
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
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/scss/variables';
@import '~@/scss/base/breakpoints';
@import '~@/scss/base/mixins/rem';

.playlist {
  padding: rem(60px) 0;

  .text-14 {
    display: block;
    color: $black;
  }

  .row {
    border-bottom: solid 1px $almost-white;
    width: calc(100% - 16px);
    padding: rem(10px) rem(16px) rem(8px) 0;
  }

  .col {
    padding-right: rem(24px);

    &__first {
      width: rem(300px);
    }

    &__second {
      width: rem(130rem);
    }

    &__third {
      width: rem(50px);
    }
    
    &__fourth {
      width: rem(120px);
    }

    &__fifth {
      padding-right: 0;
    }
  }

  .avatar-container {
    img {
      padding-right: rem(12px);
    }
  }

  .icon-container {
    position: relative;
    padding-left: rem(4px);
    padding-right: rem(16px);
    height: calc(40px - 4px);
    display: flex;
    justify-content: center;
    align-items: center;
    border: solid 2px rgba(37, 51, 58, 0.2);
    border-radius: 50px 0 0 50px;
  }

  .button-add {
    height: 40px;
    width: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .button-play {
    position: absolute;
    right: rem(-20px);
    height: rem(40px);
    width: rem(40px);
    background-color: $main-bg;
    border: solid 2px $dark-blue;
    border-radius: 50%;
    transition: all .2s ease-in-out;

    svg {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);

      &:first-of-type {
        position: absolute;
        top: 50%;
        left: calc(50% + 1px);
        transform: translate(-50%, -50%) scale(0.8);

        path {
          fill: $dark-blue;
        }
      }

      &:last-of-type {
        opacity: 0;
        transform: translate(-50%, -50%) scale(0.9);
      }
    }

    &.playing {
      background-color: $orange;
      border-color: $orange;

      svg {
        &:first-of-type {
          opacity: 0;
        }

        &:last-of-type {
          opacity: 1;
        }
      }
    }
  }

  .lighter {
    opacity: 0.4;
  }
}
</style>