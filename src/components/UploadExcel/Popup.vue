<template>
  <div>
    <b-container fluid class="text-light text-center">
    <b-row>
      <b-col>
     <b-button variant="danger" @click="$bvModal.show('bv-modal-example')">บันทึกข้อมูล</b-button>
     </b-col>
    </b-row>
    </b-container>

  <b-modal ref="my-modal" id="bv-modal-example" hide-footer>
    <template v-slot:modal-title>
    บันทึกข้อมูล
    </template>
    <div class="text-center">
     <h4 class="text-center">ต้องการที่จะบันทึกข้อมูลกดปุ่ม<b-badge>ยืนยัน</b-badge></h4>
    </div>
    <b-row>
    <b-col>
      <b-button class="mt-3" variant="danger" block @click="$bvModal.hide('bv-modal-example')">ยกเลิก</b-button>
    </b-col>
    <b-col>
      <b-button class="mt-3" variant="success" block  @click="Delaydata()">ยืนยัน</b-button>
    </b-col>
    </b-row>
    </b-modal>
  </div>
</template>
<script>
import firebase from '@/firebaseConfig'
const db = firebase.firestore()
export default {
  props: {
    excelDatas: Array,
    excelKey: Array
  },
    data (){
      return {
        datas: []
      }
    },
  methods: {
      Delaydata() {
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
        db.collection('Manage').doc(`Set${num}`).set({Datas})
          .then(() => {
            console.log('Document successfully written!')
          })
          .catch((error) => {
            console.error('Error writing document: ', error)
        })
    },
    Datadashboard() {
        db.collection("Dashboard").doc(this.form.year).set({
          Students: this.excelDatas.length,
          AverageGradepoint: this.Average_Gp(),
          MaxGradepoint: this.Max_GP(),
          MinGradepoint: this.Min_Gp(),
          Openmajor: this.Openmajor(),
          Numberonemajor: this.NumberOneMajor()
        })
        .then(() => {
            console.log('Document successfully written!')
            this.$refs['my-modal'].hide()
          })
        .catch((error) => {
            console.error('Error writing document: ', error)
          })
    },
    Average_Gp() {
        var average_gp = 0
        this.excelDatas.forEach(element => {
            console.log(element.GRADEPOINT)
            average_gp = average_gp + element.GRADEPOINT
        });
        average_gp = average_gp/this.excelDatas.length
        console.log(average_gp)
        console.log(average_gp.toFixed( 2 ))

        return average_gp.toFixed( 2 )
    },
    Min_Gp() {
        var min_gp = this.excelDatas[0].GRADEPOINT
        this.excelDatas.forEach(element => {
          if(element.GRADEPOINT < min_gp)
          min_gp = element.GRADEPOINT
        });
        console.log(min_gp)

        return min_gp
    },
    Max_GP() {
        var max_gp = this.excelDatas[0].GRADEPOINT
        this.excelDatas.forEach(element => {
          if(element.GRADEPOINT > max_gp)
          max_gp = element.GRADEPOINT
        });
        console.log(max_gp)

        return max_gp
    },
    Readdatasetting() {
      this.datas = []
      db.collection('Settingcode').orderBy('Code', "asc").get().then((snapshot) => {
        snapshot.forEach(docs => {
          this.datas.push(docs.data())
        });
      })
    },
    NumberOneMajor() {
      var k = []
      for(let i = 0; i < this.datas.length; i++){
        var n = 0
        for(let j = 0; j < this.excelDatas.length; j++){
          if(this.excelDatas[j].ลำดับ1 == this.datas[i].Code)
          n++
        }
        k[i] = n
      }
      var g = Math.max(...k)
      //ใส่ ... ไว้เพื่อที่จะสามารถใช้ Math.max กับ array ได้
      var index =  k.indexOf(g)
      console.log(this.datas[index].Major)
      //return data[index].ma
    },
    Openmajor() {
        var num = 0
        for(let i = 1; i < this.excelKey.length; i++){
          if(this.excelKey.includes(`ลำดับ${i}`))
          num++
        }
        console.log(num)
        return num
    }
  },
  /*mounted() {
    this.Readdatasetting()
  }*/
}
</script>
<style scoped>

</style>