<template>
  <div class="memories">
    <OverviewHeader 
      :daytime="overview.daytime"
      :name="overview.name"
      :message="overview.message"
    />
    <MemoriesGrid/>
  </div>
</template>

<script>
import OverviewHeader from '@/components/OverviewHeader.vue'
import MemoriesGrid from '@/components/MemoriesGrid.vue'

export default {
  name: 'Memories',
  components: {
    OverviewHeader,
    MemoriesGrid
  },
  data () {
    return {
      overview: {
        daytime: 'evening',
        name: 'Kees',
        message: 'beleef samen mooie herinneringen.' 
      },
    }
  },
}
</script>

<style lang="scss" scoped>

</style>