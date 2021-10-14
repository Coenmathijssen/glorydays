<template>
  <div>
    <transition name="bar-fade">
      <div v-if="currentPlayingSong && playbarLarge" class="playbar__large d-flex-center shadow">
        <div class="inner">
          <div class="d-flex-between">
            <BackButton @click.native="togglePlaybarLarge"/>
            <div class="d-flex-column align-items-end">
              <button class="js-more">
                <svg width="8" height="32" xmlns="http://www.w3.org/2000/svg"><g fill="#FFF" fill-rule="evenodd"><circle cx="4" cy="4" r="4"/><circle cx="4" cy="16" r="4"/><circle cx="4" cy="28" r="4"/></g></svg>
              </button>
              <a class="d-flex-between align-items-center button button__spotify" :href="currentPlayingSong.url" target="_blank" rel="noopener noreferrer">
                <svg id="Bold" enable-background="new 0 0 24 24" height="512" viewBox="0 0 24 24" width="512" xmlns="http://www.w3.org/2000/svg"><path d="m12 24c6.624 0 12-5.376 12-12s-5.376-12-12-12-12 5.376-12 12 5.376 12 12 12zm4.872-6.344v.001c-.807 0-3.356-2.828-10.52-1.36-.189.049-.436.126-.576.126-.915 0-1.09-1.369-.106-1.578 3.963-.875 8.013-.798 11.467 1.268.824.526.474 1.543-.265 1.543zm1.303-3.173c-.113-.03-.08.069-.597-.203-3.025-1.79-7.533-2.512-11.545-1.423-.232.063-.358.126-.576.126-1.071 0-1.355-1.611-.188-1.94 4.716-1.325 9.775-.552 13.297 1.543.392.232.547.533.547.953-.005.522-.411.944-.938.944zm-13.627-7.485c4.523-1.324 11.368-.906 15.624 1.578 1.091.629.662 2.22-.498 2.22l-.001-.001c-.252 0-.407-.063-.625-.189-3.443-2.056-9.604-2.549-13.59-1.436-.175.048-.393.125-.625.125-.639 0-1.127-.499-1.127-1.142 0-.657.407-1.029.842-1.155z"/></svg>
                <span class="text-16 ff-gt">
                  Open Spotify
                </span>
              </a>
            </div>
          </div>
          <div class="d-flex-column align-items-center">
            <img v-if="currentPlayingSong.albumCover.large" :src="currentPlayingSong.albumCover.large" class="album-cover" alt="album cover">
            <img v-else-if="currentPlayingSong.albumCover.medium" :src="currentPlayingSong.albumCover.medium" class="album-cover" alt="album cover">
            <img v-else-if="currentPlayingSong.albumCover.small" :src="currentPlayingSong.albumCover.small" class="album-cover" alt="album cover">
          </div>
          <div class="song">
            <div class="song__name">
              <span class="text-26 bold">
                {{currentPlayingSong.name }}
              </span>
              <span class="text-26">
                <span v-for="(artist, index) in currentPlayingSong.artists" :key="`col-1-artist-${index}`">
                  <span>
                    {{ artist.name }}<template v-if="index !== currentPlayingSong.artists.length - 1">,</template>
                  </span>
                </span>
              </span>
            </div>
            <div class="song__progress">
              <div class="progress-bar">
                <div class="progress-bar__empty"></div>
                <div class="progress-bar__full" ref="progressBar"></div>
              </div>
              <div class="d-flex-between progress-bar__time">
                <span class="text-18">
                  0:00
                </span>

                <span class="text-18">
                  {{ this.convertToTime(this.currentPlayingSong.duration) }}
                </span>
            </div>
            </div>
          </div>
          <div class="d-flex-center align-items-center">
            <button 
              class="skip skip__prev"
              @click="prevSong"
            >
              <svg width="16" height="15" xmlns="http://www.w3.org/2000/svg"><path d="M15.5 15V0h-2.52v15h2.52zm-15 0l10.62-7.5L.5 0v15z" fill="#FFF" fill-rule="nonzero"/></svg>
            </button>
            <button 
              class="button-play"
              :class="{ playing: playing }"
              @click="togglePlay"
            >      
              <svg width="20px" height="24px" viewBox="0 0 20 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                  <g id="UI-Designs---v2" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" font-family="material" font-size="40" font-weight="normal">
                      <g id="4.-Nummer-detail" transform="translate(-408.000000, -897.000000)" fill="#25333A">
                          <text id="pause---material">
                              <tspan x="398" y="923"></tspan>
                          </text>
                      </g>
                  </g>
              </svg> 
              <svg width="19px" height="24px" viewBox="0 0 19 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                  <g id="UI-Designs---v2" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" font-family="material" font-size="40" font-weight="normal">
                      <g id="4.-Nummer-detail" transform="translate(-411.000000, -897.000000)" fill="#25333A">
                          <text id="play_arrow---material">
                              <tspan x="398" y="923"></tspan>
                          </text>
                      </g>
                  </g>
              </svg>
            </button>
            <button 
              class="skip skip__next"
              @click="nextSong"
            >
              <svg width="16" height="15" xmlns="http://www.w3.org/2000/svg"><path d="M15.5 15V0h-2.52v15h2.52zm-15 0l10.62-7.5L.5 0v15z" fill="#FFF" fill-rule="nonzero"/></svg>
            </button>
          </div>
          <div class="sensors d-flex-center align-items-center">
            <svg width="50" height="50" xmlns="http://www.w3.org/2000/svg"><g fill="#7EBDB2" fill-rule="evenodd"><circle cx="26" cy="25" r="10"/><circle opacity=".396" cx="25.5" cy="25.5" r="17.5"/><circle opacity=".199" cx="25" cy="25" r="25"/></g></svg>
            <span class="text-24 light">Sensoren zijn bezig om de emotie meten</span>
          </div>
        </div>
        <button class="remember js-remember d-flex-between align-items-center">
          <svg width="49" height="49" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><circle fill="#FFF" cx="24.5" cy="24.5" r="24.5"/><text font-family="material" font-size="30" fill="#EA6F3D"><tspan x="9" y="35"></tspan></text></g></svg>
          <span class="text-28 bold">
            Ik herinner mij...
          </span>
        </button>
      </div>
    </transition>
    <transition name="bar-fade">
      <div v-if="currentPlayingSong && !playbarLarge" class="playbar shadow d-flex-between">
        <div class="d-flex align-items-center">
          <a class="spotify-logo" :href="currentPlayingSong.url" target="_blank">
            <svg id="Bold" enable-background="new 0 0 24 24" height="512" viewBox="0 0 24 24" width="512" xmlns="http://www.w3.org/2000/svg"><path d="m12 24c6.624 0 12-5.376 12-12s-5.376-12-12-12-12 5.376-12 12 5.376 12 12 12zm4.872-6.344v.001c-.807 0-3.356-2.828-10.52-1.36-.189.049-.436.126-.576.126-.915 0-1.09-1.369-.106-1.578 3.963-.875 8.013-.798 11.467 1.268.824.526.474 1.543-.265 1.543zm1.303-3.173c-.113-.03-.08.069-.597-.203-3.025-1.79-7.533-2.512-11.545-1.423-.232.063-.358.126-.576.126-1.071 0-1.355-1.611-.188-1.94 4.716-1.325 9.775-.552 13.297 1.543.392.232.547.533.547.953-.005.522-.411.944-.938.944zm-13.627-7.485c4.523-1.324 11.368-.906 15.624 1.578 1.091.629.662 2.22-.498 2.22l-.001-.001c-.252 0-.407-.063-.625-.189-3.443-2.056-9.604-2.549-13.59-1.436-.175.048-.393.125-.625.125-.639 0-1.127-.499-1.127-1.142 0-.657.407-1.029.842-1.155z"/></svg>
          </a>
          <div class="song" @click="togglePlaybarLarge">
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
  </div>
</template>

<script>
import { mapState } from 'vuex'
import BackButton from '@/components/buttons/BackButton.vue'

export default {
  name: 'PlayBar',
  data () {
    return {
      playing: true,
      playbarLarge: true
    }
  },
  computed: {
    ...mapState(['isPlaying', 'currentPlayingSong', 'player'])
  },
  watch: {
    '$store.state.isPlaying': function handler() {
      this.playing = this.isPlaying
      this.triggerPlaybar()
      this.playing === true ? this.playing = false : this.playing = true
      this.player.togglePlay()
    }
  },
  components: {
    BackButton
  },
  methods: {
    togglePlay () {
      console.log(this.currentPlayingSong)
      this.$store.commit('setIsPlaying', this.playing)
      console.log('joe', this.player)
      this.player.getCurrentState().then(state => {
        console.log('state', state)
      });
    },
    prevSong () {
      this.player.previousTrack()
    },
    nextSong () {
      this.player.nextTrack().then(() => {
        console.log('running')
      })
    },
    togglePlaybarLarge () {
      this.playbarLarge ? this.playbarLarge = false : this.playbarLarge = true
    },
    triggerPlaybar () {
      setTimeout(() => {
        const progressBar = this.$refs.progressBar
        if (this.playing) {
          progressBar.style.animationPlayState = 'paused'
        } else {
          progressBar.style.transitionDuration = `${this.currentPlayingSong.duration}ms`
          progressBar.style.transform = 'scaleX(1)'
          progressBar.style.animationPlayState = 'running'
        }

        console.log(this.convertToTime(this.currentPlayingSong.duration))

      }, 100)
    },
    convertToTime(milliseconds) {
      const minutes = Math.floor(milliseconds / 60000)
      const seconds = ((milliseconds % 60000) / 1000).toFixed(0)
      return minutes + ':' + (seconds < 10 ? '0' : '') + seconds
    },
  }
}
</script>

<style lang="scss" scoped>
@import '~@/scss/variables';
@import '~@/scss/base/breakpoints';
@import '~@/scss/base/mixins/rem';

.playbar {
  box-sizing: border-box;
  position: fixed;
  bottom: .5rem;
  left: 50%;
  transform: translateX(-50%);
  padding: 0.75rem 1.25rem 0.75rem 2rem;
  width: calc(100% - 1rem);
  max-width: 65rem;
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

  .text-16 {
    display: block;
  }

  &__large {
    box-sizing: border-box;
    position: fixed;
    bottom: .5rem;
    left: 50%;
    transform: translateX(-50%);
    padding: rem(32px) rem(68px) 0;
    width: calc(100% - 1rem);
    height: calc(100% - 1rem);
    max-width: 65rem;
    cursor: pointer;
    background-color: $dark-blue;
    border-radius: 10px;
    color: $white;
    z-index: 99;

    .inner {
      max-width: 40rem;
      width: 100%;
    }

    .song > span {
      display: block;
    }

    .button__spotify {
      padding: rem(8px) rem(28px);
      margin-top: rem(32px);
      border: solid 2px rgba(255,255,255,0.5);
      border-radius: 50px;

      svg {
        width: rem(34px);
        height: rem(34px);
        fill: $white;
      }

      span {
        display: inline-block;
        padding-left: rem(10px);
        color: $white;
        font-weight: 500;
      }
    }

    .album-cover {
      margin: rem(14px) 0 rem(24px);
      width: 100%;
      border-radius: 30px;
    }

    .text-26 {
      display: block;
    }

    .button-play {
      width: rem(84px);
      height: rem(84px);
      margin: 0 rem(32px);
      background-color: $white;

      svg {
        width: rem(40px);
        transform: translate(-50%, -50%) scale(1);

        path {   
          fill: $dark-blue !important;
        }
      }
    }

    .skip {
      width: rem(64px);
      height: rem(64px);
      opacity: 1;
      border: solid 2px rgba(255,255,255,.7);
      border-radius: 50%;
    }

    .song {
      &__name {
        padding-bottom: rem(46px);
      }

      &__progress {
        padding-bottom: rem(12px);

        .progress-bar {
          position: relative;

          &__empty, &__full {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: rem(4px);
            border-radius: rem(50px);
          }

          &__empty {
            background-color: white;
          }

          &__full {
            background-color: $light-blue;
            will-change: transform;
            transform: scaleX(0);
            transform-origin: 0px 50%;
            transition-timing-function: ease;
          }

          &__time {
            padding-top: rem(10px);
          }
        }
      }
    }

    .sensors {
      padding-top: rem(32px);

      span {
        padding: rem(18px);
      }
    }

    .remember {
      position: fixed;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      padding: rem(24px) rem(100px);
      background-color: $orange;
      border-radius: 40px 40px 0 0;

      span {
        padding-left: rem(30px);
        color: $white;
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

  span {
    display: block;
  }

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