<template>
  <b-container>
    <div>
      <b-container>
      <div class="row">
        <div>
          <Managebutton :Managedatas = 'M_datas' :Datakey = 'key' :documentsId = 'documentsId' :Filter_GP = 'Fi_datas'/>
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
            <b-tab title="รายชื่อนักศึกษาทั้งหมด" active>
              <Listdatatable :Managedatas = 'datas' :Datakey = 'fields'/>
            </b-tab>
            <b-tab title="รายชื่อที่มีปัญหา(เลือก/สุ่ม)">
              <CustomTable/>
            </b-tab>
             <b-tab title="รายชื่อที่ไม่ผ่านเกณฑ์">
               <FitterTable/>
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
import FitterTable from "@/components/Management/FitterTable.vue";
import firebase from "@/firebaseConfig";
const db = firebase.firestore();
export default {
  components: { Listdatatable, Managebutton, Deletebutton, CustomTable, FitterTable },
  data() {
    return {
        datas: [],
        key:[],
        fields: [],
        M_datas: [],
        Fi_datas: [],
        filter: null,
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
          this.Filter_GP(this.datas)
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
    GpFitter() {
            db.collection('Setting').doc('Filter').collection('Gradepoint').doc('Min').onSnapshot(doc =>{
                this.filter = doc.data().Gradepoint
            })
    },
    Filter_GP(datas){
      this.M_datas = []
      this.Fi_datas = []
      
      this.M_datas = datas.filter((member) => {
        return member.GRADEPOINT >= this.filter
      })
      this.Fi_datas = datas.filter((member) => {
        return member.GRADEPOINT < this.filter
      })
    },
  },
  mounted() {
    this.GpFitter()
    this.documentsId();
  },
  beforeCreate() {
    firebase.auth().onAuthStateChanged(user => {
        if (!user) {
          this.$router.replace("/")
        }
    });
  },
};
</script>