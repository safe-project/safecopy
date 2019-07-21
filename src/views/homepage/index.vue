<template>
  <div class="dashboard-container">这里是首页
    <div class="dashboard-text">name: {{ name }}</div>
    <div class="dashboard-text">roles: {{ roles }}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Homepage',
  computed: {
    ...mapGetters([
      'name','roles'
    ])
  }
}
</script>

<style scoped>

</style>
