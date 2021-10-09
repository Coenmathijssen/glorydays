<template>
  <transition name="bar-fade">
    <div v-if="currentPlayingSong" class="playbar shadow d-flex-between">
      <div class="d-flex align-items-center">
        <a class="spotify-logo" :href="currentPlayingSong.url" target="_blank">
          <svg id="Bold" enable-background="new 0 0 24 24" height="512" viewBox="0 0 24 24" width="512" xmlns="http://www.w3.org/2000/svg"><path d="m12 24c6.624 0 12-5.376 12-12s-5.376-12-12-12-12 5.376-12 12 5.376 12 12 12zm4.872-6.344v.001c-.807 0-3.356-2.828-10.52-1.36-.189.049-.436.126-.576.126-.915 0-1.09-1.369-.106-1.578 3.963-.875 8.013-.798 11.467 1.268.824.526.474 1.543-.265 1.543zm1.303-3.173c-.113-.03-.08.069-.597-.203-3.025-1.79-7.533-2.512-11.545-1.423-.232.063-.358.126-.576.126-1.071 0-1.355-1.611-.188-1.94 4.716-1.325 9.775-.552 13.297 1.543.392.232.547.533.547.953-.005.522-.411.944-.938.944zm-13.627-7.485c4.523-1.324 11.368-.906 15.624 1.578 1.091.629.662 2.22-.498 2.22l-.001-.001c-.252 0-.407-.063-.625-.189-3.443-2.056-9.604-2.549-13.59-1.436-.175.048-.393.125-.625.125-.639 0-1.127-.499-1.127-1.142 0-.657.407-1.029.842-1.155z"/></svg>
        </a>
        <div class="song">
          <span class="text-16 bold">
            {{currentPlayingSong.name }}
          </span>
          <span class="text-16">
            <span v-for="(artist, index) in currentPlayingSong.artists" :key="`col-1-artist-${index}`">
              <span>
                {{ artist.name }}<template v-if="index !== currentPlayingSong.artists.length - 1">,</template>
              </span>
            </span>
          </span>
        </div>
      </div>
      <div class="d-flex align-items-center">
        <button 
          class="skip skip__prev"
          @click="prevSong"
        >
          <svg width="12" height="18" xmlns="http://www.w3.org/2000/svg"><path fill="#FFF" fill-rule="nonzero" d="m2.976 18.04 9-9-9-9L.852 2.164 7.764 9.04.852 15.952z"/></svg>
        </button>
        <button 
          class="button-play"
          :class="{ playing: playing }"
          @click="togglePlay"
        >
          <svg width="12" height="15" xmlns="http://www.w3.org/2000/svg"><path d="M12 14.584V.616H8.016v13.968H12zm-8.016 0V.616H0v13.968h3.984z" fill="#FFF" fill-rule="nonzero"/></svg>
          <svg width="15" height="17" xmlns="http://www.w3.org/2000/svg"><path d="M.563 16.296l13.339-7.413c.311-.171.311-.452 0-.623L.562.847C.253.677 0 .827 0 1.18v14.785c0 .352.251.503.563.332z" fill="#FFF" fill-rule="nonzero"/></svg>
        </button>
        <button 
          class="skip skip__next"
          @click="nextSong"
        >
          <svg width="12" height="18" xmlns="http://www.w3.org/2000/svg"><path fill="#FFF" fill-rule="nonzero" d="m2.976 18.04 9-9-9-9L.852 2.164 7.764 9.04.852 15.952z"/></svg>
        </button>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'PlayBar',
  data () {
    return {
      playing: true
    }
  },
  computed: {
    ...mapState(['isPlaying', 'currentPlayingSong', 'player'])
  },
  watch: {
    '$store.state.isPlaying': function handler() {
      this.playing = this.isPlaying
      this.playing === true ? this.playing = false : this.playing = true
      this.player.togglePlay()
    }
  },
  methods: {
    togglePlay () {
      console.log(this.currentPlayingSong)
      this.$store.commit('setIsPlaying', this.playing)
    },
    prevSong () {
      this.player.previousTrack()
    },
    nextSong () {
      this.player.nextTrack().then(() => {
        console.log('running')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/scss/variables';
@import '~@/scss/base/breakpoints';
@import '~@/scss/base/mixins/rem';

.playbar {
  position: fixed;
  bottom: .5rem;
  left: 50%;
  transform: translateX(-50%);
  padding: 0.75rem 1.25rem 0.75rem 2rem;
  width: calc(100% - 4.25rem);
  max-width: 50rem;
  cursor: pointer;
  background-color: $dark-blue;
  border-radius: 10px;
  color: $white;
  z-index: 99;

  .spotify-logo {
    fill: white;
    max-width: 36px;

    svg {
      width: 100%;
      height: auto;
    }
  }
  
  .song {
    padding-left: rem(16px);

    .text-16 {
      line-height: 1;
      display: block;

      &:last-of-type {
        margin-top: rem(4px);
      }
    }
  }
}


.button-play {
  position: relative;
  height: rem(50px);
  width: rem(50px);
  margin: 0 rem(12px);
  background-color: $orange;
  border-radius: 50%;

  svg {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    &:first-of-type {
      position: absolute;
      top: 50%;
      transform: translate(-50%, -50%) scale(0.9);

      path {
        fill: $white;
      }
    }

    &:last-of-type {
      left: calc(50% + 1px);
      transform: translate(-50%, -50%) scale(0.8);
      opacity: 0;
    }
  }

  &.playing {
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



.skip {
  opacity: 0.6;
  transition: all .2s ease-in-out;

  &:hover {
    opacity: 1;
  }

  svg path {
    fill: white;
  }

  &__prev {
    svg {
      transform: rotate(180deg);
    }
  }
}
</style>