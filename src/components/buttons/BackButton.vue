<template>
  <router-link v-if="url" :to="url" class="d-flex-center align-items-center back-button">
    <svg width="13" height="21" xmlns="http://www.w3.org/2000/svg"><path fill="#FFF" fill-rule="nonzero" d="M10.36 20.12l2.36-2.32-7.68-7.68 7.68-7.64L10.36.12l-10 10z"/></svg>
  </router-link>
  <button v-else class="d-flex-center align-items-center back-button">
     <svg width="13" height="21" xmlns="http://www.w3.org/2000/svg"><path fill="#FFF" fill-rule="nonzero" d="M10.36 20.12l2.36-2.32-7.68-7.68 7.68-7.64L10.36.12l-10 10z"/></svg>
  </button>
</template>

<script>
export default {
  name: 'BackButton',
  props: {
    url: String
  }
}
</script>

<style lang="scss" scoped>
@import '~@/scss/base/mixins/rem';

.back-button {
  width: rem(32px);
  height: rem(32px);
}

</style>