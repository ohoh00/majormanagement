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
      <StudantsTable
        :Studentsdatas='datas'
        :Datakey='fields'
      />
    </div>
  </b-container>
</template>
<script>
import StudantsTable from "@/components/Students/StudantsTable.vue";
import firebase from "@/firebaseConfig";
const db = firebase.firestore();
export default {
  components: { StudantsTable },
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
      db.collection("Dashboard").get().then((snapshot) => {
          snapshot.forEach((docs) => {
            this.listyear.push(docs.id);
          });
          this.selected = this.listyear[this.listyear.length - 1];
          this.documentsId();
        });
    },
    documentsId() {
      this.datas = [];
      this.key = [];
      this.fields = [];
      db.collection("Students")
        .doc(this.selected)
        .collection("data")
        .get()
        .then((snapshot) => {
          snapshot.forEach((docs) => {
            this.Readdata(docs.id);
          });
        });
    },
    Readdata(id) {
      db.collection("Students")
        .doc(this.selected)
        .collection("data")
        .doc(id)
        .get()
        .then((snapshot) => {
          snapshot.data().Datas.forEach((docs) => {
            this.datas.push(docs);
          });
          this.key = Object.keys(this.datas[0]);
          this.key = this.key.sort();
          this.Sortdata(this.key);
        });
    },
    Sortdata(keys) {
      this.fields = [];
      var sortkey = new Object();
      keys.forEach((data) => {
        sortkey = {
          key: data,
          sortable: true,
        };
        this.fields.push(sortkey);
      });
    },
  },
  created() {
    this.Getdockey();
  },
};
</script>