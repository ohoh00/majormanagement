<template>
<div>
  <div v-if="Setstatus()">
    <b-alert show class="text-center">ไม่มีข้อมูล</b-alert>
  </div>
  <div>
    <b-table striped hover :items="Managedatas" :fields="Datakey"></b-table>
  </div>
</div>
</template>
<script>
export default {
  props:{
    Managedatas: Array,
    Datakey: Array
  },
  data() {
    return {
    }
  },
  methods:{
    Setstatus() {
      if(this.Managedatas == ""){
      return true
      }
      else{
      return false
      }
    }
  },
}
</script>
