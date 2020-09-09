<template>
  <div>
    <b-container fluid class="text-light text-center">
    <b-row>
      <b-col>
     <b-button id="show-btn" @click="$bvModal.show('bv-modal-example')">บันทึกข้อมูล</b-button>
     </b-col>
    </b-row>
    </b-container>

  <b-modal ref="my-modal" id="bv-modal-example" hide-footer>
    <template v-slot:modal-title>
    บันทึกข้อมูล
    </template>
    <div class="d-block text-center">
     <b-form-input v-model="form.year" placeholder="ปีการศึกษา"></b-form-input>
    </div>
    <b-row>
    <b-col>
      <b-button class="mt-3" block @click="$bvModal.hide('bv-modal-example')">Close Me</b-button>
    </b-col>
    <b-col>
      <b-button class="mt-3" block  @click="Delaydata()" >SAVE</b-button>
    </b-col>
    <b-col>
      <b-button class="mt-3" block  @click="DeleteData()" >Data</b-button>
    </b-col>
    </b-row>
    </b-modal>
  </div>
</template>
<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import firebase from '@/firebaseConfig'
const db = firebase.firestore()
export default {
  props: {
    excelDatas: Array
  },
    data (){
      return {
        form: {
          year: ''
        }
      }
    },
    methods: {
      Delaydata () {
        var i
        var data = []
        var j = 0
        var num = 0
        this.$refs['my-modal'].hide()
        if(this.excelDatas.length < 100){
        this.createData(this.excelDatas,num)
        }
        else if(this.excelDatas.length >= 100){
        for(i = 0; i < this.excelDatas.length; i++){
          data[j++] = this.excelDatas[i]
        if(j == 100 || i+1 == this.excelDatas.length){
          this.createData(data,num)
          data = []
          j = 0
          num++
          }   
        }
      }
    },
      createData(Datas,num) {
        db.collection('Students').doc('Years').collection(this.form.year).doc(`Set${num}`)
          .set({Datas})
          .then(() => {
            console.log('Document successfully written!')
          })
          .catch((error) => {
            console.error('Error writing document: ', error)
          })
    },
      DeleteData() {
        db.collection("Students").doc("Year").delete()
        this.$refs['my-modal'].hide()
    }
  }
}
</script>
<style scoped>

</style>