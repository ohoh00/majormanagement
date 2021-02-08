<template>
<div>
  <div v-if="Setstatus() == false">
      <br/>
      <b-alert show class="text-center">โหลดข้อมูล <b-spinner small variant="primary" label="Spinning"></b-spinner></b-alert>
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
    Studentsdatas: Array,
  },
  data() {
    return {
      fields: [
        {
            key: 'ลำดับที่ลงทะเบียน',
            sortable: false
          },
          {
            key: 'STUDENTCODE',
            sortable: false
          },
          {
            key: 'NAME',
            sortable: false
          },
          {
            key: 'GRADEPOINT',
            sortable: true,
          },
          {
            key: 'GPAX',
            sortable: false,
          },
          {
            key: 'ลำดับที่ได้',
            sortable: false,
          },
          {
            key: 'สาขาวิชา',
            sortable: false,
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