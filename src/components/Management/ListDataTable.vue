<template>
  <div>
    <div v-if="Setstatus()">
      <b-alert
        show
        class="text-center"
      >ไม่มีข้อมูล</b-alert>
    </div>
    <div>
      <b-table striped hover head-variant = 'dark'
        :items="Managedatas"
        :fields="Datakey"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        sticky-header="600px"
      >
      </b-table>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    Managedatas: Array,
    Datakey: Array,
  },
  data() {
    return {
      sortBy: "GPAX",
      sortDesc: true,
    };
  },
  methods: {
    Setstatus() {
      if (this.Managedatas == "") return true;
      else return false;
    },
  },
};
</script>
