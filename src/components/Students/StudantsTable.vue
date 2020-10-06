<template>
  <div>
    <b-table
      striped
      hover
      head-variant='dark'
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
      sortBy: "GPAX",
      sortDesc: true,
    };
  },
};
</script>