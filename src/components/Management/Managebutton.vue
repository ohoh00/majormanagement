<template>
<div>
    <div>
        <b-button variant="danger">จัดสาขาวิชา</b-button>
        <b-button variant="info" style="margin-left:16px;" @click="$bvModal.show('bv-modal-example-delete')">ลบข้อมูล</b-button>
    </div>

    <div>
        <b-modal ref="my-modal-delete" id="bv-modal-example-delete" hide-footer title="ลบข้อมูล">
            <div>
                <h4 class="text-center">ต้องการที่จะลบข้อมูลกดปุ่ม<b-badge>ยืนยัน</b-badge></h4>
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
        Readdata: Function
    },
    methods:{
        ManageId() {
            this.datas = [];
            db.collection("Manage").get().then((snapshot) => {
                snapshot.forEach((docs) => {
                this.Deletedata(docs.id);
                });
            });
        },
        Deletedata(id) {
            db.collection("Manage").doc(id).delete()
            .then(() => {
                console.log('Delete Document successfully')
                this.Readdata()
                this.$refs['my-modal-delete'].hide()
            }).catch((error) => {
                console.error('Error writing document: ', error)
            });
        }
    }
}
</script>