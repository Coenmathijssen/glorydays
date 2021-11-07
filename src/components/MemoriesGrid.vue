<template>
  <div class="memories-grid">
    <div class="container">
      <div v-if="data" class="d-flex flex-wrap">
        <div v-for="(memory, index) in data" :key="`row-${index}`" class="memory">
          <router-link :to="{ name: 'Memory', params: { memory: memory }}" >
            <span class="text-12">
              Door: zus Tineke
            </span>
            <template v-if="memory.song.emotion >= 0 && memory.song.emotion <= 0.2">
              <div class="d-flex align-items-center avatar-container">
                <img src="~@/assets/svg/avatars/emotions/0.svg" alt="Horrible">
                <span class="text-14">
                  Veschrikkelijk
                </span>
              </div>
            </template>
            <template v-else-if="memory.song.emotion >= 0.3 && memory.song.emotion <= 0.4">
              <div class="d-flex align-items-center avatar-container">
                <img src="~@/assets/svg/avatars/emotions/1.svg" alt="Bad">
                <span class="text-14">
                  Matig
                </span>
              </div>
            </template>
            <template v-else-if="memory.song.emotion >= 0.5 && memory.song.emotion <= 0.6">
              <div class="d-flex align-items-center avatar-container">
                <img src="~@/assets/svg/avatars/emotions/2.svg" alt="Neutral">
                <span class="text-14">
                  Neutraal
                </span>
              </div>
            </template>
            <template v-else-if="memory.song.emotion >= 0.7 && memory.song.emotion <= 0.8">
              <div class="d-flex align-items-center avatar-container">
                <img src="~@/assets/svg/avatars/emotions/3.svg" alt="Happy">
                <span class="text-14">
                  Blij
                </span>
              </div>
            </template>
            <template v-else-if="memory.song.emotion >= 0.9">
              <div class="d-flex align-items-center avatar-container">
                <img src="~@/assets/svg/avatars/emotions/4.svg" alt="Amazing">
                <span class="text-14">
                  Geweldig
                </span>
              </div>
            </template>
            <div class="text-18 bold">
              {{ memory.title }}
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import db from '@/js/firebase/firebase_init.js'
import { collection, getDocs } from 'firebase/firestore/lite';

export default {
  name: 'MemoriesGrid',
  computed: {
    ...mapState(['memories'])
  },
  data () {
    return {
      data: null
    }
  },
  mounted () {
    this.getMemories().then(memories => {
      this.$store.commit('setMemories', memories)
      this.getEmotions()
    })
  },
  methods: {
    async getMemories () {
      const querySnapshot = await getDocs(collection(db, 'memories'))
      const data = []
      querySnapshot.forEach((doc) => {
        data.push(doc.data())
      })
      return data
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
      this.memories.forEach(memory => {
        this.emotions.forEach(emotion => {
          if (memory.song.found) return
          
          if (memory.song.id === emotion.Track_ID) {
            memory.song.emotion = Math.round(emotion.RNN * 10) / 10
            memory.song.found = true
          } else {
            memory.song.emotion = 'none'
          }
        })
      })
      console.log(this.memories)
      this.data = this.memories
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/scss/variables';
@import '~@/scss/base/breakpoints';
@import '~@/scss/base/mixins/rem';

.memories-grid {
  padding: rem(70px) 0 rem(50px);

  .memory {
    position: relative;
    margin: rem(12px) rem(16px) rem(12px) 0;
    width: calc(33% - 16px);
    min-height: rem(164px);
    background-color: $white;
    border: solid 2px $almost-white;
    border-radius: 20px;

    &:nth-of-type(3n) {
      margin-right: 0;
    }

    .text-12 {
      position: absolute;
      top: rem(-14px);
      left: 50%;
      transform: translateX(-50%);
      padding: rem(6px) rem(14px);
      background-color: $very-light-blue;
      border-radius: 4px;
    }

    .avatar-container {
      position: absolute;
      top: rem(32px);
      left: rem(28px);

      img {
        max-width: rem(40px);
      }
    }

    .text-14 {
      padding-left: rem(8px);
    }

    .text-18 {
      position: absolute;
      bottom: rem(28px);
      left: rem(28px);
    }
  }
}
</style>