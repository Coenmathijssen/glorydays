<template>
  <button class="text-16 button button__orange">
    {{ name }}
  </button>
</template>

<script>
export default {
  name: 'OrangeButton',
  props: {
    name: String
  }
}
</script>

<style lang="scss">
@import '~@/scss/variables';
@import '~@/scss/base/breakpoints';
@import '~@/scss/base/mixins/rem';

.button {
  &__orange {
    padding: rem(8px) rem(26px);
    background-color: $orange;
    color: $white;
    border-radius: 50px;
    font-weight: 700;
  }
}
</style>