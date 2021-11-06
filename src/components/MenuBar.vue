<template>
  <nav class="d-flex-around">
    <router-link class="link d-flex-center align-items-center" to="/memories">
      <div class="d-flex align-items-center">
        <svg width="30" height="31" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m27.984 30.125-1.547-6.188c0-.328.094-.68.282-1.054 0-.047.023-.094.07-.14l.14-.141c1.548-2.297 2.321-4.829 2.321-7.594 0-3.89-1.43-7.219-4.29-9.985C22.103 2.258 18.657.875 14.626.875c-4.031 0-7.477 1.383-10.336 4.148C1.43 7.79 0 11.117 0 15.008c0 3.89 1.43 7.207 4.29 9.949 2.858 2.742 6.304 4.113 10.335 4.113 2.063 0 3.96-.351 5.695-1.054.047 0 .07-.012.07-.035 0-.024.024-.036.07-.036.376-.093.634-.14.774-.14.375 0 .657.047.844.14l5.906 2.18Z" fill="#25333A"/></svg>
        <span class="text-18 bold">Herinneringen</span>
      </div>
    </router-link>
    <router-link class="link d-flex-center align-items-center" to="/">
      <div class="d-flex align-items-center">
        <svg width="23" height="27" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 23.063c0 2.109 1.477 3.093 4.43 2.953.843-.047 1.523-.223 2.039-.528.515-.304.867-.785 1.054-1.441.188-.656.305-1.207.352-1.652.047-.446.07-1.067.07-1.864V8.86l13.43-2.25v11.25c-.188 0-.41.012-.668.035a29.095 29.095 0 0 1-2.355.106c-2.438.094-3.657 1.055-3.657 2.883 0 2.062 1.453 3.023 4.36 2.883 1.265-.047 2.18-.47 2.742-1.266.469-.703.703-2.203.703-4.5V.984L6.75 3.445V20.11c-.984 0-2.016.024-3.094.07C1.22 20.274 0 21.235 0 23.064Z" fill="#25333A"/></svg>
        <span class="text-18 bold">Muziek</span>
      </div>      
    </router-link>
    <router-link class="link d-flex-center align-items-center" to="/sensors">
      <div class="d-flex align-items-center">
        <svg width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle opacity="0.497685" cx="18.5" cy="18.5" r="12.5" fill="#25333A"/>
          <circle opacity="0.295346" cx="18.5" cy="18.5" r="18" fill="#25333A"/>
          <circle cx="18.5" cy="18.5" r="7" fill="#25333A"/>
        </svg>
        <span class="text-18 bold">Sensoren</span>
      </div>
    </router-link>
    <router-link class="link d-flex-center align-items-center" to="/account">
      <div class="d-flex align-items-center">
        <svg width="27" height="27" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m26.25 27-.137-2.734c-.182-.912-2.028-2.028-5.537-3.35a2.651 2.651 0 0 1-.342-.137c-2.142-.774-3.258-1.207-3.35-1.299-.273-.182-.41-.957-.41-2.324 0-.547.206-1.082.616-1.606.41-.524.729-1.447.957-2.769.091-.456.228-.82.41-1.094.182-.273.365-.82.547-1.64.137-.41.148-.798.034-1.162-.114-.365-.17-.593-.17-.684.09-.729.181-1.481.273-2.256.09-1.048-.365-2.176-1.368-3.383C16.771 1.354 15.221.75 13.125.75c-2.096 0-3.646.604-4.648 1.812-1.003 1.207-1.459 2.335-1.368 3.383.092.775.183 1.527.274 2.256 0 .091-.057.32-.171.684-.114.364-.103.752.034 1.162.182.82.365 1.367.547 1.64.182.274.319.639.41 1.094.228 1.322.547 2.245.957 2.769.41.524.615 1.06.615 1.606v.41c0 1.003-.09 1.607-.273 1.812-.182.205-.798.49-1.846.854-.774.274-1.435.502-1.982.684-3.51 1.322-5.355 2.438-5.537 3.35C.046 24.904 0 25.816 0 27h26.25Z" fill="#25333A"/></svg>
        <span class="text-18 bold">Account</span>
      </div>     
    </router-link>
  </nav>
</template>

<script>
export default {
    name: 'MenuBar'
}
</script>

<style lang="scss" scoped>
@import '~@/scss/variables';
@import '~@/scss/base/breakpoints';
@import '~@/scss/base/mixins/rem';

nav {
  box-sizing: border-box;
  position: fixed;
  bottom: 0;
  left: 0;
  width: calc(100% + 4px);
  height: rem(82px);
  border: solid 4px $almost-white;
  border-radius: 20px 20px 0 0;
  background-color: $white;
  z-index: 9;

  a {
    padding: rem(28px) rem(8px);

    svg path {
      transition: all .2s ease-in-out;
    }

    &.router-link-exact-active {
      svg path {
        fill: $orange;
      }
    }
  }

  .text-18 {
    display: block;
    padding-left: rem(16px);
    color: $dark-blue;
  }

  .link {
    width: 25%;
    border-right: solid 4px $almost-white;
  }
}

</style>