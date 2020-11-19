<template>
  <div>
    <div v-if="Setstatus()">
      <b-alert show class="text-center">ไม่มีข้อมูล</b-alert>
    </div>
    <div v-if="Setstatus() == false">
     <b-pagination
      align="center"
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="my-table"
    ></b-pagination>

    <b-table  id="my-table" striped hover head-variant = 'dark' :items="datas" :fields="fields" sticky-header="600px" :per-page="perPage" :current-page="currentPage">
        <template #cell(กำหนดสาขาวิชา) = data>
            <div class="row">
                <div>
                    <b-form-select v-model="data.item.select" :options="options"></b-form-select>
                </div>
                <div>
                    <b-button style="margin-left:16px;" @click="Custommajor(data.index, data.item.select)">
                    ตกลง
                    </b-button>
                </div>
            </div>
        </template>
    </b-table>
    </div>
  </div>
</template>

<script>
import firebase from "@/firebaseConfig";
const db = firebase.firestore();
  export default {
    data() {
      return {
          fields: ['GPAX', 'GRADEPOINT', 'NAME', 'STUDENTCODE', 'สาขาวิชา', 'กำหนดสาขาวิชา'],
          datas: [],
          id:[],
          options: [],
          set:[],
          perPage: 100,
          currentPage: 1,
      }
    },
    computed: {
      rows() {
        return this.datas.length
      }
    },
    methods: {
        Setstatus() {
            if (this.datas == "") return true;
            else return false;
        },
        Readdata() {
            db.collection("Customstudents").orderBy("GRADEPOINT", "desc").onSnapshot(snapshot => {
                this.datas = []
                this.id = []
                snapshot.forEach((docs) => {
                this.id.push(docs.id)
                this.datas.push(docs.data());
            })
        });
        },
        Majorcount() {
            db.collection("Major_count").onSnapshot(snapshot => {
                this.options = []
                this.set = []
                snapshot.forEach((docs) => {
                if(docs.data().ที่นั่ง != 0){
                    this.set.push(docs.data())
                    this.options.push(docs.data().Major);
                }
            });
        })
        },
        Custommajor(index, item) {
            if(this.datas[index].สาขาวิชา == null){
            db.collection("Customstudents").doc(this.id[index]).update({
                สาขาวิชา: item
            })
            .then(() => {
                console.log('Update Document successfully')
            })
            .catch((error) => {
            console.error('Error writing document: ', error)
            })
            this.countupdate(item)
            }
            else
            alert('มีสาขาวิชาแล้ว')
        },
        countupdate(item) {
            var result = this.set.find((set) => {
            return set.Major == item
            })
            console.log(result.ที่นั่ง)
            db.collection("Major_count").doc(item).update({
                ที่นั่ง: (result.ที่นั่ง-1)
            })
            .then(() => {
                console.log('Update Document successfully1')
            })
            .catch((error) => {
            console.error('Error writing document: ', error)
            })
        }

    },
    mounted() {
        this.Readdata()
        this.Majorcount()
    }
  }
</script>