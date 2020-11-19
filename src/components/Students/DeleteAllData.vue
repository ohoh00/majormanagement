<template>
    <div>
        <div>
            <b-button @click="$bvModal.show('bv-modal-example-delete')" variant="info" style="margin-left:16px;">ลบข้อมูลทั้งหมด</b-button>
        </div>
        <div>
        <b-modal ref="my-modal-delete" id="bv-modal-example-delete" hide-footer title="ลบข้อมูล">
            <div class="text-center">
                <h4>ต้องการที่จะลบข้อมูลกดปุ่ม<b-badge>ยืนยัน</b-badge></h4>
                <b-spinner v-if="show" variant="primary" label="Spinning"></b-spinner>
            </div>
            <div class="row">
            <div class="col-sm-6">
                <b-button class="mt-3" variant="danger" block @click="$bvModal.hide('bv-modal-example-delete')">ยกเลิก</b-button>
            </div>
            <div class="col-sm-6">
                <b-button class="mt-3" variant="success" block @click="DeleteSet()">ยืนยัน</b-button>
            </div>
            </div>
            </b-modal>
    </div>
    </div>
</template>
<script>
import firebase from "@/firebaseConfig";
const db = firebase.firestore();
export default {
    props:{selected: String},
    data() {
        return{
            show: null
        }
    },
    methods:{
        DeleteSet() {
            this.show = true
            this.DeleteStudants()
            this.DeleteDashboard()
            this.DeleteChart()
        },
        DeleteStudants() {
            db.collection("Students").doc(this.selected).collection('data').get()
            .then(res => {
                res.forEach(element => {
                    element.ref.delete()
                })
                console.log('Delete Document successfully')
            })
        },
        DeleteDashboard() {
            db.collection("Dashboard").doc(this.selected).delete()
            .then(() => {
                 console.log('Dashboard Delete Document successfully')
            }
            )
        },
        DeleteChart() {
            db.collection("Dashboard").doc(this.selected).collection('Chart').get()
            .then(res => {
                res.forEach(element => {
                    element.ref.delete()
                })
                this.show = false
                this.$refs['my-modal-delete'].hide()
                console.log('Dashboard Chart Delete Document successfully')
            })
        }
    }
}
</script>