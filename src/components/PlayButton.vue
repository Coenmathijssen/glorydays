<template>
  <button 
    class="button-play"
    :class="{ playing: playing }"
    @click="playing = !playing"
  >
    <svg width="15" height="17" xmlns="http://www.w3.org/2000/svg"><path d="M.563 16.296l13.339-7.413c.311-.171.311-.452 0-.623L.562.847C.253.677 0 .827 0 1.18v14.785c0 .352.251.503.563.332z" fill="#FFF" fill-rule="nonzero"/></svg>
    <svg width="12" height="15" xmlns="http://www.w3.org/2000/svg"><path d="M12 14.584V.616H8.016v13.968H12zm-8.016 0V.616H0v13.968h3.984z" fill="#FFF" fill-rule="nonzero"/></svg>
  </button>
</template>

<script>
export default {
  name: 'PlayButton',
  data () {
    return {
      playing: false
    }
  }
}
</script>

<style lang="scss">
@import '~@/scss/base/mixins/rem';
@import '~@/scss/variables';

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
</style>