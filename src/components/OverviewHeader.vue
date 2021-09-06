<template>
  <section class="row overview-header">
    <div class="bg">
      <div class="container">
        <div class="d-flex-center">
          <div class="avatar-container">
            <img src="~@/assets/svg/avatar_rounded.svg" alt="Avatar small">
          </div>
          <div class="ta-left relative">
            <h1 class="text-40 bold relative">
              <div class="icon-container absolute">
                <img src="~@/assets/svg/moon.svg" alt="Moon">
              </div>
              <template v-if="daytime === 'evening'">
                Goedenavond
              </template>
              {{name}},
            </h1>
            <h2 class="text-24">
              {{ message }}
            </h2>
          </div>
        </div>
      </div>
    </div>
    <div class="section-bg relative">
      <img src="~@/assets/svg/section_header_1.svg" alt="header shape">
      <div class="absolute search-bar-container">
        <SearchBar/>
      </div>
    </div>
  </section>
</template>

<script>
import SearchBar from '@/components/SearchBar.vue'

export default {
  name: 'OveriewHeader',
  props: {
    daytime: String,
    name: String,
    message: String
  },
  components: {
    SearchBar
  }
}
</script>

<style lang="scss">
@import '~@/scss/variables';
@import '~@/scss/base/breakpoints';
@import '~@/scss/base/mixins/rem';

.overview-header {  
  .bg {
    padding: rem(44px) 0 rem(54px);
    background-color: $light-blue;
    color: $white;

    .avatar-container {
      margin-right: rem(32px);
    }
  }

  .text-40 {
    display: inline-block;
    padding-bottom: rem(4px);
  }

  .icon-container {
    top: rem(-16px);
    right: rem(-82px);
  }

  .search-bar-container {
    width: 100%;
    max-width: rem(500px);
    left: 50%;
    top: -50%;
    transform: translateX(-50%);
  }
}

.avatar-container {
  border-radius: 50%;
  border: solid 2px $dark-blue;
}

.section-bg {
  width: 100%;

  img {
    position: relative;
    width: 100%;
    top: -4px;
    z-index: -1;
  }
}

</style>