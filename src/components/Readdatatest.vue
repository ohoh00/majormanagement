<template>
<b-container>
  <div>
    <b-button
      variant="danger"
      id="show-btn"
      @click="test()"
    >เพิ่มสาขา</b-button>
    <canvas id="my-chart"></canvas>
  </div>
</b-container>
</template>

<script>
import Chart from "chart.js";
import firebase from "@/firebaseConfig";
const db = firebase.firestore();
export default {
  data() {
    return {
      namelabel: [],
      gpmin: [],
      gpmax: [],
      //Name: [],
      //Gpax: [],
      //Gpoint: [],
      doc_count: null,
    };
  },
  methods: {
    Chartdata() {
      var ctx = document.getElementById("my-chart");
      // eslint-disable-next-line no-unused-vars
      var myChart = new Chart(ctx, {
        type: "horizontalBar",
        data: {
          labels: this.namelabel,
          datasets: [
            {
              label: "GradePoint ต่ำสุด",
              data: this.gpmin,
              borderColor: "#008ffb",
              backgroundColor: "#008ffb",
            },
            {
              label: "GradePoint สูงสุด",
              data: this.gpmax,
              borderColor: "#00e396",
              backgroundColor: "#00e396",
            },
            {
              label: "Grade Point เฉลี่ย",
              data: [56,69,32,68],
              borderColor: "#feb019",
              backgroundColor: "#feb019",
            },
          ],
        },
        options: {
          responsive: true,
        },
      });
    },
    Readdata() {
      db.collection("Chart").doc("2560").collection("data").get()
        .then((snapshot) => {
          snapshot.forEach((docs) => {
            console.log(docs.data().Major);
            //console.log(this.datas)
            this.namelabel.push(docs.data().Major);
            this.gpmin.push(docs.data().Gpmin)
            this.gpmax.push(docs.data().Gpmax)
            //this.chartOptions.xaxis.categories.push(docs.data().Major)
            //console.log(docs.data())
          });
          this.Chartdata();
        });
    },
    test() {
      console.log(this.namelabel);
      //console.log(this.chartOptions.xaxis.categories)
    },
  },
  created() {
    this.Readdata();
  },
  mounted() {
    //this.Chartdata()
  },
  /*methods : {
        Countdocuments() {
            db.collection('Students').doc('Years').collection('2560').get().then((snapshot) =>
            {
                this.doc_count = snapshot.docs.length
                console.log(this.doc_count)
                console.log(`ยาว = ${snapshot.docs.length}`)
                this.Readdata(this.doc_count)
            },
            )
            },
        Readdata(count) {
            var i,j
            var k = 0
            console.log('มาแล้ว')
            console.log(count)
            for(i = 0; i < count; i++) {
                db.collection('Students').doc('Years').collection('2560').doc(`Set${i}`).get()
                .then((docs) => {
                for(j = 0; j < docs.data().Datas.length; j++){
                    console.log('มาแล้ว 2')
                    this.Name[k] = docs.data().Datas[j].NAME
                    this.Gpax[k] = docs.data().Datas[j].GPAX
                    this.Gpoint[k] = docs.data().Datas[j].GRADEPOINT
                    k++
                }
                console.log(`results = ${this.Name}`)
                console.log(`results = ${this.Gpax}`)
                });
                }
            },
        readtest() {
             db.collection('Students').doc('Years').get()
                .then(function(docs) {
                    console.log(`results = ${JSON.stringify(docs.id)}`)
                    //console.log(`results = ${JSON.stringify(docs.data().Datas.length)}`)
                })
            }
        },*/
};
</script>