<template>
  <b-container>
    <div>
      <Managebutton :Readdata = 'documentsId'/>
      <br/>
      <Listdatatable :Managedatas = 'datas' :Datakey = 'key'/>
    </div>
  </b-container>
</template>
<script>
import Listdatatable from "@/components/Management/ListDataTable.vue";
import Managebutton from "@/components/Management/Managebutton.vue";
import firebase from "@/firebaseConfig";
const db = firebase.firestore();
export default {
  components: { Listdatatable, Managebutton },
  data() {
    return {
        datas: [],
        key:[]
    };
  },
  methods: {
    documentsId() {
      this.datas = []
      this.key = []
      db.collection("Manage").get().then((snapshot) => {
          snapshot.forEach((docs) => {
            this.Readdata(docs.id);
          });
        });
    },
    Readdata(id) {
      db.collection("Manage").doc(id).get()
        .then((snapshot) => {
          snapshot.data().Datas.forEach((docs) => {
            this.datas.push(docs);
          });
          console.log(Object.keys(this.datas[0]))
          this.key = Object.keys(this.datas[0])
          this.key = this.key.sort()
        });
    },
  },
  mounted() {
    this.documentsId();
  },
};
</script>