<template>
    <div>
    <h5>ปีการศึกษา</h5>
    <b-form-select
        v-model="selected"
        :options="listyear"
        class="mb-3"
        disabled-field="notEnabled"
        @change="Readdata()"
    ></b-form-select>
        <div class="row">
            <div class="col-sm-4">
                <div class="card" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">จำนวนสาขาที่เปิด</h5>
                    <p class="card-text">{{data.Openmajor}}</p>
                </div>
                </div>
            </div>
            <div class="col-sm-4">
                <div class="card" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">จำนวน นศ ทั้งหมด</h5>
                    <p class="card-text">{{data.Students}}</p>
                </div>
                </div>
            </div>
            <div class="col-sm-4">
                <div class="card" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">Grade Point เฉลี่ย</h5>
                    <p class="card-text">{{data.AverageGradepoint}}</p>
                </div>
                </div>
            </div>
        </div>
        <p></p>
        <div class="row">
            <div class="col-sm-4">
                <div class="card" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">Grade Point ต่ำสุด</h5>
                    <p class="card-text">{{data.MinGradepoint}}</p>
                </div>
                </div>
            </div>
            <div class="col-sm-4">
                <div class="card" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">Grade Point สูงสุด</h5>
                    <p class="card-text">{{data.MaxGradepoint}}</p>
                </div>
                </div>
            </div>
            <div class="col-sm-4">
                <div class="card" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">สาขาที่ถูกเลือกอันดับ 1</h5>
                    <p class="card-text">{{data.Numberonemajor}}</p>
                </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import firebase from '@/firebaseConfig'
const db = firebase.firestore()
export default {
    data () {
        return {
            data:{},
            listyear:[],
            selected: '',
        }
    },
    methods : {
        Readdata() {
            db.collection("Dashboard").doc(this.selected).get().then((docs) =>{
                this.data = docs.data()
            })
        },
        async Getdockey() {
                const snapshot = await db.collection('Dashboard').get()
                console.log(snapshot.docs.map(doc => doc.id))
                this.listyear = snapshot.docs.map(doc => doc.id)
                console.log(this.listyear)
                this.selected = this.listyear[this.listyear.length - 1]
                this.Readdata()
        }
    },
    mounted() {   
        this.Getdockey()
    }
}
</script>