<template>
  <section class="memory">
    <router-link class="close d-flex-center align-items-center" to="/memories">
      <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg"><path fill="#FFF" fill-rule="nonzero" d="m21.28 23.64 2.36-2.36L14.36 12l9.28-9.28L21.28.36 12 9.64 2.72.36.36 2.72 9.64 12 .36 21.28l2.36 2.36L12 14.36z"/></svg>
    </router-link>
    <span class="text-12">
      Door: zus Tineke
    </span>
    <div v-if="memory.title" class="text-40 tt-gt extrabold">
      {{ memory.title }}
    </div>
    <div class="text-24 extrabold tt-gt">
      Nummer
    </div>
    <div v-if="memory.song" class="song d-flex align-items-center">
      <svg id="Bold" enable-background="new 0 0 24 24" height="512" viewBox="0 0 24 24" width="512" xmlns="http://www.w3.org/2000/svg"><path d="m12 24c6.624 0 12-5.376 12-12s-5.376-12-12-12-12 5.376-12 12 5.376 12 12 12zm4.872-6.344v.001c-.807 0-3.356-2.828-10.52-1.36-.189.049-.436.126-.576.126-.915 0-1.09-1.369-.106-1.578 3.963-.875 8.013-.798 11.467 1.268.824.526.474 1.543-.265 1.543zm1.303-3.173c-.113-.03-.08.069-.597-.203-3.025-1.79-7.533-2.512-11.545-1.423-.232.063-.358.126-.576.126-1.071 0-1.355-1.611-.188-1.94 4.716-1.325 9.775-.552 13.297 1.543.392.232.547.533.547.953-.005.522-.411.944-.938.944zm-13.627-7.485c4.523-1.324 11.368-.906 15.624 1.578 1.091.629.662 2.22-.498 2.22l-.001-.001c-.252 0-.407-.063-.625-.189-3.443-2.056-9.604-2.549-13.59-1.436-.175.048-.393.125-.625.125-.639 0-1.127-.499-1.127-1.142 0-.657.407-1.029.842-1.155z"/></svg>
      <div class="song__name">
        <span class="text-16 extrabold">
          {{memory.song.name }}
        </span>
        <span class="text-16">
          <span v-for="(artist, index) in memory.song.artists" :key="`col-1-artist-${index}`">
            <span>
              {{ artist.name }}<template v-if="index !== memory.song.artists.length - 1">,</template>
            </span>
          </span>
        </span>
      </div>
    </div>
    <div v-if="memory.song && memory.song.found">
      <div class="text-24 extrabold tt-gt">
        Emoties
      </div>
      <div class="bit bit__emotion">
        <div class="d-flex align-items-center w-full">
          <div>
            <template v-if="memory.song.emotion >= 0 && memory.song.emotion <= 0.2">
              <div class="d-flex align-items-center avatar-container">
                <img src="~@/assets/svg/avatars/emotions/0.svg" alt="Horrible">
              </div>
            </template>
            <template v-else-if="memory.song.emotion >= 0.3 && memory.song.emotion <= 0.4">
              <div class="d-flex align-items-center avatar-container">
                <img src="~@/assets/svg/avatars/emotions/1.svg" alt="Bad">
              </div>
            </template>
            <template v-else-if="memory.song.emotion >= 0.5 && memory.song.emotion <= 0.6">
              <div class="d-flex align-items-center avatar-container">
                <img src="~@/assets/svg/avatars/emotions/2.svg" alt="Neutral">
              </div>
            </template>
            <template v-else-if="memory.song.emotion >= 0.7 && memory.song.emotion <= 0.8">
              <div class="d-flex align-items-center avatar-container">
                <img src="~@/assets/svg/avatars/emotions/3.svg" alt="Happy">
              </div>
            </template>
            <template v-else-if="memory.song.emotion >= 0.9">
              <div class="d-flex align-items-center avatar-container">
                <img src="~@/assets/svg/avatars/emotions/4.svg" alt="Amazing">
              </div>
            </template>
          </div>
          <div>
            <p class="text-24 bold tt-gt emotion-title">
              Kees voelde zich het vaakst
              <template v-if="memory.song.emotion >= 0 && memory.song.emotion <= 0.2">
                <span class="horrible">
                  Verschrikkelijk
                </span>
              </template>
              <template v-if="memory.song.emotion >= 0.3 && memory.song.emotion <= 0.4">
                <span class="bad">
                  Matig
                </span>
              </template>
              <template v-if="memory.song.emotion >= 0.5 && memory.song.emotion <= 0.6">
                <span class="neutral">
                  Neutraal
                </span>
              </template>
              <template v-if="memory.song.emotion >= 0.7 && memory.song.emotion <= 0.8">
                <span class="happy">
                  Blij
                </span>
              </template>
              <template v-if="memory.song.emotion >= 0.9">
                <span class="amazing">
                  Geweldig
                </span>
              </template>
              bij dit nummer,
            </p>
            <p class="text-16">
              In totaal heeft Glory Days 6x de emotie gemeten bij dit nummer
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="text-24 text-24__second tt-gt extrabold">
      Herinnering
    </div>
    <div v-for="(input, index) in memory.bits" :key="`bit-${index}`" :class="`bits-${index}`">
      <template v-if="input.type === 'text'">
        <div class="bit">
          <p class="text-20">
            {{ input.value }}
          </p>   
        </div>
      </template>
      <template v-if="input.type === 'image'">
        <div class="bit bit__image">
          <img :src="input.url" alt="memory image">
        </div>
      </template>
      <template v-if="input.type === 'audio'">
        <div class="bit bit__audio">
          <audio :src="input.url" controls class="audio" ref="audio"></audio>
        </div>
      </template>
    </div>
  </section> 
</template>

<script>
export default {
  name: 'AddMemory',
  props: {
    memory: Object
  },
  data () {
    return {
      song: null
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/scss/variables';
@import '~@/scss/base/breakpoints';
@import '~@/scss/base/mixins/rem';

.memory {
  position: fixed;
  top: 0.5rem;
  left: 0.5rem;
  height: calc(100vh - 1rem);
  width: calc(100% - 1rem);
  padding: rem(60px) rem(82px) rem(80px);
  box-sizing: border-box;
  overflow-y: scroll;
  background-color: $white;
  border: solid 8px $almost-white;
  border-radius: 22px;
  z-index: 999;

  .close {
    position: fixed;
    top: rem(24px);
    right: rem(24px);
    width: rem(50px);
    height: rem(50px);
    background-color: $orange;
    border-radius: 10px;
  }

  .text-12 {
    display: inline-block;
    padding: rem(6px) rem(14px);
    background-color: $very-light-blue;
    border-radius: 4px;
  }

  .text-40 {
    padding: rem(16px) 0 rem(40px) 0;
    color: $orange;
  }

  .song {
    padding: rem(18px) rem(30px);
    margin-top: rem(16px);
    margin-bottom: rem(68px);
    width: fit-content;
    background-color: $almost-white;
    border-radius: 10px;

    svg {
      width: rem(38px);
      height: rem(38px);
      padding-right: rem(18px);
    }

    .text-16 {
      display: block;
      line-height: 1.4;
    }
  }

  input, textarea {
    padding: rem(10px);
    width: 100%;
    border: none;
    box-sizing: border-box;
    background-color: transparent;
    font-size: rem(20px);
    font-family: 'Mulish', Helvetica, Arial, "Lucida Grande", sans-serif;
    font-weight: 500;
  }

  .bit {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: rem(40px);
    padding: rem(20px) rem(24px);
    background-color: $almost-white;
    border-radius: 10px;

    &::after {
      content: '';
      position: absolute;
      bottom: rem(-15px);
      left: rem(40px);
      transform: rotate(45deg);
      width: rem(30px);
      height: rem(30px);
      background-color: $almost-white;
    }

    img {
      max-width: 100%;
      border-radius: 10px;
    }
  }
  
  .w-full {
    width: 100%;
  }

  .bit__emotion {
    margin-top: rem(16px);
    margin-bottom: rem(68px);
    padding-left: rem(50px);

    img {
      padding-right: rem(50px);
    }
  }

  .emotion-title {
    max-width: rem(380px);
    margin-bottom: rem(16px);
  }

  .bits-0 > div:first-of-type {
    margin-top: rem(16px);
  }

  .horrible {
    color: #E2673B;
  }

  .bad {
    color: #DB8F70;
  }

  .neutral, .happy {
    color: #7EBDB2;
  }

  .amazing {
    color: #7EBDB2;
  }

  audio {
    width: 100%;
  }
}
</style>