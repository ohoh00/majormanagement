<template>
  <div>
    <div>
      <b-button variant="danger" @click="Managemajor()">จัดสาขาวิชา</b-button>
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
      Gradepoint: [],
      datas: [],
      countmajor: [],
      students: []
    };
  },
  methods: {
    Readdatasetting() {
      this.datas = [];
      db.collection("Settingcode").orderBy("Code", "asc").get()
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
      this.Max_GP();
      this.Min_GP();
      this.Average_Gp();
      this.Openmajor();
      this.NumberOneMajor();
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
      for (var j = 1; j <= this.countmajor.length; j++) {
        for (var k = 0; k < this.datas.length; k++) {
          if (this.Managedatas[i][`ลำดับ${j}`] == this.datas[k].Code && this.countmajor[k] < this.datas[k].จำนวนรับ) {
            //console.log(`i = ${i} , ลำดับ${j}`);
            //console.log(this.Managedatas[i].NAME);
            console.log(this.datas[k].Major);
            managestu = {
              STUDENTCODE: this.Managedatas[i].STUDENTCODE,
              NAME: this.Managedatas[i].NAME,
              GPAX: this.Managedatas[i].GPAX,
              GRADEPOINT: this.Managedatas[i].GRADEPOINT,
              ลำดับที่ได้:(`ลำดับ${j}`),
              สาขาวิชา: this.datas[k].Major
            }
            //console.log(managestu)
            this.students.push(managestu)
            console.log(this.students[i])
            i++;
            j = 0;
            this.countmajor[k]++;
            break;
          }
        }
        if (i == this.Managedatas.length) break;
      }
    },
  },
  mounted() {
    this.Readdatasetting();
  },
};
</script>