<template>
  <div>
    <b-pagination
      v-if="Setstatus()"
      align="center"
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="my-table"
    ></b-pagination>

    <b-table striped hover head-variant='dark'
      id="my-table"
      :items="Studentsdatas"
      :fields="Datakey"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      sticky-header="600px"
    >
    </b-table>
  </div>
</template>
<script>
export default {
  props: {
    Studentsdatas: Array,
    Datakey: Array,
  },
  data() {
    return {
      perPage: 100,
      currentPage: 1,
      sortBy: "GPAX",
      sortDesc: true,
    };
  },
  methods:{
    Setstatus() {
      if (this.Studentsdatas == "") return false;
      else return true;
    },
  },
  computed: {
      rows() {
        return this.Studentsdatas.length
      }
  }
};
</script>