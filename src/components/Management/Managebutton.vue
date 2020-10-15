<template>
  <div>
    <div>
      <div>
        <b-button variant="danger" @click="$bvModal.show('bv-modal-example-manage')">จัดสาขาวิชา</b-button>
      </div>

      <div>
        <b-modal ref="my-modal-manage" id="bv-modal-example-manage" size="lg" hide-footer title="จัดสาขาวิชา">
            <div>
                <label>ปีการศึกษา</label>
                <input type="text" class="form-control" v-model="year">
            </div>
            <div class="row">
            <div class="col-sm-6">
                <b-button class="mt-3" variant="danger" block @click="$bvModal.hide('bv-modal-example-manage')">ยกเลิก</b-button>
            </div>
            <div class="col-sm-6">
                <b-button class="mt-3" variant="success" block @click="Setprocess()">ยืนยัน</b-button>
            </div>
            </div>
            </b-modal>
      </div>

    </div>
  </div>
</template>
<script>
import firebase from "@/firebaseConfig";
const db = firebase.firestore();
export default {
  props: {
    Managedatas: Array,
    Datakey: Array,
  },
  data() {
    return {
      year: '',
      Gradepoint: [],
      datas: [],
      countmajor: [],
      students: [],
      sturandom: [],
    };
  },
  methods: {
    Setprocess() {
      this.Setdata_GP()
      this.Dashboardcard()
      this.Delaydata()
      this.Chartdata()
      this.$refs['my-modal-manage'].hide()
    },
    Dashboardcard() {
      db.collection("Dashboard").doc(this.year).set({
          Students: this.Managedatas.length,
          AverageGradepoint: this.Average_Gp(),
          MaxGradepoint: this.Max_GP(),
          MinGradepoint: this.Min_GP(),
          Openmajor: this.Openmajor(),
          Numberonemajor: this.NumberOneMajor()
        })
        .then(() => {
            console.log('Dashboardcard successfully written!')
          })
        .catch((error) => {
            console.error('Error writing document: ', error)
        })
    },
    Dashboardchart(max, min, average, major) {
      db.collection("Dashboard").doc(this.year).collection('Chart').add({
        Gpav: average,
        Gpmax: max,
        Gpmin: min,
        Major: major
      })
      .then(() => {
            console.log('chart successfully written!')
          })
      .catch((error) => {
            console.error('Error writing document: ', error)
        })
    },
    Delaydata() {
        this.Managemajor()
        this.Randommajor()
        var i
        var data = []
        var j = 0
        var num = 0
        if(this.students.length < 100){
        this.Studentsmajor(this.students,num)
        }
        else if(this.students.length >= 100){
        for(i = 0; i < this.students.length; i++){
          data[j++] = this.students[i]
        if(j == 100 || i+1 == this.students.length){
          this.Studentsmajor(data,num)
          data = []
          j = 0
          num++
          }   
        }
      }
    },
    Studentsmajor(Datas,num) {
      db.collection("Students").doc(this.year).collection('data').doc(`Set${num}`).set({Datas})
      .then(() => {
            console.log('Document successfully written!')
        })
          .catch((error) => {
            console.error('Error writing document: ', error)
        })
    },
    Readdatasetting() {
      this.datas = [];
      db.collection('Setting').doc('Major').collection('Data').orderBy("Code", "asc").get()
        .then((snapshot) => {
          snapshot.forEach((docs) => {
            this.datas.push(docs.data());
          });
        });
    },
    Setdata_GP() {
      this.Gradepoint = [];
      this.Managedatas.forEach((data) => {
        this.Gradepoint.push(data.GRADEPOINT);
      });
    },
    Max_GP() {
      console.log("MAX = " + Math.max(...this.Gradepoint));
      return Math.max(...this.Gradepoint);
    },
    Min_GP() {
      console.log("MIN = " + Math.min(...this.Gradepoint));
      return Math.min(...this.Gradepoint);
    },
    Average_Gp() {
      var average_gp = 0;
      this.Gradepoint.forEach((data) => {
        average_gp = average_gp + data;
      });
      average_gp = average_gp / this.Gradepoint.length;
      console.log("average = " + average_gp.toFixed(2));
      return average_gp.toFixed(2);
    },
    Openmajor() {
      this.countmajor = [];
      var num = 0;
      for (let i = 1; i < this.Datakey.length; i++) {
        if (this.Datakey.includes(`ลำดับ${i}`)) {
          num++;
          this.countmajor.push(0);
        }
      }
      console.log("จำนวนสาขา = " + num);
      return num;
    },
    NumberOneMajor() {
      var max_major = [];
      for (let i = 0; i < this.datas.length; i++) {
        var count = 0;
        for (let j = 0; j < this.Managedatas.length; j++) {
          if (this.Managedatas[j].ลำดับ1 == this.datas[i].Code) count++;
        }
        max_major[i] = count;
      }
      var index = max_major.indexOf(Math.max(...max_major));
      console.log("สาขาเลือกมากสุด = " + this.datas[index].Major);
      return this.datas[index].Major;
    },
    Managemajor() {
      this.Openmajor();
      this.Managedatas.sort((a, b) => {
        return b.GPAX - a.GPAX;
      });
      this.students = []
      var i = 0;
      var managestu = new Object
      for (var j = 1; j <= this.countmajor.length + 1; j++) {
        for (var k = 0; k < this.datas.length; k++) {
          if (this.Managedatas[i][`ลำดับ${j}`] == this.datas[k].Code && this.countmajor[k] < this.datas[k].จำนวนรับ) {
            managestu = {
              STUDENTCODE: this.Managedatas[i].STUDENTCODE,
              NAME: this.Managedatas[i].NAME,
              GPAX: this.Managedatas[i].GPAX,
              GRADEPOINT: this.Managedatas[i].GRADEPOINT,
              ลำดับที่ได้:(`ลำดับ${j}`),
              สาขาวิชา: this.datas[k].Major
            }
            console.log(managestu.สาขาวิชา)
            this.students.push(managestu)
            i++;
            j = 0;
            this.countmajor[k]++;
            break;
          }
          else if(this.Managedatas[i][`ลำดับ${j}`] === undefined) {
            this.sturandom.push(this.Managedatas[i])
            i++;
            j = 0;
            break;
          }
        }
        if (i == this.Managedatas.length) break;
      }
    },
    Chartdata() {
      for(var i = 0; i<this.datas.length; i++){
        var result = this.students.filter((data) => {
        console.log(this.datas[i].Major)
        return data.สาขาวิชา == this.datas[i].Major
        })
        var max = this.Chartmax(result)
        var min = this.Chartmin(result)
        var average = this.Chartaverage(result)
        this.Dashboardchart(max, min, average, this.datas[i].Major)
      }
    },
    Chartmax(result) {
      var max = result[0].GRADEPOINT
      result.forEach(e => {
          if(e.GRADEPOINT > max)
          max = e.GRADEPOINT
      })
      return max
    },
    Chartmin(result) {
      var min = result[0].GRADEPOINT
        result.forEach(e => {
          if(e.GRADEPOINT < min)
          min = e.GRADEPOINT
        })
      return min
    },
    Chartaverage(result) {
      var average = 0;
      result.forEach((data) => {
        average = average + data.GRADEPOINT;
      });
      average = average / result.length;
      return average.toFixed(2)
    },
    Randommajor() {
      var r
      var managestu = new Object
      for(var i = 0; i < this.sturandom.length;){
        r = this.Random()
        if(this.datas[r].จำนวนรับ > this.countmajor[r]){
          managestu = {
              STUDENTCODE: this.sturandom[i].STUDENTCODE,
              NAME: this.sturandom[i].NAME,
              GPAX: this.sturandom[i].GPAX,
              GRADEPOINT: this.sturandom[i].GRADEPOINT,
              ลำดับที่ได้:('สุ่ม'),
              สาขาวิชา: this.datas[r].Major
          }
          console.log('สุ่ม = ' + managestu.NAME)
          this.students.push(managestu)
          this.countmajor[r]++
          i++
        }
      }
    },
    Random() {
      return Math.floor(Math.random() * ((this.countmajor.length-1) - 0 + 1)) + 0;
    }
  },
  mounted() {
    this.Readdatasetting();
  },
};
</script>