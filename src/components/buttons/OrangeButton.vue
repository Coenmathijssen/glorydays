<template>
  <button class="text-16">
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

<style lang="scss" scoped>
@import '~@/scss/variables';
@import '~@/scss/base/breakpoints';
@import '~@/scss/base/mixins/rem';

button {
  padding: rem(8px) rem(26px);
  background-color: $orange;
  color: $white;
  border-radius: 50px;
  font-weight: 700;
}
</style>