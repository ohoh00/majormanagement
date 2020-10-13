<template>
<div>
    <div class="card">
    <table class="table">
        <thead class="thead-dark">
    <tr>
      <th class="text-center" scope="col">ลำดับ</th>
      <th class="text-center" scope="col">รหัส</th>
      <th class="text-center" scope="col">รายชื่อสาขา</th>
      <th class="text-center" scope="col">จำนวนรับ</th>
      <th class="text-center" scope="col">แก้ไข/ลบ</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(data, index) in datas" :key="index" >
      <th class="text-center">{{index+1}}</th>
      <td class="text-center">{{data.Code}}</td>
      <td class="text-center">{{data.Major}}</td>
      <td class="text-center">{{data.จำนวนรับ}}</td>
      <td class="text-center">
        <b-button-group>
            <b-button variant="warning" style="color:white" @click="Editdata(data,index)" >แก้ไขข้อมูล</b-button>
            <b-button variant="info" @click="Showdelete(index)">ลบข้อมูล</b-button>
        </b-button-group>
      </td>
    </tr>
    </tbody>
    </table>
    </div>

    <div>
        <b-modal ref="my-modal" id="bv-modal-example-edit" size="xl" hide-footer title="แก้ไขข้อมูล">
            <div class="row">
                <b-col>
                    <label>รหัส</label>
                    <input type="text" class="form-control" v-model.number="editcode">
                </b-col>
                <b-col>
                    <label>ชื่อสาขาวิชา</label>
                    <input type="text" class="form-control" v-model="editname">
                </b-col>  
                <b-col>
                    <label>จำนวนรับ (คน)</label>
                    <input type="text" class="form-control" v-model.number="editnumber">
                </b-col>  
            </div>
            <div class="row">
            <div class="col-sm-6">
                <b-button class="mt-3" variant="danger" block @click="$bvModal.hide('bv-modal-example-edit')">ยกเลิก</b-button>
            </div>
            <div class="col-sm-6">
                <b-button class="mt-3" variant="success" block @click="Checkdata()">บันทึก</b-button>
            </div>
            </div>
            </b-modal>
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
                <b-button class="mt-3" variant="success" block @click="Deletemajor()">ยืนยัน</b-button>
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
        datas: Array,
        docid: Array
    },
    data() {
        return{
            editcode: '',
            editname: '',
            editnumber: '',
            id:''
        }
    },
    methods: {
        Showdelete(index) {
            this.$refs['my-modal-delete'].show()
            this.id = index
        },
        Deletemajor() {
            db.collection('Setting').doc('Major').collection('Data').doc(this.docid[this.id]).delete()
            .then(() => {
                console.log('Delete Document successfully')
                this.$refs['my-modal-delete'].hide()
            })
            .catch((error) => {
                console.error('Error writing document: ', error)
            })
        },
        Editdata(data,index) {
            this.$refs['my-modal'].show()
            this.editcode = data.Code
            this.editname = data.Major
            this.editnumber = data.จำนวนรับ
            this.id = index
        },
        Checkdata() {
            var sum = true
            this.datas.forEach(data => {
                if(this.editcode == this.datas[this.id].Code)
                sum = true
                else if(this.editcode == data.Code)
                sum = false
            })
            sum ? this.Updatedata() : alert('Code ซ้ำ')
        },
        Updatedata() {
            db.collection('Setting').doc('Major').collection('Data').doc(this.docid[this.id]).update({
                Code: this.editcode,
                Major: this.editname,
                จำนวนรับ: this.editnumber
            })
            .then(() => {
                console.log('Update Document successfully')
                this.$refs['my-modal'].hide()
            })
            .catch((error) => {
            console.error('Error writing document: ', error)
            })
        },
    }
}
</script>