<template>
  <b-container>
    <div>
      <Managebutton :Readdata = 'documentsId'/>
      <br/>
      <Listdatatable :Managedatas = 'datas' :Datakey = 'fields'/>
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
        key:[],
        fields: []
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
          this.key = Object.keys(this.datas[0])
          this.key = this.key.sort()
          this.Sortdata(this.key)
        });
    },
    Sortdata(keys) {
      this.fields = []
      var sortkey = new Object
      keys.forEach(data => {
        sortkey = {
          key: data,
          sortable: true
        }
        this.fields.push(sortkey)
        console.log(this.fields)
      });
    }
  },
  mounted() {
    this.documentsId();
  },
};
</script>