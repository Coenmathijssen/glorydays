<template>
  <div class="search-container shadow d-flex">
    <button 
      v-if="searchQuery" 
      @click="clearSearch" 
      class="close d-flex-center align-items-center"
    >
      <svg width="9" height="9" xmlns="http://www.w3.org/2000/svg"><path d="m7.369 8.18.811-.811L4.991 4.18 8.18.991 7.369.18 4.18 3.369.991.18.18.991 3.369 4.18.18 7.369l.811.811L4.18 4.991z" fill="#F00000" fill-rule="nonzero"/></svg>
    </button>
    <div class="relative search-wrapper">
      <input 
        v-model="searchQuery" 
        v-on:keyup="search" 
        class="text-16 ff-mulish search"
        placeholder="Zoek op lijst, artiest of nummer" 
        type="text" 
      >
      <div class="search-button-container d-flex-center align-items-center js-search">
        <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><filter x="-1%" y="-8.8%" width="101.9%" height="124.6%" filterUnits="objectBoundingBox" id="a"><feOffset dy="2" in="SourceAlpha" result="shadowOffsetOuter1"/><feGaussianBlur stdDeviation="2" in="shadowOffsetOuter1" result="shadowBlurOuter1"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" in="shadowBlurOuter1"/></filter><rect id="b" x="51" y="220" width="732" height="57" rx="8"/></defs><g transform="translate(-583 -239)" fill="none" fill-rule="evenodd"><use fill="#000" filter="url(#a)" xlink:href="#b"/><use fill="#FFF" xlink:href="#b"/><rect stroke="#E2EBFA" x="62.5" y="229.5" width="552" height="38" rx="6"/><path d="M596.82 254.08l1.26-1.26-4.14-4.14h-.68l-.22-.24c.413-.467.73-1.003.95-1.61.22-.607.33-1.243.33-1.91 0-.987-.237-1.893-.71-2.72a5.286 5.286 0 00-1.93-1.96 5.315 5.315 0 00-2.74-.74c-.987 0-1.897.24-2.73.72a5.346 5.346 0 00-1.98 1.97 5.317 5.317 0 00-.73 2.73c0 .987.247 1.9.74 2.74a5.34 5.34 0 001.97 1.94c.833.48 1.743.72 2.73.72.653 0 1.283-.11 1.89-.33a4.946 4.946 0 001.61-.95l.24.22v.66l4.14 4.16zm-7.88-5.4c-.68 0-1.307-.17-1.88-.51a3.854 3.854 0 01-1.37-1.37c-.34-.573-.51-1.2-.51-1.88 0-.68.17-1.307.51-1.88a3.774 3.774 0 011.37-1.36c.573-.333 1.2-.5 1.88-.5.68 0 1.307.167 1.88.5a3.697 3.697 0 011.36 1.36c.333.573.5 1.2.5 1.88 0 .68-.167 1.307-.5 1.88a3.774 3.774 0 01-1.36 1.37c-.573.34-1.2.51-1.88.51z" fill="#EA6F3D" fill-rule="nonzero"/></g></svg>
      </div>
    </div>
    <button @click="toggleFilter" class="d-flex-center align-items-center filter">
      <span class="text-16 ff-mulish">
        Filteren
      </span>
      <svg width="16" height="10" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><filter x="-1%" y="-8.8%" width="101.9%" height="124.6%" filterUnits="objectBoundingBox" id="a"><feOffset dy="2" in="SourceAlpha" result="shadowOffsetOuter1"/><feGaussianBlur stdDeviation="2" in="shadowOffsetOuter1" result="shadowBlurOuter1"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" in="shadowBlurOuter1"/></filter><rect id="b" x="51" y="220" width="732" height="57" rx="8"/></defs><g transform="translate(-745 -244)" fill="none" fill-rule="evenodd"><use fill="#000" filter="url(#a)" xlink:href="#b"/><use fill="#FFF" xlink:href="#b"/><rect stroke="#E2EBFA" x="666.5" y="229.5" width="105" height="38" rx="6"/><path d="M760.5 245.68V244h-15v1.68h15zm-2.5 4.14v-1.64h-10v1.64h10zm-3.32 4.18v-1.68h-3.36V254h3.36z" fill="#EA6F3D" fill-rule="nonzero"/></g></svg>
    </button>
  </div>
</template>

<script>
import search from '@/spotify/search'

export default {
  name: 'SearchBar',
  data () {
    return {
      searchQuery: null,
      filterOpen: false,
      timer: null
    }
  },
  methods: {
    toggleFilter () {

    },
    search (e) {
      // Don't search if backspace
      if (e.key === 'Backspace' || e.key === 'Delete') {
        if (this.searchQuery === '') this.$store.commit('setSearchActive', false)
        return
      }

      if (this.timer) {
        window.clearTimeout(this.timer)
      }
      
      this.timer = setTimeout(() => {
        search.methods.searchData(this.searchQuery).then(data => {
          this.$store.commit('setSearched', data)
          this.$store.commit('setSearchActive', true)
          console.log(data)
        })
      }, 500)
    },
    clearSearch () {
      this.searchQuery = ''
       this.$store.commit('setSearchActive', false)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/scss/variables';
@import '~@/scss/base/breakpoints';
@import '~@/scss/base/mixins/rem';

.search-container {
  position: relative;
  padding: rem(9px) rem(11px);
  background-color: $white;
  border-radius: 8px;

  .text-16 {
    color: rgba(0,0,0,0.8);
  }

  .search-wrapper {
    width: 100%;

    .js-search {
      position: absolute;
      right: rem(-10px);
      top: 50%;
      transform: translateY(-50%);
      width: rem(32px);
      height: 100%;

      svg {
        width: rem(16px);
        height: rem(16px);
      }
    }
  }

  .search, .filter {
    padding: rem(10px) rem(12px);
    border: solid 1px $almost-white;
    border-radius: 6px;       
  }

  .search {
    padding-right: 0;
  }

  .search {
    width: 100%;
  }

  .filter {
    margin-left: rem(50px);

    span {
      padding-right: rem(16px);
    }
  }

  .close {
    position: absolute;
    left: rem(-10px);
    top: 50%;
    transform: translateY(-50%);
    width: rem(20px);
    height: rem(20px);
    border-radius: 50%;
    background-color: $orange;
    z-index: 1;

    svg {
      transform: scale(0.8);

      path {
        fill: $white;
      }
    } 
  }
}


</style>