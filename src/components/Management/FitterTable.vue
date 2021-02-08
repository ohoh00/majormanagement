<template>
<div>
    <div>
        <h5>ปีการศึกษา</h5>
      <b-form-select
        v-model="selected"
        :options="listyear"
        class="mb-3"
        disabled-field="notEnabled"
        @change="readFilter_stu()"
    ></b-form-select>
    </div>
    <b-container>
    <div class="row">
        <div>
            <ExportExcelFi :json='items'/>
        </div>
    <div>
    <div>
        <b-button variant="info" style="margin-left:16px;" @click="$bvModal.show('bv-modal-example-filter')">ลบข้อมูล</b-button>
    </div>
    <div>
        <b-modal ref="my-modal-filter" id="bv-modal-example-filter" hide-footer title="ลบข้อมูล">
            <div class="text-center">
                <h4>ต้องการที่จะลบข้อมูลกดปุ่ม<b-badge>ยืนยัน</b-badge></h4>
            </div>
            <div class="row">
            <div class="col-sm-6">
                <b-button class="mt-3" variant="danger" block @click="$bvModal.hide('bv-modal-example-filter')">ยกเลิก</b-button>
            </div>
            <div class="col-sm-6">
                <b-button class="mt-3" variant="success" block @click="Deletestudent_Filter()">ยืนยัน</b-button>
            </div>
            </div>
            </b-modal>
        </div>
    </div>
    </div>
    </b-container>
    <div>
        <div v-if="Setstatus()">
        <br>
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

        <b-table striped hover head-variant = 'dark'
            id="my-table"
            :items="items"
            :fields="fields"
            :sort-by.sync="sortBy"
            :sort-desc.sync="sortDesc"
            sticky-header="600px"
            :per-page="perPage"
            :current-page="currentPage"
        >
        </b-table>
        </div>
    </div>
</div>
</template>

<script>
import ExportExcelFi from "@/components/Management/ExportExcel_Fi.vue";
import firebase from "@/firebaseConfig";
const db = firebase.firestore();
export default {
    components: { ExportExcelFi },
    data() {
        return {
            items: [],
            listyear: [],
            selected: '',
            fields: [
        {
            key: 'ลำดับที่ลงทะเบียน',
            sortable: false
          },
          {
            key: 'STUDENTCODE',
            sortable: false
          },
          {
            key: 'NAME',
            sortable: false
          },
          {
            key: 'GRADEPOINT',
            sortable: true
          },
          {
            key: 'GPAX',
            sortable: false
          },
        ],
            
            perPage: 100,
            currentPage: 1,
            sortBy: "GRADEPOINT",
            sortDesc: true,


        }
    },
    computed: {
      rows() {
        return this.items.length
      }
  },
    methods:{
        Setstatus() {
            if (this.items == "") return true;
            else return false;
        },
        Filter_stuId() {
            db.collection('Student_Filter').onSnapshot(doc =>{
            this.listyear = []
            doc.forEach(element => {
            this.listyear.push(element.id)
         });
         this.selected = this.listyear[this.listyear.length - 1]
         this.readFilter_stu()  
      })
      
    },
        readFilter_stu() {
            this.items = []
            var student = new Object
            db.collection("Student_Filter").doc(this.selected).get()
            .then((snapshot) => {
                snapshot.data().stu_ft.forEach((docs) => {
                    student = {
                        ลำดับที่ลงทะเบียน: docs.ลำดับที่ลงทะเบียน,
                        STUDENTCODE: docs.STUDENTCODE,
                        NAME: docs.NAME,
                        GRADEPOINT: docs.GRADEPOINT,
                        GPAX: docs.GPAX,
                    }
                    this.items.push(student)
                });
        })
        },
        Deletestudent_Filter() {
            this.$refs['my-modal-filter'].hide()
            db.collection("Student_Filter").doc(this.selected).delete()
            .then(() => {
                console.log('Delete Document successfully')
            }).catch((error) => {
                console.error('Error writing document: ', error)
            });
    },
    },
    mounted() {
        this.Filter_stuId()
    }
}
</script>