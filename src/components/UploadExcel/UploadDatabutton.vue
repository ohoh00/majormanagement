<template>
  <div>
    <b-container fluid class="text-light text-center">
      <b-row>
        <b-col>
          <b-button variant="danger" @click="$bvModal.show('bv-modal-example')">บันทึกข้อมูล </b-button>
        </b-col>
      </b-row>
    </b-container>

    <b-modal ref="my-modal" id="bv-modal-example" hide-footer>
        <template v-slot:modal-title>
          บันทึกข้อมูล
        </template>
        <div class="text-center">
          <h4 class="text-center">ต้องการที่จะบันทึกข้อมูลกดปุ่ม<b-badge>ยืนยัน</b-badge>
          </h4>
          <b-spinner v-if="show" variant="primary" label="Spinning"></b-spinner>
        </div>
        <b-row>
          <b-col>
            <b-button class="mt-3" variant="danger" block @click="$bvModal.hide('bv-modal-example')">ยกเลิก</b-button>
          </b-col>
          <b-col>
            <b-button class="mt-3" variant="success" block @click="Delaydata()">ยืนยัน</b-button>
          </b-col>
        </b-row>
    </b-modal>
  </div>
</template>
<script>
import firebase from "@/firebaseConfig";
const db = firebase.firestore();
export default {
  props: {
    excelDatas: Array,
    excelKey: Array,
  },
  data() {
    return{
      show: null
    }
  },
  methods: {
    Delaydata() {  
      var i;
      var data = [];
      var j = 0;
      var num = 0;
      this.show = true
      if (this.excelDatas.length < 100) {
        this.createData(this.excelDatas, num);
        this.$refs['my-modal'].hide()
      } 
      else if (this.excelDatas.length >= 100) {
        for (i = 0; i < this.excelDatas.length; i++) {
          data[j++] = this.excelDatas[i];
          if (j == 100 || i + 1 == this.excelDatas.length) {
            this.createData(data, num);
            data = [];
            j = 0;
            num++;
          }
        }
      }
    },
    createData(Datas, num) {
      db.collection("Manage")
        .doc(`Set${num}`)
        .set({ Datas })
        .then(() => {
          console.log("Document successfully written!");
          if((num + 1) >= Math.round(this.excelDatas.length/100)){
            this.$refs['my-modal'].hide()
            this.show = false
          }
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
    },
  },
};
</script>
