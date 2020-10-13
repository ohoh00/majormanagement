<template>
 <b-container >
    <div>
        <b-input-group prepend="Gradepoint ต่ำสุด">
        <b-button :pressed="true" squared variant="secondary">{{filter}}</b-button>
        <b-button squared variant="warning" style="color:white" @click="$bvModal.show('Edit-GP')">แก้ไข</b-button>
        </b-input-group>
    </div>
    <div>
        <b-modal ref="my-modal" id="Edit-GP" size="sm" hide-footer title="แก้ไขข้อมูล">
        <div class="row">
            <b-col>
            <label><h6>ระบุ Gradepoint</h6></label>
            <input type="text" class="form-control" v-model.number="editfilter">
            </b-col>
        </div>
        <div class="row">
            <div class="col-sm-6">
                <b-button class="mt-3" variant="danger" block @click="$bvModal.hide('Edit-GP')">ยกเลิก</b-button>
            </div>
            <div class="col-sm-6">
                <b-button class="mt-3" variant="success" block @click="UpdateFilter()">บันทึก</b-button>
            </div>
        </div>
        </b-modal>
    </div>
</b-container>
</template>
<script>
import firebase from '@/firebaseConfig'
const db = firebase.firestore()
export default {
    data(){
        return{
            filter:'',
            editfilter:''
        }
    },
    methods:{
        GpFitter() {
            db.collection('Setting').doc('Filter').collection('Gradepoint').doc('Min').onSnapshot(doc =>{
                this.filter = doc.data().Gradepoint
            })
        },
        UpdateFilter() {
            db.collection('Setting').doc('Filter').collection('Gradepoint').doc('Min').update({
               Gradepoint: this.editfilter
            })
            .then(() => {
                this.$refs['my-modal'].hide()
            })
        }
    },
    created(){
        this.GpFitter()
    }
}
</script>