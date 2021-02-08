<template>
    <b-container>
    <h5>ปีการศึกษา</h5>
      <b-form-select
        v-model="selected"
        :options="listyear"
        class="mb-3"
        disabled-field="notEnabled"
        @change="Readdata()"
    ></b-form-select>
    <div>
    <b-button @click="onExport()" variant="danger">ดาวน์โหลด</b-button>
  </div>
  <br>
    <div>
        <Tablemajor :datas="items"/>
    </div>
    </b-container>
</template>

<script>
import XLSX from 'xlsx'
import firebase from "@/firebaseConfig";
const db = firebase.firestore();
import Tablemajor from '@/components/Major/Tablemajor.vue'
export default {
    components:{Tablemajor},
    data(){
        return{
            items:[],
            selected: '',
            listyear: [],
        }
    },
    methods:{
        Getdockey() {
            db.collection("count_m").onSnapshot(snapshot =>{
                this.listyear = []
                snapshot.forEach((docs) => {
                this.listyear.push(docs.id); 
            });
            this.selected = this.listyear[this.listyear.length - 1];
            this.Readdata();
            })
        },
        Readdata() {
            this.items = []
            db.collection("count_m").doc(this.selected).get()
            .then((snapshot) => {
                snapshot.data().cout_stu.forEach((docs) => {
                    this.items.push(docs)
                    console.log(docs)
                });
            })
        },
        onExport() {
            const dataWS = XLSX.utils.json_to_sheet(this.items)
            const wb = XLSX.utils.book_new()
            XLSX.utils.book_append_sheet(wb, dataWS)
            XLSX.writeFile(wb,'export.xlsx')
        },
    },
    created() {
        this.Getdockey();
  },
}
</script>