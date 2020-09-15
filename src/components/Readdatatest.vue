<template>
    <div>
        <button @click="Countdocuments()">คลิก</button>
        <button @click="readtest()">คลิก2</button>
    </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
//import firebase from '@/firebaseConfig'
//const db = firebase.firestore()
export default {
    data(){
        return{
            datas: [],
            //Name: [],
            //Gpax: [],
            //Gpoint: [],
            doc_count: null,
        }
    },
    /*methods : {
        Countdocuments() {
            db.collection('Students').doc('Years').collection('2560').get().then((snapshot) =>
            {
                this.doc_count = snapshot.docs.length
                console.log(this.doc_count)
                console.log(`ยาว = ${snapshot.docs.length}`)
                this.Readdata(this.doc_count)
            },
            )
            },
        Readdata(count) {
            var i,j
            var k = 0
            console.log('มาแล้ว')
            console.log(count)
            for(i = 0; i < count; i++) {
                db.collection('Students').doc('Years').collection('2560').doc(`Set${i}`).get()
                .then((docs) => {
                for(j = 0; j < docs.data().Datas.length; j++){
                    console.log('มาแล้ว 2')
                    this.Name[k] = docs.data().Datas[j].NAME
                    this.Gpax[k] = docs.data().Datas[j].GPAX
                    this.Gpoint[k] = docs.data().Datas[j].GRADEPOINT
                    k++
                }
                console.log(`results = ${this.Name}`)
                console.log(`results = ${this.Gpax}`)
                });
                }
            },
        readtest() {
             db.collection('Students').doc('Years').get()
                .then(function(docs) {
                    console.log(`results = ${JSON.stringify(docs.id)}`)
                    //console.log(`results = ${JSON.stringify(docs.data().Datas.length)}`)
                })
            }
        },*/
    }
</script>