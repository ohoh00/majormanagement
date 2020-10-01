<template>
  <div>
    <div>
      <b-button variant="danger" @click="Setdata_GP()">จัดสาขาวิชา</b-button>
    </div>

  </div>
</template>
<script>
import firebase from '@/firebaseConfig'
const db = firebase.firestore()
export default {
  props: {
    Managedatas: Array,
    Datakey: Array,
  },
  data() {
    return {
        Gradepoint: [],
    };
  },
  methods: {
    Setdata_GP() {
        this.Gradepoint = []
        this.Managedatas.forEach(data => {
            this.Gradepoint.push(data.GRADEPOINT)
        });
        this.Max_GP()
        this.Min_GP()
        this.Average_Gp()
        this.Openmajor()
        this.NumberOneMajor()
    },

    Max_GP() {
        console.log('MAX = ' + Math.max(...this.Gradepoint))
        return Math.max(...this.Gradepoint)
    },

    Min_GP() {
        console.log('MIN = ' + Math.min(...this.Gradepoint))
        return Math.min(...this.Gradepoint)
    },

    Average_Gp() {
        var average_gp = 0
        this.Gradepoint.forEach(data => {
            average_gp = average_gp + data
        });
        average_gp = average_gp/this.Gradepoint.length
        console.log('average = '+ average_gp.toFixed( 2 ))
        return average_gp.toFixed( 2 )
    },

    Openmajor() {
        var num = 0
        for(let i = 1; i < this.Datakey.length; i++){
          if(this.Datakey.includes(`ลำดับ${i}`))
          num++
        }
        console.log('จำนวนสาขา = '+num)
        return num
    },
    NumberOneMajor() {
      var datas = []
      db.collection('Settingcode').orderBy('Code', "asc").get().then((snapshot) => {
        snapshot.forEach(docs => {
          datas.push(docs.data())
        });
        var max_major = []
        for(let i = 0; i < datas.length; i++){
        var count = 0
            for(let j = 0; j < this.Managedatas.length; j++){
                if(this.Managedatas[j].ลำดับ1 == datas[i].Code)
                count++
            }
        max_major[i] = count
        }
        var index =  max_major.indexOf(Math.max(...max_major))
        console.log('สาขาเลือกมากสุด = '+datas[index].Major)
        return datas[index].Major
      })
    },
  },
};
</script>