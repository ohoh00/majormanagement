<template>
  <div id="app">
    <Navbar/>
    <p></p>
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from '@/views/Navbar.vue'
export default {
  name: 'App',
  components : {Navbar,}
}
</script>

