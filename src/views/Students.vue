<template>
  <b-container>
    <div>
      <h5>ปีการศึกษา</h5>
      <b-form-select
        v-model="selected"
        :options="listyear"
        class="mb-3"
        disabled-field="notEnabled"
        @change="documentsId()"
      ></b-form-select>
      <b-container>
      <div class="row">
      <div>
        <ExportExcel :json='datas'/>
      </div>
      <div>
        <DeleteAllData :selected='selected'/>
      </div>
      </div>
      </b-container>
      <StudantsTable
        :Studentsdatas='datas'
      />
    </div>
  </b-container>
</template>
<script>
import ExportExcel from "@/components/Students/ExportExcel.vue"
import DeleteAllData from "@/components/Students/DeleteAllData.vue"
import StudantsTable from "@/components/Students/StudantsTable.vue";
import firebase from "@/firebaseConfig";
const db = firebase.firestore();
export default {
  components: { StudantsTable, ExportExcel, DeleteAllData },
  data() {
    return {
      datas: [],
      key: [],
      fields: [],
      selected: '',
      listyear: [],
    };
  },
  methods: {
    Getdockey() {
      db.collection("Dashboard").onSnapshot(snapshot =>{
          this.listyear = []
          snapshot.forEach((docs) => {
          this.listyear.push(docs.id); 
        });
        this.selected = this.listyear[this.listyear.length - 1];
        this.documentsId();
      })
    },
    documentsId() {
      this.datas = [];
      db.collection("Students").doc(this.selected).collection("data")
        .get()
        .then((snapshot) => {
          snapshot.forEach((docs) => {
            this.Readdata(docs.id);
          });
        });
    },
    Readdata(id) {
      db.collection("Students").doc(this.selected).collection("data").doc(id).get()
        .then((snapshot) => {
          var stu = new Object
          snapshot.data().Datas.forEach((docs) => {
            stu = {
              ลำดับที่ลงทะเบียน: docs.ลำดับที่ลงทะเบียน,
              STUDENTCODE: docs.STUDENTCODE,
              NAME: docs.NAME,
              GRADEPOINT: docs.GRADEPOINT,
              GPAX: docs.GPAX,
              ลำดับที่ได้: docs.ลำดับที่ได้,
              สาขาวิชา: docs.สาขาวิชา
            }
            this.datas.push(stu);
          });
      });
    },
  },
  created() {
    this.Getdockey();
  },
};
</script>