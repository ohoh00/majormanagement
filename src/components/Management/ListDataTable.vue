<template>
  <div>
    <div v-if="Setstatus()">
      <b-alert show class="text-center">ไม่มีข้อมูล</b-alert>
    </div>
    <div>
      <b-pagination
      v-if="Setstatus() == false"
      align="center"
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="my-table"
    ></b-pagination>

      <b-table striped hover head-variant = 'dark'
        id="my-table"
        :items="Managedatas"
        :fields="Datakey"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        sticky-header="600px"
        :per-page="perPage"
        :current-page="currentPage"
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
      perPage: 100,
      currentPage: 1,
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
  computed: {
      rows() {
        return this.Managedatas.length
      }
  }
};
</script>
