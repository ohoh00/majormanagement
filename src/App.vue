<template>
  <div id="app">
    <div v-if="main()">
    <Navbar/>
    <br>
    </div>
    <router-view/>
  </div>
</template>

<script>
import Navbar from '@/views/Navbar.vue'
export default {
  name: 'App',
  components:{Navbar,},
  data() {
    return{
      user:''
    }
  },
  methods:{
    main(){
      if(this.$route.path == '/')
      return false
      else
      return true
    }
  }
}
</script>

