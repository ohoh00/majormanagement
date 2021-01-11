<template>
  <b-container>
    <div>
      <b-container>
      <div class="row">
        <div>
          <Managebutton :Managedatas = 'datas' :Datakey = 'key' :documentsId = 'documentsId'/>
        </div>
        <div>
          <Deletebutton :data = 'documentsId'/>
        </div>
      </div>
      </b-container>
      <br/>
      <div>
        <b-card no-body>
          <b-tabs card>
            <b-tab title="Step 1" active>
              <Listdatatable :Managedatas = 'datas' :Datakey = 'fields'/>
            </b-tab>
            <b-tab title="Step 2">
              <CustomTable/>
            </b-tab>
          </b-tabs>
        </b-card>
      </div>
    </div>
  </b-container>
</template>
<script>
import Listdatatable from "@/components/Management/ListDataTable.vue";
import Managebutton from "@/components/Management/Managebutton.vue";
import Deletebutton from "@/components/Management/Deletebutton.vue";
import CustomTable from "@/components/Management/CustomTable.vue";
import firebase from "@/firebaseConfig";
const db = firebase.firestore();
export default {
  components: { Listdatatable, Managebutton, Deletebutton, CustomTable },
  data() {
    return {
        datas: [],
        key:[],
        fields: [],
    };
  },
  methods: {
    documentsId() {
      this.datas = []
      this.key = []
      this.fields = []
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
      });
    },
  },
  created() {
    this.documentsId();
  },
};
</script>