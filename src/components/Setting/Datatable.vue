<template>
    <div class="card">
    <table class="table">
        <thead class="thead-dark">
    <tr>
      <th scope="col">ลำดับ</th>
      <th scope="col">รหัส</th>
      <th scope="col">รายชื่อสาขา</th>
      <th scope="col">จำนวนรับ</th>
      <th scope="col">Action</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(data, index) in datas" :key="data.Code">
      <td>{{index+1}}</td>  
      <td>{{data.Code}}</td>
      <td>{{data.Major}}</td>
      <td>{{data.จำนวนรับ}}</td>
      <td><b-button variant="success" @click="Deletemajor(data.Code)">ลบสาขา</b-button></td>
    </tr>
    </tbody>
    </table>
    </div>
</template>
<script>
import firebase from '@/firebaseConfig'
const db = firebase.firestore()
export default {
    props:{
        datamajor: Function,
        datas: Array
    },
    data() {
        return{
        }
    },
    methods: {
        Deletemajor(id) {
            db.collection('Settingcode').doc(id.toString()).delete()
            .then(() => {
                console.log('Delete Document successfully')
                this.datamajor()
            })
        }
    },
}
</script>