<template>
  <b-container>
    <div>
      <Cardbox @Sendyear="setyear" />
      <br>
      <canvas id="my-chart"></canvas>
    </div>
  </b-container>
</template>

<script>
import Cardbox from "@/components/Dashboard/Cardbox.vue";
import firebase from "@/firebaseConfig";
const db = firebase.firestore();
import Chart from "chart.js";
export default {
  components: { Cardbox },
  data() {
    return {
      year: null,
      namelabel: [],
      gpmin: [],
      gpmax: [],
      gpav: [],
      myChart: null
    }
  },
  methods: {
    setyear(year) {
      this.year = year;
      if(this.myChart !== null) {
          this.myChart.destroy();
      }
      this.Readdata()
    },
    Chartdata() {
      var ctx = document.getElementById("my-chart");
      this.myChart = new Chart(ctx, {
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
              data: this.gpav,
              borderColor: "#feb019",
              backgroundColor: "#feb019",
            },
          ],
        },
        options: {
             responsive: true,
             title: {
                display: true,
                text: 'Grade Point แต่ละสาขา'
            }
        },
      },
      );
    },
    Readdata() {
      this.namelabel = []
      this.gpmin = []
      this.gpmax = []
      db.collection("Chart")
        .doc(this.year)
        .collection("data")
        .get()
        .then((snapshot) => {
          snapshot.forEach((docs) => {
            this.namelabel.push(docs.data().Major)
            this.gpmin.push(docs.data().Gpmin)
            this.gpmax.push(docs.data().Gpmax)
            this.gpav.push(docs.data().Gpav)
          });
          this.Chartdata()
        });
    },
    test() {
      console.log(this.namelabel);
    },
  },
}
</script>

<style scoped>
</style>