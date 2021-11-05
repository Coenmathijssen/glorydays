<template>
  <div class="memories-grid">
    <div class="container">
      <div v-if="memories" class="d-flex flex-wrap">
        <div v-for="(memory, index) in memories" :key="`row-${index}`" class="memory">
          <span class="text-12">
            Door: zus Tineke
          </span>
          <template v-if="index % 2 == 0 || index % 5== 0">
            <div class="d-flex align-items-center avatar-container">
              <img src="~@/assets/svg/avatars/male_white/happy.svg" alt="Happy">
              <span class="text-14">
                Gelukkig
              </span>
            </div>
          </template>
          <template v-else-if="index % 3 == 0">
             <div class="d-flex align-items-center avatar-container">
              <img src="~@/assets/svg/avatars/male_white/bored.svg" alt="Happy">
              <span class="text-14">
                Verveeld
              </span>
            </div>
          </template>
          <div class="text-18 bold">
            {{ memory.title }}
          </div>
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
  mounted () {
    // if (!this.memories) {

    // }
    this.getMemories().then(memories => {
      this.$store.commit('setMemories', memories)
    })
  },
  methods: {
    async getMemories () {
      const querySnapshot = await getDocs(collection(db, 'memories'))
      const data = []
      querySnapshot.forEach((doc) => {
        data.push(doc.data())
      });
      return data
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