<template>
<div>
    <div v-if="Setstatus() == false">
      <br/>
      <b-alert show class="text-center">โหลดข้อมูล <b-spinner small variant="primary" label="Spinning"></b-spinner></b-alert>
  </div>
    <div>
        <b-table v-if="Setstatus()" striped hover head-variant='dark' :items="datas" :fields="fields" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc"></b-table>
    </div>
</div>
</template>

<script>
export default {
    props: {
        datas: Array,
    },
    data(){
        return{
            fields: ['สาขาวิชา', 'จำนวนนักศึกษา'],
            sortBy: 'จำนวนนักศึกษา',
        }
    },
    methods:{
        Setstatus() {
            if (this.datas == "") return false;
            else return true;
    },
    }
}
</script>