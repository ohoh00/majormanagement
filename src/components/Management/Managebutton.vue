<template>
    <div>
        <b-button variant="danger">จัดสาขาวิชา</b-button>
        <b-button variant="info" style="margin-left:16px;" @click="ManageId()">ลบข้อมูล</b-button>
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
            }).catch((error) => {
                console.error('Error writing document: ', error)
            });
        }
    }
}
</script>