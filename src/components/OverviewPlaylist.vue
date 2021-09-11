<template>
  <section class="row overview-playlist">
    <div class="bg">
      <div class="container">
        <div class="d-flex-between">
          <div class="d-flex align-items-center">
            <div class="back-button-container">
              <BackButton url="/" />
            </div>
            <div class="ta-left relative">
              <h1 class="text-32 bold ">
                {{ title }}
              </h1>
              <div class="text-16 d-flex align-items-center">
                <template v-if="madeBy">
                  <span>
                    Aangemaakt door zus 
                    <a :href="madeBy.url" target="_blank" rel="nofollow noreferrer">
                      {{ madeBy.name }}
                    </a>
                  </span>
                </template>
                <span class="spacer"></span>
                <span v-if="totalTracks">
                  {{ totalTracks }} nummers
                </span>
              </div>
            </div>
          </div>
          <div class="d-flex align-items-center buttons-right-container">
            <button class="d-flex-center align-items-center button">
              <svg width="24" height="30" xmlns="http://www.w3.org/2000/svg"><path d="M23.64 5V1.64h-5.76L16.16 0H7.88L6.16 1.64H.36V5h23.28zm-5 25c.907 0 1.693-.333 2.36-1 .667-.667 1-1.453 1-2.36v-20H2v20c0 .907.333 1.693 1 2.36.667.667 1.453 1 2.36 1h13.28z" fill="#FFF" fill-rule="nonzero"/></svg>
            </button>
            <button class="d-flex-center align-items-center button">
              <svg width="8" height="32" xmlns="http://www.w3.org/2000/svg"><g fill="#FFF" fill-rule="evenodd"><circle cx="4" cy="4" r="4"/><circle cx="4" cy="16" r="4"/><circle cx="4" cy="28" r="4"/></g></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="section-bg relative">
      <img src="~@/assets/svg/section_header_2.svg" alt="header shape">
      <button class="play play__large absolute js-play" ref="playSong">
        <svg width="15" height="17" xmlns="http://www.w3.org/2000/svg"><path d="M.563 16.296l13.339-7.413c.311-.171.311-.452 0-.623L.562.847C.253.677 0 .827 0 1.18v14.785c0 .352.251.503.563.332z" fill="#FFF" fill-rule="nonzero"/></svg>
      </button>
    </div>
  </section>
</template>

<script>
import BackButton from '@/components/buttons/BackButton.vue'

export default {
  name: 'OveriewHeader',
  props: {
    title: String,
    madeBy: Object,
    totalTracks: Number,
    firstTrack: String,
  },
  components: {
    BackButton
  }
}
</script>

<style lang="scss">
@import '~@/scss/variables';
@import '~@/scss/base/breakpoints';
@import '~@/scss/base/mixins/rem';

.overview-playlist {  
  .bg {
    padding: rem(44px) 0 0;
    background-color: $light-blue;
    color: $white;
  }

  .text-32 {
    display: inline-block;
    padding-bottom: rem(12px);
  }

  .back-button-container {
    height: 100%;
    padding-right: rem(32px);
  }

  .buttons-right-container {
    padding-left: rem(24px);

    button:last-of-type {
      margin-left: rem(8px);
    }
  }

  .play {
    top: rem(20px);
    right: (150px);
  }
}

.play__large {
  width: rem(76px);
  height: rem(76px);

  svg {
    transform: translate(-50%, -50%) scale(1.3);
  }
}

.spacer {
  width: rem(8px);
  height: rem(8px);
  background-color: $white;
  display: inline-block;
  border-radius: 50%;
  margin: 0 rem(8px);
}
</style>