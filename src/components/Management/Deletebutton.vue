<template>
<div>
    <div>
        <b-button variant="info" style="margin-left:16px;" @click="$bvModal.show('bv-modal-example-delete')">ลบข้อมูล</b-button>
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
                <b-button class="mt-3" variant="success" block @click="ManageId()">ยืนยัน</b-button>
            </div>
            </div>
            </b-modal>
    </div>
</div>
</template>
<script>
import firebase from '@/firebaseConfig'
const db = firebase.firestore()
export default {
    props:{
        data: Function
    },
    data() {
        return {
            doc_size: null,
            count: 1,
            show: null
        }
    },
    methods:{
        ManageId() {
            db.collection("Manage").get().then((snapshot) => {
                this.doc_size = snapshot.size
                this.show = true
                this.DeleteCustom()
                this.DeleteMajorcount()
                snapshot.forEach((docs) => {
                this.Deletedata(docs.id);
                });
            });
        },
        Deletedata(id) {
            db.collection("Manage").doc(id).delete()
            .then(() => {  
                console.log('Delete Document successfully')
                if(this.count++ == this.doc_size){
                    this.show = false
                    this.$refs['my-modal-delete'].hide()
                    this.data()
                }
            }).catch((error) => {
                console.error('Error writing document: ', error)
            });
        },
        DeleteCustom() {
            db.collection("Customstudents").get()
            .then(res => {
                res.forEach(element => {
                    element.ref.delete()
                })
            })
        },
        DeleteMajorcount() {
            db.collection("Major_count").get()
            .then(res => {
                res.forEach(element => {
                    element.ref.delete()
                })
            })
        }
    }
}
</script>