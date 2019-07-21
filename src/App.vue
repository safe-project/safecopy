<template>
  <div id="app">
  	<titleBar></titleBar>
    <router-view />
  </div>
</template>

<script>
import { titleBar } from '@/layout/components'
export default {
  name: 'App',
  components: {
    titleBar
  },
}
</script>
