<template>
  <section class="login d-flex-center align-items-center">
    <div class="container">
      <div class="inner d-flex-column-center">
        <img src="~@/assets/spotify_logo.png" alt="Spotify logo">
        <h1 class="text-32 bold ta-center">Login to Spotify to connect your account with Glory Days</h1>
        <a href="https://spotify-auth-handler.herokuapp.com/login" class="btn btn-primary ta-center text-16 tt-uppercase">Log in with Spotify</a><br>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Login',
}
</script>

<style lang="scss">
@import '~@/scss/variables';
@import '~@/scss/base/mixins/rem';

.login {
  position: fixed;
  top: 0;
  left: 0;
  min-height: 100vh;
  width: 100%;
  background-color: #131114;
  color: $white;
  z-index: 1;

  .inner {
    padding: 0 calc(64px);
  }

  img {
    max-width: rem(180px);
    margin-bottom: rem(64px);
  }

  .btn {
    display: inline-block;
    margin-top: rem(50px);
    padding: rem(16px) rem(50px);
    background-color: #2CD15B;
    color: $white;
    border-radius: 50px;
    font-weight: 900;
    letter-spacing: 1px;
  }

  ~ nav {
    display: none !important;
  }
}

</style>