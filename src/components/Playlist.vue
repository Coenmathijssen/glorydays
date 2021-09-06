<template>
  <article class="relative playlist" :id="id">
    <div class="text-18 bold ff-mulish absolute ta-left">
      {{ title }}
    </div>
    <button class="play js-play">
      <svg class="js-play-icon" width="15" height="17" xmlns="http://www.w3.org/2000/svg"><path d="M.563 16.296l13.339-7.413c.311-.171.311-.452 0-.623L.562.847C.253.677 0 .827 0 1.18v14.785c0 .352.251.503.563.332z" fill="#FFF" fill-rule="nonzero"/></svg>
      <svg class="js-play-pause hide" width="12" height="15" xmlns="http://www.w3.org/2000/svg"><path d="M12 14.584V.616H8.016v13.968H12zm-8.016 0V.616H0v13.968h3.984z" fill="#FFF" fill-rule="nonzero"/></svg>
    </button>
  </article>
</template>

<script>
export default {
  name: 'Playlist',
  props: {
    addedBy: String,
    title: String,
    id: String
  }
}
</script>

<style lang="scss">
@import '~@/scss/variables';
@import '~@/scss/base/breakpoints';
@import '~@/scss/base/mixins/rem';

.playlist {
  flex-shrink: 0;
  width: rem(210px);
  min-height: rem(165px);
  border: solid 2px $almost-white;
  border-radius: 22px;

  .text-18 {
    left: rem(20px);
    right: rem(20px);
    bottom: rem(40px);
    color: $black;
    font-weight: 600;
  }
}

.play {
  position: absolute;
  bottom: rem(-16px);
  right: rem(20px);
  width: rem(50px);
  height: rem(50px);
  background-color: $orange;
  border-radius: 50%;

  svg {
    position: absolute;
    top: 50%;
    left: calc(50% + 2px);
    transform: translate(-50%, -50%);
  }
}

.hide {
  opacity: 0;
  pointer-events: none;
}
</style>