<template>
  <transition name="fade">
    <div v-if="addMemory" class="add-memory">
      <button class="close d-flex-center align-items-center" @click="close">
        <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg"><path fill="#FFF" fill-rule="nonzero" d="m21.28 23.64 2.36-2.36L14.36 12l9.28-9.28L21.28.36 12 9.64 2.72.36.36 2.72 9.64 12 .36 21.28l2.36 2.36L12 14.36z"/></svg>
      </button>
      <div class="text-20 bold tt-gt">
        Herinnering bij nummer
      </div>
      <div v-if="currentPlayingSong" class="song d-flex align-items-center">
        <svg id="Bold" enable-background="new 0 0 24 24" height="512" viewBox="0 0 24 24" width="512" xmlns="http://www.w3.org/2000/svg"><path d="m12 24c6.624 0 12-5.376 12-12s-5.376-12-12-12-12 5.376-12 12 5.376 12 12 12zm4.872-6.344v.001c-.807 0-3.356-2.828-10.52-1.36-.189.049-.436.126-.576.126-.915 0-1.09-1.369-.106-1.578 3.963-.875 8.013-.798 11.467 1.268.824.526.474 1.543-.265 1.543zm1.303-3.173c-.113-.03-.08.069-.597-.203-3.025-1.79-7.533-2.512-11.545-1.423-.232.063-.358.126-.576.126-1.071 0-1.355-1.611-.188-1.94 4.716-1.325 9.775-.552 13.297 1.543.392.232.547.533.547.953-.005.522-.411.944-.938.944zm-13.627-7.485c4.523-1.324 11.368-.906 15.624 1.578 1.091.629.662 2.22-.498 2.22l-.001-.001c-.252 0-.407-.063-.625-.189-3.443-2.056-9.604-2.549-13.59-1.436-.175.048-.393.125-.625.125-.639 0-1.127-.499-1.127-1.142 0-.657.407-1.029.842-1.155z"/></svg>
        <div class="song__name">
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
      <div class="text-40 tt-gt bold">
        Wat wil jij of Kees vertellen?
      </div>
      <div class="text-24 tt-gt bold">
        Geef deze herinnering een titel
      </div>
      <input v-model="memory.title" class="title" type="text" placeholder="Bijv. bruiloft in Spanje">

      <div class="text-24 text-24__second tt-gt bold i">
        Voeg audio, beeld of tekst toe. Zoveel als jullie willen
      </div>
      <div v-for="(input, index) in memory.bits" :key="`bit-${index}`">
        <template v-if="input.type === 'text'">
          <div class="bit">
            <textarea v-model="input.value" rows="4" placeholder="Voeg een tekst toe">
            </textarea>        
            <button class="d-flex-column align-items-center justify-content-between delete" @click="removeBit(index)">
              <svg width="24" height="30" xmlns="http://www.w3.org/2000/svg"><path d="M23.64 5V1.64h-5.76L16.16 0H7.88L6.16 1.64H.36V5h23.28zm-5 25c.907 0 1.693-.333 2.36-1 .667-.667 1-1.453 1-2.36v-20H2v20c0 .907.333 1.693 1 2.36.667.667 1.453 1 2.36 1h13.28z" fill="#FFF" fill-rule="nonzero"/></svg>
            </button>
          </div>
        </template>
        <template v-if="input.type === 'image'">
          <div class="bit bit__image">
            <img :src="input.url" alt="">
            <button class="d-flex-column align-items-center justify-content-between delete" @click="removeBit(index)">
              <svg width="24" height="30" xmlns="http://www.w3.org/2000/svg"><path d="M23.64 5V1.64h-5.76L16.16 0H7.88L6.16 1.64H.36V5h23.28zm-5 25c.907 0 1.693-.333 2.36-1 .667-.667 1-1.453 1-2.36v-20H2v20c0 .907.333 1.693 1 2.36.667.667 1.453 1 2.36 1h13.28z" fill="#FFF" fill-rule="nonzero"/></svg>
            </button>
          </div>
        </template>
      </div>
      <div class="buttons d-flex-between">
        <button class="d-flex-column align-items-center justify-content-between" @click="addText()">
          <svg width="50" height="45" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="m16.1 29.95 2.35-6.25h13.1l2.25 6.25h4.7L27.05.75h-4.1l-11.5 29.2h4.65ZM20 19.5l5-13.2 5 13.2H20Zm30 16.7v8.3H0v-8.3h50Z" fill="#fff"/></svg>
          <span class="text-16 bold">
            Tekst toevoegen
          </span>
        </button>
        <button class="d-flex-column align-items-center justify-content-between">
          <svg width="42" height="39" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M37.7 38.2c1.133 0 2.1-.417 2.9-1.25.8-.833 1.2-1.817 1.2-2.95V9c0-1.133-.4-2.116-1.2-2.95-.8-.833-1.767-1.25-2.9-1.25h-6.65L27.25.7h-12.5l-3.8 4.1H4.3c-1.133 0-2.1.417-2.9 1.25C.6 6.884.2 7.867.2 9v25c0 1.133.4 2.117 1.2 2.95.8.833 1.767 1.25 2.9 1.25h33.4ZM21 31.95c-1.9 0-3.65-.466-5.25-1.4-1.6-.933-2.867-2.2-3.8-3.8-.933-1.6-1.4-3.35-1.4-5.25s.467-3.65 1.4-5.25c.933-1.6 2.2-2.867 3.8-3.8 1.6-.933 3.35-1.4 5.25-1.4s3.65.467 5.25 1.4c1.6.934 2.867 2.2 3.8 3.8.933 1.6 1.4 3.35 1.4 5.25s-.467 3.65-1.4 5.25c-.933 1.6-2.2 2.867-3.8 3.8-1.6.933-3.35 1.4-5.25 1.4Zm3.325-4.7c-1.017.6-2.125.9-3.325.9-1.2 0-2.308-.3-3.325-.9a6.763 6.763 0 0 1-2.425-2.425 6.425 6.425 0 0 1-.9-3.325c0-1.2.3-2.308.9-3.325a6.763 6.763 0 0 1 2.425-2.425c1.017-.6 2.125-.9 3.325-.9 1.2 0 2.308.3 3.325.9a6.764 6.764 0 0 1 2.425 2.425c.6 1.017.9 2.125.9 3.325 0 1.2-.3 2.308-.9 3.325a6.764 6.764 0 0 1-2.425 2.425Z" fill="#fff"/></svg>
          <span class="text-16 bold">
            Beeld toevoegen
          </span>
          <input type="file" accept="image/*" @change="uploadImage">
        </button>
        <button class="d-flex-column align-items-center justify-content-between">
          <svg width="30" height="41" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M18.1 24.85c-.967.567-2 .85-3.1.85s-2.133-.283-3.1-.85a6.34 6.34 0 0 1-2.3-2.3 6.03 6.03 0 0 1-.85-3.1V6.95c0-1.1.283-2.133.85-3.1a6.34 6.34 0 0 1 2.3-2.3c.967-.566 2-.85 3.1-.85s2.133.284 3.1.85a6.341 6.341 0 0 1 2.3 2.3c.567.967.85 2 .85 3.1v12.5a6.03 6.03 0 0 1-.85 3.1 6.341 6.341 0 0 1-2.3 2.3Zm-1.05 8.55v6.85h-4.1V33.4a14.24 14.24 0 0 1-6.275-2.425C4.758 29.658 3.25 28.017 2.15 26.05a13.52 13.52 0 0 1-1.7-6.6h3.5c0 2.034.533 3.867 1.6 5.5 1 1.567 2.342 2.8 4.025 3.7C11.258 29.55 13.067 30 15 30c1.933 0 3.742-.45 5.425-1.35 1.683-.9 3.025-2.133 4.025-3.7 1.067-1.633 1.6-3.466 1.6-5.5h3.5a13.52 13.52 0 0 1-1.7 6.6c-1.1 1.967-2.608 3.608-4.525 4.925A14.241 14.241 0 0 1 17.05 33.4Z" fill="#fff"/></svg>
          <span class="text-16 bold">
            Audio toevoegen
          </span>
        </button>
      </div>
      <div class="d-flex-end button-container">
        <button class="button__orange text-28" @click="saveMemory">
          Herinnering opslaan
        </button>
      </div>
    </div>
  </transition>
</template>

<script>
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import db from '@/js/firebase/firebase_init.js'
import { collection, addDoc } from 'firebase/firestore/lite'
import { mapState } from 'vuex'
import Swiper from 'swiper'
import 'swiper/swiper-bundle.css'

export default {
  name: 'AddMemory',
  data () {
    return {
      swiper: null,
      memory: {
        title: null,
        coverPhoto: null,
        bits: []
      }
    }
  },
  computed: {
    ...mapState(['isPlaying', 'currentPlayingSong', 'addMemory'])
  },
  methods: {
    initSwiper () {
      if (this.swiper) return

      const swiperContainers = document.querySelectorAll('.swiper-container')
      swiperContainers.forEach(container => {
        new Swiper(container, {
          slidesPerView: 3,
          spaceBetween: 20,
        })
      })

      this.swiper = true
    },  
    close () {
      this.$store.commit('setAddMemory', false)
    },
    addText () {
      this.memory.bits.push({ 
        value: '',
        type: 'text'
      })
      
    },
    removeBit(index) {
      this.memory.bits.splice(index, 1)
    },
    uploadImage (event) {
      const input = event.currentTarget

      if (input.files) {
        this.image = input.files[0]
      }

      const storage = getStorage()

      // Create the file metadata
      const metadata = {
        contentType: 'image/jpeg'
      };

      const storageRef = ref(storage, 'images/' + this.image.name)
      const uploadTask = uploadBytesResumable(storageRef, this.image, metadata)

      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          console.log('Upload is ' + progress + '% done')
        }, 
        (error) => {
          console.log('error uploading: ', error)
        }, 
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            this.memory.bits.push({ 
              url: downloadURL,
              type: 'image'
            })
          })
        }
      )
    },
     saveMemory () {
      addDoc(collection(db, 'memories'), this.memory).then(() => {
        console.log('memory saved')
        this.close()
        this.memory.bits = []
      })
      .catch(err => {
        console.log('error saving memory: ', err)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/scss/variables';
@import '~@/scss/base/breakpoints';
@import '~@/scss/base/mixins/rem';

.add-memory {
  position: fixed;
  top: 0.5rem;
  left: 0.5rem;
  height: calc(100vh - 1rem);
  width: calc(100% - 1rem);
  padding: rem(42px) rem(82px) rem(80px);
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

  .song {
    padding: rem(18px) rem(30px);
    margin-top: rem(8px);
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

  .text-24 {
    padding-top: rem(40px);

    &__second {
      padding-top: rem(60px);
    }
  }

  .title {
    padding: rem(18px) rem(14px);
    border-bottom: solid 2px $black;
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

  .delete {
    position: absolute;
    top: 0;
    right: 0;
    background: $dark-blue;
    padding: 8px;
    border-radius: 10px;

    svg {
      transform: scale(0.8);
    }
  }

  .buttons {
    padding-top: rem(40px);

    button {
      position: relative;
      padding: rem(25px) 0 rem(25px);
      min-height: rem(120px);
      width: 33%;
      border-radius: 10px;
      background-color: $light-blue;

      span {
        padding-top: rem(16px);
        color: $white;
      }

      &:first-of-type {
        span {
          padding-top: rem(8px);
        }
      }

      input {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        padding: 0;
        opacity: 0;
      }
    }
  }

  .button-container {
    padding-top: rem(64px);
  }

  .button {
    &__orange {
      padding: rem(16px) rem(60px);
    }
  }
}
</style>