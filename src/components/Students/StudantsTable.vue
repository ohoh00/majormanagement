<template>
<div>
  <div v-if="Setstatus() == false">
      <br/>
      <b-alert show class="text-center">ไม่มีข้อมูล</b-alert>
  </div>
  <div v-if="Setstatus()">
    <b-pagination
      align="center"
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="my-table"
    ></b-pagination>

    <b-table striped hover head-variant='dark'
      id="my-table"
      :items="Studentsdatas"
      :fields="fields"
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
    Studentsdatas: Array,
  },
  data() {
    return {
      fields: [
          {
            key: 'STUDENTCODE',
            sortable: true
          },
          {
            key: 'NAME',
            sortable: true
          },
          {
            key: 'GRADEPOINT',
            sortable: true,
          },
          {
            key: 'GPAX',
            sortable: true,
          },
          {
            key: 'ลำดับที่ได้',
            sortable: true,
          },
          {
            key: 'สาขาวิชา',
            sortable: true,
          }
        ],
      perPage: 100,
      currentPage: 1,
      sortBy: "GRADEPOINT",
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