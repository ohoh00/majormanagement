<template>
<b-container>
    <div>
        <div>
        <b-button variant="danger" id="show-btn" @click="$bvModal.show('bv-modal-example-add')">เพิ่มสาขา</b-button>

        <b-modal ref="my-modal" id="bv-modal-example-add" size="xl" hide-footer title="เพิ่มสาขาวิชา">
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
                <b-button class="mt-3" variant="danger" block @click="$bvModal.hide('bv-modal-example-add')">ยกเลิก</b-button>
            </div>
            <div class="col-sm-6">
                <b-button class="mt-3" variant="success" block @click="Checkdata()">บันทึก</b-button>
            </div>
        </div>
        </b-modal>
        </div>
    </div>
</b-container>
</template>
<script>
import firebase from '@/firebaseConfig'
const db = firebase.firestore()
export default {
    props: {
        datamajor: Function,
        datas: Array
    },
    data(){
        return{
            majorfrom:{
                Code:'',
                Major:'',
                จำนวนรับ:''
            }
        }
    },
    methods: {
        Checkdata() {
            var sum = true
            this.datas.forEach(data => {
                if(this.majorfrom.Code == data.Code)
                sum = false
            })
            sum ? this.Majorfrom() : alert('Code ซ้ำ')
        },
        Majorfrom() {
            db.collection('Setting').doc('Major').collection('Data').add(this.majorfrom)
            .then(() => {
                console.log('Document successfully written!')
                this.$refs['my-modal'].hide()
                this.datamajor()
                this.Clear()
            })
            .catch((error) => {
                console.error('Error writing document: ', error)
          })
        },
        Clear() {
            this.majorfrom.Code = ''
            this.majorfrom.Major = ''
            this.majorfrom.จำนวนรับ = ''
        }
    }
}
</script>