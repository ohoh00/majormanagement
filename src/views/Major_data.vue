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
        <Tablemajor :datas="items"/>
    </div>
    </b-container>
</template>

<script>
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
            db.collection("Dashboard").onSnapshot(snapshot =>{
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
        }
    },
    created() {
        this.Getdockey();
  },
}
</script>