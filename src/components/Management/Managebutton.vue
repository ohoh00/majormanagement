<template>
<b-container>
  <div class="row">
    <div>
    <b-button @click="Analyze_stu()" variant="warning" style="color:white">ตรวจสอบ <b-spinner v-if="show_an" small variant="secondary" label="Small Spinner" ></b-spinner></b-button>
    </div>
    <div>
      <div>
        <b-button variant="danger" @click="$bvModal.show('bv-modal-example-manage')" style="margin-left:16px;">จัดสาขาวิชา</b-button>
      </div>

      <div>
        <b-modal ref="my-modal-manage" id="bv-modal-example-manage" size="lg" hide-footer title="จัดสาขาวิชา">
            <div>
                <label>ปีการศึกษา</label>
                <input type="text" class="form-control" v-model="year">
            </div>
            <br/>
            <div class="text-center">
                <b-spinner v-if="show" variant="primary" label="Spinning" ></b-spinner>
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
  </b-container>
</template>
<script>
import firebase from "@/firebaseConfig";
const db = firebase.firestore();
export default {
  props: {
    Managedatas: Array,
    Datakey: Array,
    documentsId: Function
  },
  data() {
    return {
      year: '',
      Gradepoint: [],
      datas: [],
      countmajor: [],
      students: [],
      sturandom: [],
      Majorstu: [],
      count_m: [],
      show: null,
      show_an: null,
      stu_set: 0,
      deletenum: null
    };
  },
  methods: {
    Setprocess() {
      if(this.datas.length != this.Openmajor()){
        alert('จำนวนสาขาวิชาที่เปิดไม่สอดคล้องกัน')
      }
      else if(this.stu_set < this.Managedatas.length){
        alert('จำนวนที่นั่งไม่สอดคล้องกับจำนวนนักศึกษา')
      }
      else {
        this.show = true
        this.Setdata_GP()
        this.Dashboardcard()
        this.Delaydata()
        this.Chartdata()
        this.count_stu()
      }
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
            this.stu_set += docs.data().จำนวนรับ
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
      var num = 0;
      this.countmajor = [];
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
    Analyze_stu() {
      if(this.sturandom.length == 0 && this.datas.length == this.Openmajor() && this.stu_set >= this.Managedatas.length){
      this.show_an = true
      this.Openmajor();
      this.Managedatas.sort((a, b) => {
        return b.GRADEPOINT - a.GRADEPOINT;
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
            this.students.push(managestu)
            this.countmajor[k]++
            i++;
            j = 0;
            break;
          }
          else if(this.Managedatas[i][`ลำดับ${j}`] === undefined) {
            db.collection('Customstudents').add({
              STUDENTCODE: this.Managedatas[i].STUDENTCODE,
              NAME: this.Managedatas[i].NAME,
              GPAX: this.Managedatas[i].GPAX,
              GRADEPOINT: this.Managedatas[i].GRADEPOINT,
              สาขาวิชา: null
            })
            .then(function(docRef) {
                console.log("Document written with ID: ", docRef.id);
              })
            .catch(function(error) {
                console.error("Error adding document: ", error);
              });
            i++;
            j = 0;
            break;
          }
        }
        if (i == this.Managedatas.length){
          for(var m = 0 ; m < this.countmajor.length; m++){
            if(this.countmajor[m] < this.datas[m].จำนวนรับ){
              db.collection('Major_count').doc(this.datas[m].Major).set({
              Major: this.datas[m].Major,
              ที่นั่ง: (this.datas[m].จำนวนรับ - this.countmajor[m])
            })
            .then(() => {
              this.show_an = false
            })
            }
          }
          break;
        }
      }
    }
    else if(this.datas.length != this.Openmajor()){
      alert('จำนวนสาขาวิชาที่เปิดไม่สอดคล้องกัน')
    }
    else if(this.stu_set < this.Managedatas.length){
      alert('จำนวนที่นั่งไม่สอดคล้องกับจำนวนนักศึกษา')
    }
    },
    Managemajor() {
      this.Openmajor();
      this.Managedatas.sort((a, b) => {
        return b.GRADEPOINT - a.GRADEPOINT;
      });
      this.students = []
      this.c
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
            this.students.push(managestu)
            this.countmajor[k]++
            i++;
            j = 0;
            break;
          }
          else if(this.Managedatas[i][`ลำดับ${j}`] === undefined) {
            i++;
            j = 0;
            break;
          }
        }
        if (i == this.Managedatas.length){
          break;
        }
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
    Customstu() {
       db.collection("Customstudents").orderBy("GRADEPOINT", "desc").onSnapshot(snapshot => {
                this.sturandom = []
                snapshot.forEach((docs) => {
                this.sturandom.push(docs.data());
          })
        });
    },
    Majorcount() {
          db.collection("Major_count").onSnapshot(snapshot => {
              this.Majorstu = []
              this.count_m = []
              snapshot.forEach((docs) => {
              if(docs.data().ที่นั่ง != 0){
              this.Majorstu.push(docs.data());
              this.count_m.push(0);
            }
          })
        })
        },
    Randommajor() {
      var r
      var managestu = new Object
      for(var i = 0; i < this.sturandom.length;){
        r = this.Random()
        if(this.sturandom[i].สาขาวิชา == null &&  this.count_m[r] < this.Majorstu[r].ที่นั่ง){
          managestu = {
              STUDENTCODE: this.sturandom[i].STUDENTCODE,
              NAME: this.sturandom[i].NAME,
              GPAX: this.sturandom[i].GPAX,
              GRADEPOINT: this.sturandom[i].GRADEPOINT,
              ลำดับที่ได้:('กำหนดเอง/สุ่ม'),
              สาขาวิชา: this.Majorstu[r].Major
          }
          this.students.push(managestu)
          this.count_m[r]++
          i++
        }
        else if(this.sturandom[i].สาขาวิชา != null){
           managestu = {
              STUDENTCODE: this.sturandom[i].STUDENTCODE,
              NAME: this.sturandom[i].NAME,
              GPAX: this.sturandom[i].GPAX,
              GRADEPOINT: this.sturandom[i].GRADEPOINT,
              ลำดับที่ได้:('กำหนดเอง/สุ่ม'),
              สาขาวิชา: this.sturandom[i].สาขาวิชา
          }
          this.students.push(managestu)
          i++
        }
      }
    },
    count_stu() {
      var cstu = []
      var mstu = new Object
      for(var i = 0; i < this.Majorstu.length; i++){
        if( this.count_m[i] < this.Majorstu[i].ที่นั่ง){   
          mstu = {
            สาขาวิชา: this.Majorstu[i].Major,
            จำนวนที่เหลือ: (this.Majorstu[i].ที่นั่ง - this.count_m[i])
          }
          cstu.push(mstu)
        }
      }
      this.updatestu(cstu)
    },
    updatestu(cstu) {
      var Major_c = []
      var count = []
      var stu = new Object
      var cout_stu = []
      this.datas.forEach(element => {
         Major_c.push(element.Major) 
         count.push(element.จำนวนรับ) 
      });
      for(var i = 0; i < cstu.length; i++){
        var Major_index = Major_c.indexOf(cstu[i].สาขาวิชา)
        count[Major_index] = (count[Major_index] - cstu[i].จำนวนที่เหลือ)
      }
      for(var j = 0; j < Major_c.length; j++){
        stu = {
            สาขาวิชา: Major_c[j],
            จำนวนนักศึกษา: count[j]
        }
        cout_stu.push(stu)
      }
      this.upcout_stu(cout_stu)
    },
    upcout_stu(cout_stu) {
       db.collection('count_m').doc(this.year).set({cout_stu})
          .then(() => {
            console.log('count_stu successfully written!')
            this.setDelete()      
          })
          .catch((error) => {
            console.error('Error writing document: ', error)
          })
    },
    setDelete() {
      this.DeleteCustomstudents()
      this.DeleteMajorcount()
      this.DeleteManage()
      this.documentsId()
    },
    DeleteCustomstudents() {
       db.collection("Customstudents").get()
            .then(res => {
                res.forEach(element => {
                    element.ref.delete()
                })
                
                console.log('Delete Document successfully')
            })
    },
    DeleteMajorcount() {
      db.collection("Major_count").get()
            .then(res => {
                res.forEach(element => {
                    element.ref.delete()
                })
                
                console.log('Delete Document successfully')
            })
    },
    DeleteManage() {
      var num = 0
      db.collection("Manage").get()
            .then(res => {
                res.forEach(element => {
                    element.ref.delete()
                    num++
                })
                if(num == res.size) {
                  this.show = false
                  this.$refs['my-modal-manage'].hide()
                  console.log('Delete Document successfully')
                }
            })
    },
    Random() {
      return Math.floor(Math.random() * ((this.count_m.length-1) - 0 + 1)) + 0;
    }
    
  },
  mounted() {
    this.Readdatasetting();
    this.Customstu()
    this.Majorcount()
  },
};
</script>