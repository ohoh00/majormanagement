<template>
<b-container>
    <div class="row">
        <div>
        <b-button variant="danger" id="show-btn" @click="$bvModal.show('bv-modal-example-add')">เพิ่มสาขา</b-button>

        <b-modal ref="my-modal" id="bv-modal-example-add" size="xl" hide-footer>
        <template v-slot:modal-title>
            เพิ่มสาขาวิชา
        </template>
        <div class="row">
            <b-col>
            <label>รหัส</label>
            <input type="text" class="form-control" v-model.number="majorfrom.Code">
            </b-col>
             <b-col>
            <label>ชื่อสาขาวิชา</label>
            <input type="text" class="form-control" v-model="majorfrom.Major">
            </b-col>  
             <b-col>
            <label>จำนวนรับ (คน)</label>
            <input type="text" class="form-control" v-model.number="majorfrom.จำนวนรับ">
            </b-col>    
        </div>
        <div class="row">
            <div class="col-sm-6">
                <b-button class="mt-3" variant="secondary" block @click="$bvModal.hide('bv-modal-example-add')">ยกเลิก</b-button>
            </div>
            <div class="col-sm-6">
                <b-button class="mt-3" variant="success" block @click="Majorfrom()">บันทึก</b-button>
            </div>
        </div>
        </b-modal>
        </div>
        
        <div>
        <!--b-button variant="success" style="margin-left:16px;">ลบสาขา</b-button-->
        </div>
    </div>
</b-container>
</template>
<script>
import firebase from '@/firebaseConfig'
const db = firebase.firestore()
export default {
    props: {
        datamajor: Function
    },
    data(){
        return{
            majorfrom:{
                Code:null,
                Major:'',
                จำนวนรับ:null
            }
        }
    },
    methods: {
        Majorfrom() {
        db.collection('Settingcode').doc(this.majorfrom.Code.toString()).set(this.majorfrom)
        .then(() => {
            console.log('Document successfully written!')
            this.$refs['my-modal'].hide()
            this.datamajor()
          })
        .catch((error) => {
            console.error('Error writing document: ', error)
          })
        },

    }
}
</script>