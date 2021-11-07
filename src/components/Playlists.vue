<template>
  <section class="row playlists">
    <div class="container">
      <div class="playlist-section">
        <h3 class="text-28">
          Ontspannen lijsten samengesteld door de familie
        </h3>
        <div v-if="personalPlaylists && personalPlaylists.length > 0">
          <div class="swiper-container overflow" ref="swiper">
            <div class="swiper-wrapper">
              <div v-for="(playlist, index) in personalPlaylists" class="swiper-slide" :key="`personal-playlist-${index}`">
                <PlaylistCard 
                  :id="playlist.id"
                  :title="playlist.title"
                  :addedBy="playlist.madeBy"
                  :totalTracks="playlist.totalTracks"
                /> 
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="playlist-section">
        <h3 class="text-28">
          Lijsten om tot rust te komen
        </h3>
        <div v-if="easyPlaylists && easyPlaylists.length > 0">
          <div class="swiper-container overflow" ref="swiper">
            <div class="swiper-wrapper">
              <div v-for="(playlist, index) in easyPlaylists" class="swiper-slide" :key="`easy-playlist-${index}`">
                <PlaylistCard 
                  :id="playlist.id"
                  :title="playlist.title"
                  :addedBy="playlist.madeBy"
                  :totalTracks="playlist.totalTracks"
                  :firstTrack="playlist.firstTrack"
                /> 
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="playlist-section">
        <h3 class="text-28">
          Ontdek nummers van vroeger
        </h3>
        <div v-if="nostalgicPlaylists && nostalgicPlaylists.length > 0">
          <div class="swiper-container overflow" ref="swiper">
            <div class="swiper-wrapper">
              <div v-for="(playlist, index) in nostalgicPlaylists" class="swiper-slide" :key="`easy-playlist-${index}`">
                <PlaylistCard 
                  :id="playlist.id"
                  :title="playlist.title"
                  :addedBy="playlist.madeBy"
                  :totalTracks="playlist.totalTracks"
                  :firstTrack="playlist.firstTrack"
                /> 
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import getUserData from '@/spotify/getUserData'
import getPlaylist from '@/spotify/getPlaylist'
import Swiper from 'swiper'
import 'swiper/swiper-bundle.css'
import PlaylistCard from '@/components/PlaylistCard'

export default {
  name: 'Playlists',
  components: {
    PlaylistCard
  },
  data () {
    return {
      swiper: null,
      getEasyPlaylistIds: [
        '6oEd1r7LcJQ8Lq3ce7YCk3',
        '2LwOuPd0DUM6AeBzz7ctvC',
        '37i9dQZF1DWWEJlAGA9gs0',
        '37i9dQZF1DWVFeEut75IAL',
        '37i9dQZF1DX12YIlzNkccL'
      ],
      nostalgicPlaylistIds: [
        '37i9dQZF1DWSV3Tk4GO2fq',
        '7e7IEx9Z5qug0dHBI2kpxx',
        '37i9dQZF1DXaKIA8E7WcJj',
        '0McePZOD9X80f9KieKR50c',
        '1NySUOZCuT0uPVKROgqLD8',
        '2lzlKXRKODwRS9MRXTV0m8'
      ],
      promiseArray: []
    }
  },
  computed: {
    ...mapState(['accessToken', 'personalPlaylists', 'easyPlaylists', 'nostalgicPlaylists'])
  },
  watch: {
    '$store.state.accessToken': function handler() {
      this.getPersonalPlaylists()
      this.getEasyPlaylists()
      this.getNostalgicPlaylists()
    }
  },
  created () {
    if (this.easyPlaylists.length > 0) {
      setTimeout(() => {
        this.initSwiper()
      }, 50)
    }
  },
  methods: {
    getPersonalPlaylists () {
      this.promiseArray.push(new Promise(resolve => {
        getUserData.methods.getPlaylists().then(playlists => {
          this.$store.commit('setPersonalPlaylists', playlists)
          resolve()
        })
      }))
    },
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
    getEasyPlaylists () {
      for (let i = 0; i < this.getEasyPlaylistIds.length; i++) {
        this.promiseArray.push(new Promise(resolve => {
          getPlaylist.methods.playlist(this.getEasyPlaylistIds[i]).then(playlist => {
            this.$store.commit('setEasyPlaylists', playlist)
            resolve()
          })
        }))
      }
    },
    getNostalgicPlaylists () {
      for (let i = 0; i < this.nostalgicPlaylistIds.length; i++) {
        this.promiseArray.push(new Promise(resolve => {
          getPlaylist.methods.playlist(this.nostalgicPlaylistIds[i]).then(playlist => {
            this.$store.commit('setNostalgicPlaylists', playlist)
            resolve()
          })
        }))
      }

      Promise.all(this.promiseArray).then(() => {
        this.initSwiper()
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
  padding: rem(15px) 0 rem(50px);

  .playlist-section {
    margin-top: rem(55px);
  }

  .swiper-container {
    width: 100%;
    height: 100%;
  }

  .text-28 {
    margin-bottom: rem(18px);
    font-weight: 500;
    color: $black;
  }
}
</style>